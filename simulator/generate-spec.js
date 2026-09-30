'use strict';

// Генерация машиночитаемых схем методов из страниц документации.
//
//   node simulator/generate-spec.js            — сгенерировать схемы пилотных scope
//   node simulator/generate-spec.js --lint     — только отчёт, без записи файлов
//
// Результат: _assets/simulator/spec/index.json и _assets/simulator/spec/methods/*.json

const fs = require('fs');
const path = require('path');

const { buildSpec } = require('./lib/build-spec.js');
const { parseTables } = require('./lib/yfm-table.js');
const { PILOT_DIRS, READ_EXECUTABLE, METHOD_ENTITY } = require('./lib/config.js');
const B24Sim = require('./lib/core.js');

// Состав полей сущности описан не на странице списочного метода, а отдельно.
// Для CRM это подтаблица «Параметр fields» у метода *.add, для задач — своя страница.
const FIELD_PAGES = {
    'tasks.task': 'api-reference/tasks/fields.md',
};

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, '_assets', 'simulator', 'spec');

function walk(dir, acc) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, acc);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            acc.push(full);
        }
    }
    return acc;
}

// Страница документации отдаётся сайтом как .html по тому же пути.
function pagePathOf(relativeMd) {
    return '/' + relativeMd.replace(/\\/g, '/').replace(/\.md$/, '.html');
}

function main() {
    const lintOnly = process.argv.includes('--lint');

    const files = [];
    for (const dir of PILOT_DIRS) {
        const full = path.join(ROOT, dir);
        if (fs.existsSync(full)) {
            walk(full, files);
        } else {
            console.warn('пилотный каталог не найден: ' + dir);
        }
    }

    const specs = [];
    const skipped = [];
    const noteCounts = new Map();
    const unknownTypes = new Map();
    const byMethod = new Map();

    for (const file of files.sort()) {
        const relative = path.relative(ROOT, file);

        // REST 3.0 — отдельный API с другим форматом страниц. В пилот не входит,
        // но страницы сортируются раньше основных и молча перебивали бы их.
        if (/rest-v3/.test(relative.replace(/\\/g, '/'))) {
            skipped.push({ file: relative, code: 'rest_v3_out_of_scope' });
            continue;
        }

        const markdown = fs.readFileSync(file, 'utf8');

        let result;
        try {
            result = buildSpec(markdown, relative);
        } catch (error) {
            skipped.push({ file: relative, code: 'exception', detail: error.message });
            continue;
        }

        for (const note of result.notes) {
            const key = note.level + ':' + note.code;
            noteCounts.set(key, (noteCounts.get(key) || 0) + 1);
        }
        for (const type of result.unknownTypes) {
            unknownTypes.set(type, (unknownTypes.get(type) || 0) + 1);
        }

        if (!result.spec) {
            const note = result.notes[0] || { code: 'unknown' };
            if (note.code !== 'no_method_in_h1' && note.code !== 'no_params_section') {
                skipped.push({ file: relative, code: note.code });
            }
            continue;
        }

        // Одному методу может соответствовать несколько страниц (например, v2 и v3).
        // Берём первую и отмечаем дубль, чтобы не перезаписывать схему молча.
        if (byMethod.has(result.spec.method)) {
            skipped.push({ file: relative, code: 'duplicate_method', detail: result.spec.method });
            continue;
        }

        result.spec.page = pagePathOf(relative);
        result.spec.executable = READ_EXECUTABLE.includes(result.spec.method);

        byMethod.set(result.spec.method, result.spec);
        specs.push(result.spec);
    }

    attachEntityFields(specs, byMethod);
    const examples = attachRequestExample(specs);
    const hints = attachDatasetHint(specs);

    report(specs, skipped, noteCounts, unknownTypes);

    if (lintOnly) {
        return;
    }

    write(specs);
}

// Имена полей из первой таблицы страницы-справочника полей.
function fieldNamesFromPage(relativePath) {
    const file = path.join(ROOT, relativePath);
    if (!fs.existsSync(file)) {
        return [];
    }

    const tables = parseTables(fs.readFileSync(file, 'utf8'));
    if (!tables.length) {
        return [];
    }

    return tables[0].rows
        .slice(1)
        .map((row) => {
            const match = row[0] && row[0].match(/\*\*([^*\n]+?)\*\*/);
            return match ? match[1].trim() : null;
        })
        .filter(Boolean);
}

// Ключи объектов из примера успешного ответа — ещё один источник имён полей.
function fieldNamesFromExample(example) {
    if (!example || typeof example !== 'object') {
        return [];
    }

    let node = example.result;
    if (node && !Array.isArray(node) && typeof node === 'object') {
        const nested = Object.keys(node).find((key) => Array.isArray(node[key]) || typeof node[key] === 'object');
        if (nested && !isScalarRecord(node)) {
            node = node[nested];
        }
    }
    if (Array.isArray(node)) {
        node = node[0];
    }

    return node && typeof node === 'object' && !Array.isArray(node) ? Object.keys(node) : [];
}

