# Обзор событий при работе со сделками

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении, удалении и перемещении сделок.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события [onCrmDealAdd](./on-crm-deal-add.md), [onCrmDealUpdate](./on-crm-deal-update.md) и [onCrmDealDelete](./on-crm-deal-delete.md) можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Подписаться на событие [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md) можно только через [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmDealAdd](./on-crm-deal-add.md) | При создании сделки вручную или методом [crm.deal.add](../crm-deal-add.md) ||
|| [onCrmDealUpdate](./on-crm-deal-update.md) | При изменении сделки вручную или методом [crm.deal.update](../crm-deal-update.md) ||
|| [onCrmDealDelete](./on-crm-deal-delete.md) | При удалении сделки вручную или методом [crm.deal.delete](../crm-deal-delete.md) ||
|| [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md) | При изменении воронки сделки вручную или методом [crm.item.update](../../universal/crm-item-update.md) ||
|#