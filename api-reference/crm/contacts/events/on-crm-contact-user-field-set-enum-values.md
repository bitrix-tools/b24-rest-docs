# На изменение набора значений для пользовательского поля списочного типа onCrmContactUserFieldSetEnumValues

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Название события: **onCrmContactUserFieldSetEnumValues**
> 
> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может подписаться: любой пользователь

Событие `onCrmContactUserFieldSetEnumValues` вызывается при изменении набора значений для пользовательского поля списочного типа у контактов.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
  "event": "ONCRMCONTACTUSERFIELDSETENUMVALUES",
  "event_handler_id": "17",
  "data": {
    "FIELDS": {
      "ID": "554",
      "ENTITY_ID": "CRM_CONTACT",
      "FIELD_NAME": "UF_CRM_1724771514"
    }
  },
  "ts": "1724771547",
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

В данном случае — `ONCRMCONTACTUSERFIELDSETENUMVALUES`||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект, содержащий информацию о пользовательском поле у которого изменился список возможных значений.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../data-types.md) | Объект содержащий информацию о полях пользовательского поля у которого изменился список возможных значений.

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
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля у которого изменился список возможных значений ||
|| **ENTITY_ID**
[`userFieldEntityId`](../../data-types.md#object_type) | Тип объекта CRM, к которому привязано пользовательское поле (В данном случае `CRM_CONTACT`) ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Код пользовательского поля у которого изменился список возможных значений ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./index.md)