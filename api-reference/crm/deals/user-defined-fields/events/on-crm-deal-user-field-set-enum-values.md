# Cобытие при изменении набора значений для пользовательского поля списочного типа onCrmDealUserFieldSetEnumValues

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `onCrmDealUserFieldSetEnumValues` сработает при изменении набора значений для пользовательского поля списочного типа.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMDEALUSERFIELDSETENUMVALUES",
    "event_handler_id": "665",
    "data": {
        "FIELDS": {
            "ID": "6947",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1736930561"
        }
    },
    "ts": "1736944167",
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

В данном случае — `ONCRMDEALUSERFIELDSETENUMVALUES`||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект, содержащий информацию об обновленном поле списочного типа.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../data-types.md) | Объект содержащий информацию о полях обновленного поля списочного типа.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля списочного типа ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Символьный идентификатор объекта, для которого обновлено поле списочного типа. В данном случае — `CRM_DEAL` ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Название обновленного пользовательского поля списочного типа ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./on-crm-deal-user-field-add.md)
- [{#T}](./on-crm-deal-user-field-delete.md)
- [{#T}](./on-crm-deal-user-field-update.md)


