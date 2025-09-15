# Добавить элемент в табличную часть отгрузки sale.shipmentitem.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.shipmentitem.add` добавляет элемент в табличную часть отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания элемента табличной части отгрузки ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderDeliveryId***
[`sale_order_shipment.id`](../data-types.md) | Идентификатор отгрузки ||
|| **basketId***
[`sale_basket_item.id`](../data-types.md) | Идентификатор корзины ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущей товарной позиции доставки с аналогичной позицией во внешней системе ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderDeliveryId":33,"basketId":18,"quantity":1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipmentitem.add
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderDeliveryId":33,"basketId":18,"quantity":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentitem.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.shipmentitem.add',
    		{
    			fields: {
    				orderDeliveryId: 33,
    				basketId: 18,
    				quantity: 1
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
                'sale.shipmentitem.add',
                [
                    'fields' => [
                        'orderDeliveryId' => 33,
                        'basketId'        => 18,
                        'quantity'        => 1,
                    ],
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
        echo 'Error adding shipment item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.shipmentitem.add',
        {
            fields: {
                orderDeliveryId: 33,
                basketId: 18,
                quantity: 1
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
        'sale.shipmentitem.add',
        [
            'fields' => [
                'orderDeliveryId' => 33,
                'basketId' => 18,
                'quantity' => 1
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
        "shipmentItem":{
            "basketId":2716,
            "dateInsert":"2024-04-11T09:10:34+03:00",
            "id":7,
            "orderDeliveryId":2431,
            "quantity":3,
            "reservedQuantity":0,
            "xmlId":"myXmlId"
        }
    },
    "time":{
        "start":1712819431.708122,
        "finish":1712819435.985352,
        "duration":4.2772300243377686,
        "processing":4.085968971252441,
        "date_start":"2024-04-11T10:10:31+03:00",
        "date_finish":"2024-04-11T10:10:35+03:00"
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
[`sale_order_shipment_item`](../data-types.md) | Объект с информацией о добавленном элементе табличной части отгрузки ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201250000001,
    "error_description":"Duplicate entry for key [basketId, orderDeliveryId]"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201250000001` | Элемент с указанными значениями полей `basketId` и `orderDeliveryId` уже существует.

Для изменения значения количества товара воспользуйтесь методом [`sale.shipmentitem.update`](./sale-shipment-item-update.md) ||
|| `201240400002` | Отгрузка не найдена. Некорректное значение переданного параметра `orderDeliveryId` ||
|| `201240400003` | Корзина не найдена. Некорректное значение переданного параметра `basketId` ||
|| `200040300020` | Недостаточно прав для добавления элемента в табличную часть отгрузки ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-shipment-item-update.md)
- [{#T}](./sale-shipment-item-get.md)
- [{#T}](./sale-shipment-item-list.md)
- [{#T}](./sale-shipment-item-delete.md)
- [{#T}](./sale-shipment-item-get-fields.md)