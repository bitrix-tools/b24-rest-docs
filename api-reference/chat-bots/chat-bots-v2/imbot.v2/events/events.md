# Форматы событий imbot.v2

Описание всех событий, которые бот получает через [imbot.v2.Event.get](./event-get.md) (FETCH-режим) или через webhook.

Поля объектов `message`, `chat`, `user` описаны в [{#T}](../../entities.md).

**Быстрый переход:** [ONIMBOTV2MESSAGEADD](#onimbotv2messageadd) | [ONIMBOTV2MESSAGEUPDATE](#onimbotv2messageupdate) | [ONIMBOTV2MESSAGEDELETE](#onimbotv2messagedelete) | [ONIMBOTV2JOINCHAT](#onimbotv2joinchat) | [ONIMBOTV2DELETE](#onimbotv2delete) | [ONIMBOTV2CONTEXTGET](#onimbotv2contextget) | [ONIMBOTV2COMMANDADD](#onimbotv2commandadd) | [ONIMBOTV2REACTIONCHANGE](#onimbotv2reactionchange)

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
        "auth": {"access_token": "...", "refresh_token": "...", "...": "..."}
    },
    "message": {},
    "chat": {},
    "user": {}
}
```

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
|| **language** | `string` | Язык портала (например, `en`, `ru`) ||
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
        "appId": "custom123abc",
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
        "owner": 1,
        "color": "#ab7761"
    },
    "user": {
        "id": 1,
        "active": true,
        "name": "John Smith",
        "firstName": "John",
        "lastName": "Smith",
        "workPosition": "Developer",
        "gender": "M",
        "bot": false,
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
|| **language** | `string` | Язык портала ||
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
|| **language** | `string` | Язык портала ||
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
|| **language** | `string` | Язык портала ||
|#

### Пример данных

```json
{
    "bot": {"id": 456, "code": "support_bot", "...": "..."},
    "dialogId": "chat5",
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "type": "chat",
        "name": "Project Chat",
        "owner": 1,
        "color": "#ab7761"
    },
    "user": {"id": 1, "name": "John Smith", "...": "..."},
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
        "appId": "custom123abc",
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
|| **language** | `string` | Язык портала ||
|#

### Пример данных

```json
{
    "bot": {"id": 456, "code": "support_bot", "...": "..."},
    "dialogId": "chat5",
    "context": {
        "entityId": 164,
        "entityType": "task",
        "source": "link"
    },
    "chat": {"id": 5, "dialogId": "chat5", "...": "..."},
    "user": {"id": 1, "name": "John Smith", "...": "..."},
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
|| **language** | `string` | Язык портала ||
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
    "bot": {"id": 456, "code": "support_bot", "...": "..."},
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
        "params": {},
        "viewedByOthers": false
    },
    "chat": {"id": 5, "dialogId": "chat5", "...": "..."},
    "user": {"id": 1, "name": "John Smith", "...": "..."},
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
|| **language** | `string` | Язык портала ||
|#

### Пример данных

```json
{
    "bot": {"id": 456, "code": "support_bot", "...": "..."},
    "reaction": "like",
    "action": "add",
    "message": {
        "id": 789,
        "chatId": 5,
        "authorId": 456,
        "date": "2025-01-15T10:30:00+03:00",
        "text": "Hello! How can I help?",
        "isSystem": false,
        "params": {},
        "viewedByOthers": true
    },
    "chat": {"id": 5, "dialogId": "chat5", "...": "..."},
    "user": {"id": 1, "name": "John Smith", "...": "..."},
    "language": "en"
}
```

## Продолжите изучение

- [{#T}](./event-get.md)
- [{#T}](../../entities.md)
- [{#T}](../messages/chat-message-reaction-add.md)
