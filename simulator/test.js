'use strict';

// Тесты симулятора: node simulator/test.js
// Датасет и схемы должны быть сгенерированы (npm-скриптов в репозитории нет,
// см. simulator/README.md).

const fs = require('fs');
const path = require('path');

const B24Sim = require('./lib/core.js');

const ROOT = path.resolve(__dirname, '..');
const SPEC_DIR = path.join(ROOT, '_assets', 'simulator', 'spec', 'methods');
const DATASET_FILE = path.join(ROOT, '_assets', 'simulator', 'fixtures', 'dataset.json');

const dataset = JSON.parse(fs.readFileSync(DATASET_FILE, 'utf8'));

function spec(method) {
    return JSON.parse(fs.readFileSync(path.join(SPEC_DIR, method + '.json'), 'utf8'));
}

let passed = 0;
const failures = [];

function test(name, fn) {
    try {
        fn();
        passed++;
    } catch (error) {
        failures.push({ name, message: error.message });
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error((message || 'значения не совпали') + ': ожидалось ' + JSON.stringify(expected) + ', получено ' + JSON.stringify(actual));
    }
}

function errorClasses(response) {
    return ((response.simulator && response.simulator.validation && response.simulator.validation.errors) || []).map((e) => e.class);
}

function warningClasses(response) {
    return ((response.simulator && response.simulator.warnings) || []).map((w) => w.class);
}

// --------------------------------------------------------- приёмка сценария П2б

test('П2б: crm.deal.list фильтрует по периоду DATE_CREATE', () => {
    const dealList = spec('crm.deal.list');

    const all = B24Sim.call(dealList, {}, dataset);
    assert(Array.isArray(all.result), 'result должен быть массивом');
    assertEqual(all.total, dataset.entities.deals.length, 'total без фильтра');

    const from = dataset.generatedAt.slice(0, 4) + '-01-01T00:00:00+03:00';
    const filtered = B24Sim.call(dealList, { filter: { '>=DATE_CREATE': from } }, dataset);

    assert(filtered.total <= all.total, 'фильтр не должен увеличивать выборку');
    assert(
        filtered.result.every((deal) => Date.parse(deal.DATE_CREATE) >= Date.parse(from)),
        'в выборку попали сделки раньше границы фильтра'
    );

    const expected = dataset.entities.deals.filter((deal) => Date.parse(deal.DATE_CREATE) >= Date.parse(from)).length;
    assertEqual(filtered.total, expected, 'total отфильтрованной выборки');
});

test('П2б: select, order и пагинация работают вместе', () => {
    const dealList = spec('crm.deal.list');

    const page1 = B24Sim.call(dealList, { select: ['ID', 'TITLE', 'OPPORTUNITY'], order: { ID: 'ASC' } }, dataset);
    assertEqual(Object.keys(page1.result[0]).sort().join(','), 'ID,OPPORTUNITY,TITLE', 'select должен ограничить поля');
    assertEqual(page1.result.length, B24Sim.PAGE_SIZE, 'страница — 50 записей');
    assertEqual(page1.next, B24Sim.PAGE_SIZE, 'next указывает на следующую страницу');

    const page2 = B24Sim.call(dealList, { order: { ID: 'ASC' }, start: 50 }, dataset);
    assertEqual(page2.result.length, dataset.entities.deals.length - B24Sim.PAGE_SIZE, 'вторая страница');
    assert(page2.next === undefined, 'на последней странице next не передаётся');

    const desc = B24Sim.call(dealList, { order: { ID: 'DESC' } }, dataset);
    assert(Number(desc.result[0].ID) > Number(page1.result[0].ID), 'DESC должен перевернуть порядок');
});

test('П2б: связность данных — ID из сделки резолвятся другими методами', () => {
    const deal = B24Sim.call(spec('crm.deal.list'), { order: { ID: 'ASC' } }, dataset).result[0];

    const company = B24Sim.call(spec('crm.company.get'), { id: deal.COMPANY_ID }, dataset);
    assert(company.result && company.result.ID === deal.COMPANY_ID, 'crm.company.get не нашёл компанию сделки');

    const contact = B24Sim.call(spec('crm.contact.get'), { id: deal.CONTACT_ID }, dataset);
    assert(contact.result && contact.result.ID === deal.CONTACT_ID, 'crm.contact.get не нашёл контакт сделки');

    const users = B24Sim.call(spec('user.get'), { FILTER: '' }, dataset);
    assert(
        users.result.some((user) => user.ID === deal.ASSIGNED_BY_ID),
        'ответственный сделки отсутствует среди пользователей'
    );

    const stages = B24Sim.call(spec('crm.status.list'), { filter: { ENTITY_ID: 'DEAL_STAGE' } }, dataset);
    assert(
        stages.result.some((status) => status.STATUS_ID === deal.STAGE_ID),
        'стадия сделки отсутствует в справочнике crm.status.list'
    );

    const categories = B24Sim.call(spec('crm.category.list'), { entityTypeId: 2 }, dataset);
    assert(
        categories.result.categories.some((category) => String(category.id) === deal.CATEGORY_ID),
        'воронка сделки отсутствует в crm.category.list'
    );
});

