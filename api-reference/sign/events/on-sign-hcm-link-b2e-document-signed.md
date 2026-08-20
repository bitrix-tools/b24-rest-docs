# Событие при подписании документа HCM Link OnSignHcmLinkB2eDocumentSigned

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../../scopes/permissions.md)
>
> Кто может подписаться: пользователь с доступом к КЭДО

Событие `ONSIGNHCMLINKB2EDOCUMENTSIGNED` срабатывает после подписания документа КЭДО, который связан с HCM Link.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONSIGNHCMLINKB2EDOCUMENTSIGNED",
    "event_handler_id": "1215",
    "data": {
        "id": 3942,
        "company": "acme-hr"
    },
    "ts": "1786086930",
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

В данном случае — `ONSIGNHCMLINKB2EDOCUMENTSIGNED` ||
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../data-types.md) | Объект, содержащий данные о подписанном документе HCM Link ||
|| **data.id**
[`integer`](../../data-types.md) | Идентификатор участника подписания. Передайте его в параметр `id` метода [sign.b2e.hcmlink.document.get](../sign-b2e-hcmlink-document-get.md), чтобы получить данные подписанного документа ||
|| **data.company**
[`string`](../../data-types.md) | Код компании HCM Link ||
|| **ts**
[`timestamp`](../../data-types.md) | Дата и время отправки события из [очереди событий](../../events/index.md) ||
|| **auth**
[`object`](../../data-types.md) | Объект с параметрами авторизации и данными Битрикс24.

Структура описана [ниже](#auth) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](../sign-b2e-hcmlink-document-get.md)
- [{#T}](./on-sign-b2e-document-status-changed.md)
- [{#T}](./on-sign-b2e-member-status-changed.md)
