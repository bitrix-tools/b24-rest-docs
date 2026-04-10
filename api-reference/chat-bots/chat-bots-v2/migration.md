---
title: Миграция с imbot на imbot.v2
---

# Миграция с imbot на imbot.v2

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Таблица соответствия методов и событий между устаревшим API (imbot) и новой бот-платформой (imbot.v2).

{% note info "" %}

Методы v1 и v2 работают параллельно. Боты, зарегистрированные через v1, видны в v2 и наоборот. Однако формат событий различается — бот получает события только в формате той версии API, через которую был зарегистрирован.

{% endnote %}

## Методы

#|
|| **v1** | **v2** | **Изменения** ||
|| [imbot.register](../outdated/bots/imbot-register.md) | [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md) | Параметры вложены в `fields.*`, добавлен `fields.eventMode` (fetch/webhook) ||
|| [imbot.update](../outdated/bots/imbot-update.md) | [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md) | Параметры вложены в `fields.*` ||
|| [imbot.unregister](../outdated/bots/imbot-unregister.md) | [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md) | Без изменений ||
|| [imbot.bot.list](../outdated/bots/imbot-bot-list.md) | [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md) | Возвращает массив объектов Bot вместо плоского списка ||
|| — | [imbot.v2.Bot.get](./imbot.v2/bots/bot-get.md) | Новый метод: получение одного бота по ID ||
|| [imbot.message.add](../outdated/messages/imbot-message-add.md) | [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md) | Текст и параметры в `fields.*` ||
|| [imbot.message.update](../outdated/messages/imbot-message-update.md) | [imbot.v2.Chat.Message.update](./imbot.v2/messages/chat-message-update.md) | Параметры в `fields.*` ||
|| [imbot.message.delete](../outdated/messages/imbot-message-delete.md) | [imbot.v2.Chat.Message.delete](./imbot.v2/messages/chat-message-delete.md) | Без изменений ||
|| — | [imbot.v2.Chat.Message.read](./imbot.v2/messages/chat-message-read.md) | Новый метод: отметить сообщения прочитанными ||
|| — | [imbot.v2.Chat.Message.Reaction.add](./imbot.v2/messages/chat-message-reaction-add.md) | Новый метод: добавить реакцию ||
|| — | [imbot.v2.Chat.Message.Reaction.delete](./imbot.v2/messages/chat-message-reaction-delete.md) | Новый метод: удалить реакцию ||
|| [imbot.message.like](../outdated/messages/imbot-message-like.md) | [imbot.v2.Chat.Message.Reaction.add](./imbot.v2/messages/chat-message-reaction-add.md), [imbot.v2.Chat.Message.Reaction.delete](./imbot.v2/messages/chat-message-reaction-delete.md) | В v2 установка и снятие реакции разделены на два метода ||
|| [imbot.chat.add](../outdated/chats/imbot-chat-add.md) | [imbot.v2.Chat.add](./imbot.v2/chats/chat-add.md) | Параметры в `fields.*` ||
|| [imbot.chat.get](../outdated/chats/imbot-chat-get.md) | [imbot.v2.Chat.get](./imbot.v2/chats/chat-get.md) | Возвращает объект Chat ||
|| [imbot.dialog.get](../outdated/chats/imbot-dialog-get.md) | [imbot.v2.Chat.get](./imbot.v2/chats/chat-get.md) | Возвращает объект Chat ||
|| [imbot.chat.updateTitle](../outdated/chats/imbot-chat-update-title.md) | [imbot.v2.Chat.update](./imbot.v2/chats/chat-update.md) | В v2 изменение заголовка выполняется через универсальное обновление свойств чата ||
|| [imbot.chat.updateColor](../outdated/chats/imbot-chat-update-color.md) | [imbot.v2.Chat.update](./imbot.v2/chats/chat-update.md) | В v2 изменение цвета выполняется через универсальное обновление свойств чата ||
|| [imbot.chat.updateAvatar](../outdated/chats/imbot-chat-update-avatar.md) | [imbot.v2.Chat.update](./imbot.v2/chats/chat-update.md) | В v2 изменение аватара выполняется через универсальное обновление свойств чата ||
|| — | [imbot.v2.Chat.update](./imbot.v2/chats/chat-update.md) | Новый универсальный метод: обновление свойств чата ||
|| [imbot.chat.user.add](../outdated/chats/imbot-chat-user-add.md) | [imbot.v2.Chat.User.add](./imbot.v2/chats/chat-user-add.md) | — ||
|| [imbot.chat.user.delete](../outdated/chats/imbot-chat-user-delete.md) | [imbot.v2.Chat.User.delete](./imbot.v2/chats/chat-user-delete.md) | — ||
|| [imbot.chat.user.list](../outdated/chats/imbot-chat-user-list.md) | [imbot.v2.Chat.User.list](./imbot.v2/chats/chat-user-list.md) | — ||
|| [imbot.chat.leave](../outdated/chats/imbot-chat-leave.md) | [imbot.v2.Chat.leave](./imbot.v2/chats/chat-leave.md) | — ||
|| [imbot.chat.setManager](../outdated/chats/imbot-chat-set-manager.md) | [imbot.v2.Chat.Manager.add](./imbot.v2/chats/chat-manager-add.md), [imbot.v2.Chat.Manager.delete](./imbot.v2/chats/chat-manager-delete.md) | В v2 назначение и снятие прав администратора разделены на два метода ||
|| [imbot.chat.setOwner](../outdated/chats/imbot-chat-set-owner.md) | [imbot.v2.Chat.setOwner](./imbot.v2/chats/chat-set-owner.md) | — ||
|| [imbot.chat.sendTyping](../outdated/chats/imbot-chat-send-typing.md) | [imbot.v2.Chat.InputAction.notify](./imbot.v2/ui/chat-input-action-notify.md) | — ||
|| — | [imbot.v2.Chat.TextField.enabled](./imbot.v2/ui/chat-text-field-enabled.md) | Новый метод: управление полем ввода ||
|| [imbot.command.register](../outdated/commands/imbot-command-register.md) | [imbot.v2.Command.register](./imbot.v2/commands/command-register.md) | Параметры в `fields.*` ||
|| [imbot.command.update](../outdated/commands/imbot-command-update.md) | [imbot.v2.Command.update](./imbot.v2/commands/command-update.md) | Параметры в `fields.*` ||
|| — | [imbot.v2.Command.list](./imbot.v2/commands/command-list.md) | Новый метод: список команд бота ||
|| [imbot.command.unregister](../outdated/commands/imbot-command-unregister.md) | [imbot.v2.Command.unregister](./imbot.v2/commands/command-unregister.md) | — ||
|| [imbot.command.answer](../outdated/commands/imbot-command-answer.md) | [imbot.v2.Command.answer](./imbot.v2/commands/command-answer.md) | — ||
|| — | [imbot.v2.Event.get](./imbot.v2/events/event-get.md) | Новый метод: polling событий (fetch-режим) ||
|| — | [imbot.v2.File.upload](./imbot.v2/files/file-upload.md) | Новый метод: загрузка файла в чат ||
|| — | [imbot.v2.File.download](./imbot.v2/files/file-download.md) | Новый метод: получение ссылки на скачивание ||
|| — | [imbot.v2.Revision.get](./imbot.v2/revision-get.md) | Новый метод: получение номеров ревизий API ||
|#

