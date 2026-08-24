'use strict';

// Разделы документации, для которых генерируются схемы.
// Схема строится для любой страницы, где есть метод в заголовке и секция
// параметров; страницы-обзоры и индексы пропускаются автоматически.
const PILOT_DIRS = ['api-reference'];

// Методы, которые симулятор исполняет по-настоящему на тестовом датасете.
// Остальные проходят только валидацию параметров.
const READ_EXECUTABLE = [
    'crm.deal.list',
    'crm.deal.get',
    'crm.lead.list',
    'crm.lead.get',
    'crm.contact.list',
    'crm.contact.get',
    'crm.company.list',
    'crm.company.get',
    'crm.status.list',
    'crm.category.list',
    'tasks.task.list',
    'tasks.task.get',
    'user.get',
];

// Сущность датасета, на которой исполняется метод.
const METHOD_ENTITY = {
    'crm.deal.list': 'deals',
    'crm.deal.get': 'deals',
    'crm.lead.list': 'leads',
    'crm.lead.get': 'leads',
    'crm.contact.list': 'contacts',
    'crm.contact.get': 'contacts',
    'crm.company.list': 'companies',
    'crm.company.get': 'companies',
    'crm.status.list': 'statuses',
    'crm.category.list': 'categories',
    'tasks.task.list': 'tasks',
    'tasks.task.get': 'tasks',
    'user.get': 'users',
};

const PAGE_SIZE = 50;

module.exports = { PILOT_DIRS, READ_EXECUTABLE, METHOD_ENTITY, PAGE_SIZE };
