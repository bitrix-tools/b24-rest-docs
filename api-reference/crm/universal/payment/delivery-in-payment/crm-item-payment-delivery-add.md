# Добавить позицию доставки в оплату crm.item.payment.delivery.add

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение заказа, в оплату которого добавляется позиция доставки

Метод добавляет позицию доставки в оплату.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **paymentId***
[`sale_order_payment.id`](../../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты.
Можно получить с помощью метода [`sale.payment.list`](../../../../sale/payment/sale-payment-list.md) ||
|| **deliveryId***
[`sale_order_shipment.id`](../../../../sale/data-types.md#sale_order_shipment) | Идентификатор доставки.
Можно получить с помощью метода [`crm.item.delivery.list`](../../delivery/crm-item-delivery-list.md) (ключ id) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"deliveryId":4072}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.delivery.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"deliveryId":4072,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.delivery.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.payment.delivery.add', {
    			paymentId: 1039,
    			deliveryId: 4072
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
                'crm.item.payment.delivery.add',
                [
                    'paymentId'  => 1039,
                    'deliveryId' => 4072,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding payment delivery: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.delivery.add', {
            paymentId: 1039,
            deliveryId: 4072
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
        'crm.item.payment.delivery.add',
        [
            'paymentId' => 1039,
            'deliveryId' => 4072
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
   "result":1199,
   "time":{
      "start":1716295802.83799,
      "finish":1716295804.17372,
      "duration":1.3357298374176025,
      "processing":0.8379831314086914,
      "date_start":"2024-05-21T15:50:02+03:00",
      "date_finish":"2024-05-21T15:50:04+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../../data-types.md) | Идентификатор позиции доставки в оплате ||
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
|| `0` | Позиция доставки не найдена ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-delivery-list.md)
- [{#T}](./crm-item-payment-delivery-delete.md)
- [{#T}](./crm-item-payment-delivery-set-delivery.md)