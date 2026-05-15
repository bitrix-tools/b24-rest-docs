# Обзор событий при работе с сообщениями

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие событий старого раздела остановлено.
Используйте [События `imbot.v2`](../../../chat-bots-v2/imbot.v2/events/events.md).

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## События

#|
|| **Событие** | **Вызывается** ||
|| [ONIMBOTMESSAGEADD](./on-imbot-message-add.md) | При отправке сообщения в диалоге с чат-ботом вручную или методом [imbot.message.add](../imbot-message-add.md) ||
|| [ONIMBOTMESSAGEUPDATE](./on-imbot-message-update.md) | При редактировании сообщения в диалоге с чат-ботом вручную или методом [imbot.message.update](../imbot-message-update.md) ||
|| [ONIMBOTMESSAGEDELETE](./on-imbot-message-delete.md) | При удалении сообщения в диалоге с чат-ботом вручную или методом [imbot.message.delete](../imbot-message-delete.md) ||
|#
