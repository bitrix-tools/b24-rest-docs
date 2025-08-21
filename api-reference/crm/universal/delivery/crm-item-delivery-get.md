# Получить информацию о доставке по id crm.item.delivery.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение заказа доставки

Метод получает краткую информацию о доставке.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment.id`](../../../sale/data-types.md#sale_order_shipment) | Идентификатор доставки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4077}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.delivery.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4077,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.delivery.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.delivery.get', {
    			id: 4077,
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
                'crm.item.delivery.get',
                [
                    'id' => 4077,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting delivery item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.delivery.get', {
            id: 4077,
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
        'crm.item.delivery.get',
        [
            'id' => 4077
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
      "id":4077,
      "accountNumber":"3657\/2",
      "priceDelivery":79.99,
      "currency":"RUB",
      "deducted":"N",
      "dateDeducted":null,
      "deliveryId":228,
      "deliveryName":"Uber Taxi (Cargo)"
   },
   "time":{
      "start":1716369295.614557,
      "finish":1716369296.143089,
      "duration":0.5285320281982422,
      "processing":0.2371680736541748,
      "date_start":"2024-05-22T12:14:55+03:00",
      "date_finish":"2024-05-22T12:14:56+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_order_shipment_crm_simple`](#sale_order_shipment_crm_simple) | Объект, содержащий краткую информацию о доставке ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Ключ result. Объект типа 
### sale_order_shipment_crm_simple 

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`sale_order_shipment.id`](../../../sale/data-types.md#sale_order_shipment) | Идентификатор доставки ||
|| **accountNumber**
[`string`](../../../data-types.md) | Системный номер доставки  ||
|| **deducted**
[`string`](../../../data-types.md) | Признак того, является ли доставка отгруженной.
Возможные значения:
- `Y` — да (отгружена)
- `N` — нет (не отгружена)
 ||
|| **dateDeducted**
[`datetime`](../../../data-types.md)  | Дата изменения флага отгруженности отгрузки ||
|| **priceDelivery**
[`double`](../../../data-types.md)  | Стоимость доставки ||
|| **currency**
[`string`](../../../data-types.md)  | Валюта доставки ||
|| **deliveryId**
[`sale_delivery_service.ID`](../../../sale/data-types.md#sale_delivery_service)  | Идентификатор службы доставки ||
|| **deliveryName**
[`string`](../../../data-types.md)  | Название службы доставки ||
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

- [{#T}](./crm-item-delivery-list.md)