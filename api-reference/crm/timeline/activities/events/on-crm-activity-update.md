# Событие на обновление дела onCrmActivityUpdate

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие `onCrmActivityUpdate` срабатывает при обновлении дела в таймлайне CRM. 

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "onCrmActivityUpdate",
    "data": {
        "FIELDS": {
            "ID": "999"
        }
    },
    "ts": "1466439714",
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
[`string`](../../../data-types.md) | Символьный код события. В нашем случае это `onCrmActivityUpdate`||
|| **data**
`array` | Объект, содержащий информацию об измененном деле.

Содержит единственный ключ `FIELDS` ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth**
[`array`](../../../data-types.md) | Параметры авторизации и данные о портале, на котором произошло событие. 

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | `ID` со значением идентификатора обновленного дела ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение 

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./on-crm-activity-add.md)
- [{#T}](./on-crm-activity-delete.md)