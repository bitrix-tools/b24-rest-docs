# О событиях

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие событий старого Bot API остановлено.
Используйте [События `imbot.v2`](../../chat-bots-v2/imbot.v2/events/index.md).

{% endnote %}

## События

#|
|| **Событие** | **Вызывается** ||
|| [ONAPPINSTALL](../../../common/events/on-app-install.md) | Событие на установку приложения с чат-ботом ||
|| [ONAPPUPDATE](../../../common/events/on-app-update.md) | Событие на обновление приложения ||
|| [ONIMBOTMESSAGEADD](../messages/events/on-imbot-message-add.md) | Событие после отправки сообщения от пользователя к чат-боту ||
|| [ONIMBOTMESSAGEUPDATE](../messages/events/on-imbot-message-update.md) | Событие после обновления сообщения чат-бота ||
|| [ONIMBOTMESSAGEDELETE](../messages/events/on-imbot-message-delete.md) | Событие после удаления сообщения чат-бота ||
|| [ONIMCOMMANDADD](../commands/events/on-im-command-add.md) | Событие после отправки команды от пользователя к чат-боту ||
|| [ONIMBOTJOINCHAT](../chats/events/on-imbot-join-chat.md) | Событие при подключении чат-бота к чату или личному диалогу ||
|| [ONIMBOTDELETE](./on-imbot-delete.md) | Событие после удаления приложения ||
|#
