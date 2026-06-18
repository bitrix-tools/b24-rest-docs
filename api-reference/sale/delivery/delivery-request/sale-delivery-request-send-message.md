# Создать оповещения по транспортной заявке sale.delivery.request.sendmessage

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.request.sendmessage
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":225,"REQUEST_ID":"4757aca4931a4f029f49c0db4374d13d","ADDRESSEE":"MANAGER","MESSAGE":{"SUBJECT":"Your order is on its way","BODY":"Estimated delivery price: #MONEY#","MONEY_VALUES":{"#MONEY#":351.2},"STATUS":{"MESSAGE":"Success","SEMANTIC":"success"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.request.sendmessage
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'sale.delivery.request.sendmessage',
        params: {
          DELIVERY_ID: 225,
          REQUEST_ID: '4757aca4931a4f029f49c0db4374d13d',
          ADDRESSEE: 'MANAGER',
          MESSAGE: {
            SUBJECT: 'Your order is on its way',
            BODY: 'Estimated delivery price: #MONEY#',
            MONEY_VALUES: {
              '#MONEY#': 351.2,
            },
            STATUS: {
              MESSAGE: 'Success',
              SEMANTIC: 'success',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Message sent successfully:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function sendDeliveryRequestMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.delivery.request.sendmessage',
            params: {
              DELIVERY_ID: 225,
              REQUEST_ID: '4757aca4931a4f029f49c0db4374d13d',
              ADDRESSEE: 'MANAGER',
              MESSAGE: {
                SUBJECT: 'Your order is on its way',
                BODY: 'Estimated delivery price: #MONEY#',
                MONEY_VALUES: {
                  '#MONEY#': 351.2,
                },
                STATUS: {
                  MESSAGE: 'Success',
                  SEMANTIC: 'success',
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Message sent successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendDeliveryRequestMessage)
    </script>
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
|| `ACCESS_DENIED` | Недостаточно прав для создания оповещения | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-request-update.md)
- [{#T}](./sale-delivery-request-delete.md)