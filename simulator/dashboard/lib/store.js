'use strict';

// Хранилище статистики: сырой журнал событий на диске плюс свёртки в памяти.
//
// Считать графики по сырому журналу на каждый запрос дорого и не нужно:
// дашборд смотрит только на агрегаты. Поэтому сырьё пишется построчно и
// служит источником правды для пересборки, а витрину обслуживают свёртки
// по часам и по дням. Свёртки периодически сбрасываются на диск, чтобы
// перезапуск не заставлял перечитывать весь журнал.

const fs = require('fs');
const path = require('path');

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

// Сколько держим данные. Сырьё нужно для пересборки и ленты последних
// вызовов, поэтому живёт меньше всех; дневные свёртки не удаляем.
const RAW_RETENTION_DAYS = 90;
const HOUR_RETENTION_DAYS = 400;

// Границы гистограммы задержек, мс. По ней считаем перцентили без
// хранения каждого замера.
const MS_BUCKETS = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, Infinity];

// Сколько разных ключей держим в дневной свёртке. Методов в справочнике
// полторы тысячи, страниц — тысячи; без потолка свёртка растёт вместе с
// длинным хвостом, который в витрине всё равно не виден.
const MAX_KEYS = { methods: 400, scopes: 100, pages: 300, errors: 120, errorParams: 200 };

// Версия формата свёрток. Меняется, когда в свёртку добавляется новое
// измерение: старый файл тогда не выбрасывается, а достраивается из
// сырого журнала за те сутки, по которым журнал ещё есть.
const ROLLUP_VERSION = 2;

const RECENT_LIMIT = 300;
const DEDUP_LIMIT = 20000;

function hourKey(ts) {
    return new Date(ts).toISOString().slice(0, 13);
}

function dayKey(ts) {
    return new Date(ts).toISOString().slice(0, 10);
}

function emptyCounters() {
    return {
        total: 0,
        ok: 0,
        err: 0,
        service: 0,
        executed: 0,
        human: 0,
        agent: 0,
        unknown: 0,
        widget: 0,
        api: 0,
        secret: 0,
        rateLimited: 0,
        msSum: 0,
        msCount: 0,
        msMax: 0,
        msHist: new Array(MS_BUCKETS.length).fill(0),
    };
}

// Разбивка по методам и страницам хранится отдельно от простых счётчиков:
// таблице нужен не только «сколько раз вызвали», но и чем закончилось,
// кто вызывал и сколько это заняло. Ключи короткие — свёртка лежит на
// диске и читается целиком при старте.
function emptyBreakdown() {
    return { t: 0, ok: 0, err: 0, ag: 0, hu: 0, ex: 0, ms: 0, mc: 0 };
}

function bumpBreakdown(map, key, event, limit) {
    if (!key) {
        return;
    }
    let row = map[key];
    if (!row) {
        if (limit && Object.keys(map).length >= limit) {
            // Тот же Space-Saving, что и в bump: вытесняем самую редкую
            // строку и наследуем её счётчик вызовов, чтобы лидер дня не
            // остался за бортом из-за длинного хвоста, пришедшего раньше.
            const weakest = weakestKey(map, (value) => value.t);
            if (weakest.key === null) {
                return;
            }
            delete map[weakest.key];
            row = emptyBreakdown();
            row.t = weakest.count;
            map[key] = row;
        } else {
            row = emptyBreakdown();
            map[key] = row;
        }
    }
    row.t += 1;
    if (event.service) {
        // служебные обращения в успех/ошибку не идут
    } else if (event.ok) {
        row.ok += 1;
    } else {
        row.err += 1;
    }
    if (event.actor === 'agent') {
        row.ag += 1;
    } else if (event.actor === 'human') {
        row.hu += 1;
    }
    if (event.executed) {
        row.ex += 1;
    }
    if (event.ms !== null && event.ms !== undefined) {
        row.ms += event.ms;
        row.mc += 1;
    }
}

