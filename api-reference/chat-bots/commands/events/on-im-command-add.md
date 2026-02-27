# Событие при вызове команды чат-бота ONIMCOMMANDADD

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может подписаться: пользователь приложения, которое зарегистрировало чат-бота

Событие `ONIMCOMMANDADD` срабатывает, когда пользователь вызывает команду бота в чате.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- Личный чат с ботом

    ```json
    {
        "event": "ONIMCOMMANDADD",
        "event_handler_id": "1045",
        "data": {
            "COMMAND": {
                "103": {
                    "access_token": "be4ca0690000071b006e2cf200050b0077317605eb83b25d2bd6",
                    "expires": "1772113086",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "d897063e1ce7c5eb9f04b9751eef5915",
                    "refresh_token": "aecbc7690000071b006e2cf200050b007f827f47e120e49da",
                    "user_id": "1291",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "8e3ab48a764a9b02700e759d59e91125",
                    "AUTH": {
                        "access_token": "be4ca0690000071b006e2cf200050b0077317605eb83b25d2bd6",
                        "expires": "1772113086",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "d897063e1ce7c5eb9f04b9751eef5915",
                        "refresh_token": "aecbc7690000071b006e2cf200050b007f827f47e120e49da",
                        "user_id": "1291",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "8e3ab48a764a9b02700e759d59e91125"
                    },
                    "BOT_ID": "1291",
                    "BOT_CODE": "BOT_GM",
                    "COMMAND": "echo",
                    "COMMAND_ID": "103",
                    "COMMAND_PARAMS": "test",
                    "COMMAND_CONTEXT": "TEXTAREA",
                    "MESSAGE_ID": "33899"
                }
            },
            "PARAMS": {
                "MESSAGE": "/echo test",
                "TEMPLATE_ID": "acae8d22-4536-4f47-a276-2e3bdf866475",
                "MESSAGE_TYPE": "P",
                "FROM_USER_ID": "1269",
                "DIALOG_ID": "1269",
                "TO_CHAT_ID": "2737",
                "AUTHOR_ID": "1269",
                "SYSTEM": "N",
                "TO_USER_ID": "1291",
                "SKIP_USER_CHECK": "Y",
                "PUSH": "Y",
                "PUSH_IMPORTANT": "N",
                "RECENT_ADD": "Y",
                "RECENT_SKIP_AUTHOR": "N",
                "CONVERT": "N",
                "SKIP_COMMAND": "N",
                "SKIP_COUNTER_INCREMENTS": "N",
                "SILENT_CONNECTOR": "N",
                "SKIP_CONNECTOR": "N",
                "IMPORTANT_CONNECTOR": "N",
                "NO_SESSION_OL": "N",
                "FAKE_RELATION": "0",
                "SKIP_URL_INDEX": "N",
                "MESSAGE_ID": "33899",
                "CHAT_TYPE": "P",
                "LANGUAGE": "ru"
            },
            "USER": {
                "ID": "1269",
                "NAME": "Иван Смирнов",
                "FIRST_NAME": "Иван",
                "LAST_NAME": "Смирнов",
                "GENDER": "M"
            }
        },
        "ts": "1772109486",
        "auth": {
            "access_token": "be4ca06900071b006e2cf200004f50005243fd374178cf59f7831",
            "expires": "1772113086",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "d897063e1ce7c5eb9f04b9751eef5915",
            "user_id": "1269",
            "refresh_token": "aecbc76900071b006e2cf20004f50000f2e62ee8e8baa598968",
            "application_token": "8e3ab48a764a9b02700e759d59e91125"
        }
    }
    ```

