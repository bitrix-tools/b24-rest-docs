# Список участников чата imbot.v2.Chat.User.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.User.list` возвращает список участников чата.

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
[`string`](../../../../data-types.md) | ID диалога. Для групповых чатов — `chat{chatId}` ||
|| **order**
[`object`](../../../../data-types.md) | Сортировка.

Доступные поля: `id`, `lastSendMessageId`, `userId`. Значение: `ASC` или `DESC`.

Пример: `{"id": "ASC"}` ||
|| **limit**
[`integer`](../../../../data-types.md) | Количество записей (1–200). По умолчанию `50` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat5","order":{"id":"ASC"},"limit":50}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.User.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat5","order":{"id":"ASC"},"limit":50,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.User.list
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.User.list', {
        botId: 456,
        dialogId: 'chat5',
        order: { id: 'ASC' },
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
                'imbot.v2.Chat.User.list',
                [
                    'botId' => 456,
                    'dialogId' => 'chat5',
                    'order' => ['id' => 'ASC'],
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
        'imbot.v2.Chat.User.list',
        {
            botId: 456,
            dialogId: 'chat5',
            order: { id: 'ASC' },
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
        'imbot.v2.Chat.User.list',
        [
            'botId' => 456,
            'dialogId' => 'chat5',
            'order' => ['id' => 'ASC'],
            'limit' => 50,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        foreach ($result['result'] as $user) {
            echo $user['id'] . ': ' . $user['name'] . "\n";
        }
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": [
        {
            "id": 1,
            "active": true,
            "name": "John Smith",
            "firstName": "John",
            "lastName": "Smith",
            "workPosition": "Developer",
            "color": "#ab7761",
            "avatar": "",
            "gender": "M",
            "extranet": false,
            "bot": false,
            "status": "online",
            "type": "employee"
        },
        {
            "id": 2,
            "active": true,
            "name": "Anna Davis",
            "firstName": "Anna",
            "lastName": "Davis",
            "workPosition": "Manager",
            "color": "#5b7e91",
            "avatar": "",
            "gender": "F",
            "extranet": false,
            "bot": false,
            "status": "online",
            "type": "employee"
        }
    ],
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
[`User[]`](../../entities.md#user) | Массив участников чата. Описание полей объекта — [User](../../entities.md#user) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied"
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
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-user-add.md)
- [{#T}](./chat-user-delete.md)
- [{#T}](./chat-manager-add.md)
