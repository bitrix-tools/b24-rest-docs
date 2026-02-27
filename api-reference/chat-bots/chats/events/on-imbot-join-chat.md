# Событие при добавлении бота в чат ONIMBOTJOINCHAT

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может подписаться: пользователь приложения, которое зарегистрировало чат-бота

Событие `ONIMBOTJOINCHAT` срабатывает при добавлении бота в чат.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- Личный чат с ботом

    ```json
    {
        "event": "ONIMBOTJOINCHAT",
        "event_handler_id": "459",
        "data": {
            "BOT": {
                "571": {
                    "access_token": "e703a069000071b00084400023bf0f10751a702af1e",
                    "expires": "1772094439",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                    "refresh_token": "d782c76900071b00084400023bf0f1077047d2feeb6c5f3fb",
                    "user_id": "571",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "831c76b092f9f135d9b6b36c3a720757",
                    "AUTH": {
                        "access_token": "e703a069000071b00084400023bf0f10751a702af1e",
                        "expires": "1772094439",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                        "refresh_token": "d782c76900071b00084400023bf0f1077047d2feeb6c5f3fb",
                        "user_id": "571",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "831c76b092f9f135d9b6b36c3a720757"
                    },
                    "BOT_ID": "571",
                    "BOT_CODE": "BOT"
                }
            },
            "PARAMS": {
                "CHAT_TYPE": "P",
                "MESSAGE_TYPE": "P",
                "BOT_ID": "571",
                "USER_ID": "27",
                "TO_USER_ID": "27",
                "FROM_USER_ID": "571",
                "DIALOG_ID": "27",
                "LANGUAGE": "ru"
            },
            "USER": {
                "ID": "27",
                "NAME": "Светлана Иванова",
                "FIRST_NAME": "Светлана",
                "LAST_NAME": "Иванова",
                "WORK_POSITION": "",
                "GENDER": "F"
            }
        },
        "ts": "1772090839",
        "auth": {
            "access_token": "e703a06900071b00084400001b00074523806a5537056abff",
            "expires": "1772094439",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
            "user_id": "27",
            "application_token": "831c76b092f9f135d9b6b36c3a720757"
        }
    }
    ```

- Групповой чат

    ```json
    {
        "event": "ONIMBOTJOINCHAT",
        "event_handler_id": "459",
        "data": {
            "BOT": {
                "571": {
                    "access_token": "4d12a06900071b00084400023bf0f1079c6f8b9190c698fd2",
                    "expires": "1772098125",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                    "refresh_token": "3d91c7690000071b00084400023bf0f107580dad11018e",
                    "user_id": "571",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "831c76b092f9f135d9b6b36c3a720757",
                    "AUTH": {
                        "access_token": "4d12a06900071b00084400023bf0f1079c6f8b9190c698fd2",
                        "expires": "1772098125",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                        "refresh_token": "3d91c7690000071b00084400023bf0f107580dad11018e",
                        "user_id": "571",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "831c76b092f9f135d9b6b36c3a720757"
                    },
                    "BOT_ID": "571",
                    "BOT_CODE": "BOT"
                }
            },
            "PARAMS": {
                "CHAT_TYPE": "C",
                "MESSAGE_TYPE": "C",
                "BOT_ID": "571",
                "USER_ID": "27",
                "CHAT_ID": "1157",
                "CHAT_AUTHOR_ID": "27",
                "CHAT_ENTITY_TYPE": "THREAD",
                "CHAT_ENTITY_ID": "",
                "ACCESS_HISTORY": "1",
                "DIALOG_ID": "chat1157",
                "LANGUAGE": "ru"
            },
            "USER": {
                "ID": "27",
                "NAME": "Светлана Иванова",
                "FIRST_NAME": "Светлана",
                "LAST_NAME": "Иванова",
                "WORK_POSITION": "",
                "GENDER": "F"
            }
        },
        "ts": "1772094525",
        "auth": {
            "access_token": "4e12a06900071b00084400001b000070de69612254f5f11a912b908",
            "expires": "1772098126",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
            "user_id": "27",
            "application_token": "831c76b092f9f135d9b6b36c3a720757"
        }
    }
    ```

