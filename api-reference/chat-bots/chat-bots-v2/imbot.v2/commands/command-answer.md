# Ответить на команду imbot.v2.Command.answer

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Command.answer` отправляет ответ бота на вызов слэш-команды.

Бот может ответить в чат, из которого пришла команда, даже если бот не является участником этого чата. Доступ предоставляется временно на основе токена команды — `messageId` + `commandId`. Если бот не является участником чата, сообщение отправляется как системное с указанием имени бота.

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
|| **commandId***
[`integer`](../../../../data-types.md) | ID команды ||
|| **messageId***
[`integer`](../../../../data-types.md) | ID сообщения с командой ||
|| **dialogId***
[`string`](../../../../data-types.md) | ID диалога. Для групповых чатов — `chat{chatId}`, для личных — `{userId}` ||
|| **fields**
[`object`](../../../../data-types.md) | Поля ответного сообщения. Структура объекта описана [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **message**
[`string`](../../../../data-types.md) | Текст ответа. Максимальная длина — 20 000 символов ||
|| **attach**
[`array`](../../../../data-types.md) | Вложения. Подробнее: [Как использовать вложения](../../../../chats/messages/attachments.md) ||
|| **keyboard**
[`array`](../../../../data-types.md) | Клавиатура. Подробнее: [Работа с клавиатурами](../../../../chats/messages/keyboards.md) ||
|| **system**
[`boolean`](../../../../data-types.md) | Системное сообщение. Допустимые значения: `true`, `false`. По умолчанию `false` ||
|| **urlPreview**
[`boolean`](../../../../data-types.md) | Показывать превью ссылок. Допустимые значения: `true`, `false`. По умолчанию `true` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","commandId":42,"messageId":789,"dialogId":"chat5","fields":{"message":"Here is the help text..."}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Command.answer
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"commandId":42,"messageId":789,"dialogId":"chat5","fields":{"message":"Here is the help text..."},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Command.answer
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Command.answer', {
        botId: 456,
        commandId: 42,
        messageId: 789,
        dialogId: 'chat5',
        fields: { message: 'Here is the help text...' },
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
                'imbot.v2.Command.answer',
                [
                    'botId' => 456,
                    'commandId' => 42,
                    'messageId' => 789,
                    'dialogId' => 'chat5',
                    'fields' => ['message' => 'Here is the help text...'],
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
        'imbot.v2.Command.answer',
        {
            botId: 456,
            commandId: 42,
            messageId: 789,
            dialogId: 'chat5',
            fields: { message: 'Here is the help text...' },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Command.answer',
        [
            'botId' => 456,
            'commandId' => 42,
            'messageId' => 789,
            'dialogId' => 'chat5',
            'fields' => ['message' => 'Here is the help text...'],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Answer sent';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": true,
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
[`boolean`](../../../../data-types.md) | `true` при успешной отправке ответа ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "COMMAND_ANSWER_FAILED",
    "error_description": "Command answer failed"
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
|| `COMMAND_ANSWER_FAILED` | Command answer failed | Ошибка отправки ответа ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./command-register.md)
- [{#T}](../messages/chat-message-send.md)
- [{#T}](../events/event-get.md)

