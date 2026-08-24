'use strict';

// HTTP-endpoint симулятора для ИИ-агентов (фаза 2 PRD).
//
//   node simulator/server.js [--port=8080]
//
//   GET  /ai/v1/methods?scope=crm&q=deal   список и поиск методов
//   GET  /ai/v1/spec/{method}              схема метода
//   POST /ai/v1/call/{method}              валидация параметров + симулированный ответ
//
// Сервис stateless и работает на тех же артефактах, что и виджет: схемы из
// _assets/simulator/spec и датасет из _assets/simulator/fixtures. Реальных вызовов
// не делает и секретов не принимает.

const fs = require('fs');
const http = require('http');
const path = require('path');
const crypto = require('crypto');

const B24Sim = require('./lib/core.js');

const ROOT = path.resolve(__dirname, '..');
const SPEC_DIR = path.join(ROOT, '_assets', 'simulator', 'spec');
const DATASET_FILE = path.join(ROOT, '_assets', 'simulator', 'fixtures', 'dataset.json');

const MAX_BODY = 64 * 1024;
const RATE_LIMIT = 60; // запросов в минуту на IP
const RATE_WINDOW = 60 * 1000;

const portArg = process.argv.find((a) => a.startsWith('--port='));
const PORT = Number(portArg ? portArg.slice('--port='.length) : process.env.PORT || 8080);

function loadJson(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

if (!fs.existsSync(path.join(SPEC_DIR, 'index.json'))) {
    console.error('Схемы не сгенерированы. Выполните: node simulator/build.js');
    process.exit(1);
}

const index = loadJson(path.join(SPEC_DIR, 'index.json'));
const dataset = loadJson(DATASET_FILE);
const specCache = new Map();

function loadSpec(method) {
    if (specCache.has(method)) {
        return specCache.get(method);
    }
    // Имя метода приходит из URL — в путь пускаем только безопасные символы.
    if (!/^[a-z0-9_.]+$/i.test(method)) {
        return null;
    }
    const file = path.join(SPEC_DIR, 'methods', method + '.json');
    if (!fs.existsSync(file)) {
        return null;
    }
    const spec = loadJson(file);
    specCache.set(method, spec);
    return spec;
}

// ------------------------------------------------------------ rate limit и логи

const hits = new Map();

function rateLimited(ip) {
    const now = Date.now();
    const bucket = (hits.get(ip) || []).filter((time) => now - time < RATE_WINDOW);
    bucket.push(now);
    hits.set(ip, bucket);

    if (hits.size > 5000) {
        hits.clear(); // защита от роста памяти на длинной сессии
    }

    return bucket.length > RATE_LIMIT;
}

const IP_SALT = crypto.randomBytes(16).toString('hex');

function hashIp(ip) {
    return crypto.createHash('sha256').update(IP_SALT + String(ip)).digest('hex').slice(0, 12);
}

// Тела запросов не сохраняем — только факт вызова и его исход.
function logEvent(event) {
    process.stdout.write(JSON.stringify(event) + '\n');
}

// ---------------------------------------------------------------------- ответы

function send(res, status, payload, extraHeaders) {
    const body = JSON.stringify(payload);
    res.writeHead(
        status,
        Object.assign(
            {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store',
            },
            extraHeaders || {}
        )
    );
    res.end(body);
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];

        req.on('data', (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY) {
                reject(new Error('body_too_large'));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });
        req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        req.on('error', reject);
    });
}

// -------------------------------------------------------------------- маршруты

function listMethods(query) {
    const scope = query.get('scope');
    const search = (query.get('q') || '').toLowerCase();

    const methods = index.methods.filter((entry) => {
        if (scope && entry.scope !== scope) {
            return false;
        }
        if (search && entry.method.toLowerCase().indexOf(search) === -1 && String(entry.title || '').toLowerCase().indexOf(search) === -1) {
            return false;
        }
        return true;
    });

    return { count: methods.length, methods: methods.slice(0, 200) };
}

