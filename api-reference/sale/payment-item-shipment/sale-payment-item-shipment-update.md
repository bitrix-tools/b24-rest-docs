# Изменить привязку оплаты к отгрузке sale.paymentItemShipment.update

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет привязку оплаты к отгрузке.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_payment_item_shipment.id`](../data-types.md) | Идентификатор привязки оплаты к отгрузке ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для создания привязки оплаты к отгрузке в виде структуры:

```js
fields: {
    xmlId: 'значение'
}
```

||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
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
    -d '{"id":1181,"fields":{"xmlId":"myNewXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paymentitemshipment.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1181,"fields":{"xmlId":"myNewXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paymentitemshipment.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.paymentitemshipment.update', {
    			id: 1181,
    			fields: {
    				xmlId: 'myNewXmlId',
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
                'sale.paymentitemshipment.update',
                [
                    'id' => 1181,
                    'fields' => [
                        'xmlId' => 'myNewXmlId',
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
        echo 'Error updating payment item shipment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.paymentitemshipment.update', {
            id: 1181,
            fields: {
                xmlId: 'myNewXmlId',
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
        'sale.paymentitemshipment.update',
        [
            'id' => 1181,
            'fields' => [
                'xmlId' => 'myNewXmlId',
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
            "xmlId":"myNewXmlId"
        }
    },
    "time":{
        "start":1713167192.849789,
        "finish":1713167193.547071,
        "duration":0.697282075881958,
        "processing":0.4292449951171875,
        "date_start":"2024-04-15T10:46:32+03:00",
        "date_finish":"2024-04-15T10:46:33+03:00"
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
[`sale_payment_item_shipment`](../data-types.md) | Объект с информацией об обновленной привязке оплаты к отгрузке ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201240400001,
    "error_description":"payment item is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201240400001` | Обновляемая привязка оплаты к отгрузке не найдена ||
|| `200040300020` | Недостаточно прав для обновления привязки оплаты к отгрузке ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-payment-item-shipment-add.md)
- [{#T}](./sale-payment-item-shipment-get.md)
- [{#T}](./sale-payment-item-shipment-list.md)
- [{#T}](./sale-payment-item-shipment-delete.md)
- [{#T}](./sale-payment-item-shipment-get-fields.md)
