# Обзор событий при работе с записями листа ожидания

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении и удалении записей в лист ожидания.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

События бронирований описаны в статье [{#T}](../../booking/events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события записей в листе ожидания можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

В приложение события начинают приходить только после завершения установки. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

## Что приходит в обработчик

Все три события листа ожидания передают в объекте `data` только идентификатор записи. Идентификатор приходит строкой:

```json
{
    "event": "ONBOOKINGWAITLISTITEMUPDATE",
    "event_handler_id": "8",
    "data": {
        "ID": "1"
    },
    "ts": "1751285644"
}
```

Значений полей и списка изменений в событии нет. Чтобы узнать, что изменилось, запросите запись методом [booking.v1.waitlist.get](../booking-v1-waitlist-get.md) и сравните данные со своей копией. После события `onBookingWaitListItemDelete` этот метод вернет ошибку `1040` с описанием `Wait list not found`.

**Перенос между бронированием и листом ожидания.** Метод [booking.v1.booking.createfromwaitlist](../../booking/booking-v1-booking-createfromwaitlist.md) создает бронирование и удаляет исходную запись листа ожидания: сначала приходит `onBookingAdd`, затем `onBookingWaitListItemDelete`. Метод [booking.v1.waitlist.createfrombooking](../booking-v1-waitlist-createfrombooking.md) работает в обратную сторону: сначала приходит `onBookingWaitListItemAdd`, затем `onBookingDelete`.

Кроме того, в запросе приходит ключ `auth`. Он содержит параметры авторизации и данные портала, его структура описана на странице события, например [onBookingWaitListItemAdd](./on-booking-waitlistitem-add.md#auth).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onBookingWaitListItemAdd](./on-booking-waitlistitem-add.md) | При создании записи в листе ожидания вручную или методами [booking.v1.waitlist.add](../booking-v1-waitlist-add.md), [booking.v1.waitlist.createfrombooking](../booking-v1-waitlist-createfrombooking.md) ||
|| [onBookingWaitListItemUpdate](./on-booking-waitlistitem-update.md) | При изменении записи в листе ожидания вручную или методом [booking.v1.waitlist.update](../booking-v1-waitlist-update.md) ||
|| [onBookingWaitListItemDelete](./on-booking-waitlistitem-delete.md) | При удалении записи из листа ожидания вручную или методом [booking.v1.waitlist.delete](../booking-v1-waitlist-delete.md), а также при создании бронирования из записи методом [booking.v1.booking.createfromwaitlist](../../booking/booking-v1-booking-createfromwaitlist.md) ||
|#
