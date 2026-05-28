# Обзор устаревших методов чат-ботов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие раздела остановлено.
Используйте актуальные разделы:
- [Чат-боты 2.0](../chat-bots-v2/index.md)
- [Мессенджер im.v2](../chat-bots-v2/im.v2/index.md)

{% endnote %}

## Обзор методов

#|
|| **Раздел** | **Методы** ||
|| Чат-боты | [imbot.*](./bots/index.md) ||
|| Чаты | [imbot.chat.*](./chats/index.md), [imbot.dialog.get](./chats/imbot-dialog-get.md) ||
|| Команды | [imbot.command.*](./commands/index.md) ||
|| Сообщения | [imbot.message.*](./messages/index.md) ||
|#

## Обзор событий

#|
|| **Раздел** | **События** ||
|| События чат-ботов | [ONIMBOTDELETE](./events/on-imbot-delete.md) ||
|| События чатов | [ONIMBOTJOINCHAT](./chats/events/on-imbot-join-chat.md) ||
|| События команд | [ONIMCOMMANDADD](./commands/events/on-im-command-add.md) ||
|| События сообщений | [ONIMBOTMESSAGEADD](./messages/events/on-imbot-message-add.md), [ONIMBOTMESSAGEUPDATE](./messages/events/on-imbot-message-update.md), [ONIMBOTMESSAGEDELETE](./messages/events/on-imbot-message-delete.md) ||
|#

