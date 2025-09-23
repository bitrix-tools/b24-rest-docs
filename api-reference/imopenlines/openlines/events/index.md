# Обзор событий при работе с открытыми линиями

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении сообщений в чате открытой линии.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события открытой линии можно через [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`imopenlines`](../../../scopes/permissions.md) 
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnSessionStart](./on-session-start.md) | При создании чата вручную или методом [imopenlines.session.start](../sessions/imopenlines-session-start.md) ||
|| [OnOpenLineMessageAdd](./on-open-line-message-add.md) | При добавлении сообщения в чат вручную или методом [imopenlines.crm.message.add](../messages/imopenlines-crm-message-add.md)||
|| [OnOpenLineMessageUpdate](./on-open-line-message-update.md) | При изменении сообщения в чате вручную ||
|| [OnOpenLineMessageDelete](./on-open-line-message-delete.md) | При удалении сообщения в чате вручную ||
|| [OnSessionFinish](./on-session-finish.md) | При закрытии чата вручную ||
|#