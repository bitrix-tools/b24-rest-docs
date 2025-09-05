# Добавить цену товара catalog.price.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение цены продажи товара»

Метод `catalog.price.add` добавляет новую цену товара.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для создания новой цены товара ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`catalog_product.id`](../data-types.md#catalog_product) | Идентификатор товара, можно получить методами [catalog.product.list](../product/catalog-product-list.md), [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md), [catalog.product.service.list](../product/service/catalog-product-service-list.md), [catalog.product.sku.list](../product/sku/catalog-product-sku-list.md) ||
|| **catalogGroupId***
[`catalog_price_type.id`](../data-types.md#catalog_price_type) | Идентификатор типа цены, можно получить методом [catalog.priceType.list](../price-type/catalog-price-type-list.md) ||
|| **price***
[`double`](../../data-types.md) | Значение цены ||
|| **currency***
[`string`](../../data-types.md) | Идентификатор валюты, можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":1,"currency":"RUB","price":2000,"productId":1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.price.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":1,"currency":"RUB","price":2000,"productId":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.price.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.price.add',
    		{
    			fields: {
    				catalogGroupId: 1,
    				currency: "RUB",
    				price: 2000,
    				productId: 1
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.price.add',
                [
                    'fields' => [
                        'catalogGroupId' => 1,
                        'currency'       => "RUB",
                        'price'          => 2000,
                        'productId'      => 1
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding price: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.price.add',
        {
            fields: {
                catalogGroupId: 1,
                currency: "RUB",
                price: 2000,
                productId: 1
            }
        },
        function(result) {
            if (result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```	

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.price.add',
        [
            'fields' => [
                'catalogGroupId' => 1,
                'currency' => 'RUB',
                'price' => 2000,
                'productId' => 1
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
        "price": {
            "catalogGroupId": 1,
            "currency": "USD",
            "extraId": null,
            "id": 3,
            "price": 100.5,
            "productId": 1,
            "quantityFrom": null,
            "quantityTo": null,
            "timestampX": "2024-05-27T15:49:44+02:00"
        }
    },
    "time": {
        "start": 1716552521.40908,
        "finish": 1716552521.69852,
        "duration": 0.289434909820557,
        "processing": 0.011207103729248,
        "date_start": "2024-05-27T15:49:44+02:00",
        "date_finish": "2024-05-27T15:49:44+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **price**
[`catalog_price`](../data-types.md#catalog_price) | Объект с информацией о созданной цене товара ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300020,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300020` | Access Denied | Недостаточно прав ||
|| `100` | Could not find value for parameter {fields} | Не указан или пустой параметр `fields` || 
|| `0` | Required fields: | Не установлены обязательные поля ||
|| `0` | Validate price error. Catalog price group is wrong | Неправильный тип цены ||
|| `0` | Validate price error. Catalog product is allowed has only single price without ranges in price group | Цена с таким типом уже существует у товара ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-price-update.md)
- [{#T}](./catalog-price-get.md)
- [{#T}](./catalog-price-list.md)
- [{#T}](./catalog-price-delete.md)
- [{#T}](./catalog-price-get-fields.md)
- [{#T}](./catalog-price-modify.md)

