'use strict';

// Тесты HTTP-endpoint симулятора: node simulator/test-server.js

const http = require('http');

const { server } = require('./server.js');

let passed = 0;
const failures = [];

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function request(port, method, urlPath, body) {
    return new Promise((resolve, reject) => {
        const payload = body === undefined ? null : JSON.stringify(body);

        const req = http.request(
            {
                host: '127.0.0.1',
                port,
                method,
                path: urlPath,
                headers: payload ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } : {},
            },
            (res) => {
                const chunks = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', () => {
                    const text = Buffer.concat(chunks).toString('utf8');
                    let json = null;
                    try {
                        json = JSON.parse(text);
                    } catch (error) {
                        json = null;
                    }
                    resolve({ status: res.statusCode, headers: res.headers, json, text });
                });
            }
        );

        req.on('error', reject);
        if (payload) {
            req.write(payload);
        }
        req.end();
    });
}

async function test(name, fn) {
    try {
        await fn();
        passed++;
    } catch (error) {
        failures.push(name + ' :: ' + error.message);
    }
}

(async function main() {
    // Логи сервиса в тестах не нужны — глушим stdout, но не stderr.
    const write = process.stdout.write.bind(process.stdout);
    process.stdout.write = () => true;

    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;

    await test('GET /ai/v1/methods отдаёт список', async () => {
        const response = await request(port, 'GET', '/ai/v1/methods');
        assert(response.status === 200, 'ожидался 200, получен ' + response.status);
        assert(response.json.count > 400, 'методов должно быть больше 400');
    });

    await test('GET /ai/v1/methods фильтрует по scope и q', async () => {
        const byScope = await request(port, 'GET', '/ai/v1/methods?scope=tasks');
        assert(byScope.json.methods.every((m) => m.scope === 'tasks'), 'фильтр по scope не сработал');

        const bySearch = await request(port, 'GET', '/ai/v1/methods?q=deal.list');
        assert(bySearch.json.methods.some((m) => m.method === 'crm.deal.list'), 'поиск не нашёл crm.deal.list');
    });

    await test('GET /ai/v1/spec отдаёт схему, на неизвестный метод — 404', async () => {
        const ok = await request(port, 'GET', '/ai/v1/spec/crm.deal.list');
        assert(ok.status === 200 && ok.json.method === 'crm.deal.list', 'схема не отдалась');
        assert(Array.isArray(ok.json.params), 'в схеме должны быть параметры');

        const missing = await request(port, 'GET', '/ai/v1/spec/crm.nope.nope');
        assert(missing.status === 404 && missing.json.error === 'UNKNOWN_METHOD', 'ожидался 404 UNKNOWN_METHOD');
    });

    await test('POST /ai/v1/call исполняет read-метод на датасете', async () => {
        const response = await request(port, 'POST', '/ai/v1/call/crm.deal.list', {
            filter: { STAGE_ID: 'NEW' },
            select: ['ID', 'STAGE_ID'],
        });

        assert(response.status === 200, 'ожидался 200, получен ' + response.status);
        assert(Array.isArray(response.json.result), 'result должен быть массивом');
        assert(response.json.result.every((deal) => deal.STAGE_ID === 'NEW'), 'фильтр не применился');
        assert(response.json.simulator.mode === 'simulated', 'ответ обязан быть помечен как симуляция');
    });

    await test('POST /ai/v1/call возвращает 400 на ошибку валидации', async () => {
        const response = await request(port, 'POST', '/ai/v1/call/crm.deal.list', { fitler: {} });
        assert(response.status === 400, 'ожидался 400, получен ' + response.status);
        assert(response.json.error === 'SIMULATOR_VALIDATION', 'ожидалась ошибка валидации');
        assert(/filter/.test(JSON.stringify(response.json.simulator.validation.errors)), 'ожидалась подсказка про filter');
    });

    await test('секрет в теле отклоняется', async () => {
        const response = await request(port, 'POST', '/ai/v1/call/crm.deal.list', { auth: 'abcdef123456' });
        assert(response.status === 400 && response.json.error === 'SECURITY_REJECTED', 'секрет должен быть отклонён');
    });

    await test('секрет в адресе отклоняется', async () => {
        const response = await request(port, 'POST', '/ai/v1/call/crm.deal.list?token=/rest/1/abcd1234efgh/', {});
        assert(response.json.error === 'SECURITY_REJECTED', 'вебхук в URL должен быть отклонён');
    });

    await test('неизвестный маршрут даёт 404 с подсказкой', async () => {
        const response = await request(port, 'GET', '/ai/v1/whatever');
        assert(response.status === 404 && /ai\/v1\/methods/.test(response.json.error_description), 'ожидалась подсказка по маршрутам');
    });

    await test('обход каталога в имени метода не проходит', async () => {
        const response = await request(port, 'GET', '/ai/v1/spec/' + encodeURIComponent('../../../.yfm'));
        assert(response.status === 404, 'ожидался 404, получен ' + response.status);
    });

    await new Promise((resolve) => server.close(resolve));
    process.stdout.write = write;

    console.log('Пройдено: ' + passed + ', провалено: ' + failures.length);
    failures.forEach((failure) => console.error('  FAIL  ' + failure));
    process.exit(failures.length ? 1 : 0);
})();
