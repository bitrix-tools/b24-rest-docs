# Добавить реакцию на сообщение imbot.v2.Chat.Message.Reaction.add

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.Message.Reaction.add` добавляет реакцию бота на сообщение.

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
|| **reaction***
[`string`](../../../../data-types.md) | Код реакции. Список доступных кодов описан [ниже](#reactions) ||
|#

### Доступные коды реакций {#reactions}

#|
|| **Код** | **Описание** ||
|| `like` | Нравится ||
|| `dislike` | Не нравится ||
|| `faceWithTearsOfJoy` | До слез ||
|| `redHeart` | Сердечко ||
|| `fire` | Огонь! ||
|| `cry` | Жаль ||
|| `slightlySmilingFace` | Улыбаюсь ||
|| `laugh` | Смеюсь ||
|| `wonder` | Шок ||
|| `angry` | Злюсь ||
|| `facepalm` | Без комментариев ||
|| `flexedBiceps` | Мощно ||
|| `clappingHands` | Великолепно ||
|| `okHand` | ОК ||
|| `partyingFace` | Поздравляю ||
|| `questionMark` | Вопрос ||
|| `lightBulb` | Идея ||
|| `whiteHeavyCheckMark` | Готово ||
|| `hundredPoints` | Поддерживаю ||
|| `handshake` | Договорились ||
|#

Список реакций может расширяться.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","messageId":789,"reaction":"like"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.Reaction.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"messageId":789,"reaction":"like","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.Reaction.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.Message.Reaction.add', {
        botId: 456,
        messageId: 789,
        reaction: 'like',
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
                'imbot.v2.Chat.Message.Reaction.add',
                [
                    'botId' => 456,
                    'messageId' => 789,
                    'reaction' => 'like',
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
        'imbot.v2.Chat.Message.Reaction.add',
        {
            botId: 456,
            messageId: 789,
            reaction: 'like',
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
        'imbot.v2.Chat.Message.Reaction.add',
        [
            'botId' => 456,
            'messageId' => 789,
            'reaction' => 'like',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Reaction added';
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
[`boolean`](../../../../data-types.md) | `true` при успешном добавлении реакции ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "REACTION_NOT_FOUND",
    "error_description": "Reaction not found"
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
|| `ACCESS_DENIED` | Access denied | Бот не является участником чата с этим сообщением ||
|| `REACTION_NOT_FOUND` | Reaction not found | Указан несуществующий код реакции ||
|| `REACTION_ALREADY_SET` | Reaction already set | Эта реакция уже установлена ботом на данное сообщение ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./chat-message-reaction-delete.md)
- [{#T}](./chat-message-send.md)
