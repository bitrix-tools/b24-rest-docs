# Переместить файл в корзину disk.file.markdeleted

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование» для нужного файла

Метод `disk.file.markdeleted` перемещает файл в корзину.

{% note info "" %}

Сохраните идентификатор файла после удаления, чтобы потом его можно было восстановить методом [disk.file.restore](./disk-file-restore.md)

{% endnote %} 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор файла.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если файл находится в корне хранилища, и с помощью метода [disk.folder.getchildren](../folder/disk-folder-get-children.md), если файл находится в папке
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9037}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.markdeleted
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9037,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.markdeleted
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.markdeleted',
            {
                id: 9037,
            }
        );
        
        const result = response.getData().result;
        console.log('File marked as deleted:', result);
        
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
                'disk.file.markdeleted',
                [
                    'id' => 9037
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error marking file as deleted: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.markdeleted",
        {
            id: 9037
        },
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
        'disk.file.markdeleted',
        [
            'id' => 9037
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
    "result": {
        "ID": "9037",
        "NAME": "picture.png",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "file",
        "PARENT_ID": "8930",
        "DELETED_TYPE": "3",
        "GLOBAL_CONTENT_VERSION": "1",
        "FILE_ID": "32933",
        "SIZE": "1679",
        "CREATE_TIME": "2026-02-09T17:35:49+03:00",
        "UPDATE_TIME": "2026-02-09T17:35:49+03:00",
        "DELETE_TIME": "2026-02-16T14:43:38+03:00",
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": "1269",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=904993690000071b006e2cf2000004f5000007bb5f672541f2cec7c7f0b65135f70180&token=disk%7CaWQ9OTAzNyZfPWVNNEllSjUwZEV7OUN1aEhETzBobFdDOWlMSEFZNk5x%7CImRvd25sb2FkfGRpc2t8YVdROU9UQXpOeVpmUFdWTk5FbGxTalV3WkVWMk9VTjFhRWhFVHpCb2JGZERPV9xNU0VGWk5rNXh8OTA0OTkzNjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDdiYjVmNjcyNTQxZjJjZWM3YzdmMGI2NTEzNWY3MDE4MCI%3D.nSSCKa7KdIxa0ToaCO31FIV3VZwvFxUTR1Mpl39508Y%3D",
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/Папка/Папка в папке/picture.png"
    },
    "time": {
        "start": 1771260218,
        "finish": 1771260218.490546,
        "duration": 0.49054598808288574,
        "processing": 0,
        "date_start": "2026-02-16T14:43:38+03:00",
        "date_finish": "2026-02-16T14:43:38+03:00",
        "operating_reset_at": 1771260818,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с полями файла ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код файла ||
|| **STORAGE_ID**
[`integer`](../../data-types.md) | Идентификатор хранилища, в котором находится файл ||
|| **TYPE**
[`enum`](../../data-types.md) | Тип объекта ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительской папки ||
|| **DELETED_TYPE**
[`enum`](../../data-types.md) | Статус удаления объекта. Возможные значения:
- `0` — не удален
- `3` — в корзине
- `4` — удален вместе с родительской папкой ||
|| **GLOBAL_CONTENT_VERSION**
[`integer`](../../data-types.md) | Инкрементальный счетчик версии файла ||
|| **FILE_ID**
[`integer`](../../data-types.md) | Внутреннее значение идентификатора файла ||
|| **SIZE**
[`integer`](../../data-types.md) | Размер файла в байтах ||
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
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|| **DETAIL_URL**
[`string`](../../data-types.md) | Ссылка для открытия файла в интерфейсе ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_ARGUMENT",
    "error_description":"Invalid value of parameter {Parameter #0}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр `id` ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Файл с указанным `id` не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для перемещения файла в корзину ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-file-copy-to.md)
- [{#T}](./disk-file-delete.md)
- [{#T}](./disk-file-get-external-link.md)
- [{#T}](./disk-file-get-fields.md)
- [{#T}](./disk-file-get-versions.md)
- [{#T}](./disk-file-get.md)
- [{#T}](./disk-file-move-to.md)
- [{#T}](./disk-file-rename.md)
- [{#T}](./disk-file-restore-from-version.md)
- [{#T}](./disk-file-restore.md)
- [{#T}](./disk-file-upload-version.md)