function isScalarRecord(node) {
    return Object.keys(node).every((key) => node[key] === null || typeof node[key] !== 'object');
}

// Списочным и get-методам добавляем состав полей сущности: по нему проверяются
// имена в filter, order и select — иначе опечатка в поле остаётся незамеченной.
function attachEntityFields(specs, byMethod) {
    for (const spec of specs) {
        if (spec.kind !== 'read' || !/\.(list|get)$/.test(spec.method)) {
            continue;
        }

        const entity = spec.method.replace(/\.(list|get)$/, '');
        const names = new Set();

        const adder = byMethod.get(entity + '.add');
        if (adder && adder.defs && adder.defs.fieldsFields) {
            adder.defs.fieldsFields.fields.forEach((field) => names.add(field.name));
        }

        if (FIELD_PAGES[entity]) {
            fieldNamesFromPage(FIELD_PAGES[entity]).forEach((name) => names.add(name));
        }

        fieldNamesFromExample(spec.resultExample).forEach((name) => names.add(name));

        if (names.size) {
            spec.entityFields = [...names].sort();
        }
    }
}

// Рабочий пример вызова. У ИИ-агента список параметров есть, а вызова,
// который точно проходит, — нет: отсюда «не передан обязательный параметр»
// как самый частый класс ошибок. Пример на странице обычно есть, но до
// схемы не доезжал.
//
// Кладём ТОЛЬКО тот, что проходит нашу же валидацию. Пример, противоречащий
// собственной таблице параметров, научит агента ошибке вместо вызова.
function attachRequestExample(specs) {
    const bodyRe = /-d\s+'((?:[^']|'"[^"]*"')*)'\s*\\?\s*\n/g;
    let attached = 0;
    let rejected = 0;

    for (const spec of specs) {
        const file = spec.source && spec.source.file;
        if (!file || !fs.existsSync(file)) {
            continue;
        }
        const markdown = fs.readFileSync(file, 'utf8');
        bodyRe.lastIndex = 0;

        let match;
        while ((match = bodyRe.exec(markdown)) !== null) {
            const raw = match[1].trim();
            if (!raw.startsWith('{')) {
                continue;
            }
            // Подстановки оболочки — не пример, а шаблон.
            if (/\$\(|\$\{|`|'"|\$[A-Za-z_]/.test(raw)) {
                continue;
            }
            let body;
            try {
                body = JSON.parse(raw);
            } catch (error) {
                continue;
            }

            // Авторизация — транспорт, а не параметр метода: в OAuth-примерах
            // она стоит по делу, но в таблице её нет. Убираем, как в check-examples.js.
            delete body.auth;

            const verdict = B24Sim.validate(spec, body);
            if (verdict && verdict.ok) {
                spec.requestExample = body;
                attached += 1;
                break;
            }
            rejected += 1;
        }
    }
    return { attached, rejected };
}

// Какие идентификаторы реально лежат в тестовом датасете. Без этого агент
// подставляет единицу, получает «не найдено» и не понимает почему: у задач
// идентификаторы начинаются со 100.
function attachDatasetHint(specs) {
    const file = path.join(OUT_DIR, '..', 'fixtures', 'dataset.json');
    if (!fs.existsSync(file)) {
        return 0;
    }
    const dataset = JSON.parse(fs.readFileSync(file, 'utf8'));
    let attached = 0;
    const brokenRunnable = [];

    for (const spec of specs) {
        const entity = METHOD_ENTITY[spec.method];
        const items = entity && dataset.entities && dataset.entities[entity];
        if (!items || !items.length) {
            continue;
        }

        const ids = items.map((item) => String(item.id !== undefined ? item.id : item.ID));
        const hint = { entity, count: items.length };
        const nums = ids.every((x) => /^\d+$/.test(x)) ? ids.map(Number).sort((a, b) => a - b) : null;

        if (nums && nums[nums.length - 1] - nums[0] + 1 === nums.length) {
            hint.idFrom = nums[0];
            hint.idTo = nums[nums.length - 1];
        } else {
            hint.ids = (nums ? nums.map(String) : ids).slice(0, 12);
        }

        // Пример из документации ссылается на идентификаторы боевого
        // портала: скопировав его в песочницу, агент получит «не найдено».
        // Даём рядом тот же вызов с идентификатором, который здесь есть.
        const first = (nums ? nums.map(String) : ids)[0];
        const idValue = /^\d+$/.test(first) ? Number(first) : first;
        const isIdKey = (key) => /^(id|taskid)$/i.test(key);

        let runnable = null;
        if (spec.requestExample && Object.keys(spec.requestExample).some(isIdKey)) {
            runnable = {};
            for (const [key, value] of Object.entries(spec.requestExample)) {
                runnable[key] = isIdKey(key) ? idValue : value;
            }
        } else {
            const idParam = spec.params.find((param) => isIdKey(param.name));
            if (idParam) {
                // Примера нет или он не прошёл валидацию — собираем
                // минимальный сами: для get-метода это один параметр.
                runnable = { [idParam.name]: idValue };
            } else {
                // Списочный метод: годится пример со страницы, а если его
                // нет — пустой вызов, он у списков осмыслен.
                runnable = spec.requestExample || {};
            }
        }

        // Публикуем только то, что сами прогнали: пример, который не
        // работает, хуже отсутствующего.
        if (runnable) {
            const check = B24Sim.call(spec, runnable, dataset);
            if (check && !check.error) {
                hint.runnableExample = runnable;
            } else {
                brokenRunnable.push(spec.method + ' → ' + (check && check.error));
            }
        }

        spec.datasetHint = hint;
        attached += 1;
    }
    if (brokenRunnable.length) {
        console.warn('  примеры для песочницы не прошли прогон: ' + brokenRunnable.join('; '));
    }
    return attached;
}

function write(specs) {
    const methodsDir = path.join(OUT_DIR, 'methods');
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
    fs.mkdirSync(methodsDir, { recursive: true });

    for (const spec of specs) {
        fs.writeFileSync(path.join(methodsDir, spec.method + '.json'), JSON.stringify(spec, null, 2) + '\n', 'utf8');
    }

    const index = {
        $v: 1,
        generator: 'simulator/generate-spec.js',
        count: specs.length,
        methods: specs
            .map((spec) => ({
                method: spec.method,
                scope: spec.scope,
                kind: spec.kind,
                page: spec.page,
                executable: spec.executable,
                deprecated: Boolean(spec.deprecated),
                title: spec.title,
            }))
            .sort((a, b) => a.method.localeCompare(b.method)),
    };

    fs.writeFileSync(path.join(OUT_DIR, 'index.json'), JSON.stringify(index, null, 2) + '\n', 'utf8');

    // Компактная карта «страница → метод». Её грузит виджет на каждой странице,
    // поэтому полный index.json (со scope, заголовками и признаками) сюда не идёт.
    // Ключ нормализуется так же, как в виджете: без .html и без /index.
    const pages = {};
    specs.forEach((spec) => {
        pages[spec.page.replace(/\/index\.html$/, '/').replace(/\.html$/, '')] = spec.method;
    });
    fs.writeFileSync(path.join(OUT_DIR, 'pages.json'), JSON.stringify(pages) + '\n', 'utf8');

    console.log('\nЗаписано: ' + specs.length + ' схем в ' + path.relative(ROOT, OUT_DIR));
    console.log('  index.json: ' + kb(path.join(OUT_DIR, 'index.json')) + ', pages.json: ' + kb(path.join(OUT_DIR, 'pages.json')));
}

function report(specs, skipped, noteCounts, unknownTypes) {
    const totalParams = specs.reduce((sum, s) => sum + s.params.length, 0);
    const unknownRequired = specs.reduce(
        (sum, s) => sum + s.params.filter((p) => p.required === 'unknown').length,
        0
    );
    const withExample = specs.filter((s) => s.resultExample).length;
    const executable = specs.filter((s) => s.executable).length;

    console.log('=== Отчёт генератора схем ===');
    console.log('методов со схемой      : ' + specs.length);
    console.log('  из них read          : ' + specs.filter((s) => s.kind === 'read').length);
    console.log('  из них исполняемых   : ' + executable);
    console.log('  с примером ответа    : ' + withExample + ' (' + pct(withExample, specs.length) + ')');
    const withRequest = specs.filter((s) => s.requestExample).length;
    const withHint = specs.filter((s) => s.datasetHint).length;
    console.log('  с примером запроса   : ' + withRequest + ' (' + pct(withRequest, specs.length) + ')');
    console.log('  с подсказкой по датасету: ' + withHint);
    console.log('  deprecated           : ' + specs.filter((s) => s.deprecated).length);
    console.log('параметров всего       : ' + totalParams);
    console.log('  обязательность неясна: ' + unknownRequired + ' (' + pct(unknownRequired, totalParams) + ')');

    if (noteCounts.size) {
        console.log('\nЗамечания:');
        [...noteCounts.entries()]
            .sort((a, b) => b[1] - a[1])
            .forEach(([key, count]) => console.log('  ' + String(count).padStart(5) + '  ' + key));
    }

    if (unknownTypes.size) {
        console.log('\nНеизвестные типы (нет в TYPE_MAP):');
        [...unknownTypes.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 25)
            .forEach(([type, count]) => console.log('  ' + String(count).padStart(5) + '  ' + type));
    }

    if (skipped.length) {
        console.log('\nПропущенные страницы: ' + skipped.length);
        skipped.slice(0, 15).forEach((s) => console.log('  ' + s.code + '  ' + s.file + (s.detail ? '  (' + s.detail + ')' : '')));
    }
}

function kb(file) {
    return Math.round(fs.statSync(file).size / 1024) + ' КБ';
}

function pct(part, total) {
    return total ? Math.round((part / total) * 1000) / 10 + '%' : '0%';
}

main();
