# Получить типы хранилищ disk.storage.gettypes

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.storage.gettypes` возвращает список типов хранилищ.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.storage.gettypes
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.storage.gettypes
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.storage.gettypes',
            {}
        );
        
        const result = response.getData().result;
        console.log('Retrieved types:', result);
        
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
                'disk.storage.gettypes',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.gettypes",
        {},
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.storage.gettypes',
        []
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
    "result": [
        "user",
        "common",
        "group"
    ],
    "time": {
        "start": 1769543842,
        "finish": 1769543842.835557,
        "duration": 0.8355569839477539,
        "processing": 0,
        "date_start": "2026-01-26T15:57:22+03:00",
        "date_finish": "2026-01-26T15:57:22+03:00",
        "operating_reset_at": 1769544442,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с типами хранилищ.

- `user` — хранилище пользователя
- `common` — хранилище общих документов
- `group` — хранилище группы ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-storage-add-folder.md)
- [{#T}](./disk-storage-get-fields.md)
- [{#T}](./disk-storage-get-children.md)
- [{#T}](./disk-storage-get-for-app.md)
- [{#T}](./disk-storage-get-list.md)
- [{#T}](./disk-storage-get.md)
- [{#T}](./disk-storage-rename.md)
- [{#T}](./disk-storage-upload-file.md)