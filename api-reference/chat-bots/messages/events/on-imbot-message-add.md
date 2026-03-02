# Событие при отправке сообщения ONIMBOTMESSAGEADD

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может подписаться: пользователь приложения, которое зарегистрировало чат-бота

Событие `ONIMBOTMESSAGEADD` срабатывает при отправке сообщения в диалоге с чат-ботом. В групповом чате событие срабатывает, если упомянуть чат-бота.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- Личный чат с ботом

    ```json
    {
        "event": "ONIMBOTMESSAGEADD",
        "event_handler_id": "403",
        "data": {
            "BOT": {
                "567": {
                    "access_token": "a98b9d690000071b0000084400000237f0f107589d1e",
                    "expires": "1771932585",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                    "refresh_token": "990ac5690000071b0000084400000237",
                    "user_id": "567",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "831c76b092f9f135d9b6b36c3a720757",
                    "AUTH": {
                        "access_token": "a98b9d690000071b0000084400000237f0f107589d1e",
                        "expires": "1771932585",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                        "refresh_token": "990ac5690000071b0000084400000237",
                        "user_id": "567",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "831c76b092f9f135d9b6b36c3a720757"
                    },
                    "BOT_ID": "567",
                    "BOT_CODE": "BOT1"
                }
            },
            "PARAMS": {
                "MESSAGE": "Привет",
                "TEMPLATE_ID": "796c45aa-70e5-45aa-930c-c7fb32710c62",
                "MESSAGE_TYPE": "P",
                "FROM_USER_ID": "27",
                "DIALOG_ID": "27",
                "TO_CHAT_ID": "1407",
                "AUTHOR_ID": "27",
                "SYSTEM": "N",
                "TO_USER_ID": "567",
                "PUSH": "Y",
                "PUSH_IMPORTANT": "N",
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
                "COMMAND_CONTEXT": "TEXTAREA",
                "CHAT_USER_COUNT": "2",
                "PLATFORM_CONTEXT": "web",
                "MESSAGE_ID": "84331",
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
        "ts": "1771928985",
        "auth": {
            "access_token": "a98b9d690000071b000008440000001b0000071d8a2",
            "expires": "1771932585",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
            "user_id": "27",
            "refresh_token": "990ac569071b000008440000001b000007f80ccc35b5e3",
            "application_token": "831c76b092f9f135d9b66c3a720757"
        }
    }
    ```

