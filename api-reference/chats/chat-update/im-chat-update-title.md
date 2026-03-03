# Изменить заголовок чата im.chat.updateTitle

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата с правом менять оформление

Метод `im.chat.updateTitle` обновляет заголовок чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md) ||
|| **TITLE***
[`string`](../../data-types.md) | Заголовок чата.

Значение автоматически обрезается по краям от пробелов и переносов строк ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"TITLE":"Чат по проекту"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.updateTitle
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"TITLE":"Чат по проекту","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.chat.updateTitle
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.updateTitle',
            {
                CHAT_ID: 2935,
                TITLE: 'Чат по проекту'
            }
        );
        
        const result = response.getData().result;
        console.log('Updated chat title:', result);
        
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
                'im.chat.updateTitle',
                [
                    'CHAT_ID' => 2935,
                    'TITLE' => 'Чат по проекту'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating chat title: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.updateTitle',
        {
            CHAT_ID: 2935,
            TITLE: 'Чат по проекту',
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
        'im.chat.updateTitle',
        [
            'CHAT_ID' => 2935,
            'TITLE' => 'Чат по проекту'
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
        "start": 1772461866,
        "finish": 1772461866.894201,
        "duration": 0.8942010402679443,
        "processing": 0,
        "date_start": "2026-03-02T15:31:06+03:00",
        "date_finish": "2026-03-02T15:31:06+03:00",
        "operating_reset_at": 1772462466,
        "operating": 0.11278390884399414
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если заголовок чата обновлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "TITLE_EMPTY",
    "error_description": "Title can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` ||
|| `TITLE_EMPTY` | Title can't be empty | Не передан `TITLE` или после обрезки строка пустая ||
|| `ACCESS_ERROR` | Action unavailable | Операция недоступна для этого чата ||
|| `ACCESS_ERROR` | This chat cannot be renamed | Нельзя переименовать этот чат ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../im-chat-add.md)
- [{#T}](../chat-users/im-chat-user-add.md)
- [{#T}](./im-chat-update-avatar.md)
- [{#T}](./im-chat-update-color.md)
- [{#T}](../im-chat-get.md)
- [{#T}](../im-dialog-get.md)
- [{#T}](../chat-users/im-chat-user-list.md)
- [{#T}](../chat-users/im-chat-user-delete.md)
- [{#T}](../chat-users/im-chat-leave.md)
