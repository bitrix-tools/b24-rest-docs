'use strict';

// Наполняет хранилище правдоподобными событиями — чтобы посмотреть на
// витрину до того, как пойдёт реальный трафик. Только для отладки.
// Запуск: node simulator/dashboard/seed.js [дней]

const { Store } = require('./lib/store');
const { normalize } = require('./lib/classify');

const DAYS = Number(process.argv[2]) || 35;
const DIR = process.env.DATA_DIR || '/tmp/b24stat-seed';

const METHODS = [
    ['crm.deal.list', 'valid', true], ['crm.deal.get', 'valid', true],
    ['crm.deal.add', 'invalid', false], ['crm.lead.list', 'valid', true],
    ['crm.contact.list', 'valid', true], ['crm.company.get', 'valid', true],
    ['tasks.task.list', 'valid', true], ['tasks.task.add', 'invalid', false],
    ['crm.item.add', 'invalid', false], ['user.get', 'valid', true],
    ['crm.status.list', 'valid', true], ['im.message.add', 'valid', false],
    ['crm.deal.update', 'valid', false], ['bizproc.workflow.start', 'invalid', false],
    ['catalog.product.list', 'valid', false], ['crm.category.list', 'valid', true],
];
const ERRORS = ['unknown_param', 'type_mismatch', 'required_missing', 'required_unknown', 'unknown_field', 'bad_filter_prefix'];
const PARAMS = ['fliter', 'ID', 'select', 'RESPONSIBLE_ID', 'order', 'fields.TITLE', 'CATEGORY_ID', 'entityTypeId'];
const PAGES = [
    '/api-reference/crm/deals/crm-deal-list.html',
    '/api-reference/crm/deals/crm-deal-add.html',
    '/api-reference/crm/leads/crm-lead-list.html',
    '/api-reference/tasks/tasks-task-list.html',
    '/api-reference/crm/universal/crm-item-add.html',
    '/api-reference/user/user-get.html',
];

// Детерминированный генератор: одинаковый seed даёт одинаковую картинку.
let seed = 20260907;
function rnd() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
}
function pick(list) { return list[Math.floor(rnd() * list.length)]; }

const store = new Store({ dir: DIR });
store.init();

const now = Date.now();
let written = 0;

for (let day = DAYS - 1; day >= 0; day -= 1) {
    // Будни активнее выходных, свежие дни активнее старых.
    const date = new Date(now - day * 86400000);
    const weekday = date.getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    const growth = 0.5 + (DAYS - day) / DAYS;
    const perDay = Math.round((weekend ? 25 : 90) * growth * (0.7 + rnd() * 0.6));

    for (let i = 0; i < perDay; i += 1) {
        // Рабочий день по UTC: пик в середине.
        const hour = Math.min(23, Math.max(0, Math.round(6 + rnd() * 12 + rnd() * 4)));
        const ts = new Date(date);
        ts.setUTCHours(hour, Math.floor(rnd() * 60), Math.floor(rnd() * 60), 0);

        const agent = rnd() < 0.42;
        const entry = pick(METHODS);
        const broken = rnd() < (agent ? 0.28 : 0.38);
        const outcome = broken ? (rnd() < 0.08 ? 'rejected_secret' : (rnd() < 0.1 ? 'unknown_method' : 'invalid')) : entry[1];

        const raw = {
            channel: agent ? 'api' : 'widget',
            method: entry[0],
            outcome: outcome,
            executed: outcome === 'valid' && entry[2],
            ms: Math.round(2 + rnd() * rnd() * 240),
            page: agent ? '' : pick(PAGES),
            session: (agent ? 'a' : 'h') + Math.floor(rnd() * (agent ? 40 : 260)),
            ts: ts.toISOString(),
            errors: outcome === 'invalid' ? [pick(ERRORS)] : [],
            errorParams: outcome === 'invalid' ? [pick(PARAMS)] : [],
        };

        const event = normalize(raw, { now: ts.getTime() + 1000, userAgent: agent ? 'python-httpx/0.27' : 'Mozilla/5.0 Chrome/140' });
        if (event) {
            event.actor = agent ? 'agent' : 'human';
            store.add(event, null);
            written += 1;
        }
    }
}

store.save();
store.close();
console.log('Записано событий: ' + written + ' в ' + DIR);
