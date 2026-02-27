# Удалить команду imbot.command.unregister

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.command.unregister` удаляет зарегистрированную команду чат-бота.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMAND_ID***
[`integer`](../../data-types.md) | Идентификатор команды для удаления ||
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
    -d '{"COMMAND_ID":99}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.command.unregister
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"COMMAND_ID":99,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.command.unregister
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.command.unregister',
            {
                COMMAND_ID: 99
            }
        );
        
        const result = response.getData().result;
        console.log('Unregistered command with ID:', result);
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
                'imbot.command.unregister',
                [
                    'COMMAND_ID' => 99
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unregistering command: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.command.unregister',
        {
            COMMAND_ID: 99
        },
        function(result)
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
        'imbot.command.unregister',
        [
            'COMMAND_ID' => 99
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
        "start": 1772105363,
        "finish": 1772105363.56206,
        "duration": 0.5620601177215576,
        "processing": 0,
        "date_start": "2026-02-26T14:29:23+03:00",
        "date_finish": "2026-02-26T14:29:23+03:00",
        "operating_reset_at": 1772105963,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если команда успешно удалена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "COMMAND_ID_ERROR",
    "error_description": "Command not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `COMMAND_ID_ERROR` | Command not found | Команда не найдена ||
|| `APP_ID_ERROR` | Command was installed by another rest application | Команда зарегистрирована другим приложением ||
|| `WRONG_REQUEST` | Command can't be deleted | Не удалось удалить команду ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-command-register.md)
- [{#T}](./imbot-command-update.md)
- [{#T}](./imbot-command-answer.md)
- [{#T}](./events/on-im-command-add.md)
