'use strict';

// Песочница REST API для ИИ-агентов: те же три метода, что описаны в
// документации, — список, схема, проверка вызова.
//
// Схемы и датасет берутся с боевой документации по требованию: так
// песочница не может разойтись с тем, что читает человек на странице.
// Ядро валидации, наоборот, берётся из репозитория, а не из сети —
// исполнять скачанный код нельзя даже со своего сайта.

const path = require('path');

const DOCS = process.env.SIMULATOR_ASSETS || 'https://apidocs.bitrix24.ru/_assets/simulator';
const SPEC_CACHE_MAX = 400;
const REFRESH_MS = 6 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 10000;

function loadCore() {
    for (const candidate of ['./core.js', '../../lib/core.js']) {
        try {
            return require(path.resolve(__dirname, candidate));
        } catch (error) {
            if (error.code !== 'MODULE_NOT_FOUND') {
                throw error;
            }
        }
    }
    throw new Error('ядро симулятора не найдено: положите core.js рядом с sandbox.js');
}

const B24Sim = loadCore();

async function fetchJson(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!response.ok) {
        throw new Error(url + ' → HTTP ' + response.status);
    }
    return response.json();
}

class Sandbox {
    constructor() {
        this.index = null;
        this.dataset = null;
        this.specs = new Map();
        this.loadedAt = 0;
        this.lastError = null;
    }

    get ready() {
        return Boolean(this.index && this.dataset);
    }

    // Индекс и датасет нужны на каждый вызов, поэтому держим их в памяти и
    // обновляем раз в несколько часов: документация пересобирается редко.
    async refresh(force) {
        if (!force && this.ready && Date.now() - this.loadedAt < REFRESH_MS) {
            return;
        }
        try {
            const [index, dataset] = await Promise.all([
                fetchJson(DOCS + '/spec/index.json'),
                fetchJson(DOCS + '/fixtures/dataset.json'),
            ]);
            this.index = index;
            this.dataset = dataset;
            this.loadedAt = Date.now();
            this.lastError = null;
            this.specs.clear();
        } catch (error) {
            this.lastError = error.message;
            // Старые данные лучше отказа: если документация недоступна,
            // песочница продолжает отвечать тем, что успела загрузить.
            if (!this.ready) {
                throw error;
            }
        }
    }

    async spec(method) {
        if (this.specs.has(method)) {
            return this.specs.get(method);
        }
        if (!this.index || !this.index.methods.some((entry) => entry.method === method)) {
            return null;
        }
        let spec = null;
        try {
            spec = await fetchJson(DOCS + '/spec/methods/' + encodeURIComponent(method) + '.json');
        } catch (error) {
            return null;
        }
        if (this.specs.size >= SPEC_CACHE_MAX) {
            this.specs.delete(this.specs.keys().next().value);
        }
        this.specs.set(method, spec);
        return spec;
    }

    list(scope, search) {
        const query = String(search || '').toLowerCase();
        const methods = (this.index ? this.index.methods : []).filter((entry) => {
            if (scope && entry.scope !== scope) {
                return false;
            }
            if (query
                && entry.method.toLowerCase().indexOf(query) === -1
                && String(entry.title || '').toLowerCase().indexOf(query) === -1) {
                return false;
            }
            return true;
        });
        return { count: methods.length, methods: methods.slice(0, 200) };
    }

    // Секрет ищем до разбора тела: вебхук может приехать и в адресе.
    findSecret(payload) {
        return B24Sim.findSecret(payload);
    }

    // Проверка адреса целиком. Одной сериализации URL мало: ядро ищет
    // ключи вроде auth только среди полей объекта, а в строке адреса они
    // оказываются внутри значения — и токен в ?auth=... проходил насквозь.
    // Поэтому параметры запроса разбираем и проверяем как объект.
    findSecretInUrl(rawUrl, searchParams) {
        const inRaw = B24Sim.findSecret({ url: rawUrl });
        if (inRaw) {
            return inRaw;
        }
        const query = {};
        for (const [key, value] of searchParams) {
            query[key] = value;
        }
        return B24Sim.findSecret(query);
    }

    call(spec, params) {
        return B24Sim.call(spec, params, this.dataset);
    }

    status() {
        return {
            ready: this.ready,
            methods: this.index ? this.index.count : 0,
            dataset: this.dataset ? this.dataset.version || null : null,
            source: DOCS,
            loadedAt: this.loadedAt || null,
            cachedSpecs: this.specs.size,
            lastError: this.lastError,
        };
    }
}

// Превращает ответ ядра в событие статистики. Форма та же, что у виджета,
// поэтому люди и агенты считаются по одинаковым правилам.
function eventFor(method, response, ms) {
    const sim = (response && response.simulator) || {};
    const validation = sim.validation || {};
    const errors = validation.errors || [];
    const unique = (list) => [...new Set(list.filter(Boolean))].slice(0, 8);

    let outcome = 'valid';
    if (response && response.error === 'SECURITY_REJECTED') {
        outcome = 'rejected_secret';
    } else if (response && response.error) {
        outcome = 'invalid';
    }

    return {
        channel: 'api',
        method,
        outcome,
        executed: sim.executed === true,
        persisted: sim.persisted === true,
        errors: unique(errors.map((item) => item.class)),
        errorParams: unique(errors.map((item) => item.param)),
        warnings: unique((sim.warnings || []).map((item) => item.class)),
        ms: Math.round(ms),
        page: '',
    };
}

module.exports = { Sandbox, eventFor, DOCS };