- Групповой чат

    ```json
    {
        "event": "ONIMCOMMANDADD",
        "event_handler_id": "1035",
        "data": {
            "COMMAND": {
                "99": {
                    "access_token": "f1ca0690000071b006e2cf20050b00074d9ed82e255b",
                    "expires": "1772100799",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "d897063e1ce7c5eb9f04b9751eef5915",
                    "refresh_token": "af9bc7690000071b006e2cf2050b00074d5d4c29337afbc6bb",
                    "user_id": "1291",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "8e3ab48a764a9b02700e759d59e91125",
                    "AUTH": {
                        "access_token": "f1ca0690000071b006e2cf20050b00074d9ed82e255b",
                        "expires": "1772100799",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "d897063e1ce7c5eb9f04b9751eef5915",
                        "refresh_token": "af9bc7690000071b006e2cf2050b00074d5d4c29337afbc6bb",
                        "user_id": "1291",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "8e3ab48a764a9b02700e759d59e91125"
                    },
                    "BOT_ID": "1291",
                    "BOT_CODE": "BOT_GM",
                    "COMMAND": "echo",
                    "COMMAND_ID": "99",
                    "COMMAND_PARAMS": "test",
                    "COMMAND_CONTEXT": "TEXTAREA",
                    "MESSAGE_ID": "33871"
                }
            },
            "PARAMS": {
                "MESSAGE": "/echo test",
                "TEMPLATE_ID": "eb3d5b1c-0830-4728-a7a3-73e9745a90a1",
                "MESSAGE_TYPE": "C",
                "FROM_USER_ID": "1269",
                "DIALOG_ID": "chat2725",
                "TO_CHAT_ID": "2725",
                "AUTHOR_ID": "1269",
                "SYSTEM": "N",
                "CHAT_ID": "2725",
                "CHAT_PARENT_ID": "0",
                "CHAT_PARENT_MID": "0",
                "CHAT_TITLE": "Новое имя для чата",
                "CHAT_AUTHOR_ID": "1291",
                "CHAT_TYPE": "C",
                "CHAT_AVATAR": "33079",
                "CHAT_COLOR": "GREEN",
                "CHAT_ENTITY_TYPE": "CHAT",
                "CHAT_ENTITY_ID": "13",
                "CHAT_ENTITY_DATA_1": "",
                "CHAT_ENTITY_DATA_2": "",
                "CHAT_ENTITY_DATA_3": "",
                "CHAT_EXTRANET": "N",
                "CHAT_PREV_MESSAGE_ID": "0",
                "CHAT_CAN_POST": "MEMBER",
                "RID": "1269",
                "IS_MANAGER": "N",
                "BOT_IN_CHAT": {
                    "1291": "1291"
                },
                "SKIP_USER_CHECK": "Y",
                "PUSH": "Y",
                "PUSH_IMPORTANT": "N",
                "RECENT_ADD": "Y",
                "RECENT_SKIP_AUTHOR": "N",
                "CONVERT": "N",
                "SKIP_COMMAND": "N",
                "SKIP_COUNTER_INCREMENTS": "N",
                "SILENT_CONNECTOR": "N",
                "SKIP_CONNECTOR": "N",
                "IMPORTANT_CONNECTOR": "N",
                "NO_SESSION_OL": "N",
                "FAKE_RELATION": "0",
                "SKIP_URL_INDEX": "N",
                "MESSAGE_ID": "33871",
                "LANGUAGE": "ru"
            },
            "USER": {
                "ID": "1269",
                "NAME": "Иван Смирнов",
                "FIRST_NAME": "Иван",
                "LAST_NAME": "Смирнов",
                "GENDER": "M"
            }
        },
        "ts": "1772097199",
        "auth": {
            "access_token": "bf1ca06900071b006e2cf200004f500031d5d527f58a97b0768",
            "expires": "1772100799",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "d897063e1ce7c5eb9f04b9751eef5915",
            "user_id": "1269",
            "refresh_token": "af9bc76900071b006e2cf200004f50080d2934573350daabf8",
            "application_token": "8e3ab48a764a9b02700e759d59e91125"
        }
    }
    ```

