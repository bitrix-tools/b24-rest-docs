# Получить события бота imbot.v2.Event.get

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Event.get` получает события для бота в режиме опроса — FETCH. Используется для ботов с `eventMode: "fetch"`.

Метод подтверждает получение событий с ID меньше переданного `offset`. При следующем вызове возвращаются только новые события, начиная с подтвержденного.

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
|| **offset**
[`integer`](../../../../data-types.md) | Подтверждает все события с ID меньше указанного значения. При первом вызове не передается ||
|| **limit**
[`integer`](../../../../data-types.md) | Максимальное количество возвращаемых событий (1–1000). По умолчанию `100` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","offset":1000,"limit":50}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Event.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"offset":1000,"limit":50,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Event.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Event.get', {
        botId: 456,
        offset: 1000,
        limit: 50,
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
                'imbot.v2.Event.get',
                [
                    'botId' => 456,
                    'offset' => 1000,
                    'limit' => 50,
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
        'imbot.v2.Event.get',
        {
            botId: 456,
            offset: 1000,
            limit: 50,
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
        'imbot.v2.Event.get',
        [
            'botId' => 456,
            'offset' => 1000,
            'limit' => 50,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        foreach ($result['result']['events'] as $event) {
            echo $event['type'] . ': ' . $event['eventId'] . "\n";
        }
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "events": [
            {
                "eventId": 1001,
                "type": "ONIMBOTV2MESSAGEADD",
                "date": "2025-01-15T10:30:00+03:00",
                "data": {}
            }
        ],
        "lastEventId": 1001,
        "hasMore": false
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
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.events**
[`object[]`](../../../../data-types.md) | Массив событий ||
|| **result.events[].eventId**
[`integer`](../../../../data-types.md) | ID события. Передайте в следующем вызове как `offset` для подтверждения ||
|| **result.events[].type**
[`string`](../../../../data-types.md) | Тип события. Список типов описан [ниже](#event-types) ||
|| **result.events[].date**
[`datetime`](../../../../data-types.md) | Дата и время события ||
|| **result.events[].data**
[`object`](../../../../data-types.md) | Данные события. Формат зависит от типа события: [описание событий](./events.md) ||
|| **result.lastEventId**
[`integer`](../../../../data-types.md) | ID последнего возвращенного события ||
|| **result.hasMore**
[`boolean`](../../../../data-types.md) | `true`, если есть еще необработанные события ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Типы событий {#event-types}

#|
|| **Тип** | **Описание** ||
|| `ONIMBOTV2MESSAGEADD` | Новое сообщение боту ||
|| `ONIMBOTV2MESSAGEUPDATE` | Сообщение отредактировано ||
|| `ONIMBOTV2MESSAGEDELETE` | Сообщение удалено ||
|| `ONIMBOTV2JOINCHAT` | Бота добавили в чат ||
|| `ONIMBOTV2DELETE` | Бота удалили ||
|| `ONIMBOTV2CONTEXTGET` | Передача контекста вызова чата ||
|| `ONIMBOTV2COMMANDADD` | Вызвана слэш-команда ||
|| `ONIMBOTV2REACTIONCHANGE` | Реакция изменена ||
|#

Подробное описание формата данных каждого события: [{#T}](./events.md).

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "BOT_NOT_FOUND",
    "error_description": "Bot not found"
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
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./events.md)
- [{#T}](../bots/bot-register.md)
- [{#T}](../messages/chat-message-send.md)
