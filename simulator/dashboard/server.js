'use strict';

// Дашборд статистики симулятора REST API Битрикс24.
//
// Приложение делает три вещи: принимает события песочницы, копит из них
// свёртки и отдаёт витрину. Хранилище файловое, зависимостей нет —
// на сервере Black Hole разворачивается одним деплоем.
//
//   POST /collect   события из виджета в браузере читателя (без секрета,
//                   проверяется Origin и частота)
//   POST /ingest    события с сервера песочницы (заголовок X-Ingest-Token)
//   GET  /api/stats витрина, открыта на чтение
//   GET  /          дашборд
//   GET  /api/health проверка живости для платформы
//
//   GET  /ai/v1/methods?scope=&q=  список и поиск методов
//   GET  /ai/v1/spec/{method}      схема метода
//   POST /ai/v1/call/{method}      проверка вызова и симулированный ответ
//
// Три последних — песочница для ИИ-агентов из PRD. Схемы и датасет тянутся
// с боевой документации, поэтому агент проверяет вызов ровно по тому
// контракту, который читает человек на странице метода.
//
// Смотреть статистику может любой, кто открыл ссылку: доступом управляет
// политика сервера в кабинете Вайбкод, приложение своей авторизации не
// заводит. Закрыты только пути записи — приём событий.

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { Store } = require('./lib/store');
const { build } = require('./lib/aggregate');
const { normalize } = require('./lib/classify');
const { RateLimiter } = require('./lib/ratelimit');
const { Sandbox, eventFor } = require('./lib/sandbox');

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = process.env.DATA_DIR || '/opt/data/b24sim-stats';
const INGEST_TOKEN = process.env.INGEST_TOKEN || '';
const PUBLIC_DIR = path.join(__dirname, 'public');
const VERSION = '1.0.0';

// Откуда принимаем события из браузера. Пусто — принимаем с любого
// источника; это осознанный запасной вариант для локальной отладки.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://apidocs.bitrix24.ru')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

const MAX_BODY = 256 * 1024;
const MAX_BATCH = 100;

const collectLimiter = new RateLimiter(120, 60 * 1000); // событий в минуту с адреса
const sandboxLimiter = new RateLimiter(60, 60 * 1000);  // вызовов песочницы в минуту с адреса, как в PRD
const SANDBOX_MAX_BODY = 64 * 1024;

const sandbox = new Sandbox();

const store = new Store({ dir: DATA_DIR });

// -------------------------------------------------------------- секреты

// Соль для хеша адреса живёт на диске: если генерировать её при старте,
// один и тот же посетитель после перезапуска считается новым.
function loadOrCreateSalt() {
    const file = path.join(DATA_DIR, 'salt');
    try {
        return fs.readFileSync(file, 'utf8').trim();
    } catch (error) {
        const salt = crypto.randomBytes(24).toString('hex');
        try {
            fs.writeFileSync(file, salt, { mode: 0o600 });
        } catch (writeError) {
            console.error('не удалось сохранить соль, адреса будут несопоставимы между перезапусками: ' + writeError.message);
        }
        return salt;
    }
}

// Сравнение за постоянное время: длина токена не должна утекать через
// время ответа.
function timingSafeEqual(a, b) {
    const bufA = Buffer.from(String(a));
    const bufB = Buffer.from(String(b));
    if (bufA.length !== bufB.length) {
        crypto.timingSafeEqual(bufA, bufA);
        return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
}

let SALT = '';

// Число доверенных прокси перед приложением. Приложение стоит за шлюзом
// Вайбкод, который дописывает реальный адрес в конец X-Forwarded-For.
const TRUSTED_HOPS = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1);

// Берём адрес, дописанный ближайшим доверенным прокси, а не первый в
// списке: первый приходит от клиента и подделывается одной строкой, из-за
// чего лимит частоты обходился сменой заголовка на каждый запрос.
function clientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded) {
        const chain = forwarded.split(',').map((part) => part.trim()).filter(Boolean);
        if (chain.length) {
            return chain[Math.max(0, chain.length - TRUSTED_HOPS)];
        }
    }
    return req.socket.remoteAddress || '';
}