// ------------------------------------------------------------------ валидация

test('неизвестный параметр даёт подсказку', () => {
    const response = B24Sim.call(spec('crm.deal.list'), { fitler: {} }, dataset);
    assertEqual(response.error, 'SIMULATOR_VALIDATION', 'ожидалась ошибка валидации');
    assert(errorClasses(response).includes('unknown_param'), 'ожидался класс unknown_param');
    const detail = response.simulator.validation.errors[0];
    assert(/filter/.test(detail.hint), 'подсказка должна указывать на filter, получено: ' + detail.hint);
});

test('неверный тип параметра отлавливается', () => {
    const response = B24Sim.call(spec('crm.deal.list'), { filter: 'ID=1' }, dataset);
    assert(errorClasses(response).includes('wrong_type'), 'ожидался класс wrong_type');
});

test('отсутствие обязательного параметра отлавливается', () => {
    const response = B24Sim.call(spec('crm.category.list'), {}, dataset);
    assert(errorClasses(response).includes('missing_required'), 'entityTypeId обязателен');
});

test('неразмеченная обязательность даёт предупреждение, а не молчание', () => {
    const dealAdd = spec('crm.deal.add');
    assertEqual(dealAdd.requiredConvention, false, 'на странице crm.deal.add звёздочки не расставлены');

    const response = B24Sim.call(dealAdd, {}, dataset);
    assert(!response.error, 'вызов без fields проходит валидацию — обязательность неизвестна');
    assert(warningClasses(response).includes('required_unknown'), 'ожидалось предупреждение required_unknown');
});

test('неизвестное поле внутри fields отлавливается, UF_* — нет', () => {
    const response = B24Sim.call(spec('crm.deal.add'), { fields: { TITLLE: 'Тест', UF_CRM_123: 'x' } }, dataset);
    const errors = response.simulator.validation.errors;
    assert(
        errors.some((e) => e.param === 'fields.TITLLE' && /TITLE/.test(e.hint)),
        'ожидалась подсказка TITLE для fields.TITLLE'
    );
    assert(!errors.some((e) => e.param === 'fields.UF_CRM_123'), 'пользовательское поле не должно быть ошибкой');
});

test('deprecated-метод помечается предупреждением', () => {
    const response = B24Sim.call(spec('crm.deal.list'), {}, dataset);
    assert(warningClasses(response).includes('deprecated_method'), 'crm.deal.list помечен DEPRECATED в документации');
});

test('опечатка в имени поля filter/order/select даёт подсказку', () => {
    const dealList = spec('crm.deal.list');
    assert(dealList.entityFields && dealList.entityFields.length > 20, 'у списочного метода должен быть состав полей');

    const response = B24Sim.call(
        dealList,
        { filter: { '>=DATE_CREAT': '2026-01-01T00:00:00+03:00' }, order: { TITL: 'ASC' }, select: ['ID', 'OPPORTUNTY'] },
        dataset
    );

    assert(!response.error, 'опечатка в поле не должна ломать вызов — это предупреждение');

    const fields = (response.simulator.warnings || []).filter((w) => w.class === 'unknown_field');
    assertEqual(fields.length, 3, 'ожидалось три предупреждения о полях');
    assert(/DATE_CREATE/.test(fields[0].message), 'подсказка по filter');
    assert(/TITLE/.test(fields[1].message), 'подсказка по order');
    assert(/OPPORTUNITY/.test(fields[2].message), 'подсказка по select');
});

test('корректные поля и UF_* предупреждений не дают', () => {
    const response = B24Sim.call(
        spec('crm.deal.list'),
        { filter: { '>=DATE_CREATE': '2026-01-01T00:00:00+03:00', '@STAGE_ID': ['NEW'] }, order: { ID: 'DESC' }, select: ['*', 'UF_*', 'UF_CRM_123'] },
        dataset
    );
    assertEqual((response.simulator.warnings || []).filter((w) => w.class === 'unknown_field').length, 0, 'ложных предупреждений быть не должно');
});

