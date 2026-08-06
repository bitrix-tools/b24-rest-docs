# Виджеты в CRM: обзор точек встраивания

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Точки встраивания добавляют интерфейс приложения внутрь CRM: свою вкладку в карточке объекта, пункт в контекстном меню списка, кнопку над таймлайном, пункт в дизайнере роботов или отчет в CRM-аналитике.

Точки делятся на две группы. Первая работает с конкретным типом объекта, и код встройки содержит имя этого типа: `CRM_DEAL_DETAIL_TAB`, `CRM_LEAD_LIST_MENU`. Вторая относится к разделу CRM целиком, и имени объекта в коде нет: `CRM_ANALYTICS_MENU`, `CRM_FUNNELS_TOOLBAR`.

Для регистрации виджета используйте метод [placement.bind](../placement-bind.md) и передавайте нужный код в параметре `PLACEMENT`.

> Быстрый переход: [все точки встраивания](#all-placements)

## Как выбрать точку встраивания

Выбирайте точку по задаче, которую решает приложение:

- добавить действие к элементу в списке — [CRM_XXX_LIST_MENU](./list-menu.md)
- добавить действие ко всему списку, а не к отдельному элементу — [CRM_XXX_LIST_TOOLBAR](./list-toolbar.md)
- добавить в карточку отдельный экран с данными приложения — [CRM_XXX_DETAIL_TAB](./detail-tab.md)
- добавить кнопку рядом с делами и комментариями карточки — [CRM_XXX_DETAIL_ACTIVITY](./detail-activity.md), а построить ее интерфейс средствами Битрикс24 — [дополнительные возможности встройки](./detail-activity-area.md)
- добавить действие над карточкой целиком, рядом с задачами и документами — [CRM_XXX_DETAIL_TOOLBAR](./detail-toolbar.md)
- добавить действие к отдельной записи дела в таймлайне — [CRM_XXX_ACTIVITY_TIMELINE_MENU](./activity-timeline-menu.md)
- сформировать документ по объекту — [CRM_XXX_DOCUMENTGENERATOR_BUTTON](./document-generator-button.md)
- расширить автоматизацию — [CRM_XXX_ROBOT_DESIGNER_TOOLBAR](./robot-designer-toolbar.md)
- дополнить воронки и туннели — [CRM_FUNNELS_TOOLBAR](./funnels-toolbar.md)
- показать свой отчет — [CRM_ANALYTICS_MENU](./analytics-menu.md), а добавить действие над разделом аналитики — [CRM_ANALYTICS_TOOLBAR](./analytics-toolbar.md)
- показать отчет рядом с готовыми отчетами BI-аналитики — [BI_ANALYTICS_MENU](./bi-analytics-menu.md)
- искать клиента во внешнем источнике и подставлять его в карточку — [CRM_DETAIL_SEARCH](./detail-search.md)
- подставлять данные организации из внешнего источника — [автозаполнение реквизитов](./requisites-autocomplete/index.md)

## Как начать работу

1. Выберите точку встраивания под сценарий и соберите код встройки: подставьте имя типа объекта, если код его содержит. Для пользовательских типов объектов вместо имени подставляется числовой идентификатор типа — `CRM_DYNAMIC_183_DETAIL_TAB`.
2. Зарегистрируйте обработчик методом [placement.bind](../placement-bind.md) и передайте код в параметре `PLACEMENT`. Метод доступен только администратору и требует контекст приложения: вебхуком точку не привязать.
3. Завершите установку приложения. До этого встройка в интерфейсе не отображается.
4. Откройте место в интерфейсе и вызовите виджет. Где именно находится пункт, описано на странице каждой точки в разделе «Где находится в интерфейсе».
5. Разберите в обработчике `PLACEMENT_OPTIONS` — в нем приходит контекст вызова: идентификатор объекта, дела или адрес страницы, с которой открыт виджет.

## Что получает обработчик

Точки раздела передают обработчику один и тот же набор стандартных параметров. Исключение — [BI_ANALYTICS_MENU](./bi-analytics-menu.md): эта точка открывает адрес обработчика обычным GET-запросом и не передает ему ничего.

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Универсальный ключ `URI` приходит у всех точек, состав остальных ключей у каждой точки свой.

#|
|| **Точка встраивания** | **Собственные ключи** | **Что передается** ||
|| [CRM_XXX_LIST_MENU](./list-menu.md) | `ID` | Идентификатор элемента, из меню которого открыт виджет ||
|| [CRM_XXX_LIST_TOOLBAR](./list-toolbar.md) | нет | Виджет открывается над списком, а не над элементом ||
|| [CRM_XXX_DETAIL_TAB](./detail-tab.md) | `ID` | Идентификатор объекта, в карточке которого открыт виджет ||
|| [CRM_XXX_DETAIL_ACTIVITY](./detail-activity.md) | `ID` | Идентификатор объекта, в таймлайне которого открыт виджет ||
|| [CRM_XXX_DETAIL_TOOLBAR](./detail-toolbar.md) | `ID` или `ENTITY_ID` | Идентификатор объекта. Имя ключа зависит от типа объекта ||
|| [CRM_XXX_ACTIVITY_TIMELINE_MENU](./activity-timeline-menu.md) | `ENTITY_ID`, `ASSOCIATED_ENTITY_ID`, `ASSOCIATED_ENTITY_TYPE_ID` | Идентификаторы объекта и дела, на записи которого открыт виджет ||
|| [CRM_XXX_DOCUMENTGENERATOR_BUTTON](./document-generator-button.md) | `ENTITY_ID` | Идентификатор объекта, для которого формируется документ ||
|| [CRM_XXX_ROBOT_DESIGNER_TOOLBAR](./robot-designer-toolbar.md) | нет | Идентификатор воронки можно получить из пути в `URI` ||
|| [CRM_FUNNELS_TOOLBAR](./funnels-toolbar.md) | нет | Виджет открывается над списком воронок ||
|| [CRM_ANALYTICS_MENU](./analytics-menu.md) | нет | Виджет открывается в разделе аналитики ||
|| [CRM_ANALYTICS_TOOLBAR](./analytics-toolbar.md) | нет | Виджет открывается в разделе аналитики ||
|| [CRM_DETAIL_SEARCH](./detail-search.md) | `entityTypeName`, `searchQuery` | Тип клиента и поисковый запрос из карточки ||
|| [BI_ANALYTICS_MENU](./bi-analytics-menu.md) | — | `PLACEMENT_OPTIONS` не передается: обработчик открывается GET-запросом ||
|#

## Связь с другими объектами

**Объект CRM.** Идентификатор из `PLACEMENT_OPTIONS` указывает, для какого элемента вызван обработчик. Получить данные объекта можно методом [crm.item.get](../../crm/universal/crm-item-get.md), передав `entityTypeId` нужного [типа объекта](../../crm/data-types.md#object_type), или методом своего раздела: [crm.deal.get](../../crm/deals/crm-deal-get.md), [crm.lead.get](../../crm/leads/crm-lead-get.md), [crm.contact.get](../../crm/contacts/crm-contact-get.md), [crm.company.get](../../crm/companies/crm-company-get.md), [crm.quote.get](../../crm/quote/crm-quote-get.md).

**Дело.** Ключ `ASSOCIATED_ENTITY_ID` указывает, на записи какого дела открыт виджет. Данные дела возвращает метод [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md).

**Пользовательский тип объектов.** Идентификатор типа отдельным ключом не приходит. Его можно взять из значения параметра `PLACEMENT`: у кода `CRM_DYNAMIC_183_DETAIL_TAB` идентификатор типа равен `183`.

**Страница вызова.** Универсальный ключ `URI` содержит путь той страницы Битрикс24, с которой открыт виджет. По нему обработчик восстанавливает сценарий, если собственных ключей у точки нет.

## Типовые ошибки

#|
|| **Ошибка** | **Как решить** ||
|| `placement.bind` возвращает `Application context required` | Регистрируйте точку от имени приложения. Вебхуком встройку не привязать ||
|| Встройка зарегистрирована, но в интерфейсе не появляется | Завершите [установку приложения](../../../settings/app-installation/installation-finish.md) и перезагрузите страницу ||
|| Пункт не удается найти в карточке или в списке | Часть точек выводится под *Еще* или в подменю *Маркетплейс*, если пунктов больше, чем помещается в ряд. Путь описан на странице точки ||
|| Код встройки собран для типа объекта, который эту точку не поддерживает | Сверьте код с таблицей раздела: не все типы объектов поддержаны во всех точках ||
|| Обработчик не находит идентификатор объекта в теле запроса | Идентификатор приходит внутри `PLACEMENT_OPTIONS` отдельной JSON-строкой, а не отдельным параметром ||
|#

## Обзор точек встраивания {#all-placements}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Исключение — `BI_ANALYTICS_MENU`: точка объявлена в глобальном scope [`placement`](../../scopes/permissions.md), отдельного доступа к CRM для нее не нужно.

#|
|| **Точка встраивания** | **Когда использовать** ||
|| [CRM_XXX_LIST_MENU](./list-menu.md) | Пункт контекстного меню элемента в списке ||
|| [CRM_XXX_LIST_TOOLBAR](./list-toolbar.md) | Пункт меню над списком элементов ||
|| [CRM_XXX_DETAIL_TAB](./detail-tab.md) | Отдельная вкладка в карточке элемента ||
|| [CRM_XXX_DETAIL_ACTIVITY](./detail-activity.md) | Кнопка в панели над таймлайном карточки ||
|| [CRM_XXX_DETAIL_TOOLBAR](./detail-toolbar.md) | Пункт меню верхней кнопки карточки ||
|| [CRM_XXX_ACTIVITY_TIMELINE_MENU](./activity-timeline-menu.md) | Пункт контекстного меню записи дела в таймлайне ||
|| [CRM_XXX_DOCUMENTGENERATOR_BUTTON](./document-generator-button.md) | Пункт выпадающего меню генератора документов ||
|| [CRM_XXX_ROBOT_DESIGNER_TOOLBAR](./robot-designer-toolbar.md) | Кнопка в дизайнере роботов ||
|| [CRM_FUNNELS_TOOLBAR](./funnels-toolbar.md) | Кнопка в воронках и туннелях продаж ||
|| [CRM_ANALYTICS_MENU](./analytics-menu.md) | Отчет приложения в левом меню CRM-аналитики ||
|| [CRM_ANALYTICS_TOOLBAR](./analytics-toolbar.md) | Кнопка в шапке CRM-аналитики ||
|| [CRM_DETAIL_SEARCH](./detail-search.md) | Поиск клиента во внешнем источнике из карточки CRM ||
|| [BI_ANALYTICS_MENU](./bi-analytics-menu.md) | Отчет приложения в меню BI-аналитики ||
|| [CRM_REQUISITE_AUTOCOMPLETE, CRM_BANK_DETAIL_AUTOCOMPLETE](./requisites-autocomplete/index.md) | Подстановка данных организации и банковских реквизитов из внешнего источника ||
|| [Дополнительные возможности CRM_XXX_DETAIL_ACTIVITY](./detail-activity-area.md) | Интерфейс кнопки над таймлайном средствами Битрикс24 ||
|#

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../placement-list.md)
- [{#T}](../placement-unbind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
