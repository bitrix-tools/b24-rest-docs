# Просмотреть пользователей, прочитавших важное сообщение log.blogpost.getusers.important

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `log.blogpost.getusers.important` возвращает массив идентификаторов пользователей, которые прочитали важное сообщение.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID***
[`integer`](../data-types.md) | Идентификатор важного сообщения Ленты новостей.

Получить идентификатор можно с помощью метода [log.blogpost.get](./log-blogpost-get.md) ||
|#

{% note info "" %}

Метод возвращает не более 500 идентификаторов пользователей, прочитавших важное сообщение

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":221}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogpost.getusers.important
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":221,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogpost.getusers.important
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'log.blogpost.getusers.important',
            {
                POST_ID: 221
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
                'log.blogpost.getusers.important',
                [
                    'POST_ID' => 221
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving important users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogpost.getusers.important',
        {
            POST_ID: 221
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
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
        'log.blogpost.getusers.important',
        [
            'POST_ID' => 221
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
    "result": ["1269", "1271"],
    "time": {
        "start": 1773755868,
        "finish": 1773755868.215257,
        "duration": 0.215256929397583,
        "processing": 0,
        "date_start": "2026-03-17T16:57:48+03:00",
        "date_finish": "2026-03-17T16:57:48+03:00",
        "operating_reset_at": 1773756468,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив идентификаторов пользователей, прочитавших важное сообщение. Максимум — 500 записей.

Пустой массив означает, что у пользователя нет прав на просмотр сообщения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong post ID"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong post ID` | Некорректный `POST_ID` ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogpost-add.md)
- [{#T}](./log-blogpost-update.md)
- [{#T}](./log-blogpost-get.md)
- [{#T}](./log-blogpost-delete.md)
- [{#T}](./log-blogpost-share.md)
