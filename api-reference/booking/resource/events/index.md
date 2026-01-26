# Обзор событий при работе с ресурсами

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении и удалении ресурсов.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события раздела можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onBookingResourceAdd](./on-booking-resource-add.md) | При создании ресурса вручную или методом [booking.v1.resource.add](../booking-v1-resource-add.md) ||
|| [onBookingResourceUpdate](./on-booking-resource-update.md) | При обновлении ресурса вручную или методом [booking.v1.resource.update](../booking-v1-resource-update.md) ||
|| [onBookingResourceDelete](./on-booking-resource-delete.md) | При удалении ресурса вручную или методом [booking.v1.resource.delete](../booking-v1-resource-delete.md) ||
|#
