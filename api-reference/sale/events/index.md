# Обзор событий при работе с Интернет-магазином

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

События позволяют приложениям реагировать на изменения в Интернет-магазине практически в реальном времени: получать уведомления о сохранении и удалении заказов, оплат, отгрузок и значений свойств заказа.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события Интернет-магазина можно через:

- [исходящий вебхук](../../../local-integrations/local-webhooks.md)
- [приложение](../../../settings/app-installation/index.md) и метод [event.bind](../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../events/test-handler.md).

## Ограничения и особенности доставки событий

- События не отправляются в приложение, пока установка приложения не завершена. Подробнее в статье [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnSaleOrderSaved](./on-sale-order-saved.md) | В конце сохранения заказа ||
|| [OnSaleBeforeOrderDelete](./on-sale-before-order-delete.md) | Перед удалением заказа ||
|| [OnPropertyValueEntitySaved](./on-property-value-entity-saved.md) | После сохранения значения свойства заказа ||
|| [OnPaymentEntitySaved](./on-payment-entity-saved.md) | После сохранения оплаты ||
|| [OnShipmentEntitySaved](./on-shipment-entity-saved.md) | После сохранения отгрузки ||
|| [OnOrderEntitySaved](./on-order-entity-saved.md) | После сохранения заказа ||
|| [OnPropertyValueDeleted](./on-property-value-deleted.md) | При удалении значения свойства заказа ||
|| [OnPaymentDeleted](./on-payment-deleted.md) | При удалении оплаты из базы ||
|| [OnShipmentDeleted](./on-shipment-deleted.md) | При удалении отгрузки из базы ||
|| [OnOrderDeleted](./on-order-deleted.md) | При удалении заказа из базы ||
|#
