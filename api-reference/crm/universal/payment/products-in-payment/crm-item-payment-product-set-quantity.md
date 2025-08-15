# Изменить количество товара crm.item.payment.product.setQuantity

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение заказа оплаты

Метод изменяет количество товара в товарной позиции оплаты.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор товарной позиции в оплате ||
|| **quantity***
[`double`](../../../../data-types.md) | Количество товара ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1195,"quantity":3}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.product.setQuantity
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1195,"quantity":3,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.product.setQuantity
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.payment.product.setQuantity', {
    			id: 1195,
    			quantity: 3
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
                'crm.item.payment.product.setQuantity',
                [
                    'id'       => 1195,
                    'quantity' => 3,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting product quantity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.product.setQuantity', {
            id: 1195,
            quantity: 3
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
        'crm.item.payment.product.setQuantity',
        [
            'id' => 1195,
            'quantity' => 3
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
      "start":1716282831.283905,
      "finish":1716282832.02954,
      "duration":0.7456350326538086,
      "processing":0.4978060722351074,
      "date_start":"2024-05-21T12:13:51+03:00",
      "date_finish":"2024-05-21T12:13:52+03:00"
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
|| `0` | Товарная позиция не найдена ||
|| `0` | Доступ запрещен ||
|| `0` | Количество товара не может быть меньше либо равно 0 ||
|| `0` | Недостаточно товара для добавления в оплату ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-product-add.md)
- [{#T}](./crm-item-payment-product-list.md)
- [{#T}](./crm-item-payment-product-delete.md)