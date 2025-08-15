# Получить поля отгрузки sale.shipment.get

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает значения всех полей отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment.id`](../data-types.md) | Идентификатор отгрузки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2465}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipment.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2465,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.shipment.get", {
    			"id": 2465
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
                'sale.shipment.get',
                [
                    'id' => 2465,
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
        echo 'Error getting shipment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipment.get", {
            "id": 2465
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
        'sale.shipment.get',
        [
            'id' => 2465
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
      "shipment":{
         "accountNumber":"2069\/2",
         "allowDelivery":"N",
         "basePriceDelivery":600,
         "canceled":"N",
         "comments":"",
         "companyId":0,
         "currency":"RUB",
         "customPriceDelivery":"N",
         "dateAllowDelivery":null,
         "dateCanceled":null,
         "dateDeducted":null,
         "dateInsert":"2024-04-11T15:05:48+03:00",
         "dateMarked":null,
         "dateResponsibleId":"2024-04-11T15:05:48+03:00",
         "deducted":"N",
         "deliveryDocDate":null,
         "deliveryDocNum":"",
         "deliveryId":2,
         "deliveryName":"Доставка курьером",
         "deliveryXmlId":"",
         "discountPrice":0,
         "empAllowDeliveryId":null,
         "empCanceledId":null,
         "empDeductedId":null,
         "empMarkedId":null,
         "empResponsibleId":null,
         "externalDelivery":"N",
         "id":2465,
         "id1c":"",
         "marked":"N",
         "orderId":2069,
         "priceDelivery":600,
         "reasonMarked":"",
         "reasonUndoDeducted":"",
         "responsibleId":0,
         "shipmentItems":[
            {
               "basketId":2721,
               "dateInsert":"2024-04-11T15:05:51+03:00",
               "id":10,
               "orderDeliveryId":2465,
               "quantity":1,
               "reservedQuantity":1,
               "xmlId":"bx_6617e02cb74f9"
            }
         ],
         "statusId":"DN",
         "statusXmlId":"FFdddd",
         "system":"N",
         "trackingDescription":"",
         "trackingLastCheck":"",
         "trackingNumber":"",
         "trackingStatus":"",
         "updated1c":"N",
         "version1c":"",
         "xmlId":"bx_6617e02cae2a1"
      }
   },
   "time":{
      "start":1712840827.02634,
      "finish":1712840827.41618,
      "duration":0.38983988761901855,
      "processing":0.21664810180664062,
      "date_start":"2024-04-11T16:07:07+03:00",
      "date_finish":"2024-04-11T16:07:07+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **property**
[`sale_order_shipment`](../data-types.md) | Информация об отгрузке ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":201140400001,
   "error_description":"shipment is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201140400001` | Отгрузка не найдена ||
|| `200040300010` | Недостаточно прав для чтения отгрузки ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-add.md)
- [{#T}](./sale-shipment-update.md)
- [{#T}](./sale-shipment-list.md)
- [{#T}](./sale-shipment-delete.md)
- [{#T}](./sale-shipment-get-fields.md)