function emptyDay() {
    const day = emptyCounters();
    day.methodStats = Object.create(null);
    day.pageStats = Object.create(null);
    day.methods = Object.create(null);
    day.scopes = Object.create(null);
    day.pages = Object.create(null);
    day.outcomes = Object.create(null);
    day.errors = Object.create(null);
    day.errorParams = Object.create(null);
    day.sessions = Object.create(null); // id -> 1, размер = уникальные с момента старта
    day.sessionsBase = 0;                // уникальные, накопленные до перезапуска
    return day;
}

// Наименьший счётчик в карте. Нужен для вытеснения на потолке.
function weakestKey(map, valueOf) {
    let weakest = null;
    let min = Infinity;
    for (const key of Object.keys(map)) {
        const value = valueOf(map[key]);
        if (value < min) {
            min = value;
            weakest = key;
        }
    }
    return { key: weakest, count: min };
}

// Space-Saving: на потолке новый ключ не отбрасывается, а вытесняет самый
// редкий, унаследовав его счётчик. Отказ новым ключам, как было раньше,
// заполняет карту тем, что пришло первым: в справочнике полторы тысячи
// методов, и после четырёхсот редких настоящий лидер дня уже не попадал в
// свёртку вообще. Здесь топ сохраняется точно, а хвост слегка завышается.
function bump(map, key, limit) {
    if (!key) {
        return;
    }
    if (map[key] === undefined) {
        if (limit && Object.keys(map).length >= limit) {
            const weakest = weakestKey(map, (value) => value);
            if (weakest.key === null) {
                return;
            }
            delete map[weakest.key];
            map[key] = weakest.count;
        } else {
            map[key] = 0;
        }
    }
    map[key] += 1;
}

function addEvent(counters, event) {
    counters.total += 1;

    if (event.service) {
        counters.service += 1;
    } else if (event.ok) {
        counters.ok += 1;
    } else {
        counters.err += 1;
    }

    if (event.executed) {
        counters.executed += 1;
    }
    if (event.outcome === 'rejected_secret') {
        counters.secret += 1;
    }
    if (event.outcome === 'rate_limited') {
        counters.rateLimited += 1;
    }

    counters[event.actor] += 1;
    counters[event.channel] += 1;

    if (event.ms !== null && event.ms !== undefined) {
        counters.msSum += event.ms;
        counters.msCount += 1;
        counters.msMax = Math.max(counters.msMax, event.ms);
        for (let i = 0; i < MS_BUCKETS.length; i += 1) {
            if (event.ms <= MS_BUCKETS[i]) {
                counters.msHist[i] += 1;
                break;
            }
        }
    }
}

function addEventToDay(day, event) {
    addEvent(day, event);
    bumpBreakdown(day.methodStats, event.method, event, MAX_KEYS.methods);
    bumpBreakdown(day.pageStats, event.page, event, MAX_KEYS.pages);
    bump(day.methods, event.method, MAX_KEYS.methods);
    bump(day.scopes, event.scope, MAX_KEYS.scopes);
    bump(day.pages, event.page, MAX_KEYS.pages);
    bump(day.outcomes, event.outcome, 0);
    for (const code of event.errors) {
        bump(day.errors, code, MAX_KEYS.errors);
    }
    for (const param of event.errorParams) {
        bump(day.errorParams, param, MAX_KEYS.errorParams);
    }
    if (event.session) {
        bump(day.sessions, event.session, 50000);
    }
}

class Store {
    constructor(options) {
        this.dir = options.dir;
        this.rawDir = path.join(this.dir, 'events');
        this.rollupFile = path.join(this.dir, 'rollups.json');
        this.hours = new Map();
        this.days = new Map();
        this.recent = [];
        this.seen = new Set();
        this.seenOrder = [];
        this.dirty = false;
        this.writeStreams = new Map();
        this.startedAt = Date.now();
        this.ingested = 0;
        this.rejected = 0;
    }

    init() {
        fs.mkdirSync(this.rawDir, { recursive: true });
        const state = this.loadRollups();
        if (!state.loaded) {
            this.rebuildFromRaw();
        } else if (state.version !== ROLLUP_VERSION) {
            // Формат вырос: пересобираем те сутки, по которым сохранился
            // журнал, а более старые оставляем как есть — в них не будет
            // новых разрезов, но общие счётчики не потеряются.
            console.error('store: формат свёрток ' + state.version + ' → ' + ROLLUP_VERSION + ', достраиваю из журнала');
            this.rebuildFromRaw(true);
        }
        this.loadRecent();
    }

