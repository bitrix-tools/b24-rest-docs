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

    await check('уникальные сессии переживают перезапуск и не затираются', async () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'b24sess-'));
        const { Store } = require('./lib/store');
        const { build } = require('./lib/aggregate');
        const { normalize } = require('./lib/classify');
        const now = Date.now();

        const event = (session) => normalize(
            { channel: 'widget', method: 'crm.deal.list', outcome: 'valid', session, ms: 5 },
            { now, userAgent: 'Mozilla/5.0 Chrome' }
        );

        const first = new Store({ dir });
        first.init();
        for (let i = 0; i < 100; i += 1) {
            first.add(event('s' + i), null);
        }
        assert.strictEqual(build(first, '24h', now).totals.sessions, 100, 'до перезапуска');
        first.dirty = true;
        first.close();
        await new Promise((resolve) => setTimeout(resolve, 300));

        const second = new Store({ dir });
        second.init();
        assert.strictEqual(build(second, '24h', now).totals.sessions, 100, 'сразу после перезапуска');
        for (let i = 100; i < 150; i += 1) {
            second.add(event('s' + i), null);
        }
        assert.strictEqual(build(second, '24h', now).totals.sessions, 150, 'новые сессии после перезапуска не учтены');
        second.dirty = true;
        second.close();
        await new Promise((resolve) => setTimeout(resolve, 300));

        const third = new Store({ dir });
        third.init();
        assert.strictEqual(build(third, '24h', now).totals.sessions, 150, 'после второго перезапуска число уменьшилось');

        fs.rmSync(dir, { recursive: true, force: true });
    });

    await check('лидер дня попадает в топ даже после длинного хвоста', async () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'b24cap-'));
        const { Store } = require('./lib/store');
        const { build } = require('./lib/aggregate');
        const { normalize } = require('./lib/classify');
        const now = Date.now();
        const store = new Store({ dir });
        store.init();

        // Сначала длинный хвост, забивающий потолок в 400 ключей…
        for (let i = 0; i < 400; i += 1) {
            store.add(normalize(
                { channel: 'widget', method: 'rare' + i + '.method', outcome: 'valid', page: '/p' + i + '.html' },
                { now, userAgent: 'Mozilla/5.0 Chrome' }
            ), null);
        }
        // …и только потом настоящий лидер.
        for (let i = 0; i < 5000; i += 1) {
            store.add(normalize(
                { channel: 'widget', method: 'crm.deal.list', outcome: 'valid', page: '/hit.html' },
                { now, userAgent: 'Mozilla/5.0 Chrome' }
            ), null);
        }

        const data = build(store, '24h', now);
        assert.strictEqual(data.totals.attempted, 5400, 'всего: ' + data.totals.attempted);

        const top = data.top.methods[0];
        assert.strictEqual(top.key, 'crm.deal.list', 'лидер топа: ' + top.key);
        assert.ok(top.count >= 5000, 'счётчик лидера занижен: ' + top.count);

        const row = data.tables.methods[0];
        assert.strictEqual(row.key, 'crm.deal.list', 'лидер таблицы: ' + row.key);
        assert.ok(row.total >= 5000, 'вызовов у лидера: ' + row.total);

        assert.ok(data.top.pages.some((p) => p.key === '/hit.html'), 'страница-лидер потерялась');

        store.close();
        await new Promise((resolve) => setTimeout(resolve, 200));
        fs.rmSync(dir, { recursive: true, force: true });
    });

    await check('уборка удаляет журнал старше срока хранения', async () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'b24prune-'));
        fs.mkdirSync(path.join(dir, 'events'), { recursive: true });
        const old = new Date(Date.now() - 200 * 86400000).toISOString().slice(0, 10);
        const fresh = new Date().toISOString().slice(0, 10);
        fs.writeFileSync(path.join(dir, 'events', old + '.ndjson'), '{}\n');
        fs.writeFileSync(path.join(dir, 'events', fresh + '.ndjson'), '{}\n');

        const { Store } = require('./lib/store');
        const store = new Store({ dir });
        store.init();
        store.prune(Date.now());

        const left = fs.readdirSync(path.join(dir, 'events'));
        assert.ok(!left.includes(old + '.ndjson'), 'старый журнал не удалён');
        assert.ok(left.includes(fresh + '.ndjson'), 'свежий журнал удалён по ошибке');

        store.close();
        fs.rmSync(dir, { recursive: true, force: true });
    });

    await check('песочница отдаёт список методов', async () => {
        const response = await call('GET', '/ai/v1/methods?scope=crm&q=deal');
        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.ok(body.count > 0, 'методов не найдено');
        assert.ok(body.methods.every((m) => m.scope === 'crm'), 'скоуп не отфильтрован');
        assert.ok(body.methods.some((m) => m.method === 'crm.deal.list'));
    });

    await check('песочница отдаёт схему метода', async () => {
        const response = await call('GET', '/ai/v1/spec/crm.deal.list');
        const spec = await response.json();
        assert.strictEqual(response.status, 200);
        assert.strictEqual(spec.method, 'crm.deal.list');
        assert.ok(Array.isArray(spec.params) && spec.params.length > 0);
    });

    await check('несуществующий метод даёт UNKNOWN_METHOD', async () => {
        const response = await call('GET', '/ai/v1/spec/crm.deal.listt');
        assert.strictEqual(response.status, 404);
        assert.strictEqual((await response.json()).error, 'UNKNOWN_METHOD');
    });

    await check('корректный вызов исполняется на датасете', async () => {
        const response = await call('POST', '/ai/v1/call/crm.deal.list', {
            body: { select: ['ID', 'TITLE'], filter: { '>=OPPORTUNITY': 1000000 }, order: { ID: 'DESC' } },
        });
        const body = await response.json();
        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(body.result), 'result не массив');
        assert.ok(typeof body.total === 'number', 'нет total');
        assert.strictEqual(body.simulator.mode, 'simulated');
        assert.strictEqual(body.simulator.executed, true);
    });

    await check('ошибка валидации возвращает класс и параметр', async () => {
        const response = await call('POST', '/ai/v1/call/crm.deal.add', {
            body: { fields: { TITLLE: 'Тест' } },
        });
        const body = await response.json();
        assert.strictEqual(response.status, 400);
        assert.strictEqual(body.error, 'SIMULATOR_VALIDATION');
        const errors = body.simulator.validation.errors;
        assert.ok(errors.some((e) => e.param === 'fields.TITLLE' && e.class === 'unknown_param'), JSON.stringify(errors));
    });

    await check('вебхук в адресе отклоняется', async () => {
        const response = await fetch(base + '/ai/v1/call/crm.deal.list?auth=9f2a1c7e0b4d5a6f8e3c2b1a0d9e8f7c', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
        });
        const body = await response.json();
        assert.strictEqual(response.status, 400);
        assert.strictEqual(body.error, 'SECURITY_REJECTED');
    });

    await check('вызовы песочницы попадают в статистику как агенты', async () => {
        const response = await call('GET', '/api/stats?range=24h');
        const data = await response.json();
        assert.ok(data.totals.agent >= 3, 'агентских вызовов: ' + data.totals.agent);
        assert.ok(data.tables.methods.some((r) => r.key === 'crm.deal.list'), 'метода нет в таблице');
        assert.ok(data.tables.errorParams.some((p) => p.key === 'fields.TITLLE'), 'параметр с опечаткой не попал в статистику');
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
