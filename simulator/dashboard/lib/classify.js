'use strict';

// Нормализация и классификация событий песочницы.
// Здесь решается, что считать успехом, кто прислал событие и к какому
// классу отнести ошибку. Всё остальное приложение опирается на эти правила.

// Исходы, которые песочница присваивает вызову. Порядок — для витрины.
const OUTCOMES = [
    'valid',            // вызов корректен
    'invalid',          // не прошёл валидацию
    'rejected_secret',  // в теле нашли вебхук или токен
    'unknown_method',   // метода нет в схемах
    'bad_json',
    'body_too_large',
    'rate_limited',
    'not_found',
    'error',
    'ok',               // служебные GET: список методов, схема
    'fetched',          // схему забрали статикой с документации, вызова не было
    'no_schema',        // просили схему метода, которой нет
    'endpoint_missing', // пришли на адрес песочницы, которого нет на этом домене
];

const OUTCOME_SET = new Set(OUTCOMES);

// Успех — только корректный вызов. Служебные `ok` считаем отдельно и в
// «успешные» не кладём: иначе загрузка схемы раздувает конверсию.
const SUCCESS = new Set(['valid']);
// Служебные исходы не идут ни в успехи, ни в ошибки: это обращения, а не
// вызовы. «fetched» — агент забрал схему с документации и считает у себя;
// чем он кончил, мы не узнаем никогда, поэтому в долю ошибок такое событие
// попасть не должно.
// Исходы, выведенные из логов веб-сервера, вызовами не являются: агент
// ничего не проверял, он только обратился. Считать их ошибками значит
// приписать документации чужие промахи и испортить долю ошибок — метрику,
// ради которой всё и затевалось.
const SERVICE = new Set(['ok', 'preflight', 'fetched', 'no_schema', 'endpoint_missing']);

const ACTORS = ['human', 'agent', 'unknown'];

// Каналы: widget — виджет на странице документации, api — HTTP-endpoint /ai/v1/*.
const CHANNELS = ['widget', 'api'];

const BOT_UA = /bot|crawler|spider|curl|wget|python-requests|httpx|aiohttp|axios|node-fetch|go-http-client|java|okhttp|postman|insomnia|guzzle|libwww|scrapy|claude|gpt|openai|anthropic|llm|agent/i;
const BROWSER_UA = /mozilla|applewebkit|chrome|safari|firefox|edge|opera/i;

function classifyUa(ua) {
    if (!ua) {
        return 'unknown';
    }
    // Порядок важен: агентские клиенты часто маскируются под Mozilla,
    // поэтому сначала ищем явные признаки автоматизации.
    if (BOT_UA.test(ua)) {
        return 'bot';
    }
    if (BROWSER_UA.test(ua)) {
        return 'browser';
    }
    return 'unknown';
}

// Кто выполнил вызов. Канал важнее User-Agent: виджет живёт только в
// браузере живого человека, а у endpoint интерфейса нет вообще.
function classifyActor(event, uaClass) {
    if (event.channel === 'widget') {
        return uaClass === 'bot' ? 'unknown' : 'human';
    }
    if (event.channel === 'api') {
        return 'agent';
    }
    return 'unknown';
}

function clampString(value, max) {
    if (typeof value !== 'string') {
        return '';
    }
    const trimmed = value.trim();
    return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function clampInt(value, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return null;
    }
    return Math.min(max, Math.max(min, Math.round(number)));
}

// Имя метода приходит от клиента, поэтому фильтруем по форме реальных
// методов REST: буквы, цифры, точки, дефисы.
function normalizeMethod(value) {
    const method = clampString(value, 80).toLowerCase();
    return /^[a-z0-9][a-z0-9._-]*$/.test(method) ? method : '';
}

function scopeOf(method) {
    if (!method) {
        return '';
    }
    const dot = method.indexOf('.');
    return dot === -1 ? method : method.slice(0, dot);
}

// Страница документации: оставляем только путь, без домена и query —
// query может унести в статистику пользовательский ввод.
function normalizePage(value) {
    const page = clampString(value, 200);
    if (!page) {
        return '';
    }
    try {
        const url = new URL(page, 'https://apidocs.bitrix24.ru');
        return url.pathname.slice(0, 200);
    } catch (error) {
        return page.startsWith('/') ? page.split('?')[0].slice(0, 200) : '';
    }
}

const CODE_RE = /^[a-z0-9_]{1,40}$/i;

function normalizeCodes(list, limit) {
    if (!Array.isArray(list)) {
        return [];
    }
    const out = [];
    for (const raw of list.slice(0, limit)) {
        const code = clampString(raw, 40);
        if (code && CODE_RE.test(code)) {
            out.push(code.toLowerCase());
        }
    }
    return out;
}

// Имена параметров нужны, чтобы понять, где документация путает разработчика.
// Значения параметров не принимаем никогда.
function normalizeParams(list, limit) {
    if (!Array.isArray(list)) {
        return [];
    }
    const out = [];
    for (const raw of list.slice(0, limit)) {
        const param = clampString(raw, 60);
        if (param && /^[A-Za-z0-9_.\[\]>=<%@!-]{1,60}$/.test(param)) {
            out.push(param);
        }
    }
    return out;
}

const MAX_CLOCK_SKEW_MS = 6 * 60 * 60 * 1000;

// Время события берём от клиента, но не даём уехать в будущее или в
// далёкое прошлое: кривые часы браузера иначе ломают все графики.
function normalizeTs(value, now) {
    const parsed = Date.parse(value);
    if (!Number.isFinite(parsed)) {
        return now;
    }
    if (parsed > now + MAX_CLOCK_SKEW_MS) {
        return now;
    }
    if (parsed < now - 30 * 24 * 60 * 60 * 1000) {
        return now;
    }
    return parsed;
}

// Приводим сырое событие к канонической форме. Возвращает null, если
// событие бессмысленно — такие не храним, чтобы не пачкать статистику.
function normalize(raw, context) {
    if (!raw || typeof raw !== 'object') {
        return null;
    }

    const now = context.now;
    const channel = CHANNELS.includes(raw.channel) ? raw.channel : null;
    if (!channel) {
        return null;
    }

    const outcome = OUTCOME_SET.has(raw.outcome) ? raw.outcome : 'error';
    const uaClass = classifyUa(context.userAgent);
    const method = normalizeMethod(raw.method);

    const event = {
        ts: normalizeTs(raw.ts, now),
        channel,
        actor: classifyActor({ channel }, uaClass),
        uaClass,
        method,
        scope: scopeOf(method),
        outcome,
        ok: SUCCESS.has(outcome),
        service: SERVICE.has(outcome),
        executed: raw.executed === true,
        persisted: raw.persisted === true,
        errors: normalizeCodes(raw.errors, 8),
        errorParams: normalizeParams(raw.errorParams, 8),
        warnings: normalizeCodes(raw.warnings, 8),
        ms: clampInt(raw.ms, 0, 600000),
        page: normalizePage(raw.page),
        session: clampString(raw.session, 40).replace(/[^A-Za-z0-9_-]/g, ''),
        source: clampString(raw.source, 40),
    };

    // Событие без метода имеет смысл только для служебных исходов
    // (список методов, рейт-лимит, неизвестный маршрут).
    if (!event.method && !event.service && outcome !== 'rate_limited' && outcome !== 'not_found' && outcome !== 'unknown_method') {
        return null;
    }

    return event;
}

module.exports = { normalize, classifyUa, classifyActor, OUTCOMES, ACTORS, CHANNELS, SUCCESS, SERVICE };
