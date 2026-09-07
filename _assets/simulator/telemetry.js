window.B24SimTelemetryConfig = {"endpoint":"https://app-f23b8f256bfb.vibecode.bitrix24.tech/collect","enabled":true,"sampling":1,"respectDoNotTrack":true};
(function (root, factory) {
    'use strict';
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.B24SimTelemetry = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // Телеметрия песочницы. Одно и то же превращение ответа симулятора в
    // событие работает и в браузере (виджет), и в Node (endpoint) — иначе
    // статистика людей и агентов считалась бы по разным правилам.
    //
    // Что уходит: имя метода, исход, классы ошибок, имена параметров,
    // длительность, страница документации. Чего не уходит никогда:
    // значения параметров, тела запросов и ответов, вебхуки и токены.

    var CONFIG = {
        endpoint: '',
        enabled: false,
        // Доля событий, которые отправляются. 1 — все.
        sampling: 1,
        // На публичной документации уважаем запрет на отслеживание.
        respectDoNotTrack: true,
        flushDelayMs: 4000,
        maxBuffer: 40,
        maxStored: 200,
        // Приёмник берёт за раз не больше сотни: пачка крупнее обрезалась
        // молча, а клиент получал 200 OK и считал её доставленной.
        maxBatch: 100,
    };

    var browserConfig = typeof window !== 'undefined' && window.B24SimTelemetryConfig;
    if (browserConfig) {
        for (var key in browserConfig) {
            if (Object.prototype.hasOwnProperty.call(browserConfig, key)) {
                CONFIG[key] = browserConfig[key];
            }
        }
    }

    var STORAGE_KEY = 'b24sim.telemetry.queue';
    var SESSION_KEY = 'b24sim.session';

    function newId() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    }

    // Идентификатор вкладки, а не человека: живёт в sessionStorage, между
    // вкладками и после закрытия не переносится, к личности не привязан.
    function sessionId() {
        try {
            var existing = sessionStorage.getItem(SESSION_KEY);
            if (existing) {
                return existing;
            }
            var fresh = 's' + Math.random().toString(36).slice(2, 12);
            sessionStorage.setItem(SESSION_KEY, fresh);
            return fresh;
        } catch (error) {
            return '';
        }
    }

    // ------------------------------------------------------------ событие

    // Ответ симулятора одинаков в обоих каналах, поэтому исход выводится
    // из него, а не задаётся вызывающей стороной.
    function outcomeOf(response) {
        if (!response || !response.error) {
            return 'valid';
        }
        if (response.error === 'SECURITY_REJECTED') {
            return 'rejected_secret';
        }
        if (response.error === 'UNKNOWN_METHOD' || response.error === 'METHOD_NOT_FOUND') {
            return 'unknown_method';
        }
        return 'invalid';
    }

    function validationOf(response) {
        var sim = response && response.simulator;
        var validation = sim && sim.validation;
        return {
            errors: (validation && validation.errors) || [],
            warnings: (sim && sim.warnings) || [],
        };
    }

    function uniq(list, limit) {
        var seen = {};
        var out = [];
        for (var i = 0; i < list.length && out.length < limit; i += 1) {
            var value = list[i];
            if (value && !seen[value]) {
                seen[value] = true;
                out.push(value);
            }
        }
        return out;
    }

    function shape(options) {
        var response = options.response || {};
        var parts = validationOf(response);
        var sim = response.simulator || {};

        return {
            id: newId(),
            ts: new Date().toISOString(),
            channel: options.channel,
            method: options.method || '',
            outcome: options.outcome || outcomeOf(response),
            executed: sim.executed === true,
            persisted: sim.persisted === true,
            errors: uniq(parts.errors.map(function (item) { return item.class; }), 8),
            errorParams: uniq(parts.errors.map(function (item) { return item.param; }), 8),
            warnings: uniq(parts.warnings.map(function (item) { return item.class; }), 8),
            ms: typeof options.ms === 'number' ? Math.round(options.ms) : null,
            page: options.page || '',
            session: options.session || '',
        };
    }

    // ------------------------------------------------- отправка из браузера

    var buffer = [];
    var timer = null;

    // Сбор разрешён в принципе: включён, есть адрес, нет запрета на
    // отслеживание. Проверяется и при записи, и при отправке — иначе
    // выключенная телеметрия продолжала бы досылать накопленное.
    function collectionEnabled() {
        if (!CONFIG.enabled || !CONFIG.endpoint) {
            return false;
        }
        if (CONFIG.respectDoNotTrack && typeof navigator !== 'undefined') {
            var dnt = navigator.doNotTrack || (typeof window !== 'undefined' && window.doNotTrack);
            if (dnt === '1' || dnt === 'yes') {
                return false;
            }
        }
        return true;
    }

    // Сэмплирование решается на отдельном событии, а не на пачке: иначе
    // выбрасывался бы сразу весь накопленный буфер.
    function allowed() {
        return collectionEnabled() && !(CONFIG.sampling < 1 && Math.random() > CONFIG.sampling);
    }

    function readStored() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var list = raw ? JSON.parse(raw) : [];
            return Array.isArray(list) ? list : [];
        } catch (error) {
            return [];
        }
    }

    function writeStored(list) {
        try {
            if (!list.length) {
                localStorage.removeItem(STORAGE_KEY);
                return;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-CONFIG.maxStored)));
        } catch (error) {
            // Приватный режим или переполнение — телеметрия не повод падать.
        }
    }

    // sendBeacon с типом text/plain намеренно: так запрос считается простым
    // и браузер не делает предварительный OPTIONS. Тело всё равно JSON.
    function post(events, viaBeacon) {
        var payload = JSON.stringify({ events: events });
        if (viaBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
            try {
                return navigator.sendBeacon(CONFIG.endpoint, new Blob([payload], { type: 'text/plain' }));
            } catch (error) {
                return false;
            }
        }
        if (typeof fetch !== 'function') {
            return false;
        }
        fetch(CONFIG.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: payload,
            keepalive: true,
            credentials: 'omit',
            mode: 'cors',
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
        }).catch(function () {
            // Не дошло — оставляем на следующий заход, но не бесконечно.
            writeStored(readStored().concat(events));
        });
        return true;
    }

    function flush(viaBeacon) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (!collectionEnabled()) {
            // Сбор выключили — накопленное не досылаем и не храним.
            buffer = [];
            writeStored([]);
            return;
        }

        var pending = readStored().concat(buffer);
        buffer = [];
        if (!pending.length) {
            return;
        }

        // Отправляем самые старые, остальное оставляем на диске. Раньше
        // хранилище очищалось до отправки, и всё, что не влезало в один
        // запрос, пропадало безвозвратно.
        var batch = pending.slice(0, CONFIG.maxBatch);
        var rest = pending.slice(CONFIG.maxBatch);
        writeStored(rest);

        if (!post(batch, viaBeacon)) {
            writeStored(rest.concat(batch));
        }
    }

    function record(event) {
        if (!allowed()) {
            return;
        }
        buffer.push(event);
        if (buffer.length >= CONFIG.maxBuffer) {
            flush(false);
            return;
        }
        if (!timer) {
            timer = setTimeout(function () { flush(false); }, CONFIG.flushDelayMs);
        }
    }

    if (typeof document !== 'undefined') {
        // pagehide надёжнее unload и работает с bfcache в Safari.
        window.addEventListener('pagehide', function () { flush(true); });
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'hidden') {
                flush(true);
            }
        });
    }

    return {
        config: CONFIG,
        shape: shape,
        record: record,
        flush: flush,
        newId: newId,
        sessionId: sessionId,
        outcomeOf: outcomeOf,
    };
});
