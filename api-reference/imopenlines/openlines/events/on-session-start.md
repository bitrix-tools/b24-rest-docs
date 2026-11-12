# При создании сессии открытой линии OnSessionStart

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnSessionStart` сработает при создании новой сессии открытой линии: когда клиент пишет в линию через любой канал связи, в том числе через онлайн-чат, или когда сессию начинают методом [imopenlines.session.start](../sessions/imopenlines-session-start.md).

[Подписаться](../../../events/event-bind.md) на событие можно только через приложение. Событие приходит по всем каналам связи открытых линий, а не только по коннектору приложения. Чтобы обрабатывать только свои сессии, проверяйте код коннектора в `connector.connector_id`.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONSESSIONSTART",
    "event_handler_id": 145,
    "data": {
        "DATA": {
            "connector": {
                "connector_id": "my_connector",
                "line_id": 1,
                "chat_id": 17,
                "user_id": 10
            },
            "chat": {
                "chat_id": 17
            },
            "line": {
                "id": 1,
                "name": "Открытая линия"
            }
        }
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

В данном случае — `ONSESSIONSTART` ||
|| **event_handler_id***
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../../data-types.md) | Объект с данными созданной сессии.

Содержит единственный ключ `DATA` ||
|| **data.DATA***
[`object`](../../../data-types.md) | Объект с информацией о коннекторе, чате и открытой линии.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth***
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о Битрикс24, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр DATA {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector***
[`object`](../../../data-types.md) | Объект с информацией о канале связи сессии.

Структура описана [ниже](#connector) ||
|| **chat***
[`object`](../../../data-types.md) | Объект с информацией о чате сессии.

Структура описана [ниже](#chat) ||
|| **line***
[`object`](../../../data-types.md) | Объект с информацией об открытой линии.

Структура описана [ниже](#line) ||
|#

#### Параметр connector {#connector}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector_id***
[`string`](../../../data-types.md) | Код коннектора, через который клиент пишет в линию. Например, `livechat` для онлайн-чата или код коннектора приложения ||
|| **line_id***
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **chat_id***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии в Битрикс24 ||
|| **user_id***
[`integer`](../../../data-types.md) | Идентификатор клиента в Битрикс24 ||
|#

#### Параметр chat {#chat}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **chat_id***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии в Битрикс24. Совпадает с `connector.chat_id` ||
|#

#### Параметр line {#line}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор открытой линии. Совпадает с `connector.line_id` ||
|| **name***
[`string`](../../../data-types.md) | Название открытой линии ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./on-session-finish.md)
- [{#T}](./on-open-line-message-add.md)
- [{#T}](./on-open-line-message-update.md)
- [{#T}](./on-open-line-message-delete.md)
