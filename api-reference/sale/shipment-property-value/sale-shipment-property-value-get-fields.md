# Получить доступные поля значений свойств отгрузки sale.shipmentpropertyvalue.getfields

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает доступные поля значений свойств отгрузки.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentpropertyvalue.getfields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentpropertyvalue.getfields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.shipmentpropertyvalue.getfields", {}
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
                'sale.shipmentpropertyvalue.getfields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting shipment property fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipmentpropertyvalue.getfields", {},
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
        'sale.shipmentpropertyvalue.getfields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
    "result":{
        "propertyValue":{
            "code":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":false,
                "type":"string"
            },
            "id":{
                "isImmutable":true,
                "isReadOnly":true,
                "isRequired":false,
                "type":"integer"
            },
            "name":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":false,
                "type":"string"
            },
            "shipmentId":{
                "isImmutable":true,
                "isReadOnly":false,
                "isRequired":true,
                "type":"integer"
            },
            "shipmentPropsId":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":true,
                "type":"integer"
            },
            "shipmentPropsXmlId":{
                "isImmutable":false,
                "isReadOnly":true,
                "isRequired":false,
                "type":"string"
            },
            "value":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":true,
                "type":"string"
            }
        }
    },
    "time":{
        "start":1718024003.807242,
        "finish":1718024003.98344,
        "duration":0.17619800567626953,
        "processing":0.005009889602661133,
        "date_start":"2024-06-10T15:53:23+03:00",
        "date_finish":"2024-06-10T15:53:23+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyValue**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [sale_shipment_property_value](../data-types.md#sale_shipment_property_value), а `value` — объект типа [rest_field_description](../data-types.md) ||
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
|| `200040300020` | Недостаточно прав для чтения доступных полей значений свойств ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-shipment-property-value-modify.md)
- [{#T}](./sale-shipment-property-value-get.md)
- [{#T}](./sale-shipment-property-value-list.md)
- [{#T}](./sale-shipment-propertyvalue-delete.md)