# Изменить аватар чата im.chat.updateAvatar

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата с правом менять оформление

Метод `im.chat.updateAvatar` обновляет аватар чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md) ||
|| **AVATAR***
[`string`](../../data-types.md) | Изображение в формате [Base64](../../files/how-to-upload-files.md).

Максимальный размер изображения — 5000х5000 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"AVATAR":"/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k="}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.updateAvatar
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"AVATAR":"/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k=","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.chat.updateAvatar
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.updateAvatar',
            {
                CHAT_ID: 2935,
                AVATAR: '/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k='
            }
        );
        
        const result = response.getData().result;
        console.log('Updated chat avatar:', result);
        
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
                'im.chat.updateAvatar',
                [
                    'CHAT_ID' => 2935,
                    'AVATAR' => '/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k='
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating chat avatar: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.updateAvatar',
        {
            CHAT_ID: 2935,
            AVATAR: '/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k=',
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
        'im.chat.updateAvatar',
        [
            'CHAT_ID' => 2935,
            'AVATAR' => '/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k='
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
        "start": 1772459338,
        "finish": 1772459339.565761,
        "duration": 1.5657610893249512,
        "processing": 1,
        "date_start": "2026-03-02T13:48:58+03:00",
        "date_finish": "2026-03-02T13:48:59+03:00",
        "operating_reset_at": 1772459938,
        "operating": 0.7875189781188965
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если аватар чата обновлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "AVATAR_ERROR",
    "error_description": "Avatar incorrect type"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для изменения аватара ||
|| `ACCESS_ERROR` | Action unavailable | Операция недоступна для этого чата ||
|| `ACCESS_ERROR` | The avatar of this chat cannot be changed | Нельзя изменить аватар этого чата ||
|| `AVATAR_ERROR` | Avatar incorrect type | Передан файл не с типом изображения ||
|| `AVATAR_ERROR` | Avatar incorrect size (max 5000x5000) | Размер изображения превышает ограничение ||
|| `WRONG_REQUEST` | Chat isn't exists | Указанный чат не существует ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../im-chat-add.md)
- [{#T}](../chat-users/im-chat-user-add.md)
- [{#T}](./im-chat-update-title.md)
- [{#T}](./im-chat-update-color.md)
- [{#T}](../im-chat-get.md)
- [{#T}](../im-dialog-get.md)
- [{#T}](../chat-users/im-chat-user-list.md)
- [{#T}](../chat-users/im-chat-user-delete.md)
- [{#T}](../chat-users/im-chat-leave.md)
