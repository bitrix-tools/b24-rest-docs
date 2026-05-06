# Сообщения: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Раздел описывает методы для отправки, изменения, удаления сообщений, чтения истории и работы с реакциями от имени чат-бота.

> Быстрый переход: [все методы](#all-methods)

## Дополнительные возможности сообщений

При отправке сообщений через [imbot.v2.Chat.Message.send](./chat-message-send.md) доступны:

- [Форматирование текста (BB-коды)](./message-formatting.md)
- [Вложения (Attach)](./attachments/index.md)
- [Клавиатуры (Keyboard)](./message-keyboards.md)

## Обзор методов {#all-methods}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.Message.send](./chat-message-send.md) | Отправляет сообщение в чат ||
|| [imbot.v2.Chat.Message.update](./chat-message-update.md) | Обновляет сообщение бота ||
|| [imbot.v2.Chat.Message.delete](./chat-message-delete.md) | Удаляет сообщение ||
|| [imbot.v2.Chat.Message.read](./chat-message-read.md) | Отмечает сообщения как прочитанные ||
|| [imbot.v2.Chat.Message.get](./chat-message-get.md) | Возвращает сообщение по ID. Только для `supervisor` и `personal` ||
|| [imbot.v2.Chat.Message.getContext](./chat-message-get-context.md) | Возвращает окно сообщений вокруг указанного. Только для `supervisor` и `personal` ||
|| [imbot.v2.Chat.Message.Reaction.add](./chat-message-reaction-add.md) | Добавляет реакцию на сообщение ||
|| [imbot.v2.Chat.Message.Reaction.delete](./chat-message-reaction-delete.md) | Удаляет реакцию с сообщения ||
|#

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](../../index.md)
- [Файлы imbot.v2](../files/index.md)
- [{#T}](./message-formatting.md)
- [{#T}](./attachments/index.md)
- [{#T}](./message-keyboards.md)
