# Обновить транспортную заявку sale.delivery.request.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет транспортную заявку.

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
|| **FINALIZE**
[`string`](../../../data-types.md) | Индикатор необходимости завершить (финализировать) транспортную заявку.

Подразумевается, что значение индикатора необходимо выставлять в `Y` в том случае, когда транспортная заявка выполнена. 

По умолчанию если не передано значение, то заявка не финализируется.

Возможные значения:
- `Y` — да
- `N` — нет
||
|| **STATUS**
[`object`](../../../data-types.md) | Статус транспортной заявки (подробное описание приведено [ниже](#parametr-status)) ||
|| **PROPERTIES**
[`object[]`](../../../data-types.md) | Свойства транспортной заявки (подробное описание приведено [ниже](#parametr-properties)) ||
|| **OVERWRITE_PROPERTIES**
[`string`](../../../data-types.md) | Индикатор необходимости полностью переписать значения свойств заявки при обновлении. 

По умолчанию свойства при обновлении только добавляются (эквивалент передачи значения `N`). Если вызывающей стороне требуется передать полный набор свойств и перезаписать существующие свойства, то необходимо выставлять значение этого индикатора в `Y`.

Возможные значения:
- `Y` — да
- `N` — нет
||
|#

### Параметр STATUS {#parametr-status}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TEXT***
[`string`](../../../data-types.md) | Текстовое название статуса транспортной заявки ||
|| **SEMANTIC***
[`string`](../../../data-types.md) | Значение семантики статуса.

Возможные значения:
- `process` — заявка в процессе выполнения
- `success` — заявка успешно выполнена
||
|#

### Параметр PROPERTIES {#parametr-properties}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../../data-types.md) | Название свойства ||
|| **VALUE***
[`string`](../../../data-types.md) | Значение свойства ||
|| **TAGS**
[`string[]`](../../../data-types.md) | Список тегов.

Возможные значения:
- `phone` — переданное значение будет отображаться как телефонный номер
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
    -d '{"DELIVERY_ID":225,"REQUEST_ID":"4757aca4931a4f029f49c0db4374d13d","STATUS":{"TEXT":"Performer found","SEMANTIC":"process"},"PROPERTIES":[{"NAME":"Car","VALUE":"Gray Skoda Octavia, a777zn"},{"NAME":"Driver","VALUE":"John Smith"},{"NAME":"Phone Number","VALUE":"+11111111111","TAGS":["phone"]},{"NAME":"Something else","VALUE":"Some value"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.request.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":225,"REQUEST_ID":"4757aca4931a4f029f49c0db4374d13d","STATUS":{"TEXT":"Performer found","SEMANTIC":"process"},"PROPERTIES":[{"NAME":"Car","VALUE":"Gray Skoda Octavia, a777zn"},{"NAME":"Driver","VALUE":"John Smith"},{"NAME":"Phone Number","VALUE":"+11111111111","TAGS":["phone"]},{"NAME":"Something else","VALUE":"Some value"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.request.update
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
        method: 'sale.delivery.request.update',
        params: {
          DELIVERY_ID: 225,
          REQUEST_ID: '4757aca4931a4f029f49c0db4374d13d',
          STATUS: {
            TEXT: 'Performer found',
            SEMANTIC: 'process',
          },
          PROPERTIES: [
            {
              NAME: 'Car',
              VALUE: 'Gray Skoda Octavia, a777zn',
            },
            {
              NAME: 'Driver',
              VALUE: 'John Smith',
            },
            {
              NAME: 'Phone Number',
              VALUE: '+11111111111',
              TAGS: ['phone'],
            },
            {
              NAME: 'Something else',
              VALUE: 'Some value',
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Delivery request updated:', result)
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
      async function updateDeliveryRequest() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.delivery.request.update',
            params: {
              DELIVERY_ID: 225,
              REQUEST_ID: '4757aca4931a4f029f49c0db4374d13d',
              STATUS: {
                TEXT: 'Performer found',
                SEMANTIC: 'process',
              },
              PROPERTIES: [
                {
                  NAME: 'Car',
                  VALUE: 'Gray Skoda Octavia, a777zn',
                },
                {
                  NAME: 'Driver',
                  VALUE: 'John Smith',
                },
                {
                  NAME: 'Phone Number',
                  VALUE: '+11111111111',
                  TAGS: ['phone'],
                },
                {
                  NAME: 'Something else',
                  VALUE: 'Some value',
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Delivery request updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDeliveryRequest)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.delivery.request.update',
                [
                    'DELIVERY_ID' => 225,
                    'REQUEST_ID' => "4757aca4931a4f029f49c0db4374d13d",
                    'STATUS' => [
                        'TEXT' => "Performer found",
                        'SEMANTIC' => "process",
                    ],
                    'PROPERTIES' => [
                        [
                            'NAME' => "Car",
                            'VALUE' => "Gray Skoda Octavia, a777zn",
                        ],
                        [
                            'NAME' => "Driver",
                            'VALUE' => "John Smith",
                        ],
                        [
                            'NAME' => "Phone Number",
                            'VALUE' => "+11111111111",
                            'TAGS' => [
                                "phone"
                            ],
                        ],
                        [
                            'NAME' => "Something else",
                            'VALUE' => "Some value",
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
        echo 'Error updating delivery request: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.request.update', {
            DELIVERY_ID: 225,
            REQUEST_ID: "4757aca4931a4f029f49c0db4374d13d",
            STATUS: {
                TEXT: "Performer found",
                SEMANTIC: "process",
            },
            PROPERTIES: [{
                    NAME: "Car",
                    VALUE: "Gray Skoda Octavia, a777zn",
                },
                {
                    NAME: "Driver",
                    VALUE: "John Smith",
                },
                {
                    NAME: "Phone Number",
                    VALUE: "+11111111111",
                    TAGS: [
                        "phone"
                    ],
                },
                {
                    NAME: "Something else",
                    VALUE: "Some value",
                },
            ],
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
        'sale.delivery.request.update',
        [
            'DELIVERY_ID' => 225,
            'REQUEST_ID' => "4757aca4931a4f029f49c0db4374d13d",
            'STATUS' => [
                'TEXT' => "Performer found",
                'SEMANTIC' => "process",
            ],
            'PROPERTIES' => [
                [
                    'NAME' => "Car",
                    'VALUE' => "Gray Skoda Octavia, a777zn",
                ],
                [
                    'NAME' => "Driver",
                    'VALUE' => "John Smith",
                ],
                [
                    'NAME' => "Phone Number",
                    'VALUE' => "+11111111111",
                    'TAGS' => [
                        "phone"
                    ],
                ],
                [
                    'NAME' => "Something else",
                    'VALUE' => "Some value",
                ],
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
    "result":true,
    "time":{
        "start":1714557963.841951,
        "finish":1714557964.052347,
        "duration":0.21039605140686035,
        "processing":0.04059791564941406,
        "date_start":"2024-05-01T13:06:03+03:00",
        "date_finish":"2024-05-01T13:06:04+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления транспортной заявки ||
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
|| `STATUS_UNEXPECTED_FORMAT` | Некорректный формат значения параметра `STATUS` | `400` ||
|| `STATUS_TEXT_NOT_SPECIFIED` | Не указано значение названия статуса | `400` ||
|| `STATUS_SEMANTIC_NOT_SPECIFIED` | Не указано значение семантики статуса | `400` ||
|| `PROPERTIES_UNEXPECTED_FORMAT` | Некорректный формат значения параметра `PROPERTIES` | `400` ||
|| `PROPERTY_VALUE_UNEXPECTED_FORMAT` | Некорректный формат одного из переданных свойств | `400` ||
|| `PROPERTY_VALUE_TAGS_UNEXPECTED_FORMAT` | Некорректный формат значения тегов свойства | `400` ||
|| `PROPERTY_VALUE_TAG_UNEXPECTED_FORMAT` | Некорректный формат значения тега свойства | `400` ||
|| `UNEXPECTED_REQUEST_FINALIZE_INDICATOR_VALUE` | Некорректное значение параметра `FINALIZE`.

Допустимые значения: `Y`, `N`
 | `400` ||
|| `UNEXPECTED_OVERWRITE_PROPERTIES_VALUE` | Некорректное значение параметра `OVERWRITE_PROPERTIES`.

Допустимые значения: `Y`, `N`
 | `400` ||
|| `UPDATE_REQUEST_INTERNAL_ERROR` | Ошибка при попытке обновления транспортной заявки
 | `400` ||
 || `EMPTY_UPDATE_PAYLOAD` | Пустой набор полей для обновления транспортной заявки
 | `400` ||
|| `ACCESS_DENIED` | Недостаточно прав для обновления транспортной заявки | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-request-send-message.md)
- [{#T}](./sale-delivery-request-delete.md)