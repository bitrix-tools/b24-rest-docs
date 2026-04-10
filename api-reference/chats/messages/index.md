# Сообщения: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Раздел объединяет методы для отправки и изменения сообщений, работы с историей диалога, контекстным меню и служебными действиями в чатах.

> Быстрый переход: [все методы](#all-methods)

## Возможности сообщений

- [Форматирование](./formatting.md) — BB-коды в тексте сообщений
- [Вложения](./attachments.md) — структурированный контент `ATTACH`
- [Клавиатуры](./keyboards.md) — интерактивные кнопки `KEYBOARD`
- [Контекстное меню](./menu.md) — команды и действия в меню сообщения

## Обзор методов {#all-methods}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь, имеющий доступ к чату

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

## Продолжите изучение

- [{#T}](./formatting.md)
- [{#T}](./attachments.md)
- [{#T}](./keyboards.md)
- [{#T}](./menu.md)

