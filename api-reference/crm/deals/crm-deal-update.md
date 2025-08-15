# Изменить сделку crm.deal.update

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «изменения» сделок

Метод `crm.deal.update` обновляет существующую сделку.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сделки.

Идентификатор можно получить с помощью методов [crm.deal.list](./crm-deal-list.md) или [crm.deal.add](./crm-deal-add.md) ||
|| **fields**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — новое значение поля

Список доступных полей описан [ниже](#fields).

Некорректное поле в `fields` будет проигнорировано.

В `fields` нужно передавать только те поля, которые требуется изменить
||
|| **params** 
[`object`](../../data-types.md)| Набор дополнительных параметров ([подробное описание](#params)) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название сделки ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Строковый идентификатор типа сделки.

Список доступных типов сделки можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: 'DEAL_TYPE' }` ||
|| **STAGE_ID**
[`crm_status`](../data-types.md) | Стадия сделки.

Список доступных стадий можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр:
- `{ ENTITY_ID: "DEAL_STAGE" }` — если сделка находится в общей воронке (направлении)
- `{ ENTITY_ID: "DEAL_STAGE_{categoryId}" }` — если сделка находится не в общей воронке, где `categoryId` — это идентификатор [воронки](../universal/category/index.md) и равен `CATEGORY_ID` сделки.
  
Если необходимо сменить воронку сделки, используйте метод [crm.item.update](../universal/crm-item-update.md), `entityTypeId` сделки — `2`
||
|| **IS_RECURRING**
[`char`](../../data-types.md) | Является ли сделка шаблоном регулярной сделки. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IS_RETURN_CUSTOMER**
[`char`](../../data-types.md) | Является ли сделка повторной. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IS_REPEATED_APPROACH**
[`char`](../../data-types.md) | Является ли сделка повторным обращением. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **PROBABILITY**
[`integer`](../../data-types.md) | Вероятность, % ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md#crm_currency) | Валюта.

Список доступных валют можно узнать с помощью метода [crm.currency.list](../currency/crm-currency-list.md)
||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Сумма ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Включен ли режим ручного подсчета суммы. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **TAX_VALUE**
[`double`](../../data-types.md) | Сумма налога ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор компании, привязанной к сделке.

Список компаний можно узнать с помощью метода [crm.item.list](../universal/crm-item-list.md), передав `entityTypeId = 4`
||
|| **CONTACT_ID**
[`crm_contact`](../data-types.md) | Контакт. Устаревшее ||
|| **CONTACT_IDS**
[`crm_contact[]`](../data-types.md) | Список привязанных к сделке контактов.

Список контактов можно узнать с помощью метода [crm.item.list](../universal/crm-item-list.md), передав `entityTypeId = 3`
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
[`char`](../../data-types.md) | Является ли сделка закрытой. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий. Поддерживает bb-коды ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Строковый идентификатор типа источника.

Список доступных источников можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "SOURCE" }` ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно об источнике ||
|| **ADDITIONAL_INFO**
[`string`](../../data-types.md) | Дополнительная информация ||
|| **LOCATION_ID**
[`location`](../../data-types.md) | Местоположение клиента. Служебное поле ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных.

Используется только для привязки к внешнему источнику
||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных.

Используется только для привязки к внешнему источнику
||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система (Google-Adwords и другие) ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Возможные значения:
- `CPC` — объявления
- `CPM` — баннеры
||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_25534736`. 

В зависимости от настроек портала у сделок может быть набор пользовательских полей определенных типов. 

Значения множественных полей передаются в виде массива.
  
Для изменения файловых полей рекомендуется использовать метод [crm.item.update](../universal/crm-item-update.md).

Добавить пользовательское поле в сделку можно с помощью метода [crm.deal.userfield.add](./user-defined-fields/crm-deal-userfield-add.md) ||
|| **PARENT_ID_...**
[`crm_entity`](../data-types.md) | Поля связей. 

Если на портале есть смарт-процессы, связанные со сделками, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и сделкой. Само поле хранит идентификатор элемента такого смарт-процесса. 

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущей сделкой ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **REGISTER_SONET_EVENT**
[`boolean`](../../data-types.md) | Зарегистрировать ли событие изменения сделки в живой ленте. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **REGISTER_HISTORY_EVENT**
[`boolean`](../../data-types.md) | Создать ли запись в истории. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

{% note tip "Связанные методы и темы" %}

[{#T}](./recurring-deals/crm-deal-recurring-update.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":123,"FIELDS":{"TITLE":"Новое название сделки!","TYPE_ID":"GOODS","STAGE_ID":"WON","IS_RECCURING":"Y","IS_RETURN_CUSTOMER":"Y","OPPORTUNITY":9999.99,"IS_MANUAL_OPPORTUNITY":"Y","ASSIGNED_BY_ID":1,"UF_CRM_1725365197310":"Строка","PARENT_ID_1032":1},"PARAMS":{"REGISTER_SONET_EVENT":"N","REGISTER_HISTORY_EVENT":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":123,"FIELDS":{"TITLE":"Новое название сделки!","TYPE_ID":"GOODS","STAGE_ID":"WON","IS_RECCURING":"Y","IS_RETURN_CUSTOMER":"Y","OPPORTUNITY":9999.99,"IS_MANUAL_OPPORTUNITY":"Y","ASSIGNED_BY_ID":1,"UF_CRM_1725365197310":"Строка","PARENT_ID_1032":1},"PARAMS":{"REGISTER_SONET_EVENT":"N","REGISTER_HISTORY_EVENT":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.update',
    		{
    			id: 123,
    			fields: {
    				TITLE: "Новое название сделки!",
    				TYPE_ID: "GOODS",
    				STAGE_ID: "WON",
    				IS_RECCURING: "Y",
    				IS_RETURN_CUSTOMER: "Y",
    				OPPORTUNITY: 9999.99,
    				IS_MANUAL_OPPORTUNITY: "Y",
    				ASSIGNED_BY_ID: 1,
    				UF_CRM_1725365197310: "Строка",
    				PARENT_ID_1032: 1,
    			},
    			params: {
    				REGISTER_SONET_EVENT: "N",
    				REGISTER_HISTORY_EVENT: "N",
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error() ? console.error(result.error()) : console.info(result);
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
                'crm.deal.update',
                [
                    'id' => 123,
                    'fields' => [
                        'TITLE'              => "Новое название сделки!",
                        'TYPE_ID'            => "GOODS",
                        'STAGE_ID'           => "WON",
                        'IS_RECCURING'       => "Y",
                        'IS_RETURN_CUSTOMER' => "Y",
                        'OPPORTUNITY'        => 9999.99,
                        'IS_MANUAL_OPPORTUNITY' => "Y",
                        'ASSIGNED_BY_ID'     => 1,
                        'UF_CRM_1725365197310' => "Строка",
                        'PARENT_ID_1032'     => 1,
                    ],
                    'params' => [
                        'REGISTER_SONET_EVENT'   => "N",
                        'REGISTER_HISTORY_EVENT' => "N",
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($response->getError()) {
            echo 'Error: ' . $response->getError();
        } else {
            echo 'Success: ' . print_r($result, true);
            // Нужная вам логика обработки данных
            processData($result);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating deal: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.update',
        {
            id: 123,
            fields: {
                TITLE: "Новое название сделки!",
                TYPE_ID: "GOODS",
                STAGE_ID: "WON",
                IS_RECCURING: "Y",
                IS_RETURN_CUSTOMER: "Y",
                OPPORTUNITY: 9999.99,
                IS_MANUAL_OPPORTUNITY: "Y",
                ASSIGNED_BY_ID: 1,
                UF_CRM_1725365197310: "Строка",
                PARENT_ID_1032: 1,
            },
            params: {
                REGISTER_SONET_EVENT: "N",
                REGISTER_HISTORY_EVENT: "N",
            },
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
        'crm.deal.update',
        [
            'ID' => 123,
            'FIELDS' => [
                'TITLE' => 'Новое название сделки!',
                'TYPE_ID' => 'GOODS',
                'STAGE_ID' => 'WON',
                'IS_RECCURING' => 'Y',
                'IS_RETURN_CUSTOMER' => 'Y',
                'OPPORTUNITY' => 9999.99,
                'IS_MANUAL_OPPORTUNITY' => 'Y',
                'ASSIGNED_BY_ID' => 1,
                'UF_CRM_1725365197310' => 'Строка',
                'PARENT_ID_1032' => 1,
            ],
            'PARAMS' => [
                'REGISTER_SONET_EVENT' => 'N',
                'REGISTER_HISTORY_EVENT' => 'N',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Пояснения к методу

Для управления контактами сделки не рекомендуется использовать поля `CONTACT_IDS` и `CONTACT_ID`. 

Используйте методы [crm.deal.contact.*](./contacts/index.md) для работы с одним контактом, методы [crm.deal.contact.items.*](./contacts/index.md) для работы с группой контактов сделки.

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1725365418.056843,
        "finish": 1725365419.671506,
        "duration": 1.6146628856658936,
        "processing": 1.3475170135498047,
        "date_start": "2024-09-03T14:10:18+02:00",
        "date_finish": "2024-09-03T14:10:19+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `-`     | `ID is not defined or invalid` | В параметр `id` передано не целое число больше нуля ||
|| `-`     | `Not found` | Сделка с переданным `id` не существует ||
|| `-`     | `Parameter 'fields' must be array` | В параметр `fields` передан не объект ||
|| `-`     | `Parameter 'params' must be array` | В параметр `params` передан не объект ||
|| `-`     | `Access denied` | У пользователя нет прав на «изменение» сделок ||
|| `-`     | Исчерпан выделенный дисковый ресурс |> ||
|| `-`     | Неверное значение поля «Валюта» |> ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-add.md)
- [{#T}](./crm-deal-get.md)
- [{#T}](./crm-deal-list.md)
- [{#T}](./crm-deal-delete.md)
- [{#T}](./crm-deal-fields.md)
- [{#T}](../universal/crm-item-update.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-set-paid-date-to-deal.md)

