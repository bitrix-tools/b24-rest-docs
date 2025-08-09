# Изменить позицию корзины (товар из каталога) существующего заказа sale.basketitem.updateCatalogProduct

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет позицию корзины (товар из каталога) существующего заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_basket_item.id`](../data-types.md) | Идентификатор элемента (позиции) корзины. Может быть получен методами [sale.basketitem.addCatalogProduct](./sale-basket-item-add-catalog-product.md) и [sale.basketitem.list](./sale-basket-item-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с изменяемыми полями ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке позиций заказа ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код позиции корзины ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6783,"fields":{"quantity":4}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.basketitem.updateCatalogProduct
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6783,"fields":{"quantity":4},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.updateCatalogProduct
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.basketitem.updateCatalogProduct",
    		{
    			id: 6783,
    			fields: {
    				quantity: 4,
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.basketitem.updateCatalogProduct',
                [
                    'id'     => 6783,
                    'fields' => [
                        'quantity' => 4,
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
        echo 'Error updating catalog product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketitem.updateCatalogProduct",
        {
            id: 6783,
            fields: {
                quantity: 4,
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
        'sale.basketitem.updateCatalogProduct',
        [
            'id' => 6783,
            'fields' => [
                'quantity' => 4,
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
        "basketItem": {
            "basePrice": 1234,
            "canBuy": "Y",
            "catalogXmlId": "FUTURE-1C-CATALOG",
            "currency": "RUB",
            "customPrice": "N",
            "dateInsert": "2024-04-22T16:23:43+02:00",
            "dateUpdate": "2024-04-22T16:32:26+02:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";N;s:6:\"HEIGHT\";N;s:6:\"LENGTH\";N;}",
            "discountPrice": 124,
            "id": 6783,
            "measureCode": "796",
            "measureName": "шт",
            "name": " Разработка дизайна ",
            "orderId": 5147,
            "price": 1110,
            "roductid": 4347,
            "productXmlId": "4347",
            "properties": [],
            "quantity": 4,
            "reservations": [],
            "sort": 100,
            "type": 2,
            "vatIncluded": "N",
            "vatRate": null,
            "weight": 0,
            "xmlId": "bx_662672ef370c6"
        }
    },
    "total": 1,
    "time": {
        "start": 1713796344.951712,
        "finish": 1713796346.586924,
        "duration": 1.6352121829986572,
        "processing": 0.6428370475769043,
        "date_start": "2024-04-22T16:32:24+02:00",
        "date_finish": "2024-04-22T16:32:26+02:00",
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
|| **basketItem**
[`sale_basket_item`](../data-types.md) | Объект с данными созданного элемента (позиции) корзины ||
|| **total**
[`integer`](../../data-types.md) | Число обработанных записей ||
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
|| `200140400006` | `Module catalog is not exists`

Отсутствует модуль Торговый каталог (catalog)
|| 
|| `200140400001` | `basket item is not exists`

Не найдена позиция корзины
|| 
|| `200140400008` | `Required fields: fields[ORDER_ID]`

Не указан идентификатор заказа
|| 
|| `200140400009` | `Order not found`

Заказ не найден
|| 
|| `200140400011` | `Currency must be the currency of the order`

Валюта позиции не совпадает с валютой заказа
|| 
|| `200040300010` | Недостаточно прав для изменения
|| 
|| `100` | Не указаны обязательные параметры
||
|| `0` | Другие ошибки (например, фатальные ошибки)
||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-basket-item-add.md)
- [{#T}](./sale-basket-item-update.md)
- [{#T}](./sale-basket-item-get.md)
- [{#T}](./sale-basket-item-list.md)
- [{#T}](./sale-basket-item-delete.md)
- [{#T}](./sale-basket-item-get-fields.md)
- [{#T}](./sale-basket-item-add-catalog-product.md)
- [{#T}](./sale-basket-item-get-catalog-product-fields.md)