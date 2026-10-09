# Миграция с imbot на imbot.v2

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Эта страница помогает перенести интеграцию с устаревшего API `imbot` на `imbot.v2`: выбрать способ доставки событий, сопоставить методы и поля запросов, обновить обработку ответов.

{% note info "" %}

Методы v1 и v2 работают параллельно. Боты, зарегистрированные через v1, видны в v2 и наоборот. Однако формат событий различается — бот получает события только в формате той версии API, через которую был зарегистрирован.

{% endnote %}

## Порядок перехода {#migration-steps}

1. Найдите используемые методы и события v1 в таблицах ниже. Сверьте параметры каждого вызова со страницей соответствующего метода v2: названия полей, обязательность и допустимые значения могут отличаться.
2. Проверьте, через какую версию API зарегистрирован бот. Замена вызовов v1 на v2 сама по себе не меняет формат событий существующего бота. Если нужны события `ONIMBOTV2*`, учитывайте версию регистрации при планировании перехода и настройте обработку [нового формата событий](./imbot.v2/events/events.md).
3. Выберите режим доставки событий для бота v2 по [таблице ниже](#event-mode-choice).
4. Перенесите параметры запросов по таблице методов и проверьте [авторизацию](#migration-auth).
5. Сверьте ответы и обработчики событий с форматами v2. Проверьте новый вызов и получение события до переключения рабочего сценария. Для примера сравнения запросов и ответов смотрите [отправку сообщения](#message-example).

## Как выбрать режим событий {#event-mode-choice}

#|
|| **Режим v2** | **Когда подходит** | **Что настроить** ||
|| `fetch` | У приложения нет публичного URL для событий или нужен контроль очереди через `offset` | Укажите `fields.eventMode: fetch` при регистрации бота и опрашивайте [imbot.v2.Event.get](./imbot.v2/events/event-get.md). Это режим по умолчанию ||
|| `webhook` | У приложения есть публичный HTTP-обработчик событий | Укажите `fields.eventMode: webhook` и обязательный `fields.webhookUrl`. Обработчик должен отвечать HTTP 200; повторная доставка при сбое не гарантируется ||
|#

Подробности реализации обоих режимов — в разделе [Режимы доставки событий](./index.md#event-modes).

## Авторизация при переходе {#migration-auth}

Методы обеих версий используют scope [`imbot`](../../scopes/permissions.md). При OAuth вызовы v2 не требуют `botToken`. При авторизации через вебхук передавайте токен бота `botToken`, указанный при его регистрации: `CLIENT_ID` из v1 не является тем же токеном. Храните `botToken` вне публичного кода и логов.

## Методы

#|
|| **v1** | **v2** | **Изменения** ||
|| [imbot.register](../outdated/bots/imbot-register.md) | [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md) | `CODE` → `fields.code`, `PROPERTIES.NAME` → `fields.properties.name`, `PROPERTIES.WORK_POSITION` → `fields.properties.workPosition`. Вместо `EVENT_HANDLER` задайте `fields.eventMode: webhook` и `fields.webhookUrl`; для опроса событий — `fields.eventMode: fetch` ||
|| [imbot.update](../outdated/bots/imbot-update.md) | [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md) | `BOT_ID` → `botId`, `FIELDS.PROPERTIES.NAME` → `fields.properties.name`, `FIELDS.PROPERTIES.WORK_POSITION` → `fields.properties.workPosition`, `FIELDS.EVENT_HANDLER` → `fields.webhookUrl` при `fields.eventMode: webhook`. Смена `webhookUrl` или `eventMode` автоматически пересобирает подписки `ONIMBOTV2*` — ручной `event.unbind` не нужен ||
|| [imbot.unregister](../outdated/bots/imbot-unregister.md) | [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md) | Подписки `ONIMBOTV2*` чистятся автоматически — workaround с ручным `event.unbind` после unregister не нужен ||
|| [imbot.bot.list](../outdated/bots/imbot-bot-list.md) | [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md) | Возвращает массив объектов Bot вместо плоского списка ||
|| — | [imbot.v2.Bot.get](./imbot.v2/bots/bot-get.md) | Новый метод: получение одного бота по ID ||
|| [imbot.message.add](../outdated/messages/imbot-message-add.md) | [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md) | `BOT_ID` → `botId`, `DIALOG_ID` → `dialogId`, `MESSAGE` → `fields.message`, `ATTACH` → `fields.attach`, `KEYBOARD` → `fields.keyboard`, `SYSTEM` → `fields.system`, `URL_PREVIEW` → `fields.urlPreview`. В v2 `botId` обязателен ||
|| [imbot.message.update](../outdated/messages/imbot-message-update.md) | [imbot.v2.Chat.Message.update](./imbot.v2/messages/chat-message-update.md) | `BOT_ID` → `botId`, `MESSAGE_ID` → `messageId`, `MESSAGE` → `fields.message`, `ATTACH` → `fields.attach`, `KEYBOARD` → `fields.keyboard`, `URL_PREVIEW` → `fields.urlPreview` ||
|| [imbot.message.delete](../outdated/messages/imbot-message-delete.md) | [imbot.v2.Chat.Message.delete](./imbot.v2/messages/chat-message-delete.md) | Без изменений ||
|| — | [imbot.v2.Chat.Message.read](./imbot.v2/messages/chat-message-read.md) | Новый метод: отметить сообщения прочитанными ||
|| — | [imbot.v2.Chat.Message.Reaction.add](./imbot.v2/messages/chat-message-reaction-add.md) | Новый метод: добавить реакцию ||
|| — | [imbot.v2.Chat.Message.Reaction.delete](./imbot.v2/messages/chat-message-reaction-delete.md) | Новый метод: удалить реакцию ||
|| [imbot.message.like](../outdated/messages/imbot-message-like.md) | [imbot.v2.Chat.Message.Reaction.add](./imbot.v2/messages/chat-message-reaction-add.md), [imbot.v2.Chat.Message.Reaction.delete](./imbot.v2/messages/chat-message-reaction-delete.md) | В v2 установка и снятие реакции разделены на два метода ||
|| [imbot.chat.add](../outdated/chats/imbot-chat-add.md) | [imbot.v2.Chat.add](./imbot.v2/chats/chat-add.md) | `BOT_ID` → `botId`, `TYPE` → `fields.type`, `TITLE` → `fields.title`, `DESCRIPTION` → `fields.description`, `COLOR` → `fields.color`, `AVATAR` → `fields.avatar`, `USERS` → `fields.userIds`. В v2 `botId` обязателен, значения `TYPE` и `COLOR` изменились ||
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
|| [imbot.command.register](../outdated/commands/imbot-command-register.md) | [imbot.v2.Command.register](./imbot.v2/commands/command-register.md) | `BOT_ID` → `botId`, `COMMAND` → `fields.command`, `LANG[].TITLE` → `fields.title.{код языка}`, `LANG[].PARAMS` → `fields.params.{код языка}`, `COMMON` → `fields.common`, `HIDDEN` → `fields.hidden`, `EXTRANET_SUPPORT` → `fields.extranetSupport` ||
|| [imbot.command.update](../outdated/commands/imbot-command-update.md) | [imbot.v2.Command.update](./imbot.v2/commands/command-update.md) | `COMMAND_ID` → `commandId`, `FIELDS.COMMAND` → `fields.command`, `FIELDS.LANG[].TITLE` → `fields.title.{код языка}`, `FIELDS.LANG[].PARAMS` → `fields.params.{код языка}`, `FIELDS.HIDDEN` → `fields.hidden`, `FIELDS.EXTRANET_SUPPORT` → `fields.extranetSupport`. В v2 дополнительно обязателен `botId` ||
|| — | [imbot.v2.Command.list](./imbot.v2/commands/command-list.md) | Новый метод: список команд бота ||
|| [imbot.command.unregister](../outdated/commands/imbot-command-unregister.md) | [imbot.v2.Command.unregister](./imbot.v2/commands/command-unregister.md) | — ||
|| [imbot.command.answer](../outdated/commands/imbot-command-answer.md) | [imbot.v2.Command.answer](./imbot.v2/commands/command-answer.md) | — ||
|| — | [imbot.v2.Event.get](./imbot.v2/events/event-get.md) | Новый метод: polling событий (fetch-режим) ||
|| — | [imbot.v2.File.upload](./imbot.v2/files/file-upload.md) | Новый метод: загрузка файла в чат ||
|| — | [imbot.v2.File.download](./imbot.v2/files/file-download.md) | Новый метод: получение ссылки на скачивание ||
|| — | [imbot.v2.Revision.get](./imbot.v2/revision-get.md) | Новый метод: получение номеров ревизий API ||
|#

В таблице показаны поля с соответствием в указанных методах v2. Для полей типа `boolean` преобразуйте значения `Y`/`N` в `true`/`false`. При создании чата значение `TYPE=CHAT` соответствует `fields.type=chat`, а `TYPE=OPEN` — `fields.type=open`. У отдельных параметров v1 нет прямого поля в соответствующем методе v2, например у `EVENT_COMMAND_ADD` в `Command.register` и `MENU` в `Chat.Message.send`.

## Пример: отправка сообщения в v1 и v2 {#message-example}

Ниже — запросы через OAuth и ответы из страниц методов [imbot.message.add](../outdated/messages/imbot-message-add.md) и [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md). Это два независимых примера: значения ID и текста в них различаются.

**v1.** Текст сообщения передается на верхнем уровне в `MESSAGE`:

```json
{
    "BOT_ID": 39,
    "DIALOG_ID": "chat123",
    "MESSAGE": "Текст сообщения",
    "auth": "**put_access_token_here**"
}
```

Ответ v1 возвращает ID сообщения числом в `result`:

```json
{
    "result": 19880117,
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00",
        "operating_reset_at": 1762349466,
        "operating": 0
    }
}
```

**v2.** Текст сообщения передается во вложенном поле `fields.message`:

```json
{
    "botId": 456,
    "dialogId": "chat5",
    "fields": {
        "message": "Hello from bot!"
    },
    "auth": "**put_access_token_here**"
}
```

Ответ v2 возвращает ID сообщения в `result.id`:

```json
{
    "result": {
        "id": 789,
        "uuidMap": {}
    },
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

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
- Часть флагов передается как `true`/`false` вместо строк `"Y"`/`"N"`, например `fields.common` у команды. Проверяйте тип на странице метода: `fields.urlPreview` в [Chat.Message.update](./imbot.v2/messages/chat-message-update.md) принимает `Y`/`N`

### Доставка событий

В v1 события доставляются через webhook. В v2 доступны `fetch` и `webhook`; [условия выбора режима](#event-mode-choice) приведены выше.

### Параметры методов

Параметры v1 передаются на верхнем уровне (`MESSAGE`, `BOT_ID`, `TYPE` и другие), а в v2 используются camelCase-имена и вложенные поля `fields.*`, включая `fields.properties.*` для свойств бота. Конкретные соответствия приведены в таблице методов.

### Авторизация

В v1 доступны OAuth и авторизация через вебхук с полем `CLIENT_ID`; в v2 — OAuth или вебхук с `botToken`. Условия работы с токеном описаны в разделе [Авторизация при переходе](#migration-auth).

## Изменения внутри v2

API `imbot.v2` продолжает развиваться. Новые возможности, исправления и изменения с потерей обратной совместимости публикуются в [Журнале изменений API imbot.v2](./change-log.md).

Если формат вызова или ответа метода меняется, предыдущий вариант продолжает поддерживаться **6 месяцев** с момента публикации изменения.

## Продолжите изучение

- [{#T}](./imbot.v2/bots/bot-register.md)
- [{#T}](./imbot.v2/events/event-get.md)
- [Журнал изменений API imbot.v2](./change-log.md)
- [{#T}](../index.md)
