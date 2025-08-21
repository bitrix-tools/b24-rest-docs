# Получить связь реквизита с объектом crm.requisite.link.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает связь реквизитов с объектом.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | 
Идентификатор типа объекта, к которому относится связь.

Могут использоваться следующие типы:
- сделка (значение `2`)
- старый счет (значение `5`)
- предложение (значение `7`)
- новый счет (значение `31`)
- другие динамические объекты (для получения возможных значений смотрите метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md)).

Идентификаторы типов объектов CRM можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор объекта, к которому относится связь. 

Идентификаторы объектов можно получить с помощью следующих методов: [crm.deal.list](../../deals/crm-deal-list.md), [crm.quote.list](../../quote/crm-quote-list.md), [crm.item.list](../../universal/crm-item-list.md). ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":31,"entityId":315}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.link.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":31,"entityId":315,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.link.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.link.get", {
    			entityTypeId: 31,        // Идентификатор типа (Счёт)
    			entityId: 315,             // Идентификатор счёта
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch(error)
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
                'crm.requisite.link.get',
                [
                    'entityTypeId' => 31,
                    'entityId'     => 315,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting requisite link: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.link.get", {
            entityTypeId: 31,        // Идентификатор типа (Счёт)
            entityId: 315,             // Идентификатор счёта
        },
        function(result)
        {
            if(result.error())
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
        'crm.requisite.link.get',
        [
            'entityTypeId' => 31,
            'entityId' => 315
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
        "ENTITY_TYPE_ID": 31,
        "ENTITY_ID": 315,
        "REQUISITE_ID": "60",
        "BANK_DETAIL_ID": "24",
        "MC_REQUISITE_ID": "2",
        "MC_BANK_DETAIL_ID": "2"
    },
    "time": {
        "start": 1718378061.651857,
        "finish": 1718378062.098295,
        "duration": 0.4464380741119385,
        "processing": 0.07567882537841797,
        "date_start": "2024-06-14T17:14:21+02:00",
        "date_finish": "2024-06-14T17:14:22+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`Object`| Объект, содержащий значения полей связи реквизита ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание полей связи реквизита с объектом CRM

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа объекта, к которому относится связь.

Могут использоваться следующие типы:
- сделка (значение `2`)
- старый счет (значение `5`)
- предложение (значение `7`)
- новый счет (значение `31`)
- другие динамические объекты (для получения возможных значений смотрите метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md)).

Идентификаторы типов объектов CRM можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор объекта, к которому относится связь. 

Идентификаторы объектов можно получить с помощью следующих методов: [crm.deal.list](../../deals/crm-deal-list.md), [crm.quote.list](../../quote/crm-quote-list.md), [crm.item.list](../../universal/crm-item-list.md) ||
|| **REQUISITE_ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита клиента, выбранного для объекта. 

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **BANK_DETAIL_ID**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита клиента, выбранного для объекта.

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|| **MC_REQUISITE_ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита моей компании, выбранного для объекта. 

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **MC_BANK_DETAIL_ID**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита моей компании, выбранного для объекта. 

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "Not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `entityTypeId is not defined or invalid` | Идентификатор типа объекта не задан или имеет недопустимое значение ||
|| `entityId is not defined or invalid` | Идентификатор объекта не задан или имеет недопустимое значение ||
|| `Not found` | Связь реквизита не найдена ||
|| `Access denied` | Недостаточно прав доступа для получения связи реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-link-register.md)
- [{#T}](./crm-requisite-link-list.md)
- [{#T}](./crm-requisite-link-unregister.md)
- [{#T}](./crm-requisite-link-fields.md)