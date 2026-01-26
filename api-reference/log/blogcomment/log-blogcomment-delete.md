# Удалить комментарий из сообщению log.blogcomment.delete

> Scope: [`log`](../../scopes/permissions.md)
>
> Кто может выполнять метод: автор комментария или пользователь с полными правами на запись

Метод `log.blogcomment.delete` удаляет комментарий к сообщению в Ленте новостей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMENT_ID***
[`integer`](../../data-types.md) | Идентификатор комментария. Значение должно быть больше `0`.

Идентификатор комментария можно получить с помощью метода [log.blogcomment.add](./log-blogcomment-add.md) ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, от имени которого выполняется удаление. Доступно только администраторам. По умолчанию используется текущий пользователь, инициировавший вызов.

Идентификатор пользователя можно получить с помощью метода [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"COMMENT_ID":197,"USER_ID":503}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogcomment.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"COMMENT_ID":197,"USER_ID":503,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogcomment.delete
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'log.blogcomment.delete',
            {
                COMMENT_ID: 197,
                USER_ID: 503,
            }
        );

        const result = response.getData().result;
        console.info(result);
    }
    catch( error )
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogcomment.delete',
                [
                    'COMMENT_ID' => 197,
                    'USER_ID' => 503,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Deleted: ' . print_r($result->data(), true);
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error deleting comment: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogcomment.delete',
        {
            COMMENT_ID: 197,
            USER_ID: 503,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'log.blogcomment.delete',
        [
            'COMMENT_ID' => 197,
            'USER_ID'    => 503,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Deleted: ' . print_r($result['result'], true);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1728901200.123456,
        "finish": 1728901200.456789,
        "duration": 0.33333301544189453,
        "processing": 0.12000012397766113,
        "date_start": "2025-10-14T11:40:00+03:00",
        "date_finish": "2025-10-14T11:40:00+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong comment ID"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные ошибки

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Wrong comment ID` | Указан пустой или некорректный идентификатор комментария ||
|| `-`| `Blog module not installed` | Модуль `blog` не установлен ||
|| `-` | `No delete perms` | У пользователя нет прав на удаление комментария ||
|| `-` | `No comment found` | Комментарий с переданным идентификатором не найден ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogcomment-add.md)
- [{#T}](./log-blogcomment-user-get.md)