# Обзор событий при работе с типами ресурсов

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении и удалении типов ресурсов.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события раздела можно через:

- [исходящий вебхук](../../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../../settings/app-installation/index.md) и метод [event.bind](../../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`booking`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onBookingResourceTypeAdd](./on-booking-resource-type-add.md) | При создании типа ресурса вручную или методом [booking.v1.resourcetype.add](../booking-v1-resourcetype-add.md) ||
|| [onBookingResourceTypeUpdate](./on-booking-resource-type-update.md) | При обновлении типа ресурса методом [booking.v1.resourcetype.update](../booking-v1-resourcetype-update.md) ||
|| [onBookingResourceTypeDelete](./on-booking-resource-type-delete.md) | При удалении типа ресурса методом [booking.v1.resourcetype.delete](../booking-v1-resourcetype-delete.md) ||
|#
