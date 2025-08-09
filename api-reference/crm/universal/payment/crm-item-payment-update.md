# Изменить поля оплаты crm.item.payment.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение заказа оплаты

Метод изменяет ограниченный набор полей оплаты (см. [`sale.payment.update`](../../../sale/payment/sale-payment-update.md), если требуется возможность расширенной работы с полями оплаты).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_payment.id`](../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты ||
|| **fields***
[`object`](../../../../api-reference/data-types.md) | Значения полей для обновления оплаты  ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **paid**
[`string`](../../../../api-reference/data-types.md) | Статус оплаты.

Возможные значения:
- `Y` – Оплачена
- `N` – Не оплачена ||
|| **paySystemId**
[`sale_paysystem.id`](../../../sale/data-types.md#sale_paysystem) | Идентификатор платежной системы
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1036,"fields":{"paid":"Y","paySystemId":110}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1036,"fields":{"paid":"Y","paySystemId":110},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.payment.update', {
    			id: 1036,
    			fields: {
    				paid: "Y",
    				paySystemId: 110,
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
                'crm.item.payment.update',
                [
                    'id' => 1036,
                    'fields' => [
                        'paid' => "Y",
                        'paySystemId' => 110,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating payment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.update', {
            id: 1036,
            fields: {
                paid: "Y",
                paySystemId: 110,
            }
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
        'crm.item.payment.update',
        [
            'id' => 1036,
            'fields' => [
                'paid' => 'Y',
                'paySystemId' => 110,
            ]
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
      "start":1716212943.651507,
      "finish":1716212944.578154,
      "duration":0.9266471862792969,
      "processing":0.6742370128631592,
      "date_start":"2024-05-20T16:49:03+03:00",
      "date_finish":"2024-05-20T16:49:04+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../api-reference/data-types.md) | Результат проведения операции  ||
|| **time**
[`time`](../../../../api-reference/data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Недостаточно прав"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | Оплата не найдена или доступ запрещен ||
|| `0` | Платежная система не найдена  ||
|| `100` | Не указан параметр id ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-delete.md)
- [{#T}](./crm-item-payment-get.md)
- [{#T}](./crm-item-payment-list.md)
- [{#T}](./crm-item-payment-pay.md)
- [{#T}](./crm-item-payment-unpay.md)
- [{#T}](./crm-item-payment-add.md)
