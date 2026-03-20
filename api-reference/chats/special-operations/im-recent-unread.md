# Установить или снять признак «прочитано» у чата im.recent.unread

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.recent.unread` устанавливает или снимает признак «прочитано» у чата.

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
|| **ACTION**
[`string`](../../data-types.md) | Действие с меткой «прочитано»:
- `Y` — установить метку
- `N` — снять метку и отметить диалог прочитанным

По умолчанию: `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2941","ACTION":"Y"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.recent.unread
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2941","ACTION":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.recent.unread
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.recent.unread',
            {
                DIALOG_ID: 'chat2941',
                ACTION: 'Y'
            }
        );
        
        const result = response.getData().result;
        console.log('Marked dialog as unread:', result);
        
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
                'im.recent.unread',
                [
                    'DIALOG_ID' => 'chat2941',
                    'ACTION' => 'Y'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error marking dialog as unread: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.recent.unread',
        {
            DIALOG_ID: 'chat2941',
            ACTION: 'Y'
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
        'im.recent.unread',
        [
            'DIALOG_ID' => 'chat2941',
            'ACTION' => 'Y'
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
        "start": 1772518597,
        "finish": 1772518597.385986,
        "duration": 0.3859860897064209,
        "processing": 0,
        "date_start": "2026-03-03T09:16:37+03:00",
        "date_finish": "2026-03-03T09:16:37+03:00",
        "operating_reset_at": 1772519197,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если метка успешно установлена или снята.

Возвращает `false`, если чат с указанным `DIALOG_ID` не найден ||
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
|| **Код** | **Описание** | **Значение** ||
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Не передан или передан в неверном формате `DIALOG_ID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-recent-pin.md)
- [{#T}](./im-dialog-read-all.md)
- [{#T}](./im-chat-mute.md)
- [{#T}](./im-recent-hide.md)
