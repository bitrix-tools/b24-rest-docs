'use strict';

// Тесты дашборда: приём событий, свёртки, авторизация, витрина.
// Запуск: node simulator/dashboard/test.js

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'b24stat-'));
process.env.DATA_DIR = DATA_DIR;
process.env.INGEST_TOKEN = 'test-token';
process.env.PORT = '0';
process.env.ALLOWED_ORIGINS = 'https://apidocs.bitrix24.ru';

const app = require('./server.js');

let passed = 0;
const failures = [];

function check(name, fn) {
    return Promise.resolve()
        .then(fn)
        .then(() => { passed += 1; })
        .catch((error) => { failures.push(name + ': ' + error.message); });
}

let base = '';

function call(method, route, options) {
    const opts = options || {};
    return fetch(base + route, {
        method,
        headers: Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {}),
        body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    });
}

function widgetEvent(extra) {
    return Object.assign({
        channel: 'widget',
        method: 'crm.deal.list',
        outcome: 'valid',
        executed: true,
        ms: 12,
        page: '/api-reference/crm/deals/crm-deal-list.html',
        session: 'sess-1',
        ts: new Date().toISOString(),
    }, extra || {});
}

async function main() {
    app.start();
    await new Promise((resolve) => setTimeout(resolve, 200));
    base = 'http://127.0.0.1:' + app.server.address().port;

    await check('health отвечает без авторизации', async () => {
        const response = await call('GET', '/api/health');
        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.strictEqual(body.status, 'ok');
        assert.strictEqual(body.configured.ingestToken, true);
    });

    await check('витрина открыта без пароля', async () => {
        const response = await call('GET', '/api/stats');
        const data = await response.json();
        assert.strictEqual(response.status, 200);
        assert.ok(data.totals, 'витрина не отдала цифры');
    });

    await check('входа в приложении больше нет', async () => {
        const response = await call('POST', '/api/login', { body: { password: 'что угодно' } });
        assert.strictEqual(response.status, 404, 'маршрут входа всё ещё жив');
    });

    await check('событие виджета принимается без секрета', async () => {
        const response = await call('POST', '/collect', {
            body: { events: [widgetEvent()] },
            headers: { Origin: 'https://apidocs.bitrix24.ru' },
        });
        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.strictEqual(body.accepted, 1);
    });

    await check('чужой Origin отклоняется', async () => {
        const response = await call('POST', '/collect', {
            body: { events: [widgetEvent()] },
            headers: { Origin: 'https://evil.example' },
        });
        assert.strictEqual(response.status, 403);
    });

    await check('канал api из браузера не принимается', async () => {
        const response = await call('POST', '/collect', {
            body: { events: [widgetEvent({ channel: 'api' })] },
            headers: { Origin: 'https://apidocs.bitrix24.ru' },
        });
        const body = await response.json();
        assert.strictEqual(body.accepted, 0, 'подделка канала прошла');
        assert.strictEqual(body.skipped, 1);
    });

    await check('приём с сервера требует токен', async () => {
        const response = await call('POST', '/ingest', { body: { events: [widgetEvent({ channel: 'api' })] } });
        assert.strictEqual(response.status, 401);
    });

    await check('приём с сервера работает по токену', async () => {
        const response = await call('POST', '/ingest', {
            body: { events: [widgetEvent({ channel: 'api', method: 'crm.lead.list', outcome: 'invalid', errors: ['unknown_param'], errorParams: ['fliter'] })] },
            headers: { 'X-Ingest-Token': 'test-token' },
        });
        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.strictEqual(body.accepted, 1);
    });

    await check('повторная отправка того же id не удваивает счётчик', async () => {
        const event = widgetEvent({ id: 'dup-1' });
        const first = await call('POST', '/collect', { body: { events: [event] }, headers: { Origin: 'https://apidocs.bitrix24.ru' } });
        const second = await call('POST', '/collect', { body: { events: [event] }, headers: { Origin: 'https://apidocs.bitrix24.ru' } });
        assert.strictEqual((await first.json()).accepted, 1);
        assert.strictEqual((await second.json()).accepted, 0);
    });

    await check('мусорное событие не попадает в статистику', async () => {
        const response = await call('POST', '/collect', {
            body: { events: [{ channel: 'widget' }, { nonsense: true }, null] },
            headers: { Origin: 'https://apidocs.bitrix24.ru' },
        });
        assert.strictEqual((await response.json()).accepted, 0);
    });

    await check('витрина считает людей и агентов раздельно', async () => {
        const response = await call('GET', '/api/stats?range=24h');
        const data = await response.json();
        assert.strictEqual(response.status, 200);
        assert.strictEqual(data.totals.human, 2, 'людей: ' + data.totals.human);
        assert.strictEqual(data.totals.agent, 1, 'агентов: ' + data.totals.agent);
        assert.strictEqual(data.totals.ok, 2);
        assert.strictEqual(data.totals.err, 1);
        assert.ok(Math.abs(data.totals.errorRate - 1 / 3) < 1e-9, 'доля ошибок: ' + data.totals.errorRate);
        assert.ok(data.top.methods.some((m) => m.key === 'crm.deal.list'));
        assert.ok(data.top.errorParams.some((p) => p.key === 'fliter'), 'параметр с опечаткой не попал в топ');
    });

    await check('таблица методов приходит с разбивкой', async () => {
        const response = await call('GET', '/api/stats?range=24h');
        const data = await response.json();
        const row = data.tables.methods.filter((r) => r.key === 'crm.deal.list')[0];
        assert.ok(row, 'метода нет в таблице');
        assert.strictEqual(row.total, 2, 'вызовов: ' + row.total);
        assert.strictEqual(row.ok, 2);
        assert.strictEqual(row.err, 0);
        assert.strictEqual(row.errorRate, 0);
        assert.ok(data.tables.methods.every((r, i, all) => i === 0 || all[i - 1].total >= r.total), 'таблица не отсортирована');
    });

    await check('таблица ошибок считает доли', async () => {
        const response = await call('GET', '/api/stats?range=24h');
        const data = await response.json();
        const row = data.tables.errorParams.filter((r) => r.key === 'fliter')[0];
        assert.ok(row, 'параметра нет в таблице');
        assert.strictEqual(row.count, 1);
        assert.strictEqual(row.share, 1, 'доля: ' + row.share);
    });

    await check('произвольный диапазон дат работает', async () => {
        const today = new Date().toISOString().slice(0, 10);
        const response = await call('GET', '/api/stats?from=' + today + '&to=' + today);
        const data = await response.json();
        assert.strictEqual(data.range.key, 'custom');
        assert.strictEqual(data.range.custom, true);
        assert.ok(data.totals.attempted > 0, 'за сегодня ничего не нашлось');
        assert.ok(new Date(data.range.from).toISOString().startsWith(today), 'начало не с начала суток');
    });

    await check('перевёрнутый диапазон не даёт пустоту', async () => {
        const today = new Date().toISOString().slice(0, 10);
        const past = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
        const response = await call('GET', '/api/stats?from=' + today + '&to=' + past);
        const data = await response.json();
        assert.ok(data.range.from < data.range.to, 'границы не переставлены');
        assert.ok(data.series.length > 1, 'ряд пуст');
    });

    await check('битая дата откатывается к разумной границе', async () => {
        const response = await call('GET', '/api/stats?from=не-дата&to=2026-13-45');
        const data = await response.json();
        assert.strictEqual(data.range.key, 'custom');
        assert.ok(Number.isFinite(data.range.from) && Number.isFinite(data.range.to), 'границы не числа');
        assert.ok(data.range.from <= data.range.to);
    });

    await check('время из будущего не ломает график', async () => {
        const future = new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString();
        await call('POST', '/collect', { body: { events: [widgetEvent({ ts: future, session: 'sess-x' })] }, headers: { Origin: 'https://apidocs.bitrix24.ru' } });
        const response = await call('GET', '/api/stats?range=24h');
        const data = await response.json();
        const last = data.series[data.series.length - 1];
        assert.ok(data.series.every((p) => p.ts <= Date.now() + 60 * 60 * 1000), 'точка уехала в будущее');
        assert.ok(last.total >= 1);
    });

    await check('свёртки переживают перезапуск', async () => {
        app.store.save();
        const { Store } = require('./lib/store');
        const reopened = new Store({ dir: DATA_DIR });
        reopened.init();
        const { build } = require('./lib/aggregate');
        const data = build(reopened, '24h', Date.now());
        assert.strictEqual(data.totals.human, 3, 'после перезапуска людей: ' + data.totals.human);
        assert.strictEqual(data.totals.agent, 1);
    });

    await check('свёртки пересобираются из журнала', async () => {
        fs.unlinkSync(path.join(DATA_DIR, 'rollups.json'));
        const { Store } = require('./lib/store');
        const rebuilt = new Store({ dir: DATA_DIR });
        rebuilt.init();
        const { build } = require('./lib/aggregate');
        const data = build(rebuilt, '24h', Date.now());
        assert.strictEqual(data.totals.human, 3, 'после пересборки людей: ' + data.totals.human);
    });

    await check('старый формат свёрток достраивается без двойного счёта', async () => {
        // Предыдущий тест удалял файл свёрток, поэтому сохраняем принудительно.
        app.store.dirty = true;
        app.store.close();
        await new Promise((resolve) => setTimeout(resolve, 400));

        const before = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'rollups.json'), 'utf8'));
        const expected = Object.values(before.days).reduce((sum, day) => sum + day.total, 0);

        // Имитируем файл, записанный версией без разбивки по методам.
        before.$v = 1;
        Object.values(before.days).forEach((day) => { delete day.methodStats; delete day.pageStats; });
        fs.writeFileSync(path.join(DATA_DIR, 'rollups.json'), JSON.stringify(before));

        const { Store } = require('./lib/store');
        const { build } = require('./lib/aggregate');
        const migrated = new Store({ dir: DATA_DIR });
        migrated.init();
        const data = build(migrated, 'all', Date.now());

        const total = data.totals.attempted + data.totals.service;
        assert.strictEqual(total, expected, 'события посчитаны дважды или потеряны: ' + total + ' вместо ' + expected);
        assert.ok(data.tables.methods.length > 0, 'разбивка по методам не восстановилась');
    });

    await check('тело сверх лимита отклоняется', async () => {
        const big = 'x'.repeat(300 * 1024);
        const response = await fetch(base + '/collect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Origin: 'https://apidocs.bitrix24.ru' },
            body: JSON.stringify({ events: [widgetEvent({ page: big })] }),
        });
        assert.strictEqual(response.status, 413);
    });

    console.log('Пройдено: ' + passed + ', провалено: ' + failures.length);
    failures.forEach((line) => console.log('  ✗ ' + line));
    app.store.close();
    app.server.close();
    fs.rmSync(DATA_DIR, { recursive: true, force: true });
    process.exit(failures.length ? 1 : 0);
}

main();
