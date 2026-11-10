# Обзор событий при работе с контактами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении [контактов](../index.md). События о создании, изменении и удалении пользовательских полей контактов собраны в отдельной группе — [Обзор событий при работе с пользовательскими полями контактов](../userfield/events/index.md).

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события контактов можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Какие данные приходят в событиях

Структура запроса у всех трех событий одинаковая, отличается только код в `event`. В `data.FIELDS.ID` приходит идентификатор контакта, значений полей в событии нет.

```json
{
    "event": "ONCRMCONTACTADD",
    "event_handler_id": "11",
    "data": {
        "FIELDS": {
            "ID": "89"
        }
    },
    "ts": "1724695689",
    "auth": {
        "domain": "some-domain.bitrix24.com",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

Битрикс24 отправляет запрос с content-type `application/x-www-form-urlencoded`, все значения приходят строками. Пример сокращен: полный состав `auth` с токенами описан на страницах событий в разделе [Параметр auth](./on-crm-contact-add.md#auth).

После создания и изменения получите данные контакта методом [crm.contact.get](../crm-contact-get.md) или [crm.item.get](../../universal/crm-item-get.md) с `entityTypeId = 3`. После удаления контакт уже недоступен, поэтому храните нужные данные на своей стороне заранее.

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmContactAdd](./on-crm-contact-add.md) | При создании контакта вручную, методом [crm.contact.add](../crm-contact-add.md) или методом [crm.item.add](../../universal/crm-item-add.md) с `entityTypeId = 3` ||
|| [onCrmContactUpdate](./on-crm-contact-update.md) | При обновлении контакта вручную, методом [crm.contact.update](../crm-contact-update.md) или методом [crm.item.update](../../universal/crm-item-update.md) с `entityTypeId = 3` ||
|| [onCrmContactDelete](./on-crm-contact-delete.md) | При удалении контакта вручную, методом [crm.contact.delete](../crm-contact-delete.md) или методом [crm.item.delete](../../universal/crm-item-delete.md) с `entityTypeId = 3` ||
|#