function ipKey(req) {
    return crypto.createHash('sha256').update(SALT + clientIp(req)).digest('hex').slice(0, 16);
}

// ---------------------------------------------------------------- ответы

function send(res, status, body, headers) {
    const payload = typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body);
    res.writeHead(status, Object.assign({
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
    }, headers || {}));
    res.end(payload);
}

function corsHeaders(origin) {
    if (!origin) {
        return {};
    }
    if (ALLOWED_ORIGINS.length && !ALLOWED_ORIGINS.includes(origin)) {
        return {};
    }
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
    };
}

// Читает тело с потолком. Превышение — это отказ с кодом, а не разрыв
// соединения: клиент должен получить внятный ответ, поэтому поток мы
// приостанавливаем, а сокет закрываем уже после того, как ответ ушёл.
function readBody(req, res, limit) {
    const declared = Number(req.headers['content-length']);
    if (Number.isFinite(declared) && declared > limit) {
        return Promise.reject(new Error('BODY_TOO_LARGE'));
    }
    return new Promise((resolve, reject) => {
        let size = 0;
        let aborted = false;
        const chunks = [];
        req.on('data', (chunk) => {
            if (aborted) {
                return;
            }
            size += chunk.length;
            if (size > limit) {
                aborted = true;
                req.pause();
                res.on('finish', () => req.destroy());
                reject(new Error('BODY_TOO_LARGE'));
                return;
            }
            chunks.push(chunk);
        });
        req.on('end', () => {
            if (!aborted) {
                resolve(Buffer.concat(chunks).toString('utf8'));
            }
        });
        req.on('error', (error) => {
            if (!aborted) {
                reject(error);
            }
        });
    });
}

// ------------------------------------------------------------ приём событий

function eventsFrom(text) {
    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch (error) {
        return null;
    }
    if (Array.isArray(parsed)) {
        return parsed;
    }
    if (parsed && Array.isArray(parsed.events)) {
        return parsed.events;
    }
    if (parsed && typeof parsed === 'object') {
        return [parsed];
    }
    return null;
}

function ingest(rawEvents, req, trusted) {
    const now = Date.now();
    const userAgent = String(req.headers['user-agent'] || '').slice(0, 300);
    let accepted = 0;
    let skipped = 0;
    // Всё, что не влезло в пачку, раньше молча пропадало, а клиент получал
    // 200 OK и считал события доставленными.
    const dropped = Math.max(0, rawEvents.length - MAX_BATCH);

    for (const raw of rawEvents.slice(0, MAX_BATCH)) {
        const event = normalize(raw, { now, userAgent });
        if (!event) {
            skipped += 1;
            continue;
        }
        // Из браузера принимаем только виджет: канал api подделывать
        // незачем и нельзя — он приходит только с секретом.
        if (!trusted && event.channel !== 'widget') {
            skipped += 1;
            continue;
        }
        event.trusted = trusted;
        const dedupKey = typeof raw.id === 'string' ? raw.id.slice(0, 64) : null;
        if (store.add(event, dedupKey)) {
            accepted += 1;
        } else {
            skipped += 1;
        }
    }

    store.rejected += skipped + dropped;
    return { accepted, skipped, dropped, limit: MAX_BATCH };
}

// Событие песочницы кладётся в то же хранилище, что и события виджета:
// сеть между ними не нужна, они в одном процессе.
function recordSandbox(req, method, response, ms, forcedOutcome) {
    const raw = eventFor(method, response, ms);
    if (forcedOutcome) {
        raw.outcome = forcedOutcome;
    }
    // Агента опознаём по адресу: сессии как таковой у него нет.
    raw.session = ipKey(req);
    const event = normalize(raw, { now: Date.now(), userAgent: String(req.headers['user-agent'] || '') });
    if (event) {
        event.trusted = true;
        store.add(event, null);
    }
}

// ------------------------------------------------------------------ статика

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml' };

function serveStatic(res, name) {
    const file = path.join(PUBLIC_DIR, name);
    if (!file.startsWith(PUBLIC_DIR) || !fs.existsSync(file)) {
        send(res, 404, { error: 'NOT_FOUND' });
        return;
    }
    const body = fs.readFileSync(file);
    send(res, 200, body, {
        'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
    });
}