- Групповой чат

    ```json
    {
        "event": "ONIMBOTMESSAGEADD",
        "event_handler_id": "403",
        "data": {
            "BOT": {
                "567": {
                    "access_token": "ccb69d690000071b0000084400000237f0f10799e08fc9016818e8b51ecc9f7b5342a5",
                    "expires": "1771943628",
                    "expires_in": "3600",
                    "scope": "imbot",
                    "domain": "some-domain.bitrix24.ru",
                    "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                    "status": "F",
                    "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                    "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                    "refresh_token": "bc35c5690000071b0000084400000237f0f107abd386665cf9cfc96eaf25e017730bc5",
                    "user_id": "567",
                    "client_id": "a7eff906dd1d950269258a599214f69e",
                    "application_token": "831c76b092f9f135d9b6b36c3a720757",
                    "AUTH": {
                        "access_token": "ccb69d690000071b0000084400000237f0f10799e08fc9016818e8b51ecc9f7b5342a5",
                        "expires": "1771943628",
                        "expires_in": "3600",
                        "scope": "imbot",
                        "domain": "some-domain.bitrix24.ru",
                        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
                        "status": "F",
                        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
                        "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
                        "refresh_token": "bc35c5690000071b0000084400000237f0f107abd386665cf9cfc96eaf25e017730bc5",
                        "user_id": "567",
                        "client_id": "a7eff906dd1d950269258a599214f69e",
                        "application_token": "831c76b092f9f135d9b6b36c3a720757"
                    },
                    "BOT_ID": "567",
                    "BOT_CODE": "BOT1"
                }
            },
            "PARAMS": {
                "MESSAGE": ", как настроить левое меню",
                "TEMPLATE_ID": "6d0eef7c-12b4-41e7-b709-887ba410ded3",
                "MESSAGE_TYPE": "C",
                "FROM_USER_ID": "27",
                "DIALOG_ID": "chat1157",
                "TO_CHAT_ID": "1157",
                "AUTHOR_ID": "27",
                "SYSTEM": "N",
                "CHAT_ID": "1157",
                "CHAT_TITLE": "Бурый чат №18",
                "CHAT_AUTHOR_ID": "27",
                "CHAT_TYPE": "C",
                "CHAT_AVATAR": "0",
                "CHAT_COLOR": "BROWN",
                "CHAT_ENTITY_TYPE": "THREAD",
                "CHAT_ENTITY_ID": "",
                "CHAT_ENTITY_DATA_1": "",
                "CHAT_ENTITY_DATA_2": "",
                "CHAT_ENTITY_DATA_3": "",
                "CHAT_EXTRANET": "N",
                "CHAT_PREV_MESSAGE_ID": "80961",
                "CHAT_CAN_POST": "MEMBER",
                "RID": "27",
                "IS_MANAGER": "N",
                "PUSH": "Y",
                "PUSH_IMPORTANT": "N",
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
                "COMMAND_CONTEXT": "TEXTAREA",
                "CHAT_USER_COUNT": "2",
                "MENTIONED_LIST": {
                    "567": "567"
                },
                "PLATFORM_CONTEXT": "web",
                "MESSAGE_ORIGINAL": "[USER=567]NewBot[/USER] , как настроить левое меню",
                "TO_USER_ID": "567",
                "MESSAGE_ID": "84351",
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
        "ts": "1771940028",
        "auth": {
            "access_token": "ccb69d690000071b000008440000001b0000078c69a6b996b744c26b73e80ddeda0052",
            "expires": "1771943628",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
            "user_id": "27",
            "refresh_token": "bc35c5690000071b000008440000001b000007b7a839f68bc2cdd19de2677410425077",
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

В данном случае — `ONIMBOTMESSAGEADD` ||
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
[`object`](../../../data-types.md) | Набор параметров авторизации ботов, которым предназначено сообщение. Ключ объекта — идентификатор бота `BOT_ID`.

Структура описана [ниже](#bot) ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры сообщения.

Структура описана [ниже](#params) ||
|| **USER**
[`object`](../../../data-types.md) | Данные автора сообщения. Может быть пустым объектом, если `ID = 0`.

Структура описана [ниже](#user) ||
|#

### Параметр BOT {#bot}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **\{BOT_ID\}**
[`object`](../../../data-types.md) | Объект данных конкретного бота. Ключ соответствует идентификатору бота, например `567`.

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
[`string`](../../../data-types.md) | Общий путь для вызовов методов REST API для Битрикс24, на котором произошло событие ||
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
|| **MESSAGE**
[`string`](../../../data-types.md) | Текст сообщения ||
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
[`integer`](../../../data-types.md) | Идентификатор получателя сообщения ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор чата. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_TITLE**
[`string`](../../../data-types.md) | Название чата. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_AUTHOR_ID**
[`integer`](../../../data-types.md) | Идентификатор владельца чата. Параметр зависит от типа чата, в личном диалоге отсутствует ||
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
|| **CHAT_AVATAR**
[`string`](../../../data-types.md) | Идентификатор аватара чата. `0` — аватар не задан. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_COLOR**
[`string`](../../../data-types.md) | Цветовая схема чата. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта, к которому привязан чат. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **CHAT_ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор объекта, к которой привязан чат. Параметр зависит от типа чата, в личном диалоге отсутствует ||
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
[`string`](../../../data-types.md) | Права текущего пользователя на отправку сообщений в чат. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **RID**
[`integer`](../../../data-types.md) | Идентификатор записи связи пользователя с чатом, системный параметр ||
|| **IS_MANAGER**
[`string`](../../../data-types.md) | Признак роли менеджера: `Y` или `N` ||
|| **PUSH**
[`string`](../../../data-types.md) | Признак отправки push-уведомления: `Y` или `N` ||
|| **PUSH_IMPORTANT**
[`string`](../../../data-types.md) | Признак важного push-уведомления: `Y` или `N` ||
|| **RECENT_SKIP_AUTHOR**
[`string`](../../../data-types.md) | Признак исключения автора из списка Последние чаты: `Y` или `N` ||
|| **CONVERT**
[`string`](../../../data-types.md) | Признак конвертации форматирования сообщения: `Y` или `N` ||
|| **SKIP_COMMAND**
[`string`](../../../data-types.md) | Пропустить обработку команд в сообщении: `Y` или `N` ||
|| **SKIP_COUNTER_INCREMENTS**
[`string`](../../../data-types.md) | Не увеличивать счетчики непрочитанных: `Y` или `N` ||
|| **SILENT_CONNECTOR**
[`string`](../../../data-types.md) | Отправить сообщение в коннектор без уведомления: `Y` или `N` ||
|| **SKIP_CONNECTOR**
[`string`](../../../data-types.md) | Не отправлять сообщение во внешние коннекторы: `Y` или `N` ||
|| **IMPORTANT_CONNECTOR**
[`string`](../../../data-types.md) | Признак важного сообщения для коннектора: `Y` или `N` ||
|| **NO_SESSION_OL**
[`string`](../../../data-types.md) | Не создавать сессию открытой линии: `Y` или `N` ||
|| **FAKE_RELATION**
[`integer`](../../../data-types.md) | Системное значение связи пользователя с чатом ||
|| **SKIP_URL_INDEX**
[`string`](../../../data-types.md) | Не индексировать ссылки из сообщения: `Y` или `N` ||
|| **COMMAND_CONTEXT**
[`string`](../../../data-types.md) | Контекст ввода команды ||
|| **CHAT_USER_COUNT**
[`integer`](../../../data-types.md) | Количество участников чата. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **MENTIONED_LIST**
[`object`](../../../data-types.md) | Упоминания пользователей в сообщении. Параметр зависит от типа чата, в личном диалоге отсутствует

Структура описана [ниже](#mentioned-list) ||
|| **PLATFORM_CONTEXT**
[`string`](../../../data-types.md) | Платформа, из которой отправлено сообщение ||
|| **MESSAGE_ORIGINAL**
[`string`](../../../data-types.md) | Оригинальный текст сообщения с BB-кодом. Параметр зависит от типа чата, в личном диалоге отсутствует ||
|| **MESSAGE_ID**
[`integer`](../../../data-types.md) | Идентификатор сообщения ||
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

- [{#T}](./index.md)
- [{#T}](./on-imbot-message-update.md)
- [{#T}](./on-imbot-message-delete.md)
- [{#T}](../imbot-message-add.md)
- [{#T}](../imbot-message-update.md)
- [{#T}](../imbot-message-delete.md)