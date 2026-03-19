# Получить информацию о боте imbot.v2.Bot.get

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `imbot.v2.Bot.get` возвращает информацию о боте. Используется для проверки установки бота.

Для приложения-владельца возвращает расширенный формат (включая `moduleId`, `appId`, `eventMode` и счетчики). Для других приложений — краткий формат.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId**
[`integer`](../../../../data-types.md) | ID бота. Обязателен, если не указан `code` ||
|| **code**
[`string`](../../../../data-types.md) | Код бота. Обязателен, если не указан `botId` ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|#

{% note info "" %}

Необходимо передать один из параметров: `botId` или `code`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botToken":"my_bot_token","code":"support_bot"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Bot.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"code":"support_bot","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Bot.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Bot.get', {
        code: 'support_bot',
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
                'imbot.v2.Bot.get',
                [
                    'code' => 'support_bot',
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
        'imbot.v2.Bot.get',
        {
            code: 'support_bot',
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
        'imbot.v2.Bot.get',
        ['code' => 'support_bot']
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Bot ID: ' . $result['result']['bot']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "bot": {
            "id": 456,
            "code": "support_bot",
            "type": "bot",
            "isHidden": false,
            "isSupportOpenline": false,
            "isReactionsEnabled": true,
            "backgroundId": null,
            "language": "ru",
            "moduleId": "rest",
            "appId": "local.67890abcdef12.34567890",
            "eventMode": "fetch",
            "countMessage": 150,
            "countCommand": 3,
            "countChat": 12,
            "countUser": 45
        },
        "users": [
            {
                "id": 456,
                "active": true,
                "name": "Support Bot",
                "bot": true,
                "type": "bot"
            }
        ]
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
|| **result.bot**
[`Bot`](../../entities.md#bot) | Объект бота. Расширенный формат — для владельца, краткий — для остальных. Описание полей объекта — [Bot](../../entities.md#bot) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив связанных пользователей. Описание полей объекта — [User](../../entities.md#user) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

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
|| `PARAMS_REQUIRED` | Required parameters are missing | Не передан ни `botId`, ни `code` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot is registered by another application | Бот зарегистрирован другим приложением ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./bot-register.md)
- [{#T}](./bot-update.md)
- [{#T}](./bot-list.md)
- [{#T}](./bot-unregister.md)
