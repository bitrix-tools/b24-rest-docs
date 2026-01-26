# Обзор событий при работе с записями в лист ожидания

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении и удалении записей в лист ожидания.

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

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onBookingWaitListItemAdd](./on-booking-waitlistitem-add.md) | При создании записи в лист ожидания вручную или методами [booking.v1.waitlist.add](../booking-v1-waitlist-add.md), [booking.v1.waitlist.createfrombooking](../booking-v1-waitlist-createfrombooking.md) ||
|| [onCrmDealUpdate](./on-booking-waitlistitem-update.md) | При изменении записи в лист ожидания вручную или методом [booking.v1.waitlist.update](../booking-v1-waitlist-update.md) ||
|| [onBookingWaitListItemUpdate](./on-booking-waitlistitem-delete.md) | При удалении записи из листа ожидания вручную или методом [booking.v1.waitlist.delete](../booking-v1-waitlist-delete.md) ||
|#