# Получить информацию об оплате crm.item.payment.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение заказа оплаты

Метод получает краткую информацию об оплате.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_payment.id`](../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1036}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1036,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.payment.get', {
    			id: 1036,
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
                'crm.item.payment.get',
                [
                    'id' => 1036,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting payment item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.get', {
            id: 1036,
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
        'crm.item.payment.get',
        [
            'id' => 1036
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
   "result":{
      "id":1036,
      "accountNumber":"3653\/1",
      "paid": "Y",
      "datePaid":"2024-05-20T12:32:02+03:00",
      "empPaidId":1,
      "paySystemId":6,
      "sum":0,
      "currency":"RUB",
      "paySystemName":"Наличные"
   },
   "time":{
      "start":1716203536.414886,
      "finish":1716203536.798211,
      "duration":0.38332509994506836,
      "processing":0.052394866943359375,
      "date_start":"2024-05-20T14:12:16+03:00",
      "date_finish":"2024-05-20T14:12:16+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_order_payment_crm_simple`](#sale_order_payment_crm_simple) | Объект, содержащий краткую информацию об оплате  ||
|| **time**
[`time`](../../../../api-reference/data-types.md) | Информация о времени выполнения запроса ||
|#

### Ключ result. Объект типа sale_order_payment_crm_simple {#sale_order_payment_crm_simple}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`sale_order_payment.id`](../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты ||
|| **accountNumber**
[`string`](../../../../api-reference/data-types.md) | Системный номер оплаты ||
|| **paid**
[`string`](../../../../api-reference/data-types.md) | Статус оплаты

Возможные значения:
- `Y` – Оплачена
- `N` – Не оплачена ||
|| **datePaid**
[`datetime`](../../../../api-reference/data-types.md) | Дата оплаты ||
|| **empPaidId**
[`user.id`](../../../../api-reference/data-types.md)| Пользователь, который внес оплату ||
|| **paySystemId**
[`sale_paysystem.id`](../../../sale/data-types.md#sale_paysystem) | Идентификатор платежной системы ||
|| **sum**
[`double`](../../../../api-reference/data-types.md) | Сумма оплаты ||
|| **currency**
[`string`](../../../../api-reference/data-types.md) | Валюта оплаты ||
|| **paySystemName**
[`string`](../../../../api-reference/data-types.md) | Наименование платежной системы ||
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
|| `100` | Не указан параметр id ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-update.md)
- [{#T}](./crm-item-payment-delete.md)
- [{#T}](./crm-item-payment-list.md)
- [{#T}](./crm-item-payment-pay.md)
- [{#T}](./crm-item-payment-unpay.md)
- [{#T}](./crm-item-payment-add.md)