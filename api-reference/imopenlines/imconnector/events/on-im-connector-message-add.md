# При отправке сообщений OnImConnectorMessageAdd

> Scope: [`imconnector`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnImConnectorMessageAdd` срабатывает, когда сообщение отправляется из открытой линии Битрикс24 в канал внешней системы через пользовательский коннектор.

Событие не срабатывает:
- при получении входящего сообщения из канала внешней системы
- для встроенных коннекторов

После обработки события вызовите метод [imconnector.send.status.delivery](../imconnector-send-status-delivery.md), чтобы отметить доставку сообщения в канале внешней системы.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONIMCONNECTORMESSAGEADD",
    "event_handler_id": 555,
    "data": {
        "CONNECTOR": "myconnector",
        "LINE": 107,
        "MESSAGES": [
            {
                "im": {
                    "chat_id": 1807,
                    "message_id": 86497
                },
                "message": {
                    "user_id": 27,
                    "text": "[b]Светлана Иванова:[/b] [br]Добрый день!"
                },
                "chat": {
                    "id": "channel-123"
                }
            }
        ]
    },
    "ts": 1773759161,
    "auth": {
        "access_token": "c978b990071b0008440001b0895f697a",
        "expires": 1773762761,
        "expires_in": 3600,
        "scope": "imconnector, imopenlines",
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
        "user_id": 27,
        "application_token": "831c76b092f9f135d9b6b36c3a720757"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае - `ONIMCONNECTORMESSAGEADD` ||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект с параметрами события.

Структура описана [ниже](#data) ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект с параметрами авторизации и данными о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **CONNECTOR**
[`string`](../../../data-types.md) | Идентификатор коннектора ||
|| **LINE**
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **MESSAGES**
[`object[]`](../../../data-types.md) | Массив сообщений.

Структура элемента массива описана [ниже](#messages-item) ||
|#

### Элемент массива MESSAGES {#messages-item}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **im**
[`object`](../../../data-types.md) | Объект с идентификаторами сообщения в Битрикс24.

Структура описана [ниже](#im) ||
|| **message**
[`object`](../../../data-types.md) | Объект с данными текста сообщения.

Структура описана [ниже](#message) ||
|| **chat**
[`object`](../../../data-types.md) | Данные чата во внешней системе.

Структура описана [ниже](#chat) ||
|#

### Параметр im {#im}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **chat_id**
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии в Битрикс24 ||
|| **message_id**
[`integer`](../../../data-types.md) | Идентификатор сообщения в Битрикс24 ||
|#

### Параметр message {#message}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **user_id**
[`integer`](../../../data-types.md) | Идентификатор пользователя, от имени которого создано сообщение ||
|| **text**
[`string`](../../../data-types.md) | Текст сообщения в формате, переданном в событии ||
|#

### Параметр chat {#chat}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор чата во внешней системе ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-im-connector-dialog-start.md)
- [{#T}](./on-im-connector-message-update.md)
- [{#T}](./on-im-connector-message-delete.md)
- [{#T}](./on-im-connector-dialog-finish.md)
- [{#T}](./on-im-connector-status-delete.md)
- [{#T}](./on-im-connector-line-delete.md)
