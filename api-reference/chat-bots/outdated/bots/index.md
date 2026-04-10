# Чат-боты: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие методов `imbot.*` остановлено.
Используйте раздел [Чат-боты (`imbot.v2.Bot.*`)](../../chat-bots-v2/imbot.v2/bots/index.md).

{% endnote %}

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

## Методы

#|
|| **Метод** | **Описание** ||
|| [imbot.register](./imbot-register.md) | Регистрирует нового чат-бота ||
|| [imbot.update](./imbot-update.md) | Обновляет данные чат-бота и его обработчики событий ||
|| [imbot.bot.list](./imbot-bot-list.md) | Возвращает список зарегистрированных чат-ботов ||
|| [imbot.unregister](./imbot-unregister.md) | Удаляет чат-бота ||
|#
