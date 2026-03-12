# Событие запроса обратного звонка ONEXTERNALCALLBACKSTART

> Scope: [`telephony`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONEXTERNALCALLBACKSTART` срабатывает, когда посетитель заполняет CRM-форму обратного звонка. В настройках формы должно быть выбрано ваше приложение как линия для обратного звонка.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONEXTERNALCALLBACKSTART",
    "event_handler_id": "1053",
    "data": {
        "PHONE_NUMBER": "+74951234567",
        "TEXT": "Заказан обратный звонок с сайта, соединяю вас с клиентом",
        "VOICE": "ruinternalfemale",
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": "5785",
        "LINE_NUMBER": "7"
    },
    "ts": "1773234727",
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
[`string`](../../data-types.md) | Символьный код события.

В данном случае — `ONEXTERNALCALLBACKSTART` ||
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../data-types.md) | Объект с данными события.

Структура описана [ниже](#data) ||
|| **ts**
[`timestamp`](../../data-types.md) | Дата и время отправки события из [очереди событий](../../events/index.md) ||
|| **auth**
[`object`](../../data-types.md) | Объект с параметрами авторизации пользователя, от имени которого сработало событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **PHONE_NUMBER**
[`string`](../../data-types.md) | Номер телефона, на который нужно выполнить обратный звонок ||
|| **TEXT**
[`string`](../../data-types.md) | Текст, который должен быть произнесен ответственному перед началом звонка ||
|| **VOICE**
[`string`](../../data-types.md) | Идентификатор голоса для синтеза речи ||
|| **CRM_ENTITY_TYPE**
[`string`](../../data-types.md) | Тип связанного объекта CRM ||
|| **CRM_ENTITY_ID**
[`integer`](../../data-types.md) | Идентификатор объекта CRM, тип которого указан в `CRM_ENTITY_TYPE` ||
|| **LINE_NUMBER**
[`string`](../../data-types.md) | Номер внешней линии, через которую запрошен обратный звонок ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../voximplant/voximplant-callback-start.md)
- [{#T}](../voximplant/voximplant-tts-voices-get.md)
- [{#T}](./on-external-call-start.md)
