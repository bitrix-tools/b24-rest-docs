# Обзор событий при работе с чатами

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления при добавлении или удалении бота из чата.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события чатов можно через:

-  [исходящий вебхук](../../../../local-integrations/local-webhooks.md)

-  [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [ONIMBOTJOINCHAT](./on-imbot-join-chat.md) | При добавлении бота в чат вручную или методом [imbot.chat.add](../imbot-chat-add.md), [imopenlines.crm.chat.user.add](../../../imopenlines/openlines/chats/imopenlines-crm-chat-user-add.md) и [im.chat.user.add](../../../chats/chat-users/im-chat-user-add.md) ||
|| [ONIMBOTDELETE](./on-imbot-delete.md) | При удалении чат-бота  методом [imbot.unregister](../../imbot-unregister.md) ||
|#