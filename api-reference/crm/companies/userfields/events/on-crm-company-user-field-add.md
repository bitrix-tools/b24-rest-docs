# При добавлении пользовательского поля onCrmCompanyUserFieldAdd

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCRMCOMPANYUSERFIELDADD` сработает при добавлении нового пользовательского поля для компаний.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMCOMPANYUSERFIELDADD",
    "event_handler_id": "739",
    "data": {
        "FIELDS": {
            "ID": "6979",
            "ENTITY_ID": "CRM_COMPANY",
            "FIELD_NAME": "UF_CRM_1743165530"
        }
    },
    "ts": "1743165530",
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
[`string`](../../../../data-types.md) | Символьный код события.

В данном случае — `ONCRMCOMPANYUSERFIELDADD` ||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию о добавленном пользовательском поле.

Содержит ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект, содержащий информацию о полях добавленного пользовательского поля.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth**
[`object`](../../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор добавленного пользовательского поля ||
|| **ENTITY_ID**
[`string`](../../../../data-types.md) | Идентификатор объекта, к которому относится пользовательское поле. В данном случае — `CRM_COMPANY` ||
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Название добавленного пользовательского поля ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./on-crm-company-user-field-update.md)
- [{#T}](./on-crm-company-user-field-delete.md)
