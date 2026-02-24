# Получить описание полей файла disk.file.getfields

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.file.getfields` возвращает описание полей файла.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.getfields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.getfields
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.getfields',
            {}
        );
        
        const result = response.getData().result;
        console.log('File fields:', result);
        
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
                'disk.file.getfields',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting file fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.getfields",
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
        'disk.file.getfields',
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
    "result": {
        "ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "NAME": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "TYPE": {
            "TYPE": "enum",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "CODE": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "STORAGE_ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "PARENT_ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "CREATE_TIME": {
            "TYPE": "datetime",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "UPDATE_TIME": {
            "TYPE": "datetime",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "DELETE_TIME": {
            "TYPE": "datetime",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "CREATED_BY": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "UPDATED_BY": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "DELETED_BY": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "GLOBAL_CONTENT_VERSION": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "FILE_ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "SIZE": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "DELETED_TYPE": {
            "TYPE": "enum",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        }
    },
    "time": {
        "start": 1770651518,
        "finish": 1770651518.741429,
        "duration": 0.7414290904998779,
        "processing": 0,
        "date_start": "2026-02-09T16:38:38+03:00",
        "date_finish": "2026-02-09T16:38:38+03:00",
        "operating_reset_at": 1770652118,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с описанием полей файла.

Структура описания каждого поля:
- `TYPE` — тип данных поля
- `USE_IN_FILTER` — возможность использовать поле при фильтрации
- `USE_IN_SHOW` — доступность поля при получении ответа ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **TYPE**
[`enum`](../../data-types.md) | Тип объекта ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код файла ||
|| **STORAGE_ID**
[`integer`](../../data-types.md) | Идентификатор хранилища, в котором находится файл ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительской папки ||
|| **CREATE_TIME**
[`datetime`](../../data-types.md) | Дата и время создания файла ||
|| **UPDATE_TIME**
[`datetime`](../../data-types.md) | Дата и время последнего обновления файла ||
|| **DELETE_TIME**
[`datetime`](../../data-types.md) | Дата и время переноса файла в корзину ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего файл ||
|| **UPDATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, внесшего последнее изменение ||
|| **DELETED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, удалившего файл ||
|| **GLOBAL_CONTENT_VERSION**
[`integer`](../../data-types.md) | Инкрементальный счетчик версии файла ||
|| **FILE_ID**
[`integer`](../../data-types.md) | Внутреннее значение идентификатора файла ||
|| **SIZE**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **DELETED_TYPE**
[`enum`](../../data-types.md) | Статус удаления объекта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-file-copy-to.md)
- [{#T}](./disk-file-delete.md)
- [{#T}](./disk-file-get-external-link.md)
- [{#T}](./disk-file-get-versions.md)
- [{#T}](./disk-file-get.md)
- [{#T}](./disk-file-mark-deleted.md)
- [{#T}](./disk-file-move-to.md)
- [{#T}](./disk-file-rename.md)
- [{#T}](./disk-file-restore-from-version.md)
- [{#T}](./disk-file-restore.md)
- [{#T}](./disk-file-upload-version.md)