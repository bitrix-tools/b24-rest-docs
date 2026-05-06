# Удалить отправленные сообщения imconnector.delete.messages

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.delete.messages` удаляет сообщения из открытой линии, которые были переданы внешней системой.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %} 

В параметрах метода используются значения внешней системы: идентификатор пользователя, идентификатор сообщения и идентификатор чата или канала.

Для удаления передавайте `message.id` и `chat.id`, которые использовали при отправке сообщений методом [imconnector.send.messages](./imconnector-send-messages.md).

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
[`array`](../../data-types.md) | Массив сообщений для удаления. Каждый элемент массива — объект сообщения с тремя обязательными блоками: `user`, `message`, `chat`. Структура объекта подробно описана [ниже](#messages) ||
|#

### Параметр MESSAGES {#messages}

#|
|| **Название**
`тип` | **Описание** ||
|| **user**
[`object`](../../data-types.md) | Данные пользователя внешней системы.

Структура объекта подробно описана [ниже](#messages-user) ||
|| **message**
[`object`](../../data-types.md) | Данные сообщения внешней системы.

Структура объекта подробно описана [ниже](#messages-message) ||
|| **chat**
[`object`](../../data-types.md) | Данные чата или канала внешней системы.

Структура объекта подробно описана [ниже](#messages-chat) ||
|#

#### Объект user {#messages-user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../data-types.md) | Идентификатор пользователя во внешней системе. 

Рекомендуется передавать то же значение, которое использовали в `user.id` метода [imconnector.send.messages](./imconnector-send-messages.md) ||
|#

#### Объект message {#messages-message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../data-types.md) | Идентификатор сообщения во внешней системе, которое нужно удалить. 

Рекомендуется передавать то же значение, которое использовали в `message.id` метода [imconnector.send.messages](./imconnector-send-messages.md) ||
|#

#### Объект chat {#messages-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../data-types.md) | Идентификатор чата или канала во внешней системе. 

Рекомендуется передавать то же значение, что и в `chat.id` метода [imconnector.send.messages](./imconnector-send-messages.md) ||
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
            "user": {"id": "ext-user-42"},
            "message": {"id": "ext-msg-1001"},
            "chat": {"id": "channel-123"}
          }
        ],
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imconnector.delete.messages
    ```

- JS

    ```js
    const payload = {
      CONNECTOR: 'myconnector',
      LINE: 107,
      MESSAGES: [
        {
          user: { id: 'ext-user-42' },
          message: { id: 'ext-msg-1001' },
          chat: { id: 'channel-123' },
        },
      ],
    };

    const response = await $b24.callMethod('imconnector.delete.messages', payload);
    console.log(response.getData());
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.delete.messages',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'user' => ['id' => 'ext-user-42'],
                    'message' => ['id' => 'ext-msg-1001'],
                    'chat' => ['id' => 'channel-123'],
                ],
            ],
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.delete.messages',
      {
        CONNECTOR: 'myconnector',
        LINE: 107,
        MESSAGES: [
          {
            user: { id: 'ext-user-42' },
            message: { id: 'ext-msg-1001' },
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
        'imconnector.delete.messages',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'user' => ['id' => 'ext-user-42'],
                    'message' => ['id' => 'ext-msg-1001'],
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
        "DATA": {
            "RESULT": [
                {
                    "user": "585",
                    "message": {
                        "id": "ext-msg-1001"
                    },
                    "chat": {
                        "id": "channel-123"
                    },
                    "SUCCESS": true
                }
            ]
        }
    },
    "time": {
        "start": 1773267564,
        "finish": 1773267565.070724,
        "duration": 1.0707240104675293,
        "processing": 1,
        "date_start": "2026-03-11T14:19:24+03:00",
        "date_finish": "2026-03-11T14:19:25+03:00",
        "operating_reset_at": 1773268164,
        "operating": 0.113616943359375
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS**
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного удаления сообщения ||
|| **DATA**
[`object`](../../data-types.md) | Данные обработки сообщений. 

Структура объекта подробно описана [ниже](#result-data) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект DATA {#result-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **RESULT**
[`array`](../../data-types.md) | Массив результатов по каждому элементу `MESSAGES`

Структура элемента подробно описана [ниже](#result-item) ||
|#

#### Объект RESULT[] {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **user**
[`string`](../../data-types.md) | Внутренний идентификатор пользователя Битрикс24 ||
|| **message**
[`object`](../../data-types.md) | Данные удаляемого сообщения [(подробное описание)](#result-item-message) ||
|| **chat**
[`object`](../../data-types.md) | Данные чата или канала [(подробное описание)](#result-item-chat) ||
|| **SUCCESS**
[`boolean`](../../data-types.md) | Признак успешной обработки текущего элемента массива ||
|| **ERRORS**
[`array`](../../data-types.md) | Массив текстов ошибок по текущему элементу, возвращается при `SUCCESS = false` ||
|#

#### Объект message {#result-item-message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор сообщения во внешней системе, которое передавалось в `MESSAGES[].message.id` ||
|| **date**
[`integer`](../../data-types.md) | Время сообщения в Unix Timestamp, если это поле было передано во входных данных ||
|| **text**
[`string`](../../data-types.md) | Текст сообщения, если это поле было передано во входных данных ||
|| **files**
[`array`](../../data-types.md) | Массив файлов сообщения, если это поле было передано во входных данных ||
|#

#### Объект chat {#result-item-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор чата или канала во внешней системе, который передавали в `MESSAGES[].chat.id` ||
|| **description**
[`string`](../../data-types.md) | Описание чата. Поле возвращается, если в `MESSAGES[].chat` передавали ссылку `url` ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'CONNECTOR' is null or empty"
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
|| `400` | `NOT_ACTIVE_LINE` | Линия c таким ID неактивна или не существует | Передан неактивный `LINE` ||
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
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
