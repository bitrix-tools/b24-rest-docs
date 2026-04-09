# Получить информацию о чате imbot.v2.Chat.get

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.get` возвращает информацию о чате. Бот должен быть участником чата.

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
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat5"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat5","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.get', {
        botId: 456,
        dialogId: 'chat5',
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
                'imbot.v2.Chat.get',
                [
                    'botId' => 456,
                    'dialogId' => 'chat5',
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
        'imbot.v2.Chat.get',
        {
            botId: 456,
            dialogId: 'chat5',
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
        'imbot.v2.Chat.get',
        [
            'botId' => 456,
            'dialogId' => 'chat5',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Chat name: '. $result['result']['chat']['name'];
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
            "lastMessageId": 789,
            "muteList": [],
            "managerList": []
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
|| **result.chat**
[`Chat`](../../entities.md#chat) | Объект чата [(подробное описание)](#chat-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Chat {#chat-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор чата ||
|| **dialogId**
[`string`](../../../../data-types.md) | Идентификатор диалога ||
|| **name**
[`string`](../../../../data-types.md) | Название чата ||
|| **description**
[`string`](../../../../data-types.md) | Описание чата ||
|| **owner**
[`integer`](../../../../data-types.md) | Идентификатор владельца чата ||
|| **color**
[`string`](../../../../data-types.md) | Цвет чата ||
|| **avatar**
[`string`](../../../../data-types.md) | URL аватара ||
|| **type**
[`string`](../../../../data-types.md) | Тип чата ||
|| **role**
[`string`](../../../../data-types.md) | Роль бота в чате ||
|| **dateCreate**
[`string`](../../../../data-types.md) | Дата создания чата ||
|| **lastMessageId**
[`integer`](../../../../data-types.md) | Идентификатор последнего сообщения ||
|| **muteList**
[`array`](../../../../data-types.md) | Список пользователей с отключенными уведомлениями ||
|| **managerList**
[`array`](../../../../data-types.md) | Список администраторов чата ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)

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
- [{#T}](./chat-add.md)
- [{#T}](./chat-update.md)
- [{#T}](./chat-user-list.md)