test('в задачах UPPER_CASE фильтр сверяется с camelCase полями', () => {
    const taskList = spec('tasks.task.list');
    const ok = B24Sim.call(taskList, { filter: { RESPONSIBLE_ID: '1' } }, dataset);
    assertEqual((ok.simulator.warnings || []).filter((w) => w.class === 'unknown_field').length, 0, 'RESPONSIBLE_ID — валидное поле задачи');

    const typo = B24Sim.call(taskList, { filter: { RESPONSIBLE_IDD: '1' } }, dataset);
    assert(
        (typo.simulator.warnings || []).some((w) => w.class === 'unknown_field'),
        'опечатка в поле задачи должна отлавливаться'
    );
});

// ----------------------------------------------------------------- безопасность

test('вебхук в параметрах отклоняется', () => {
    const response = B24Sim.call(spec('crm.deal.list'), { filter: { COMMENTS: 'https://b24.example/rest/1/abcd1234efgh/crm.deal.list' } }, dataset);
    assertEqual(response.error, 'SECURITY_REJECTED', 'вебхук должен быть отклонён');
});

test('токен доступа в параметрах отклоняется', () => {
    const response = B24Sim.call(spec('crm.deal.list'), { auth: 'abcdef123456' }, dataset);
    assertEqual(response.error, 'SECURITY_REJECTED', 'параметр auth должен быть отклонён');
});

// ------------------------------------------------------------------- задачи

test('tasks.task.list: фильтр в UPPER_CASE, ответ в camelCase', () => {
    const taskList = spec('tasks.task.list');
    const responsibleId = dataset.entities.tasks[0].responsibleId;

    const response = B24Sim.call(taskList, { filter: { RESPONSIBLE_ID: responsibleId }, order: { ID: 'ASC' } }, dataset);

    assert(response.result && Array.isArray(response.result.tasks), 'ответ должен лежать в result.tasks');
    assert(response.result.tasks.length > 0, 'выборка не должна быть пустой');
    assert(
        response.result.tasks.every((task) => task.responsibleId === responsibleId),
        'фильтр по RESPONSIBLE_ID не сработал'
    );
    assert('createdDate' in response.result.tasks[0], 'поля задачи возвращаются в camelCase');
});

test('tasks.task.get отдаёт задачу в result.task', () => {
    const id = dataset.entities.tasks[3].id;
    const response = B24Sim.call(spec('tasks.task.get'), { taskId: id }, dataset);
    assert(response.result && response.result.task, 'ожидался result.task');
    assertEqual(response.result.task.id, id, 'вернулась не та задача');
});

// ------------------------------------------------------- write и синтетические id

test('write-метод не сохраняет объект и честно об этом пишет', () => {
    const response = B24Sim.call(spec('crm.deal.add'), { fields: { TITLE: 'Тестовая сделка' } }, dataset);
    assertEqual(response.simulator.persisted, false, 'persisted должен быть false');
    assert(response.result >= B24Sim.SYNTHETIC_ID_BASE, 'идентификатор должен быть синтетическим');
});

test('запрос синтетического id объясняет, почему объекта нет', () => {
    const created = B24Sim.call(spec('crm.deal.add'), { fields: { TITLE: 'Тест' } }, dataset).result;
    const response = B24Sim.call(spec('crm.deal.get'), { id: created }, dataset);
    assertEqual(response.error, 'SIMULATOR_NOT_PERSISTED', 'ожидалось объяснение про persisted: false');
});

test('несуществующий id датасета даёт понятную ошибку', () => {
    const response = B24Sim.call(spec('crm.deal.get'), { id: 99999 }, dataset);
    assertEqual(response.error, 'NOT_FOUND', 'ожидался NOT_FOUND');
});

// ------------------------------------------------------------------- детерминизм

test('датасет детерминирован при одной дате сборки', () => {
    assert(/^dataset@v1\+\d{4}-\d{2}-\d{2}$/.test(dataset.version), 'версия датасета должна включать дату сборки');
});

// ---------------------------------------------------------------------- итог

console.log('Пройдено: ' + passed + ', провалено: ' + failures.length);

if (failures.length) {
    failures.forEach((failure) => console.error('  FAIL  ' + failure.name + '\n        ' + failure.message));
    process.exit(1);
}