// ----------------------------------------------------------------- маршруты

async function handle(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const route = url.pathname;
    const origin = req.headers.origin;

    if (req.method === 'OPTIONS') {
        send(res, 204, '', corsHeaders(origin));
        return;
    }

    if (route === '/api/health') {
        send(res, 200, {
            status: 'ok',
            version: VERSION,
            uptimeMs: Date.now() - store.startedAt,
            ingested: store.ingested,
            configured: { ingestToken: Boolean(INGEST_TOKEN) },
            sandbox: sandbox.status(),
        });
        return;
    }

    // Приём из браузера. Секрета здесь быть не может — страница
    // документации публична, — поэтому опираемся на Origin и частоту.
    if (route === '/collect' && req.method === 'POST') {
        if (ALLOWED_ORIGINS.length && origin && !ALLOWED_ORIGINS.includes(origin)) {
            send(res, 403, { error: 'ORIGIN_NOT_ALLOWED' }, corsHeaders(origin));
            return;
        }
        if (!collectLimiter.check(ipKey(req))) {
            send(res, 429, { error: 'RATE_LIMITED' }, corsHeaders(origin));
            return;
        }
        let text;
        try {
            text = await readBody(req, res, MAX_BODY);
        } catch (error) {
            send(res, 413, { error: 'BODY_TOO_LARGE' }, corsHeaders(origin));
            return;
        }
        const events = eventsFrom(text);
        if (!events) {
            send(res, 400, { error: 'BAD_JSON' }, corsHeaders(origin));
            return;
        }
        const result = ingest(events, req, false);
        send(res, 200, result, corsHeaders(origin));
        return;
    }

    // Приём с сервера песочницы: канал api, доверенный, по секрету.
    if (route === '/ingest' && req.method === 'POST') {
        const token = req.headers['x-ingest-token'];
        if (!INGEST_TOKEN || !token || !timingSafeEqual(token, INGEST_TOKEN)) {
            send(res, 401, { error: 'UNAUTHORIZED' });
            return;
        }
        let text;
        try {
            text = await readBody(req, res, MAX_BODY);
        } catch (error) {
            send(res, 413, { error: 'BODY_TOO_LARGE' });
            return;
        }
        const events = eventsFrom(text);
        if (!events) {
            send(res, 400, { error: 'BAD_JSON' });
            return;
        }
        send(res, 200, ingest(events, req, true));
        return;
    }

    if (route === '/api/stats') {
        const custom = { from: url.searchParams.get('from'), to: url.searchParams.get('to') };
        send(res, 200, build(store, url.searchParams.get('range') || '7d', Date.now(), custom), { 'Cache-Control': 'no-store' });
        return;
    }

    // ------------------------------------------------------ песочница

    if (route.startsWith('/ai/v1/')) {
        const cors = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (!sandboxLimiter.check(ipKey(req))) {
            send(res, 429, {
                error: 'RATE_LIMITED',
                error_description: 'Слишком много запросов. Повторите через минуту.',
            }, Object.assign({ 'Retry-After': '60' }, cors));
            return;
        }

        try {
            await sandbox.refresh(false);
        } catch (error) {
            send(res, 503, {
                error: 'SIMULATOR_UNAVAILABLE',
                error_description: 'Схемы методов недоступны: ' + error.message,
            }, cors);
            return;
        }

        if (req.method === 'GET' && route === '/ai/v1/methods') {
            send(res, 200, sandbox.list(url.searchParams.get('scope'), url.searchParams.get('q')), cors);
            return;
        }

        if (req.method === 'GET' && route.startsWith('/ai/v1/spec/')) {
            const method = decodeURIComponent(route.slice('/ai/v1/spec/'.length));
            const spec = await sandbox.spec(method);
            if (!spec) {
                send(res, 404, {
                    error: 'UNKNOWN_METHOD',
                    error_description: 'Метод ' + method + ' не описан схемой.',
                }, cors);
                return;
            }
            send(res, 200, spec, cors);
            return;
        }

        if (req.method === 'POST' && route.startsWith('/ai/v1/call/')) {
            const method = decodeURIComponent(route.slice('/ai/v1/call/'.length));
            const started = Date.now();

            const spec = await sandbox.spec(method);
            if (!spec) {
                send(res, 404, {
                    error: 'UNKNOWN_METHOD',
                    error_description: 'Метод ' + method + ' не описан схемой.',
                }, cors);
                recordSandbox(req, method, { error: 'UNKNOWN_METHOD' }, Date.now() - started, 'unknown_method');
                return;
            }

            let raw;
            try {
                raw = await readBody(req, res, SANDBOX_MAX_BODY);
            } catch (error) {
                send(res, 413, {
                    error: 'BODY_TOO_LARGE',
                    error_description: 'Тело запроса больше 64 КБ.',
                }, cors);
                return;
            }

            // Секрет мог приехать в самом адресе — проверяем до разбора тела.
            if (sandbox.findSecretInUrl(req.url, url.searchParams)) {
                const rejected = {
                    error: 'SECURITY_REJECTED',
                    error_description: 'Адрес запроса содержит секрет. Симулятор не выполняет реальных вызовов и не принимает вебхуки и токены.',
                };
                send(res, 400, rejected, cors);
                recordSandbox(req, method, rejected, Date.now() - started, 'rejected_secret');
                return;
            }

            let params = {};
            if (raw.trim()) {
                try {
                    params = JSON.parse(raw);
                } catch (error) {
                    send(res, 400, {
                        error: 'BAD_JSON',
                        error_description: 'Тело запроса не является корректным JSON.',
                    }, cors);
                    return;
                }
            }

            const response = sandbox.call(spec, params);
            const status = response.error ? 400 : 200;
            send(res, status, response, Object.assign({ 'Cache-Control': 'no-store' }, cors));
            recordSandbox(req, method, response, Date.now() - started);
            return;
        }

        send(res, 404, {
            error: 'NOT_FOUND',
            error_description: 'Неизвестный маршрут. Доступны /ai/v1/methods, /ai/v1/spec/{method}, /ai/v1/call/{method}.',
        }, cors);
        return;
    }

    if (route === '/' || route === '/index.html') {
        serveStatic(res, 'index.html');
        return;
    }

    if (route === '/app.js' || route === '/style.css') {
        serveStatic(res, route.slice(1));
        return;
    }

    send(res, 404, { error: 'NOT_FOUND' });
}