{% endlist %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONIMBOTJOINCHAT` ||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект с данными события.

Структура описана [ниже](#data) ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект с параметрами авторизации пользователя, от имени которого сработало событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **BOT**
[`object`](../../../data-types.md) | Набор параметров авторизации ботов, которым предназначено событие. Ключ объекта — идентификатор бота `BOT_ID`.

Структура описана [ниже](#bot) ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры события.

Структура описана [ниже](#params) ||
|| **USER**
[`object`](../../../data-types.md) | Данные пользователя, который добавил бота в чат. Может быть пустым объектом, если `ID = 0`.

Структура описана [ниже](#user) ||
|#

### Параметр BOT {#bot}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **\{BOT_ID\}**
[`object`](../../../data-types.md) | Объект данных конкретного бота. Ключ соответствует идентификатору бота, например `571`.

Структура описана [ниже](#bot-item) ||
|#

#### Элемент \{BOT_ID\} {#bot-item}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **access_token**
[`string`](../../../data-types.md) | OAuth-токен авторизации бота ||
|| **expires**
[`timestamp`](../../../data-types.md) | Момент окончания действия токена ||
|| **expires_in**
[`integer`](../../../data-types.md) | Время жизни токена в секундах ||
|| **scope**
[`string`](../../../data-types.md) | Скоуп, в рамках которого произошло событие ||
|| **domain**
[`string`](../../../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint**
[`string`](../../../data-types.md) | Адрес OAuth-сервера для REST-запросов ||
|| **status**
[`string`](../../../data-types.md) | Признак состояния приложения на портале ||
|| **client_endpoint**
[`string`](../../../data-types.md) | Общий путь для вызовов методов REST API на портале, где произошло событие ||
|| **member_id**
[`string`](../../../data-types.md) | Уникальный идентификатор Битрикс24 ||
|| **refresh_token**
[`string`](../../../data-types.md) | OAuth-токен продления авторизации бота ||
|| **user_id**
[`integer`](../../../data-types.md) | Идентификатор пользователя-бота ||
|| **client_id**
[`string`](../../../data-types.md) | Идентификатор приложения, выданный при регистрации ||
|| **application_token**
[`string`](../../../data-types.md) | Токен приложения ||
|| **AUTH**
[`object`](../../../data-types.md) | Параметры авторизации бота в формате `auth`.

Структура описана [ниже](#auth) ||
|| **BOT_ID**
[`integer`](../../../data-types.md) | Идентификатор бота ||
|| **BOT_CODE**
[`string`](../../../data-types.md) | Символьный код бота ||
|#

### Параметр PARAMS {#params}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **CHAT_TYPE**
[`string`](../../../data-types.md) | Тип чата, в который добавили бота.

Возможные значения:
- `P` — private, личный чат
- `C` — group chat, групповой чат
- `O` — open chat, открытый чат
- `L` — open line, чат открытой линии
- `S` — system/notify, системное уведомление
- `N` — channel, канал
- `J` — open channel, открытый канал
- `T` — comment thread, ветка комментариев
- `A` — copilot chat, чат CoPilot
- `B` — collab, коллаб
- `X` — external, внешний чат  ||
|| **MESSAGE_TYPE**
[`string`](../../../data-types.md) | Тип сообщения.

Возможные значения:
- `P` — private, личный чат
- `C` — group chat, групповой чат
- `O` — open chat, открытый чат
- `L` — open line, чат открытой линии
- `S` — system/notify, системное уведомление
- `N` — channel, канал
- `J` — open channel, открытый канал
- `T` — comment thread, ветка комментариев
- `A` — copilot chat, чат CoPilot
- `B` — collab, коллаб
- `X` — external, внешний чат  ||
|| **BOT_ID**
[`integer`](../../../data-types.md) | Идентификатор бота ||
|| **USER_ID**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который добавил бота ||
|| **TO_USER_ID**
[`integer`](../../../data-types.md) | Идентификатор пользователя, с которым создан личный диалог. Параметр только для личного чата ||
|| **FROM_USER_ID**
[`integer`](../../../data-types.md) | Идентификатор бота в личном диалоге. Параметр только для личного чата ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор группового чата. Параметр только для группового чата ||
|| **CHAT_AUTHOR_ID**
[`integer`](../../../data-types.md) | Идентификатор владельца группового чата. Параметр только для группового чата ||
|| **CHAT_ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта, к которой привязан групповой чат. Параметр только для группового чата ||
|| **CHAT_ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор объекта, к которой привязан групповой чат. Параметр только для группового чата ||
|| **ACCESS_HISTORY**
[`integer`](../../../data-types.md) | Признак доступа бота к истории: `1` — доступ есть, `0` — без доступа. Параметр только для группового чата ||
|| **SILENT_JOIN**
[`string`](../../../data-types.md) | Признак добавления бота без системного сообщения: `Y` или `N`. Параметр только для группового чата Copilot ||
|| **DIALOG_ID**
[`string`](../../../data-types.md) | Идентификатор диалога ||
|| **LANGUAGE**
[`string`](../../../data-types.md) | Язык Битрикс24 по умолчанию ||
|#

### Параметр USER {#user}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор пользователя ||
|| **NAME**
[`string`](../../../data-types.md) | Имя и фамилия пользователя ||
|| **FIRST_NAME**
[`string`](../../../data-types.md) | Имя пользователя ||
|| **LAST_NAME**
[`string`](../../../data-types.md) | Фамилия пользователя ||
|| **WORK_POSITION**
[`string`](../../../data-types.md) | Должность пользователя ||
|| **GENDER**
[`string`](../../../data-types.md) | Пол пользователя: `M` или `F` ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../messages/events/on-imbot-message-add.md)
- [{#T}](../../messages/events/on-imbot-message-update.md)
- [{#T}](../../messages/events/on-imbot-message-delete.md)
- [{#T}](../../events/on-imbot-delete.md)