'use strict';

// Генерация детерминированного тестового датасета для симулятора.
//
//   node simulator/generate-fixtures.js                — датасет на сегодняшнюю дату
//   node simulator/generate-fixtures.js --date=2026-08-14
//
// Датасет детерминирован в паре (seed, date): при одинаковой дате сборки все
// инстансы получают побайтово одинаковый файл. Дата попадает в версию датасета,
// поэтому «dataset@v1+2026-08-14» однозначно идентифицирует данные.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.join(ROOT, '_assets', 'simulator', 'fixtures', 'dataset.json');

const SEED = 20240917;
const TZ = '+03:00';

const COUNTS = { users: 6, companies: 12, contacts: 30, leads: 25, deals: 60, tasks: 30 };

// Детерминированный ГПСЧ: одинаковый seed — одинаковая последовательность.
function mulberry32(seed) {
    let a = seed >>> 0;
    return function next() {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function createRandom(seed) {
    const next = mulberry32(seed);
    return {
        int(min, max) {
            return min + Math.floor(next() * (max - min + 1));
        },
        pick(list) {
            return list[Math.floor(next() * list.length)];
        },
        chance(probability) {
            return next() < probability;
        },
        float(min, max, decimals) {
            const value = min + next() * (max - min);
            return Number(value.toFixed(decimals));
        },
    };
}

const FIRST_NAMES = ['Анна', 'Дмитрий', 'Елена', 'Сергей', 'Мария', 'Игорь', 'Ольга', 'Павел', 'Наталья', 'Артём', 'Ирина', 'Максим'];
const SECOND_NAMES = ['Ивановна', 'Петрович', 'Сергеевна', 'Андреевич', 'Викторовна', 'Олегович'];
const LAST_NAMES = ['Титов', 'Соколова', 'Кузнецов', 'Морозова', 'Волков', 'Лебедева', 'Новиков', 'Егорова', 'Зайцев', 'Медведева'];
const COMPANY_NAMES = ['Аврора', 'Гранит', 'Северный ветер', 'ТехноПарк', 'Мосэлектро', 'Логистик Плюс', 'Ромашка', 'Инжиниринг Групп', 'Сибирь Трейд', 'Альфа Строй', 'Дельта Сервис', 'Веста'];
const INDUSTRIES = ['MANUFACTURING', 'BANKING', 'CONSULTING', 'INFORMATION_TECHNOLOGIES', 'TRADE', 'DELIVERY'];
const DEAL_TITLES = ['Поставка оборудования', 'Годовое обслуживание', 'Внедрение CRM', 'Закупка комплектующих', 'Модернизация склада', 'Пилотный проект', 'Продление лицензий', 'Интеграция телефонии'];
const TASK_TITLES = ['Подготовить коммерческое предложение', 'Согласовать договор', 'Созвониться с клиентом', 'Выставить счёт', 'Проверить отгрузку', 'Обновить документацию', 'Настроить интеграцию', 'Провести демонстрацию'];
const POSTS = ['Директор', 'Менеджер по закупкам', 'Главный инженер', 'Бухгалтер', 'Руководитель отдела'];
const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Казань', 'Екатеринбург'];

// Даты раскладываются относительно даты сборки, чтобы сценарии вроде
// «сделки за последний месяц» не протухали через месяц после релиза.
function makeClock(baseDateIso) {
    const base = new Date(baseDateIso + 'T12:00:00Z').getTime();
    const DAY = 24 * 60 * 60 * 1000;

    return {
        daysAgo(days, hour, minute) {
            const date = new Date(base - days * DAY);
            return format(date, hour, minute);
        },
        daysAhead(days, hour, minute) {
            const date = new Date(base + days * DAY);
            return format(date, hour, minute);
        },
    };

    function format(date, hour, minute) {
        const yyyy = date.getUTCFullYear();
        const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(date.getUTCDate()).padStart(2, '0');
        const hh = String(hour).padStart(2, '0');
        const mi = String(minute).padStart(2, '0');
        return yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + mi + ':00' + TZ;
    }
}

function buildUsers(random, clock) {
    const ids = [1, 6, 9, 12, 15, 21];
    return ids.slice(0, COUNTS.users).map((id, index) => {
        const name = FIRST_NAMES[index % FIRST_NAMES.length];
        const lastName = LAST_NAMES[index % LAST_NAMES.length];
        return {
            ID: String(id),
            ACTIVE: true,
            NAME: name,
            LAST_NAME: lastName,
            SECOND_NAME: '',
            EMAIL: 'user' + id + '@example.com',
            LAST_LOGIN: clock.daysAgo(random.int(0, 5), 10, 15),
            DATE_REGISTER: clock.daysAgo(random.int(400, 900), 9, 0),
            IS_ONLINE: random.chance(0.4) ? 'Y' : 'N',
            TIME_ZONE: '',
            PERSONAL_GENDER: '',
            PERSONAL_CITY: random.pick(CITIES),
            WORK_POSITION: index === 0 ? 'Директор' : random.pick(POSTS),
            UF_DEPARTMENT: [random.int(1, 3)],
            USER_TYPE: 'employee',
        };
    });
}

function buildCategories() {
    // entityTypeId 2 — сделка, 1 — лид (справочник воронок сделок)
    return [
        { id: 0, name: 'Общая', sort: 10, entityTypeId: 2, isDefault: 'Y', originId: '', originatorId: '' },
        { id: 1, name: 'Продажа оборудования', sort: 20, entityTypeId: 2, isDefault: 'N', originId: '', originatorId: '' },
        { id: 2, name: 'Сервисное обслуживание', sort: 30, entityTypeId: 2, isDefault: 'N', originId: '', originatorId: '' },
    ];
}

const DEAL_STAGES = [
    { categoryId: 0, statusId: 'NEW', name: 'Новая', semantics: 'process', color: '#39A8EF' },
    { categoryId: 0, statusId: 'PREPARATION', name: 'Подготовка документов', semantics: 'process', color: '#2FC6F6' },
    { categoryId: 0, statusId: 'PREPAYMENT_INVOICE', name: 'Счёт на предоплату', semantics: 'process', color: '#55D0E0' },
    { categoryId: 0, statusId: 'WON', name: 'Сделка успешна', semantics: 'success', color: '#7BD500' },
    { categoryId: 0, statusId: 'LOSE', name: 'Сделка провалена', semantics: 'failure', color: '#FF5752' },
    { categoryId: 1, statusId: 'C1:NEW', name: 'Заявка', semantics: 'process', color: '#39A8EF' },
    { categoryId: 1, statusId: 'C1:PREPARATION', name: 'Согласование', semantics: 'process', color: '#2FC6F6' },
    { categoryId: 1, statusId: 'C1:WON', name: 'Отгружено', semantics: 'success', color: '#7BD500' },
    { categoryId: 2, statusId: 'C2:NEW', name: 'Обращение', semantics: 'process', color: '#39A8EF' },
    { categoryId: 2, statusId: 'C2:WON', name: 'Закрыто', semantics: 'success', color: '#7BD500' },
];

const LEAD_STATUSES = [
    { statusId: 'NEW', name: 'Не обработан', semantics: 'process' },
    { statusId: 'IN_PROCESS', name: 'В работе', semantics: 'process' },
    { statusId: 'PROCESSED', name: 'Обработан', semantics: 'process' },
    { statusId: 'CONVERTED', name: 'Качественный лид', semantics: 'success' },
    { statusId: 'JUNK', name: 'Некачественный лид', semantics: 'failure' },
];

const SOURCES = [
    { statusId: 'CALL', name: 'Звонок' },
    { statusId: 'EMAIL', name: 'Электронная почта' },
    { statusId: 'WEB', name: 'Веб-сайт' },
    { statusId: 'ADVERTISING', name: 'Реклама' },
    { statusId: 'PARTNER', name: 'Существующий клиент' },
];

const DEAL_TYPES = [
    { statusId: 'SALE', name: 'Продажа' },
    { statusId: 'COMPLEX', name: 'Комплексная продажа' },
    { statusId: 'GOODS', name: 'Товары' },
];

function buildStatuses() {
    const rows = [];
    let id = 100;

    const push = (entityId, item, sort, extra) => {
        rows.push({
            ID: String(id++),
            ENTITY_ID: entityId,
            STATUS_ID: item.statusId,
            NAME: item.name,
            NAME_INIT: '',
            SORT: String(sort),
            SYSTEM: item.semantics === 'success' || item.semantics === 'failure' ? 'Y' : 'N',
            CATEGORY_ID: extra && extra.categoryId !== undefined ? String(extra.categoryId) : null,
            COLOR: (extra && extra.color) || null,
            SEMANTICS: item.semantics === 'process' ? null : item.semantics === 'success' ? 'S' : 'F',
        });
    };

    DEAL_STAGES.forEach((stage, index) =>
        push('DEAL_STAGE', stage, (index + 1) * 10, { categoryId: stage.categoryId, color: stage.color })
    );
    LEAD_STATUSES.forEach((status, index) => push('STATUS', status, (index + 1) * 10, {}));
    SOURCES.forEach((source, index) => push('SOURCE', { ...source, semantics: 'process' }, (index + 1) * 10, {}));
    DEAL_TYPES.forEach((type, index) => push('DEAL_TYPE', { ...type, semantics: 'process' }, (index + 1) * 10, {}));

    return rows;
}

function buildCompanies(random, clock, users) {
    return COMPANY_NAMES.slice(0, COUNTS.companies).map((title, index) => {
        const id = index + 1;
        const created = random.int(30, 700);
        return {
            ID: String(id),
            TITLE: 'ООО «' + title + '»',
            COMPANY_TYPE: random.pick(['CUSTOMER', 'SUPPLIER', 'PARTNER']),
            INDUSTRY: random.pick(INDUSTRIES),
            REVENUE: String(random.int(500, 50000) * 1000),
            CURRENCY_ID: 'RUB',
            EMPLOYEES: random.pick(['EMPLOYEES_1', 'EMPLOYEES_2', 'EMPLOYEES_3']),
            ADDRESS_CITY: random.pick(CITIES),
            OPENED: random.chance(0.8) ? 'Y' : 'N',
            ASSIGNED_BY_ID: random.pick(users).ID,
            CREATED_BY_ID: users[0].ID,
            DATE_CREATE: clock.daysAgo(created, random.int(9, 18), random.int(0, 59)),
            DATE_MODIFY: clock.daysAgo(random.int(0, Math.min(created, 30)), random.int(9, 18), random.int(0, 59)),
            HAS_PHONE: 'Y',
            HAS_EMAIL: 'Y',
            PHONE: [{ ID: String(1000 + id), VALUE: '+7495' + String(1000000 + id * 7919).slice(0, 7), VALUE_TYPE: 'WORK', TYPE_ID: 'PHONE' }],
            EMAIL: [{ ID: String(2000 + id), VALUE: 'info@' + 'company' + id + '.example.com', VALUE_TYPE: 'WORK', TYPE_ID: 'EMAIL' }],
        };
    });
}

function buildContacts(random, clock, users, companies) {
    const contacts = [];
    for (let index = 0; index < COUNTS.contacts; index++) {
        const id = index + 1;
        const company = random.pick(companies);
        const created = random.int(10, 600);
        contacts.push({
            ID: String(id),
            NAME: random.pick(FIRST_NAMES),
            SECOND_NAME: random.chance(0.4) ? random.pick(SECOND_NAMES) : '',
            LAST_NAME: random.pick(LAST_NAMES),
            POST: random.pick(POSTS),
            COMPANY_ID: company.ID,
            TYPE_ID: random.pick(['CLIENT', 'SUPPLIER', 'PARTNER']),
            SOURCE_ID: random.pick(SOURCES).statusId,
            OPENED: random.chance(0.85) ? 'Y' : 'N',
            ASSIGNED_BY_ID: random.pick(users).ID,
            CREATED_BY_ID: users[0].ID,
            DATE_CREATE: clock.daysAgo(created, random.int(9, 18), random.int(0, 59)),
            DATE_MODIFY: clock.daysAgo(random.int(0, Math.min(created, 40)), random.int(9, 18), random.int(0, 59)),
            ADDRESS_CITY: company.ADDRESS_CITY,
            HAS_PHONE: 'Y',
            HAS_EMAIL: 'Y',
            PHONE: [{ ID: String(3000 + id), VALUE: '+7916' + String(1000000 + id * 6733).slice(0, 7), VALUE_TYPE: 'MOBILE', TYPE_ID: 'PHONE' }],
            EMAIL: [{ ID: String(4000 + id), VALUE: 'contact' + id + '@example.com', VALUE_TYPE: 'WORK', TYPE_ID: 'EMAIL' }],
        });
    }
    return contacts;
}

function buildLeads(random, clock, users, companies) {
    const leads = [];
    for (let index = 0; index < COUNTS.leads; index++) {
        const id = index + 1;
        const status = random.pick(LEAD_STATUSES);
        const created = random.int(1, 365);
        const company = random.pick(companies);
        leads.push({
            ID: String(id),
            TITLE: 'Заявка с сайта № ' + (1000 + id),
            STATUS_ID: status.statusId,
            STATUS_SEMANTIC_ID: status.semantics === 'success' ? 'S' : status.semantics === 'failure' ? 'F' : 'P',
            NAME: random.pick(FIRST_NAMES),
            LAST_NAME: random.pick(LAST_NAMES),
            COMPANY_TITLE: company.TITLE,
            SOURCE_ID: random.pick(SOURCES).statusId,
            OPPORTUNITY: String(random.int(15, 900) * 1000) + '.00',
            CURRENCY_ID: 'RUB',
            OPENED: random.chance(0.8) ? 'Y' : 'N',
            ASSIGNED_BY_ID: random.pick(users).ID,
            CREATED_BY_ID: users[0].ID,
            DATE_CREATE: clock.daysAgo(created, random.int(8, 20), random.int(0, 59)),
            DATE_MODIFY: clock.daysAgo(random.int(0, Math.min(created, 20)), random.int(8, 20), random.int(0, 59)),
            HAS_PHONE: 'Y',
            HAS_EMAIL: random.chance(0.7) ? 'Y' : 'N',
            PHONE: [{ ID: String(5000 + id), VALUE: '+7925' + String(1000000 + id * 5417).slice(0, 7), VALUE_TYPE: 'MOBILE', TYPE_ID: 'PHONE' }],
            EMAIL: [{ ID: String(6000 + id), VALUE: 'lead' + id + '@example.com', VALUE_TYPE: 'WORK', TYPE_ID: 'EMAIL' }],
        });
    }
    return leads;
}

function buildDeals(random, clock, users, companies, contacts) {
    const deals = [];
    for (let index = 0; index < COUNTS.deals; index++) {
        const id = index + 1;
        const stage = random.pick(DEAL_STAGES);
        const company = random.pick(companies);
        const companyContacts = contacts.filter((c) => c.COMPANY_ID === company.ID);
        const contact = companyContacts.length ? random.pick(companyContacts) : random.pick(contacts);
        const createdDaysAgo = random.int(0, 360);
        const closedDaysAgo = createdDaysAgo - random.int(5, 45);
        const opportunity = random.int(20, 2500) * 1000;

        deals.push({
            ID: String(id),
            TITLE: random.pick(DEAL_TITLES) + ' — ' + company.TITLE,
            TYPE_ID: random.pick(DEAL_TYPES).statusId,
            CATEGORY_ID: String(stage.categoryId),
            STAGE_ID: stage.statusId,
            STAGE_SEMANTIC_ID: stage.semantics === 'success' ? 'S' : stage.semantics === 'failure' ? 'F' : 'P',
            IS_NEW: stage.statusId.endsWith('NEW') ? 'Y' : 'N',
            IS_RECURRING: 'N',
            IS_RETURN_CUSTOMER: random.chance(0.2) ? 'Y' : 'N',
            PROBABILITY: String(random.int(1, 10) * 10),
            CURRENCY_ID: 'RUB',
            OPPORTUNITY: String(opportunity) + '.00',
            IS_MANUAL_OPPORTUNITY: 'Y',
            TAX_VALUE: String(Math.round(opportunity * 0.2)) + '.00',
            COMPANY_ID: company.ID,
            CONTACT_ID: contact.ID,
            BEGINDATE: clock.daysAgo(createdDaysAgo, 0, 0),
            CLOSEDATE: closedDaysAgo > 0 ? clock.daysAgo(closedDaysAgo, 0, 0) : clock.daysAhead(-closedDaysAgo, 0, 0),
            OPENED: random.chance(0.75) ? 'Y' : 'N',
            CLOSED: stage.semantics === 'process' ? 'N' : 'Y',
            COMMENTS: '',
            ASSIGNED_BY_ID: random.pick(users).ID,
            CREATED_BY_ID: users[0].ID,
            MODIFY_BY_ID: random.pick(users).ID,
            DATE_CREATE: clock.daysAgo(createdDaysAgo, random.int(9, 19), random.int(0, 59)),
            DATE_MODIFY: clock.daysAgo(random.int(0, Math.min(createdDaysAgo, 25)), random.int(9, 19), random.int(0, 59)),
            SOURCE_ID: random.pick(SOURCES).statusId,
            SOURCE_DESCRIPTION: '',
            ADDITIONAL_INFO: '',
            LOCATION_ID: null,
            LEAD_ID: random.chance(0.35) ? String(random.int(1, COUNTS.leads)) : null,
        });
    }
    return deals;
}

function buildTasks(random, clock, users) {
    const tasks = [];
    for (let index = 0; index < COUNTS.tasks; index++) {
        const id = 100 + index;
        const responsible = random.pick(users);
        const creator = users[0];
        const createdDaysAgo = random.int(0, 180);
        const status = random.pick(['2', '3', '5']);

        tasks.push({
            id: String(id),
            title: random.pick(TASK_TITLES),
            description: 'Описание задачи № ' + id,
            descriptionInBbcode: 'Y',
            status,
            priority: random.pick(['0', '1', '2']),
            mark: '',
            responsibleId: responsible.ID,
            createdBy: creator.ID,
            createdDate: clock.daysAgo(createdDaysAgo, random.int(9, 18), random.int(0, 59)),
            changedDate: clock.daysAgo(random.int(0, Math.min(createdDaysAgo, 15)), random.int(9, 18), random.int(0, 59)),
            deadline: random.chance(0.75) ? clock.daysAhead(random.int(-30, 45), 19, 0) : null,
            closedDate: status === '5' ? clock.daysAgo(random.int(0, Math.min(createdDaysAgo, 20)), 17, 0) : null,
            group: [],
            groupId: '0',
            accomplices: [],
            auditors: [],
            allowChangeDeadline: 'Y',
            timeEstimate: String(random.int(0, 8) * 3600),
            responsible: {
                id: responsible.ID,
                name: responsible.NAME + ' ' + responsible.LAST_NAME,
                link: '/company/personal/user/' + responsible.ID + '/',
                workPosition: responsible.WORK_POSITION,
            },
            creator: {
                id: creator.ID,
                name: creator.NAME + ' ' + creator.LAST_NAME,
                link: '/company/personal/user/' + creator.ID + '/',
                workPosition: creator.WORK_POSITION,
            },
        });
    }
    return tasks;
}

// Дата сборки входит в данные, поэтому по умолчанию берём её из уже
// сгенерированного датасета: иначе каждый запуск сборки давал бы изменение файла
// на пустом месте. Обновить даты осознанно — `--today` или `--date=ГГГГ-ММ-ДД`.
function defaultDate() {
    if (!process.argv.includes('--today') && fs.existsSync(OUT_FILE)) {
        try {
            const existing = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
            if (existing && /^\d{4}-\d{2}-\d{2}$/.test(existing.generatedAt)) {
                return existing.generatedAt;
            }
        } catch (error) {
            // повреждённый файл — просто пересоберём на сегодня
        }
    }
    return new Date().toISOString().slice(0, 10);
}

function main() {
    const dateArg = process.argv.find((a) => a.startsWith('--date='));
    const generatedAt = dateArg ? dateArg.slice('--date='.length) : defaultDate();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(generatedAt)) {
        console.error('Некорректная дата: ' + generatedAt);
        process.exit(1);
    }

    const random = createRandom(SEED);
    const clock = makeClock(generatedAt);

    const users = buildUsers(random, clock);
    const categories = buildCategories();
    const statuses = buildStatuses();
    const companies = buildCompanies(random, clock, users);
    const contacts = buildContacts(random, clock, users, companies);
    const leads = buildLeads(random, clock, users, companies);
    const deals = buildDeals(random, clock, users, companies, contacts);
    const tasks = buildTasks(random, clock, users);

    const dataset = {
        $v: 1,
        version: 'dataset@v1+' + generatedAt,
        generatedAt,
        seed: SEED,
        note: 'Вымышленные данные. Совпадения с реальными компаниями и людьми случайны.',
        entities: { users, categories, statuses, companies, contacts, leads, deals, tasks },
    };

    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, JSON.stringify(dataset, null, 2) + '\n', 'utf8');

    console.log('Датасет: ' + dataset.version);
    Object.entries(dataset.entities).forEach(([name, list]) => console.log('  ' + name.padEnd(12) + list.length));
    console.log('Записано: ' + path.relative(ROOT, OUT_FILE));
}

main();