async function handle(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const ip = req.socket.remoteAddress;

    if (req.method === 'OPTIONS') {
        send(res, 204, {});
        return { outcome: 'preflight' };
    }

    if (rateLimited(ip)) {
        send(res, 429, { error: 'RATE_LIMITED', error_description: 'Слишком много запросов. Повторите через минуту.' }, { 'Retry-After': '60' });
        return { outcome: 'rate_limited' };
    }

    if (req.method === 'GET' && url.pathname === '/ai/v1/methods') {
        send(res, 200, listMethods(url.searchParams));
        return { outcome: 'ok' };
    }

    if (req.method === 'GET' && url.pathname.startsWith('/ai/v1/spec/')) {
        const method = decodeURIComponent(url.pathname.slice('/ai/v1/spec/'.length));
        const spec = loadSpec(method);
        if (!spec) {
            send(res, 404, { error: 'UNKNOWN_METHOD', error_description: 'Схема метода ' + method + ' не найдена.' });
            return { outcome: 'unknown_method', method };
        }
        send(res, 200, spec);
        return { outcome: 'ok', method };
    }

    if (req.method === 'POST' && url.pathname.startsWith('/ai/v1/call/')) {
        const method = decodeURIComponent(url.pathname.slice('/ai/v1/call/'.length));
        const spec = loadSpec(method);

        if (!spec) {
            send(res, 404, { error: 'UNKNOWN_METHOD', error_description: 'Метод ' + method + ' не описан схемой.' });
            return { outcome: 'unknown_method', method };
        }

        let raw;
        try {
            raw = await readBody(req);
        } catch (error) {
            send(res, 413, { error: 'BODY_TOO_LARGE', error_description: 'Тело запроса больше 64 КБ.' });
            return { outcome: 'body_too_large', method };
        }

        // Секрет мог приехать в самом URL — проверяем до разбора тела.
        const inUrl = B24Sim.findSecret({ url: req.url });
        let params = {};

        if (raw.trim()) {
            try {
                params = JSON.parse(raw);
            } catch (error) {
                send(res, 400, { error: 'BAD_JSON', error_description: 'Тело запроса не является корректным JSON.' });
                return { outcome: 'bad_json', method };
            }
        }

        if (inUrl) {
            send(res, 400, {
                error: 'SECURITY_REJECTED',
                error_description:
                    'Адрес запроса содержит секрет. Симулятор не выполняет реальных вызовов и не принимает вебхуки и токены.',
            });
            return { outcome: 'rejected_secret', method };
        }

        const response = B24Sim.call(spec, params, dataset);
        const status = response.error === 'SECURITY_REJECTED' ? 400 : response.error ? 400 : 200;

        send(res, status, response, { 'Cache-Control': 'no-store' });

        return {
            outcome: response.error ? (response.error === 'SECURITY_REJECTED' ? 'rejected_secret' : 'invalid') : 'valid',
            method,
        };
    }

    send(res, 404, { error: 'NOT_FOUND', error_description: 'Неизвестный маршрут. Доступны /ai/v1/methods, /ai/v1/spec/{method}, /ai/v1/call/{method}.' });
    return { outcome: 'not_found' };
}

const server = http.createServer((req, res) => {
    const started = Date.now();

    handle(req, res)
        .catch((error) => {
            if (!res.headersSent) {
                send(res, 500, { error: 'INTERNAL', error_description: 'Внутренняя ошибка симулятора.' });
            }
            return { outcome: 'error', detail: String(error).slice(0, 120) };
        })
        .then((info) => {
            logEvent({
                ts: new Date().toISOString(),
                channel: 'api',
                path: req.url.split('?')[0],
                method: (info && info.method) || null,
                outcome: (info && info.outcome) || 'unknown',
                ip_hash: hashIp(req.socket.remoteAddress),
                ms: Date.now() - started,
            });
        });
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.error('Симулятор: http://localhost:' + PORT + '/ai/v1/methods  (схем: ' + index.count + ', датасет: ' + dataset.version + ')');
    });
}

module.exports = { server, handle };
