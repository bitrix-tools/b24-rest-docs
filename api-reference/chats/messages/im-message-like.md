# Изменить статус «Мне нравится» im.message.like

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.message.like` ставит или снимает отметку «Мне нравится» для сообщения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения.

Идентификатор можно получить с помощью метода [im.dialog.messages.get](./im-dialog-messages-get.md) ||
|| **ACTION**
[`string`](../../data-types.md) | Действие с реакцией на сообщение.

Допустимые значения:
- `auto` — автоматически переключить текущий статус: если реакции «Мне нравится» нет, она будет установлена, если реакция есть — снята
- `plus` — поставить «Мне нравится»
- `minus` — снять «Мне нравится»
  
По умолчанию — `auto`  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34247,"ACTION":"plus"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.like
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34247,"ACTION":"plus","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.like
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.message.like',
            {
                MESSAGE_ID: 34247,
                ACTION: 'plus'
            }
        );
        
        const result = response.getData().result;
        console.log('Liked message with ID:', result);
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
                'im.message.like',
                [
                    'MESSAGE_ID' => 34247,
                    'ACTION' => 'plus'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error liking message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.like',
        {
            MESSAGE_ID: 34247,
            ACTION: 'plus'
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
        'im.message.like',
        [
            'MESSAGE_ID' => 34247,
            'ACTION' => 'plus'
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
        "start": 1772625907,
        "finish": 1772625908.047015,
        "duration": 1.0470149517059326,
        "processing": 0,
        "date_start": "2026-03-04T15:05:07+03:00",
        "date_finish": "2026-03-04T15:05:08+03:00",
        "operating_reset_at": 1772626508,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если действие выполнено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "WITHOUT_CHANGES",
    "error_description": "Action completed without changes"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MESSAGE_ID_ERROR` | Message ID can't be empty | Не передан или некорректен `MESSAGE_ID` ||
|| `WITHOUT_CHANGES` | Action completed without changes | Состояние реакции уже было таким же ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./im-message-delete.md)
