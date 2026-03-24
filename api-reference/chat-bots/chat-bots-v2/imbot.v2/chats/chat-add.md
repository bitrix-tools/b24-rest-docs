# Создать групповой чат imbot.v2.Chat.add

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.add` создает новый групповой чат от имени бота. Если владелец не указан — им становится бот.

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
|| **fields**
[`object`](../../../../data-types.md) | Свойства создаваемого чата. Структура объекта описана [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **title**
[`string`](../../../../data-types.md) | Название чата ||
|| **description**
[`string`](../../../../data-types.md) | Описание чата ||
|| **color**
[`string`](../../../../data-types.md) | Цвет чата. Передается в нижнем регистре.

Допустимые значения: `red`, `green`, `mint`, `light_blue`, `dark_blue`, `purple`, `aqua`, `pink`, `lime`, `brown`, `azure`, `khaki`, `sand`, `marengo`, `gray`, `graphite`.

Если не указан или некорректен — назначается автоматически ||
|| **avatar**
[`file`](../../../../data-types.md) | Аватар чата в формате [Base64](../../../../files/how-to-upload-files.md) ||
|| **userIds**
[`integer[]`](../../../../data-types.md) | Массив ID участников ||
|| **ownerId**
[`integer`](../../../../data-types.md) | ID владельца чата. Если не указан — владельцем становится бот ||
|| **message**
[`string`](../../../../data-types.md) | Первое сообщение в чате ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","fields":{"title":"Support Chat","color":"mint","userIds":[1,2]}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"fields":{"title":"Support Chat","color":"mint","userIds":[1,2]},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.add', {
        botId: 456,
        fields: {
          title: 'Support Chat',
          color: 'mint',
          userIds: [1, 2],
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
                'imbot.v2.Chat.add',
                [
                    'botId' => 456,
                    'fields' => [
                        'title' => 'Support Chat',
                        'color' => 'mint',
                        'userIds' => [1, 2],
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
        'imbot.v2.Chat.add',
        {
            botId: 456,
            fields: {
                title: 'Support Chat',
                color: 'mint',
                userIds: [1, 2],
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log('Chat ID:', result.data().chat.id);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Chat.add',
        [
            'botId' => 456,
            'fields' => [
                'title' => 'Support Chat',
                'color' => 'mint',
                'userIds' => [1, 2],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Chat ID: ' . $result['result']['chat']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "chat": {
            "id": 5,
            "dialogId": "chat5",
            "name": "Support Chat",
            "description": "",
            "owner": 456,
            "color": "#4ba984",
            "avatar": "",
            "type": "chat",
            "role": "owner",
            "dateCreate": "2025-01-15T10:00:00+03:00",
            "lastMessageId": null,
            "muteList": [],
            "managerList": []
        },
        "users": [
            {
                "id": 1,
                "active": true,
                "name": "John Smith",
                "type": "employee"
            },
            {
                "id": 2,
                "active": true,
                "name": "Anna Davis",
                "type": "employee"
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
[`object`](../../../../data-types.md) | Результат создания чата ||
|| **result.chat**
[`Chat`](../../entities.md#chat) | Объект созданного чата. Описание полей объекта — [Chat](../../entities.md#chat) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив участников чата. Описание полей объекта — [User](../../entities.md#user) ||
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
|| `BOT_ID_REQUIRED` | Bot ID is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot is registered by another application | Бот зарегистрирован другим приложением ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./chat-get.md)
- [{#T}](./chat-update.md)
- [{#T}](./chat-user-add.md)
- [{#T}](./chat-leave.md)