// ------------------------------------------------------------------- запуск

const server = http.createServer((req, res) => {
    handle(req, res).catch((error) => {
        console.error('необработанная ошибка: ' + (error && error.stack ? error.stack : error));
        if (!res.headersSent) {
            send(res, 500, { error: 'INTERNAL' });
        }
    });
});

function start() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    SALT = loadOrCreateSalt();
    store.init();

    if (!INGEST_TOKEN) {
        console.error('ВНИМАНИЕ: INGEST_TOKEN не задан — приём событий с сервера песочницы отключён.');
    }

    setInterval(() => store.save(), 15000).unref();

    // Уборка запускается сразу на старте и дальше раз в полчаса. Шестичасовой
    // таймер на сервере Black Hole не срабатывал никогда: сервер засыпает
    // после часа простоя, и до срабатывания дело не доходило — журнал и
    // часовые свёртки росли без границ. Запуск на старте гарантирует уборку
    // после каждого пробуждения.
    store.prune(Date.now());
    setInterval(() => store.prune(Date.now()), 30 * 60 * 1000).unref();

    // Прогреваем схемы заранее: первый агент не должен ждать загрузку.
    sandbox.refresh(true).then(
        () => console.error('песочница готова: методов ' + sandbox.status().methods + ', датасет ' + sandbox.status().dataset),
        (error) => console.error('песочница не поднялась: ' + error.message + ' — попробует снова при первом запросе')
    );

    server.listen(PORT, () => {
        console.error('b24sim-stats ' + VERSION + ' слушает порт ' + PORT + ', данные в ' + DATA_DIR);
    });
}

function shutdown(signal) {
    console.error('получен ' + signal + ', сохраняю свёртки');
    store.close();
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

if (require.main === module) {
    start();
}

module.exports = { server, handle, store, start };
