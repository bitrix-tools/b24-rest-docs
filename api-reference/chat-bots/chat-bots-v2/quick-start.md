# Чат-боты 2.0: быстрый старт

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота

Краткий сценарий запуска чат-бота на `imbot.v2`: создание вебхука, регистрация бота, получение событий, отправка сообщений и работа с файлами.

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

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imbot.v2/bots/bot-register.md)
- [{#T}](./imbot.v2/events/event-get.md)
- [{#T}](./imbot.v2/events/events.md)
- [{#T}](./imbot.v2/messages/chat-message-send.md)
- [{#T}](./entities.md)
- [{#T}](./migration.md)
