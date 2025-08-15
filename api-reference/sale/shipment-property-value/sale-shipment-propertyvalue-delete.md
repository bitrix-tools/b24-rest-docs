# Удалить значения свойства отгрузки sale.shipmentpropertyvalue.delete

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет значения свойства отгрузки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_shipment_property_value.id`](../data-types.md#sale_shipment_property_value) | Идентификатор значения свойства отгрузки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":38165}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentpropertyvalue.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":38165,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentpropertyvalue.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.shipmentpropertyvalue.delete", {
    			"id": 38165
    		}
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
                'sale.shipmentpropertyvalue.delete',
                [
                    'id' => 38165,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting shipment property value: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipmentpropertyvalue.delete", {
            "id": 38165
        },
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
        'sale.shipmentpropertyvalue.delete',
        [
            'id' => 38165
        ]
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
    "result":true,
    "time":{
        "start":1718022651.487441,
        "finish":1718022652.140667,
        "duration":0.6532258987426758,
        "processing":0.41815900802612305,
        "date_start":"2024-06-10T15:30:51+03:00",
        "date_finish":"2024-06-10T15:30:52+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления значения свойства ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201040400001,
    "error_description":"Property value has not been found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201040400001` | Удаляемое значение свойства не найдено ||
|| `200040300020` | Недостаточно прав для удаления значения свойства ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-shipment-property-value-modify.md)
- [{#T}](./sale-shipment-property-value-get.md)
- [{#T}](./sale-shipment-property-value-list.md)
- [{#T}](./sale-shipment-property-value-get-fields.md)