    // ------------------------------------------------------------ запись

    add(event, dedupKey) {
        if (dedupKey) {
            if (this.seen.has(dedupKey)) {
                return false;
            }
            this.seen.add(dedupKey);
            this.seenOrder.push(dedupKey);
            if (this.seenOrder.length > DEDUP_LIMIT) {
                this.seen.delete(this.seenOrder.shift());
            }
        }

        this.applyToRollups(event);
        this.appendRaw(event);

        this.recent.push(event);
        if (this.recent.length > RECENT_LIMIT) {
            this.recent.shift();
        }

        this.ingested += 1;
        this.dirty = true;
        return true;
    }

    applyToRollups(event) {
        const hk = hourKey(event.ts);
        let hour = this.hours.get(hk);
        if (!hour) {
            hour = emptyCounters();
            this.hours.set(hk, hour);
        }
        addEvent(hour, event);

        const dk = dayKey(event.ts);
        let day = this.days.get(dk);
        if (!day) {
            day = emptyDay();
            this.days.set(dk, day);
        }
        addEventToDay(day, event);
    }

    appendRaw(event) {
        const dk = dayKey(event.ts);
        let stream = this.writeStreams.get(dk);
        if (!stream) {
            stream = fs.createWriteStream(path.join(this.rawDir, dk + '.ndjson'), { flags: 'a' });
            stream.on('error', (error) => {
                console.error('store: не удалось писать журнал ' + dk + ': ' + error.message);
                this.writeStreams.delete(dk);
            });
            this.writeStreams.set(dk, stream);
            // Держим открытыми только сегодняшний и вчерашний файлы.
            for (const key of [...this.writeStreams.keys()]) {
                if (key !== dk && key < dayKey(Date.now() - DAY_MS)) {
                    this.writeStreams.get(key).end();
                    this.writeStreams.delete(key);
                }
            }
        }
        stream.write(JSON.stringify(event) + '\n');
    }

    // ------------------------------------------------------------ чтение

    hourSeries(fromTs, toTs) {
        const out = [];
        const start = Math.floor(fromTs / HOUR_MS) * HOUR_MS;
        for (let ts = start; ts <= toTs; ts += HOUR_MS) {
            out.push({ ts, key: hourKey(ts), counters: this.hours.get(hourKey(ts)) || null });
        }
        return out;
    }

    daySeries(fromTs, toTs) {
        const out = [];
        const start = Math.floor(fromTs / DAY_MS) * DAY_MS;
        for (let ts = start; ts <= toTs; ts += DAY_MS) {
            out.push({ ts, key: dayKey(ts), counters: this.days.get(dayKey(ts)) || null });
        }
        return out;
    }

    daysInRange(fromTs, toTs) {
        const out = [];
        for (const [key, day] of this.days) {
            const ts = Date.parse(key + 'T00:00:00Z');
            if (ts + DAY_MS > fromTs && ts <= toTs) {
                out.push({ key, ts, day });
            }
        }
        out.sort((a, b) => a.ts - b.ts);
        return out;
    }

    recentEvents(limit) {
        return this.recent.slice(-limit).reverse();
    }

    // ------------------------------------------- сохранение и восстановление

    serialize() {
        const hours = {};
        for (const [key, counters] of this.hours) {
            hours[key] = counters;
        }
        const days = {};
        for (const [key, day] of this.days) {
            // В файл уходит база плюс то, что набрали после старта. Раньше
            // писался только размер живого множества, и каждый перезапуск
            // затирал накопленное меньшим числом.
            days[key] = Object.assign({}, day, {
                sessions: (day.sessionsBase || 0) + Object.keys(day.sessions).length,
                sessionsBase: undefined,
            });
        }
        return { $v: ROLLUP_VERSION, savedAt: new Date().toISOString(), hours, days };
    }

    save() {
        if (!this.dirty) {
            return false;
        }
        const payload = JSON.stringify(this.serialize());
        const tmp = this.rollupFile + '.tmp';
        try {
            fs.writeFileSync(tmp, payload);
            fs.renameSync(tmp, this.rollupFile);
            this.dirty = false;
            return true;
        } catch (error) {
            console.error('store: не удалось сохранить свёртки: ' + error.message);
            return false;
        }
    }

