# Форматы событий imbot.v2

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Описание всех событий, которые бот получает через [imbot.v2.Event.get](./event-get.md) (FETCH-режим) или через webhook.

Поля объектов `message`, `chat`, `user` описаны в [{#T}](../../entities.md).

## Автоматическое управление подписками

Подписка бота на события `ONIMBOTV2*` создается автоматически при [imbot.v2.Bot.register](../bots/bot-register.md) с `eventMode: "webhook"`, обновляется при [imbot.v2.Bot.update](../bots/bot-update.md) (при смене `webhookUrl` или `eventMode`) и удаляется при [imbot.v2.Bot.unregister](../bots/bot-unregister.md) или переходе в режим `fetch`. Ручной вызов [event.bind](https://apidocs.bitrix24.ru/api-reference/events/event-bind.html) / [event.unbind](https://apidocs.bitrix24.ru/api-reference/events/event-unbind.html) не требуется и может привести к расхождению с внутренним учетом.

## Какие события обрабатывать в первую очередь

Минимальный набор событий для рабочего бота:

- [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd) — входящие сообщения от пользователя
- [ONIMBOTV2COMMANDADD](#onimbotv2commandadd) — вызовы слэш-команд
- [ONIMBOTV2JOINCHAT](#onimbotv2joinchat) — добавление бота в чат (обычно отправляют приветствие)
- [ONIMBOTV2DELETE](#onimbotv2delete) — удаление бота (очистка ресурсов)

Дополнительно по сценарию:

- [ONIMBOTV2MESSAGEUPDATE](#onimbotv2messageupdate) и [ONIMBOTV2MESSAGEDELETE](#onimbotv2messagedelete) — если поддерживаете редактирование/удаление
- [ONIMBOTV2REACTIONCHANGE](#onimbotv2reactionchange) — если учитываете реакции
- [ONIMBOTV2CONTEXTGET](#onimbotv2contextget) — если используете входной контекст диалога

## Формат объекта bot {#bot-format}

Содержимое поля `bot` зависит от режима доставки событий.

- **FETCH** (`imbot.v2.Event.get`) — полный объект бота, как в ответе [imbot.v2.Bot.get](../bots/bot-get.md)
- **Webhook** — упрощенный объект `{id, code, auth}`, где `auth` содержит OAuth-токен для обратных вызовов

Каждый webhook-вызов содержит данные **одного** бота. Если приложение зарегистрировало несколько ботов и событие касается нескольких из них — webhook вызывается отдельно для каждого.

Пример объекта `bot` в webhook-режиме:

```json
{
    "bot": {
        "id": 456,
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
            "user_id": "27",
            "application_token": "831c76b092f9f135d9b6b36c3a720757"
        }
    },
    "message": {},
    "chat": {},
    "user": {}
}
```

### Структура webhook-уведомления {#webhook-payload}

В webhook-режиме POST-запрос содержит **два разных `auth`**:

- **top-level `auth`** — конверт всего запроса, присутствует всегда;
- **`data.bot.auth`** — OAuth-токены конкретного бота для обратных вызовов.

```json
{
    "event": "ONIMBOTV2MESSAGEADD",
    "data": {
        "bot": {
            "id": 456,
            "code": "support_bot",
            "auth": {"access_token": "...", "refresh_token": "...", "application_token": "..."}
        },
        "message": {},
        "chat": {},
        "user": {}
    },
    "ts": 1772093963,
    "auth": {
        "domain": "your-portal.bitrix24.ru",
        "application_token": "..."
    }
}
```

{% note warning "" %}

Для верификации подлинности вебхука используйте `application_token` с **верхнего уровня** — `auth.application_token`, а не из `data.bot.auth.application_token`.

{% endnote %}

Запрос приходит как `application/x-www-form-urlencoded` через `http_build_query`, поэтому ключи имеют PHP вид: `data[bot][id]=...`, `auth[application_token]=...`.

### Объект chat в событиях {#chat-in-events}

Объект `chat` в событиях не содержит полей `role` и `muteList` — эти поля зависят от конкретного пользователя и не могут быть одинаковыми для всех получателей событий.

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

{% note info "" %}

Поле `auth` зависит от режима доставки событий:

- в **Webhook**-режиме (`bot` отправляется на указанный обработчик) поле `auth` присутствует и содержит токены для авторизации обратных вызовов
- в **FETCH**-режиме (`imbot.v2.Event.get`) поле `auth` в объекте `bot` не возвращается, так как токены не требуются

{% endnote %}

## Типы данных в webhook-режиме

Webhook-события доставляются через систему событий Битрикс24, которая сериализует данные через `http_build_query`. Из-за этого **все скалярные значения в webhook-режиме передаются как строки**.

#|
|| **Тип** | **Значение в FETCH** | **Значение в Webhook** ||
|| `integer` | `789` | `"789"` ||
|| `boolean` | `true` / `false` | `"1"` / `"0"` ||
|| `string\|false` | `false` | `"0"` ||
|| `null` | `null` | `""` ||
|#

При обработке webhook-событий рекомендуется приводить типы явно: `(int)$data['messageId']`, `$data['user']['active'] !== '0'`. В FETCH-режиме типы соответствуют документации.

---

## ONIMBOTV2MESSAGEADD {#onimbotv2messageadd}

Новое сообщение, адресованное боту. Возникает, когда пользователь отправляет сообщение в чат, в котором состоит бот.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **message** | [`Message`](../../entities.md#message) | Отправленное сообщение ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором отправлено сообщение ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения ||
|| **language** | `string` | Язык Битрикс24 (например, `en`, `ru`) ||
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
        "text": "Hello bot!",
        "isSystem": false,
        "uuid": "",
        "forward": null,
        "params": {},
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
        "lastActivityDate": "2025-01-15T10:29:00+03:00",
        "absent": false,
        "departments": [1],
        "phones": false,
        "type": "employee"
    },
    "language": "en"
}
```

---

## ONIMBOTV2MESSAGEUPDATE {#onimbotv2messageupdate}

Сообщение в чате бота отредактировано.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **message** | [`Message`](../../entities.md#message) | Обновленное сообщение ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором отредактировано сообщение ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения ||
|| **language** | `string` | Язык Битрикс24 ||
|#

Формат данных идентичен [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd). Поле `message` содержит обновленный текст.

---

## ONIMBOTV2MESSAGEDELETE {#onimbotv2messagedelete}

Сообщение в чате бота удалено.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **messageId** | `integer` | ID удаленного сообщения ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором удалено сообщение ||
|| **user** | [`User`](../../entities.md#user) | Автор удаленного сообщения ||
|| **language** | `string` | Язык Битрикс24 ||
|#

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
    "dialogId": "chat5",
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "type": "chat",
        "name": "Project Chat",
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
        "lastActivityDate": "2025-01-15T10:29:00+03:00",
        "absent": false,
        "departments": [1],
        "phones": false,
        "type": "employee"
    },
    "language": "en"
}
```

---

## ONIMBOTV2DELETE {#onimbotv2delete}

Бот удален из системы. Это последнее событие, которое получит бот.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
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
    }
}
```

---

## ONIMBOTV2CONTEXTGET {#onimbotv2contextget}

Пользователь открыл диалог с ботом, передав произвольные контекстные данные. Контекст задается вызывающей стороной — например, при переходе по ссылке с параметром `botContextData`.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **dialogId** | `string` | ID диалога (например, `chat5`) ||
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
    "dialogId": "chat5",
    "context": {
        "entityId": 164,
        "entityType": "task",
        "source": "link"
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
        "lastActivityDate": "2025-01-15T10:29:00+03:00",
        "absent": false,
        "departments": [1],
        "phones": false,
        "type": "employee"
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
|#

### Объект command {#command-object}

#|
|| **Поле** | **Тип** | **Описание** ||
|| **id** | `integer` | ID зарегистрированной команды ||
|| **command** | `string` | Вызванная команда (например, `/help`) ||
|| **params** | `string` | Параметры команды — текст после команды ||
|| **context** | `string` | Контекст вызова: `textarea` — введена вручную, `keyboard` — нажата кнопка клавиатуры, `menu` — выбрана из контекстного меню ||
|#

{% note info "" %}

Если одно сообщение содержит несколько слэш-команд, событие генерируется отдельно для каждой команды.

{% endnote %}

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
        "uuid": "",
        "forward": null,
        "params": {},
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
        "lastActivityDate": "2025-01-15T10:29:00+03:00",
        "absent": false,
        "departments": [1],
        "phones": false,
        "type": "employee"
    },
    "language": "en"
}
```

---

## ONIMBOTV2REACTIONCHANGE {#onimbotv2reactionchange}

Реакция на сообщение бота добавлена или удалена.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **bot** | `object` | [Объект бота](#bot-format) ||
|| **reaction** | `string` | Код реакции (например, `like`). Список кодов — в [imbot.v2.Chat.Message.Reaction.add](../messages/chat-message-reaction-add.md#reactions) ||
|| **action** | `string` | Действие: `add` — реакция добавлена, `delete` — удалена ||
|| **message** | [`Message`](../../entities.md#message) | Сообщение, на которое поставлена реакция ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат ||
|| **user** | [`User`](../../entities.md#user) | Пользователь, изменивший реакцию ||
|| **language** | `string` | Язык Битрикс24 ||
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
    "reaction": "like",
    "action": "add",
    "message": {
        "id": 789,
        "chatId": 5,
        "authorId": 456,
        "date": "2025-01-15T10:30:00+03:00",
        "text": "Hello! How can I help?",
        "isSystem": false,
        "uuid": "",
        "forward": null,
        "params": {},
        "viewedByOthers": true
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
        "lastActivityDate": "2025-01-15T10:29:00+03:00",
        "absent": false,
        "departments": [1],
        "phones": false,
        "type": "employee"
    },
    "language": "en"
}
```

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./event-get.md)
- [{#T}](../../entities.md)
- [{#T}](../messages/chat-message-reaction-add.md)
