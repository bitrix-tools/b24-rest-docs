# Добавить участников чата imbot.chat.user.add

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.chat.user.add` добавляет пользователей в чат.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор можно получить с помощью метода [imbot.chat.get](./imbot-chat-get.md) ||
|| **USERS***
[`array`](../../data-types.md) | Массив идентификаторов пользователей для добавления.

Идентификаторы пользователей можно получить с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **HIDE_HISTORY**
[`string`](../../data-types.md) | Скрыть историю чата для добавляемых пользователей:
- `Y` — скрыть
- `N` — не скрывать 

По умолчанию — `Y` ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить идентификатор бота можно с помощью метода [imbot.bot.list](../imbot-bot-list.md).

Если параметр не передан, метод ищет первого бота, который зарегистрирован текущим приложением ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации.

Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2725,"USERS":[1269],"HIDE_HISTORY":"Y"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.chat.user.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2725,"USERS":[1269],"HIDE_HISTORY":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.chat.user.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.chat.user.add',
            {
                CHAT_ID: 2725,
                USERS: [1269],
                HIDE_HISTORY: 'Y'
            }
        );
        
        const result = response.getData().result;
        console.log('User added to chat:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.chat.user.add',
                [
                    'CHAT_ID' => 2725,
                    'USERS' => [1269],
                    'HIDE_HISTORY' => 'Y'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding user to chat: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.chat.user.add',
        {
            CHAT_ID: 2725,
            USERS: [1269],
            HIDE_HISTORY: 'Y'
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.chat.user.add',
        [
            'CHAT_ID' => 2725,
            'USERS' => [1269],
            'HIDE_HISTORY' => 'Y'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1771935849,
        "finish": 1771935849.832795,
        "duration": 0.8327949047088623,
        "processing": 0,
        "date_start": "2026-02-24T15:24:09+03:00",
        "date_finish": "2026-02-24T15:24:09+03:00",
        "operating_reset_at": 1771936449,
        "operating": 0.14426183700561523
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если пользователи добавлены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` ||
|| `ACCESS_ERROR` | Action unavailable | Операция недоступна для этого чата ||
|| `ACCESS_ERROR` | It is forbidden to add users to this chat | Нельзя добавлять пользователей в этот чат ||
|| `WRONG_REQUEST` | User IDs must be passed in array format | `USERS` передан в неверном формате ||
|| `WRONG_REQUEST` | You don't have access or user already member in chat | Нет прав на добавление или пользователь уже в чате ||
|| `BOT_ID_ERROR` | Bot not found | Чат-бот не найден ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Чат-бот установлен другим приложением ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-chat-add.md)
- [{#T}](./imbot-chat-update-title.md)
- [{#T}](./imbot-chat-update-avatar.md)
- [{#T}](./imbot-chat-update-color.md)
- [{#T}](./imbot-chat-get.md)
- [{#T}](./imbot-dialog-get.md)
- [{#T}](./imbot-chat-user-list.md)
- [{#T}](./imbot-chat-user-delete.md)
- [{#T}](./imbot-chat-leave.md)
