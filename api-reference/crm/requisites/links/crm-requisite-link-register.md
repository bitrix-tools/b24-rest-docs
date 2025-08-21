# Зарегистрировать связь реквизитов с объектом crm.requisite.link.register

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод регистрирует связь реквизитов с объектом.

Для успешной регистрации идентификаторы реквизитов должны принадлежать клиенту и продавцу, которые выбраны в связываемом объекте. Если какого-то реквизита нет, то его идентификатор передается как `0`. Можно даже указать все идентификаторы реквизитов нулевыми. Тогда считается, что к объекту реквизиты не привязаны.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей связи реквизита — объект вида `{"поле": "значение"[, ...]}` ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа объекта, к которому относится связь.

Могут использоваться следующие типы:
- сделка (значение `2`)
- старый счет (значение `5`)
- предложение (значение `7`)
- новый счет (значение `31`)
- другие динамические объекты (для получения возможных значений смотрите метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md)).

Идентификаторы типов объектов CRM можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор объекта, к которому относится связь. 

Идентификаторы объектов можно получить с помощью следующих методов: [crm.deal.list](../../deals/crm-deal-list.md), [crm.quote.list](../../quote/crm-quote-list.md), [crm.item.list](../../universal/crm-item-list.md) ||
|| **REQUISITE_ID***
[`integer`](../../../data-types.md) | Идентификатор реквизита клиента, выбранного для объекта. 

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **BANK_DETAIL_ID***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита клиента, выбранного для объекта.

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|| **MC_REQUISITE_ID***
[`integer`](../../../data-types.md) | Идентификатор реквизита моей компании, выбранного для объекта. 

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **MC_BANK_DETAIL_ID***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита моей компании, выбранного для объекта. 

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_TYPE_ID":31,"ENTITY_ID":315,"REQUISITE_ID":60,"BANK_DETAIL_ID":24,"MC_REQUISITE_ID":2,"MC_BANK_DETAIL_ID":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.link.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_TYPE_ID":31,"ENTITY_ID":315,"REQUISITE_ID":60,"BANK_DETAIL_ID":24,"MC_REQUISITE_ID":2,"MC_BANK_DETAIL_ID":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.link.register
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.link.register", {
    			fields: {
    				ENTITY_TYPE_ID: 31,
    				ENTITY_ID: 315,
    				REQUISITE_ID: 60,
    				BANK_DETAIL_ID: 24,
    				MC_REQUISITE_ID: 2,
    				MC_BANK_DETAIL_ID: 2
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.link.register',
                [
                    'fields' => [
                        'ENTITY_TYPE_ID'  => 31,
                        'ENTITY_ID'       => 315,
                        'REQUISITE_ID'    => 60,
                        'BANK_DETAIL_ID'  => 24,
                        'MC_REQUISITE_ID' => 2,
                        'MC_BANK_DETAIL_ID' => 2,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering requisite link: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.link.register", {
            fields: {
                ENTITY_TYPE_ID: 31,
                ENTITY_ID: 315,
                REQUISITE_ID: 60,       // Идентификатор реквизита, принадлежащего покупателю
                BANK_DETAIL_ID: 24,     // Идентификатор банковского реквизита, принадлежащего покупателю
                MC_REQUISITE_ID: 2,     // Идентификатор реквизита, принадлежащего компании-продавцу
                MC_BANK_DETAIL_ID: 2    // Идентификатор банковского реквизита, принадлежащего компании-продавцу
            }
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.link.register',
        [
            'fields' =>
            [
                'ENTITY_TYPE_ID' => 31,
                'ENTITY_ID' => 315,
                'REQUISITE_ID' => 60,
                'BANK_DETAIL_ID' => 24,
                'MC_REQUISITE_ID' => 2,
                'MC_BANK_DETAIL_ID' => 2
            ]
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
    "result": true,
    "time": {
        "start": 1718729280.575321,
        "finish": 1718729281.296214,
        "duration": 0.720893144607544,
        "processing": 0.1967611312866211,
        "date_start": "2024-06-18T18:48:00+02:00",
        "date_finish": "2024-06-18T18:48:01+02:00",
        "operating": 0.1967298984527588
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат регистрации связи:
- `true` — связь зарегистрирована
- `false` — связь не зарегистрирована
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "Entity is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `ENTITY_TYPE_ID is not defined or invalid` | Идентификатор типа объекта не задан или имеет недопустимое значение ||
|| `ENTITY_ID is not defined or invalid` | Идентификатор объекта не задан или имеет недопустимое значение ||
|| `REQUISITE_ID is not defined or invalid` | Идентификатор реквизита клиента не задан или имеет недопустимое значение ||
|| `BANK_DETAIL_ID is not defined or invalid` | Идентификатор банковского реквизита клиента не задан или имеет недопустимое значение ||
|| `MC_REQUISITE_ID is not defined or invalid` | Идентификатор реквизита моей компании не задан или имеет недопустимое значение ||
|| `MC_BANK_DETAIL_ID is not defined or invalid` | Идентификатор банковского реквизита моей компнаии не задан или имеет недопустимое значение ||
|| `The Requisite with ID '60' is not found` | Реквизит клиента с заданным идентификатором не найден ||
|| `The Requisite with ID '60' is not assigned to Company with ID '5'` | Реквизит клиента с заданным идентификатором не принадлежит компании, указанной в объекте ||
|| `The BankDetail with ID '24' is not found` | Банковский реквизит клиента с заданным идентификатором не найден ||
|| `The BankDetail with ID '24' is not assigned to Requisite with ID '60'` | Банковский реквизит клиента с заданным идентификатором не принадлежит указанному реквизиту ||
|| `The Requisite of your company with ID '2' is not found` | Реквизит моей компании с заданным идентификатором не найден ||
|| `The Requisite with ID '2' is not assigned to your company with ID '3010'` | Реквизит моей компании с заданным идентификатором не принадлежит моей компании, указанной в объекте ||
|| `The BankDetail of your company with ID '2' is not found` | Банковский реквизит моей компании с заданным идентификатором не найден ||
|| `The BankDetail of your company with ID '2' is not assigned to Requisite of your company with ID '2'` | Банковский реквизит моей компании с заданным идентификатором не принадлежит указанному  реквизиту ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-link-get.md)
- [{#T}](./crm-requisite-link-list.md)
- [{#T}](./crm-requisite-link-unregister.md)
- [{#T}](./crm-requisite-link-fields.md)
