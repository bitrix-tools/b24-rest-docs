# Событие при добавлении коммерческого предложения onCrmQuoteAdd

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCRMQUOTEADD` сработает при добавлении коммерческого предложения.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMQUOTEADD",
    "event_handler_id": "747",
    "data": {
        "FIELDS": {
            "ID": "71"
        }
    },
    "ts": "1743678788",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "crm",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONCRMQUOTEADD`||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект, содержащий информацию о добавленном коммерческом предложении.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../data-types.md) | Объект, содержащий информацию о полях добавленного коммерческого предложения.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор добавленного коммерческого предложения ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./on-crm-quote-update.md)
- [{#T}](./on-crm-quote-delete.md)