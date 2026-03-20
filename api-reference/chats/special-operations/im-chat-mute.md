# Отключить уведомления от чата im.chat.mute

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.chat.mute` отключает или включает уведомления в указанном чате.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата. Получить идентификатор можно с помощью метода [im.chat.get](../im-chat-get.md) ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор чата в формате:

- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата

Можно передать вместо `CHAT_ID`. 

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md). Идентификатор пользователя — с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **MUTE**
[`string`](../../data-types.md) | Управление уведомлениями:

- `Y` — отключить уведомления
- `N` — включить уведомления

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
    -d '{"CHAT_ID":1489,"MUTE":"Y"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.mute
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":1489,"MUTE":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.chat.mute
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.mute',
            {
                CHAT_ID: 1489,
                MUTE: 'Y'
            }
        );

        const result = response.getData().result;
        console.log('Muted chat:', result);

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
                'im.chat.mute',
                [
                    'CHAT_ID' => 1489,
                    'MUTE'    => 'Y'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error muting chat: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.mute',
        {
            CHAT_ID: 1489,
            MUTE: 'Y'
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
        'im.chat.mute',
        [
            'CHAT_ID' => 1489,
            'MUTE'    => 'Y'
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
        "start": 1772541297,
        "finish": 1772541297.419046,
        "duration": 0.41904592514038086,
        "processing": 0,
        "date_start": "2026-03-03T15:34:57+03:00",
        "date_finish": "2026-03-03T15:34:57+03:00",
        "operating_reset_at": 1772541897,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если уведомления успешно отключены или включены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Возможные причины:
- не передан один из обязательных параметров `CHAT_ID` или `DIALOG_ID`
- передан пустой или неверный `CHAT_ID` ||
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Передан пустой или неверный `DIALOG_ID` ||
|| `403` | `ACCESS_ERROR` | This chat cannot be muted | Возможные причины:
- у пользователя нет доступа к чату
- указанный чат не существует
- чат не поддерживает отключение уведомлений ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-recent-pin.md)
- [{#T}](./im-recent-unread.md)
- [{#T}](./im-dialog-read-all.md)
- [{#T}](./im-recent-hide.md)
