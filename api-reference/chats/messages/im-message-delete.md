# Удалить сообщение im.message.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: автор сообщения или администратор в общем чате

Метод `im.message.delete` удаляет сообщение.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения.

Идентификатор можно получить с помощью метода [im.dialog.messages.get](./im-dialog-messages-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34247}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34247,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.message.delete',
            {
                MESSAGE_ID: 34247
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
                'im.message.delete',
                [
                    'MESSAGE_ID' => 34247
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.delete',
        {
            MESSAGE_ID: 34247
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
        'im.message.delete',
        [
            'MESSAGE_ID' => 34247
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
        "start": 1772629211,
        "finish": 1772629211.717344,
        "duration": 0.7173440456390381,
        "processing": 0,
        "date_start": "2026-03-04T16:00:11+03:00",
        "date_finish": "2026-03-04T16:00:11+03:00",
        "operating_reset_at": 1772629811,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если сообщение удалено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "MESSAGE_ID_ERROR",
    "error_description": "Message ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MESSAGE_ID_ERROR` | Message ID can't be empty | Не передан или некорректен `MESSAGE_ID` ||
|| `CANT_EDIT_MESSAGE` | Time has expired for modification or you don't have access | Нет прав на удаление сообщения или истек срок редактирования ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./im-message-like.md)
