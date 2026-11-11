# Событие при создании шаблона регулярной сделки onCrmDealRecurringAdd

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCRMDEALRECURRINGADD` сработает при создании шаблона регулярной сделки вручную или методом [crm.deal.recurring.add](../crm-deal-recurring-add.md).

Сделку-шаблон Битрикс24 создает как обычную сделку: при создании шаблона в интерфейсе или копированием обычной сделки методом `crm.deal.recurring.add`. Поэтому перед `onCrmDealRecurringAdd` приходит событие [onCrmDealAdd](../../events/on-crm-deal-add.md) с `ID` сделки-шаблона — это значение совпадает с `RECURRING_DEAL_ID`. Если в `crm.deal.recurring.add` передать сделку-шаблон с `IS_RECURRING` = `Y`, новая сделка не создается и `onCrmDealAdd` не приходит.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMDEALRECURRINGADD",
    "event_handler_id": "677",
    "data": {
        "FIELDS": {
            "ID": "11",
            "RECURRING_DEAL_ID": "6797"
        }
    },
    "ts": "1741091781",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "crm",
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../../data-types.md) | Символьный код события.

В данном случае — `ONCRMDEALRECURRINGADD` ||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию о созданных настройках повторения.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект с идентификаторами созданных настроек повторения и сделки-шаблона.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth**
[`object`](../../../../data-types.md) | Объект, содержащий параметры авторизации и данные о Битрикс24, в котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор настроек повторения. Передайте его в параметр `id` метода [crm.deal.recurring.get](../crm-deal-recurring-get.md), чтобы получить настройки ||
|| **RECURRING_DEAL_ID**
[`integer`](../../../../data-types.md) | Идентификатор сделки-шаблона, из которой копируются значения полей. Совпадает с полем `DEAL_ID` в ответе [crm.deal.recurring.get](../crm-deal-recurring-get.md). Поля сделки-шаблона возвращает [crm.deal.get](../../crm-deal-get.md) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./on-crm-deal-recurring-update.md)
- [{#T}](./on-crm-deal-recurring-delete.md)
- [{#T}](./on-crm-deal-recurring-expose.md)
