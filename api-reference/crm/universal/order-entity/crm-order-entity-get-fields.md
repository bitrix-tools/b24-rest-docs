# Получить поля привязки заказа crm.orderentity.getFields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: менеджер интернет-магазина

Метод возвращает список доступных полей привязки заказа. Каждое поле описывается в виде структуры настроек поля [crm_rest_field_description](../../data-types.md#crm_rest_field_description).

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.orderentity.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/crm.orderentity.getFields?auth=**put_access_token_here**
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.orderentity.getFields",
    		{}
    	);
    
    	const result = response.getData().result;
    	console.log(result);
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
                'crm.orderentity.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting order entity fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.orderentity.getFields",
        {},
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
                    console.log(result.data());
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
        'crm.orderentity.getFields',
        []
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
        "orderEntity": {
            "orderId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "ownerId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "ownerTypeId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            }
        }
    },
    "time": {
        "start": 1718962657.018204,
        "finish": 1718962657.773002,
        "duration": 0.7547979354858398,
        "processing": 0.01193094253540039,
        "date_start": "2024-06-21T11:37:37+02:00",
        "date_finish": "2024-06-21T11:37:37+02:00",
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
|| **orderEntity**
[`object`](../../../data-types.md) | Объект со списком доступных полей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field_N` — идентификатор поля объекта [crm_orderentity](../../data-types.md#crm_orderentity), а `value` — объект типа [crm_rest_field_description](../../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200040300010",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Описание** ||
|| `200040300010` | `Access Denied` 
Недостаточно прав доступа
||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-order-entity-add.md)
- [{#T}](./crm-order-entity-list.md)
- [{#T}](./crm-order-entity-delete-by-filter.md)