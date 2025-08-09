# Создать оповещения по транспортной заявке sale.delivery.request.sendmessage

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод создает оповещения по транспортной заявке.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DELIVERY_ID***
[`sale_delivery_service.ID`](../../data-types.md) | Идентификатор службы доставки, к которой относится транспортная заявка.

Получить идентификаторы `sale_delivery_service.ID` служб доставки можно с помощью метода [sale.delivery.getlist](../delivery/sale-delivery-get-list.md)
||
|| **REQUEST_ID***
[`string`](../../../data-types.md) | Идентификатор транспортной заявки.

Идентификатор назначается внешней системой в ответе вебхука на создание заказа на доставку (подробнее в описании вебхука [Создание заказа на доставку](../webhooks/create-delivery-request.md))
||
|| **ADDRESSEE***
[`string`](../../../data-types.md) | Адресат сообщения.

Возможные значения:
- `MANAGER` — менеджер
- `RECIPIENT` — получатель груза
||
|| **MESSAGE***
[`object`](../../../data-types.md) | Сообщение (подробное описание приведено [ниже](#parametr-message))
||
|#

### Параметр MESSAGE {#parametr-message}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SUBJECT***
[`string`](../../../data-types.md) | Заголовок сообщения.

Обязательно нужно заполнить хотя бы одно из следующих полей: `SUBJECT`, `BODY`
||
|| **BODY***
[`string`](../../../data-types.md) | Тело сообщения.

В теле сообщения возможно использование макросов для замены времени и денежных значений.

Обязательно нужно заполнить хотя бы одно из следующих полей: `SUBJECT`, `BODY`
||
|| **STATUS**
[`object`](../../../data-types.md) | Статус сообщения (подробное описание приведено [ниже](#parametr-status))
||
|| **MONEY_VALUES**
[`object`](../../../data-types.md) | Объект в формате `ключ => значение`. 

Используется для замены денежных значений в теле сообщения (смотрите пример ниже)
||
|#

### Параметр STATUS {#parametr-status}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE***
[`string`](../../../data-types.md) | Текстовое название статуса сообщения
||
|| **SEMANTIC***
[`string`](../../../data-types.md) | Значение семантики статуса.

Возможные значения:
- `success` — успех
- `process` — в процессе
- `error` — ошибка
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":225,"REQUEST_ID":"4757aca4931a4f029f49c0db4374d13d","ADDRESSEE":"MANAGER","MESSAGE":{"SUBJECT":"Your order is on its way","BODY":"Estimated delivery price: #MONEY#","MONEY_VALUES":{"#MONEY#":351.2},"STATUS":{"MESSAGE":"Success","SEMANTIC":"success"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.delivery.request.sendmessage
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":225,"REQUEST_ID":"4757aca4931a4f029f49c0db4374d13d","ADDRESSEE":"MANAGER","MESSAGE":{"SUBJECT":"Your order is on its way","BODY":"Estimated delivery price: #MONEY#","MONEY_VALUES":{"#MONEY#":351.2},"STATUS":{"MESSAGE":"Success","SEMANTIC":"success"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.request.sendmessage
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.request.sendmessage', {
    			DELIVERY_ID: 225,
    			REQUEST_ID: "4757aca4931a4f029f49c0db4374d13d",
    			ADDRESSEE: "MANAGER",
    			MESSAGE: {
    				SUBJECT: "Your order is on its way",
    				BODY: "Estimated delivery price: #MONEY#",
    				MONEY_VALUES: {
    					"#MONEY#": 351.2,
    				},
    				STATUS: {
    					MESSAGE: "Success",
    					SEMANTIC: "success",
    				},
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error()) {
    		console.error(result.error());
    	} else {
    		console.info(result);
    	}
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
                'sale.delivery.request.sendmessage',
                [
                    'DELIVERY_ID' => 225,
                    'REQUEST_ID' => "4757aca4931a4f029f49c0db4374d13d",
                    'ADDRESSEE' => "MANAGER",
                    'MESSAGE' => [
                        'SUBJECT' => "Your order is on its way",
                        'BODY' => "Estimated delivery price: #MONEY#",
                        'MONEY_VALUES' => [
                            "#MONEY#" => 351.2,
                        ],
                        'STATUS' => [
                            'MESSAGE' => "Success",
                            'SEMANTIC' => "success",
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending delivery message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.request.sendmessage', {
            DELIVERY_ID: 225,
            REQUEST_ID: "4757aca4931a4f029f49c0db4374d13d",
            ADDRESSEE: "MANAGER",
            MESSAGE: {
                SUBJECT: "Your order is on its way",
                BODY: "Estimated delivery price: #MONEY#",
                MONEY_VALUES: {
                    "#MONEY#": 351.2,
                },
                STATUS: {
                    MESSAGE: "Success",
                    SEMANTIC: "success",
                },
            },
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
        'sale.delivery.request.sendmessage',
        [
            'DELIVERY_ID' => 225,
            'REQUEST_ID' => "4757aca4931a4f029f49c0db4374d13d",
            'ADDRESSEE' => "MANAGER",
            'MESSAGE' => [
                'SUBJECT' => "Your order is on its way",
                'BODY' => "Estimated delivery price: #MONEY#",
                'MONEY_VALUES' => [
                    "#MONEY#" => 351.2,
                ],
                'STATUS' => [
                    'MESSAGE' => "Success",
                    'SEMANTIC' => "success",
                ],
            ],
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
    "result":true,
    "time":{
        "start":1714561617.200821,
        "finish":1714561617.526123,
        "duration":0.3253021240234375,
        "processing":0.1471860408782959,
        "date_start":"2024-05-01T14:06:57+03:00",
        "date_finish":"2024-05-01T14:06:57+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат отправки сообщения по транспортной заявке ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error":"DELIVERY_NOT_FOUND",
    "error_description":"Delivery service has not been found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `DELIVERY_ID_NOT_SPECIFIED` | Не указан идентификатор службы доставки | `400` || 
|| `DELIVERY_NOT_FOUND` | Служба доставки не найдена | `400` || 
|| `REQUEST_ID_NOT_SPECIFIED` | Не указан идентификатор транспортной заявки | `400` ||
|| `REQUEST_NOT_FOUND` | Транспортная заявка не найдена | `400` ||
|| `ADDRESSEE_IS_NOT_SPECIFIED` | Не указан получатель сообщения | `400` ||
|| `ADDRESSEE_UNEXPECTED_VALUE` | Неизвестный получатель сообщения.

Допустимые значения:
- `MANAGER` — менеджер
- `RECIPIENT` — получатель груза
| `400` ||
|| `MESSAGE_NOT_SPECIFIED` | Не указано сообщение.

Либо заголовок, либо тело сообщения должны быть указаны обязательно
| `400` ||
|| `MESSAGE_STATUS_NOT_SPECIFIED` | Не указан статус сообщения
| `400` ||
|| `MESSAGE_STATUS_SEMANTIC_NOT_SPECIFIED` | Не указана семантика статуса сообщения
| `400` ||
|| `UNEXPECTED_MESSAGE_STATUS_SEMANTIC` | Неизвестная семантика статуса сообщения
| `400` ||
|| `REQUEST_SHIPMENT_NOT_FOUND` | Не найдены отгрузки, привязанные к указанной транспортной заявке
| `400` ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления службы доставки | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-request-update.md)
- [{#T}](./sale-delivery-request-delete.md)