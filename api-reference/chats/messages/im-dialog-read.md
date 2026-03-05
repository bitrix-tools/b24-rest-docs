# Установить признак «прочитано» у сообщений im.dialog.read

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.dialog.read` устанавливает признак «прочитано» для сообщений диалога до указанного сообщения включительно.

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
|| **MESSAGE_ID**
[`integer`](../../data-types.md) | Идентификатор последнего прочитанного сообщения. Если не передан — метод устанавливает признак прочтения для всех непрочитанных сообщений ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489","MESSAGE_ID":84875}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.read
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489","MESSAGE_ID":84875,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.dialog.read
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.dialog.read',
            {
                DIALOG_ID: 'chat1489',
                MESSAGE_ID: 84875
            }
        );

        console.log(response.getData().result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.dialog.read',
            [
                'DIALOG_ID' => 'chat1489',
                'MESSAGE_ID' => 84875,
            ]
        );

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.dialog.read',
        {
            DIALOG_ID: 'chat1489',
            MESSAGE_ID: 84875
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
        'im.dialog.read',
        [
            'DIALOG_ID' => 'chat1489',
            'MESSAGE_ID' => 84875,
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "dialogId": "chat1489",
        "chatId": 1489,
        "lastId": 84875,
        "counter": 3
    },
    "time": {
        "start": 1772624912,
        "finish": 1772624912.615753,
        "duration": 0.6157529354095459,
        "processing": 0,
        "date_start": "2026-03-04T14:48:32+03:00",
        "date_finish": "2026-03-04T14:48:32+03:00",
        "operating_reset_at": 1772625512,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result).

Возвращает `false`, если у пользователя нет доступа к чату ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **dialogId**
[`string`](../../data-types.md) | Идентификатор диалога ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **lastId**
[`integer`](../../data-types.md) | Идентификатор последнего прочитанного сообщения ||
|| **counter**
[`integer`](../../data-types.md) | Количество непрочитанных сообщений после выполнения метода ||
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

- [{#T}](./im-dialog-messages-get.md)
- [{#T}](./im-dialog-messages-search.md)
- [{#T}](./im-dialog-unread.md)
- [{#T}](./im-dialog-writing.md)
