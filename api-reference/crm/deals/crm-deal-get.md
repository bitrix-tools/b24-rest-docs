# Получить сделку по Id crm.deal.get

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «чтения» сделок

Метод `crm.deal.get` возвращает сделку по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** || 
|| **id***
[`integer`](../../data-types.md) | Идентификатор сделки.

Идентификатор можно получить с помощью методов [crm.deal.list](./crm-deal-list.md) или [crm.deal.add](./crm-deal-add.md) ||
|#

{% note tip "Связанные методы и темы" %}

[{#T}](./recurring-deals/crm-deal-recurring-get.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":410}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":410,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.get',
    		{
    			id: 410,
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result)
    	;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.get',
                [
                    'id' => 410,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Deal data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting deal: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.get',
        {
            id: 410,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.get',
        [
            'ID' => 410
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "410",
        "TITLE": "Новая сделка #1",
        "TYPE_ID": "COMPLEX",
        "STAGE_ID": "PREPARATION",
        "PROBABILITY": "99",
        "CURRENCY_ID": "EUR",
        "OPPORTUNITY": "1000000.00",
        "IS_MANUAL_OPPORTUNITY": "Y",
        "TAX_VALUE": "0.00",
        "LEAD_ID": null,
        "COMPANY_ID": "9",
        "CONTACT_ID": "84",
        "QUOTE_ID": null,
        "BEGINDATE": "2024-08-30T02:00:00+02:00",
        "CLOSEDATE": "2024-09-09T02:00:00+02:00",
        "ASSIGNED_BY_ID": "1",
        "CREATED_BY_ID": "1",
        "MODIFY_BY_ID": "1",
        "DATE_CREATE": "2024-08-30T14:29:00+02:00",
        "DATE_MODIFY": "2024-08-30T14:29:00+02:00",
        "OPENED": "Y",
        "CLOSED": "N",
        "COMMENTS": "[B]Пример комментария[\/B]",
        "ADDITIONAL_INFO": "Дополнительная информация",
        "LOCATION_ID": null,
        "CATEGORY_ID": "0",
        "STAGE_SEMANTIC_ID": "P",
        "IS_NEW": "N",
        "IS_RECURRING": "N",
        "IS_RETURN_CUSTOMER": "N",
        "IS_REPEATED_APPROACH": "N",
        "SOURCE_ID": "CALLBACK",
        "SOURCE_DESCRIPTION": "Дополнительно об источнике",
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "MOVED_BY_ID": "1",
        "MOVED_TIME": "2024-08-30T14:29:00+02:00",
        "LAST_ACTIVITY_TIME": "2024-08-30T14:29:00+02:00",
        "UTM_SOURCE": "google",
        "UTM_MEDIUM": "CPC",
        "UTM_CAMPAIGN": null,
        "UTM_CONTENT": null,
        "UTM_TERM": null,
        "PARENT_ID_1220": "22",
        "LAST_ACTIVITY_BY": "1",
        "UF_CRM_1721244482250": "Привет мир!"
    },
    "time": {
        "start": 1725020945.541275,
        "finish": 1725020946.179076,
        "duration": 0.637800931930542,
        "processing": 0.21427488327026367,
        "date_start": "2024-08-30T14:29:05+02:00",
        "date_finish": "2024-08-30T14:29:06+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`deal`](#deal) | Корневой элемент ответа. Содержит информацию о полях сделки. Структура описана [ниже](#deal) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип deal {#deal}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор сделки ||
|| **TITLE**
[`string`](../../data-types.md) | Название ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Строковый идентификатор типа сделки. 

Узнать подробнее о полученном типе сделки можно с помощью метода [crm.status.list](../status/crm-status-list.md), передав в фильтр:

```
{
    ENTITY_ID: 'DEAL_TYPE',
    STATUS_ID: TYPE_ID,
}
```
||
|| **CATEGORY_ID**
[`crm_category`](../data-types.md) | Воронка. Узнать подробнее об этой воронке можно с помощью метода [crm.category.get](../universal/category/crm-category-get.md), передав `entityTypeId = 2` и `id = CATEGORY_ID` ||
|| **STAGE_ID**
[`crm_status`](../data-types.md) | Строковый идентификатор стадии сделки. 

Узнать подробнее о полученной стадии можно с помощью метода [crm.status.list](../status/crm-status-list.md), передав в фильтр:

```
{
    ENTITY_ID: entityId,
    STATUS_ID: statusId,
}
```

где:
- `entityId` равен:
    - `DEAL_STAGE` в случае, когда сделка находится в общей воронке (`CATEGORY_ID = 0`)
    - `DEAL_STAGE_{categoryId}`, где `categoryId = CATEGORY_ID`
- `statusId` равен `STAGE_ID`
||
|| **STAGE_SEMANTIC_ID**
[`string`](../../data-types.md) | Группа стадии. Возможные значения:
- `P` — в работе
- `S` — успешная
- `F` — неуспешная
||
|| **IS_NEW**
[`char`](../../data-types.md) | Является ли сделка новой. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IS_RECURRING**
[`char`](../../data-types.md) | Является ли сделка регулярной. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IS_RETURN_CUSTOMER**
[`char`](../../data-types.md) | Является ли сделка повторной. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IS_REPEATED_APPROACH**
[`char`](../../data-types.md) | Является ли обращение повторным. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **PROBABILITY**
[`integer`](../../data-types.md) | Вероятность, % ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md#crm_currency) | Валюта ||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Сумма ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Включен ли ручной режим подсчета суммы. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **TAX_VALUE**
[`double`](../../data-types.md) | Ставка налога ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор компании. 

Узнать подробнее о компании можно с помощью метода [crm.item.get](../universal/crm-item-get.md), передав `entityTypeId = 4` и `id = COMPANY_ID`
||
|| **CONTACT_ID**
[`crm_contact`](../data-types.md) | Идентификатор контакта. Устаревшее ||
|| **CONTACT_IDS**
[`crm_contact[]`](../data-types.md) | Список идентификаторов контактов. 

Узнать подробнее о списке контактов можно с помощью метода [crm.item.list](../universal/crm-item-list.md), передав `entityTypeId = 3` и фильтр `{ '@id': CONTACT_IDS }`
||
|| **QUOTE_ID**
[`crm_quote`](../data-types.md) | Идентификатор коммерческого предложения, на основе которого была создана сделка. 

Узнать подробнее о коммерческом предложении можно с помощью метода [crm.item.get](../universal/crm-item-get.md), передав `entityTypeId = 7` и `id = QUOTE_ID`
||
|| **BEGINDATE**
[`date`](../../data-types.md) | Дата начала ||
|| **CLOSEDATE**
[`date`](../../data-types.md) | Дата завершения ||
|| **OPENED**
[`char`](../../data-types.md) | Доступна ли сделка для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CLOSED**
[`char`](../../data-types.md) | Закрыта ли сделка. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создана ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Кем изменена ||
|| **MOVED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя, который последним поменял стадию ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **MOVED_TIME**
[`datetime`](../../data-types.md) | Дата последнего изменения стадии ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Источник. 

Узнать подробнее о полученном источнике можно с помощью метода [crm.status.list](../status/crm-status-list.md), передав в фильтр:

```
{
    ENTITY_ID: 'SOURCE',
    STATUS_ID: SOURCE_ID,
}
```
||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно об источнике ||
|| **LEAD_ID**
[`crm_lead`](../data-types.md) | Идентификатор лида, на основании которого создана сделка. 

Узнать подробнее о лиде можно с помощью метода [crm.item.get](../universal/crm-item-get.md), передав `entityTypeId = 1` и `id = LEAD_ID`
||
|| **ADDITIONAL_INFO**
[`string`](../../data-types.md) | Дополнительная информация ||
|| **LOCATION_ID**
[`location`](../../data-types.md) | Местоположение. Служебное поле ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Внешний источник ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента во внешнем источнике ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Дата последней активности в таймлайне ||
|| **LAST_ACTIVITY_BY**
[`user`](../../data-types.md) | Автор последней активности в таймлайне ||
|| **UF_CRM_...**
[`any`](../../data-types.md) | Пользовательские поля. Например, `UF_CRM_25534736`. 

В зависимости от настроек портала у сделок может быть набор пользовательских полей определенных типов. Подробнее читайте в разделе [о пользовательских полях](./user-defined-fields/index.md) ||
|| **PARENT_ID_...**
[`crm_entity`](../data-types.md) | Поля связей. 

Если на портале есть смарт-процессы, связанные со сделками, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и сделкой. Само поле хранит идентификатор элемента такого смарт-процесса. 

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущей сделкой ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'fields' must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `ID is not defined or invalid` |  В параметр `id` либо не передано значение, либо оно является не целым числом больше нуля ||
|| `-`     | `Access denied` | У пользователя нет прав на «чтение» данной сделки ||
|| `-`     | `Not found`      | Сделки с переданным `id` не существует ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-add.md)
- [{#T}](./crm-deal-update.md)
- [{#T}](./crm-deal-list.md)
- [{#T}](./crm-deal-delete.md)
- [{#T}](./crm-deal-fields.md)