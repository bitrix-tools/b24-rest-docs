# Обзор CRM

Раздел содержит методы для работы с объектами CRM в Битрикс24. Он охватывает лиды, сделки, контакты, компании, смарт-процессы, воронки, стадии, таймлайн, документы, реквизиты и автоматизацию.

Например, можно создать смарт-процесс, настроить его структуру и затем работать с его элементами через универсальные методы CRM.

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Быстрый переход: [все разделы и методы](#all-methods)
>
> Пользовательская документация: [CRM в Битрикс24](https://helpdesk.bitrix24.ru/open/5435795/)

## Универсальные методы CRM

Универсальные методы CRM работают через `entityTypeId` и покрывают основные операции с объектами: создание, чтение, обновление и фильтрацию. Они подходят для лидов, сделок, контактов, компаний, предложений, счетов и смарт-процессов.

Элементы создают методом [crm.item.add](./universal/crm-item-add.md) и обновляют — [crm.item.update](./universal/crm-item-update.md). Один элемент по идентификатору возвращает [crm.item.get](./universal/crm-item-get.md), список — [crm.item.list](./universal/crm-item-list.md).

Если операция касается только одного типа объекта — например, связей сделок с контактами — используйте методы нужного раздела: [crm.deal.*](./deals/index.md), [crm.lead.*](./leads/index.md), [crm.contact.*](./contacts/index.md), [crm.company.*](./companies/index.md), [crm.quote.*](./quote/index.md).

## Что входит в карточку CRM

Карточка CRM объединяет данные объекта, этап работы с ним и историю взаимодействий.

**Поля.** В карточке хранятся данные объекта, состав которых зависит от его типа. Список доступных полей можно получить методом [crm.item.fields](./universal/crm-item-fields.md). Общие поля описаны в статье [Поля основных объектов CRM](./main-entities-fields.md), а пользовательские поля настраивают методами [userfieldconfig.add](./universal/userfieldconfig/userfieldconfig-add.md) или [userfieldconfig.update](./universal/userfieldconfig/userfieldconfig-update.md).

**Воронка и стадия.** Для сделок и смарт-процессов карточка показывает, в какой воронке находится объект и на каком этапе. Для работы с воронками нужен `categoryId` — его возвращает [crm.category.list](./universal/category/crm-category-list.md). Список стадий с их кодами `ENTITY_ID` возвращает [crm.status.list](./status/crm-status-list.md).

**Таймлайн.** В таймлайне хранится история работы с объектом CRM: дела и комментарии. Чтобы добавить запись в карточку объекта, обычно создают дело методом [crm.activity.add](./timeline/activities/activity-base/crm-activity-add.md) или комментарий методом [crm.timeline.comment.add](./timeline/comments/crm-timeline-comment-add.md).

**Документы.** Документы в CRM создают на основе шаблонов генератора документов. Шаблон и нумератор добавляют методами [crm.documentgenerator.template.add](./document-generator/templates/crm-document-generator-template-add.md) и [crm.documentgenerator.numerator.add](./document-generator/numerator/crm-document-generator-numerator-add.md). Документ создают и привязывают к CRM-объекту методом [crm.documentgenerator.document.add](./document-generator/documents/crm-document-generator-document-add.md).

**Автоматизация.** Карточка может участвовать в сценариях автоматизации, которые зависят от состояния объекта. Собственный триггер регистрируют методом [crm.automation.trigger.add](./automation/triggers/crm-automation-trigger-add.md), а затем запускают для нужного элемента методом [crm.automation.trigger.execute](./automation/triggers/crm-automation-trigger-execute.md). Оба метода работают только в контексте [приложения](../../settings/app-installation/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить пользовательское поле в смарт-процесс](../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md)
- [Как создать новую воронку со стадиями в смарт-процессе](../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)
- [Как добавить дело в карточку контакта](../../tutorials/crm/how-to-add-crm-objects/how-to-add-activity-to-contact.md)
- [Как добавить шаблон и создать документ на его основе](../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
- [Все туториалы CRM](../../tutorials/crm/index.md)

{% endnote %}

## Смарт-процессы

Смарт-процессы — это пользовательские типы объектов CRM для бизнес-сценариев, которые выходят за рамки стандартных лидов, сделок, контактов и компаний. С их помощью описывают согласование договоров, внутренние заявки или учет оборудования.

Для смарт-процесса, в отличие от стандартных объектов, сначала настраивают структуру. Тип создают методом [crm.type.add](./universal/user-defined-object-types/crm-type-add.md) — в ответе возвращается `entityTypeId` нового смарт-процесса. Список существующих типов и их `entityTypeId` возвращает [crm.type.list](./universal/user-defined-object-types/crm-type-list.md).

Пользовательские поля добавляют методом [userfieldconfig.add](./universal/userfieldconfig/userfieldconfig-add.md). При необходимости отдельно настраивают воронки методом [crm.category.add](./universal/category/crm-category-add.md) и стадии — [crm.status.add](./status/crm-status-add.md).

После настройки структуры работают с элементами через методы [crm.item.*](./universal/index.md) — так же, как и со стандартными объектами CRM.

{% note tip "Пользовательская документация" %}

[Смарт-процессы в Битрикс24](https://helpdesk.bitrix24.ru/open/18913880/)

{% endnote %}

## Виджеты

В карточки и списки объектов CRM можно встроить приложение. Благодаря встраиванию можно будет использовать приложение, не покидая карточку или список.

Есть два сценария встройки:

- использовать специальные [места встраивания](../widgets/crm/index.md), например вкладку, кнопку над таймлайном или пункт меню
- создать [пользовательское поле](../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в котором будет загружаться интерфейс приложения

### Места встраивания CRM

Вместо `XXX` подставьте код объекта: `LEAD`, `DEAL`, `CONTACT`, `COMPANY`, `QUOTE`, `SMART_INVOICE`. Для смарт-процессов укажите числовой идентификатор типа объекта, например `CRM_DYNAMIC_183_DETAIL_TAB`.

- [`CRM_XXX_DETAIL_TAB`](../widgets/crm/detail-tab.md) — вкладка в детальной карточке

- [`CRM_XXX_DETAIL_ACTIVITY`](../widgets/crm/detail-activity.md) — кнопка над таймлайном карточки

- [`CRM_XXX_DETAIL_TOOLBAR`](../widgets/crm/detail-toolbar.md) — пункт выпадающего меню верхней кнопки карточки

- [`CRM_XXX_DOCUMENTGENERATOR_BUTTON`](../widgets/crm/document-generator-button.md) — пункт выпадающего меню генератора документов

- [`CRM_XXX_ACTIVITY_TIMELINE_MENU`](../widgets/crm/activity-timeline-menu.md) — пункт контекстного меню дела в карточке

- [`CRM_XXX_LIST_MENU`](../widgets/crm/index.md) — пункт контекстного меню в списке элементов

- [`CRM_XXX_LIST_TOOLBAR`](../widgets/crm/list-toolbar.md) — пункт выпадающего меню над списком элементов

- [`CRM_XXX_ROBOT_DESIGNER_TOOLBAR`](../widgets/crm/robot-designer-toolbar.md) — пункт выпадающего меню верхней кнопки дизайнера роботов

- [`CRM_ANALYTICS_MENU`](../widgets/crm/analytics-menu.md) — пункт левого меню CRM-аналитики

- [`CRM_ANALYTICS_TOOLBAR`](../widgets/crm/analytics-toolbar.md) — пункт выпадающего меню верхней кнопки CRM-аналитики

- [`CRM_FUNNELS_TOOLBAR`](../widgets/crm/funnels-toolbar.md) — пункт выпадающего меню в туннелях продаж

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../widgets/index.md)
- [Встроить виджет в карточку CRM](../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Ключевые идентификаторы

#|
|| **Идентификатор** | **Что означает** | **Где используется** | **Каким методом получить** ||
|| `entityTypeId` | Тип объекта CRM | Универсальные методы, воронки, пользовательские поля | Для стандартных объектов — [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md), для смарт-процессов — [crm.type.list](./universal/user-defined-object-types/crm-type-list.md) ||
|| `id` | Идентификатор элемента CRM | Чтение, обновление, связи между объектами | Из списка элементов [crm.item.list](./universal/crm-item-list.md) или после создания элемента [crm.item.add](./universal/crm-item-add.md) ||
|| `categoryId` | Идентификатор воронки | Сделки и смарт-процессы — нужен при создании и фильтрации элементов | Из списка воронок [crm.category.list](./universal/category/crm-category-list.md) ||
|| `stageId` | Идентификатор стадии | Создание и фильтрация элементов сделок и смарт-процессов | Из списка стадий [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID` ||
|#

## Связь с другими объектами

**Пользователи.** Ответственный за объект CRM хранится в поле `assignedById`. Данные пользователя можно получить методами [user.get](../user/user-get.md) или [user.search](../user/user-search.md).

**Задачи.** Задачи связывают с CRM-объектами через поле `UF_CRM_TASK`. В это поле передают идентификатор элемента CRM. Связь записывают при создании задачи методом [tasks.task.add](../tasks/tasks-task-add.md), а читают — методом [tasks.task.get](../tasks/tasks-task-get.md).

**Каталог.** Товарные позиции в сделках и коммерческих предложениях берутся из торгового каталога. Управлять товарами можно методами [catalog.product.*](../catalog/product/index.md).

**Телефония.** Звонки создают дела в таймлайне CRM. Метод [telephony.externalcall.finish](../telephony/telephony-external-call-finish.md) завершает звонок и возвращает идентификатор созданного дела в параметре `CRM_ACTIVITY_ID`.

## Обзор разделов и методов {#all-methods}

> Scope: [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Справочные материалы

#|
|| **Статья** | **Описание** ||
|| [Типы данных и структура объектов в REST API CRM](./data-types.md) | Что такое `entityTypeId`, какие бывают идентификаторы и как устроены объекты CRM ||
|| [Поля основных объектов CRM](./main-entities-fields.md) | Поля ключевых CRM-объектов в одном месте ||
|| [Частые кейсы и туториалы](./tutorials.md) | Прикладные сценарии и примеры использования CRM ||
|#

### Объекты CRM

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Универсальные методы CRM](./universal/index.md) | Для работы с CRM-объектами и смарт-процессами через `entityTypeId` | [crm.item.add](./universal/crm-item-add.md), [crm.item.update](./universal/crm-item-update.md), [crm.item.list](./universal/crm-item-list.md)

[Все методы раздела](./universal/index.md) ||
|| [Сделки](./deals/index.md) | Для работы со сделками, их карточками и связями с контактами | [crm.deal.add](./deals/crm-deal-add.md), [crm.deal.update](./deals/crm-deal-update.md), [crm.deal.list](./deals/crm-deal-list.md)

[Все методы раздела](./deals/index.md) ||
|| [Лиды](./leads/index.md) | При работе с лидами, их карточками и связями с контактами | [crm.lead.add](./leads/crm-lead-add.md), [crm.lead.update](./leads/crm-lead-update.md), [crm.lead.list](./leads/crm-lead-list.md)

[Все методы раздела](./leads/index.md) ||
|| [Контакты](./contacts/index.md) | Для работы с контактами, их карточками и связями с компаниями | [crm.contact.add](./contacts/crm-contact-add.md), [crm.contact.update](./contacts/crm-contact-update.md), [crm.contact.list](./contacts/crm-contact-list.md)

[Все методы раздела](./contacts/index.md) ||
|| [Компании](./companies/index.md) | При работе с компаниями, их карточками и связями с контактами | [crm.company.add](./companies/crm-company-add.md), [crm.company.update](./companies/crm-company-update.md), [crm.company.list](./companies/crm-company-list.md)

[Все методы раздела](./companies/index.md) ||
|| [Коммерческие предложения](./quote/index.md) | Для работы с коммерческими предложениями и товарными позициями | [crm.quote.add](./quote/crm-quote-add.md), [crm.quote.update](./quote/crm-quote-update.md), [crm.quote.list](./quote/crm-quote-list.md)

[Все методы раздела](./quote/index.md) ||
|#

### Настройки и справочники

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Справочники](./status/index.md) | Для управления системными списками CRM: стадиями, источниками, типами | [crm.status.add](./status/crm-status-add.md), [crm.status.update](./status/crm-status-update.md), [crm.status.list](./status/crm-status-list.md)

[Все методы раздела](./status/index.md) ||
|| [Валюты](./currency/index.md) | При управлении валютами CRM, базовой валютой и локализацией | [crm.currency.add](./currency/crm-currency-add.md), [crm.currency.update](./currency/crm-currency-update.md), [crm.currency.list](./currency/crm-currency-list.md)

[Все методы раздела](./currency/index.md) ||
|| [Реквизиты](./requisites/index.md) | Для работы с реквизитами, адресами и банковскими данными CRM | [crm.requisite.add](./requisites/universal/crm-requisite-add.md), [crm.requisite.update](./requisites/universal/crm-requisite-update.md), [crm.requisite.list](./requisites/universal/crm-requisite-list.md)

[Все методы раздела](./requisites/index.md) ||
|#

### Дела и документы

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Таймлайн и дела](./timeline/index.md) | Для работы с делами, комментариями, звонками и другими записями таймлайна | [crm.activity.add](./timeline/activities/activity-base/crm-activity-add.md), [crm.activity.list](./timeline/activities/activity-base/crm-activity-list.md)

[Все методы раздела](./timeline/index.md) ||
|| [Список обзвона](./call-list/index.md) | При создании списков обзвона и управлении их статусами | [crm.calllist.add](./call-list/crm-calllist-add.md), [crm.calllist.list](./call-list/crm-calllist-list.md)

[Все методы раздела](./call-list/index.md) ||
|| [Генератор документов](./document-generator/index.md) | Для формирования документов по шаблонам и управления шаблонами и нумераторами | [crm.documentgenerator.document.add](./document-generator/documents/crm-document-generator-document-add.md), [crm.documentgenerator.template.list](./document-generator/templates/crm-document-generator-template-list.md)

[Все методы раздела](./document-generator/index.md) ||
|#

### Автоматизация и аналитика

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Автоматизация CRM](./automation/index.md) | Для регистрации webhook-триггеров и триггеров приложений | [crm.automation.trigger.add](./automation/triggers/crm-automation-trigger-add.md), [crm.automation.trigger.execute](./automation/triggers/crm-automation-trigger-execute.md)

[Все методы раздела](./automation/index.md) ||
|| [Сквозная аналитика](./tracking/index.md) | При привязке трейсов к объектам CRM и регистрации источников аналитики | [crm.tracking.trace.add](./tracking/crm-tracking-trace-add.md), [crm.tracking.trace.delete](./tracking/crm-tracking-trace-delete.md)

[Все методы раздела](./tracking/index.md) ||
|#

### Дополнительные инструменты

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Поиск и обработка дубликатов](./duplicates/index.md) | Для поиска и объединения дублирующихся записей CRM | [crm.duplicate.findbycomm](./duplicates/crm-duplicate-find-by-comm.md)

[Все методы раздела](./duplicates/index.md) ||
|| [Цифровые рабочие места](./automated-solution/index.md) | При создании и настройке цифровых рабочих мест для смарт-процессов | [crm.automatedsolution.add](./automated-solution/crm-automated-solution-add.md), [crm.automatedsolution.list](./automated-solution/crm-automated-solution-list.md)

[Все методы раздела](./automated-solution/index.md) ||
|| [Вспомогательные объекты](./auxiliary/index.md) | Для работы с перечислениями, множественными полями и другими служебными объектами CRM | [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md)

[Все методы раздела](./auxiliary/index.md) ||
|| [Устаревшие методы CRM](./outdated/index.md) | При поддержке существующих интеграций на старых ветках методов | [Все методы раздела](./outdated/index.md) ||
|#

### Отдельные методы

#|
|| **Метод** | **Описание** ||
|| [crm.settings.mode.get](./crm-settings-mode-get.md) | Возвращает текущий режим работы CRM ||
|| [crm.stagehistory.list](./crm-stage-history-list.md) | Возвращает историю движения объекта по стадиям ||
|#
