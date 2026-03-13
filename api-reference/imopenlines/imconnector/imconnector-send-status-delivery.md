# Обновить статус «доставлено» imconnector.send.status.delivery

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

- JS

    ```js
    const payload = {
      CONNECTOR: 'myconnector',
      LINE: 107,
      MESSAGES: [
        {
          im: { chat_id: 323, message_id: 85911 },
          message: { id: ['ext-msg-1007'], date: 1738065600 },
          chat: { id: 'channel-123' },
        },
      ],
    };

    const response = await $b24.callMethod('imconnector.send.status.delivery', payload);
    console.log(response.getData());
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
