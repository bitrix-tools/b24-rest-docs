# Выполнить команду чат-бота im.message.command

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.message.command` выполняет команду чат-бота в контексте сообщения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения, в контексте которого выполняется команда.

Идентификатор можно получить с помощью метода [im.dialog.messages.get](./im-dialog-messages-get.md) ||
|| **BOT_ID***
[`integer`](../../data-types.md) | Идентификатор бота.

Идентификатор можно получить с помощью метода [imbot.bot.list](../../chat-bots/imbot-bot-list.md). ||
|| **COMMAND***
[`string`](../../data-types.md) | Команда бота.

Текст указывается при регистрации команды чат-ботом через метод [imbot.command.register](../../chat-bots/commands/imbot-command-register.md) ||
|| **COMMAND_PARAMS**
[`string`](../../data-types.md) | Параметр команды ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34261,"BOT_ID":1291,"COMMAND":"task","COMMAND_PARAMS":"task №1"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.command
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34261,"BOT_ID":1291,"COMMAND":"task","COMMAND_PARAMS":"task №1","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.command
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.message.command',
            {
                MESSAGE_ID: 34261,
                BOT_ID: 1291,
                COMMAND: 'task',
                COMMAND_PARAMS: 'task №1'
            }
        );
        
        const result = response.getData().result;
        console.log('Executed command with result:', result);
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
                'im.message.command',
                [
                    'MESSAGE_ID' => 34261,
                    'BOT_ID' => 1291,
                    'COMMAND' => 'task',
                    'COMMAND_PARAMS' => 'task №1'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error executing command: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.command',
        {
            MESSAGE_ID: 34261,
            BOT_ID: 1291,
            COMMAND: 'task',
            COMMAND_PARAMS: 'task №1'
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.message.command',
        [
            'MESSAGE_ID' => 34261,
            'BOT_ID' => 1291,
            'COMMAND' => 'task',
            'COMMAND_PARAMS' => 'task №1'
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
        "start": 1772633574,
        "finish": 1772633574.201127,
        "duration": 0.2011270523071289,
        "processing": 0,
        "date_start": "2026-03-04T17:12:54+03:00",
        "date_finish": "2026-03-04T17:12:54+03:00",
        "operating_reset_at": 1772634174,
        "operating": 0.10915994644165039
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если команда выполнена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "PARAMS_ERROR",
    "error_description": "Incorrect params"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MESSAGE_ID_ERROR` | Message ID can't be empty | Не передан или некорректен `MESSAGE_ID` ||
|| `BOT_ID_ERROR` | Bot ID can't be empty | Не передан или некорректен `BOT_ID` ||
|| `COMMAND_ERROR` | Command can't be empty | Не передан `COMMAND` ||
|| `PARAMS_ERROR` | Incorrect params | Некорректные параметры команды ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./keyboards.md)
- [{#T}](./menu.md)
