# Событие при изменении сообщения ONIMBOTMESSAGEUPDATE

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может подписаться: пользователь приложения, которое зарегистрировало чат-бота

Событие `ONIMBOTMESSAGEUPDATE` срабатывает при изменении сообщения в диалоге с чат-ботом. Событие работает только в контексте приложения чат-бота.

Для ботов с `TYPE=B/H` и `OPENLINE=N` параметр `EVENT_MESSAGE_UPDATE` игнорируется в методе [imbot.register](../../imbot-register.md). Чтобы событие срабатывало для таких ботов, привяжите обработчик `EVENT_MESSAGE_UPDATE` с помощью метода [imbot.update](../../imbot-update.md).

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Правило срабатывания события 

Событие срабатывает, если привязан обработчик `EVENT_MESSAGE_UPDATE` и сообщение соответствует логике типа бота:
- `TYPE=B/H`:
    - личный чат с ботом: событие срабатывает независимо от упоминаний,
    - групповой чат: срабатывает только при упоминании бота,
- `TYPE=S` — событие срабатывает независимо от упоминаний,
- `TYPE=O` — событие срабатывает в чатах открытых линий, где участвует бот.

Без `EVENT_MESSAGE_UPDATE` событие не сработает независимо от упоминаний.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- Личный чат с ботом

    ```json
    {
        "event": "ONIMBOTMESSAGEUPDATE",
        "event_handler_id": "455",
        "data": {
            "BOT": {
                "571": {
                    "access_token": "880aa0690000071b000008440000023bf0f107a4af72f200b757ece",
                    "expires": "1772096136",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                    "refresh_token": "7889c7690000071b000008440000023bf0f107ad212748fb2268",
                    "user_id": "571",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "831c76b092f9f135d9b6b36c3a720757",
                    "AUTH": {
                        "access_token": "880aa0690000071b000008440000023bf0f107a4af72f200b757ece",
                        "expires": "1772096136",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                        "refresh_token": "7889c7690000071b000008440000023bf0f107ad212748fb2268",
                        "user_id": "571",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "831c76b092f9f135d9b6b36c3a720757"
                    },
                    "BOT_ID": "571",
                    "BOT_CODE": "BOT"
                }
            },
            "PARAMS": {
                "ID": "84531",
                "CHAT_ID": "1453",
                "AUTHOR_ID": "27",
                "MESSAGE": "Как добавить наблюдателя в задачу?",
                "MESSAGE_TYPE": "P",
                "CHAT_AUTHOR_ID": "571",
                "CHAT_ENTITY_ID": "",
                "CHAT_ENTITY_DATA_1": "",
                "CHAT_ENTITY_DATA_2": "",
                "CHAT_ENTITY_DATA_3": "",
                "FROM_USER_ID": "27",
                "TO_USER_ID": "571",
                "CHAT_USER_COUNT": "2",
                "PLATFORM_CONTEXT": "web",
                "DIALOG_ID": "27",
                "MESSAGE_ID": "84531",
                "CHAT_TYPE": "P",
                "LANGUAGE": "ru"
            },
            "USER": {
                "ID": "27",
                "NAME": "Светлана Иванова",
                "FIRST_NAME": "Светлана",
                "LAST_NAME": "Иванова",
                "WORK_POSITION": "",
                "GENDER": "F",
                "IS_BOT": "N",
                "IS_CONNECTOR": "N",
                "IS_NETWORK": "N",
                "IS_EXTRANET": "N"
            }
        },
        "ts": "1772092536",
        "auth": {
            "access_token": "880aa06900071b00084400001b0007dff360d21523410a45b4f7c12",
            "expires": "1772096136",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
            "user_id": "27",
            "refresh_token": "7889c769000071b000084400001b00007c0063d012b7284",
            "application_token": "831c76b092f9f135d9b6b36c3a720757"
        }
    }
    ```

