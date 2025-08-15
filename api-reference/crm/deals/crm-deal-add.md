# Создать новую сделку crm.deal.add

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «добавления» сделок

Метод `crm.deal.add` создает новую сделку.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
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
- `value_n` — значение поля

Список доступных полей описан [ниже](#fields)
||
|| **params**
[`object`](../../data-types.md) | Объект, содержащий дополнительный набор параметров ([подробное описание](#params)) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название сделки.

По умолчанию генерируется по шаблону `Сделка #{id}`, где `id` — идентификатор элемента
||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Строковый идентификатор типа сделки. 

Список доступных типов сделки можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: 'DEAL_TYPE' }`.

По умолчанию — первый доступный тип сделки
||
|| **CATEGORY_ID**
[`crm_category`](../data-types.md) | Идентификатор воронки. Обязательно больше или равен 0.

Список доступных воронок можно узнать с помощью метода [crm.category.list](../universal/category/crm-category-list.md), передав `entityTypeId = 2`.

По умолчанию — идентификатор воронки по умолчанию
||
|| **STAGE_ID**
[`crm_status`](../data-types.md) | Стадия сделки. 

Список доступных стадий можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр:
- `{ ENTITY_ID: "DEAL_STAGE" }` — если сделка находится в общей воронке (направлении)
- `{ ENTITY_ID: "DEAL_STAGE_{categoryId}" }` — если сделка находится не в общей воронке, где `categoryId` — это идентификатор [воронки](../universal/category/index.md) сделки  

По умолчанию — первая доступная стадия относительно воронки ||
|| **IS_RECURRING**
[`char`](../../data-types.md) | Является ли сделка шаблоном регулярной сделки. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`
||
|| **IS_RETURN_CUSTOMER**
[`char`](../../data-types.md) | Является ли сделка повторной. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`
||
|| **IS_REPEATED_APPROACH**
[`char`](../../data-types.md) | Является ли сделка повторным обращением. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`
||
|| **PROBABILITY**
[`integer`](../../data-types.md) | Вероятность, % ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md#crm_currency) | Валюта. 

Список доступных валют можно узнать с помощью метода [crm.currency.list](../currency/crm-currency-list.md)
||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Сумма. 

По умолчанию `0.00` ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Включен ли режим ручного подсчета суммы. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`
||
|| **TAX_VALUE**
[`double`](../../data-types.md) | Сумма налога.

По умолчанию `0.00`
||
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
[`date`](../../data-types.md) | Дата начала. 

По умолчанию — дата создания сделки ||
|| **CLOSEDATE**
[`date`](../../data-types.md) | Дата завершения. 

По умолчанию — дата создания сделки плюс 7 дней
||
|| **OPENED**
[`char`](../../data-types.md) | Доступна ли сделка для всех. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y`. Значение по умолчанию может быть изменено в настройках CRM
||
|| **CLOSED**
[`char`](../../data-types.md) | Является ли сделка закрытой. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`
||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий. Поддерживает bb-коды ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный. 

По умолчанию — пользователь, вызывающий данный метод
||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Строковый идентификатор типа источника. 

Список доступных источников можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "SOURCE" }`.

По умолчанию — первый доступный тип источника
||
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
|| **TRACE**
[`string`](../../data-types.md) | Информация для сквозной аналитики — подробнее читайте в статье [{#T}](../../../tutorials/crm/how-to-use-analitycs/info-to-analitics.md) ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_25534736`. 

В зависимости от настроек портала у сделок может быть набор пользовательских полей определенных типов. 

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
[`boolean`](../../data-types.md) | Зарегистрировать ли событие добавления сделки в живой ленте. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FIELDS":{"TITLE":"Новая сделка #1","TYPE_ID":"COMPLEX","CATEGORY_ID":0,"STAGE_ID":"PREPARATION","IS_RECURRING":"N","IS_RETURN_CUSTOMER":"Y","IS_REPEATED_APPROACH":"Y","PROBABILITY":99,"CURRENCY_ID":"EUR","OPPORTUNITY":1000000,"IS_MANUAL_OPPORTUNITY":"Y","TAX_VALUE":0.10,"COMPANY_ID":9,"CONTACT_IDS":[84,83],"BEGINDATE":"'"$(date --iso-8601=seconds)"'","CLOSEDATE":"'"$(date --iso-8601=seconds --date='+10 days')"'", "OPENED":"Y","CLOSED":"N","COMMENTS":"Пример комментария","SOURCE_ID":"CALLBACK","SOURCE_DESCRIPTION":"Дополнительно об источнике","ADDITIONAL_INFO":"Дополнительная информация","UTM_SOURCE":"google","UTM_MEDIUM":"CPC","PARENT_ID_1220":22,"UF_CRM_1721244482250":"Привет мир!"},"PARAMS":{"REGISTER_SONET_EVENT":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FIELDS":{"TITLE":"Новая сделка #1","TYPE_ID":"COMPLEX","CATEGORY_ID":0,"STAGE_ID":"PREPARATION","IS_RECURRING":"N","IS_RETURN_CUSTOMER":"Y","IS_REPEATED_APPROACH":"Y","PROBABILITY":99,"CURRENCY_ID":"EUR","OPPORTUNITY":1000000,"IS_MANUAL_OPPORTUNITY":"Y","TAX_VALUE":0.10,"COMPANY_ID":9,"CONTACT_IDS":[84,83],"BEGINDATE":"'"$(date --iso-8601=seconds)"'","CLOSEDATE":"'"$(date --iso-8601=seconds --date='+10 days')"'", "OPENED":"Y","CLOSED":"N","COMMENTS":"Пример комментария","SOURCE_ID":"CALLBACK","SOURCE_DESCRIPTION":"Дополнительно об источнике","ADDITIONAL_INFO":"Дополнительная информация","UTM_SOURCE":"google","UTM_MEDIUM":"CPC","PARENT_ID_1220":22,"UF_CRM_1721244482250":"Привет мир!"},"PARAMS":{"REGISTER_SONET_EVENT":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.add
    ```

- JS


    ```js
    try
    {
    	const day = 60 * 60 * 24 * 1000;
    	
    	const now = new Date();
    	const after10Days = new Date(now.getTime() + 10 * day);
    	
    	const response = await $b24.callMethod(
    		'crm.deal.add',
    		{
    			fields: {
    				TITLE: "Новая сделка #1",
    				TYPE_ID: "COMPLEX",
    				CATEGORY_ID: 0,
    				STAGE_ID: "PREPARATION",
    				IS_RECURRING: "N",
    				IS_RETURN_CUSTOMER: "Y",
    				IS_REPEATED_APPROACH: "Y",
    				PROBABILITY: 99,
    				CURRENCY_ID: "EUR",
    				OPPORTUNITY: 1000000,
    				IS_MANUAL_OPPORTUNITY: "Y",
    				TAX_VALUE: 0.10,
    				COMPANY_ID: 9,
    				CONTACT_IDS: [84, 83],
    				BEGINDATE: now.toISOString(),
    				CLOSEDATE: after10Days.toISOString(),
    				OPENED: "Y",
    				CLOSED: "N",
    				COMMENTS: "[B]Пример комментария[/B]",
    				SOURCE_ID: "CALLBACK",
    				SOURCE_DESCRIPTION: "Дополнительно об источнике",
    				ADDITIONAL_INFO: "Дополнительная информация",
    				UTM_SOURCE: "google",
    				UTM_MEDIUM: "CPC",
    				PARENT_ID_1220: 22,
    				UF_CRM_1721244482250: "Привет мир!",
    			},
    			params: {
    				REGISTER_SONET_EVENT: "N",
    			},
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
        $fields = [
            'TITLE' => 'New Deal',
            'TYPE_ID' => 'GIG',
            'CATEGORY_ID' => '1',
            'STAGE_ID' => 'C1:NEW',
            'CURRENCY_ID' => 'USD',
            'OPPORTUNITY' => '10000',
            'BEGINDATE' => (new DateTime())->format(DateTime::ATOM),
            'CLOSEDATE' => (new DateTime('+1 month'))->format(DateTime::ATOM),
            'COMMENTS' => 'This is a test deal.',
        ];
        $params = [
            'REGISTER_SONET_EVENT' => 'Y',
        ];
        $result = $serviceBuilder
            ->getCRMScope()
            ->deal()
            ->add($fields, $params);
        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    const day = 60 * 60 * 24 * 1000;
  
    const now = new Date();
    const after10Days = new Date(now.getTime() + 10 * day);

    BX24.callMethod(
        'crm.deal.add',
        {
            fields: {
                TITLE: "Новая сделка #1",
                TYPE_ID: "COMPLEX",
                CATEGORY_ID: 0,
                STAGE_ID: "PREPARATION",
                IS_RECURRING: "N",
                IS_RETURN_CUSTOMER: "Y",
                IS_REPEATED_APPROACH: "Y",
                PROBABILITY: 99,
                CURRENCY_ID: "EUR",
                OPPORTUNITY: 1000000,
                IS_MANUAL_OPPORTUNITY: "Y",
                TAX_VALUE: 0.10,
                COMPANY_ID: 9,
                CONTACT_IDS: [84, 83],
                BEGINDATE: now.toISOString(),
                CLOSEDATE: after10Days.toISOString(),
                OPENED: "Y",
                CLOSED: "N",
                COMMENTS: "[B]Пример комментария[/B]",
                SOURCE_ID: "CALLBACK",
                SOURCE_DESCRIPTION: "Дополнительно об источнике",
                ADDITIONAL_INFO: "Дополнительная информация",
                UTM_SOURCE: "google",
                UTM_MEDIUM: "CPC",
                PARENT_ID_1220: 22,
                UF_CRM_1721244482250: "Привет мир!",
            },
            params: {
                REGISTER_SONET_EVENT: "N",
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
        'crm.deal.add',
        [
            'FIELDS' => [
                'TITLE' => 'Новая сделка #1',
                'TYPE_ID' => 'COMPLEX',
                'CATEGORY_ID' => 0,
                'STAGE_ID' => 'PREPARATION',
                'IS_RECURRING' => 'N',
                'IS_RETURN_CUSTOMER' => 'Y',
                'IS_REPEATED_APPROACH' => 'Y',
                'PROBABILITY' => 99,
                'CURRENCY_ID' => 'EUR',
                'OPPORTUNITY' => 1000000,
                'IS_MANUAL_OPPORTUNITY' => 'Y',
                'TAX_VALUE' => 0.10,
                'COMPANY_ID' => 9,
                'CONTACT_IDS' => [84, 83],
                'BEGINDATE' => (new DateTime())->format(DateTime::ATOM),
                'CLOSEDATE' => (new DateTime('+10 days'))->format(DateTime::ATOM),
                'OPENED' => 'Y',
                'CLOSED' => 'N',
                'COMMENTS' => 'Пример комментария',
                'SOURCE_ID' => 'CALLBACK',
                'SOURCE_DESCRIPTION' => 'Дополнительно об источнике',
                'ADDITIONAL_INFO' => 'Дополнительная информация',
                'UTM_SOURCE' => 'google',
                'UTM_MEDIUM' => 'CPC',
                'PARENT_ID_1220' => 22,
                'UF_CRM_1721244482250' => 'Привет мир!',
            ],
            'PARAMS' => [
                'REGISTER_SONET_EVENT' => 'N',
            ],
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
    "result": 394,
    "time": {
        "start": 1725013197.635808,
        "finish": 1725013198.580873,
        "duration": 0.9450650215148926,
        "processing": 0.6822988986968994,
        "date_start": "2024-08-30T12:19:57+02:00",
        "date_finish": "2024-08-30T12:19:58+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданной сделки ||
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
|| `-`     | `Parameter 'fields' must be array` | В параметр `fields` передан не объект ||
|| `-`     | `Parameter 'params' must be array` | В Параметр `params` передан не объект ||
|| `-`     | `Access denied` | У пользователя нет прав на «добавление» сделок ||
|| `-`     | Исчерпан выделенный дисковый ресурс |> ||
|| `-`     | Неверное значение поля «Валюта» |> ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-update.md)
- [{#T}](./crm-deal-get.md)
- [{#T}](./crm-deal-list.md)
- [{#T}](./crm-deal-delete.md)
- [{#T}](./crm-deal-fields.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-deal-with-choice-of-requisite.md)