{% endlist %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONIMCOMMANDADD` ||
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
|| **COMMAND**
[`object`](../../../data-types.md) | Набор вызванных команд чат-бота.

Структура описана [ниже](#command) ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры сообщения, в котором была вызвана команда.

Структура описана [ниже](#params) ||
|| **USER**
[`object`](../../../data-types.md) | Данные автора сообщения. Может быть пустым объектом, если `FROM_USER_ID = 0`.

Структура описана [ниже](#user) ||
|#

### Параметр COMMAND {#command}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **{COMMAND_ID}**
[`object`](../../../data-types.md) | Объект данных конкретной вызванной команды. Ключ соответствует идентификатору команды, например `103`.

Структура описана [ниже](#command-item) ||
|#

#### Элемент \{COMMAND_ID\} {#command-item}

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
[`string`](../../../data-types.md) | Базовый путь для вызова REST API на текущем портале ||
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
|| **COMMAND**
[`string`](../../../data-types.md) | Символьный код вызванной команды ||
|| **COMMAND_ID**
[`integer`](../../../data-types.md) | Идентификатор вызванной команды ||
|| **COMMAND_PARAMS**
[`string`](../../../data-types.md) | Параметры, с которыми вызвана команда ||
|| **COMMAND_CONTEXT**
[`string`](../../../data-types.md) | Контекст вызова команды.

Возможные значения:
- `TEXTAREA` — команда введена вручную
- `KEYBOARD` — команда вызвана кнопкой клавиатуры ||
|| **MESSAGE_ID**
[`integer`](../../../data-types.md) | Идентификатор сообщения, на которое нужно ответить ||
|#

### Параметр PARAMS {#params}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **MESSAGE**
[`string`](../../../data-types.md) | Текст сообщения с командой ||
|| **TEMPLATE_ID**
[`string`](../../../data-types.md) | Идентификатор шаблона сообщения ||
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
- `X` — external, внешний чат ||
|| **FROM_USER_ID**
[`integer`](../../../data-types.md) | Идентификатор отправителя сообщения ||
|| **DIALOG_ID**
[`string`](../../../data-types.md) | Идентификатор диалога ||
|| **TO_CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор чата ||
|| **AUTHOR_ID**
[`integer`](../../../data-types.md) | Идентификатор автора сообщения ||
|| **SYSTEM**
[`string`](../../../data-types.md) | Признак системного сообщения: `Y` или `N` ||
|| **TO_USER_ID**
[`integer`](../../../data-types.md) | Идентификатор собеседника в личном чате. Параметр доступен только для личного чата ||
|| **SKIP_USER_CHECK**
[`string`](../../../data-types.md) | Пропустить проверку пользователя: `Y` или `N` ||
|| **PUSH**
[`string`](../../../data-types.md) | Признак отправки push-уведомления: `Y` или `N` ||
|| **PUSH_IMPORTANT**
[`string`](../../../data-types.md) | Признак важного push-уведомления: `Y` или `N` ||
|| **RECENT_ADD**
[`string`](../../../data-types.md) | Добавить сообщение в список Последние чаты: `Y` или `N` ||
|| **RECENT_SKIP_AUTHOR**
[`string`](../../../data-types.md) | Исключить автора из обновления списка Последние чаты: `Y` или `N` ||
|| **CONVERT**
[`string`](../../../data-types.md) | Признак конвертации форматирования сообщения: `Y` или `N` ||
|| **SKIP_COMMAND**
[`string`](../../../data-types.md) | Пропустить обработку команд в сообщении: `Y` или `N` ||
|| **SKIP_COUNTER_INCREMENTS**
[`string`](../../../data-types.md) | Не увеличивать счетчики непрочитанных сообщений: `Y` или `N` ||
|| **SILENT_CONNECTOR**
[`string`](../../../data-types.md) | Отправить сообщение во внешний коннектор без уведомления: `Y` или `N` ||
|| **SKIP_CONNECTOR**
[`string`](../../../data-types.md) | Не отправлять сообщение во внешние коннекторы: `Y` или `N` ||
|| **IMPORTANT_CONNECTOR**
[`string`](../../../data-types.md) | Признак важного сообщения для коннектора: `Y` или `N` ||
|| **NO_SESSION_OL**
[`string`](../../../data-types.md) | Не создавать сессию Открытой линии: `Y` или `N` ||
|| **FAKE_RELATION**
[`integer`](../../../data-types.md) | Системное значение связи пользователя с чатом ||
|| **SKIP_URL_INDEX**
[`string`](../../../data-types.md) | Не индексировать ссылки из сообщения: `Y` или `N` ||
|| **MESSAGE_ID**
[`integer`](../../../data-types.md) | Идентификатор сообщения ||
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
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор чата. Параметр доступен только для группового чата ||
|| **CHAT_PARENT_ID**
[`integer`](../../../data-types.md) | Идентификатор родительского чата. Параметр доступен только для группового чата ||
|| **CHAT_PARENT_MID**
[`integer`](../../../data-types.md) | Идентификатор родительского сообщения. Параметр доступен только для группового чата ||
|| **CHAT_TITLE**
[`string`](../../../data-types.md) | Название чата. Параметр доступен только для группового чата ||
|| **CHAT_AUTHOR_ID**
[`integer`](../../../data-types.md) | Идентификатор владельца чата. Параметр доступен только для группового чата ||
|| **CHAT_AVATAR**
[`string`](../../../data-types.md) | Идентификатор аватара чата. `0` — аватар не задан. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_COLOR**
[`string`](../../../data-types.md) | Цветовая схема чата. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта, к которому привязан чат. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор объекта, к которому привязан чат. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_ENTITY_DATA_1**
[`string`](../../../data-types.md) | Дополнительные данные объекта чата — поле 1. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_ENTITY_DATA_2**
[`string`](../../../data-types.md) | Дополнительные данные объекта чата — поле 2. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_ENTITY_DATA_3**
[`string`](../../../data-types.md) | Дополнительные данные объекта чата — поле 3. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_EXTRANET**
[`string`](../../../data-types.md) | Признак экстранет-чата: `Y` или `N`. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_PREV_MESSAGE_ID**
[`integer`](../../../data-types.md) | Идентификатор предыдущего сообщения в чате. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_CAN_POST**
[`string`](../../../data-types.md) | Право текущего пользователя отправлять сообщения в чат. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **RID**
[`integer`](../../../data-types.md) | Идентификатор записи связи пользователя с чатом. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **IS_MANAGER**
[`string`](../../../data-types.md) | Признак роли менеджера: `Y` или `N`. Параметр доступен только для группового чата ||
|| **BOT_IN_CHAT**
[`object`](../../../data-types.md) | Список ботов, состоящих в чате. Параметр доступен только для группового чата.

Структура описана [ниже](#bot-in-chat) ||
|#

#### Параметр BOT_IN_CHAT {#bot-in-chat}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **{BOT_ID}**
[`integer`](../../../data-types.md) | Идентификатор бота, состоящего в чате ||
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
|| **GENDER**
[`string`](../../../data-types.md) | Пол пользователя: `M` или `F` ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../chats/events/on-imbot-join-chat.md)
- [{#T}](../../messages/events/on-imbot-message-add.md)
- [{#T}](../../messages/events/on-imbot-message-update.md)
- [{#T}](../../messages/events/on-imbot-message-delete.md)