## События

#|
|| **v1** | **v2** | **Изменения** ||
|| [ONIMBOTMESSAGEADD](../outdated/messages/events/on-imbot-message-add.md) | [ONIMBOTV2MESSAGEADD](./imbot.v2/events/events.md#onimbotv2messageadd) | Данные в формате V2 (camelCase, объекты Bot/Chat/Message/User) ||
|| [ONIMBOTMESSAGEUPDATE](../outdated/messages/events/on-imbot-message-update.md) | [ONIMBOTV2MESSAGEUPDATE](./imbot.v2/events/events.md#onimbotv2messageupdate) | Данные в формате V2: camelCase и вложенные объекты ||
|| [ONIMBOTMESSAGEDELETE](../outdated/messages/events/on-imbot-message-delete.md) | [ONIMBOTV2MESSAGEDELETE](./imbot.v2/events/events.md#onimbotv2messagedelete) | Данные в формате V2: camelCase и вложенные объекты ||
|| [ONIMBOTJOINCHAT](../outdated/chats/events/on-imbot-join-chat.md) | [ONIMBOTV2JOINCHAT](./imbot.v2/events/events.md#onimbotv2joinchat) | Данные в формате V2: camelCase и вложенные объекты ||
|| [ONIMBOTDELETE](../outdated/events/on-imbot-delete.md) | [ONIMBOTV2DELETE](./imbot.v2/events/events.md#onimbotv2delete) | Данные в формате V2: camelCase и объект `bot` нового формата ||
|| [ONIMCOMMANDADD](../outdated/commands/events/on-im-command-add.md) | [ONIMBOTV2COMMANDADD](./imbot.v2/events/events.md#onimbotv2commandadd) | Данные в формате V2: camelCase и вложенные объекты; поле `context` в нижнем регистре: `textarea`, `keyboard`, `menu` ||
|| ONIMBOTCONTEXTGET | [ONIMBOTV2CONTEXTGET](./imbot.v2/events/events.md#onimbotv2contextget) | Данные в формате V2: camelCase и вложенные объекты ||
|| — | [ONIMBOTV2REACTIONCHANGE](./imbot.v2/events/events.md#onimbotv2reactionchange) | Новое событие: изменение реакции на сообщение бота ||
|#

## Ключевые отличия v2

### Формат данных

- camelCase вместо UPPER_CASE для ключей — например, `chatId` вместо `CHAT_ID`
- Вложенные объекты вместо плоских полей — Bot, Chat, Message, User
- Boolean-поля — настоящие `true`/`false` вместо строк `"Y"`/`"N"`

### Доставка событий

- v1: только webhook (EVENT_HANDLER URL)
- v2: fetch-режим (polling через [imbot.v2.Event.get](./imbot.v2/events/event-get.md)) + webhook-режим на выбор при регистрации бота

### Параметры методов

- v1: плоские параметры верхнего уровня (`MESSAGE_ADD`, `BOT_ID`, `TYPE` и т.д.)
- v2: группировка в `fields.*` / `properties.*`, camelCase имена

### Авторизация

- v1: OAuth или webhook-авторизация с полем `CLIENT_ID`
- v2: OAuth или webhook-авторизация с `botToken`

## Изменения внутри v2

API `imbot.v2` продолжает развиваться. Новые возможности, исправления и изменения с потерей обратной совместимости публикуются в [Журнале изменений API imbot.v2](./change-log.md).

Если формат вызова или ответа метода меняется, предыдущий вариант продолжает поддерживаться **6 месяцев** с момента публикации изменения.

## Продолжите изучение

- [{#T}](./imbot.v2/bots/bot-register.md)
- [{#T}](./imbot.v2/events/event-get.md)
- [Журнал изменений API imbot.v2](./change-log.md)
- [{#T}](../index.md)
