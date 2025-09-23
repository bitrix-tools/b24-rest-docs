# Обзор событий при работе с товарами

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении товаров, услуг, головных товаров и вариаций.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события товаров можно через [приложение](./../../../../settings/app-installation/index.md) и метод [event.bind](./../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.PRODUCT.ON.ADD](catalog-product-on-add.md)| При добавлении:

 - товара вручную или методом [catalog.product.add](../catalog-product-add.md)

 - услуги вручную или методом [catalog.product.service.add](../service/catalog-product-service-add.md)

 - головного товара вручную или методом [catalog.product.sku.add](../sku/catalog-product-sku-add.md)

 - вариации вручную или методом [catalog.product.offer.add](../offer/catalog-product-offer-add.md) ||
|| [CATALOG.PRODUCT.ON.UPDATE](catalog-product-on-update.md)| При обновлении:

 - товара вручную или методом [catalog.product.update](../catalog-product-update.md)

 - услуги вручную или методом [catalog.product.service.update](../service/catalog-product-service-update.md)

 - головного товара вручную или методом [catalog.product.sku.update](../sku/catalog-product-sku-update.md)

 - вариации вручную или методом [catalog.product.offer.update](../offer/catalog-product-offer-update.md) ||
|| [CATALOG.PRODUCT.ON.DELETE](catalog-product-on-delete.md)| При удалении:

 - товара вручную или методом [catalog.product.delete](../catalog-product-delete.md)

 - услуги вручную или методом [catalog.product.service.delete](../service/catalog-product-service-delete.md)

 - головного товара вручную или методом [catalog.product.sku.delete](../sku/catalog-product-sku-delete.md)

 - вариации вручную или методом [catalog.product.offer.delete](../offer/catalog-product-offer-delete.md) ||
|#
