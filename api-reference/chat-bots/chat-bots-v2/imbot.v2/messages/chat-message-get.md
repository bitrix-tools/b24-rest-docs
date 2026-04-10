# Получить сообщение imbot.v2.Chat.Message.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.Message.get` возвращает сообщение по его ID.

Типичный сценарий: бот получил событие с `replyId` и хочет прочитать исходное сообщение.

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
[`integer`](../../../../data-types.md) | ID сообщения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","messageId":789}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"messageId":789,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.Message.get', {
        botId: 456,
        messageId: 789,
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
                'imbot.v2.Chat.Message.get',
                [
                    'botId' => 456,
                    'messageId' => 789,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: '. print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: '. $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.Message.get',
        {
            botId: 456,
            messageId: 789,
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
        'imbot.v2.Chat.Message.get',
        [
            'botId' => 456,
            'messageId' => 789,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Message: '. $result['result']['message']['text'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "message": {
            "id": 789,
            "chatId": 5,
            "authorId": 1,
            "date": "2026-03-19T14:30:00+03:00",
            "text": "Привет! Как дела?",
            "isSystem": false,
            "uuid": "",
            "forward": null,
            "params": {},
            "viewedByOthers": true
        },
        "user": {
            "id": 1,
            "active": true,
            "name": "John Smith",
            "bot": false,
            "type": "employee"
        }
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
|| **result.message**
[`Message`](../../entities.md#message) | Объект сообщения [(подробное описание)](#message-object) ||
|| **result.user**
[`User`](../../entities.md#user) | Автор сообщения [(подробное описание)](#user-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Message {#message-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор сообщения ||
|| **chatId**
[`integer`](../../../../data-types.md) | Идентификатор чата ||
|| **authorId**
[`integer`](../../../../data-types.md) | Идентификатор автора сообщения ||
|| **date**
[`string`](../../../../data-types.md) | Дата отправки сообщения ||
|| **text**
[`string`](../../../../data-types.md) | Текст сообщения ||
|| **isSystem**
[`boolean`](../../../../data-types.md) | Системное сообщение ||
|| **uuid**
[`string`](../../../../data-types.md) | Внешний идентификатор сообщения ||
|| **forward**
[`object`](../../../../data-types.md) | Данные о пересланном сообщении ||
|| **params**
[`object`](../../../../data-types.md) | Дополнительные параметры сообщения ||
|| **viewedByOthers**
[`boolean`](../../../../data-types.md) | Сообщение просмотрено другими участниками ||
|#

### Поля объекта User {#user-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../../../data-types.md) | Пользователь активен ||
|| **name**
[`string`](../../../../data-types.md) | Имя и фамилия пользователя ||
|| **bot**
[`boolean`](../../../../data-types.md) | Признак пользователя-бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип пользователя ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)

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

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-message-get-context.md)
- [{#T}](./chat-message-send.md)
- [{#T}](./chat-message-update.md)
- [{#T}](../../index.md#bot-types)
