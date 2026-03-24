# Изменить отправленные сообщения imconnector.update.messages

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.update.messages` обновляет данные ранее переданных сообщений внешней системы в открытой линии.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %} 

В параметрах метода используются значения внешней системы: идентификатор пользователя, идентификатор чата, ссылка на чат и его название в приложении, которое зарегистрировало коннектор.

Для обновления передавайте те же `message.id` и `chat.id`, которые использовали при отправке сообщений методом [imconnector.send.messages](./imconnector-send-messages.md).

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
[`array`](../../data-types.md) | Массив сообщений для обновления. Каждый элемент массива — одно сообщение в формате объекта с тремя обязательными блоками: `user`, `message`, `chat`.

Структура объекта подробно описана [ниже](#messages) ||
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
[`object`](../../data-types.md) | Данные чата внешней системы.

Структура объекта подробно описана [ниже](#messages-chat) ||
|#

#### Объект user {#messages-user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../data-types.md) | Идентификатор пользователя во внешней системе ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **picture**
[`object`](../../data-types.md) | Аватар пользователя в формате объекта с полем `url`, например `{"url":"https://example.ru/u42.png"}` ||
|| **url**
[`string`](../../data-types.md) | Ссылка на профиль пользователя во внешней системе ||
|| **gender**
[`string`](../../data-types.md) | Пол пользователя. Поддерживаются значения `male` и `female` ||
|| **email**
[`string`](../../data-types.md) | Email пользователя ||
|| **phone**
[`string`](../../data-types.md) | Телефон пользователя ||
|| **skip_phone_validate**
[`string`](../../data-types.md) | Отключает проверку телефона перед сохранением в CRM. Допустимое значение — `Y`. Если проверка должна выполняться, не передавайте параметр ||
|#

#### Объект message {#messages-message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор сообщения во внешней системе, которое нужно обновить ||
|| **date**
[`integer`](../../data-types.md) | Время сообщения в Unix Timestamp в секундах ||
|| **text**
[`string`](../../data-types.md) | Новый текст сообщения. Передавайте `text` или `files`

О допустимом форматировании читайте в статье [Форматирование](../../chats/messages/formatting.md) ||
|| **files**
[`array`](../../data-types.md) | Массив файлов. Каждый файл передается как массив вида `array('url' => 'Ссылка на файл', 'name' => 'Имя файла')` ||
|| **disable_crm**
[`string`](../../data-types.md) | Отключает CRM трекер для сообщения. Допустимое значение — `Y` ||
|| **user_id**
[`integer`](../../data-types.md) | Идентификатор менеджера в Битрикс24. Если передать `user_id`, сообщение обновится от имени этого менеджера ||
|#

#### Объект chat {#messages-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../data-types.md) | Идентификатор чата или канала во внешней системе. Рекомендуется передавать то же значение, что и в `DATA.ID` метода [imconnector.connector.data.set](./imconnector-connector-data-set.md) ||
|| **name**
[`string`](../../data-types.md) | Название чата или канала. Рекомендуется использовать значение из `DATA.NAME` ||
|| **url**
[`string`](../../data-types.md) | Ссылка на чат или канал во внешней системе. Рекомендуется использовать значение из `DATA.URL` ||
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
            "user": {
              "id": "ext-user-42",
              "last_name": "Иванов",
              "name": "Иван",
              "picture": {"url": "https://example.ru/u42.png"},
              "url": "https://example.ru/users/42",
              "gender": "male",
              "email": "ivan@example.ru",
              "phone": "+79990000000"
            },
            "message": {
              "id": "ext-msg-1001",
              "date": 1773266050,
              "text": "Добрый день, уточнили детали"
            },
            "chat": {
              "id": "channel-123",
              "name": "Канал поддержки",
              "url": "https://example.ru/chats/123"
            }
          }
        ],
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imconnector.update.messages
    ```

