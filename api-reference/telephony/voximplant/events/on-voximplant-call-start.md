# Событие начала разговора ONVOXIMPLANTCALLSTART

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONVOXIMPLANTCALLSTART` срабатывает при начале разговора: когда оператор отвечает на входящий звонок или абонент отвечает на исходящий звонок.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONVOXIMPLANTCALLSTART",
    "event_handler_id": "1059",
    "data": {
        "CALL_ID": "externalCall.7b0c7de811455ef32b18dc5917e4306a.1773239327",
        "USER_ID": "1269"
    },
    "ts": "1773239326",
    "auth": {
        "access_token": "s7p6eclrvim9da28dt9ch94ekreb52sv",
        "expires_in": "3600",
        "scope": "telephony",
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix.info/rest/",
        "status": "F",
        "client_endpoint": "https://example.bitrix24.ru/rest/",
        "member_id": "a223c6b9410f85df78e9377d6c4f7213",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51610fefc120afg4b628cc82d6298cce"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONVOXIMPLANTCALLSTART` ||
|| **event_handler_id**
[`string`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект с данными события.

Структура описана [ниже](#data) ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект с параметрами авторизации пользователя, от имени которого сработало событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **CALL_ID**
[`string`](../../../data-types.md) | Идентификатор звонка ||
|| **USER_ID**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который ответил на звонок ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-voximplant-call-init.md)
- [{#T}](./on-voximplant-call-end.md)
- [{#T}](../voximplant-statistic-get.md)
