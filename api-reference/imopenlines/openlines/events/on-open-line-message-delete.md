# При удалении соообщения чата OnOpenLineMessageDelete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnOpenLineMessageDelete` срабатывает при удалении сообщения в чате открытой линии.

[Подписаться](../../../events/event-bind.md) на событие можно только через приложение. Получить в обработчик можно только те события, которые предназначены для [коннектора](../../imconnector/index.md), который добавило приложение.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONOPENLINEMESSAGEDELETE",
    "eventId": 1,
    "data": {
        "CONNECTOR": "livechat",
        "LINE": 128,
        "DATA": [
            {
                "im": {
                    "chat_id": 1024,
                    "message_id": 2056
                },
                "message": {
                    "id": 2056
                },
                "chat": {
                    "id": 1024
                }
            }
        ]
    },
    "ts": 1714649632,
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
|| **eventId***
[`integer`](../../../data-types.md) | Идентификатор события ||
|| **data***
[`object`](../../../data-types.md) | Объект, содержащий данные события.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth***
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **CONNECTOR***
[`string`](../../../data-types.md) | Идентификатор коннектора ||
|| **LINE***
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **DATA***
[`array`](../../../data-types.md) | Массив объектов с данными удаленного сообщения.

Структура объекта описана [ниже](#chat-params) ||
|#

#### Элемент массива DATA {#chat-params}

Каждый элемент массива `DATA` — объект со структурой:

#|
|| **Параметр**
`тип` | **Описание** ||
|| **im***
[`object`](../../../data-types.md) | Объект с информацией об удаленном сообщении в чате.

Структура описана [ниже](#im) ||
|| **message***
[`object`](../../../data-types.md) | Объект с информацией о сообщении.

Структура описана [ниже](#message) ||
|| **chat***
[`object`](../../../data-types.md) | Объект с информацией о чате.

Структура описана [ниже](#chat) ||
|#

##### Параметр im {#im}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **chat_id***
[`integer`](../../../data-types.md) | Идентификатор чата ||
|| **message_id***
[`integer`](../../../data-types.md) | Идентификатор сообщения ||
|#

##### Параметр message {#message}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сообщения ||
|#

##### Параметр chat {#chat}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор чата ||
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
