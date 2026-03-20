# Удалить чат из списка последних im.recent.hide

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.recent.hide` удаляет диалог из списка последних чатов текущего пользователя.

Получить список последних чатов можно методом [im.recent.get](../im-recent-get.md).

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
    -d '{"DIALOG_ID":"chat1489"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.recent.hide
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat1489","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.recent.hide
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.recent.hide',
            {
                DIALOG_ID: 'chat1489'
            }
        );

        const result = response.getData().result;
        console.log('Hidden dialog:', result);

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
                'im.recent.hide',
                [
                    'DIALOG_ID' => 'chat1489'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error hiding dialog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.recent.hide',
        {
            DIALOG_ID: 'chat1489'
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
        'im.recent.hide',
        [
            'DIALOG_ID' => 'chat1489'
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
        "start": 1772519200,
        "finish": 1772519200.456789,
        "duration": 0.456789016723633,
        "processing": 0,
        "date_start": "2026-03-03T09:26:40+03:00",
        "date_finish": "2026-03-03T09:26:40+03:00",
        "operating_reset_at": 1772519800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если диалог успешно удален из списка последних чатов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Параметр `DIALOG_ID` не передан, передан пустым или в неверном формате ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-recent-pin.md)
- [{#T}](./im-recent-unread.md)
- [{#T}](./im-dialog-read-all.md)
- [{#T}](./im-chat-mute.md)