    loadRollups() {
        if (!fs.existsSync(this.rollupFile)) {
            return { loaded: false, version: null };
        }
        let version = null;
        try {
            const data = JSON.parse(fs.readFileSync(this.rollupFile, 'utf8'));
            version = data.$v || 1;
            for (const [key, counters] of Object.entries(data.hours || {})) {
                this.hours.set(key, Object.assign(emptyCounters(), counters));
            }
            for (const [key, day] of Object.entries(data.days || {})) {
                const restored = Object.assign(emptyDay(), day);
                // Точные id за прошлые сутки не нужны — нужна их сумма. Она
                // становится базой, поверх которой копится новое множество.
                restored.sessionsBase = typeof day.sessions === 'number'
                    ? day.sessions
                    : Object.keys(day.sessions || {}).length;
                restored.sessions = Object.create(null);
                this.days.set(key, restored);
            }
            return { loaded: this.hours.size > 0 || this.days.size > 0, version };
        } catch (error) {
            console.error('store: свёртки повреждены, пересобираю из журнала: ' + error.message);
            this.hours.clear();
            this.days.clear();
            return { loaded: false, version: null };
        }
    }

    rebuildFromRaw(onlyDaysWithRaw) {
        let files;
        try {
            files = fs.readdirSync(this.rawDir).filter((name) => name.endsWith('.ndjson')).sort();
        } catch (error) {
            return;
        }

        if (onlyDaysWithRaw) {
            // Сначала убираем сутки, которые сейчас пересоберём, иначе
            // события посчитались бы дважды.
            const covered = new Set(files.map((name) => name.slice(0, 10)));
            for (const key of [...this.days.keys()]) {
                if (covered.has(key)) {
                    this.days.delete(key);
                }
            }
            for (const key of [...this.hours.keys()]) {
                if (covered.has(key.slice(0, 10))) {
                    this.hours.delete(key);
                }
            }
        }

        let count = 0;
        for (const name of files) {
            const text = fs.readFileSync(path.join(this.rawDir, name), 'utf8');
            for (const line of text.split('\n')) {
                if (!line) {
                    continue;
                }
                try {
                    const event = JSON.parse(line);
                    this.applyToRollups(event);
                    count += 1;
                } catch (error) {
                    // Оборванная строка после падения — пропускаем.
                }
            }
        }
        if (count) {
            console.error('store: свёртки пересобраны из журнала, событий: ' + count);
            this.dirty = true;
        }
    }

    loadRecent() {
        const today = dayKey(Date.now());
        const file = path.join(this.rawDir, today + '.ndjson');
        if (!fs.existsSync(file)) {
            return;
        }
        const lines = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).slice(-RECENT_LIMIT);
        for (const line of lines) {
            try {
                this.recent.push(JSON.parse(line));
            } catch (error) {
                // пропускаем
            }
        }
    }

    // ------------------------------------------------------------ уборка

    prune(now) {
        const rawCutoff = dayKey(now - RAW_RETENTION_DAYS * DAY_MS);
        const hourCutoff = hourKey(now - HOUR_RETENTION_DAYS * DAY_MS);

        for (const key of [...this.hours.keys()]) {
            if (key < hourCutoff) {
                this.hours.delete(key);
                this.dirty = true;
            }
        }

        let files;
        try {
            files = fs.readdirSync(this.rawDir);
        } catch (error) {
            return;
        }
        for (const name of files) {
            if (!name.endsWith('.ndjson')) {
                continue;
            }
            if (name.slice(0, 10) < rawCutoff) {
                try {
                    fs.unlinkSync(path.join(this.rawDir, name));
                } catch (error) {
                    console.error('store: не удалось удалить ' + name + ': ' + error.message);
                }
            }
        }
    }

    close() {
        this.save();
        for (const stream of this.writeStreams.values()) {
            stream.end();
        }
        this.writeStreams.clear();
    }
}

module.exports = { Store, MS_BUCKETS, hourKey, dayKey, emptyCounters, emptyBreakdown, HOUR_MS, DAY_MS };
