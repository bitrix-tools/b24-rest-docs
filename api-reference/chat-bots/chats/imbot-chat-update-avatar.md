# Изменить аватар чата imbot.chat.updateAvatar

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.chat.updateAvatar` обновляет аватар чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор можно получить с помощью метода [imbot.chat.get](./imbot-chat-get.md) ||
|| **AVATAR***
[`string`](../../data-types.md) | Изображение в формате [Base64](../../files/how-to-upload-files.md).

Размер изображения не должен превышать ограничение в 5000x5000 ||
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
    -d '{"CHAT_ID":2725,"AVATAR":"/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k="}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.chat.updateAvatar
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2725,"AVATAR":"/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k=","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.chat.updateAvatar
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.chat.updateAvatar',
            {
                CHAT_ID: 2725,
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
                'imbot.chat.updateAvatar',
                [
                    'CHAT_ID' => 2725,
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
        'imbot.chat.updateAvatar',
        {
            CHAT_ID: 2725,
            AVATAR: '/9j/4QAYRXhpZgAAS...CgCgCgCgP/9k=',
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
        'imbot.chat.updateAvatar',
        [
            'CHAT_ID' => 2725,
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
        "start": 1771934650,
        "finish": 1771934651.123539,
        "duration": 1.1235389709472656,
        "processing": 1,
        "date_start": "2026-02-24T15:04:10+03:00",
        "date_finish": "2026-02-24T15:04:11+03:00",
        "operating_reset_at": 1771935250,
        "operating": 0.9618949890136719
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если аватар обновлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

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
|| `BOT_ID_ERROR` | Bot not found | Чат-бот не найден ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Чат-бот установлен другим приложением ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-chat-add.md)
- [{#T}](./imbot-chat-user-add.md)
- [{#T}](./imbot-chat-update-title.md)
- [{#T}](./imbot-chat-update-color.md)
- [{#T}](./imbot-chat-get.md)
- [{#T}](./imbot-dialog-get.md)
- [{#T}](./imbot-chat-user-list.md)
- [{#T}](./imbot-chat-user-delete.md)
- [{#T}](./imbot-chat-leave.md)
