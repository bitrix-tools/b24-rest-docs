# Событие начала исходящего звонка ONEXTERNALCALLSTART

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONEXTERNALCALLSTART` срабатывает, когда пользователь нажимает на телефонный номер в объектах CRM для совершения исходящего звонка через выбранное приложение телефонии.

Чтобы событие срабатывало, укажите приложение в поле Номер для исходящего звонка по-умолчанию в настройках телефонии или выберите его как приложение по-умолчанию в настройках пользователя.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONEXTERNALCALLSTART",
    "event_handler_id": "1055",
    "data": {
        "PHONE_NUMBER": "+74951234567",
        "PHONE_NUMBER_INTERNATIONAL": "+74951234567",
        "EXTENSION": "",
        "USER_ID": "1269",
        "CALL_LIST_ID": "0",
        "LINE_NUMBER": "7",
        "IS_MOBILE": "0",
        "CALL_ID": "externalCall.89350264e026dace3f2b14d1f438257c.1773236989",
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": "797"
    },
    "ts": "1773236988",
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

В данном случае — `ONEXTERNALCALLSTART` ||
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
[`string`](../../data-types.md) | Номер телефона, по которому пользователь начал исходящий звонок ||
|| **PHONE_NUMBER_INTERNATIONAL**
[`string`](../../data-types.md) | Номер телефона в международном формате ||
|| **EXTENSION**
[`string`](../../data-types.md) | Добавочный номер ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, для которого нужно зарегистрировать внешний звонок ||
|| **CALL_LIST_ID**
[`integer`](../../data-types.md) | Идентификатор списка обзвона, если звонок начат из списка обзвона ||
|| **LINE_NUMBER**
[`string`](../../data-types.md) | Номер внешней линии, через которую запрошен звонок ||
|| **IS_MOBILE**
[`string`](../../data-types.md) | Флаг того, что звонок инициирован из мобильного приложения.

Возможные значения:
- `0` - звонок инициирован не из мобильного приложения
- `1` - звонок инициирован из мобильного приложения ||
|| **CALL_ID**
[`string`](../../data-types.md) | Идентификатор звонка, созданный при регистрации внешнего вызова ||
|| **CRM_ENTITY_TYPE**
[`string`](../../data-types.md) | Тип объекта CRM, из карточки которого начат звонок ||
|| **CRM_ENTITY_ID**
[`integer`](../../data-types.md) | Идентификатор объекта CRM, тип которого указан в `CRM_ENTITY_TYPE` ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../telephony-external-call-register.md)
- [{#T}](../telephony-external-call-finish.md)
- [{#T}](./on-external-call-back-start.md)