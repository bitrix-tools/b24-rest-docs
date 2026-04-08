# Отправить сообщение imbot.v2.Chat.Message.send

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.Message.send` отправляет сообщение от имени бота в указанный диалог.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **dialogId***
[`string`](../../../../data-types.md) | ID диалога. Для групповых чатов — `chat{chatId}`, для личных — `{userId}` ||
|| **fields**
[`object`](../../../../data-types.md) | Содержимое сообщения. Структура объекта описана [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **message**
[`string`](../../../../data-types.md) | Текст сообщения. Максимальная длина — 20 000 символов. При превышении текст обрезается с добавлением ` (...)` ||
|| **attach**
[`array`](../../../../data-types.md) | Вложения. Подробнее: [Как использовать вложения](./attachments/index.md) ||
|| **keyboard**
[`array`](../../../../data-types.md) | Клавиатура с кнопками. Подробнее: [Работа с клавиатурами](./message-keyboards.md) ||
|| **system**
[`boolean`](../../../../data-types.md) | Системное сообщение. Допустимые значения: `true`, `false`. По умолчанию `false` ||
|| **urlPreview**
[`boolean`](../../../../data-types.md) | Показывать превью ссылок. Допустимые значения: `true`, `false`. По умолчанию `true` ||
|| **replyId**
[`integer`](../../../../data-types.md) | ID сообщения, на которое отвечает бот ||
|| **templateId**
[`string`](../../../../data-types.md) | UUID шаблона сообщения ||
|| **forwardIds**
[`object`](../../../../data-types.md) | Сообщения для пересылки. Формат: `{uuid: messageId}`, где `uuid` — произвольная UUID-строка как ключ, `messageId` — ID исходного сообщения. В ответе `uuidMap` вернёт `{uuid: newMessageId}`.

Бот может пересылать только сообщения из чатов, в которых он является участником. Максимум 100 сообщений ||
|#

> Boolean-поля `system`, `urlPreview`, `skipConnector`, `silentConnector` принимают значения `true`, `false`, `"Y"`, `"N"`.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat5","fields":{"message":"Hello from bot!","keyboard":[{"TEXT":"Open","LINK":"https://example.com","BG_COLOR_TOKEN":"primary"}]}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat5","fields":{"message":"Hello from bot!"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.send
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.Message.send', {
        botId: 456,
        dialogId: 'chat5',
        fields: {
          message: 'Hello from bot!',
          keyboard: [
            { TEXT: 'Open', LINK: 'https://example.com', BG_COLOR_TOKEN: 'primary' },
          ],
        },
      });

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.v2.Chat.Message.send',
                [
                    'botId' => 456,
                    'dialogId' => 'chat5',
                    'fields' => [
                        'message' => 'Hello from bot!',
                        'keyboard' => [
                            ['TEXT' => 'Open', 'LINK' => 'https://example.com', 'BG_COLOR_TOKEN' => 'primary'],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: ' . print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.Message.send',
        {
            botId: 456,
            dialogId: 'chat5',
            fields: {
                message: 'Hello from bot!',
                keyboard: [
                    { TEXT: 'Open', LINK: 'https://example.com', BG_COLOR_TOKEN: 'primary' },
                ],
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log('Message ID:', result.data().id);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Chat.Message.send',
        [
            'botId' => 456,
            'dialogId' => 'chat5',
            'fields' => [
                'message' => 'Hello from bot!',
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Message ID: ' . $result['result']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

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

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат отправки сообщения ||
|| **result.id**
[`integer`](../../../../data-types.md) | ID отправленного сообщения ||
|| **result.uuidMap**
[`object`](../../../../data-types.md) | Маппинг UUID → ID для пересланных сообщений ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "EMPTY_MESSAGE",
    "error_description": "Message is empty"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token is not specified | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | Bot ID is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot is registered by another application | Бот зарегистрирован другим приложением ||
|| `ACCESS_DENIED` | Access denied | Бот не является участником чата ||
|| `EMPTY_MESSAGE` | Message is empty | Пустое сообщение — нет текста или вложений ||
|| `SENDING_FAILED` | Sending failed | Ошибка отправки сообщения ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-message-update.md)
- [{#T}](./chat-message-delete.md)
- [{#T}](./chat-message-reaction-add.md)
- [{#T}](./attachments/index.md)
- [{#T}](./message-keyboards.md)
