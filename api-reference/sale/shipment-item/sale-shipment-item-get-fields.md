# Получить поля табличной части отгрузки sale.shipmentitem.getfields

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.shipmentitem.getfields` позволяет получить перечень доступных полей элементов табличной части отгрузки. 

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipmentitem.get
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentitem.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.shipmentitem.getfields", {}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'sale.shipmentitem.getfields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting shipment item fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipmentitem.getfields", {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.shipmentitem.getfields',
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
    "result":{
        "shipmentItem":{
            "basketId":{
                "isImmutable":true,
                "isReadOnly":false,
                "isRequired":true,
                "type":"integer"
            },
            "dateInsert":{
                "isImmutable":false,
                "isReadOnly":true,
                "isRequired":false,
                "type":"datetime"
            },
            "id":{
                "isImmutable":false,
                "isReadOnly":true,
                "isRequired":false,
                "type":"integer"
            },
            "orderDeliveryId":{
                "isImmutable":true,
                "isReadOnly":false,
                "isRequired":true,
                "type":"integer"
            },
            "quantity":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":true,
                "type":"double"
            },
            "reservedQuantity":{
                "isImmutable":false,
                "isReadOnly":true,
                "isRequired":false,
                "type":"double"
            },
            "xmlId":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":false,
                "type":"string"
            }
        }
    },
    "time":{
        "start":1712572880.529825,
        "finish":1712572880.74746,
        "duration":0.217634916305542,
        "processing":0.0046880245208740234,
        "date_start":"2024-04-08T13:41:20+03:00",
        "date_finish":"2024-04-08T13:41:20+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **shipmentItem**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [`sale_order_shipment_item`](../data-types.md) , а `value` — объект типа [`rest_field_description`](../data-types.md) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения доступных полей элемента табличной части отгрузки ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./sale-shipment-item-add.md)
- [{#T}](./sale-shipment-item-update.md)
- [{#T}](./sale-shipment-item-get.md)
- [{#T}](./sale-shipment-item-list.md)
- [{#T}](./sale-shipment-item-delete.md)