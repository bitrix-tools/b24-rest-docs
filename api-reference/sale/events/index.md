# Обзор событий при работе с Интернет-магазином

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События позволяют приложениям реагировать на изменения в Интернет-магазине практически в реальном времени: получать уведомления о сохранении и удалении заказов, оплат, отгрузок и значений свойств заказа.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../events/index.md).

> Быстрый переход: [все события](#all-events)
>
> Пользовательская документация: [Как покупателю оформить заказ в интернет-магазине](https://helpdesk.bitrix24.ru/open/28841930/)

## Как получать события

Подписаться на события Интернет-магазина можно через:

- [исходящий вебхук](../../../local-integrations/local-webhooks.md)
- [приложение](../../../settings/app-installation/index.md) и метод [event.bind](../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../events/test-handler.md).

## Ограничения и особенности доставки событий

- События не отправляются в приложение, пока установка приложения не завершена. Подробнее в статье [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)
- Обработчик получает идентификатор измененного объекта. Полную информацию об объекте запрашивайте профильным методом: [sale.order.get](../order/sale-order-get.md), [sale.payment.get](../payment/sale-payment-get.md), [sale.shipment.get](../shipment/sale-shipment-get.md) или методами раздела [Значения свойства](../property-value/index.md)
- События доставляются после завершения запроса, который их вызвал. Для событий удаления объект к этому моменту уже удален, поэтому профильный метод не вернет его данные. Если обработчику нужны поля удаляемого объекта, сохраняйте их заранее по событиям сохранения

## Какое событие выбрать

Все события передают в `data.FIELDS` идентификатор объекта `ID`. События [OnSaleOrderSaved](./on-sale-order-saved.md) и [OnSaleBeforeOrderDelete](./on-sale-before-order-delete.md) дополнительно передают внешний идентификатор заказа `XML_ID` и действие `ACTION` со значением `save` или `delete`.

- Чтобы получить заказ после любого изменения, подпишитесь на [OnSaleOrderSaved](./on-sale-order-saved.md). Событие приходит в конце сохранения, когда заказ, оплаты, отгрузки и значения свойств уже сохранены. В рамках одного запроса к Битрикс24 обработчик получает его один раз, даже если заказ сохранялся несколько раз
- Чтобы отслеживать каждое сохранение полей заказа, используйте [OnOrderEntitySaved](./on-order-entity-saved.md). Событие приходит сразу после записи полей заказа, до сохранения оплат, отгрузок и значений свойств
- Чтобы получить внешний идентификатор `XML_ID` удаляемого заказа, используйте [OnSaleBeforeOrderDelete](./on-sale-before-order-delete.md). Чтобы узнать, что заказ удален из базы, используйте [OnOrderDeleted](./on-order-deleted.md)

### Порядок событий при удалении заказа

При удалении заказа вручную или методом [sale.order.delete](../order/sale-order-delete.md) события приходят в таком порядке:

1. Заказ отменяется и сохраняется — приходят [OnOrderEntitySaved](./on-order-entity-saved.md) и [OnSaleOrderSaved](./on-sale-order-saved.md)
2. [OnSaleBeforeOrderDelete](./on-sale-before-order-delete.md). После него `OnSaleOrderSaved` для этого заказа не отправляется
3. [OnPropertyValueDeleted](./on-property-value-deleted.md), [OnPaymentDeleted](./on-payment-deleted.md) и [OnShipmentDeleted](./on-shipment-deleted.md) для каждого значения свойства, оплаты и отгрузки заказа
4. [OnOrderDeleted](./on-order-deleted.md)

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnSaleOrderSaved](./on-sale-order-saved.md) | В конце сохранения заказа вручную или методами [sale.order.add](../order/sale-order-add.md), [sale.order.update](../order/sale-order-update.md), а также методами оплат, отгрузок и значений свойств заказа ||
|| [OnSaleBeforeOrderDelete](./on-sale-before-order-delete.md) | Перед удалением заказа из базы вручную или методом [sale.order.delete](../order/sale-order-delete.md) ||
|| [OnPropertyValueEntitySaved](./on-property-value-entity-saved.md) | После сохранения значения свойства заказа вручную или методом [sale.propertyvalue.modify](../property-value/sale-property-value-modify.md) ||
|| [OnPaymentEntitySaved](./on-payment-entity-saved.md) | После сохранения оплаты вручную или методами [sale.payment.add](../payment/sale-payment-add.md), [sale.payment.update](../payment/sale-payment-update.md) ||
|| [OnShipmentEntitySaved](./on-shipment-entity-saved.md) | После сохранения отгрузки вручную или методами [sale.shipment.add](../shipment/sale-shipment-add.md), [sale.shipment.update](../shipment/sale-shipment-update.md) ||
|| [OnOrderEntitySaved](./on-order-entity-saved.md) | При каждом сохранении заказа вручную или методами [sale.order.add](../order/sale-order-add.md), [sale.order.update](../order/sale-order-update.md), методами оплат, отгрузок и значений свойств заказа, а также при удалении заказа ||
|| [OnPropertyValueDeleted](./on-property-value-deleted.md) | При удалении значения свойства заказа из базы вручную, методом [sale.propertyvalue.delete](../property-value/sale-property-value-delete.md) или вместе с заказом ||
|| [OnPaymentDeleted](./on-payment-deleted.md) | При удалении оплаты из базы вручную, методом [sale.payment.delete](../payment/sale-payment-delete.md) или вместе с заказом ||
|| [OnShipmentDeleted](./on-shipment-deleted.md) | При удалении отгрузки из базы вручную, методом [sale.shipment.delete](../shipment/sale-shipment-delete.md) или вместе с заказом ||
|| [OnOrderDeleted](./on-order-deleted.md) | После удаления заказа из базы вручную или методом [sale.order.delete](../order/sale-order-delete.md) ||
|#
