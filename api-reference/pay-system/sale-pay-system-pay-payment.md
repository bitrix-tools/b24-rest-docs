# Оплатить заказ через конкретную платежную систему sale.paysystem.pay.payment

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на создание и редактирование заказов в CRM

Метод служит для оплаты заказа через конкретную платежную систему. Он вызывается после обработки ответа от платежной системы.

Для выполнения оплаты в системе должна существовать оплата, привязанная к указанной платежной системе.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PAYMENT_ID***
[`sale_order_payment.id`](../sale/data-types.md) | Идентификатор оплаты
||
|| **PAY_SYSTEM_ID***
[`sale_paysystem.ID`](../sale/data-types.md) | Идентификатор платежной системы
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PAYMENT_ID":1,"PAY_SYSTEM_ID":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paysystem.pay.payment
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PAYMENT_ID":1,"PAY_SYSTEM_ID":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.pay.payment
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.paysystem.pay.payment',
    		{
    			"PAYMENT_ID": 1,
    			"PAY_SYSTEM_ID": 1,
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'sale.paysystem.pay.payment',
                [
                    'PAYMENT_ID'    => 1,
                    'PAY_SYSTEM_ID' => 1,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling sale.paysystem.pay.payment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sale.paysystem.pay.payment', {
            "PAYMENT_ID": 1,
            "PAY_SYSTEM_ID": 1,
        }, 
        function(result) 
        { 
            if (result.error()) 
            {
                console.error(result.error()); 
            }
            else 
            { 
                console.dir(result.data()); 
            } 
        } 
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.pay.payment',
        [
            'PAYMENT_ID' => 1,
            'PAY_SYSTEM_ID' => 1
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
    "result": true,
    "time": {
        "start": 1712135335.026931,
        "finish": 1712135335.407762,
        "duration": 0.3808310031890869,
        "processing": 0.0336611270904541,
        "date_start": "2024-04-03T11:08:55+02:00",
        "date_finish": "2024-04-03T11:08:55+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат оплаты заказа ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": " ERROR_CHECK_FAILURE",
    "error_description": "Pay system not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для изменения статуса оплаты | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение одного из обязательных полей, не найдена указанная платежная система либо не найдена оплата с указанным `ID` и указанной платежной системой (детали смотрите в описании ошибки) | 400 ||
|| `ERROR_PROCESS_REQUEST_RESULT` | Ошибка при обработке запроса платежной системой (детали смотрите в описании ошибки) | 400 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-add.md)
- [{#T}](./sale-pay-system-handler-update.md)
- [{#T}](./sale-pay-system-handler-list.md)
- [{#T}](./sale-pay-system-handler-delete.md)
- [{#T}](./sale-pay-system-add.md)
- [{#T}](./sale-pay-system-update.md)
- [{#T}](./sale-pay-system-list.md)
- [{#T}](./sale-pay-system-delete.md)
- [{#T}](./sale-pay-system-settings-get.md)
- [{#T}](./sale-pay-system-settings-update.md)
- [{#T}](./sale-pay-system-pay-invoice.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
- [{#T}](./sale-pay-system-settings-invoice-get.md)