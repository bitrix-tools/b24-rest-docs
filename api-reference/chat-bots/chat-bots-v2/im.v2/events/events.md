# Форматы событий im.v2

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../../../scopes/permissions.md)
>
> Кто может подписаться: авторизованный пользователь

Описание всех событий, которые приложение или пользователь получает через [im.v2.Event.get](./event-get.md).

Битрикс24 записывает события только после вызова [im.v2.Event.subscribe](./event-subscribe.md) от имени пользователя, а доставляет их только в режиме polling — вызовами [im.v2.Event.get](./event-get.md). Порядок подписки и опроса описан в обзоре [Работа с чатом](../index.md).

Каждое событие приходит элементом массива `result.events` с полями `eventId`, `type`, `date` и `data`. Таблицы и примеры ниже описывают содержимое `data`; оболочка элемента описана на странице [im.v2.Event.get](./event-get.md). Поля объектов `message`, `chat`, `user` описаны в [{#T}](../../entities.md).

> Быстрый переход: [все события](#all-events)

## Обзор событий {#all-events}

#|
|| **Событие** | **Когда приходит** ||
|| [ONIMV2MESSAGEADD](#onimv2messageadd) | Новое сообщение в чате, где состоит подписанный пользователь ||
|| [ONIMV2MESSAGEUPDATE](#onimv2messageupdate) | Сообщение отредактировано ||
|| [ONIMV2MESSAGEDELETE](#onimv2messagedelete) | Сообщение удалено ||
|| [ONIMV2REACTIONCHANGE](#onimv2reactionchange) | Реакция на сообщение добавлена или удалена ||
|| [ONIMV2JOINCHAT](#onimv2joinchat) | В чат добавлен новый участник ||
|#

## Отличия от ответов методов

В данных событий объекты `chat` и `user` возвращаются в сокращенном формате:

- объект `chat` не содержит полей `role` и `muteList` — они зависят от конкретного пользователя и не могут быть одинаковыми для всех получателей
- объект `user` не содержит полей `network`, `botData`, `avatarHr`
- поля онлайн-статуса (`idle`, `lastActivityDate`, `mobileLastDate`, `desktopLastDate`) всегда равны `false`

{% note info "" %}

Поля `auth` в данных события нет: события `im.v2` не вызывают обработчик приложения, а приходят в ответе [im.v2.Event.get](./event-get.md), поэтому авторизация передается в самом запросе.

{% endnote %}

---

## ONIMV2MESSAGEADD {#onimv2messageadd}

Новое сообщение в чате, в котором состоит подписанный пользователь.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **message** | [`Message`](../../entities.md#message) | Отправленное сообщение. Описание полей объекта — [Message](../../entities.md#message) ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором отправлено сообщение. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения. Описание полей объекта — [User](../../entities.md#user) ||
|| **language** | `string` | Язык Битрикс24 (например, `en`, `ru`) ||
|#

### Пример данных

```json
{
    "message": {
        "id": 5012,
        "chatId": 5,
        "authorId": 1,
        "date": "2025-01-15T10:30:00+03:00",
        "text": "Hello everyone!",
        "isSystem": false,
        "uuid": "",
        "forward": null,
        "params": {},
        "viewedByOthers": false
    },
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "name": "Project Chat",
        "type": "chat",
        "messageType": "C",
        "owner": 1,
        "color": "#ab7761",
        "avatar": "",
        "description": "",
        "extranet": false,
        "containsCollaber": false,
        "entityType": "",
        "entityId": "",
        "entityData1": "",
        "entityData2": "",
        "entityData3": "",
        "entityLink": {},
        "diskFolderId": 42,
        "permissions": {},
        "parentChatId": 0,
        "parentMessageId": 0,
        "isNew": false,
        "textFieldEnabled": "Y",
        "backgroundId": null
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
        "mobileLastDate": false,
        "desktopLastDate": false,
        "absent": false,
        "departments": [1],
        "phones": false,
        "website": "",
        "email": "john@example.com",
        "type": "employee"
    },
    "language": "en"
}
```

---

## ONIMV2MESSAGEUPDATE {#onimv2messageupdate}

Сообщение в чате отредактировано.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **message** | [`Message`](../../entities.md#message) | Обновленное сообщение. Описание полей объекта — [Message](../../entities.md#message) ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором отредактировано сообщение. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения. Описание полей объекта — [User](../../entities.md#user) ||
|| **language** | `string` | Язык Битрикс24 ||
|#

Формат данных идентичен [ONIMV2MESSAGEADD](#onimv2messageadd). Поле `message` содержит обновленный текст.

---

## ONIMV2MESSAGEDELETE {#onimv2messagedelete}

Сообщение в чате удалено.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **messageId** | `integer` | ID удаленного сообщения ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором удалено сообщение. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения. Описание полей объекта — [User](../../entities.md#user) ||
|| **language** | `string` | Язык Битрикс24 ||
|#

### Пример данных

Объекты `chat` и `user` здесь и в примерах ниже сокращены. Полный состав — в примере [ONIMV2MESSAGEADD](#onimv2messageadd).

```json
{
    "messageId": 5012,
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "name": "Project Chat",
        "type": "chat"
    },
    "user": {
        "id": 1,
        "name": "John Smith",
        "type": "employee"
    },
    "language": "en"
}
```

---

## ONIMV2REACTIONCHANGE {#onimv2reactionchange}

Реакция на сообщение в чате добавлена или удалена.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **reaction** | `string` | Код реакции (например, `like`) ||
|| **action** | `string` | Действие: `add` — реакция добавлена, `delete` — удалена ||
|| **message** | [`Message`](../../entities.md#message) | Сообщение, на которое изменена реакция. Описание полей объекта — [Message](../../entities.md#message) ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **user** | [`User`](../../entities.md#user) | Пользователь, изменивший реакцию. Описание полей объекта — [User](../../entities.md#user) ||
|| **language** | `string` | Язык Битрикс24 ||
|#

### Пример данных

```json
{
    "reaction": "like",
    "action": "add",
    "message": {
        "id": 5012,
        "chatId": 5,
        "authorId": 1,
        "date": "2025-01-15T10:30:00+03:00",
        "text": "Hello everyone!",
        "isSystem": false,
        "uuid": "",
        "forward": null,
        "params": {},
        "viewedByOthers": false
    },
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "name": "Project Chat",
        "type": "chat"
    },
    "user": {
        "id": 2,
        "name": "Jane Doe",
        "type": "employee"
    },
    "language": "en"
}
```

---

## ONIMV2JOINCHAT {#onimv2joinchat}

Новый участник добавлен в чат.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **dialogId** | `string` | ID диалога (например, `chat5`) ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в который добавлен участник. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **user** | [`User`](../../entities.md#user) | Добавленный пользователь. Описание полей объекта — [User](../../entities.md#user) ||
|| **language** | `string` | Язык Битрикс24 ||
|#

### Пример данных

```json
{
    "dialogId": "chat5",
    "chat": {
        "id": 5,
        "dialogId": "chat5",
        "name": "Project Chat",
        "type": "chat"
    },
    "user": {
        "id": 3,
        "name": "Alex Brown",
        "type": "employee"
    },
    "language": "en"
}
```

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./event-get.md)
- [{#T}](./event-subscribe.md)
- [{#T}](../../entities.md)
