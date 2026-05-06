# Обзор событий при работе с комментариями

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о добавлении, обновлении или удалении комментариев таймлайна.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события комментариев таймлайна можно через:

- [исходящий вебхук](../../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../../settings/app-installation/index.md) и метод [event.bind](../../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

## События

#|
|| **Событие** | **Вызывается** ||
|| [onCrmTimelineCommentAdd](./on-Crm-Timeline-Comment-Add.md) | При созданиии нового комментария в таймлайне вручную или методом [crm.timeline.comment.add](../crm-timeline-comment-add.md) ||
|| [onCrmTimelineCommentUpdate](./on-Crm-Timeline-Comment-Update.md) | При обновление комментария в таймлайне вручную или методом [crm.timeline.comment.update](../crm-timeline-comment-update.md) ||
|| [onCrmTimelineCommentDelete](./on-Crm-Timeline-Comment-Delete.md) | При удалении комментария в таймлайне вручную или методом [crm.timeline.comment.delete](../crm-timeline-comment-delete.md) ||
|#
