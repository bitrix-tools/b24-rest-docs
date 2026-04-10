# Создать объект на основании сообщения im.message.share

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.message.share` создает объект на основании сообщения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения.

Идентификатор можно получить с помощью метода [im.dialog.messages.get](./im-dialog-messages-get.md) ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор чата в формате:

- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата 
  
Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md). Идентификатор пользователя — с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **TYPE***
[`string`](../../data-types.md) | Тип создаваемого объекта.

Допустимые значения:
- `CHAT` — чат
- `TASK` — задача
- `POST` — пост в ленте
- `CALEND` — событие календаря ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34261,"DIALOG_ID":"chat2941","TYPE":"TASK"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.share
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34261,"DIALOG_ID":"chat2941","TYPE":"TASK","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.share
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.message.share',
            {
                MESSAGE_ID: 34261,
                DIALOG_ID: 'chat2941',
                TYPE: 'TASK'
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
                'im.message.share',
                [
                    'MESSAGE_ID' => 34261,
                    'DIALOG_ID' => 'chat2941',
                    'TYPE' => 'TASK'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sharing message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.share',
        {
            MESSAGE_ID: 34261,
            DIALOG_ID: 'chat2941',
            TYPE: 'TASK'
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
        'im.message.share',
        [
            'MESSAGE_ID' => 34261,
            'DIALOG_ID' => 'chat2941',
            'TYPE' => 'TASK'
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
        "start": 1772632079,
        "finish": 1772632079.779834,
        "duration": 0.7798340320587158,
        "processing": 0,
        "date_start": "2026-03-04T16:47:59+03:00",
        "date_finish": "2026-03-04T16:47:59+03:00",
        "operating_reset_at": 1772632679,
        "operating": 0.5939757823944092
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если объект создан ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

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
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Не передан или некорректен `DIALOG_ID` ||
|| `ACCESS_ERROR` | You do not have access to the specified dialog | Нет доступа к диалогу ||
|| `PARAMS_ERROR` | Incorrect params | Некорректные параметры запроса ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-command.md)
- [{#T}](./im-dialog-messages-get.md)
