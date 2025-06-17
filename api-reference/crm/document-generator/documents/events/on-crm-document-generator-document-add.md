# Событие при создании документа onCrmDocumentGeneratorDocumentAdd

> Scope: [`documentgenerator, crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCRMDOCUMENTGENERATORDOCUMENTADD` сработает при создании нового документа.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMDOCUMENTGENERATORDOCUMENTADD",
    "event_handler_id": "821",
    "data": {
        "FIELDS": {
            "ID": "1869",
            "ENTITY_TYPE_ID": "1",
            "ENTITY_ID": "1000993"
        }
    },
    "ts": "1749042094",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "crm, documentgenerator",
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

В данном случае — `ONCRMDOCUMENTGENERATORDOCUMENTADD` ||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию о созданном документе.

Содержит ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект, содержащий информацию о полях созданного документа.

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
[`integer`](../../../../data-types.md) | Идентификатор созданного документа ||
|| **ENTITY_TYPE_ID**
[`integer`](../../../../data-types.md) | Идентификатор [типа объекта](../../../../crm/data-types.md#object_type), к которому относится документ, например `1` — лид ||
|| **ENTITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор элемента, к которому привязан документ ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./on-crm-document-generator-document-update.md)
- [{#T}](./on-crm-document-generator-document-delete.md)