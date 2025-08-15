# Добавить элемент (позицию) в корзину существующего заказа sale.basketitem.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет позицию в корзину существующего заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания элемента (позиции) корзины в заказе ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

Значения полей, отмеченных **, будут взяты из данных о товаре на сайте, если в поле `productid` передан реальный идентификатор товара. Если товар не существует на сайте, поле нужно заполнить самостоятельно. {.b24-info}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderId***
[`sale_order.id`](../data-types.md) | Идентификатор заказа ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке позиций заказа ||
|| **productid***
[`catalog_product.id`](../../catalog/data-types.md#catalog_product) | Идентификатор товара/вариации.

Для товаров, которых нет на сайте/портале, может быть равен нулю
 ||
|| **price**
[`double`](../../data-types.md) | Цена с учетом наценок и скидок (смотрите поле `customPrice` ниже).

Поле будет заполнено автоматически, если `customPrice !== ‘Y’`
 ||
|| **basePrice**
[`double`](../../data-types.md) | Исходная цена без учета наценок и скидок (смотрите поле `customPrice` ниже).

Поле будет заполнено автоматически, если `customPrice !== ‘Y’`
 ||
|| **discountPrice**
[`double`](../../data-types.md) | Величина итоговой скидки или наценки (смотрите поле `customPrice` ниже).

Поле будет заполнено автоматически, если `customPrice !== ‘Y’`
 ||
|| **currency***
[`crm_currency.CURRENCY`](../../crm/data-types.md) | Валюта цены. Должна совпадать с валютой заказа ||
|| **customPrice**
[`string`](../../data-types.md) | Указана ли цена вручную. Возможные значения:
- `Y` — да
- `N` — нет

Если указывается значение `Y`, то данные каталога будут игнорироваться. Необходимо явно задать параметры `price`, `basePrice` и `discountPrice` так, чтобы выполнялось условие `basePrice = price + discountPrice`
 ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код позиции корзины ||
|| **name***,**
[`string`](../../data-types.md) | Название товара ||
|| **weight****
[`integer`](../../data-types.md) | Вес товара ||
|| **dimensions****
[`string`](../../data-types.md) | Размеры товара (сериализованный массив) ||
|| **measureCode****
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения товара ||
|| **measureName****
[`catalog_measure.symbol`](../../catalog/data-types.md#catalog_measure) | Название единицы измерения ||
|| **canBuy****
[`string`](../../data-types.md) | Флаг доступности товара. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **vatRate****
[`double`](../../data-types.md) | Величина налога в процентах. Для указания ставки «Без НДС» нужно передать пустую строку ||
|| **vatIncluded****
[`string`](../../data-types.md) | Флаг того, включен ли НДС или налог в цену товара. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **catalogXmlId****
[`string`](../../data-types.md) | Внешний код каталога товаров ||
|| **productXmlId****
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
    -d '{"fields":{"orderId":5147,"quantity":2,"productId":6544,"currency":"RUB"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.basketitem.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5147,"quantity":2,"productId":6544,"currency":"RUB"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.basketitem.add",
    		{
    			fields: { // минимальный набор необходимых полей
    				orderId: 5147,
    				quantity: 2,
    				productId: 6544,
    				currency: 'RUB',
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
                'sale.basketitem.add',
                [
                    'fields' => [
                        'orderId'   => 5147,
                        'quantity'  => 2,
                        'productId' => 6544,
                        'currency'  => 'RUB',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding basket item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketitem.add",
        {
            fields: { // минимальный набор необходимых полей
                orderId: 5147,
                quantity: 2,
                productId: 6544,
                currency: 'RUB',
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
        'sale.basketitem.add',
        [
            'fields' =>
            [
                'orderId' => 5147,
                'quantity' => 2,
                'productId' => 6544,
                'currency' => 'RUB',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../../tutorials/sale/example-position-with-custom-price.md)
- [{#T}](../../../tutorials/sale/example-position-that-is-not-on-the-site.md)

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "basketItem": {
            "basePrice": 1000,
            "canBuy": "Y",
            "catalogXmlId": "FUTURE-1C-CATALOG",
            "currency": "RUB",
            "customPrice": "N",
            "dateInsert": "2024-04-23T15:59:37+02:00",
            "dateUpdate": "2024-04-23T15:59:37+02:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";N;s:6:\"HEIGHT\";N;s:6:\"LENGTH\";N;}",
            "discountPrice": 100,
            "id": 6790,
            "measureCode": "163",
            "measureName": "г",
            "name": "Товар",
            "orderId": 5147,
            "price": 900,
            "productId": 1245,
            "productXmlId": "1245",
            "properties": [],
            "quantity": 1,
            "reservations": [],
            "sort": 100,
            "vatIncluded": "N",
            "vatRate": null,
            "weight": 0,
            "xmlId": "bx_6627bec8c4fdc"
        }
    },
    "total": 1,
    "time": {
        "start": 1713880776.108755,
        "finish": 1713880777.704221,
        "duration": 1.595465898513794,
        "processing": 0.973701000213623,
        "date_start": "2024-04-23T15:59:36+02:00",
        "date_finish": "2024-04-23T15:59:37+02:00",
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
|| `200140400007` | `basket item is not saved - bad data`

Позиция не была создана. Ошибка возникает, если передан неверный идентификатор товара или же товар неактивен
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
|| `200040300010` | Недостаточно прав для добавления
|| 
|| `100` | Не указаны обязательные параметры
||
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-basket-item-update.md)
- [{#T}](./sale-basket-item-get.md)
- [{#T}](./sale-basket-item-list.md)
- [{#T}](./sale-basket-item-delete.md)
- [{#T}](./sale-basket-item-get-fields.md)
- [{#T}](./sale-basket-item-add-catalog-product.md)
- [{#T}](./sale-basket-item-update-catalog-product.md)
- [{#T}](./sale-basket-item-get-catalog-product-fields.md)