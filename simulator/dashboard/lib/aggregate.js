'use strict';

// Сборка витрины: из свёрток хранилища собирается ровно тот JSON,
// который рисует дашборд. Никаких вычислений на клиенте.

const { MS_BUCKETS, HOUR_MS, DAY_MS, emptyCounters, emptyBreakdown } = require('./store');

// Диапазоны, которые предлагает витрина. bucket выбирается так, чтобы на
// графике оставалось от двух до сотни точек — иначе он нечитаем.
const RANGES = {
    '24h': { ms: 24 * HOUR_MS, bucket: 'hour', label: 'сутки' },
    '7d': { ms: 7 * DAY_MS, bucket: 'hour', label: 'неделя' },
    '30d': { ms: 30 * DAY_MS, bucket: 'day', label: 'месяц' },
    '90d': { ms: 90 * DAY_MS, bucket: 'day', label: 'квартал' },
    all: { ms: null, bucket: 'day', label: 'всё время' },
};

function mergeCounters(target, source) {
    if (!source) {
        return target;
    }
    for (const key of Object.keys(target)) {
        if (key === 'msHist') {
            for (let i = 0; i < target.msHist.length; i += 1) {
                target.msHist[i] += source.msHist ? source.msHist[i] || 0 : 0;
            }
        } else if (key === 'msMax') {
            target.msMax = Math.max(target.msMax, source.msMax || 0);
        } else if (typeof target[key] === 'number') {
            target[key] += source[key] || 0;
        }
    }
    return target;
}

function mergeMaps(target, source, weight) {
    if (!source) {
        return;
    }
    for (const [key, value] of Object.entries(source)) {
        target[key] = (target[key] || 0) + value * (weight || 1);
    }
}

function mergeBreakdowns(target, source) {
    if (!source) {
        return;
    }
    for (const [key, row] of Object.entries(source)) {
        let acc = target[key];
        if (!acc) {
            acc = emptyBreakdown();
            target[key] = acc;
        }
        for (const field of Object.keys(acc)) {
            acc[field] += row[field] || 0;
        }
    }
}

