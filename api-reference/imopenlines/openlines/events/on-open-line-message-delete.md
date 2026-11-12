# При удалении сообщения в чате открытой линии OnOpenLineMessageDelete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnOpenLineMessageDelete` сработает при удалении сообщения в чате открытой линии:

- клиент удалил сообщение через коннектор, например коннектор вызвал метод [imconnector.delete.messages](../../imconnector/imconnector-delete-messages.md)
- оператор удалил сообщение, которое Битрикс24 уже передал во внешний канал связи

Для сообщения оператора событие придет, только если коннектор подтвердил его доставку методом [imconnector.send.status.delivery](../../imconnector/imconnector-send-status-delivery.md). Без подтверждения Битрикс24 не знает идентификатор сообщения во внешней системе и событие не отправляет. Для онлайн-чата событие об удалении сообщения оператора не отправляется.

[Подписаться](../../../events/event-bind.md) на событие можно только через приложение. Событие приходит по всем каналам связи открытых линий, а не только по коннектору приложения. Проверяйте код коннектора в `CONNECTOR` или `DATA.connector.connector_id`.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

Состав `data` зависит от того, кто удалил сообщение.

**Сообщение клиента.** В `data` приходит только ключ `DATA`. Его состав такой же, как у сообщения клиента в событии [OnOpenLineMessageAdd](./on-open-line-message-add.md#client-data):

```json
{
    "event": "ONOPENLINEMESSAGEDELETE",
    "event_handler_id": 147,
    "data": {
        "DATA": {
            "connector": {
                "connector_id": "my_connector",
                "line_id": 1,
                "chat_id": "ext-chat-42",
                "user_id": 1985
            },
            "chat": {
                "id": "ext-chat-42"
            },
            "message": {
                "id": "ext-msg-501",
                "user_id": 1985
            },
            "ref": [],
            "extra": []
        }
    },
    "ts": 1714649702,
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": 3600,
        "scope": "imopenlines",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

**Сообщение оператора.** Кроме `DATA`, в `data` приходят ключи `CONNECTOR` и `LINE`. Здесь `DATA` — массив: по одному элементу на каждый идентификатор сообщения во внешней системе:

```json
{
    "event": "ONOPENLINEMESSAGEDELETE",
    "event_handler_id": 147,
    "data": {
        "CONNECTOR": "my_connector",
        "LINE": 1,
        "DATA": [
            {
                "im": {
                    "chat_id": 10587,
                    "message_id": 80970
                },
                "message": {
                    "id": "ext-msg-777"
                },
                "chat": {
                    "id": "ext-chat-42"
                }
            }
        ]
    },
    "ts": 1714649710,
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": 3600,
        "scope": "imopenlines",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONOPENLINEMESSAGEDELETE` ||
|| **event_handler_id***
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../../data-types.md) | Объект с данными удаленного сообщения.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth***
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о Битрикс24, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **CONNECTOR**
[`string`](../../../data-types.md) | Код коннектора. Приходит только для сообщения оператора ||
|| **LINE**
[`integer`](../../../data-types.md) | Идентификатор открытой линии. Приходит только для сообщения оператора ||
|| **DATA***
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Данные сообщения.

Для сообщения клиента — объект, его структура описана в событии [OnOpenLineMessageAdd](./on-open-line-message-add.md#client-data). Для сообщения оператора — массив объектов, структура элемента описана [ниже](#operator-data) ||
|#

### Элемент DATA для сообщения оператора {#operator-data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **im***
[`object`](../../../data-types.md) | Объект с информацией о сообщении в Битрикс24.

Структура описана [ниже](#im) ||
|| **message***
[`object`](../../../data-types.md) | Объект с идентификатором сообщения во внешней системе.

Структура описана [ниже](#message) ||
|| **chat***
[`object`](../../../data-types.md) | Объект с информацией о чате во внешней системе.

Структура описана [ниже](#chat) ||
|#

#### Параметр im {#im}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **chat_id***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии в Битрикс24 ||
|| **message_id***
[`integer`](../../../data-types.md) | Идентификатор сообщения в Битрикс24 ||
|#

#### Параметр message {#message}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор сообщения во внешней системе, который коннектор передал при подтверждении доставки ||
|#

#### Параметр chat {#chat}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор чата во внешней системе ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./on-open-line-message-add.md)
- [{#T}](./on-open-line-message-update.md)
- [{#T}](./on-session-start.md)
- [{#T}](./on-session-finish.md)
