# Событие окончания разговора ONVOXIMPLANTCALLEND

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONVOXIMPLANTCALLEND` срабатывает при окончании разговора и записи информации о звонке в историю.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONVOXIMPLANTCALLEND",
    "event_handler_id": "1061",
    "data": {
        "CALL_ID": "externalCall.7b0c7de811455ef32b18dc5917e4306a.1773239327",
        "CALL_TYPE": "1",
        "PHONE_NUMBER": "+79061234567",
        "PORTAL_NUMBER": "REST_APP:",
        "PORTAL_USER_ID": "1269",
        "CALL_DURATION": "0",
        "CALL_START_DATE": "2026-03-11T17:28:46+03:00",
        "COST": "0",
        "COST_CURRENCY": "",
        "CALL_FAILED_CODE": "304",
        "CALL_FAILED_REASON": "Call canceled",
        "CRM_ACTIVITY_ID": "7953"
    },
    "ts": "1773239624",
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

В данном случае — `ONVOXIMPLANTCALLEND` ||
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
|| **PHONE_NUMBER**
[`string`](../../../data-types.md) | Номер телефона абонента для входящего звонка или номер, которому звонит оператор, для исходящего звонка ||
|| **PORTAL_NUMBER**
[`string`](../../../data-types.md) | Номер, на который поступил входящий звонок, или номер, с которого был совершен исходящий звонок ||
|| **PORTAL_USER_ID**
[`integer`](../../../data-types.md) | Идентификатор оператора, связанного со звонком ||
|| **CALL_DURATION**
[`integer`](../../../data-types.md) | Длительность звонка в секундах ||
|| **CALL_START_DATE**
[`datetime`](../../../data-types.md) | Дата и время начала звонка в ISO-8601 ||
|| **COST**
[`double`](../../../data-types.md) | Стоимость звонка ||
|| **COST_CURRENCY**
[`string`](../../../data-types.md) | Валюта звонка ||
|| **CALL_FAILED_CODE**
[`string`](../../../data-types.md) | Код завершения вызова.

Возможные значения:

- `200` — успешный звонок
- `304` — пропущенный звонок
- `603` — отклонено
- `603-S` — вызов отменен
- `403` — запрещено
- `404` — неверный номер
- `486` — занято
- `484` — направление недоступно
- `503` — направление недоступно
- `480` — временно недоступен
- `402` — недостаточно средств
- `423` — заблокировано
- `OTHER` — не определено ||
|| **CALL_FAILED_REASON**
[`string`](../../../data-types.md) | Текстовое описание кода завершения вызова ||
|| **CRM_ACTIVITY_ID**
[`integer`](../../../data-types.md) | Идентификатор дела CRM, связанного со звонком ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-voximplant-call-init.md)
- [{#T}](./on-voximplant-call-start.md)
- [{#T}](../voximplant-statistic-get.md)
