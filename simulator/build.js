'use strict';

// Полная сборка ассетов симулятора:
//
//   node simulator/build.js [--date=YYYY-MM-DD]
//
// 1. схемы методов из страниц документации;
// 2. детерминированный тестовый датасет;
// 3. ядро и виджет копируются в _assets/simulator/.
//
// Результат коммитится в репозиторий: сайт собирается статикой, отдельного
// шага сборки для ассетов в пайплайне документации нет.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { TELEMETRY, SANDBOX_BASE, READ_EXECUTABLE } = require('./lib/config');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '_assets', 'simulator');

const dateArg = process.argv.find((a) => a.startsWith('--date='));

function run(script, args) {
    console.log('\n$ node simulator/' + script + (args.length ? ' ' + args.join(' ') : ''));
    execFileSync(process.execPath, [path.join(__dirname, script)].concat(args), { stdio: 'inherit' });
}

function copy(from, to) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
    console.log('  ' + path.relative(ROOT, to));
}

run('generate-spec.js', []);
run('generate-fixtures.js', dateArg ? [dateArg] : []);

console.log('\nКопирование runtime:');
copy(path.join(__dirname, 'widget', 'boot.js'), path.join(OUT, 'boot.js'));
copy(path.join(__dirname, 'lib', 'core.js'), path.join(OUT, 'core.js'));
copy(path.join(__dirname, 'widget', 'widget.js'), path.join(OUT, 'widget.js'));
copy(path.join(__dirname, 'widget', 'widget.css'), path.join(OUT, 'widget.css'));

// Телеметрия собирается с конфигом впереди: так виджет узнаёт адрес
// дашборда без лишнего запроса за настройками на каждой странице.
const telemetryOut = path.join(OUT, 'telemetry.js');
const browserConfig = {
    endpoint: TELEMETRY.endpoint,
    enabled: TELEMETRY.enabled,
    sampling: TELEMETRY.sampling,
    respectDoNotTrack: TELEMETRY.respectDoNotTrack,
};
fs.writeFileSync(
    telemetryOut,
    'window.B24SimTelemetryConfig = ' + JSON.stringify(browserConfig) + ';\n'
        + fs.readFileSync(path.join(__dirname, 'lib', 'telemetry.js'), 'utf8')
);
console.log('  ' + path.relative(ROOT, telemetryOut) + '  (сбор ' + (TELEMETRY.enabled ? 'включён' : 'выключен') + ')');

// Манифест — единственный адрес, который агенту нужно знать наизусть.
// Из него он узнаёт, где схемы, где датасет, где ядро и куда слать вызов.
// Раньше агент шёл по адресу из документации, упирался в 404 и уходил.
const index = JSON.parse(fs.readFileSync(path.join(OUT, 'spec', 'index.json'), 'utf8'));
const manifest = {
    $v: 1,
    name: 'Симулятор REST API Битрикс24',
    docs: 'https://apidocs.bitrix24.ru/ai-tools/simulator.html',
    generatedAt: new Date().toISOString().slice(0, 10),
    methods: index.count,
    static: {
        index: '/_assets/simulator/spec/index.json',
        method: '/_assets/simulator/spec/methods/{method}.json',
        pages: '/_assets/simulator/spec/pages.json',
        dataset: '/_assets/simulator/fixtures/dataset.json',
        core: '/_assets/simulator/core.js',
        note: 'Ядро — CommonJS-модуль: скачайте файлом и подключите через require. Вызов: B24Sim.call(spec, params, dataset).',
    },
    service: {
        base: SANDBOX_BASE,
        methods: SANDBOX_BASE + '/ai/v1/methods?scope={scope}&q={query}',
        spec: SANDBOX_BASE + '/ai/v1/spec/{method}',
        call: SANDBOX_BASE + '/ai/v1/call/{method}',
        status: 'pilot',
        note: 'Постоянный адрес на домене документации появится позже. Статические артефакты доступны всегда.',
    },
    executable: READ_EXECUTABLE,
    confidence: 'parsed — схемы выведены из текста документации и не сверялись с реальным порталом',
    rules: [
        'Никогда не передавайте в симулятор вебхуки и токены: такие запросы отклоняются с SECURITY_REJECTED.',
        'Реальные вызовы выполняйте напрямую на своём портале.',
        'Ответ повторяет форму реального REST API, метаданные симуляции лежат в ключе simulator.',
    ],
};
const manifestOut = path.join(OUT, 'manifest.json');
fs.writeFileSync(manifestOut, JSON.stringify(manifest, null, 2) + '\n');
console.log('  ' + path.relative(ROOT, manifestOut) + '  (методов ' + manifest.methods + ')');

console.log('\nГотово.');
