# Виджеты в CRM: обзор точек встраивания

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Точки встраивания добавляют интерфейс приложения внутрь CRM: свою вкладку в карточке объекта, пункт в контекстном меню списка, кнопку над таймлайном, пункт в дизайнере роботов или отчет в CRM-аналитике.

Точки делятся на две группы. Первая работает с конкретным типом объекта, и код точки содержит имя этого типа: `CRM_DEAL_DETAIL_TAB`, `CRM_LEAD_LIST_MENU`. Вторая относится к разделу CRM целиком, и имени объекта в коде нет: `CRM_ANALYTICS_MENU`, `CRM_ANALYTICS_TOOLBAR`, `CRM_DETAIL_SEARCH`.

Воронки стоят особняком: у сделок код имени объекта не содержит — `CRM_FUNNELS_TOOLBAR`, а у новых счетов и пользовательских типов объектов содержит — `CRM_SMART_INVOICE_FUNNELS_TOOLBAR` и `CRM_DYNAMIC_XXX_FUNNELS_TOOLBAR`.

Для регистрации виджета используйте метод [placement.bind](../placement-bind.md) и передавайте нужный код в параметре `PLACEMENT`.

> Быстрый переход: [все точки встраивания](#all-placements)

## Как выбрать точку встраивания

Выбирайте точку по задаче, которую решает приложение:

- добавить действие к элементу в списке — [CRM_XXX_LIST_MENU](./list-menu.md)
- добавить действие ко всему списку, а не к отдельному элементу — [CRM_XXX_LIST_TOOLBAR](./list-toolbar.md)
- добавить в карточку отдельный экран с данными приложения — [CRM_XXX_DETAIL_TAB](./detail-tab.md)
- добавить кнопку рядом с делами и комментариями карточки — [CRM_XXX_DETAIL_ACTIVITY](./detail-activity.md), а построить ее интерфейс средствами Битрикс24 — [дополнительные возможности точки](./detail-activity-area.md)
- добавить действие над карточкой целиком, рядом с задачами и документами — [CRM_XXX_DETAIL_TOOLBAR](./detail-toolbar.md)
- добавить действие к отдельной записи дела в таймлайне — [CRM_XXX_ACTIVITY_TIMELINE_MENU](./activity-timeline-menu.md)
- сформировать документ по объекту — [CRM_XXX_DOCUMENTGENERATOR_BUTTON](./document-generator-button.md)
- расширить автоматизацию — [CRM_XXX_ROBOT_DESIGNER_TOOLBAR](./robot-designer-toolbar.md)
- дополнить воронки и туннели — [CRM_FUNNELS_TOOLBAR и коды остальных типов объектов](./funnels-toolbar.md)
- показать свой отчет — [CRM_ANALYTICS_MENU](./analytics-menu.md), а добавить действие над разделом аналитики — [CRM_ANALYTICS_TOOLBAR](./analytics-toolbar.md)
- показать отчет рядом с готовыми отчетами BI-аналитики — [BI_ANALYTICS_MENU](./bi-analytics-menu.md)
- искать клиента во внешнем источнике и подставлять его в карточку — [CRM_DETAIL_SEARCH](./detail-search.md)
- подставлять данные организации из внешнего источника — [автозаполнение реквизитов](./requisites-autocomplete/index.md)

## Как начать работу

1. Выберите точку встраивания под сценарий и соберите ее код: вместо `XXX` подставьте `LEAD`, `DEAL`, `CONTACT`, `COMPANY`, `QUOTE`, `SMART_INVOICE`, `ORDER` или `ACTIVITY`. Для пользовательских типов объектов подставляется `DYNAMIC_` и числовой идентификатор типа — `CRM_DYNAMIC_183_DETAIL_TAB`. Набор поддержанных типов у точек разный: точный список кодов приведен на странице каждой точки, правила сборки — в [каталоге точек встраивания](../placements.md), а фактически доступные приложению места возвращает метод [placement.list](../placement-list.md).
2. Зарегистрируйте обработчик методом [placement.bind](../placement-bind.md) и передайте код в параметре `PLACEMENT`. Метод доступен только администратору и требует контекст приложения: вебхуком точку не привязать. При успешной регистрации метод возвращает `result: true` — разбор ответа и коды ошибок есть на его странице.
3. Завершите установку приложения. До этого виджет в интерфейсе не отображается.
4. Откройте место в интерфейсе и вызовите виджет. Где именно находится пункт, описано на странице каждой точки в разделе «Где находится в интерфейсе».
5. Разберите в обработчике `PLACEMENT_OPTIONS` — в нем приходит контекст вызова: идентификатор объекта, дела или адрес страницы, с которой открыт виджет.

У трех точек раздела на этом работа не заканчивается. [CRM_DETAIL_SEARCH](./detail-search.md) и две [точки автозаполнения реквизитов](./requisites-autocomplete/index.md) обмениваются с карточкой данными в обе стороны: обработчик возвращает найденные варианты командой интерфейса и подписывается на выбор пользователя. Порядок обмена описан на их страницах.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Точки раздела передают обработчику один и тот же набор стандартных параметров. Исключение — [BI_ANALYTICS_MENU](./bi-analytics-menu.md): эта точка открывает адрес обработчика обычным GET-запросом и не передает ему ничего.

Пример показан для вкладки в карточке сделки. У остальных точек меняются только значение `PLACEMENT` и контекст вызова в `PLACEMENT_OPTIONS`.

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 5552d735db7b7b4d5c16dd9c272bfe7d
    [AUTH_ID] => 9d4c7166007e9c94001e30ba00000001f0f107e28b5a4310c7f6d9b3025ea814
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 8c3b9966007e9c94001e30ba00000001f0f107f19c6b3e04d182ac5b73f9052d
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_DEAL_DETAIL_TAB
    [PLACEMENT_OPTIONS] => {"ID":"8061","URI":"\/crm\/deal\/details\/8061\/?any=details%2F8061%2F&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"}
)
```

Строка `PLACEMENT_OPTIONS` из этого примера после разбора выглядит так:

```json
{
    "ID": "8061",
    "URI": "/crm/deal/details/8061/?any=details%2F8061%2F&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"
}
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

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
|| [CRM_XXX_ACTIVITY_TIMELINE_MENU](./activity-timeline-menu.md) | `ENTITY_ID`, `ASSOCIATED_ENTITY_ID`, `ASSOCIATED_ENTITY_TYPE_ID`, `TYPE_ID`, `TYPE_CATEGORY_ID`, `TIMELINE_ITEM_ID` | Идентификаторы объекта и дела, на записи которого открыт виджет, и тип этой записи ||
|| [CRM_XXX_DOCUMENTGENERATOR_BUTTON](./document-generator-button.md) | `ENTITY_ID` | Идентификатор объекта, для которого формируется документ ||
|| [CRM_XXX_ROBOT_DESIGNER_TOOLBAR](./robot-designer-toolbar.md) | нет | Идентификатор воронки можно получить из пути в `URI` ||
|| [CRM_FUNNELS_TOOLBAR, CRM_SMART_INVOICE_FUNNELS_TOOLBAR, CRM_DYNAMIC_XXX_FUNNELS_TOOLBAR](./funnels-toolbar.md) | нет | Виджет открывается над списком воронок ||
|| [CRM_ANALYTICS_MENU](./analytics-menu.md) | нет | Виджет открывается в разделе аналитики ||
|| [CRM_ANALYTICS_TOOLBAR](./analytics-toolbar.md) | нет | Виджет открывается в разделе аналитики ||
|| [CRM_DETAIL_SEARCH](./detail-search.md) | `entityTypeName`, `searchQuery` | Тип клиента и поисковый запрос из карточки ||
|| [CRM_REQUISITE_AUTOCOMPLETE, CRM_BANK_DETAIL_AUTOCOMPLETE](./requisites-autocomplete/index.md) | `searchQuery` | Строка, которую пользователь ввел в поле реквизитов или банковских реквизитов ||
|| [BI_ANALYTICS_MENU](./bi-analytics-menu.md) | — | `PLACEMENT_OPTIONS` не передается: обработчик открывается GET-запросом ||
|#

