# На удаление пользовательского поля

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Название события: **onCrmContactUserFieldDelete**
> 
> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может подписаться: любой пользователь

Событие `onCrmContactUserFieldDelete` вызывается при удалении пользовательского поля у контакта.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
  "event": "ONCRMCONTACTUSERFIELDDELETE",
  "event_handler_id": "16",
  "data": {
    "FIELDS": {
      "ID": "553",
      "ENTITY_ID": "CRM_CONTACT",
      "FIELD_NAME": "UF_CRM_1724770216"
    }
  },
  "ts": "1724771239",
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
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONCRMCONTACTUSERFIELDDELETE`||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект, содержащий информацию об удаленном пользовательском поле.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../data-types.md) | Объект содержащий информацию о полях удаленного пользовательского поля.

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
[`integer`](../../../data-types.md) | Идентификатор удаленного пользовательского поля ||
|| **ENTITY_ID**
[`userFieldEntityId`](../../data-types.md#object_type) | Тип объекта CRM, к которому привязано пользовательское поле (В данном случае `CRM_CONTACT`) ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Код удаленного пользовательского поля ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./index.md)
