# Добавить привязку элемента корзины к оплате sale.paymentitembasket.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет привязку элемента корзины к оплате.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания привязки элемента корзины к оплате ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **paymentId***
[`sale_order_payment.id`](../data-types.md) | Идентификатор оплаты ||
|| **basketId***
[`sale_basket_item.id`](../data-types.md) | Идентификатор элемента корзины ||
|| **quantity**
[`double`](../../data-types.md) | Количество товара ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор записи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"quantity":3,"basketId":2722,"paymentId":1025,"xmlId":"myXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paymentitembasket.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"quantity":3,"basketId":2722,"paymentId":1025,"xmlId":"myXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paymentitembasket.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.paymentitembasket.add', {
    			fields: {
    				quantity: 3,
    				basketId: 2722,
    				paymentId: 1025,
    				xmlId: 'myXmlId',
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
                'sale.paymentitembasket.add',
                [
                    'fields' => [
                        'quantity'  => 3,
                        'basketId'  => 2722,
                        'paymentId' => 1025,
                        'xmlId'     => 'myXmlId',
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
        echo 'Error adding payment item to basket: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.paymentitembasket.add', {
            fields: {
                quantity: 3,
                basketId: 2722,
                paymentId: 1025,
                xmlId: 'myXmlId',
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
        'sale.paymentitembasket.add',
        [
            'fields' =>
            [
                'quantity' => 3,
                'basketId' => 2722,
                'paymentId' => 1025,
                'xmlId' => 'myXmlId',
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
        "paymentItemBasket":{
            "basketId":2722,
            "dateInsert":"2024-04-17T09:37:45+03:00",
            "id":1186,
            "paymentId":1025,
            "quantity":3,
            "xmlId":"myXmlId"
        }
    },
    "time":{
        "start":1713339465.349855,
        "finish":1713339465.968993,
        "duration":0.6191380023956299,
        "processing":0.38312196731567383,
        "date_start":"2024-04-17T10:37:45+03:00",
        "date_finish":"2024-04-17T10:37:45+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **paymentItemBasket**
[`sale_payment_item_basket`](../data-types.md) | Объект с информацией о добавленной привязке элемента корзины к оплате ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201240400002,
    "error_description":"payment not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201250000001` | Элемент с указанными значениями полей `paymentId` и `basketId` уже существует ||
|| `201240400002` | Оплата не найдена. Некорректное значение переданного параметра `paymentId` ||
|| `201240400003` | Элемент корзины не найден. Некорректное значение переданного параметра `basketId` ||
|| `200040300020` | Недостаточно прав для добавления привязки элемента корзины к оплате ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-payment-item-basket-update.md)
- [{#T}](./sale-payment-item-basket-get.md)
- [{#T}](./sale-payment-item-basket-list.md)
- [{#T}](./sale-payment-item-basket-delete.md)
- [{#T}](./sale-payment-item-basket-get-fields.md)