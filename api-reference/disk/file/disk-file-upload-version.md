# Загрузить новую версию файла disk.file.uploadversion

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование» для нужного файла

Метод `disk.file.uploadversion` загружает новую версию файла.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор файла.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если файл находится в корне хранилища, и с помощью метода [disk.folder.getchildren](../folder/disk-folder-get-children.md), если файл находится в папке ||
|| **fileContent***
[`array`](../../data-types.md) | Массив из имени файла и строки с [Base64](../../files/how-to-upload-files.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9043,"fileContent":["Тест №2.docx","UEsDBBQABgAIAAAAIQBKvAJxbQEAACgGAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAI...AAAAAA0ADQBAAwAAA2EAAAAA"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.uploadversion
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9043,"fileContent":["Тест №2.docx","UEsDBBQABgAIAAAAIQBKvAJxbQEAACgGAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAI...AAAAAA0ADQBAAwAAA2EAAAAA"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.uploadversion
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.uploadversion',
            {
                id: 9043,
                fileContent: [
                    'Тест №2.docx',
                    'UEsDBBQABgAIAAAAIQBKvAJxbQEAACgGAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAI...AAAAAA0ADQBAAwAAA2EAAAAA',
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Uploaded file version with ID:', result);
        
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
                'disk.file.uploadversion',
                [
                    'id' => 9043,
                    'fileContent' => [
                        'Тест №2.docx',
                        'UEsDBBQABgAIAAAAIQBKvAJxbQEAACgGAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAI...AAAAAA0ADQBAAwAAA2EAAAAA',
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error uploading file version: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.uploadversion",
        {
            id: 9043,
            fileContent: [
            'Тест №2.docx',
            'UEsDBBQABgAIAAAAIQBKvAJxbQEAACgGAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAI...AAAAAA0ADQBAAwAAA2EAAAAA',
            ]
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
        'disk.file.uploadversion',
        [
            'id' => 9043,
            'fileContent' => [
                'Тест №2.docx',
                'UEsDBBQABgAIAAAAIQBKvAJxbQEAACgGAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAI...AAAAAA0ADQBAAwAAA2EAAAAA',
            ]
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
        "ID": "9043",
        "NAME": "Тест №2.docx",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "file",
        "PARENT_ID": "8996",
        "DELETED_TYPE": "0",
        "GLOBAL_CONTENT_VERSION": 7,
        "FILE_ID": "32987",
        "SIZE": "25689",
        "CREATE_TIME": "2026-02-16T12:52:05+03:00",
        "UPDATE_TIME": "2026-02-17T13:26:58+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": "0",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=815094690000071b006e2cf2000004f5000007a108900724af0be51c3d5962bfd124ef&token=disk%7CaWQ9OTA0MyZfPW8zbFN4MU5lU3pFbHpLSm5Ub1JhZzRJRzFnN2FnYldE%7CImRvd25sb2FkfGRpc2t8YVdROU9UQTBNeVpmUFc4emJGTjRNVTVsVTNwRmJIcExTbTVVYjFKaFp6UkpSekZuTjJGbllsZEV8ODE1MDk0NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDdhMTA4OTAwNzI0YWYwYmU1MWMzZDU5NjJiZmQxMjRlZiI%3D.yD9KHiasOQNb0ymK6NQjHTOCjDsSbYn%2FTAkju8323fc%3D",
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/Папка/Папка/Тест №2.docx"
    },
    "time": {
        "start": 1771324018,
        "finish": 1771324018.554412,
        "duration": 0.5544118881225586,
        "processing": 0,
        "date_start": "2026-02-17T13:26:58+03:00",
        "date_finish": "2026-02-17T13:26:58+03:00",
        "operating_reset_at": 1771324618,
        "operating": 0.2871270179748535
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
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр `id` или `fileContent` ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Файл с указанным `id` не найден ||
|| `DISK_FILE_22002` | Could not save file | Не удалось сохранить файл. Проверьте свободное место на Диске и корректность кодировки данных ||
|| `DISK_FILE_22005` | Could not get saved file | Не удалось получить данные сохраненного файла ||
|| `DISK_FILE_22006` | Size restriction | Размер загружаемого файла превышает лимит хранилища ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для загрузки новой версии файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-file-copy-to.md)
- [{#T}](./disk-file-delete.md)
- [{#T}](./disk-file-get-external-link.md)
- [{#T}](./disk-file-get-fields.md)
- [{#T}](./disk-file-get-versions.md)
- [{#T}](./disk-file-get.md)
- [{#T}](./disk-file-mark-deleted.md)
- [{#T}](./disk-file-move-to.md)
- [{#T}](./disk-file-rename.md)
- [{#T}](./disk-file-restore-from-version.md)
- [{#T}](./disk-file-restore.md)