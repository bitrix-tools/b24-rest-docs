'use strict';

// Сборка архива для деплоя на сервер Black Hole.
//   node simulator/dashboard/package.js [выходной-файл]
//
// Ядро валидации копируется из simulator/lib/core.js: песочница исполняет
// код из репозитория, а не скачанный с сайта. Схемы и датасет в архив не
// кладём — они тянутся с боевой документации, чтобы не разойтись с ней.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const HERE = __dirname;
const OUT = process.argv[2] || '/tmp/b24sim-stats.tgz';
const STAGE = fs.mkdtempSync(path.join(require('os').tmpdir(), 'b24pkg-'));

const INCLUDE = ['server.js', 'package.json', 'test.js', 'lib', 'public'];

for (const entry of INCLUDE) {
    fs.cpSync(path.join(HERE, entry), path.join(STAGE, entry), { recursive: true });
}
fs.copyFileSync(path.join(HERE, '..', 'lib', 'core.js'), path.join(STAGE, 'lib', 'core.js'));

// macOS кладёт в архив свои метаданные, платформа потом их вычищает и
// пишет об этом в лог — проще не создавать их вовсе.
execFileSync('tar', ['-czf', OUT, '-C', STAGE, '.'], { env: Object.assign({}, process.env, { COPYFILE_DISABLE: '1' }) });
fs.rmSync(STAGE, { recursive: true, force: true });

const size = fs.statSync(OUT).size;
console.log('архив: ' + OUT + ', ' + Math.round(size / 1024) + ' КБ');
