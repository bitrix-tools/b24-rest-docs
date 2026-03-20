# Закрепить чат вверху списка im.recent.pin

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.recent.pin` закрепляет или открепляет диалог вверху списка чатов пользователя.

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
|| **PIN**
[`string`](../../data-types.md) | Закрепить или открепить диалог:

- `Y` — закрепить диалог вверху списка
- `N` — открепить диалог

По умолчанию — `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat1489","PIN":"Y"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.recent.pin
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat1489","PIN":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.recent.pin
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.recent.pin',
            {
                DIALOG_ID: 'chat1489',
                PIN: 'Y'
            }
        );

        const result = response.getData().result;
        console.log('Pinned dialog:', result);

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
                'im.recent.pin',
                [
                    'DIALOG_ID' => 'chat1489',
                    'PIN'       => 'Y'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error pinning dialog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.recent.pin',
        {
            DIALOG_ID: 'chat1489',
            PIN: 'Y'
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
        'im.recent.pin',
        [
            'DIALOG_ID' => 'chat1489',
            'PIN'       => 'Y'
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
        "start": 1772519500,
        "finish": 1772519500.234567,
        "duration": 0.234567165374756,
        "processing": 0,
        "date_start": "2026-03-03T09:31:40+03:00",
        "date_finish": "2026-03-03T09:31:40+03:00",
        "operating_reset_at": 1772520100,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если диалог успешно закреплен или откреплен ||
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
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can’t be empty | Параметр `DIALOG_ID` не передан, передан пустым или в неверном формате ||
|| `400` | `ACCESS_ERROR` | You don’t have permission to pin this chat | У пользователя нет доступа к чату ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-recent-unread.md)
- [{#T}](./im-dialog-read-all.md)
- [{#T}](./im-chat-mute.md)
- [{#T}](./im-recent-hide.md)
