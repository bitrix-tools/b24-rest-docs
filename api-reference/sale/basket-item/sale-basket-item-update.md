# Изменить позицию корзины существующего заказа sale.basketitem.update

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет позицию корзины существующего заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_basket_item.id`](../data-types.md) | Идентификатор позиции заказа ||
|| **fields***
[`object`](../../data-types.md) | Значения изменяемых полей ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке позиций заказа ||
|| **price**
[`double`](../../data-types.md) | Цена с учетом наценок и скидок ||
|| **basePrice**
[`double`](../../data-types.md) | Исходная цена без учета наценок и скидок ||
|| **discountPrice**
[`double`](../../data-types.md) | Величина итоговой скидки или наценки ||
|| **quantity**
[`double`](../../data-types.md) | Количество товара ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код позиции корзины ||
|| **name**
[`string`](../../data-types.md) | Название товара ||
|| **weight**
[`integer`](../../data-types.md) | Вес товара ||
|| **dimensions**
[`string`](../../data-types.md) | Размеры товара (сериализованный массив) ||
|| **measureCode**
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения товара ||
|| **measureName**
[`catalog_measure.symbol`](../../catalog/data-types.md#catalog_measure) | Название единицы измерения ||
|| **canBuy**
[`string`](../../data-types.md) | Флаг доступности товара. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **vatRate**
[`double`](../../data-types.md) | Величина налога в процентах. Для указания
ставки «Без НДС» нужно передать пустую строку ||
|| **vatIncluded**
[`string`](../../data-types.md) | Флаг того, включен ли НДС или налог в цену товара. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **catalogXmlId**
[`string`](../../data-types.md) | Внешний код каталога товаров ||
|| **productXmlId**
[`string`](../../data-types.md) | Внешний код товара ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6791,"fields":{"quantity":7,"price":10,"discountPrice":990}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.basketitem.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6791,"fields":{"quantity":7,"price":10,"discountPrice":990},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.basketitem.update",
    		{
    			id: 6791,
    			fields: {
    				quantity: 7,
    				price: 10,
    				discountPrice: 990,
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
                'sale.basketitem.update',
                [
                    'id' => 6791,
                    'fields' => [
                        'quantity'      => 7,
                        'price'         => 10,
                        'discountPrice' => 990,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating basket item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketitem.update",
        {
            id: 6791,
            fields: {
                quantity: 7,
                price: 10,
                discountPrice: 990,
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
        'sale.basketitem.update',
        [
            'id' => 6791,
            'fields' =>
            [
                'quantity' => 7,
                'price' => 10,
                'discountPrice' => 990,
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
            "basePrice": 1000,
            "canBuy": "Y",
            "catalogXmlId": "",
            "currency": "RUB",
            "customPrice": "Y",
            "dateInsert": "2024-04-23T18:51:28+02:00",
            "dateUpdate": "2024-04-24T14:02:25+02:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";i:244;s:6:\"HEIGHT\";i:100;s:6:\"LENGTH\";i:31;}",
            "discountPrice": 990,
            "id": 6791,
            "measureCode": "768",
            "measureName": "шт",
            "name": "Пробный товар",
            "orderId": 5147,
            "price": 10,
            "productId": 0,
            "productXmlId": "ProductKey",
            "properties": [],
            "quantity": 7,
            "reservations": [],
            "sort": 400,
            "type": null,
            "vatIncluded": "Y",
            "vatRate": 10,
            "weight": 40,
            "xmlId": "BasketPositionId"
        }
    },
    "total": 1,
    "time": {
        "start": 1713960144.842687,
        "finish": 1713960146.089664,
        "duration": 1.2469770908355713,
        "processing": 0.5501749515533447,
        "date_start": "2024-04-24T14:02:24+02:00",
        "date_finish": "2024-04-24T14:02:26+02:00",
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
[`sale_basket_item`](../data-types.md) | Объект с данными обновленного элемента (позиции) корзины ||
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
- [{#T}](./sale-basket-item-get.md)
- [{#T}](./sale-basket-item-list.md)
- [{#T}](./sale-basket-item-delete.md)
- [{#T}](./sale-basket-item-get-fields.md)
- [{#T}](./sale-basket-item-add-catalog-product.md)
- [{#T}](./sale-basket-item-update-catalog-product.md)
- [{#T}](./sale-basket-item-get-catalog-product-fields.md)