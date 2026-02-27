# Событие при удалении чат-бота ONIMBOTDELETE

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может подписаться: пользователь приложения, которое зарегистрировало чат-бота

Событие `ONIMBOTDELETE` срабатывает при удалении чат-бота. Событие работает только в контексте приложения чат-бота.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONIMBOTDELETE",
    "event_handler_id": "439",
    "data": {
        "BOT_ID": "567",
        "BOT_CODE": "BOT"
    },
    "ts": "1772090363",
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
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../data-types.md) | Символьный код события.

В данном случае — `ONIMBOTDELETE` ||
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../data-types.md) | Объект с данными удаленного чат-бота.

Структура описана [ниже](#data) ||
|| **ts**
[`timestamp`](../../data-types.md) | Дата и время отправки события из [очереди событий](../../events/index.md) ||
|| **auth**
[`object`](../../data-types.md) | Объект с параметрами авторизации пользователя, от имени которого сработало событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор удаленного чат-бота ||
|| **BOT_CODE**
[`string`](../../data-types.md) | Символьный код удаленного чат-бота ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../imbot-unregister.md)
- [{#T}](../chats/events/on-imbot-join-chat.md)
- [{#T}](../messages/events/on-imbot-message-add.md)
- [{#T}](../messages/events/on-imbot-message-update.md)
- [{#T}](../messages/events/on-imbot-message-delete.md)
- [{#T}](../commands/events/on-im-command-add.md)