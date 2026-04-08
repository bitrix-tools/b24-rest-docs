# Чат-боты 2.0: быстрый старт

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота

Краткий сценарий запуска чат-бота на `imbot.v2`: создание вебхука, регистрация бота, получение событий, отправка сообщений и работа с файлами.

{% note info "" %}

Перед началом проверьте [Журнал изменений API imbot.v2](./change-log.md). В нем собраны новые возможности, исправления и breaking changes, а записи расположены от новых к старым.

{% endnote %}

## Создание входящего вебхука {#webhook-create}

Для быстрого старта создайте входящий вебхук в интерфейсе Битрикс24:

1. Перейдите в `Разработчикам -> Другое -> Входящий вебхук`.
2. В правах выберите scope `imbot`.
3. Сохраните и скопируйте URL вебхука.

Формат URL:

```text
https://{portal}/rest/{user_id}/{webhook_token}/
```

## Типичный сценарий {#scenario}

### 1. Зарегистрировать бота {#register-bot}

Используйте метод [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md), чтобы создать бота и задать его основные свойства.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Bot.register' \
  -H 'Content-Type: application/json' \
  -d '{
    "botToken": "my_secret_token_123",
    "fields": {
      "code": "support_bot",
      "properties": {"name": "Support Bot", "workPosition": "AI Assistant"},
      "eventMode": "fetch"
    }
  }'
```

### 2. Получить события (fetch-режим) {#get-events}

Используйте [imbot.v2.Event.get](./imbot.v2/events/event-get.md), чтобы забрать очередь событий для зарегистрированного бота.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Event.get' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 456,
    "botToken": "my_secret_token_123",
    "limit": 50
  }'
```

### 3. Ответить в чат {#send-message}

Используйте [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md), чтобы отправить ответ в диалог.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Chat.Message.send' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 456,
    "botToken": "my_secret_token_123",
    "dialogId": "chat5",
    "fields": {"message": "Hello! How can I help you?"}
  }'
```

### 4. Прочитать сообщение по `replyId` (только `supervisor`/`personal`)

Если пользователь ответил на сообщение бота, получите исходное сообщение через [imbot.v2.Chat.Message.get](./imbot.v2/messages/chat-message-get.md).

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Chat.Message.get' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 456,
    "botToken": "my_secret_token_123",
    "messageId": 789
  }'
```

### 5. Загрузить файл в чат {#files}

Используйте [imbot.v2.File.upload](./imbot.v2/files/file-upload.md), чтобы отправить файл в чат от имени бота.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.File.upload' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 456,
    "botToken": "my_secret_token_123",
    "dialogId": "chat5",
    "fields": {"name": "report.txt", "content": "SGVsbG8gV29ybGQh", "message": "Here is the report"}
  }'
```

### 6. Получить ссылку на скачивание файла

Используйте [imbot.v2.File.download](./imbot.v2/files/file-download.md), чтобы получить URL для скачивания файла.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.File.download' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 456,
    "botToken": "my_secret_token_123",
    "dialogId": "chat5",
    "fileId": 138
  }'
```

## Дополнительные возможности сообщений

При отправке сообщений через [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md) доступны:

- [Форматирование текста (BB-коды)](./imbot.v2/messages/message-formatting.md): жирный, курсив, ссылки, цитаты, код и другие BB-коды
- [Вложения (Attach)](./imbot.v2/messages/attachments/index.md): структурированные блоки с изображениями, таблицами, сетками и другими элементами
- [Клавиатуры (Keyboard)](./imbot.v2/messages/message-keyboards.md): интерактивные кнопки под сообщением

## Ревизии API и совместимость

Битрикс24 облако и коробочные версии могут иметь разные ревизии API. Чтобы узнать, какая ревизия установлена на конкретном портале, используйте [imbot.v2.Revision.get](./imbot.v2/revision-get.md).

Новые возможности, исправления и изменения с потерей обратной совместимости собраны на странице [Журнал изменений API imbot.v2](./change-log.md). Если интеграция уже работает в проде, эту страницу стоит проверять в первую очередь.

## Порядок изучения

1. [Журнал изменений API imbot.v2](./change-log.md)
2. [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md)
3. [imbot.v2.Event.get](./imbot.v2/events/event-get.md)
4. [События imbot.v2](./imbot.v2/events/events.md)
5. [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md)
6. [imbot.v2.Chat.Message.get](./imbot.v2/messages/chat-message-get.md) и [imbot.v2.Chat.Message.getContext](./imbot.v2/messages/chat-message-get-context.md)
7. [imbot.v2.Command.register](./imbot.v2/commands/command-register.md)
8. [imbot.v2.File.upload](./imbot.v2/files/file-upload.md) и [imbot.v2.File.download](./imbot.v2/files/file-download.md)
9. [imbot.v2.Chat.add](./imbot.v2/chats/chat-add.md)

## Продолжите изучение

- [Журнал изменений API imbot.v2](./change-log.md)
- [{#T}](./index.md)
- [{#T}](./imbot.v2/bots/bot-register.md)
- [{#T}](./imbot.v2/events/event-get.md)
- [{#T}](./imbot.v2/events/events.md)
- [{#T}](./imbot.v2/messages/chat-message-send.md)
- [{#T}](./entities.md)
- [{#T}](./migration.md)
