# Получить вариант значения свойства по id sale.propertyvariant.get

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает вариант значения свойства заказа. Метод актуален только для свойств с типом `ENUM`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_property_variant.id`](../data-types.md) | Идентификатор варианта значения свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertyvariant.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyvariant.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.propertyvariant.get", {
    			"id": 6
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
                'sale.propertyvariant.get',
                [
                    'id' => 6
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
        echo 'Error getting property variant: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.propertyvariant.get", {
            "id": 6
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
        'sale.propertyvariant.get',
        [
            'id' => 6
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
    "result":{
        "propertyVariant":{
            "description":"Описание значения для красного цвета",
            "id":6,
            "name":"Красный",
            "orderPropsId":49,
            "sort":10,
            "value":"red"
        }
    },
    "time":{
        "start":1711632097.794569,
        "finish":1711632098.028609,
        "duration":0.2340400218963623,
        "processing":0.009068012237548828,
        "date_start":"2024-03-28T16:21:37+03:00",
        "date_finish":"2024-03-28T16:21:38+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат удаления варианта значения свойства ||
|| **propertyVariant**
[`sale_order_property_variant`](../data-types.md) | Информация о варианте значения свойства ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201540400001,
    "error_description":"property variant is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201540400001` | Вариант значения свойства не найден ||
|| `200040300010` | Недостаточно прав для чтения варианта значения свойства ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-variant-add.md)
- [{#T}](./sale-property-variant-update.md)
- [{#T}](./sale-property-variant-list.md)
- [{#T}](./sale-property-variant-delete.md)
- [{#T}](./sale-property-variant-get-fields.md)