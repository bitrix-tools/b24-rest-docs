# CRM: обзор разделов и методов

Методы CRM управляют клиентской базой Битрикс24: лидами, сделками, контактами, компаниями, коммерческими предложениями, счетами и смарт-процессами. Они создают и обновляют элементы, ведут их по воронкам и стадиям, записывают историю работы в таймлайн, формируют документы и запускают автоматизацию.

Например, можно создать смарт-процесс, настроить его структуру и затем работать с его элементами через универсальные методы CRM.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все разделы и методы](#all-methods)
>
> Пользовательская документация: [CRM в Битрикс24](https://helpdesk.bitrix24.ru/open/5435795/)

## Как начать работу

1. Определите тип объекта. Числовые идентификаторы `entityTypeId` всех типов, включая смарт-процессы, возвращает [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md). Настройки самих смарт-процессов — включены ли воронки, стадии, автоматизация и другие возможности типа — возвращает [crm.type.list](./universal/user-defined-object-types/crm-type-list.md)
2. Получите состав полей объекта методом [crm.item.fields](./universal/crm-item-fields.md). Для сделок и смарт-процессов заранее подберите воронку `categoryId` — [crm.category.list](./universal/category/crm-category-list.md) — и стадию `stageId` — [crm.status.list](./status/crm-status-list.md)
3. Создайте элемент методом [crm.item.add](./universal/crm-item-add.md) и обновляйте его методом [crm.item.update](./universal/crm-item-update.md)
4. Читайте данные: один элемент по идентификатору возвращает [crm.item.get](./universal/crm-item-get.md), выборку — [crm.item.list](./universal/crm-item-list.md). Списочные методы CRM отдают до 50 элементов за запрос, следующую страницу выбирают параметром `start` — подробности в статье [Особенности работы списочных методов](../../settings/how-to-call-rest-api/list-methods-pecularities.md)

На изменения объектов можно подписаться событиями: они описаны в разделах самих объектов, например [события сделок](./deals/events/index.md) и [события элементов смарт-процессов](./universal/events/index.md).

CRM работает в классическом режиме с лидами или в простом режиме без лидов. Текущий режим возвращает [crm.settings.mode.get](./crm-settings-mode-get.md). В простом режиме сделку создают сразу, без предварительного лида.

## Универсальные методы или методы объекта

Универсальные методы [crm.item.*](./universal/index.md) работают через `entityTypeId` и покрывают основные операции: создание, чтение, обновление и фильтрацию. Они подходят для лидов, сделок, контактов, компаний, предложений и счетов, а для смарт-процессов это единственный способ работать с элементами. Актуальный тип счета — `SMART_INVOICE` с `entityTypeId = 31`.

Если операция касается только одного типа объекта — например, связей сделок с контактами — используйте методы нужного раздела: [crm.deal.*](./deals/index.md), [crm.lead.*](./leads/index.md), [crm.contact.*](./contacts/index.md), [crm.company.*](./companies/index.md), [crm.quote.*](./quote/index.md).

Внутри раздела универсальных методов есть подтемы: [воронки](./universal/category/index.md), [разделы детальной карточки](./universal/item-details-configuration/index.md), [товарные позиции](./universal/product-rows/index.md), [счета](./universal/invoice.md), [оплаты](./universal/payment/index.md) и [доставки](./universal/delivery/index.md), [привязка заказов](./universal/order-entity/index.md), [пользовательские поля](./universal/user-defined-fields/index.md) и [их настройки](./universal/userfieldconfig/index.md), [типы смарт-процессов](./universal/user-defined-object-types/index.md), [импорт данных](./universal/import/index.md) и [события](./universal/events/index.md).

Старые ветки методов CRM не развиваются. Счета заменяют [универсальные методы для счетов](./universal/invoice.md), а их стадиями управляет справочник `SMART_INVOICE_STAGE_xx` в методах [crm.status.*](./status/index.md). Товарные позиции заменяют [crm.item.productrow.*](./universal/product-rows/index.md), направления сделок — [crm.category.*](./universal/category/index.md), а товары, каталоги, разделы каталога и единицы измерения — методы [торгового каталога](../catalog/index.md).

Имена полей в двух ветках методов различаются: универсальные методы используют `camelCase`, методы объекта — `UPPER_CASE`. Стадия сделки приходит в поле `stageId` в [crm.item.get](./universal/crm-item-get.md) и в поле `STAGE_ID` в [crm.deal.get](./deals/crm-deal-get.md). Правила преобразования имен описаны в разделе [Универсальные методы CRM](./universal/index.md).

## Что входит в карточку CRM

Карточка CRM объединяет данные объекта, этап работы с ним и историю взаимодействий.

**Поля.** В карточке хранятся данные объекта, состав которых зависит от его типа. Список доступных полей можно получить методом [crm.item.fields](./universal/crm-item-fields.md). Общие поля описаны в статье [Поля основных объектов CRM](./main-entities-fields.md). Пользовательские поля настраивают методами [userfieldconfig.add](./universal/userfieldconfig/userfieldconfig-add.md) или [userfieldconfig.update](./universal/userfieldconfig/userfieldconfig-update.md) — им нужны scope `userfieldconfig` и scope модуля из `moduleId`, для CRM это `crm`, а также право «Разрешить изменять настройки».

**Воронка и стадия.** Для сделок и смарт-процессов карточка показывает, в какой воронке находится объект и на каком этапе. Для работы с воронками нужен `categoryId` — его возвращает [crm.category.list](./universal/category/crm-category-list.md). Стадии возвращает [crm.status.list](./status/crm-status-list.md) с фильтром по справочнику `ENTITY_ID`: `DEAL_STAGE` — стадии основной воронки сделок, `DEAL_STAGE_1` — стадии воронки с `categoryId = 1`. Код стадии приходит в поле `STATUS_ID`: у основной воронки это `NEW` или `PREPARATION`, у дополнительной — с префиксом воронки, например `C1:NEW`. Этот код передают в поле `stageId` универсальных методов или `STAGE_ID` методов объекта.

**Таймлайн.** В таймлайне хранится история работы с объектом CRM: дела и комментарии. Чтобы добавить запись в карточку объекта, обычно создают универсальное дело методом [crm.activity.todo.add](./timeline/activities/todo/crm-activity-todo-add.md) или комментарий методом [crm.timeline.comment.add](./timeline/comments/crm-timeline-comment-add.md).

**Документы.** Документы формируют по шаблонам генератора документов: шаблон добавляют методом [crm.documentgenerator.template.add](./document-generator/templates/crm-document-generator-template-add.md), а сам документ создают и привязывают к объекту CRM методом [crm.documentgenerator.document.add](./document-generator/documents/crm-document-generator-document-add.md).

**Автоматизация.** Карточка участвует в сценариях автоматизации, которые зависят от состояния объекта. Собственный триггер приложение регистрирует методом [crm.automation.trigger.add](./automation/triggers/crm-automation-trigger-add.md) и запускает методом [crm.automation.trigger.execute](./automation/triggers/crm-automation-trigger-execute.md) — оба метода работают только в контексте [приложения](../../settings/app-installation/index.md).

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

Приложение можно встроить в карточку или список объектов CRM — своей вкладкой, пунктом меню карточки, списка или аналитики, кнопкой над таймлайном или в воронках продаж. Все точки, поддержанные типы объектов и параметры, которые приходят обработчику, собраны в разделе [Места встраивания CRM](../widgets/crm/index.md), общий механизм — в статье [Механизм встраивания виджетов](../widgets/index.md).

Код точки собирают по шаблону вида `CRM_XXX_DETAIL_TAB`: вместо `XXX` подставьте `LEAD`, `DEAL`, `CONTACT`, `COMPANY`, `QUOTE`, `SMART_INVOICE`, `ORDER` или `ACTIVITY`, а для смарт-процессов — `DYNAMIC_` и числовой идентификатор типа, например `CRM_DYNAMIC_183_DETAIL_TAB`.

Второй способ встройки — [пользовательское поле](../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в котором загружается интерфейс приложения. Готовый пример разобран в туториале [Встроить виджет в карточку CRM](../../tutorials/crm/crm-widgets/widget-as-detail-tab.md).

## Ключевые идентификаторы

#|
|| **Идентификатор** | **Что означает** | **Где используется** | **Каким методом получить** ||
|| `entityTypeId` | Тип объекта CRM | Универсальные методы, воронки, пользовательские поля | Все типы, включая смарт-процессы, — [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md); настройки смарт-процесса — [crm.type.list](./universal/user-defined-object-types/crm-type-list.md) ||
|| `id` | Идентификатор элемента CRM | Чтение, обновление, связи между объектами | Из списка элементов [crm.item.list](./universal/crm-item-list.md) или после создания элемента [crm.item.add](./universal/crm-item-add.md) ||
|| `categoryId` | Идентификатор воронки | Сделки и смарт-процессы — нужен при создании и фильтрации элементов | Из списка воронок [crm.category.list](./universal/category/crm-category-list.md) ||
|| `stageId` | Идентификатор стадии | Создание и фильтрация элементов сделок и смарт-процессов | Из списка стадий [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID` ||
|#

## Связь с другими объектами

Объекты CRM связаны с пользователями Битрикс24, задачами, торговым каталогом и телефонией.

**Пользователи.** Ответственный за объект CRM хранится в поле `assignedById` в универсальных методах и `ASSIGNED_BY_ID` в методах объекта. Данные пользователя можно получить методами [user.get](../user/user-get.md) или [user.search](../user/user-search.md).

**Задачи.** Задачи связывают с объектами CRM через множественное поле `UF_CRM_TASK`. В нем передают массив идентификаторов с префиксом типа объекта, например `["D_10", "C_7"]`. Префиксы перечислены в статье [Типы данных и структура объектов](./data-types.md#object_type). Связь записывают при создании задачи методом [tasks.task.add](../tasks/tasks-task-add.md), а читают — методом [tasks.task.get](../tasks/tasks-task-get.md). Чтобы поле принимало элементы смарт-процесса, у типа объекта включают привязку к задачам параметром `linkedUserFields` в методе [crm.type.update](./universal/user-defined-object-types/crm-type-update.md).

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
|| [Поля основных объектов CRM](./main-entities-fields.md) | Поля ключевых объектов CRM в одном месте ||
|| [Частые кейсы и туториалы](./tutorials.md) | Прикладные сценарии и примеры использования CRM ||
|#

### Объекты CRM

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
|| [Вспомогательные объекты](./auxiliary/index.md) | Для работы с перечислениями, множественными полями и другими служебными объектами CRM | [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md)

[Все методы раздела](./auxiliary/index.md) ||
|#

### Отдельные методы

#|
|| **Метод** | **Описание** ||
|| [crm.settings.mode.get](./crm-settings-mode-get.md) | Возвращает текущий режим работы CRM ||
|| [crm.stagehistory.list](./crm-stage-history-list.md) | Возвращает историю движения объекта по стадиям ||
|#
