# Обзор событий при работе с событиями календаря

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о добавлении, изменении или удалении события календаря.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события задач можно через:

-  [исходящий вебхук](../../../../local-integrations/local-webhooks.md)
-  [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`calendar`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnCalendarEntryAdd](./on-calendar-entry-add.md) | При добавлении события календаря вручную или методом [calendar.event.add](../calendar-event-add.md) ||
|| [OnCalendarEntryUpdate](./on-calendar-entry-update.md) | При добавлении события календаря вручную или методом [calendar.event.update](../calendar-event-update.md) ||
|| [OnCalendarEntryDelete](./on-calendar-entry-delete.md) | При добавлении события календаря вручную или методом [calendar.event.delete](../calendar-event-delete.md) ||
|#
