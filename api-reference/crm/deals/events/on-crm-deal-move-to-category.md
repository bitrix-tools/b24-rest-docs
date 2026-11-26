# Событие при изменении воронки сделки onCrmDealMoveToCategory

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь, для офлайн-событий нужны права администратора

Событие `ONCRMDEALMOVETOCATEGORY` сработает, когда сделку переносят в другую воронку из карточки сделки или роботом «Сменить воронку». Смена воронки методом [crm.item.update](../../universal/crm-item-update.md) не вызывает это событие. В этом случае срабатывает [onCrmDealUpdate](./on-crm-deal-update.md).

На событие можно подписаться только из [приложения](../../../../settings/app-installation/index.md).

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md).

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMDEALMOVETOCATEGORY",
    "event_handler_id": "655",
    "data": {
        "FIELDS": {
            "ID": "6675",
            "CATEGORY_ID": "1",
            "STAGE_ID": "C1:NEW"
        }
    },
    "ts": "1736424182",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "crm",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONCRMDEALMOVETOCATEGORY` ||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект, содержащий информацию об измененной сделке.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../data-types.md) | Объект, содержащий идентификатор сделки, новую воронку и новую стадию.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о Битрикс24, в котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор измененной сделки. В примере POST-запроса представлен строкой ||
|| **CATEGORY_ID**
[`integer`](../../../data-types.md) | Идентификатор новой воронки сделки. В примере POST-запроса представлен строкой ||
|| **STAGE_ID**
[`string`](../../../data-types.md) | Идентификатор новой стадии сделки ||
|#

Остальные данные сделки событие не передает, их можно получить методом [crm.deal.get](../crm-deal-get.md).

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](./on-crm-deal-add.md)
- [{#T}](./on-crm-deal-update.md)
- [{#T}](./on-crm-deal-delete.md)
- [{#T}](../crm-deal-get.md)
