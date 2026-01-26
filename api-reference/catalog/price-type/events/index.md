# Обзор событий при работе с типами цен

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении типа цен.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события типа цен можно через [приложение](./../../../../settings/app-installation/index.md) и метод [event.bind](./../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.PRICE.TYPE.ON.ADD](catalog-price-type-on-add.md)| При добавлении типа цены вручную или методом [catalog.priceType.add](../catalog-price-type-add.html) ||
|| [CATALOG.PRICE.TYPE.ON.UPDATE](catalog-price-type-on-update.md)| При обновлении типа цены вручную или методом [catalog.priceType.update](../catalog-price-type-update.html) ||
|| [CATALOG.PRICE.TYPE.ON.DELETE](catalog-price-type-on-delete.md)| При удалении типа цены вручную или методом [catalog.priceType.delete](../catalog-price-type-delete.html) ||
|#