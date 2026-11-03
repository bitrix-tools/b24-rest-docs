# CRM: обзор разделов и методов

Методы CRM управляют клиентской базой Битрикс24: лидами, сделками, контактами, компаниями, коммерческими предложениями, счетами и смарт-процессами. Они создают и обновляют элементы, ведут их по воронкам и стадиям, записывают историю работы в таймлайн, формируют документы и запускают автоматизацию.

Методы CRM есть в двух версиях API. Для новой разработки предназначены [методы CRM в REST 3.0](./rest-v3/index.md), для существующих интеграций сохранены методы предыдущей версии.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все разделы и методы](#all-methods)
>
> Пользовательская документация: [CRM в Битрикс24](https://helpdesk.bitrix24.ru/open/5435795/)

## Какую версию API выбрать {#choose}

[CRM в REST 3.0](./rest-v3/index.md) — основной раздел для новой разработки. Методы вызываются по адресу `/rest/api/`, их имена совпадают с предыдущей версией: `crm.deal.add` создает сделку в обеих версиях, а версию задает адрес вызова.

Методы предыдущей версии вызываются по адресу `/rest/`. Универсальные методы [crm.item.*](./universal/index.md) и методы объектов `crm.deal.*`, `crm.lead.*`, `crm.contact.*` и другие оставлены для поддержки существующих интеграций. Часть разделов пока есть только в предыдущей версии. Методы обеих версий можно вызывать из одной интеграции.

#|
|| **Если вам нужно** | **Открывайте раздел** ||
|| Работать с элементами CRM и смарт-процессов, их полями, воронками и стадиями, товарами, реквизитами, адресами, делами и видами карточки | [CRM в REST 3.0](./rest-v3/index.md) ||
|| Принимать заявки с сайта и создавать по ним объекты CRM | [CRM-формы](./form/index.md) ||
|| Создать или настроить тип смарт-процесса | [Типы смарт-процессов](./universal/user-defined-object-types/index.md), только в предыдущей версии ||
|| Добавить дело или комментарий в таймлайн | [Таймлайн и дела](./timeline/index.md), только в предыдущей версии ||
|| Сформировать документ по шаблону | [Генератор документов](./document-generator/index.md), только в предыдущей версии ||
|| Запустить автоматизацию или триггер | [Автоматизация CRM](./automation/index.md), только в предыдущей версии ||
|| Поддерживать существующую интеграцию на методах по адресу `/rest/` | [Универсальные методы CRM](./universal/index.md) и разделы объектов в [обзоре разделов и методов](#all-methods) ||
|#

Валюты, списки обзвона, поиск дубликатов, сквозная аналитика и цифровые рабочие места тоже пока есть только в предыдущей версии.

## Как начать работу

1. Определите тип объекта и имя метода. В REST 3.0 тип входит в имя: `crm.deal.add`, `crm.smartprocess1038.add`. Сегменты всех типов перечислены в обзоре [CRM в REST 3.0](./rest-v3/index.md#method-name)
2. Узнайте поля типа на его странице полей, например [Поля сделки](./rest-v3/items/fields-deal.md), или методом [crm.<тип>.field.list](./rest-v3/fields/crm-entity-field-list-rest-v3.md)
3. Создайте элемент методом [crm.<тип>.add](./rest-v3/items/crm-entity-add-rest-v3.md)
4. Получите элементы методом [crm.<тип>.list](./rest-v3/items/crm-entity-list-rest-v3.md). Без параметра `select` метод возвращает только `id`, поэтому перечислите нужные поля в `select`

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить пользовательское поле в смарт-процесс](../../tutorials/field-types/how-to-add-user-field-to-spa.md)
- [Как создать новую воронку со стадиями в смарт-процессе](../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)
- [Как добавить дело в карточку контакта](../../tutorials/crm/how-to-add-crm-objects/how-to-add-activity-to-contact.md)
- [Как добавить шаблон и создать документ на его основе](../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
- [Все туториалы CRM](../../tutorials/crm/index.md)

{% endnote %}

## Виджеты

Приложение можно встроить в карточку или список объектов CRM — своей вкладкой, пунктом меню карточки, списка или аналитики, кнопкой над таймлайном или в воронках продаж. Все точки и параметры, которые приходят обработчику, собраны в разделе [Места встраивания CRM](../widgets/crm/index.md).

## Связь с другими объектами

Объекты CRM связаны с пользователями Битрикс24, задачами, торговым каталогом, телефонией и CRM-формами.

**Пользователи.** Ответственный за объект CRM хранится в поле `assignedById` в REST 3.0 и универсальных методах и в поле `ASSIGNED_BY_ID` в методах объекта. Данные пользователя можно получить методами [user.get](../user/user-get.md) или [user.search](../user/user-search.md).

**Задачи.** Задачи связывают с объектами CRM через множественное поле `UF_CRM_TASK`. В нем передают массив идентификаторов с префиксом типа объекта, например `["D_10", "C_7"]`. Префиксы перечислены в статье [Типы данных и структура объектов](./data-types.md#object_type). Связь записывают при создании задачи методом [tasks.task.add](../tasks/tasks-task-add.md), а читают — методом [tasks.task.get](../tasks/tasks-task-get.md). Чтобы поле принимало элементы смарт-процесса, у типа объекта включают привязку к задачам параметром `linkedUserFields` в методе [crm.type.update](./universal/user-defined-object-types/crm-type-update.md).

**Каталог.** Товарные позиции в сделках и коммерческих предложениях берутся из торгового каталога. Управлять товарами можно методами [catalog.product.*](../catalog/product/index.md).

**Телефония.** Звонки создают дела в таймлайне CRM. Метод [telephony.externalcall.finish](../telephony/telephony-external-call-finish.md) завершает звонок и возвращает идентификатор созданного дела в параметре `CRM_ACTIVITY_ID`.

**CRM-формы.** Заполнение CRM-формы создает объекты CRM по схеме из поля `crm.entityScheme`: лид, сделку с контактом или компанией, предложение или элемент смарт-процесса. Идентификаторы схем, воронки сделок и смарт-процессов возвращает [crm.form.configuration.get](./form/setup/crm-form-configuration-get.md), коды полей объектов для формы — [crm.form.entityfield.list](./form/setup/crm-form-entityfield-list.md). Создают и настраивают формы методами [crm.form.*](./form/index.md). Это методы REST 3.0: они вызываются по адресу с `/rest/api/`, подробнее — в [обзоре REST 3.0](../rest-v3.md).

## Обзор разделов и методов {#all-methods}

> Scope: [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Справочные материалы

#|
|| **Статья** | **Описание** ||
|| [Типы данных и структура объектов в REST API CRM](./data-types.md) | Что такое `entityTypeId`, какие бывают идентификаторы и как устроены объекты CRM ||
|| [Поля основных объектов CRM](./main-entities-fields.md) | Поля ключевых объектов CRM в одном месте ||
|| [Ограничения длины полей CRM](./field-length-limits.md) | Максимальная длина стандартных полей CRM и способ получить лимиты пользовательских полей ||
|| [Частые кейсы и туториалы](./tutorials.md) | Прикладные сценарии и примеры использования CRM ||
|#

### CRM в REST 3.0

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [CRM в REST 3.0](./rest-v3/index.md) | Для новой разработки: элементы всех типов объектов, их поля, воронки и стадии, товарные позиции, реквизиты, адреса, дела, виды карточки и справочники | [crm.<тип>.add](./rest-v3/items/crm-entity-add-rest-v3.md), [crm.<тип>.update](./rest-v3/items/crm-entity-update-rest-v3.md), [crm.<тип>.list](./rest-v3/items/crm-entity-list-rest-v3.md)

[Все разделы и методы](./rest-v3/index.md#all-methods) ||
|#

### Объекты CRM в предыдущей версии API

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Универсальные методы CRM](./universal/index.md) | Для работы с объектами CRM и смарт-процессами через `entityTypeId` | [crm.item.add](./universal/crm-item-add.md), [crm.item.update](./universal/crm-item-update.md), [crm.item.list](./universal/crm-item-list.md)

[Все методы раздела](./universal/index.md) ||
|| [Сделки](./deals/index.md) | Для работы со сделками, их карточками и связями с контактами | [crm.deal.add](./deals/crm-deal-add.md), [crm.deal.update](./deals/crm-deal-update.md), [crm.deal.list](./deals/crm-deal-list.md)

[Все методы раздела](./deals/index.md) ||
|| [Лиды](./leads/index.md) | Для работы с лидами, их карточками и связями с контактами | [crm.lead.add](./leads/crm-lead-add.md), [crm.lead.update](./leads/crm-lead-update.md), [crm.lead.list](./leads/crm-lead-list.md)

[Все методы раздела](./leads/index.md) ||
|| [Контакты](./contacts/index.md) | Для работы с контактами, их карточками и связями с компаниями | [crm.contact.add](./contacts/crm-contact-add.md), [crm.contact.update](./contacts/crm-contact-update.md), [crm.contact.list](./contacts/crm-contact-list.md)

[Все методы раздела](./contacts/index.md) ||
|| [Компании](./companies/index.md) | Для работы с компаниями, их карточками и связями с контактами | [crm.company.add](./companies/crm-company-add.md), [crm.company.update](./companies/crm-company-update.md), [crm.company.list](./companies/crm-company-list.md)

[Все методы раздела](./companies/index.md) ||
|| [Коммерческие предложения](./quote/index.md) | Для работы с коммерческими предложениями и товарными позициями | [crm.quote.add](./quote/crm-quote-add.md), [crm.quote.update](./quote/crm-quote-update.md), [crm.quote.list](./quote/crm-quote-list.md)

[Все методы раздела](./quote/index.md) ||
|#

### Настройки и справочники

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Справочники](./status/index.md) | Для управления системными списками CRM: стадиями, источниками, типами | [crm.status.add](./status/crm-status-add.md), [crm.status.update](./status/crm-status-update.md), [crm.status.list](./status/crm-status-list.md)

[Все методы раздела](./status/index.md) ||
|| [Валюты](./currency/index.md) | Для управления валютами CRM, базовой валютой и локализацией | [crm.currency.add](./currency/crm-currency-add.md), [crm.currency.update](./currency/crm-currency-update.md), [crm.currency.list](./currency/crm-currency-list.md)

[Все методы раздела](./currency/index.md) ||
|| [Реквизиты](./requisites/index.md) | Для работы с реквизитами, адресами и банковскими данными CRM | [crm.requisite.add](./requisites/universal/crm-requisite-add.md), [crm.requisite.update](./requisites/universal/crm-requisite-update.md), [crm.requisite.list](./requisites/universal/crm-requisite-list.md)

[Все методы раздела](./requisites/index.md) ||
|#

### Дела и документы

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Таймлайн и дела](./timeline/index.md) | Для работы с делами, комментариями, звонками и другими записями таймлайна | [crm.activity.todo.add](./timeline/activities/todo/crm-activity-todo-add.md), [crm.timeline.comment.add](./timeline/comments/crm-timeline-comment-add.md)

[Все методы раздела](./timeline/index.md) ||
|| [Список обзвона](./call-list/index.md) | Для создания списков обзвона и управления их статусами | [crm.calllist.add](./call-list/crm-calllist-add.md), [crm.calllist.list](./call-list/crm-calllist-list.md)

[Все методы раздела](./call-list/index.md) ||
|| [Генератор документов](./document-generator/index.md) | Для формирования документов по шаблонам и управления шаблонами и нумераторами | [crm.documentgenerator.document.add](./document-generator/documents/crm-document-generator-document-add.md), [crm.documentgenerator.template.list](./document-generator/templates/crm-document-generator-template-list.md)

[Все методы раздела](./document-generator/index.md) ||
|#

### Автоматизация и аналитика

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Автоматизация CRM](./automation/index.md) | Для запуска настроенных webhook-триггеров и регистрации триггеров приложения | [crm.automation.trigger](./automation/crm-automation-trigger.md), [crm.automation.trigger.add](./automation/triggers/crm-automation-trigger-add.md), [crm.automation.trigger.execute](./automation/triggers/crm-automation-trigger-execute.md)

[Все методы раздела](./automation/index.md) ||
|| [Сквозная аналитика](./tracking/index.md) | Для создания трейсов и привязки объектов CRM к источникам обращения | [crm.tracking.trace.add](./tracking/crm-tracking-trace-add.md), [crm.tracking.trace.delete](./tracking/crm-tracking-trace-delete.md)

[Все методы раздела](./tracking/index.md) ||
|#

### Дополнительные инструменты

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Поиск и обработка дубликатов](./duplicates/index.md) | Для поиска и объединения дублирующихся записей CRM | [crm.duplicate.findbycomm](./duplicates/crm-duplicate-find-by-comm.md), [crm.entity.mergeBatch](./duplicates/crm-entity-merge-batch.md)

[Все методы раздела](./duplicates/index.md) ||
|| [Цифровые рабочие места](./automated-solution/index.md) | Для создания и настройки цифровых рабочих мест смарт-процессов | [crm.automatedsolution.add](./automated-solution/crm-automated-solution-add.md), [crm.automatedsolution.list](./automated-solution/crm-automated-solution-list.md)

[Все методы раздела](./automated-solution/index.md) ||
|| [CRM-формы](./form/index.md) | Для создания форм, которые собирают заявки на сайте и создают объекты CRM, и для получения кода размещения формы | [crm.form.list](./form/crm-form-list.md), [crm.form.add](./form/crm-form-add.md), [crm.form.embedding.get](./form/placement/crm-form-embedding-get.md)

[Все методы раздела](./form/index.md) ||
|| [Вспомогательные объекты](./auxiliary/index.md) | Для работы с перечислениями, множественными полями и другими служебными объектами CRM | [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md)

[Все методы раздела](./auxiliary/index.md) ||
|#

### Отдельные методы

#|
|| **Метод** | **Описание** ||
|| [crm.settings.mode.get](./crm-settings-mode-get.md) | Возвращает текущий режим работы CRM ||
|| [crm.stagehistory.list](./crm-stage-history-list.md) | Возвращает историю движения объекта по стадиям ||
|#
