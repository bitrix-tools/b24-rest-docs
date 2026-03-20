# Отправить признак «Пользователь пишет» im.dialog.writing

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.dialog.writing` отправляет в чат индикатор «Пользователь пишет».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор чата в формате:

- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата 
  
Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md). Идентификатор пользователя — с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2935"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.writing
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2935","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.dialog.writing
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.dialog.writing',
            {
                DIALOG_ID: 'chat2935'
            }
        );
        
        const result = response.getData().result;
        console.log('Writing status indicated:', result);
        
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
                'im.dialog.writing',
                [
                    'DIALOG_ID' => 'chat2935'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error indicating writing status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.dialog.writing',
        {
            DIALOG_ID: 'chat2935'
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
        'im.dialog.writing',
        [
            'DIALOG_ID' => 'chat2935'
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
        "start": 1772548455,
        "finish": 1772548455.702725,
        "duration": 0.7027249336242676,
        "processing": 0,
        "date_start": "2026-03-03T14:34:15+03:00",
        "date_finish": "2026-03-03T14:34:15+03:00",
        "operating_reset_at": 1772549055,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если команда отправки индикатора принята ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Некорректный `DIALOG_ID` ||
|| `ACCESS_ERROR` | Action unavailable | Нет доступа к указанному чату ||
|#


{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-dialog-read.md)
- [{#T}](./im-dialog-unread.md)