// Строки таблицы считаются на сервере целиком: клиент их только сортирует,
// поэтому доли и средние должны приехать уже посчитанными.
function tableOf(map, limit) {
    return Object.entries(map)
        .map(([key, row]) => ({
            key,
            total: row.t,
            ok: row.ok,
            err: row.err,
            agent: row.ag,
            human: row.hu,
            executed: row.ex,
            errorRate: row.ok + row.err ? row.err / (row.ok + row.err) : null,
            avgMs: row.mc ? Math.round(row.ms / row.mc) : null,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, limit);
}

// Простые счётчики тоже показываем таблицей: колонка доли помогает
// понять, один это класс ошибок доминирует или хвост длинный.
function shareTable(map, limit) {
    const total = Object.values(map).reduce((sum, value) => sum + value, 0);
    return Object.entries(map)
        .map(([key, count]) => ({ key, count, share: total ? count / total : null }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

function topOf(map, limit) {
    return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([key, count]) => ({ key, count }));
}

// Перцентиль по гистограмме. Возвращает верхнюю границу корзины, в
// которую попал нужный ранг, — оценка сверху, и это честнее интерполяции.
function percentile(hist, share) {
    const total = hist.reduce((sum, value) => sum + value, 0);
    if (!total) {
        return null;
    }
    const target = total * share;
    let seen = 0;
    for (let i = 0; i < hist.length; i += 1) {
        seen += hist[i];
        if (seen >= target) {
            const edge = MS_BUCKETS[i];
            return edge === Infinity ? MS_BUCKETS[MS_BUCKETS.length - 2] : edge;
        }
    }
    return null;
}

// Произвольный диапазон приходит датами без времени: начало берём с
// начала суток, конец — по конец суток, иначе «с 1 по 1 число» дало бы
// пустой период.
function parseBound(value, fallback, endOfDay) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return fallback;
    }
    const parsed = Date.parse(value + (endOfDay ? 'T23:59:59.999Z' : 'T00:00:00.000Z'));
    return Number.isFinite(parsed) ? parsed : fallback;
}

function earliestDay(store, fallback) {
    const keys = [...store.days.keys()].sort();
    return keys.length ? Date.parse(keys[0] + 'T00:00:00Z') : fallback;
}

function resolveRange(rangeKey, now, store, custom) {
    if (custom && (custom.from || custom.to)) {
        let from = parseBound(custom.from, earliestDay(store, now - 30 * DAY_MS), false);
        let to = parseBound(custom.to, now, true);
        if (from > to) {
            [from, to] = [to, from];
        }
        // Часовой бакет читаем, пока точек не больше сотни; дальше график
        // превращается в частокол.
        const bucket = to - from <= 4 * DAY_MS ? 'hour' : 'day';
        return { from, to: Math.min(to, now), bucket, key: 'custom', custom: true };
    }

    const range = RANGES[rangeKey] || RANGES['7d'];
    if (range.ms === null) {
        // «Всё время» — от самых ранних суток, по которым есть свёртка.
        return { from: earliestDay(store, now - 7 * DAY_MS), to: now, bucket: 'day', key: 'all' };
    }
    // Готовый период начинается с начала суток, а не «столько-то часов
    // назад». Сводные цифры считаются по дневным свёрткам, и скользящее
    // окно захватывало вчерашние сутки целиком: плитка показывала вдвое
    // больше, чем сумма точек на графике.
    const days = Math.max(1, Math.round(range.ms / DAY_MS));
    return {
        from: Math.floor((now - (days - 1) * DAY_MS) / DAY_MS) * DAY_MS,
        to: now,
        bucket: range.bucket,
        key: rangeKey,
    };
}

// Шаг графика подбирается так, чтобы точек было около тридцати. Часовые
// точки на недельном разрезе — это сто семьдесят столбиков по одному-два
// вызова: график выглядит рваным, а доля ошибок скачет от нуля до ста
// процентов, потому что считается от двух вызовов. Укрупнение шага — это
// не косметика, а единственный способ получить осмысленный знаменатель.
const STEPS_MS = [
    HOUR_MS, 2 * HOUR_MS, 3 * HOUR_MS, 6 * HOUR_MS, 12 * HOUR_MS,
    DAY_MS, 2 * DAY_MS, 3 * DAY_MS, 7 * DAY_MS, 14 * DAY_MS, 28 * DAY_MS,
];
const TARGET_POINTS = 34;

function pickStep(from, to, finest) {
    const span = Math.max(HOUR_MS, to - from);
    for (const step of STEPS_MS) {
        if (step < finest) {
            continue;
        }
        if (span / step <= TARGET_POINTS) {
            return step;
        }
    }
    return STEPS_MS[STEPS_MS.length - 1];
}

function emptyPoint(ts) {
    return { ts, total: 0, ok: 0, err: 0, service: 0, human: 0, agent: 0, unknown: 0 };
}

function addCounters(point, counters) {
    if (!counters) {
        return;
    }
    point.total += counters.total;
    point.ok += counters.ok;
    point.err += counters.err;
    point.service += counters.service;
    point.human += counters.human;
    point.agent += counters.agent;
    point.unknown += counters.unknown;
}

function buildSeries(store, from, to, stepMs) {
    // Шаг меньше суток собирается из часовых свёрток, шаг от суток и
    // больше — из дневных: они есть за всю историю, а часовые за 400 дней.
    const rows = stepMs < DAY_MS ? store.hourSeries(from, to) : store.daySeries(from, to);
    const start = Math.floor(from / stepMs) * stepMs;
    const points = [];
    const index = new Map();

    for (let ts = start; ts <= to; ts += stepMs) {
        const point = emptyPoint(ts);
        points.push(point);
        index.set(ts, point);
    }

    for (const row of rows) {
        const key = Math.floor(row.ts / stepMs) * stepMs;
        const point = index.get(key);
        if (point) {
            addCounters(point, row.counters);
        }
    }

    return points;
}

// Профиль активности по часам суток: показывает, когда песочницей
// пользуются. Строится по часовым свёрткам, время — UTC.
function hourOfDayProfile(store, from, to) {
    const profile = new Array(24).fill(0);
    for (const row of store.hourSeries(from, to)) {
        if (row.counters) {
            profile[new Date(row.ts).getUTCHours()] += row.counters.total;
        }
    }
    return profile;
}

function build(store, rangeKey, now, custom) {
    const range = resolveRange(rangeKey, now, store, custom);
    const stepMs = pickStep(range.from, range.to, range.bucket === 'hour' ? HOUR_MS : DAY_MS);
    const days = store.daysInRange(range.from, range.to);

    const totals = emptyCounters();
    const methods = Object.create(null);
    const scopes = Object.create(null);
    const pages = Object.create(null);
    const outcomes = Object.create(null);
    const errors = Object.create(null);
    const errorParams = Object.create(null);
    const methodStats = Object.create(null);
    const pageStats = Object.create(null);
    let sessions = 0;

    for (const entry of days) {
        mergeCounters(totals, entry.day);
        mergeMaps(methods, entry.day.methods);
        mergeMaps(scopes, entry.day.scopes);
        mergeMaps(pages, entry.day.pages);
        mergeMaps(outcomes, entry.day.outcomes);
        mergeMaps(errors, entry.day.errors);
        mergeMaps(errorParams, entry.day.errorParams);
        mergeBreakdowns(methodStats, entry.day.methodStats);
        mergeBreakdowns(pageStats, entry.day.pageStats);
        // Уникальные сессии складываем по суткам: один человек, заходивший
        // два дня подряд, считается дважды. Точное объединение потребовало бы
        // хранить все id, а это персональные данные без нужды.
        sessions += (entry.day.sessionsBase || 0) + Object.keys(entry.day.sessions).length;
    }

    const attempted = totals.ok + totals.err; // без служебных обращений
    const avgMs = totals.msCount ? Math.round(totals.msSum / totals.msCount) : null;

    return {
        range: {
            key: range.key, from: range.from, to: range.to, bucket: range.bucket,
            custom: Boolean(range.custom), stepMs, stepHours: Math.round(stepMs / HOUR_MS),
        },
        generatedAt: now,
        totals: {
            requests: totals.total,
            attempted,
            ok: totals.ok,
            err: totals.err,
            service: totals.service,
            executed: totals.executed,
            agent: totals.agent,
            human: totals.human,
            unknown: totals.unknown,
            widget: totals.widget,
            api: totals.api,
            secret: totals.secret,
            rateLimited: totals.rateLimited,
            sessions,
            successRate: attempted ? totals.ok / attempted : null,
            errorRate: attempted ? totals.err / attempted : null,
            avgMs,
            maxMs: totals.msMax || null,
            p50Ms: percentile(totals.msHist, 0.5),
            p95Ms: percentile(totals.msHist, 0.95),
        },
        series: buildSeries(store, range.from, range.to, stepMs),
        hourOfDay: hourOfDayProfile(store, range.from, range.to),
        top: {
            methods: topOf(methods, 15),
            scopes: topOf(scopes, 10),
            pages: topOf(pages, 10),
            errors: topOf(errors, 12),
            errorParams: topOf(errorParams, 12),
        },
        outcomes: topOf(outcomes, 12),
        tables: {
            methods: tableOf(methodStats, 200),
            pages: tableOf(pageStats, 100),
            errors: shareTable(errors, 60),
            errorParams: shareTable(errorParams, 60),
        },
        latency: MS_BUCKETS.map((edge, i) => ({
            edge: edge === Infinity ? null : edge,
            count: totals.msHist[i],
        })),
        recent: store.recentEvents(50).map((event) => ({
            ts: event.ts,
            method: event.method,
            outcome: event.outcome,
            actor: event.actor,
            channel: event.channel,
            executed: event.executed,
            ms: event.ms,
            errors: event.errors,
            page: event.page,
        })),
        health: {
            uptimeMs: now - store.startedAt,
            ingested: store.ingested,
            rejected: store.rejected,
            hours: store.hours.size,
            days: store.days.size,
        },
    };
}

module.exports = { build, RANGES, percentile, resolveRange };