- Групповой чат

    ```json
    {
        "event": "ONIMBOTMESSAGEUPDATE",
        "event_handler_id": "455",
        "data": {
            "BOT": {
                "571": {
                    "access_token": "2c1da06900071b00084400023bf0f107464a9d34dc68a6b185f",
                    "expires": "1772100908",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                    "refresh_token": "1c9cc76900071b00084400023bf0f107bbc698c8eca4b3e89099f4",
                    "user_id": "571",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "831c76b092f9f135d9b6b36c3a720757",
                    "AUTH": {
                        "access_token": "2c1da06900071b00084400023bf0f107464a9d34dc68a6b185f",
                        "expires": "1772100908",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                        "refresh_token": "1c9cc76900071b00084400023bf0f107bbc698c8eca4b3e89099f4",
                        "user_id": "571",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "831c76b092f9f135d9b6b36c3a720757"
                    },
                    "BOT_ID": "571",
                    "BOT_CODE": "BOT"
                }
            },
            "PARAMS": {
                "ID": "84537",
                "CHAT_ID": "1157",
                "AUTHOR_ID": "27",
                "MESSAGE": "оформи список задач",
                "MESSAGE_TYPE": "C",
                "CHAT_AUTHOR_ID": "27",
                "CHAT_ENTITY_TYPE": "THREAD",
                "CHAT_ENTITY_ID": "",
                "CHAT_ENTITY_DATA_1": "",
                "CHAT_ENTITY_DATA_2": "",
                "CHAT_ENTITY_DATA_3": "",
                "CHAT_USER_COUNT": "2",
                "MENTIONED_LIST": {
                    "571": "571"
                },
                "PLATFORM_CONTEXT": "web",
                "MESSAGE_ORIGINAL": "[USER=571]NewBot[/USER], оформи список задач",
                "TO_USER_ID": "571",
                "DIALOG_ID": "chat1157",
                "MESSAGE_ID": "84537",
                "CHAT_TYPE": "C",
                "LANGUAGE": "ru"
            }
        },
        "ts": "1772097308",
        "auth": {
            "access_token": "2c1da06900071b00084400001b00077e03d155e8",
            "expires": "1772100908",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
            "user_id": "27",
            "refresh_token": "1c9cc76900071b00084400001b00007b2dbee904c1",
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

В данном случае — `ONIMBOTMESSAGEUPDATE` ||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события. ||
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
[`object`](../../../data-types.md) | Набор параметров авторизации ботов, которым адресовано событие. Ключ объекта — идентификатор бота `BOT_ID`.

Структура описана [ниже](#bot) ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры измененного сообщения.

Структура описана [ниже](#params) ||
|| **USER**
[`object`](../../../data-types.md) | Данные автора сообщения. Может отсутствовать или быть пустым.

Структура описана [ниже](#user) ||
|#

### Параметр BOT {#bot}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **{BOT_ID}**
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
[`string`](../../../data-types.md) | Общий путь для вызовов методов REST API для портала, на котором произошло событие ||
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
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор сообщения ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор чата ||
|| **AUTHOR_ID**
[`integer`](../../../data-types.md) | Идентификатор автора сообщения ||
|| **MESSAGE**
[`string`](../../../data-types.md) | Текст сообщения после изменения.

В групповом чате текст передается без BB-кода упоминания бота ||
|| **MESSAGE_TYPE**
[`string`](../../../data-types.md) | Тип сообщения

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
- `X` — external, внешний чат ||
|| **CHAT_AUTHOR_ID**
[`integer`](../../../data-types.md) | Идентификатор владельца чата ||
|| **CHAT_ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта, к которому привязан чат ||
|| **CHAT_ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор объекта, к которому привязан чат ||
|| **CHAT_ENTITY_DATA_1**
[`string`](../../../data-types.md) | Дополнительные данные объекта чата — поле 1 ||
|| **CHAT_ENTITY_DATA_2**
[`string`](../../../data-types.md) | Дополнительные данные объекта чата — поле 2 ||
|| **CHAT_ENTITY_DATA_3**
[`string`](../../../data-types.md) | Дополнительные данные объекта чата — поле 3 ||
|| **FROM_USER_ID**
[`integer`](../../../data-types.md) | Идентификатор отправителя сообщения. Поле заполняется для личного чата ||
|| **TO_USER_ID**
[`integer`](../../../data-types.md) | Идентификатор получателя.

В личном чате это идентификатор бота, в групповом чате — идентификатор пользователя или бота, которому адресовано сообщение.

Значение `0` — всем участникам чата ||
|| **CHAT_USER_COUNT**
[`integer`](../../../data-types.md) | Количество участников чата ||
|| **MENTIONED_LIST**
[`object`](../../../data-types.md) | Упоминания пользователей в сообщении. Параметр зависит от типа чата, в личном диалоге отсутствует.

Структура описана [ниже](#mentioned-list) ||
|| **PLATFORM_CONTEXT**
[`string`](../../../data-types.md) | Платформа, из которой отправлено сообщение ||
|| **MESSAGE_ORIGINAL**
[`string`](../../../data-types.md) | Исходный текст сообщения с BB-кодом упоминаний. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **DIALOG_ID**
[`string`](../../../data-types.md) | Идентификатор диалога ||
|| **MESSAGE_ID**
[`integer`](../../../data-types.md) | Идентификатор сообщения. Дублирует поле `ID` ||
|| **CHAT_TYPE**
[`string`](../../../data-types.md) | Тип чата. 

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
- `X` — external, внешний чат ||
|| **LANGUAGE**
[`string`](../../../data-types.md) | Язык Битрикс24 по умолчанию ||
|#

#### Параметр MENTIONED_LIST {#mentioned-list}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **{USER_ID}**
[`integer`](../../../data-types.md) | Идентификатор пользователя или бота, упомянутого в сообщении ||
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
|| **IS_BOT**
[`string`](../../../data-types.md) | Признак пользователя-бота: `Y` или `N` ||
|| **IS_CONNECTOR**
[`string`](../../../data-types.md) | Признак пользователя-коннектора: `Y` или `N` ||
|| **IS_NETWORK**
[`string`](../../../data-types.md) | Признак внешнего сетевого пользователя: `Y` или `N` ||
|| **IS_EXTRANET**
[`string`](../../../data-types.md) | Признак экстранет-пользователя: `Y` или `N` ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-imbot-message-add.md)
- [{#T}](./on-imbot-message-delete.md)
- [{#T}](../imbot-message-add.md)
- [{#T}](../imbot-message-update.md)
- [{#T}](../imbot-message-delete.md)
- [{#T}](../../imbot-register.md)
