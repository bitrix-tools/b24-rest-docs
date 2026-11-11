# Событие при изменении настроек повторения регулярной сделки onCrmDealRecurringUpdate

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCRMDEALRECURRINGUPDATE` сработает в трех случаях:

- при изменении настроек повторения вручную или методом [crm.deal.recurring.update](../crm-deal-recurring-update.md)
- при создании сделки по шаблону, сразу после [onCrmDealRecurringExpose](./on-crm-deal-recurring-expose.md)
- когда сделку по расписанию не удалось создать — Битрикс24 отключает повторение, и событие приходит без `onCrmDealRecurringExpose`

После создания сделки по шаблону Битрикс24 записывает в настройки счетчик повторов и дату последнего запуска. При запуске по расписанию он также пересчитывает дату следующего запуска.

Событие не вызывается при изменении полей самой сделки-шаблона, например названия или суммы. Такие изменения отслеживает событие [onCrmDealUpdate](../../events/on-crm-deal-update.md).

Списка измененных настроек в событии нет — запросите текущие значения по `ID` из [параметра FIELDS](#fields).

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMDEALRECURRINGUPDATE",
    "event_handler_id": "679",
    "data": {
        "FIELDS": {
            "ID": "9",
            "RECURRING_DEAL_ID": "6791"
        }
    },
    "ts": "1741092489",
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

В данном случае — `ONCRMDEALRECURRINGUPDATE` ||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию об измененных настройках повторения.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект с идентификаторами измененных настроек повторения и сделки-шаблона.

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
- [{#T}](./on-crm-deal-recurring-add.md)
- [{#T}](./on-crm-deal-recurring-delete.md)
- [{#T}](./on-crm-deal-recurring-expose.md)
