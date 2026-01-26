# Событие при обновлении записи в листе ожидания onBookingWaitListItemUpdate

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONBOOKINGWAITLISTITEMUPDATE` сработает при обновлении записи в листе ожидания вручную или методом [booking.v1.waitlist.update](../booking-v1-waitlist-update.md).


{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONBOOKINGWAITLISTITEMUPDATE",
    "event_handler_id": "11",
    "data": {
        "ID": "1"
    },
    "ts": "1751285442",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "booking",
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "60133c09d1f5d0fd6d7884a11fad4585",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "tyb8wpqf7lwi471nsiv9yr1eybkafqcq"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONBOOKINGWAITLISTITEMUPDATE` ||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект, содержащий информацию об обновленной записи в листе ожидания.

Содержит ключ `ID` ||
|| **data.ID**
[`integer`](../../../data-types.md) | Идентификатор обновленной записи в листе ожидания ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./on-booking-waitlistitem-add.md)
- [{#T}](./on-booking-waitlistitem-delete.md)