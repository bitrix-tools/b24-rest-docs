# Пригласить участников в чат im.chat.user.add

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата с правом добавлять участников в чат

Метод `im.chat.user.add` добавляет пользователей в чат.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md) ||
|| **USERS***
[`array`](../../data-types.md) | Массив идентификаторов пользователей, которых нужно добавить в чат.

Идентификаторы пользователей можно получить с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **HIDE_HISTORY**
[`string`](../../data-types.md) | Скрыть историю чата для добавляемых пользователей:
- `Y` — скрыть
- `N` — не скрывать 

По умолчанию: `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"USERS":[99,1271],"HIDE_HISTORY":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.user.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"USERS":[99,1271],"HIDE_HISTORY":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.chat.user.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.user.add',
            {
                CHAT_ID: 2935,
                USERS: [99, 1271],
                HIDE_HISTORY: 'N'
            }
        );
        
        const result = response.getData().result;
        console.log('Added users to chat:', result);
        
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
                'im.chat.user.add',
                [
                    'CHAT_ID' => 2935,
                    'USERS' => [99, 1271],
                    'HIDE_HISTORY' => 'N'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding users to chat: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.user.add',
        {
            CHAT_ID: 2935,
            USERS: [99, 1271],
            HIDE_HISTORY: 'N'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.chat.user.add',
        [
            'CHAT_ID' => 2935,
            'USERS' => [99, 1271],
            'HIDE_HISTORY' => 'N'
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
        "start": 1772452546,
        "finish": 1772452546.179628,
        "duration": 0.1796278953552246,
        "processing": 0,
        "date_start": "2026-03-02T10:55:46+03:00",
        "date_finish": "2026-03-02T10:55:46+03:00",
        "operating_reset_at": 1772453146,
        "operating": 0.1326589584350586
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если пользователи добавлены в чат ||
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
|| `ACCESS_DENIED_EXTEND` | Недостаточно прав на добавление участников в чат | Недостаточно прав для добавления участников в чат ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../im-chat-add.md)
- [{#T}](../chat-update/im-chat-update-title.md)
- [{#T}](../chat-update/im-chat-update-avatar.md)
- [{#T}](../chat-update/im-chat-update-color.md)
- [{#T}](../im-chat-get.md)
- [{#T}](../im-dialog-get.md)
- [{#T}](./im-chat-user-list.md)
- [{#T}](./im-dialog-users-list.md)
- [{#T}](./im-chat-user-delete.md)
- [{#T}](./im-chat-leave.md)
