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

console.log('\nГотово.');
