# Покинуть чат im.chat.leave

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.chat.leave` удаляет текущего пользователя из чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.leave
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.chat.leave
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.leave',
            {
                CHAT_ID: 2935
            }
        );
        
        const result = response.getData().result;
        console.log('Left chat:', result);
        
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
                'im.chat.leave',
                [
                    'CHAT_ID' => 2935
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error leaving chat: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.leave',
        {
            CHAT_ID: 2935,
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
        'im.chat.leave',
        [
            'CHAT_ID' => 2935
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
        "start": 1772482559,
        "finish": 1772482559.780171,
        "duration": 0.7801709175109863,
        "processing": 0,
        "date_start": "2026-03-02T13:15:59+03:00",
        "date_finish": "2026-03-02T13:15:59+03:00",
        "operating_reset_at": 1772483159,
        "operating": 0.10254502296447754
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если пользователь вышел из чата ||
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
|| `ACCESS_ERROR` | It is forbidden to delete users of this chat | Нельзя выйти из этого чата этим методом ||
|| `ACCESS_DENIED_KICK` | Недостаточно прав на исключение участников из чата | Пользователь не является участником чата ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../im-chat-add.md)
- [{#T}](./im-chat-user-add.md)
- [{#T}](../chat-update/im-chat-update-title.md)
- [{#T}](../chat-update/im-chat-update-avatar.md)
- [{#T}](../chat-update/im-chat-update-color.md)
- [{#T}](../im-chat-get.md)
- [{#T}](../im-dialog-get.md)
- [{#T}](./im-chat-user-list.md)
- [{#T}](./im-dialog-users-list.md)
- [{#T}](./im-chat-user-delete.md)
