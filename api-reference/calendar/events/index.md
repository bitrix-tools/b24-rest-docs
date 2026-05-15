# Обзор событий при работе с секциями календаря или ресурсами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о добавлении, изменении или удалении секции календаря и ресурса.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события задач можно через:

-  [исходящий вебхук](../../../local-integrations/local-webhooks.md)
-  [приложение](../../../settings/app-installation/index.md) и метод [event.bind](../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnCalendarSectionAdd](./on-calendar-section-add.md) |
- При добавлении секции календаря вручную или методом [calendar.section.add](../calendar-section-add.md)
- При добавлении ресурса вручную или методом [calendar.resource.add](../resource/calendar-resource-add.md) ||
|| [OnCalendarSectionUpdate](./on-calendar-section-update.md) | 
- При изменении секции календаря вручную или методом [calendar.section.update](../calendar-section-update.md)
- При изменении ресурса вручную или методом [calendar.resource.update](../resource/calendar-resource-update.md) ||
|| [OnCalendarSectionDelete](./on-calendar-section-delete.md) | 
- При удалении секции календаря вручную или методом [calendar.section.delete](../calendar-section-delete.md)
- При удалении ресурса вручную или методом [calendar.resource.delete](../resource/calendar-resource-delete.md) ||
|#