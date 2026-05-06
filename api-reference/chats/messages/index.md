# Сообщения: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Методы сообщений позволяют отправлять и изменять сообщения, работать с историей диалога, контекстным меню и служебными действиями в чатах.

> Быстрый переход: [все методы](#all-methods)

## Возможности сообщений

- [Форматирование](./formatting.md) — какие BB-коды поддерживаются в `MESSAGE` и как с их помощью выделять текст, добавлять ссылки и командные вставки
- [Вложения](./attachments.md) — как формировать структурированный контент `ATTACH`: блоки с текстом, ссылками, файлами и медиаэлементами
- [Клавиатуры](./keyboards.md) — как добавлять `KEYBOARD` с интерактивными кнопками и обрабатывать действия пользователя в сообщении
- [Контекстное меню](./menu.md) — как настроить `MENU` с дополнительными действиями и командами для конкретного сообщения

## Как начать работу

1. Отправьте сообщение методом [im.message.add](./im-message-add.md)
2. При необходимости измените или удалите сообщение методами [im.message.update](./im-message-update.md) и [im.message.delete](./im-message-delete.md)
3. Получите сообщения диалога методом [im.dialog.messages.get](./im-dialog-messages-get.md)
4. Найдите нужное сообщение методом [im.dialog.messages.search](./im-dialog-messages-search.md)
5. Управляйте признаком «прочитано» методами [im.dialog.read](./im-dialog-read.md), [im.dialog.unread](./im-dialog-unread.md) и индикатором «Пользователь пишет» через [im.dialog.writing](./im-dialog-writing.md)

## Связь с другими объектами

**Пользователь.** Для отправки сообщения в личный диалог укажите идентификатор пользователя в `DIALOG_ID` в формате `XXX`. Получить идентификатор пользователя можно методами [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**Чат.** Для работы с групповыми чатами используйте `DIALOG_ID` в формате `chatXXX` или `sgXXX`. В методах поиска сообщений используется `CHAT_ID`. Получить идентификатор чата можно методом [im.chat.get](../im-chat-get.md).

**Чат-бот.** Для выполнения команд чат-бота в контексте сообщения используйте метод [im.message.command](./im-message-command.md) и передавайте `BOT_ID`, `COMMAND`. Идентификатор бота можно получить методом [imbot.bot.list](../../chat-bots/outdated/bots/imbot-bot-list.md).

## Обзор методов {#all-methods}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [im.message.add](./im-message-add.md) | Добавляет сообщение в чат ||
|| [im.message.update](./im-message-update.md) | Изменяет отправленное сообщение ||
|| [im.message.delete](./im-message-delete.md) | Удаляет сообщение ||
|| [im.message.like](./im-message-like.md) | Изменяет статус «Мне нравится» у сообщения ||
|| [im.message.share](./im-message-share.md) | Создает объект на основании сообщения ||
|| [im.message.command](./im-message-command.md) | Выполняет команду чат-бота ||
|| [im.dialog.messages.get](./im-dialog-messages-get.md) | Получает список последних сообщений ||
|| [im.dialog.messages.search](./im-dialog-messages-search.md) | Ищет сообщение в чате ||
|| [im.dialog.read](./im-dialog-read.md) | Устанавливает признак «прочитано» у сообщений ||
|| [im.dialog.unread](./im-dialog-unread.md) | Устанавливает признак «не прочитано» у сообщений ||
|| [im.dialog.writing](./im-dialog-writing.md) | Отправляет признак «Пользователь пишет» ||
|#
