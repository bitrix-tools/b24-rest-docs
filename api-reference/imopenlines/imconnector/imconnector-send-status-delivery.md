# Обновить статус «доставлено» imconnector.send.status.delivery

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.send.status.delivery` подтверждает в Битрикс24, что исходящее сообщение открытой линии успешно доставлено во внешнюю систему. Метод не отправляет сообщение повторно, а только фиксирует результат доставки.

В текущей реализации открытых линий при обработке статуса «доставлено» сообщение также помечается как «прочитано».

Метод не применяется для входящих сообщений из внешней системы в открытую линию.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %} 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONNECTOR***
[`string`](../../data-types.md) | Строковый код коннектора, который задали в параметре `ID` при вызове [imconnector.register](./imconnector-register.md) ||
|| **LINE***
[`integer`](../../data-types.md) | Идентификатор открытой линии. 

Идентификатор можно получить методами [imopenlines.config.get](../openlines/imopenlines-config-get.md) и [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md) ||
|| **MESSAGES***
[`array`](../../data-types.md) | Массив статусов доставки. Каждый элемент массива — объект с блоками `im`, `message`, `chat`. 

Структура объекта подробно описана [ниже](#messages) ||
|#

### Параметр MESSAGES {#messages}

#|
|| **Название**
`тип` | **Описание** ||
|| **im**
[`object`](../../data-types.md) | Внутренние идентификаторы сообщения в Битрикс24 [(подробное описание)](#messages-im) ||
|| **message**
[`object`](../../data-types.md) | Данные сообщения во внешней системе [(подробное описание)](#messages-message) ||
|| **chat**
[`object`](../../data-types.md) | Данные чата во внешней системе [(подробное описание)](#messages-chat) ||
|#

#### Объект im {#messages-im}

#|
|| **Название**
`тип` | **Описание** ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор чата открытой линии в Битрикс24 для исходящего сообщения ||
|| **message_id**
[`integer`](../../data-types.md) | Идентификатор сообщения в Битрикс24, для которого нужно установить статус доставки ||
|#

Поля `im.chat_id` и `im.message_id` получайте из события [OnImConnectorMessageAdd](./events/on-im-connector-message-add.md), когда Битрикс24 отправляет сообщение во внешнюю систему.

Обычно эти значения сохраняют при обработке события и потом используют для отправки статуса доставки.

Внешние идентификаторы `message.id` и `chat.id` не заменяют `im.message_id` и `im.chat_id`.

#### Объект message {#messages-message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`array`](../../data-types.md) | Массив внешних идентификаторов сообщений, для которых передается статус доставки. Даже для одного сообщения передавайте массив, например, `["ext-msg-1007"]` ||
|| **date**
[`integer`](../../data-types.md) | Время доставки сообщения в Unix Timestamp в секундах ||
|#

#### Объект chat {#messages-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор чата или канала во внешней системе. Рекомендуется передавать то же значение, что и в `chat.id` метода [imconnector.send.messages](./imconnector-send-messages.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONNECTOR": "myconnector",
        "LINE": 107,
        "MESSAGES": [
          {
            "im": {
              "chat_id": 323,
              "message_id": 85911
            },
            "message": {
              "id": ["ext-msg-1007"],
              "date": 1738065600
            },
            "chat": {
              "id": "channel-123"
            }
          }
        ],
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imconnector.send.status.delivery
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SendStatusDeliveryResult = {
      SUCCESS: boolean
      DATA: unknown[]
    }

    try {
      const response = await $b24.actions.v2.call.make<SendStatusDeliveryResult>({
        method: 'imconnector.send.status.delivery',
        params: {
          CONNECTOR: 'myconnector',
          LINE: 107,
          MESSAGES: [
            {
              im: { chat_id: 323, message_id: 85911 },
              message: { id: ['ext-msg-1007'], date: 1738065600 },
              chat: { id: 'channel-123' },
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
        console.info('Delivery status accepted:', result.SUCCESS, 'data:', result.DATA)
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
      async function sendStatusDelivery() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imconnector.send.status.delivery',
            params: {
              CONNECTOR: 'myconnector',
              LINE: 107,
              MESSAGES: [
                {
                  im: { chat_id: 323, message_id: 85911 },
                  message: { id: ['ext-msg-1007'], date: 1738065600 },
                  chat: { id: 'channel-123' },
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
          console.info('Delivery status accepted:', result.SUCCESS, 'data:', result.DATA)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendStatusDelivery)
    </script>
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.send.status.delivery',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'im' => ['chat_id' => 323, 'message_id' => 85911],
                    'message' => ['id' => ['ext-msg-1007'], 'date' => 1738065600],
                    'chat' => ['id' => 'channel-123'],
                ],
            ],
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.send.status.delivery',
      {
        CONNECTOR: 'myconnector',
        LINE: 107,
        MESSAGES: [
          {
            im: { chat_id: 323, message_id: 85911 },
            message: { id: ['ext-msg-1007'], date: 1738065600 },
            chat: { id: 'channel-123' },
          },
        ],
      },
      function(result) {
        console.log(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.send.status.delivery',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'im' => ['chat_id' => 323, 'message_id' => 85911],
                    'message' => ['id' => ['ext-msg-1007'], 'date' => 1738065600],
                    'chat' => ['id' => 'channel-123'],
                ],
            ],
        ]
    );
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
    "SUCCESS": true,
    "DATA": []
    },
    "time": {
    "start": 1738065600.11,
    "finish": 1738065600.21,
    "duration": 0.10,
    "processing": 0.04,
    "date_start": "2025-01-28T12:00:00+00:00",
    "date_finish": "2025-01-28T12:00:00+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS**
[`boolean`](../../data-types.md) | Возвращает `true`, если статус доставки успешно принят и обновлен в Битрикс24 ||
|| **DATA**
[`array`](../../data-types.md) | Пустой массив при успешной обработке ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|| `400` | `ERROR_ARGUMENT` | Argument 'CONNECTOR' is null or empty | Не передан `CONNECTOR` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'LINE' is null or empty | Не передан `LINE` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'MESSAGES' is null or empty | Не передан `MESSAGES` ||
|| `400` | `IMCONNECTOR_NO_CORRECT_PROVIDER` | Не удалось найти подходящий провайдер для коннектора | Для коннектора не удалось инициализировать провайдер ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-chat-name-set.md)
- [{#T}](../../../tutorials/openlines/example-connector.md)
