# При создании диалога OnImConnectorDialogStart

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imconnector`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnImConnectorDialogStart` срабатывает при создании диалога в открытой линии.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONIMCONNECTORDIALOGSTART",
    "eventId": 1,
    "data": {
        "CONNECTOR": "newcustomconnector",
        "LINE": "105",
        "DATA": [
            {
                "connector": {
                    "connector_id": "newcustomconnector",
                    "line_id": 105,
                    "chat_id": 8,
                    "user_id": 0
                },
                "session": {
                    "id": 3282,
                    "closed": "N",
                    "parent_id": 0,
                    "close_term": 10
                },
                "chat": {
                    "id": 8
                },
                "user": {
                    "id": 0
                }
            }
        ]
    },
    "ts": 1714649632,
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": 3600,
        "scope": "imconnector",
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

В данном случае — `ONIMCONNECTORDIALOGSTART` ||
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
[`string`](../../../data-types.md) | Идентификатор открытой линии ||
|| **DATA***
[`array`](../../../data-types.md) | Массив объектов с данными диалога.

Структура объекта описана [ниже](#dialog-params) ||
|#

#### Элемент массива DATA {#dialog-params}

Каждый элемент массива `DATA` — объект со структурой:

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector***
[`object`](../../../data-types.md) | Объект с информацией о коннекторе.

Структура описана [ниже](#connector) ||
|| **session***
[`object`](../../../data-types.md) | Объект с информацией о сессии.

Структура описана [ниже](#session) ||
|| **chat***
[`object`](../../../data-types.md) | Объект с информацией о чате.

Структура описана [ниже](#chat) ||
|| **user***
[`object`](../../../data-types.md) | Объект с информацией о пользователе.

Структура описана [ниже](#user) ||
|#

##### Параметр connector {#connector}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector_id***
[`string`](../../../data-types.md) | Идентификатор коннектора ||
|| **line_id***
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **chat_id***
[`integer`](../../../data-types.md) | Идентификатор чата ||
|| **user_id***
[`integer`](../../../data-types.md) | Идентификатор пользователя во внешней системе ||
|#

##### Параметр session {#session}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сессии ||
|| **closed***
[`string`](../../../data-types.md) | Закрыта ли сессия: `Y` — да, `N` — нет ||
|| **parent_id***
[`integer`](../../../data-types.md) | Идентификатор предыдущей сессии ||
|| **close_term***
[`integer`](../../../data-types.md) | Количество минут до закрытия сессии ||
|#

##### Параметр chat {#chat}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор чата ||
|#

##### Параметр user {#user}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор пользователя во внешней системе ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./on-im-connector-dialog-finish.md)
- [{#T}](./on-im-connector-message-add.md)
- [{#T}](./on-im-connector-message-update.md)
- [{#T}](./on-im-connector-message-delete.md)
- [{#T}](./on-im-connector-status-delete.md)
- [{#T}](./on-im-connector-line-delete.md)
