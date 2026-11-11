# Форматы событий imbot.v2

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто получает события: приложение, которое зарегистрировало бота, или вебхук с тем же `botToken`

Где искать тип события и его данные, зависит от режима доставки:

- `fetch` — ответ [imbot.v2.Event.get](./event-get.md): тип в поле `result.events[].type`, данные в `result.events[].data`
- `webhook` — запрос на URL бота: тип в поле `event`, данные в `data`

Как выбрать режим, описано в обзоре [Режимы доставки событий](./index.md#event-modes).

Примеры сокращены и показывают данные в режиме `fetch`, а пример `ONIMBOTV2DELETE` — в режиме `webhook`. Полнее всего объекты `bot` и `user` показаны в примере [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd). Все поля `message`, `chat` и `user` описаны в статье [{#T}](../../entities.md).

## Автоматическое управление подписками

Подписку бота на события `ONIMBOTV2*` Битрикс24 ведет сам:

- создает при [imbot.v2.Bot.register](../bots/bot-register.md) с `fields.eventMode: "webhook"` и обязательным `fields.webhookUrl`
- добавляет подписку на новый адрес при [imbot.v2.Bot.update](../bots/bot-update.md), если передан новый `fields.webhookUrl`
- удаляет при [imbot.v2.Bot.unregister](../bots/bot-unregister.md) или переходе в режим `fetch`, если у приложения не осталось других ботов: подписки общие для всех ботов приложения

Событие любого бота приходит на `webhookUrl` всех ботов приложения. Поэтому после смены адреса или удаления бота прежний адрес продолжает получать события, пока у приложения есть другие боты.

Если возвращаете бота из режима `fetch` в `webhook`, передайте `fields.webhookUrl` вместе с `fields.eventMode`. Без адреса подписка не создается, и бот перестанет получать события, если у приложения нет других ботов с подпиской.

Вызывать [event.bind](../../../../events/event-bind.md) и [event.unbind](../../../../events/event-unbind.md) вручную не нужно: подписки разойдутся с теми, что ведет Битрикс24.

## Какие события обрабатывать в первую очередь

Минимальный набор событий для рабочего бота:

- [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd) — входящие сообщения от пользователя
- [ONIMBOTV2COMMANDADD](#onimbotv2commandadd) — вызовы слэш-команд
- [ONIMBOTV2JOINCHAT](#onimbotv2joinchat) — добавление бота в чат (обычно отправляют приветствие)
- [ONIMBOTV2DELETE](#onimbotv2delete) — удаление бота (очистка ресурсов), только в режиме `webhook`

Дополнительно по сценарию:

- [ONIMBOTV2MESSAGEUPDATE](#onimbotv2messageupdate) и [ONIMBOTV2MESSAGEDELETE](#onimbotv2messagedelete) — если поддерживаете редактирование/удаление
- [ONIMBOTV2REACTIONCHANGE](#onimbotv2reactionchange) — если учитываете реакции
- [ONIMBOTV2CONTEXTGET](#onimbotv2contextget) — если используете входной контекст диалога

## Формат объекта bot {#bot-format}

Содержимое поля `bot` зависит от режима доставки событий.

- **`fetch`** (`imbot.v2.Event.get`) — полный объект бота, как в ответе [imbot.v2.Bot.get](../bots/bot-get.md)
- **`webhook`** — объект `{id, code}`, а если бота зарегистрировало приложение — еще `auth`. В `auth` — OAuth-токены, с которыми обработчик вызывает методы в ответ на событие, например отправляет сообщение

Каждый webhook-вызов содержит данные **одного** бота. Если приложение зарегистрировало несколько ботов и событие касается нескольких из них — webhook вызывается отдельно для каждого.

Пример объекта `bot` в webhook-режиме. Значения приходят строками, как описано в разделе «Типы данных в webhook-режиме», остальные поля данных в примере опущены:

```json
{
    "bot": {
        "id": "456",
        "code": "support_bot",
        "auth": {
            "access_token": "0b02a0690000071b0008440001b0007a16b39202c2490f015",
            "expires": "1772093963",
            "expires_in": "3600",
            "scope": "imbot",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix24.tech/rest/",
            "status": "F",
            "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
            "member_id": "bac1cd5c8940947a75e0d71b1a84e348",
            "user_id": "456",
            "application_token": "831c76b092f9f135d9b6b36c3a720757"
        }
    }
}
```

### Структура webhook-уведомления {#webhook-payload}

Битрикс24 отправляет на `webhookUrl` бота POST-запрос с полями:

#|
|| **Поле** | **Тип** | **Описание** ||
|| **event** | `string` | Тип события, например `ONIMBOTV2MESSAGEADD` ||
|| **event_handler_id** | `string` | ID обработчика события в Битрикс24 ||
|| **data** | `object` | Данные события. Состав зависит от события и описан ниже ||
|| **ts** | `string` | Время отправки события, Unix timestamp ||
|| **auth** | `object` | Данные Битрикс24 — `domain`, `client_endpoint`, `server_endpoint`, `member_id` — и `application_token` для проверки запроса. Подробнее — [ниже](#auth) ||
|#

В запросе может быть **два разных `auth`**:

- **`auth` верхнего уровня** — данные Битрикс24 и токен для проверки запроса, приходит всегда
- **`data.bot.auth`** — OAuth-токены бота для вызова методов в ответ на событие. Приходит, только если бота зарегистрировало приложение

В примере из `data` показан только объект `bot`:

```json
{
    "event": "ONIMBOTV2MESSAGEADD",
    "event_handler_id": "1335",
    "data": {
        "bot": {
            "id": "456",
            "code": "support_bot",
            "auth": {"access_token": "...", "refresh_token": "...", "application_token": "..."}
        }
    },
    "ts": "1772093963",
    "auth": {
        "domain": "your-portal.bitrix24.ru",
        "application_token": "..."
    }
}
```

{% note warning "" %}

Чтобы проверить, что запрос отправил Битрикс24, сверяйте `application_token` с **верхнего уровня** — `auth.application_token`, а не `data.bot.auth.application_token`.

{% endnote %}

Запрос приходит в формате `application/x-www-form-urlencoded`, а не JSON: пример выше показывает только структуру данных. Ключи записаны в PHP-виде, как их кодирует `http_build_query`: `data[bot][id]=...`, `auth[application_token]=...`.

### Объект chat в событиях {#chat-in-events}

Объект `chat` в событиях не содержит полей `role` и `muteList` — эти поля зависят от конкретного пользователя и не могут быть одинаковыми для всех получателей событий.

### Параметр auth {#auth}

В событиях бота `auth` верхнего уровня содержит только `domain`, `client_endpoint`, `server_endpoint`, `member_id` и `application_token`. Токены доступа приходят в `data.bot.auth`. Таблица ниже — общий список ключей `auth` для всех событий Битрикс24.

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

{% note info "" %}

Есть ли поле `bot.auth`, зависит от режима доставки и от того, кто зарегистрировал бота:

- `webhook` — поле есть, если бота зарегистрировало приложение. У бота, зарегистрированного через входящий вебхук, поля нет: методы он вызывает тем же вебхуком
- `fetch` — поля нет: приложение или вебхук вызывает `imbot.v2.Event.get` и другие методы со своей авторизацией, отдельные токены не нужны

{% endnote %}

## Типы данных в webhook-режиме

В режиме `webhook` **все скалярные значения приходят строками**: числа, `true` и `false`. Поля со значением `null` и пустые массивы в запрос не попадают.

#|
|| **Тип** | **Значение в `fetch`** | **Значение в `webhook`** ||
|| `integer` | `789` | `"789"` ||
|| `boolean` | `true` / `false` | `"1"` / `"0"` ||
|| ```string|false``` | `false` | `"0"` ||
|| `null` | `null` | Поля нет в запросе ||
|| Пустой массив | `[]` | Поля нет в запросе ||
|#

При обработке событий в режиме `webhook` приводите типы явно: `(int)$data['message']['id']`, `$data['user']['active'] !== '0'`. Отсутствующее поле обрабатывайте как `null` или пустой массив, например `$data['message']['params'] ?? []`. В режиме `fetch` типы соответствуют документации.

---

## ONIMBOTV2MESSAGEADD {#onimbotv2messageadd}

Пользователь написал боту: в личном чате, с упоминанием бота или ответом на его сообщение. Боты типа `personal` и `supervisor` получают все сообщения пользователей в чатах, где состоят, кроме сообщений других ботов.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **message** | [`Message`](../../entities.md#message) | Отправленное сообщение ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором отправлено сообщение ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения ||
|| **language** | `string` | Язык Битрикс24 (например, `en`, `ru`) ||
|| **additionalMessages** | `array` | Массив объектов [`Message`](../../entities.md#message): исходное сообщение, если `message` — ответ на него. Если это не ответ, приходит пустой массив, а в режиме `webhook` поля нет ||
|#

### Пример данных

```json
{
    "bot": {
        "id": 456,
        "code": "support_bot",
        "type": "bot",
        "isHidden": false,
        "isSupportOpenline": false,
        "isReactionsEnabled": true,
        "backgroundId": null,
        "language": "en",
        "moduleId": "rest",
        "eventMode": "fetch",
        "countMessage": 150,
        "countCommand": 3,
        "countChat": 12,
        "countUser": 45
    },
    "message": {
        "id": 789,
        "chatId": 5,
        "authorId": 1,
        "date": "2025-01-15T10:30:00+03:00",
        "text": "[USER=456]Support Bot[/USER] Hello!",
        "isSystem": false,
        "uuid": null,
        "forward": null,
        "params": [],
        "viewedByOthers": false
    },
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "type": "chat",
        "name": "Support Chat",
        "entityType": "",
        "owner": 1,
        "avatar": "",
        "color": "#ab7761"
    },
    "user": {
        "id": 1,
        "active": true,
        "name": "John Smith",
        "firstName": "John",
        "lastName": "Smith",
        "workPosition": "Developer",
        "color": "#df532d",
        "avatar": "",
        "gender": "M",
        "birthday": "",
        "extranet": false,
        "bot": false,
        "connector": false,
        "externalAuthId": "default",
        "status": "online",
        "idle": false,
        "lastActivityDate": false,
        "absent": false,
        "departments": [1],
        "phones": false,
        "type": "user"
    },
    "language": "en",
    "additionalMessages": []
}
```

---

## ONIMBOTV2MESSAGEUPDATE {#onimbotv2messageupdate}

Сообщение отредактировано. Получателей Битрикс24 выбирает по тем же правилам, что у [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd).

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **message** | [`Message`](../../entities.md#message) | Обновленное сообщение ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором отредактировано сообщение ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения ||
|| **language** | `string` | Язык Битрикс24 ||
|| **additionalMessages** | `array` | Массив объектов [`Message`](../../entities.md#message): исходное сообщение, если `message` — ответ на него. Если это не ответ, приходит пустой массив, а в режиме `webhook` поля нет ||
|#

Формат данных идентичен [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd). Поле `message` содержит обновленный текст.

---

## ONIMBOTV2MESSAGEDELETE {#onimbotv2messagedelete}

Сообщение удалено. Получателей Битрикс24 выбирает по тем же правилам, что у [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd).

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **messageId** | `integer` | ID удаленного сообщения ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором удалено сообщение ||
|| **user** | [`User`](../../entities.md#user) | Автор удаленного сообщения ||
|| **language** | `string` | Язык Битрикс24 ||
|#

### Пример данных

```json
{
    "bot": {
        "id": 456,
        "code": "support_bot",
        "type": "bot",
        "eventMode": "fetch"
    },
    "messageId": 789,
    "chat": {
        "id": 112,
        "dialogId": "129",
        "type": "private"
    },
    "user": {
        "id": 129,
        "name": "Мария Иванова"
    },
    "language": "ru"
}
```

---

## ONIMBOTV2JOINCHAT {#onimbotv2joinchat}

Бота добавили в чат или бот получил приглашение.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **dialogId** | `string` | ID диалога (например, `chat5`) ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в который добавлен бот ||
|| **user** | [`User`](../../entities.md#user) | Пользователь, добавивший бота ||
|| **language** | `string` | Язык Битрикс24 ||
|#

### Пример данных

```json
{
    "bot": {
        "id": 456,
        "code": "support_bot",
        "type": "bot",
        "eventMode": "fetch"
    },
    "dialogId": "chat5",
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "type": "chat",
        "name": "Project Chat"
    },
    "user": {
        "id": 1,
        "name": "John Smith",
        "bot": false,
        "type": "user"
    },
    "language": "en"
}
```

---

## ONIMBOTV2DELETE {#onimbotv2delete}

Бот удален из системы. В режиме `webhook` это последнее событие, которое он получит. В режиме `fetch` событие не приходит: Битрикс24 удаляет очередь вместе с ботом. После удаления бота [imbot.v2.Event.get](./event-get.md) вернет ошибку `BOT_NOT_FOUND`.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|#

### Пример данных

```json
{
    "bot": {
        "id": "456",
        "code": "support_bot",
        "auth": {
            "access_token": "...",
            "refresh_token": "...",
            "application_token": "..."
        }
    }
}
```

---

## ONIMBOTV2CONTEXTGET {#onimbotv2contextget}

Пользователь открыл диалог с ботом, и боту пришли произвольные данные — контекст. Контекст задают при открытии диалога, например в ссылке с параметром `BOT_CONTEXT`. Подробнее — в статье [{#T}](../bot-context.md).

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **dialogId** | `string` | ID диалога, из которого пришел контекст. В приватном чате с ботом — числовой ID пользователя, в групповом чате — например, `chat5` ||
|| **context** | `object` | Произвольные данные, переданные при открытии диалога ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат ||
|| **user** | [`User`](../../entities.md#user) | Пользователь, открывший диалог ||
|| **language** | `string` | Язык Битрикс24 ||
|#

### Пример данных

```json
{
    "bot": {
        "id": 456,
        "code": "support_bot",
        "type": "bot",
        "eventMode": "fetch"
    },
    "dialogId": "1",
    "context": {
        "entityId": 164,
        "entityType": "task",
        "source": "link"
    },
    "chat": {
        "id": 5,
        "dialogId": "1",
        "type": "private",
        "name": ""
    },
    "user": {
        "id": 1,
        "name": "John Smith",
        "bot": false,
        "type": "user"
    },
    "language": "en"
}
```

---

## ONIMBOTV2COMMANDADD {#onimbotv2commandadd}

Пользователь вызвал слэш-команду бота.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **command** | `object` | Данные команды. Описание полей — [ниже](#command-object) ||
|| **message** | [`Message`](../../entities.md#message) | Сообщение с командой ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, из которого вызвана команда ||
|| **user** | [`User`](../../entities.md#user) | Пользователь, вызвавший команду ||
|| **language** | `string` | Язык Битрикс24 ||
|| **additionalMessages** | `array` | Массив объектов [`Message`](../../entities.md#message): исходное сообщение, если `message` — ответ на него. Если это не ответ, приходит пустой массив, а в режиме `webhook` поля нет ||
|#

### Объект command {#command-object}

#|
|| **Поле** | **Тип** | **Описание** ||
|| **id** | `integer` | ID зарегистрированной команды ||
|| **command** | `string` | Вызванная команда (например, `/help`) ||
|| **params** | `string` | Параметры команды — текст после команды ||
|| **context** | `string` | Как вызвана команда:

- `textarea` — введена вручную
- `keyboard` — нажата кнопка клавиатуры бота под сообщением
- `menu` — выбрана из контекстного меню ||
|#

{% note info "" %}

Если в одном сообщении несколько слэш-команд, бот получит отдельное событие на каждую.

{% endnote %}

### Пример данных

```json
{
    "bot": {
        "id": 456,
        "code": "support_bot",
        "type": "bot",
        "eventMode": "fetch"
    },
    "command": {
        "id": 78,
        "command": "/help",
        "params": "topic",
        "context": "textarea"
    },
    "message": {
        "id": 790,
        "chatId": 5,
        "authorId": 1,
        "date": "2025-01-15T10:30:00+03:00",
        "text": "/help topic",
        "isSystem": false,
        "uuid": null,
        "forward": null,
        "params": [],
        "viewedByOthers": false
    },
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "type": "chat",
        "name": "Support Chat"
    },
    "user": {
        "id": 1,
        "name": "John Smith",
        "bot": false,
        "type": "user"
    },
    "language": "en",
    "additionalMessages": []
}
```

---

## ONIMBOTV2REACTIONCHANGE {#onimbotv2reactionchange}

Реакция на сообщение бота добавлена или удалена. Событие приходит, только если у бота включены реакции — поле `fields.isReactionsEnabled` в [imbot.v2.Bot.register](../bots/bot-register.md) или [imbot.v2.Bot.update](../bots/bot-update.md).

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **reaction** | `string` | Код реакции (например, `like`). Список кодов — в [imbot.v2.Chat.Message.Reaction.add](../messages/chat-message-reaction-add.md#reactions) ||
|| **action** | `string` | Действие: `add` — реакция добавлена, `delete` — удалена ||
|| **message** | [`Message`](../../entities.md#message) | Сообщение, на которое поставлена реакция ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат ||
|| **user** | [`User`](../../entities.md#user) | Пользователь, изменивший реакцию ||
|| **language** | `string` | Язык Битрикс24 ||
|| **additionalMessages** | `array` | Массив объектов [`Message`](../../entities.md#message): исходное сообщение, если `message` — ответ на него. Если это не ответ, приходит пустой массив, а в режиме `webhook` поля нет ||
|#

### Пример данных

```json
{
    "bot": {
        "id": 456,
        "code": "support_bot",
        "type": "bot",
        "eventMode": "fetch"
    },
    "reaction": "like",
    "action": "add",
    "message": {
        "id": 789,
        "chatId": 5,
        "authorId": 456,
        "date": "2025-01-15T10:30:00+03:00",
        "text": "Hello! How can I help?",
        "isSystem": false,
        "uuid": null,
        "forward": null,
        "params": [],
        "viewedByOthers": true
    },
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "type": "chat",
        "name": "Support Chat"
    },
    "user": {
        "id": 1,
        "name": "John Smith",
        "bot": false,
        "type": "user"
    },
    "language": "en",
    "additionalMessages": []
}
```

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [События imbot.v2](./index.md)
- [{#T}](./event-get.md)
- [{#T}](../../entities.md)
- [{#T}](../messages/chat-message-reaction-add.md)
