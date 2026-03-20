# Событие инициализации звонка ONVOXIMPLANTCALLINIT

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONVOXIMPLANTCALLINIT` срабатывает при инициализации звонка: при поступлении входящего звонка или при начале исходящего звонка.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- При работе через арендованные номера или SIP

    ```json
    {
        "event": "ONVOXIMPLANTCALLINIT",
        "event_handler_id": "1057",
        "data": {
            "CALL_ID": "5E316880469A6376.1773306964.8740011",
            "CALL_TYPE": "1",
            "ACCOUNT_SEARCH_ID": "reg150908",
            "PHONE_NUMBER": "+79999996666",
            "CALLER_ID": "reg150908"
        },
        "ts": "1773306964",
        "auth": {
            "access_token": "s7p6eclrvim9da98dt9ch94ekreb52sv",
            "expires_in": "3600",
            "scope": "telephony",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix.info/rest/",
            "status": "F",
            "client_endpoint": "https://example.bitrix24.ru/rest/",
            "member_id": "a223c6b9410f85df73e9377d6c4f7213",
            "refresh_token": "4s386p3q0tr8dy09xvmt96234v3dljg8",
            "application_token": "52610fefc120afg4b628cc82d6298cce"
        }
    }
    ```
- При работе с приложением телефонии

    ```json
    {
        "event": "ONVOXIMPLANTCALLINIT",
        "event_handler_id": "1057",
        "data": {
            "CALL_ID": "externalCall.7b0c7de811455ef32b18dc5917e4306a.1773239327",
            "CALL_TYPE": "1",
            "CALLER_ID": "+79061234567",
            "REST_APP_ID": "3"
        },
        "ts": "1773239326",
        "auth": {
            "access_token": "s7p6eclrvim9da98dt9ch94ekreb52sv",
            "expires_in": "3600",
            "scope": "telephony",
            "domain": "some-domain.bitrix24.ru",
            "server_endpoint": "https://oauth.bitrix.info/rest/",
            "status": "F",
            "client_endpoint": "https://example.bitrix24.ru/rest/",
            "member_id": "a223c6b9410f85df73e9377d6c4f7213",
            "refresh_token": "4s386p3q0tr8dy09xvmt96234v3dljg8",
            "application_token": "52610fefc120afg4b628cc82d6298cce"
        }
    }
        ```

{% endlist %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONVOXIMPLANTCALLINIT` ||
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
|| **CALL_TYPE**
[`integer`](../../../data-types.md) | Тип звонка.

Возможные значения:

- `1` — исходящий
- `2` — входящий
- `3` — входящий с перенаправлением
- `4` — обратный звонок
- `5` — информационный звонок ||
|| **ACCOUNT_SEARCH_ID**
[`string`](../../../data-types.md) | Идентификатор линии.

Возможные значения:

- `XXX` — для арендованных номеров
- `regXXX` — для облачных АТС
- `sipXXX` — для офисных АТС

Поле возвращается при работе через арендованные номера или SIP ||
|| **PHONE_NUMBER**
[`string`](../../../data-types.md) | Номер, которому звонит оператор для исходящего звонка, или номер, на который звонит абонент для входящего звонка.

Поле возвращается при работе через арендованные номера или SIP ||
|| **CALLER_ID**
[`string`](../../../data-types.md) | Идентификатор линии для исходящего звонка или номер телефона клиента для входящего звонка ||
|| **REST_APP_ID**
[`integer`](../../../data-types.md) | Идентификатор приложения, связанного со звонком.

Поле возвращается при работе с приложением телефонии ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-voximplant-call-start.md)
- [{#T}](./on-voximplant-call-end.md)
- [{#T}](../../telephony-external-call-register.md)