# Чат-боты 2.0: быстрый старт

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять методы: бота регистрирует авторизованный пользователь, остальные методы сценария выполняет владелец зарегистрированного бота

Краткий сценарий запуска чат-бота на `imbot.v2`: создание вебхука, регистрация бота, создание чата, получение событий, отправка сообщений и работа с файлами. После каждого вызова показан ответ и указано, какое поле уходит в следующий шаг.

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

URL вебхука содержит `{webhook_token}` — это секрет: он открывает доступ к Битрикс24 в пределах выбранных прав. Храните его вне публичного кода, логов и примеров, как обычный ключ доступа.

## Что понадобится

Значения, которые проходят через весь сценарий:

- `botToken` — токен бота. Придумайте его сами при регистрации и передавайте во все последующие вызовы `imbot.v2` через вебхук. Это секрет, храните его как ключ доступа. Максимальная длина — 40 символов, подробности на странице [{#T}](./imbot.v2/bots/bot-register.md)
- `botId` — идентификатор бота. Приходит в ответе на регистрацию, придумывать его не нужно
- `dialogId` — идентификатор диалога. Для группового чата приходит готовым в ответе на создание чата, выглядит как `chat5235`. Для личной переписки это идентификатор пользователя

Числовые значения в примерах ниже получены на тестовом Битрикс24 — у вас будут свои.

## Типичный сценарий {#scenario}

Перед началом выберите маршрут — от него зависит тип бота в шаге 1:

- **обычный бот.** Регистрируйте с `"type": "bot"` и пропускайте шаг 5: чтение сообщений этому типу недоступно
- **бот-супервизор.** Регистрируйте с `"type": "supervisor"` и проходите все семь шагов

Типы ботов и их поведение описаны в статье [{#T}](./index.md).

Цепочка методов от регистрации до файла в чате:

1. [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md) — создать бота, получить `botId`
2. [imbot.v2.Chat.add](./imbot.v2/chats/chat-add.md) — создать чат, получить `dialogId`
3. [imbot.v2.Event.get](./imbot.v2/events/event-get.md) — забрать очередь событий
4. [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md) — ответить в диалог, получить `messageId`
5. [imbot.v2.Chat.Message.get](./imbot.v2/messages/chat-message-get.md) — прочитать сообщение по идентификатору, шаг необязательный
6. [imbot.v2.File.upload](./imbot.v2/files/file-upload.md) — отправить файл, получить `fileId`
7. [imbot.v2.File.download](./imbot.v2/files/file-download.md) — получить ссылку на скачивание

## 1. Зарегистрировать бота {#register-bot}

Используйте метод [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md), чтобы создать бота и задать его основные свойства. Токен передавайте внутри `fields` — так его ждет контракт метода.

Во всех примерах ниже замените `https://example.bitrix24.ru/rest/1/webhook_token/` на URL вебхука, скопированный на предыдущем шаге.

Параметр `eventMode` задает способ доставки событий. Значение `fetch` означает, что бот забирает события сам, — с ним работает шаг 3. Второй режим, `webhook`, требует публичного URL обработчика и в этом сценарии не используется.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Bot.register' \
  -H 'Content-Type: application/json' \
  -d '{
    "fields": {
      "code": "support_bot",
      "botToken": "my_secret_token_123",
      "type": "bot",
      "eventMode": "fetch",
      "properties": {"name": "Support Bot", "workPosition": "AI Assistant"}
    }
  }'
```

Успешный ответ, поля сокращены:

```json
{
  "result": {
    "bot": {
      "id": 1529,
      "code": "support_bot",
      "type": "bot",
      "eventMode": "fetch"
    },
    "users": [
      {"id": 1529, "name": "Support Bot", "bot": true}
    ]
  }
}
```

Сохраните `result.bot.id` — это `botId` для всех следующих вызовов. Полный состав ответа и таблицы полей смотрите на странице метода.

В примере выбран обычный бот. Для маршрута с супервизором укажите `"type": "supervisor"` — этот же тип вернется в ответе, и шаг 5 станет доступен.

## 2. Создать чат {#create-chat}

Чтобы боту было куда писать, создайте чат методом [imbot.v2.Chat.add](./imbot.v2/chats/chat-add.md). Если бот отвечает в уже существующем диалоге, шаг можно пропустить.

Участников перечисляйте в поле `userIds` — это идентификаторы сотрудников Битрикс24. Свой идентификатор можно получить методом [user.current](../../user/user-current.md), список сотрудников — методом [user.get](../../user/user-get.md).

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Chat.add' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 1529,
    "botToken": "my_secret_token_123",
    "fields": {"title": "Support chat", "userIds": [1295]}
  }'
```

Успешный ответ, поля сокращены:

```json
{
  "result": {
    "chat": {
      "id": 5235,
      "dialogId": "chat5235",
      "name": "Support chat",
      "type": "chat"
    }
  }
}
```

Сохраните `result.chat.dialogId` — собирать его вручную не нужно, он приходит готовым.

{% note warning "" %}

Участников передавайте только в поле `userIds`. Поле `users` метод принимает молча: вернется `200`, чат будет создан, но сотрудники в него не попадут — в чате останется один бот. Ошибки при этом не будет

{% endnote %}

## 3. Получить события в fetch-режиме {#get-events}

Используйте [imbot.v2.Event.get](./imbot.v2/events/event-get.md), чтобы забрать очередь событий для зарегистрированного бота. В fetch-режиме события накапливаются на стороне Битрикс24, а приложение забирает их само — обработчик и публичный URL для этого не нужны.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Event.get' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 1529,
    "botToken": "my_secret_token_123",
    "limit": 50
  }'
```

Пока никто боту не писал, очередь пуста:

```json
{
  "result": {
    "events": [],
    "nextOffset": 0,
    "hasMore": false
  }
}
```

Когда пользователь напишет боту, в очереди появится событие `ONIMBOTV2MESSAGEADD`. Ответ сокращен до полей, которые нужны для ответа:

```json
{
  "result": {
    "events": [
      {
        "eventId": 401,
        "type": "ONIMBOTV2MESSAGEADD",
        "date": "2026-09-10T22:08:37+03:00",
        "data": {
          "message": {
            "id": 41047,
            "chatId": 5245,
            "authorId": 1295,
            "text": "Здравствуйте! Нужна помощь с заказом"
          },
          "chat": {
            "id": 5245,
            "dialogId": "1295",
            "type": "private"
          },
          "user": {
            "id": 1295,
            "bot": false
          }
        }
      }
    ],
    "nextOffset": 402,
    "hasMore": false
  }
}
```

Что брать из события:

- `data.chat.dialogId` — адрес для ответа, его подставляют в следующий вызов
- `data.message.text` — текст, на который бот отвечает
- `data.message.id` — идентификатор сообщения пользователя, если нужно прочитать его отдельно
- `data.user.bot` — признак того, что автор сообщения сам бот. По нему события от ботов можно отсеять, если ваш бот должен отвечать только людям

Чтобы забрать очередь дальше, передайте `result.nextOffset` в следующий запрос параметром `offset`:

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Event.get' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 1529,
    "botToken": "my_secret_token_123",
    "offset": 402,
    "limit": 50
  }'
```

Значение `offset` подтверждает обработку всех событий с меньшими идентификаторами: без него те же события придут снова. При первом вызове параметр не передают. Повторяйте вызов, пока `hasMore` не станет `false`.

{% note info "" %}

В личной переписке бот получает каждое сообщение. В групповом чате события приходят не на все сообщения — состав событий и условия их отправки описаны в статье [{#T}](./imbot.v2/events/events.md)

{% endnote %}

## 4. Ответить в чат {#send-message}

Используйте [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md), чтобы отправить ответ в диалог.

В `dialogId` подставьте адрес диалога. Если бот отвечает на сообщение — это `data.chat.dialogId` из события шага 3. Если пишет первым — `result.chat.dialogId` из шага 2.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Chat.Message.send' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 1529,
    "botToken": "my_secret_token_123",
    "dialogId": "chat5235",
    "fields": {"message": "Hello! How can I help you?"}
  }'
```

Успешный ответ, поля сокращены:

```json
{
  "result": {
    "id": 41017
  }
}
```

Значение `result.id` — это `messageId` отправленного сообщения. Он понадобится, чтобы отредактировать сообщение, удалить его или прочитать на следующем шаге.

## 5. Прочитать сообщение по идентификатору {#read-message}

Шаг доступен только на маршруте с супервизором: метод [imbot.v2.Chat.Message.get](./imbot.v2/messages/chat-message-get.md) работает для типов `supervisor` и `personal`, а бот с `"type": "bot"` получит ошибку `BOT_TYPE_NOT_ALLOWED`. Пример ниже продолжает сценарий, в котором на шаге 1 указан `"type": "supervisor"`.

Метод читает сообщение по `messageId`. Это может быть идентификатор из шага 4 или идентификатор сообщения пользователя, полученный из события.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.Chat.Message.get' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 1529,
    "botToken": "my_secret_token_123",
    "messageId": 41017
  }'
```

Успешный ответ, поля сокращены:

```json
{
  "result": {
    "message": {
      "id": 41017,
      "chatId": 5235,
      "authorId": 1529,
      "text": "Hello! How can I help you?"
    },
    "user": {
      "id": 1529,
      "name": "Support Bot",
      "bot": true
    }
  }
}
```

В `result.message` приходит само сообщение, в `result.user` — его автор.

## 6. Загрузить файл в чат {#files}

Используйте [imbot.v2.File.upload](./imbot.v2/files/file-upload.md), чтобы отправить файл в чат от имени бота. Содержимое файла передается строкой Base64 в поле `content`.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.File.upload' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 1529,
    "botToken": "my_secret_token_123",
    "dialogId": "chat5235",
    "fields": {"name": "report.txt", "content": "SGVsbG8gV29ybGQh", "message": "Here is the report"}
  }'
```

Успешный ответ, поля сокращены:

```json
{
  "result": {
    "file": {
      "id": 10021,
      "name": "report.txt",
      "extension": "txt",
      "size": 12,
      "authorId": 1529
    },
    "messageId": 41019,
    "chatId": 5235,
    "dialogId": "chat5235"
  }
}
```

Сохраните `result.file.id` — это `fileId` для следующего шага. В `result.messageId` приходит идентификатор сообщения, которым файл отправлен в чат.

## 7. Получить ссылку на скачивание файла {#download}

Используйте [imbot.v2.File.download](./imbot.v2/files/file-download.md), чтобы получить URL для скачивания файла.

```bash
curl -X POST 'https://example.bitrix24.ru/rest/1/webhook_token/imbot.v2.File.download' \
  -H 'Content-Type: application/json' \
  -d '{
    "botId": 1529,
    "botToken": "my_secret_token_123",
    "fileId": 10021
  }'
```

Успешный ответ:

```json
{
  "result": {
    "downloadUrl": "https://example.bitrix24.ru/rest/1/webhook_token/download/?token=imbot%7C..."
  }
}
```

Ссылка из `result.downloadUrl` одноразовая: она содержит токен доступа к файлу, и повторное использование не гарантируется. Не публикуйте ее и не сохраняйте в общедоступных местах — если ссылка нужна снова, запросите ее заново.

## Проверим результат {#check}

Сценарий прошел успешно, если выполняются четыре условия:

- регистрация вернула `result.bot.id`, и с этим `botId` работают остальные вызовы
- бот есть в ответе метода [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md) под кодом из `fields.code`
- сообщение из шага 4 видно в чате от имени бота
- файл из шага 6 открывается по ссылке из `result.downloadUrl`

Когда бот больше не нужен, удалите его методом [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md) — иначе он останется зарегистрированным на этом Битрикс24.

## Ошибки и диагностика {#errors}

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код ошибки** | **Причина и что сделать** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | В запросе нет `botToken`. При авторизации через вебхук он обязателен для всех методов `imbot.v2`. В регистрации токен передается внутри `fields`, в остальных вызовах — на верхнем уровне ||
|| `BOT_OWNERSHIP_ERROR` | Бот принадлежит другому приложению. При работе через вебхук эта же ошибка приходит, если `botToken` не совпадает с заданным при регистрации, — сверьте токен ||
|| `BOT_NOT_FOUND` | Указан `botId` несуществующего бота. Возьмите значение из `result.bot.id` ответа на регистрацию ||
|| `BOT_CODE_ALREADY_TAKEN` | Бот с таким `code` уже зарегистрирован под другим `botToken`. Задайте другой код или удалите прежнего бота. С тем же токеном ошибки не будет: метод вернет уже существующего бота, а не создаст нового ||
|| `BOT_TYPE_NOT_ALLOWED` | Метод доступен только ботам типа `supervisor` и `personal`. Проверьте `type` в ответе на регистрацию ||
|| `FILE_NOT_FOUND` | Файла с таким `fileId` нет. Возьмите значение из `result.file.id` ответа на загрузку ||
|| `EMPTY_MESSAGE` | Поле `message` пустое. Передайте непустой текст ||
|#

Ошибки шагов 2–7 не затрагивают регистрацию бота: исправьте запрос и повторите тот же шаг. К шагу 1 возвращайтесь, только если бот не зарегистрирован или его код уже занят.

Отдельно проверьте случай, когда ошибки не было, а результат неверный: чат создан, но в нем нет сотрудников. Так проявляется поле `users` вместо `userIds` на шаге 2. Состав участников покажет метод [imbot.v2.Chat.User.list](./imbot.v2/chats/chat-user-list.md).

## Дополнительные возможности сообщений

При отправке сообщений через [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md) доступны:

- [Форматирование текста (BB-коды)](./imbot.v2/messages/message-formatting.md): жирный, курсив, ссылки, цитаты, код и другие BB-коды
- [Вложения (Attach)](./imbot.v2/messages/attachments/index.md): структурированные блоки с изображениями, таблицами, сетками и другими элементами
- [Клавиатуры (Keyboard)](./imbot.v2/messages/message-keyboards.md): интерактивные кнопки под сообщением

## Ревизии API и совместимость

Битрикс24 облако и коробочные версии могут иметь разные ревизии API. Чтобы узнать, какая ревизия установлена в конкретном Битрикс24, используйте [imbot.v2.Revision.get](./imbot.v2/revision-get.md).

Новые возможности, исправления и изменения с потерей обратной совместимости собраны на странице [Журнал изменений API imbot.v2](./change-log.md). Если интеграция уже работает в проде, эту страницу стоит проверять в первую очередь.

## Продолжите изучение

- [Журнал изменений API imbot.v2](./change-log.md)
- [{#T}](./index.md)
- [{#T}](./imbot.v2/events/events.md)
- [{#T}](./imbot.v2/messages/chat-message-get-context.md)
- [{#T}](./imbot.v2/commands/command-register.md)
- [{#T}](./entities.md)
- [{#T}](./migration.md)