## OPTIONS при регистрации через placement.bind

Параметр `OPTIONS` метода [placement.bind](../placement-bind.md) поддерживают только три точки раздела.

#|
|| **Точка встраивания** | **Ключи `OPTIONS`** ||
|| [CRM_XXX_DETAIL_ACTIVITY](./detail-activity.md) | `useBuiltInInterface`, `newUserNotificationTitle`, `newUserNotificationText` — включают штатный интерфейс Битрикс24 вместо своей верстки и настраивают приветственное уведомление ||
|| [CRM_REQUISITE_AUTOCOMPLETE, CRM_BANK_DETAIL_AUTOCOMPLETE](./requisites-autocomplete/index.md) | `countries` — идентификаторы стран, для которых работает обработчик ||
|#

Остальные точки раздела `OPTIONS` не поддерживают: Битрикс24 принимает переданные значения без ошибки, но не сохраняет их, и метод [placement.get](../placement-get.md) возвращает для такой регистрации пустой массив.

## Связь с другими объектами

**Объект CRM.** Идентификатор из `PLACEMENT_OPTIONS` указывает, для какого элемента вызван обработчик. Получить данные объекта можно методом [crm.item.get](../../crm/universal/crm-item-get.md), передав `entityTypeId` нужного [типа объекта](../../crm/data-types.md#object_type), или методом своего раздела: [crm.deal.get](../../crm/deals/crm-deal-get.md), [crm.lead.get](../../crm/leads/crm-lead-get.md), [crm.contact.get](../../crm/contacts/crm-contact-get.md), [crm.company.get](../../crm/companies/crm-company-get.md), [crm.quote.get](../../crm/quote/crm-quote-get.md).

**Дело.** Ключ `ASSOCIATED_ENTITY_ID` указывает, на записи какого дела открыт виджет. Данные дела возвращает метод [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md).

**Пользовательский тип объектов.** Идентификатор типа отдельным ключом не приходит. Его можно взять из значения параметра `PLACEMENT`: у кода `CRM_DYNAMIC_183_DETAIL_TAB` идентификатор типа равен `183`.

**Страница вызова.** Универсальный ключ `URI` содержит путь той страницы Битрикс24, с которой открыт виджет. По нему обработчик восстанавливает сценарий, если собственных ключей у точки нет. Исключение — [CRM_BANK_DETAIL_AUTOCOMPLETE](./requisites-autocomplete/bank-detail-autocomplete.md): виджет открывается из формы реквизитов, поэтому в `URI` приходит адрес документа компонента, а идентификатор клиента — в его параметрах `eid` и `external_context_id`.

## Типовые ошибки

#|
|| **Ошибка** | **Как решить** ||
|| `placement.bind` возвращает `WRONG_AUTH_TYPE` с описанием `Application context required` | Регистрируйте точку от имени приложения. Вебхуком точку не привязать ||
|| `placement.bind` возвращает `ERROR_PLACEMENT_NOT_FOUND` | Код собран для типа объекта, который эту точку не поддерживает, или приложению не выдан скоуп `crm`. Сверьте код с таблицей раздела ||
|| `placement.bind` возвращает `ERROR_ARGUMENT` | Передайте обязательные параметры `PLACEMENT` и `HANDLER`. Код незаполненного поля приходит в `argument` ||
|| Виджет зарегистрирован, но в интерфейсе не появляется | Завершите [установку приложения](../../../settings/app-installation/installation-finish.md) и перезагрузите страницу ||
|| Пункт не удается найти в карточке или в списке | Часть точек выводится под *Еще* или в подменю *Маркетплейс*, если пунктов больше, чем помещается в ряд. Путь описан на странице точки ||
|| Обработчик не находит идентификатор объекта в теле запроса | Идентификатор приходит внутри `PLACEMENT_OPTIONS` отдельной JSON-строкой, а не отдельным параметром ||
|#

Ошибка приходит в теле ответа — код в поле `error`, текст в `error_description`:

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Обзор точек встраивания {#all-placements}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Исключение — `BI_ANALYTICS_MENU`: точка объявлена в глобальном скоупе [`placement`](../../scopes/permissions.md), отдельного доступа к CRM для нее не нужно.

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
|| [CRM_FUNNELS_TOOLBAR, CRM_SMART_INVOICE_FUNNELS_TOOLBAR, CRM_DYNAMIC_XXX_FUNNELS_TOOLBAR](./funnels-toolbar.md) | Кнопка в воронках и туннелях сделок, новых счетов и пользовательских типов объектов ||
|| [CRM_ANALYTICS_MENU](./analytics-menu.md) | Отчет приложения в левом меню CRM-аналитики ||
|| [CRM_ANALYTICS_TOOLBAR](./analytics-toolbar.md) | Кнопка в шапке CRM-аналитики ||
|| [CRM_DETAIL_SEARCH](./detail-search.md) | Поиск клиента во внешнем источнике из карточки CRM ||
|| [BI_ANALYTICS_MENU](./bi-analytics-menu.md) | Отчет приложения в меню BI-аналитики ||
|| [CRM_REQUISITE_AUTOCOMPLETE, CRM_BANK_DETAIL_AUTOCOMPLETE](./requisites-autocomplete/index.md) | Подстановка данных организации и банковских реквизитов из внешнего источника ||
|#

Интерфейс кнопки над таймлайном можно построить не своей версткой, а средствами Битрикс24. Это дополнение к точке `CRM_XXX_DETAIL_ACTIVITY`, а не отдельная точка встраивания: своего кода у него нет и зарегистрировать его методом [placement.bind](../placement-bind.md) нельзя. Как включить такой интерфейс, описано в статье [Дополнительные возможности CRM_XXX_DETAIL_ACTIVITY](./detail-activity-area.md).

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../placements.md)
- [{#T}](../placement-bind.md)
- [{#T}](../placement-get.md)
- [{#T}](../placement-list.md)
- [{#T}](../placement-unbind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../crm/index.md)
- [{#T}](../../../tutorials/crm/crm-widgets/index.md)
- [{#T}](../../../settings/interactivity/index.md)
