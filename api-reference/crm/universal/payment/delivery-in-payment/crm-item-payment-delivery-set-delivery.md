# Перепривязать позицию доставки к другому документу crm.item.payment.delivery.setDelivery

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение заказа оплаты

Метод перепривязывает позицию доставки к другому документу доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор позиции доставки в оплате.
Можно получить с помощью метода [`crm.item.payment.delivery.list`](./crm-item-payment-delivery-list.md)  ||
|| **deliveryId***
[`sale_order_shipment.id`](../../../../sale/data-types.md#sale_order_shipment) | Идентификатор доставки.

Можно получить с помощью метода [`crm.item.delivery.list`](../../delivery/crm-item-delivery-list.md) (ключ id)  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1201,"deliveryId":4073}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.delivery.setDelivery
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1201,"deliveryId":4073,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.delivery.setDelivery
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.payment.delivery.setDelivery', {
    			id: 1201,
    			deliveryId: 4073,
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
                'crm.item.payment.delivery.setDelivery',
                [
                    'id'         => 1201,
                    'deliveryId' => 4073,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting delivery for payment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.delivery.setDelivery', {
            id: 1201,
            deliveryId: 4073,
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
        'crm.item.payment.delivery.setDelivery',
        [
            'id' => 1201,
            'deliveryId' => 4073
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
   "result":true,
   "time":{
      "start":1716296989.985067,
      "finish":1716296991.216063,
      "duration":1.2309961318969727,
      "processing":0.8141369819641113,
      "date_start":"2024-05-21T16:09:49+03:00",
      "date_finish":"2024-05-21T16:09:51+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Результат операции ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Payable item has not been found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | Позиция доставки не найдена ||
|| `0` | Доступ запрещен ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-delivery-add.md)
- [{#T}](./crm-item-payment-delivery-delete.md)
- [{#T}](./crm-item-payment-delivery-list.md)
