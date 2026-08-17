'use strict';

// Сверка примеров в документации со схемами методов (FR-6 PRD).
//
//   node simulator/check-examples.js            — отчёт
//   node simulator/check-examples.js --strict   — ненулевой код возврата при расхождениях
//   node simulator/check-examples.js --baseline — перезаписать список известных расхождений
//
// Из cURL-примеров на страницах методов достаётся тело запроса и прогоняется через
// валидатор. Так примеры перестают расходиться с таблицами параметров незаметно.
//
// Расхождений на старте много, поэтому работает подход «заморозить и не ухудшать»:
// известные записаны в simulator/examples-baseline.json, падает проверка только на новых.

const fs = require('fs');
const path = require('path');

const B24Sim = require('./lib/core.js');

const ROOT = path.resolve(__dirname, '..');
const SPEC_DIR = path.join(ROOT, '_assets', 'simulator', 'spec', 'methods');
const BASELINE_FILE = path.join(__dirname, 'examples-baseline.json');

const strict = process.argv.includes('--strict');
const rewriteBaseline = process.argv.includes('--baseline');

// В примерах адрес портала и токен заменены плейсхолдерами — их фильтр секретов
// принимать не должен, поэтому проверяем только тело запроса.
function extractCurlBodies(markdown) {
    const bodies = [];
    const re = /-d\s+'([\s\S]*?)'\s*\\?\s*\n/g;
    let match;

    while ((match = re.exec(markdown)) !== null) {
        const raw = match[1].trim();
        if (!raw.startsWith('{')) {
            continue;
        }

        // Часть примеров намеренно не JSON: подстановки оболочки ($(date ...)) и
        // переменные окружающего кода. Это не дефект документации.
        if (/\$\(|\$\{|`/.test(raw)) {
            bodies.push({ __templated: true });
            continue;
        }

        try {
            bodies.push(JSON.parse(raw));
        } catch (error) {
            bodies.push({ __unparsable: raw.slice(0, 80) });
        }
    }

    return bodies;
}

function loadSpecs() {
    if (!fs.existsSync(SPEC_DIR)) {
        console.error('Схемы не сгенерированы. Выполните: node simulator/build.js');
        process.exit(1);
    }

    return fs
        .readdirSync(SPEC_DIR)
        .filter((name) => name.endsWith('.json'))
        .map((name) => JSON.parse(fs.readFileSync(path.join(SPEC_DIR, name), 'utf8')));
}

// «В таблице id, в примере ID» приезжает двумя ошибками сразу. Схлопываем в одну
// с понятным классом: это расхождение регистра, а не два разных дефекта.
function collapseCaseMismatch(errors, spec) {
    const known = spec.params.map((param) => param.name);
    const result = [];
    const consumed = new Set();

    errors.forEach((error) => {
        if (error.class !== 'unknown_param' || error.param.indexOf('.') !== -1) {
            return;
        }
        const twin = known.find((name) => name !== error.param && name.toLowerCase() === error.param.toLowerCase());
        if (!twin) {
            return;
        }
        consumed.add(error);
        consumed.add(errors.find((other) => other.class === 'missing_required' && other.param === twin));
        result.push({ class: 'case_mismatch', param: error.param + ' ↔ ' + twin });
    });

    errors.forEach((error) => {
        if (!consumed.has(error)) {
            result.push(error);
        }
    });

    return result;
}

function main() {
    const specs = loadSpecs();
    const findings = [];
    let checked = 0;
    let templated = 0;
    let withExamples = 0;

    for (const spec of specs) {
        const page = path.join(ROOT, spec.source.file);
        if (!fs.existsSync(page)) {
            continue;
        }

        const bodies = extractCurlBodies(fs.readFileSync(page, 'utf8'));
        if (!bodies.length) {
            continue;
        }
        withExamples++;

        bodies.forEach((body, index) => {
            if (body.__templated) {
                templated++;
                return;
            }

            checked++;

            if (body.__unparsable) {
                findings.push({ method: spec.method, index, class: 'unparsable_json', detail: body.__unparsable });
                return;
            }

            // Из тела примера убираем авторизацию: в OAuth-примерах она есть по делу.
            const params = Object.assign({}, body);
            delete params.auth;

            const validation = B24Sim.validate(spec, params);
            const errors = collapseCaseMismatch(validation.errors, spec);

            errors.forEach((error) => {
                findings.push({
                    method: spec.method,
                    index,
                    class: error.class,
                    detail: error.param + (error.expected ? ' (ожидается ' + error.expected + ', в примере ' + error.got + ')' : ''),
                });
            });
        });
    }

    findings.sort((a, b) => a.method.localeCompare(b.method) || a.index - b.index || a.class.localeCompare(b.class));

    const keys = findings.map((f) => f.method + '#' + f.index + '#' + f.class + '#' + f.detail);

    if (rewriteBaseline) {
        fs.writeFileSync(BASELINE_FILE, JSON.stringify({ $v: 1, known: keys }, null, 2) + '\n', 'utf8');
        console.log('Базовая линия перезаписана: ' + keys.length + ' известных расхождений');
        return;
    }

    const baseline = fs.existsSync(BASELINE_FILE) ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')).known : [];
    const knownSet = new Set(baseline);
    const fresh = findings.filter((f, i) => !knownSet.has(keys[i]));
    const fixed = baseline.filter((key) => keys.indexOf(key) === -1);

    console.log('=== Сверка примеров документации со схемами ===');
    console.log('страниц с примерами   : ' + withExamples);
    console.log('примеров проверено    : ' + checked);
    console.log('пропущено шаблонных   : ' + templated);
    console.log('расхождений всего     : ' + findings.length);
    console.log('  известных           : ' + (findings.length - fresh.length));
    console.log('  новых               : ' + fresh.length);
    console.log('  исправлено с прошлого раза: ' + fixed.length);

    const byClass = new Map();
    findings.forEach((f) => byClass.set(f.class, (byClass.get(f.class) || 0) + 1));
    if (byClass.size) {
        console.log('\nПо классам:');
        [...byClass.entries()].sort((a, b) => b[1] - a[1]).forEach(([name, count]) => console.log('  ' + String(count).padStart(5) + '  ' + name));
    }

    if (fresh.length) {
        console.log('\nНовые расхождения:');
        fresh.slice(0, 25).forEach((f) => console.log('  ' + f.method + ' [пример ' + f.index + '] ' + f.class + ': ' + f.detail));
        if (fresh.length > 25) {
            console.log('  … ещё ' + (fresh.length - 25));
        }
    }

    if (strict && fresh.length) {
        process.exit(1);
    }
}

main();
