# Добавить товарную позицию в оплату crm.item.payment.product.add

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение заказа, в оплату которого добавляется товарная позиция


Метод добавляет товарную позицию в оплату.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **paymentId***
[`sale_order_payment.id`](../../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты.
Можно получить с помощью метода [`sale.payment.list`](../../../../sale/payment/sale-payment-list.md)
 ||
 || **rowId***
[`integer`](../../../../data-types.md) | Идентификатор товарной позиции в объекте CRM.
Можно получить с помощью [`crm.item.productrow.list`](../../../../crm/universal/product-rows/crm-item-productrow-list.md)
 ||
 || **quantity***
[`double`](../../../../data-types.md)| Количество товара ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"rowId":17587,"quantity":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.product.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"rowId":17587,"quantity":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.product.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.payment.product.add', {
    			paymentId: 1039,
    			rowId: 17587,
    			quantity: 2
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
                'crm.item.payment.product.add',
                [
                    'paymentId' => 1039,
                    'rowId'     => 17587,
                    'quantity'  => 2
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding payment product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.product.add', {
            paymentId: 1039,
            rowId: 17587,
            quantity: 2
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.payment.product.add',
        [
            'paymentId' => 1039,
            'rowId' => 17587,
            'quantity' => 2
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
   "result":1193,
   "time":{
      "start":1716276648.349503,
      "finish":1716276649.261574,
      "duration":0.9120709896087646,
      "processing":0.6422691345214844,
      "date_start":"2024-05-21T10:30:48+03:00",
      "date_finish":"2024-05-21T10:30:49+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../../data-types.md) | Идентификатор товарной позиции в оплате ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Payment has not been found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | Оплата не найдена ||
|| `0` | Доступ запрещен ||
|| `0` | Товарная позиция не найдена ||
|| `0` | Недостаточно товара для добавления в оплату ||
|| `0` | Количество товара не может быть меньше либо равно 0 ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-product-set-quantity.md)
- [{#T}](./crm-item-payment-product-list.md)
- [{#T}](./crm-item-payment-product-delete.md)