# Добавить привязку оплаты к отгрузке sale.paymentItemShipment.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет привязку оплаты к отгрузке.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для создания привязки оплаты к отгрузке в виде структуры:

```js
fields: {
    shipmentId: значение,
    paymentId: значение,
    xmlId: 'значение'
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **shipmentId***
[`sale_order_shipment.id`](../data-types.md) | Идентификатор отгрузки ||
|| **paymentId***
[`sale_order_payment.id`](../data-types.md) | Идентификатор оплаты ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор записи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"shipmentId":2471,"paymentId":1025,"xmlId":"myXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paymentitemshipment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"shipmentId":2471,"paymentId":1025,"xmlId":"myXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paymentitemshipment.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.paymentitemshipment.add', {
    			fields: {
    				shipmentId: 2471,
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
                'sale.paymentitemshipment.add',
                [
                    'fields' => [
                        'shipmentId' => 2471,
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
        echo 'Error adding payment item shipment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.paymentitemshipment.add', {
            fields: {
                shipmentId: 2471,
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
        'sale.paymentitemshipment.add',
        [
            'fields' => [
                'shipmentId' => 2471,
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
        "paymentItemShipment":{
            "dateInsert":"2024-04-15T09:22:26+03:00",
            "id":1181,
            "paymentId":1025,
            "shipmentId":2471,
            "xmlId":"myXmlId"
        }
    },
    "time":{
        "start":1713165816.941795,
        "finish":1713165817.220281,
        "duration":0.2784857749938965,
        "processing":0.045699119567871094,
        "date_start":"2024-04-15T10:23:36+03:00",
        "date_finish":"2024-04-15T10:23:37+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **paymentItemShipment**
[`sale_payment_item_shipment`](../data-types.md) | Объект с информацией о добавленной привязке оплаты к отгрузке ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201240400003,
    "error_description":"shipment not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201250000001` | Элемент с указанными значениями полей `shipmentId` и `paymentId` уже существует.
 
В случае, если требуется изменить указанный ранее внешний идентификатор привязки, нужно воспользоваться методом [sale.paymentitemshipment.update](./sale-payment-item-shipment-update.md)
||
|| `201240400002` | Оплата не найдена. Некорректное значение переданного параметра `paymentId` ||
|| `201240400003` | Отгрузка не найдена. Некорректное значение переданного параметра `shipmentId` ||
|| `200040300020` | Недостаточно прав для добавления привязки оплаты к отгрузке ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-payment-item-shipment-update.md)
- [{#T}](./sale-payment-item-shipment-get.md)
- [{#T}](./sale-payment-item-shipment-list.md)
- [{#T}](./sale-payment-item-shipment-delete.md)
- [{#T}](./sale-payment-item-shipment-get-fields.md)