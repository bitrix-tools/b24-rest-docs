# Событие при изменении статуса участника OnSignB2eMemberStatusChanged

> Scope: [`sign.b2e`](../../scopes/permissions.md)
>
> Кто может подписаться: пользователь с доступом к КЭДО

Событие `OnSignB2eMemberStatusChanged` срабатывает при изменении статуса участника подписания.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONSIGNB2EMEMBERSTATUSCHANGED",
    "event_handler_id": "1211",
    "data": {
        "memberUid": "2ditmm6vjoolzbygaeua2jltkjb9hgks",
        "documentUid": "R-LK-50JI-3AAK-WS1A",
        "statusCode": "done",
        "statusName": "Signed"
    },
    "ts": "1770374945",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "sign.b2e",
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "60133c09d1f5d0fd6d7884a11fad4585",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "81905784dd6e05280c9a2015e0e61e68"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../data-types.md) | Символьный код события.

В данном случае — `ONSIGNB2EMEMBERSTATUSCHANGED` ||
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../data-types.md) | Объект, содержащий информацию об участнике ||
|| **data.memberUid**
[`string`](../../data-types.md) | Уникальный идентификатор участника ||
|| **data.documentUid**
[`string`](../../data-types.md) | Уникальный идентификатор документа ||
|| **data.companyUid**
[`string`](../../data-types.md) | Уникальный идентификатор компании. Возвращается в событии, если документ подписывается с компанией, для которой создана интеграция ||
|| **data.statusCode**
[`string`](../../data-types.md) | Код статуса участника ||
|| **data.statusName**
[`string`](../../data-types.md) | Название статуса участника ||
|| **ts**
[`timestamp`](../../data-types.md) | Дата и время отправки события из [очереди событий](../../events/index.md) ||
|| **auth**
[`object`](../../data-types.md) | Объект с параметрами авторизации и данными о портале.

Структура описана [ниже](#auth) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./on-sign-b2e-document-status-changed.md)
