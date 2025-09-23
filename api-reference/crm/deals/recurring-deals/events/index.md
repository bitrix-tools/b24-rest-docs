# Обзор событий при работе с регулярными сделками

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении регулярных сделок, а также при автоматическом создании новых сделок по шаблону регулярных.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события регулярных сделок можно через:

- [исходящий вебхук](../../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../../settings/app-installation/index.md) и метод [event.bind](../../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmDealRecurringAdd](./on-crm-deal-recurring-add.md) | При создании новой регулярной сделки вручную или методом [crm.deal.recurring.add](../crm-deal-recurring-add.md) ||
|| [onCrmDealRecurringUpdate](./on-crm-deal-recurring-update.md) | При изменении регулярной сделки вручную или методом [crm.deal.recurring.update](../crm-deal-recurring-update.md) ||
|| [onCrmDealRecurringDelete](./on-crm-deal-recurring-delete.md) | При удалении регулярной сделки вручную или методом [crm.deal.recurring.delete](../crm-deal-recurring-delete.md) ||
|| [onCrmDealRecurringExpose](./on-crm-deal-recurring-expose.md) | При автоматическом создании новой сделки по шаблону регулярной сделки или методом [crm.deal.recurring.expose](../crm-deal-recurring-expose.md) ||
|#
