# Сообщения: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы группы позволяют отправлять, изменять и удалять сообщения, читать историю чата и работать с реакциями от имени чат-бота.

> Быстрый переход: [все методы](#all-methods)

## Порядок работы с сообщениями {#how-to-start}

1. Бот получает входящее сообщение событием [ONIMBOTV2MESSAGEADD](../events/events.md#onimbotv2messageadd). В нем приходят `chat.dialogId` и `message.id`.
2. Отправьте ответ методом [imbot.v2.Chat.Message.send](./chat-message-send.md), передав `dialogId` из события. Чтобы ответ выглядел как реплай, укажите `fields.replyId`.
3. При необходимости измените отправленное сообщение через [imbot.v2.Chat.Message.update](./chat-message-update.md) или удалите его через [imbot.v2.Chat.Message.delete](./chat-message-delete.md).
4. Отметьте обработанные сообщения прочитанными методом [imbot.v2.Chat.Message.read](./chat-message-read.md) — он же вернет оставшийся счетчик непрочитанных.

Ботам типов `supervisor` и `personal` дополнительно доступно чтение чужих сообщений: [imbot.v2.Chat.Message.get](./chat-message-get.md) читает одно сообщение по ID, [imbot.v2.Chat.Message.getContext](./chat-message-get-context.md) — окно сообщений вокруг него.

Описание полей объекта Message — [Объекты и поля](../../entities.md#message).

## Дополнительные возможности сообщений {#extras}

При отправке сообщений через [imbot.v2.Chat.Message.send](./chat-message-send.md) доступны:

- [Форматирование текста (BB-коды)](./message-formatting.md) — жирный, курсив, ссылки, цитаты и код в тексте сообщения
- [Вложения (Attach)](./attachments/index.md) — структурированные блоки: текст, ссылки, изображения, файлы, таблицы
- [Клавиатуры (Keyboard)](./message-keyboards.md) — интерактивные кнопки под сообщением

## Ограничения {#limits}

#|
|| **Ограничение** | **Значение** ||
|| Длина текста сообщения | 20 000 символов. При превышении текст обрезается ||
|| Сообщений за одну пересылку `fields.forwardIds` | 100. Пересылать можно только сообщения из чатов, где бот состоит в участниках ||
|| Изменение и удаление | Бот работает только со своими сообщениями. Удалить чужое сообщение может только бот-администратор чата ||
|| Системные сообщения `fields.system: true` | Имеют `authorId = 0` и не принадлежат боту: обновить их нельзя, удалить — только от имени администратора чата ||
|| Чтение чужих сообщений | Методы `Chat.Message.get` и `Chat.Message.getContext` доступны только ботам типов `supervisor` и `personal` ||
|#

## Связь с другими объектами {#relations}

**Бот.** Сообщения отправляются от имени зарегистрированного бота: в каждом вызове передается `botId`, а при авторизации через вебхук — еще и `botToken` — [Боты](../bots/index.md).

**Чаты.** Адресат сообщения задается параметром `dialogId`: для групповых чатов это `chat{chatId}`, для личных — ID собеседника. Подробнее — [Формат dialogId](../../index.md#dialog-id) и [Чаты](../chats/index.md).

**События.** Входящий поток сообщений, их правки, удаления и реакции приходят боту событиями `ONIMBOTV2MESSAGE*` и `ONIMBOTV2REACTIONCHANGE` — [События](../events/index.md).

**Команды.** Ответ на слэш-команду отправляется отдельным методом [imbot.v2.Command.answer](../commands/command-answer.md), а не `Chat.Message.send`. Только `Command.answer` может ответить в чат, где бот не состоит в участниках — [Команды](../commands/index.md).

**Файлы.** Метод [imbot.v2.File.upload](../files/file-upload.md) сам создает сообщение с файлом, поэтому отдельная отправка сообщения не нужна — [Файлы](../files/index.md).

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
- [{#T}](../../entities.md)
- [{#T}](../../migration.md)
- [Файлы imbot.v2](../files/index.md)
- [События imbot.v2](../events/index.md)
- [{#T}](./message-formatting.md)
- [{#T}](./attachments/index.md)
- [{#T}](./message-keyboards.md)
