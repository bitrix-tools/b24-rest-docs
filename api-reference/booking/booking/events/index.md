# Обзор событий при работе с бронированиями

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении и удалении бронирований.

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
|| [onBookingAdd](./on-booking-add.md) | При создании бронирования вручную или методами [booking.v1.booking.add](../booking-v1-booking-add.md), [booking.v1.booking.createfromwaitlist](../booking-v1-booking-createfromwaitlist.md) ||
|| [onBookingUpdate](./on-booking-update.md) | При обновлении бронирования вручную или методом [booking.v1.booking.update](../booking-v1-booking-update.md) ||
|| [onBookingDelete](./on-booking-delete.md) | При удалении бронирования вручную или методом [booking.v1.booking.delete](../booking-v1-booking-delete.md) ||
|#