- JS

    ```js
    const payload = {
        CONNECTOR: 'myconnector',
        LINE: 107,
        MESSAGES: [
            {
                user: {
                    id: 'ext-user-42',
                    last_name: 'Иванов',
                    name: 'Иван',
                    picture: { url: 'https://example.ru/u42.png' },
                    url: 'https://example.ru/users/42',
                    gender: 'male',
                    email: 'ivan@example.ru',
                    phone: '+79990000000',
                },
                message: {
                    id: 'ext-msg-1001',
                    date: 1773266050,
                    text: 'Добрый день, уточнили детали',
                },
                chat: {
                    id: 'channel-123',
                    name: 'Канал поддержки',
                    url: 'https://example.ru/chats/123',
                },
            },
        ],
    };

    const response = await $b24.callMethod('imconnector.update.messages', payload);
    console.log(response.getData());
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.update.messages',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'user' => [
                          'id' => 'ext-user-42',
                          'last_name' => 'Иванов',
                          'name' => 'Иван',
                          'picture' => ['url' => 'https://example.ru/u42.png'],
                          'url' => 'https://example.ru/users/42',
                          'gender' => 'male',
                          'email' => 'ivan@example.ru',
                          'phone' => '+79990000000',
                    ],
                    'message' => [
                          'id' => 'ext-msg-1001',
                          'date' => 1773266050,
                          'text' => 'Добрый день, уточнили детали',
                    ],
                    'chat' => [
                          'id' => 'channel-123',
                          'name' => 'Канал поддержки',
                          'url' => 'https://example.ru/chats/123',
                    ],
                ],
            ],
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imconnector.update.messages',
        {
            CONNECTOR: 'myconnector',
            LINE: 107,
            MESSAGES: [
                {
                    user: {
                        id: 'ext-user-42',
                        last_name: 'Иванов',
                        name: 'Иван',
                        picture: { url: 'https://example.ru/u42.png' },
                        url: 'https://example.ru/users/42',
                        gender: 'male',
                        email: 'ivan@example.ru',
                        phone: '+79990000000',
                    },
                    message: {
                        id: 'ext-msg-1001',
                        date: 1773266050,
                        text: 'Добрый день, уточнили детали',
                    },
                    chat: {
                        id: 'channel-123',
                        name: 'Канал поддержки',
                        url: 'https://example.ru/chats/123',
                    },
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
        'imconnector.update.messages',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'user' => [
                        'id' => 'ext-user-42',
                        'last_name' => 'Иванов',
                        'name' => 'Иван',
                        'picture' => ['url' => 'https://example.ru/u42.png'],
                        'url' => 'https://example.ru/users/42',
                        'gender' => 'male',
                        'email' => 'ivan@example.ru',
                        'phone' => '+79990000000',
                    ],
                    'message' => [
                        'id' => 'ext-msg-1001',
                        'date' => 1773266050,
                        'text' => 'Добрый день, уточнили детали',
                    ],
                    'chat' => [
                        'id' => 'channel-123',
                        'name' => 'Канал поддержки',
                        'url' => 'https://example.ru/chats/123',
                    ],
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
                        "id": "ext-msg-1001",
                        "date": {},
                        "text": "Добрый день, уточнили детали"
                    },
                    "chat": {
                        "id": "channel-123",
                        "name": "Канал поддержки",
                        "description": "Ссылка на исходный пост: https://example.ru/chats/123"
                    },
                    "SUCCESS": true
                }
            ]
        }
    },
    "time": {
        "start": 1773322669,
        "finish": 1773322669.300999,
        "duration": 0.3009989261627197,
        "processing": 0,
        "date_start": "2026-03-12T16:37:49+03:00",
        "date_finish": "2026-03-12T16:37:49+03:00",
        "operating_reset_at": 1773323269,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS**
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного изменения сообщения ||
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
[`array`](../../data-types.md) | Массив результатов по каждому элементу `MESSAGES`.

Структура элемента подробно описана [ниже](#result-item) ||
|#

#### Объект RESULT[] {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **user**
[`string`](../../data-types.md) | Внутренний идентификатор пользователя Битрикс24 ||
|| **message**
[`object`](../../data-types.md) | Данные сообщения после обработки [(подробное описание)](#result-item-message) ||
|| **chat**
[`object`](../../data-types.md) | Данные чата после обработки [(подробное описание)](#result-item-chat) ||
|| **extra**
[`object`](../../data-types.md) | Дополнительные флаги обработки сообщения [(подробное описание)](#result-item-extra) ||
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
[`string`](../../data-types.md) | Внешний идентификатор сообщения ||
|| **date**
[`object`](../../data-types.md) | Дата сообщения после обработки ||
|| **text**
[`string`](../../data-types.md) | Текст сообщения ||
|| **files**
[`array`](../../data-types.md) | Массив файлов сообщения ||
|#

#### Объект chat {#result-item-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор чата или канала ||
|| **name**
[`string`](../../data-types.md) | Название чата или канала ||
|| **description**
[`string`](../../data-types.md) | Описание чата, например ссылка на исходный пост ||
|#

#### Объект extra {#result-item-extra}

#|
|| **Название**
`тип` | **Описание** ||
|| **skip_phone_validate**
[`string`](../../data-types.md) | Признак отключения проверки телефона, возвращается при значении `Y` ||
|| **disable_tracker**
[`string`](../../data-types.md) | Признак отключения CRM трекера, возвращается при значении `Y` ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'LINE' is null or empty"
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
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)

