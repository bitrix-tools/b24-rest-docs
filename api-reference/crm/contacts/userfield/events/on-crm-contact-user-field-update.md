# Событие на изменение пользовательского поля onCrmContactUserFieldUpdate

> Scope: [`crm`](../../../../scopes/permissions.md)
> 
> Кто может подписаться: любой пользователь

Событие срабатывает при изменении пользовательского поля у контактов.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
  "event": "ONCRMCONTACTUSERFIELDUPDATE",
  "event_handler_id": "15",
  "data": {
    "FIELDS": {
      "ID": "554",
      "ENTITY_ID": "CRM_CONTACT",
      "FIELD_NAME": "UF_CRM_1724771514"
    }
  },
  "ts": "1724775198",
  "auth": {
    "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
    "expires_in": "3600",
    "scope": "crm",
    "domain": "some-domain.bitrix24.com",
    "server_endpoint": "https://oauth.bitrix.info/rest/",
    "status": "F",
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

В данном случае — `ONCRMCONTACTUSERFIELDUPDATE`||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию об измененном пользовательском поле

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект содержащий информацию о полях измененного пользовательского поля

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
[`integer`](../../../../data-types.md) | Идентификатор измененного пользовательского поля ||
|| **ENTITY_ID**
[`userFieldEntityId`](../../../data-types.md#object_type) | Тип объекта CRM, к которому привязано пользовательское поле.

В данном случае — `CRM_CONTACT` ||
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Код измененного пользовательского поля ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./on-crm-contact-user-field-add.md)
- [{#T}](./on-crm-contact-user-field-set-enum-values.md)
- [{#T}](./on-crm-contact-user-field-delete.md)
