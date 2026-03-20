# При изменении сообщений OnImConnectorMessageUpdate

> Scope: [`imconnector`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnImConnectorMessageUpdate` срабатывает, когда сообщение изменяется в открытой линии Битрикс24 и изменение отправляется в канал внешней системы через пользовательский коннектор.

Событие не срабатывает:
- для встроенных коннекторов
- при изменении сообщения, отправленного из канала внешней системы

После обработки события вызовите метод [imconnector.send.status.delivery](../imconnector-send-status-delivery.md), чтобы в канале внешней системы отметить сообщение как успешно измененное.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONIMCONNECTORMESSAGEUPDATE",
    "event_handler_id": 557,
    "data": {
        "CONNECTOR": "myconnector",
        "LINE": 107,
        "MESSAGES": [
            {
                "im": {
                    "chat_id": 1807,
                    "message_id": 86501
                },
                "message": {
                    "id": ["ext-msg-005"],
                    "text": "[b]Светлана Иванова:[/b][br] Какие у вас вопросы?"
                },
                "chat": {
                    "id": "channel-123"
                }
            }
        ]
    },
    "ts": 1773760030,
    "auth": {
        "access_token": "2e7cb0071b04400007eb2a255d2a542d6d0ca03ceb",
        "expires": 1773763630,
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

В данном случае - `ONIMCONNECTORMESSAGEUPDATE` ||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект с параметрами события изменения исходящего сообщения.

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
[`object[]`](../../../data-types.md) | Массив сообщений, которые были изменены в Битрикс24 и отправлены в канал внешней системы.

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
[`object`](../../../data-types.md) | Объект с данными измененного сообщения для канала внешней системы.

Структура описана [ниже](#message) ||
|| **chat**
[`object`](../../../data-types.md) | Объект с идентификатором чата в канале внешней системы.

Структура описана [ниже](#chat) ||
|#

### Параметр im {#im}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **chat_id**
[`integer`](../../../data-types.md) | Идентификатор чата в Битрикс24 ||
|| **message_id**
[`integer`](../../../data-types.md) | Идентификатор измененного сообщения в Битрикс24 ||
|#

### Параметр message {#message}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id**
[`string[]`](../../../data-types.md) | Массив идентификаторов измененного сообщения в канале внешней системы ||
|| **text**
[`string`](../../../data-types.md) | Новый текст сообщения в формате, переданном в событии ||
|#

### Параметр chat {#chat}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор чата в канале внешней системы ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-im-connector-message-add.md)
- [{#T}](./on-im-connector-dialog-start.md)
- [{#T}](./on-im-connector-message-delete.md)
- [{#T}](./on-im-connector-dialog-finish.md)
- [{#T}](./on-im-connector-status-delete.md)
- [{#T}](./on-im-connector-line-delete.md)
