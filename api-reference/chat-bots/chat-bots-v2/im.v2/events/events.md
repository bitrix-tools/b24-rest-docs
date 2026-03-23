# Форматы событий im.v2

Описание всех событий, которые пользовательское приложение получает через [im.v2.Event.get](./event-get.md).

Поля объектов `message`, `chat`, `user` описаны в [{#T}](../../entities.md).

**Быстрый переход:** [ONIMV2MESSAGEADD](#onimv2messageadd) | [ONIMV2MESSAGEUPDATE](#onimv2messageupdate) | [ONIMV2MESSAGEDELETE](#onimv2messagedelete) | [ONIMV2REACTIONCHANGE](#onimv2reactionchange) | [ONIMV2JOINCHAT](#onimv2joinchat)

## Отличия от ответов методов

В данных событий объекты `chat` и `user` возвращаются в сокращенном формате:

- объект `chat` не содержит полей `role` и `muteList` — они зависят от конкретного пользователя и не могут быть одинаковыми для всех получателей
- объект `user` не содержит полей `network`, `botData`, `avatarHr`
- поля онлайн-статуса (`idle`, `lastActivityDate`, `mobileLastDate`, `desktopLastDate`) всегда равны `false`

{% note info "" %}

В этой статье описан формат событий метода `im.v2.Event.get` (polling/FETCH), поэтому поле `auth` в данных события не возвращается.

Если использовать webhook-подписку на события, в webhook-обертке может присутствовать объект `auth` с токенами.

{% endnote %}

---

## ONIMV2MESSAGEADD {#onimv2messageadd}

Новое сообщение в чате, в котором состоит подписанный пользователь.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **message** | [`Message`](../../entities.md#message) | Отправленное сообщение. Описание полей объекта — [Message](../../entities.md#message) ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в котором отправлено сообщение. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **user** | [`User`](../../entities.md#user) | Автор сообщения. Описание полей объекта — [User](../../entities.md#user) ||
|| **language** | `string` | Язык портала (например, `en`, `ru`) ||
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
|| **language** | `string` | Язык портала ||
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
|| **language** | `string` | Язык портала ||
|#

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
|| **language** | `string` | Язык портала ||
|#

---

## ONIMV2JOINCHAT {#onimv2joinchat}

Новый участник добавлен в чат.

#|
|| **Поле** | **Тип** | **Описание** ||
|| **dialogId** | `string` | ID диалога (например, `chat5`) ||
|| **chat** | [`Chat`](../../entities.md#chat) | Чат, в который добавлен участник. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **user** | [`User`](../../entities.md#user) | Добавленный пользователь. Описание полей объекта — [User](../../entities.md#user) ||
|| **language** | `string` | Язык портала ||
|#

## Продолжите изучение

- [{#T}](./event-get.md)
- [{#T}](./event-subscribe.md)
- [{#T}](../../entities.md)
