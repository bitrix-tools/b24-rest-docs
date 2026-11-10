'use strict';

// Переносит обращения агентов к артефактам песочницы из access-лога nginx
// в статистику.
//
//   node simulator/ship-access-log.js /var/log/nginx/apidocs.access.log
//   node simulator/ship-access-log.js --dry /var/log/nginx/apidocs.access.log
//   cat access.log | node simulator/ship-access-log.js -
//
// Зачем: агент, который забрал схему с документации и проверяет вызов у
// себя, для дашборда невидим — его запросы уходят на веб-сервер мимо
// нашего кода. Единственный след остаётся в логе, и только здесь его можно
// подобрать.
//
// Переменные окружения:
//   B24SIM_STATS_INGEST_URL  адрес приёмника (по умолчанию из lib/config)
//   B24SIM_STATS_TOKEN       секрет приёмника, обязателен
//   B24SIM_LOG_STATE         файл с позицией последней обработки

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const { TELEMETRY } = require('./lib/config.js');

const DRY = process.argv.includes('--dry');
const FILES = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const URL_INGEST = process.env.B24SIM_STATS_INGEST_URL || TELEMETRY.endpoint.replace(/\/collect$/, '/ingest');
const TOKEN = process.env.B24SIM_STATS_TOKEN || '';
const STATE_FILE = process.env.B24SIM_LOG_STATE || path.join(require('os').tmpdir(), 'b24sim-log-state.json');
const SALT = process.env.B24SIM_IP_SALT || '';
const BATCH = 100;

