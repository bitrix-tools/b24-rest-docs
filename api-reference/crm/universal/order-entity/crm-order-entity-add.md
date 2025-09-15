# Добавить привязку заказа к объекту CRM crm.orderentity.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор интернет-магазина

Метод добавляет привязку заказа к объекту CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей для создания привязки ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderId***
[`sale_order.id`](../../../sale/data-types.md#sale_order) | Идентификатор заказа ||
|| **ownerTypeId***
[`integer`](../../../data-types.md) | Идентификатор [типа объекта CRM](../../data-types.md#object_type).

Привязка возможна только к сделке или счету
||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM.

Для сделок может быть получен методом [crm.deal.list](../../deals/crm-deal-list.md).

Для счетов может быть получен методом [crm.invoice.list](../../outdated/invoice/crm-invoice-list.md)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Добавить привязку заказа к сделке:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5125,"ownerId":6933,"ownerTypeId":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.orderentity.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5125,"ownerId":6933,"ownerTypeId":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.orderentity.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.orderentity.add",
    		{
    			fields: {
    				orderId: 5125,
    				ownerId: 6933,
    				ownerTypeId: 2
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.orderentity.add",
        {
            fields: {
                orderId: 5125,
                ownerId: 6933,
                ownerTypeId: 2
            }
        },
    )
        .then(
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result);
                }
            },
            function(error)
            {
                console.info(error);
            }
        );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.orderentity.add',
        [
            'fields' => [
                'orderId' => 5125,
                'ownerId' => 6933,
                'ownerTypeId' => 2
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
    "result": {
        "dealOrder": {
            "orderId": 5125,
            "ownerId": 6933,
            "ownerTypeId": 2
        }
    },
    "time": {
        "start": 1719325851.568441,
        "finish": 1719325852.546479,
        "duration": 0.9780380725860596,
        "processing": 0.32780981063842773,
        "date_start": "2024-06-25T16:30:51+02:00",
        "date_finish": "2024-06-25T16:30:52+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **dealOrder**
[`crm_orderentity`](../../data-types.md#crm_orderentity) | Объект с информацией о созданной привязке ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "201650000001",
    "error_description": "Duplicate entry for key [ownerId, ownerTypeId, orderId]"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Описание** ||
|| `200040300020` | `Access Denied` 
Недостаточно прав доступа
||
|| `201650000001` | `Duplicate entry for key [ownerId, ownerTypeId, orderId]` 
Привязка уже существует
||
|| `200540400001` | `order does not exist` 
Не найден заказ
||
|| `0` | `Required fields: #FIELDS#` 
Не указаны обязательные поля (`#FIELDS#` — список полей через запятую)
||
|| `0` | Различные ошибки сохранения заказа
||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-order-entity-list.md)
- [{#T}](./crm-order-entity-delete-by-filter.md)
- [{#T}](./crm-order-entity-get-fields.md)
