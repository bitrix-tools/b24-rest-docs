# Назначить или снять права администратора чата imbot.chat.setManager

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец чата

Метод `imbot.chat.setManager` назначает администратора чата или снимает права администратора у участника чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор можно получить с помощью метода [imbot.chat.get](./imbot-chat-get.md) ||
|| **USER_ID***
[`integer`](../../data-types.md) | Идентификатор пользователя, для которого меняется признак администратора.

Идентификатор пользователя можно получить с помощью метода [imbot.chat.user.list](./imbot-chat-user-list.md) ||
|| **IS_MANAGER**
[`string`](../../data-types.md) | Признак администратора. Возможные значения:
- `Y` — назначить администратора
- `N` — снять права администратора

По умолчанию — `Y` ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить идентификатор бота можно с помощью метода [imbot.bot.list](../imbot-bot-list.md).

Если параметр не передан, метод ищет первого бота, который зарегистрирован текущим приложением ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Параметр обязателен только для вебхуков. Передавайте тот же CLIENT_ID, который был указан при регистрации чат-бота ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2725,"USER_ID":1269,"IS_MANAGER":"Y"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.chat.setManager
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2725,"USER_ID":1269,"IS_MANAGER":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.chat.setManager
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.chat.setManager',
            {
                CHAT_ID: 2725,
                USER_ID: 1269,
                IS_MANAGER: 'Y'
            }
        );
        
        const result = response.getData().result;
        console.log(result);
        
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
                'imbot.chat.setManager',
                [
                    'CHAT_ID' => 2725,
                    'USER_ID' => 1269,
                    'IS_MANAGER' => 'Y'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting chat manager: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.chat.setManager',
        {
            CHAT_ID: 2725,
            USER_ID: 1269,
            IS_MANAGER: 'Y'
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
        'imbot.chat.setManager',
        [
            'CHAT_ID' => 2725,
            'USER_ID' => 1269,
            'IS_MANAGER' => 'Y'
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
        "start": 1772543706,
        "finish": 1772543706.871191,
        "duration": 0.8711910247802734,
        "processing": 0,
        "date_start": "2026-03-03T16:15:06+03:00",
        "date_finish": "2026-03-03T16:15:06+03:00",
        "operating_reset_at": 1772544306,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если права администратора изменены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "WRONG_REQUEST",
    "error_description": "Change manager can only owner and user must be member in chat"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` ||
|| `USER_ID_EMPTY` | User ID can't be empty | Не передан `USER_ID` ||
|| `WRONG_REQUEST` | Change manager can only owner and user must be member in chat | Изменить права администратора может только владелец чата, а пользователь должен быть участником чата ||
|| `BOT_ID_ERROR` | Bot not found | Чат-бот не найден ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Чат-бот установлен другим приложением ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-chat-add.md)
- [{#T}](./imbot-chat-user-add.md)
- [{#T}](./imbot-chat-update-title.md)
- [{#T}](./imbot-chat-update-avatar.md)
- [{#T}](./imbot-chat-update-color.md)
- [{#T}](./imbot-chat-get.md)
- [{#T}](./imbot-dialog-get.md)
- [{#T}](./imbot-chat-user-list.md)
- [{#T}](./imbot-chat-user-delete.md)
- [{#T}](./imbot-chat-leave.md)

