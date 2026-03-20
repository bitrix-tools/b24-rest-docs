# Удалить сообщение Ленты новостей log.blogpost.delete

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или автор сообщения

Метод `log.blogpost.delete` удаляет сообщение Ленты новостей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID***
[`integer`](../data-types.md) | Идентификатор сообщения.

Получить идентификатор можно с помощью метода [log.blogpost.get](./log-blogpost-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":211}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogpost.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":211,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogpost.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'log.blogpost.delete',
            {
                POST_ID: 211
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
                'log.blogpost.delete',
                [
                    'POST_ID' => 211
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogpost.delete',
        {
            POST_ID: 211
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
        'log.blogpost.delete',
        [
            'POST_ID' => 211
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
        "start": 1773751532,
        "finish": 1773751532.632761,
        "duration": 0.6327610015869141,
        "processing": 0,
        "date_start": "2026-03-17T15:45:32+03:00",
        "date_finish": "2026-03-17T15:45:32+03:00",
        "operating_reset_at": 1773752132,
        "operating": 0.1264798641204834
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если сообщение удалено ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Wrong post ID"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | `Wrong post ID` | Некорректный `POST_ID` ||
|| `0` | `Модуль блогов не установлен.` | Модуль `blog` не установлен ||
|| `403` | `У вас нет прав на удаление этого сообщения` | Недостаточно прав для удаления сообщения ||
|| `0` | `Ошибка удаления сообщения` | Внутренняя ошибка при удалении сообщения ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogpost-add.md)
- [{#T}](./log-blogpost-update.md)
- [{#T}](./log-blogpost-get.md)
- [{#T}](./log-blogpost-share.md)
- [{#T}](./log-blogpost-getusers-important.md)
