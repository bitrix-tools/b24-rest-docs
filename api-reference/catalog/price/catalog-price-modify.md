# Обновить коллекцию цен товара catalog.price.modify

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение цены продажи товара»

Метод `catalog.price.modify` изменяет коллекцию цен товара. Позволяет добавлять, обновлять и удалять разные цены товара за один запрос.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Объект с данными для модификации цен ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **product***
[`object`](../../data-types.md)| Данные товара и его цен ([подробное описание](#product)) ||
|#

### Параметр product {#product}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product.id`](../data-types.md#catalog_product) | Идентификатор товара, можно получить методами [catalog.product.list](../product/catalog-product-list.md), [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md), [catalog.product.service.list](../product/service/catalog-product-service-list.md), [catalog.product.sku.list](../product/sku/catalog-product-sku-list.md) ||
|| **prices***
[`array`](../../data-types.md) | Массив цен товара ([подробное описание](#prices)) ||
|#

### Параметр prices {#prices}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`catalog_price.id`](../data-types.md#catalog_price) | Идентификатор цены. Если указан, то цена будет обновлена. Если не указан, то будет создана новая цена. Цена, идентификатор которой не был передан, будет удалена. Получить идентификаторы цен можно методом [catalog.price.list](./catalog-price-list.md) ||
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
    -d '{"fields":{"product":{"id":8,"prices":[{"catalogGroupId":1,"currency":"RUB","price":2001},{"catalogGroupId":3,"currency":"RUB","price":2001},{"catalogGroupId":5,"currency":"RUB","price":2001,"id":122}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.price.modify
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"product":{"id":8,"prices":[{"catalogGroupId":1,"currency":"RUB","price":2001},{"catalogGroupId":3,"currency":"RUB","price":2001},{"catalogGroupId":5,"currency":"RUB","price":2001,"id":122}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.price.modify
    ```

- JS

    ```javascript
    try {
        const response = await $b24.callMethod(
            'catalog.price.modify',
            {
                fields: {
                    product: {
                        id: 8,
                        prices: [
                            {
                                catalogGroupId: 1,
                                currency: 'RUB',
                                price: 2001
                            },
                            {
                                catalogGroupId: 3,
                                currency: 'RUB',
                                price: 2001
                            },
                            {
                                catalogGroupId: 5,
                                currency: 'RUB',
                                price: 2001,
                                id: 122
                            },
                        ]
                    },
                }
            }
        );

        const result = response.getData().result;
        console.log('Modified prices:', result);
        processResult(result);
    } catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.price.modify',
                [
                    'fields' => [
                        'product' => [
                            'id' => 8,
                            'prices' => [
                                [
                                    'catalogGroupId' => 1,
                                    'currency' => 'RUB',
                                    'price' => 2001
                                ],
                                [
                                    'catalogGroupId' => 3,
                                    'currency' => 'RUB',
                                    'price' => 2001
                                ],
                                [
                                    'catalogGroupId' => 5,
                                    'currency' => 'RUB',
                                    'price' => 2001,
                                    'id' => 122
                                ]
                            ]
                        ]
                    ]
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
        echo 'Error modifying prices: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.price.modify',
        {
            fields: {
                product: {
                    id: 8,
                    prices: [
                        {
                            catalogGroupId: 1,
                            currency: 'RUB',
                            price: 2001
                        },
                        {
                            catalogGroupId: 3,
                            currency: 'RUB',
                            price: 2001               
                        },
                        {
                            catalogGroupId: 5,
                            currency: 'RUB',
                            price: 2001,                
                            id: 122
                        },
                    ]
                },
            }
        },
        function(result)
        {
            if(result.error())
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
        'catalog.price.modify',
        [
            'fields' => [
                'product' => [
                    'id' => 8,
                    'prices' => [
                        [
                            'catalogGroupId' => 1,
                            'currency' => 'RUB',
                            'price' => 2001
                        ],
                        [
                            'catalogGroupId' => 3,
                            'currency' => 'RUB',
                            'price' => 2001
                        ],
                        [
                            'catalogGroupId' => 5,
                            'currency' => 'RUB',
                            'price' => 2001,
                            'id' => 122
                        ],
                    ]
                ],
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
        "prices": [
            {
                "catalogGroupId": 1,
                "currency": "RUB",
                "extraId": null,
                "id": 123,
                "price": 2001,
                "priceScale":2001,
                "productId": 8,
                "quantityFrom": null,
                "quantityTo": null,
                "timestampX": "2024-05-27T16:29:35+02:00"
            },
            {
                "catalogGroupId": 3,
                "currency": "RUB",
                "extraId": null,
                "id": 124,
                "price": 2001,
                "priceScale":2001,
                "productId": 8,
                "quantityFrom": null,
                "quantityTo": null,
                "timestampX": "2024-05-27T16:29:35+02:00"
            },
            {
                "catalogGroupId": 5,
                "currency": "RUB",
                "extraId": null,
                "id": 122,
                "price": 2001,
                "priceScale":2001,
                "productId": 8,
                "quantityFrom": null,
                "quantityTo": null,
                "timestampX": "2024-05-27T16:29:35+02:00"
            }
        ]
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-05-27T16:29:35+02:00",
        "date_finish": "2024-05-27T16:29:35+02:00",
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
|| **prices**
[`catalog_price[]`](../data-types.md#catalog_price) | Массив объектов с информацией о ценах товара ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Required fields: price, currency"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300020` | Access Denied | Недостаточно прав на редактирование цены ||
|| `200040300030` | Access Denied | Недостаточно прав на редактирование товара ||
|| `100` | Could not find value for parameter {fields} | Не указан или пустой параметр `fields` ||
|| `0` | Required fields:  | Не переданы обязательные поля ||
|| `0` | Validate price error. Catalog price group is wrong | Неправильный тип цены ||
|| `0` | Validate price error. Catalog product is allowed has only single price without ranges in price group | Дублирование типа цены. Были переданы в массиве `prices` две или более записей с одинаковым `catalogGroupId` || 
|| `0` | | Другие ошибки || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-add.md)
- [{#T}](./catalog-price-update.md)
- [{#T}](./catalog-price-get.md)
- [{#T}](./catalog-price-list.md)
- [{#T}](./catalog-price-delete.md)
- [{#T}](./catalog-price-get-fields.md)