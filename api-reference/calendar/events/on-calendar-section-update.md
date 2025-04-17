# При изменении секции календаря или ресурса OnCalendarSectionUpdate

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие вызывается при изменении секции или ресурса.

{% note info " " %}

Технически ресурс — это секция календаря. Каждый ресурс помещается в специальный тип календарей, и для него создается отдельная секция. При добавлении, обновлении или удалении ресурсов вызываются события `OnCalendarSection*`.

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

Пример: событие на удаление объекта секции календаря с `id = 202`.

```json
{
    "event": "ONCALENDARSECTIONUPDATE",
    "event_handler_id": "7",
    "data": {
        "id": "202"
    },
    "ts": "1734608543",
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
|| **Название**
`тип` | **Описание** ||
|| **event**
[`string`][1] | Символьный код события.

В данном случае — `ONCALENDARSECTIONUPDATE`||
|| **event_handler_id**
[`integer`][1] | Идентификатор обработчика события ||
|| **data**
[`object`][1] | Объект, содержащий информацию о измененном объекте секции календаря.

Содержит единственный ключ — `id` ||
|| **data.id**
[`string`][1] | Идентификатор объекта секции календаря ||

|| **ts**
[`timestamp`][1] | Дата и время отправки события из [очереди событий](../../events/index.md) ||
|| **auth**
[`object`][1] | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение 

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](./on-calendar-section-add.md)
- [{#T}](./on-calendar-section-delete.md)

[1]: ../../data-types.md