// Общий формат nginx: адрес - - [время] "МЕТОД путь HTTP/1.1" код байт "реферер" "клиент"
const LINE = /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+)[^"]*" (\d{3}) \S+ "([^"]*)" "([^"]*)"/;

const ASSETS = '/_assets/simulator/';

// Виджет в браузере тянет эти же файлы, но о себе он отчитывается сам —
// второй раз считать их значит удвоить людей и записать их в агенты.
const BROWSER_ONLY = ['widget.js', 'widget.css', 'boot.js', 'telemetry.js'];
const BROWSER_UA = /mozilla|applewebkit|chrome|safari|firefox|edge|opera/i;
const BOT_UA = /bot|crawler|spider|curl|wget|python|httpx|aiohttp|axios|node-fetch|go-http-client|okhttp|postman|insomnia|guzzle|scrapy|claude|gpt|openai|anthropic|llm|agent/i;

function hashIp(ip) {
    return crypto.createHash('sha256').update(SALT + ip).digest('hex').slice(0, 16);
}

// Время в логе nginx: 07/Sep/2026:16:51:24 +0300
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

function parseTime(raw) {
    const m = /^(\d{2})\/(\w{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2})$/.exec(raw);
    if (!m) {
        return null;
    }
    const offset = (Number(m[8]) * 60 + Number(m[9])) * (m[7] === '-' ? 1 : -1);
    return new Date(Date.UTC(+m[3], MONTHS[m[2]], +m[1], +m[4], +m[5], +m[6]) + offset * 60000).toISOString();
}

// Решает, что означает строка лога. null — строка нас не касается.
function classify(pathname, status, referer, ua) {
    // Агент пошёл по адресу из документации и упёрся в отсутствующий
    // сервис. Это самый ценный сигнал: спрос есть, ответа нет.
    if (pathname.startsWith('/ai/v1/')) {
        const method = /^\/ai\/v1\/(?:spec|call)\/(.+)$/.exec(pathname);
        return {
            method: method ? decodeURIComponent(method[1]) : '',
            outcome: status === 404 ? 'endpoint_missing' : 'ok',
            page: pathname,
        };
    }

    if (!pathname.startsWith(ASSETS)) {
        return null;
    }

    const tail = pathname.slice(ASSETS.length);
    if (BROWSER_ONLY.some((name) => tail === name)) {
        return null;
    }

    // Браузер с реферером со страницы документации — это виджет, а не агент.
    if (BROWSER_UA.test(ua) && !BOT_UA.test(ua) && referer.indexOf('apidocs.bitrix24.ru') !== -1) {
        return null;
    }

    if (status !== 200 && status !== 304) {
        const missing = /^spec\/methods\/(.+)\.json$/.exec(tail);
        return {
            method: missing ? decodeURIComponent(missing[1]) : '',
            outcome: 'no_schema',
            page: pathname,
        };
    }

    const method = /^spec\/methods\/(.+)\.json$/.exec(tail);
    if (method) {
        return { method: decodeURIComponent(method[1]), outcome: 'fetched', page: pathname };
    }
    // Индекс, датасет и ядро — обращения без конкретного метода.
    return { method: '', outcome: 'ok', page: pathname };
}

function loadState() {
    try {
        return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    } catch (error) {
        return { files: {} };
    }
}

function saveState(state) {
    try {
        fs.writeFileSync(STATE_FILE, JSON.stringify(state));
    } catch (error) {
        console.error('не удалось сохранить позицию обработки: ' + error.message);
    }
}

async function send(events) {
    if (DRY || !events.length) {
        return events.length;
    }
    let accepted = 0;
    for (let i = 0; i < events.length; i += BATCH) {
        const batch = events.slice(i, i + BATCH);
        const response = await fetch(URL_INGEST, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Ingest-Token': TOKEN },
            body: JSON.stringify({ events: batch }),
            signal: AbortSignal.timeout(30000),
        });
        const type = response.headers.get('content-type') || '';
        if (!response.ok || !type.includes('application/json')) {
            throw new Error('приёмник ответил ' + response.status + ' ' + type);
        }
        accepted += (await response.json()).accepted;
    }
    return accepted;
}

async function processFile(file, state) {
    const stat = file === '-' ? null : fs.statSync(file);
    const key = file === '-' ? null : file;
    const seen = key ? (state.files[key] || 0) : 0;

    // Файл провернули логротейтом — начинаем сначала.
    const start = stat && stat.size < seen ? 0 : seen;

    const stream = file === '-'
        ? process.stdin
        : fs.createReadStream(file, { start, encoding: 'utf8' });

    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
    const events = [];
    const summary = { строк: 0, наши: 0, виджет: 0 };

    for await (const line of rl) {
        summary.строк += 1;
        const m = LINE.exec(line);
        if (!m) {
            continue;
        }
        const [, ip, when, verb, target, statusRaw, referer, ua] = m;
        const pathname = target.split('?')[0];
        const info = classify(pathname, Number(statusRaw), referer, ua);
        if (!info) {
            if (pathname.startsWith(ASSETS)) {
                summary.виджет += 1;
            }
            continue;
        }
        summary.наши += 1;
        events.push({
            id: crypto.createHash('sha1').update(line).digest('hex').slice(0, 32),
            ts: parseTime(when) || new Date().toISOString(),
            channel: 'api',
            method: info.method,
            outcome: info.outcome,
            executed: false,
            errors: [],
            errorParams: [],
            warnings: [],
            ms: null,
            page: info.page,
            session: hashIp(ip),
            source: 'access-log',
        });
    }

    if (key && stat) {
        state.files[key] = stat.size;
    }
    return { events, summary };
}

async function main() {
    if (!FILES.length) {
        console.error('укажите файл лога или «-» для стандартного ввода');
        process.exit(1);
    }
    if (!TOKEN && !DRY) {
        console.error('не задан B24SIM_STATS_TOKEN — нечем авторизоваться у приёмника');
        process.exit(1);
    }
    if (!SALT) {
        console.error('ВНИМАНИЕ: B24SIM_IP_SALT не задан — уникальные агенты между запусками не сойдутся');
    }

    const state = loadState();
    let all = [];
    for (const file of FILES) {
        const { events, summary } = await processFile(file, state);
        console.log(file + ': строк ' + summary.строк + ', наших обращений ' + summary.наши
            + ', пропущено как виджет ' + summary.виджет);
        all = all.concat(events);
    }

    const byOutcome = {};
    all.forEach((e) => { byOutcome[e.outcome] = (byOutcome[e.outcome] || 0) + 1; });
    console.log('исходы: ' + JSON.stringify(byOutcome));

    const accepted = await send(all);
    console.log(DRY ? 'сухой прогон, ничего не отправлено: ' + accepted : 'отправлено: ' + accepted);

    if (!DRY) {
        saveState(state);
    }
}

main().catch((error) => { console.error(error.message); process.exit(1); });
