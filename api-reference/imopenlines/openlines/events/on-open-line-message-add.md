# При добавлении сообщения в чат открытой линии OnOpenLineMessageAdd

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnOpenLineMessageAdd` сработает при добавлении сообщения в чат открытой линии:

- клиент написал сообщение через коннектор или онлайн-чат
- Битрикс24 передал коннектору сообщение оператора или системное сообщение, в том числе отправленное методом [imopenlines.crm.message.add](../messages/imopenlines-crm-message-add.md)

Для сообщений оператора в онлайн-чате событие не отправляется.

[Подписаться](../../../events/event-bind.md) на событие можно только через приложение. Событие приходит по всем каналам связи открытых линий, а не только по коннектору приложения. Чтобы обрабатывать только свои сообщения, проверяйте код коннектора в `DATA.connector.connector_id`.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

Состав `data` зависит от того, кто написал сообщение.

**Сообщение клиента.** В `data` приходит только ключ `DATA`:

```json
{
    "event": "ONOPENLINEMESSAGEADD",
    "event_handler_id": 145,
    "data": {
        "DATA": {
            "connector": {
                "connector_id": "livechat",
                "line_id": 1,
                "chat_id": 10585,
                "user_id": 1985
            },
            "chat": {
                "id": 10585
            },
            "message": {
                "id": 80964,
                "date": "",
                "text": "Здравствуйте, нужна консультация",
                "files": [],
                "attach": "",
                "system": "N",
                "user_id": 1985
            },
            "ref": [],
            "extra": {
                "EXTRA_URL": ""
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

**Сообщение оператора или системы.** Кроме `DATA`, в `data` приходят ключи `CONNECTOR` и `LINE`:

```json
{
    "event": "ONOPENLINEMESSAGEADD",
    "event_handler_id": 145,
    "data": {
        "CONNECTOR": "my_connector",
        "LINE": 1,
        "DATA": {
            "connector": {
                "connector_id": "my_connector",
                "line_id": 1,
                "user_id": 1985,
                "chat_id": "ext-chat-42"
            },
            "message": {
                "id": 80970,
                "chat_id": 10587,
                "user_id": 1,
                "text": "Добрый день! Чем могу помочь?",
                "files": [],
                "attachments": [],
                "params": [],
                "system": "N"
            },
            "no_session": "N"
        }
    },
    "ts": 1714649640,
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

В данном случае — `ONOPENLINEMESSAGEADD` ||
|| **event_handler_id***
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../../data-types.md) | Объект с данными добавленного сообщения.

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
[`string`](../../../data-types.md) | Код коннектора, которому Битрикс24 передал сообщение. Приходит только для сообщения оператора или системы ||
|| **LINE**
[`integer`](../../../data-types.md) | Идентификатор открытой линии. Приходит только для сообщения оператора или системы ||
|| **DATA***
[`object`](../../../data-types.md) | Объект с данными сообщения.

Для сообщения клиента структура описана [ниже](#client-data), для сообщения оператора или системы — [ниже](#operator-data) ||
|#

### DATA для сообщения клиента {#client-data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector***
[`object`](../../../data-types.md) | Объект с информацией о коннекторе.

Структура описана [ниже](#client-connector) ||
|| **chat***
[`object`](../../../data-types.md) | Объект с информацией о чате, который передал коннектор.

Структура описана [ниже](#client-chat) ||
|| **message***
[`object`](../../../data-types.md) | Объект с информацией о сообщении клиента.

Структура описана [ниже](#client-message) ||
|| **ref***
[`array`](../../../data-types.md) | Массив с кодом трекера `trackId` для привязки сообщения к объекту CRM. Если коннектор его не передал, приходит пустой массив ||
|| **extra***
[`object`](../../../data-types.md) | Объект с дополнительной информацией.

Структура описана [ниже](#client-extra) ||
|#

#### Параметр connector {#client-connector}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector_id***
[`string`](../../../data-types.md) | Код коннектора. Для онлайн-чата — `livechat` ||
|| **line_id***
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **chat_id***
[`string`](../../../data-types.md) | Идентификатор чата, который передал коннектор. Для внешнего канала связи это идентификатор чата во внешней системе, для онлайн-чата — идентификатор чата онлайн-чата в Битрикс24 ||
|| **user_id***
[`integer`](../../../data-types.md) | Идентификатор клиента в Битрикс24 ||
|#

#### Параметр chat {#client-chat}

Объект `chat` содержит поля чата в том виде, в котором их передал коннектор, например методом [imconnector.send.messages](../../imconnector/imconnector-send-messages.md).

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор чата. Совпадает с `connector.chat_id` ||
|#

#### Параметр message {#client-message}

Объект `message` содержит поля сообщения в том виде, в котором их передал коннектор. Для онлайн-чата набор полей показан в примере.

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор сообщения. Для внешнего канала связи это идентификатор сообщения во внешней системе ||
|| **date**
[`string`](../../../data-types.md) | Дата и время сообщения. Для онлайн-чата приходит пустая строка ||
|| **text**
[`string`](../../../data-types.md) | Текст сообщения ||
|| **files**
[`array`](../../../data-types.md) | Файлы сообщения ||
|| **attach**
[`string`](../../../data-types.md) | Вложение сообщения. Приходит для онлайн-чата ||
|| **system**
[`string`](../../../data-types.md) | Отметка, что сообщение системное: `Y` — да, `N` — нет. Приходит для онлайн-чата ||
|| **user_id***
[`integer`](../../../data-types.md) | Идентификатор клиента в Битрикс24 ||
|#

#### Параметр extra {#client-extra}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **EXTRA_URL**
[`string`](../../../data-types.md) | Адрес сайта из профиля клиента. Приходит для онлайн-чата ||
|#

### DATA для сообщения оператора или системы {#operator-data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector***
[`object`](../../../data-types.md) | Объект с информацией о коннекторе и чате клиента.

Структура описана [ниже](#operator-connector) ||
|| **message***
[`object`](../../../data-types.md) | Объект с информацией о сообщении в Битрикс24.

Структура описана [ниже](#operator-message) ||
|| **no_session***
[`string`](../../../data-types.md) | Отметка, что сообщение отправлено без привязки к сессии: `Y` — да, `N` — нет ||
|#

#### Параметр connector {#operator-connector}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **connector_id***
[`string`](../../../data-types.md) | Код коннектора ||
|| **line_id***
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **user_id***
[`integer`](../../../data-types.md) | Идентификатор клиента в Битрикс24 ||
|| **chat_id***
[`string`](../../../data-types.md) | Идентификатор чата во внешней системе ||
|#

#### Параметр message {#operator-message}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сообщения в Битрикс24. Передайте его в метод [imconnector.send.status.delivery](../../imconnector/imconnector-send-status-delivery.md), чтобы подтвердить доставку ||
|| **chat_id***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии в Битрикс24 ||
|| **user_id***
[`integer`](../../../data-types.md) | Идентификатор автора сообщения в Битрикс24 ||
|| **text***
[`string`](../../../data-types.md) | Текст сообщения ||
|| **files***
[`array`](../../../data-types.md) | Файлы сообщения ||
|| **attachments***
[`array`](../../../data-types.md) | Вложения сообщения ||
|| **params***
[`array`](../../../data-types.md) | Дополнительные параметры сообщения ||
|| **system***
[`string`](../../../data-types.md) | Отметка, что сообщение системное: `Y` — да, `N` — нет ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./on-open-line-message-update.md)
- [{#T}](./on-open-line-message-delete.md)
- [{#T}](./on-session-start.md)
- [{#T}](./on-session-finish.md)
