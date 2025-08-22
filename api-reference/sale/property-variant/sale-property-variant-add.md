# Добавить вариант свойства sale.propertyvariant.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет вариант значения свойства. Метод актуален только для свойств с типом `ENUM`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания варианта значения свойства ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderPropsId***
[`sale_order_property.id`](../data-types.md) | Идентификатор свойства ||
|| **name***
[`string`](../../data-types.md) | Название варианта значения свойства ||
|| **value***
[`string`](../../data-types.md) | Символьный код варианта значения свойства ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **description**
[`string`](../../data-types.md) | Описание варианта значения свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Красный","orderPropsId":49,"value":"red","sort":10,"description":"Описание значения для красного цвета"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertyvariant.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Красный","orderPropsId":49,"value":"red","sort":10,"description":"Описание значения для красного цвета"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyvariant.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.propertyvariant.add", {
    			"fields": {
    				"name": "Красный",
    				"orderPropsId": 49,
    				"value": "red",
    				"sort": 10,
    				"description": "Описание значения для красного цвета"
    			}
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
                'sale.propertyvariant.add',
                [
                    'fields' => [
                        'name'         => 'Красный',
                        'orderPropsId' => 49,
                        'value'        => 'red',
                        'sort'         => 10,
                        'description'  => 'Описание значения для красного цвета',
                    ],
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
        echo 'Error adding property variant: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.propertyvariant.add", {
            "fields": {
                "name": "Красный",
                "orderPropsId": 49,
                "value": "red",
                "sort": 10,
                "description": "Описание значения для красного цвета"
            }
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
        'sale.propertyvariant.add',
        [
            'fields' => [
                'name' => 'Красный',
                'orderPropsId' => 49,
                'value' => 'red',
                'sort' => 10,
                'description' => 'Описание значения для красного цвета'
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
    "result":{
        "propertyVariant":{
            "description":"Описание значения для красного цвета",
            "id":5,
            "name":"Красный",
            "orderPropsId":49,
            "sort":10,
            "value":"red"
        }
    },
    "time":{
        "start":1711629310.006284,
        "finish":1711629310.334167,
        "duration":0.3278830051422119,
        "processing":0.024754047393798828,
        "date_start":"2024-03-28T15:35:10+03:00",
        "date_finish":"2024-03-28T15:35:10+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyVariant**
[`sale_order_property_variant`](../data-types.md) | Объект с информацией о добавленном варианте значения свойства ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201550000003` | Не найдено свойство, к которому добавляется вариант значения свойства ||
|| `200040300020` | Недостаточно прав для добавления варианта значения свойства ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|| `ERROR_NO_VALUE` | Передано пустое значение символьного кода значения варианта свойства ||
|| `ERROR_NO_NAME` | Передано пустое значение названия значения варианта свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-variant-update.md)
- [{#T}](./sale-property-variant-get.md)
- [{#T}](./sale-property-variant-list.md)
- [{#T}](./sale-property-variant-delete.md)
- [{#T}](./sale-property-variant-get-fields.md)
