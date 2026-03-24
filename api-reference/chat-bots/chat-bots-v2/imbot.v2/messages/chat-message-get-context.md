# Получить контекст сообщения imbot.v2.Chat.Message.getContext

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.Message.getContext` возвращает окно сообщений вокруг указанного. Используется для анализа истории диалога.

{% note warning "" %}

Метод доступен только для ботов типа `supervisor` и `personal`. Подробнее — [Типы ботов](../../../index.md#bot-types).

{% endnote %}

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
|| **messageId***
[`integer`](../../../../data-types.md) | ID центрального сообщения ||
|| **range**
[`integer`](../../../../data-types.md) | Количество сообщений в каждую сторону от центрального (1–50). По умолчанию `20` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","messageId":789,"range":20}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.getContext
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"messageId":789,"range":20,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.getContext
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.Message.getContext', {
        botId: 456,
        messageId: 789,
        range: 20,
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
                'imbot.v2.Chat.Message.getContext',
                [
                    'botId' => 456,
                    'messageId' => 789,
                    'range' => 20,
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
        'imbot.v2.Chat.Message.getContext',
        {
            botId: 456,
            messageId: 789,
            range: 20,
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
        'imbot.v2.Chat.Message.getContext',
        [
            'botId' => 456,
            'messageId' => 789,
            'range' => 20,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        foreach ($result['result']['messages'] as $message) {
            echo $message['id'] . ': ' . $message['text'] . "\n";
        }
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "messages": [
            {
                "id": 785,
                "chatId": 5,
                "authorId": 1,
                "date": "2026-03-19T14:25:00+03:00",
                "text": "Добрый день!",
                "isSystem": false,
                "uuid": "",
                "forward": null,
                "params": {},
                "viewedByOthers": true
            },
            {
                "id": 789,
                "chatId": 5,
                "authorId": 2,
                "date": "2026-03-19T14:30:00+03:00",
                "text": "Привет! Как дела?",
                "isSystem": false,
                "uuid": "",
                "forward": null,
                "params": {},
                "viewedByOthers": true
            }
        ],
        "users": [
            {
                "id": 1,
                "active": true,
                "name": "John Smith",
                "bot": false,
                "type": "employee"
            },
            {
                "id": 2,
                "active": true,
                "name": "Anna Davis",
                "bot": false,
                "type": "employee"
            }
        ],
        "hasPrevPage": false,
        "hasNextPage": true
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
[`object`](../../../../data-types.md) | Результат запроса ||
|| **result.messages**
[`Message[]`](../../entities.md#message) | Массив сообщений от старых к новым. Описание полей — [Message](../../entities.md#message) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Авторы сообщений. Описание полей — [User](../../entities.md#user) ||
|| **result.hasPrevPage**
[`boolean`](../../../../data-types.md) | Есть ли более ранние сообщения ||
|| **result.hasNextPage**
[`boolean`](../../../../data-types.md) | Есть ли более поздние сообщения ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Пагинация

Для загрузки следующей страницы вызовите метод повторно, передав в `messageId` ID последнего сообщения из текущей выборки. Для предыдущей — ID первого сообщения.

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "BOT_TYPE_NOT_ALLOWED",
    "error_description": "Bot type not allowed"
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
|| `BOT_TYPE_NOT_ALLOWED` | Bot type not allowed | Метод доступен только для ботов типа `supervisor` и `personal` ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./chat-message-get.md)
- [{#T}](./chat-message-send.md)
- [{#T}](../../index.md#bot-types)
