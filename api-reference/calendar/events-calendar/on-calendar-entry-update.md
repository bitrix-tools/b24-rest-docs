# При изменении события OnCalendarEntryUpdate

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnCalendarEntryUpdate` срабатывает при изменении события.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

Событие на изменение объекта события календаря `id = 1414`:

```json
{
  "event": "ONCALENDARENTRYUPDATE",
  "event_handler_id": "4",
  "data": {
    "id": "1414"
  },
  "ts": "1734608349",
  "auth": {
    "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
    "expires_in": "3600",
    "scope": "calendar",
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
[`string`][1] | Символьный код события.

В данном случае — `ONCALENDARENTRYUPDATE`||
|| **event_handler_id**
[`integer`][1] | Идентификатор обработчика события ||
|| **data**
[`object`][1] | Объект, содержащий информацию о измененном объекте события календаря.

Содержит единственный ключ `id` ||
|| **data.id**
[`string`][1] | Идентификатор объекта события календаря. ||

|| **ts**
[`timestamp`][1] | Дата и время отправки события из [очереди событий](../../events/index.md) ||
|| **auth**
[`object`][1] | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../_includes/auth-params-in-events.md) %}

[1]: ../../data-types.md