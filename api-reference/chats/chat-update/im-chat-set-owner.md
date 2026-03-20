# Сменить владельца чата im.chat.setOwner

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец чата

Метод `im.chat.setOwner` меняет владельца чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md) ||
|| **USER_ID***
[`integer`](../../data-types.md) | Идентификатор нового владельца чата.

Идентификатор можно получить с помощью метода [im.chat.user.list](../chat-users/im-chat-user-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"USER_ID":1271}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.setOwner
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"USER_ID":1271,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.chat.setOwner
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.setOwner',
            {
                CHAT_ID: 2935,
                USER_ID: 1271
            }
        );
        
        const result = response.getData().result;
        console.log('Set chat owner:', result);
        
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
                'im.chat.setOwner',
                [
                    'CHAT_ID' => 2935,
                    'USER_ID' => 1271
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting chat owner: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.setOwner',
        {
            CHAT_ID: 2935,
            USER_ID: 1271,
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
        'im.chat.setOwner',
        [
            'CHAT_ID' => 2935,
            'USER_ID' => 1271
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
        "start": 1772480720,
        "finish": 1772480720.22065,
        "duration": 0.22064995765686035,
        "processing": 0,
        "date_start": "2026-03-02T16:45:20+03:00",
        "date_finish": "2026-03-02T16:45:20+03:00",
        "operating_reset_at": 1772481320,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если владелец чата успешно изменен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

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
|| `USER_ID_EMPTY` | User ID can't be empty | Не передан `USER_ID` ||
|| `ACCESS_ERROR` | Action unavailable | Операция недоступна для этого чата ||
|| `WRONG_REQUEST` | Change owner can only owner and user must be member in chat | Сменить владельца может только текущий владелец, новый владелец должен быть участником чата ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../im-chat-add.md)
- [{#T}](../chat-users/im-chat-user-add.md)
- [{#T}](./im-chat-update-title.md)
- [{#T}](./im-chat-update-avatar.md)
- [{#T}](./im-chat-update-color.md)
- [{#T}](../im-chat-get.md)
- [{#T}](../im-dialog-get.md)
- [{#T}](../chat-users/im-chat-user-list.md)
- [{#T}](../chat-users/im-chat-user-delete.md)
- [{#T}](../chat-users/im-chat-leave.md)
