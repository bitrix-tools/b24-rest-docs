# Копировать файл в указанную папку disk.file.copyto

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для файла и правом «Добавление» для папки

Метод `disk.file.copyto` копирует файл в указанную папку.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **targetFolderId***
[`integer`](../../data-types.md) | Идентификатор папки, в которую копируется файл ||
|#

{% note info "" %}

Идентификаторы файла и папки можно получить с помощью методов [disk.storage.getchildren](../storage/disk-storage-get-children.md) и [disk.folder.getchildren](../folder/disk-folder-get-children.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9035,"targetFolderId":8930}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.copyto
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9035,"targetFolderId":8930,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.copyto
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.copyto',
            {
                id: 9035,
                targetFolderId: 8930,
            }
        );
        
        const result = response.getData().result;
        console.log('Copied file with ID:', result);
        
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
                'disk.file.copyto',
                [
                    'id' => 9035,
                    'targetFolderId' => 8930
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error copying file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.copyto",
        {
            id: 9035,
            targetFolderId: 8930
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
        'disk.file.copyto',
        [
            'id' => 9035,
            'targetFolderId' => 8930
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
        "ID": 9037,
        "NAME": "picture.png",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "file",
        "PARENT_ID": "8930",
        "DELETED_TYPE": 0,
        "GLOBAL_CONTENT_VERSION": 1,
        "FILE_ID": 32933,
        "SIZE": "1679",
        "CREATE_TIME": "2026-02-09T11:35:49+03:00",
        "UPDATE_TIME": "2026-02-09T11:35:49+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": null,
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=effc89690000071b006e2cf2000004f50000077d3d5d904ee6ccfc65bf287ca71f1fd6&token=disk%7CaWQ9OTAzNyZfPVhsRFgwaWJ2RTdLMXJlV1dhaEFPMEtoTjhVQ0s0MWNx%7CImRvd25sb2FkfGRpc2t8YVdROU9UQXpOeVpmUFZoc1JGZ3dhV0oyUlRkTE1YSmxWMWRoYUVGUE1FdG9UamhWUTBzME1XTnh8ZWZmYzg5NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDc3ZDNkNWQ5MDRlZTZjY2ZjNjViZjI4N2NhNzFmMWZkNiI%3D.fY5cpLbXwIiIO8X3NoiCzsMVAl2i6zegF4%2Bn86l0khg%3D",
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/Папка/Папка в папке/picture.png"
    },
    "time": {
        "start": 1770647749,
        "finish": 1770647749.342314,
        "duration": 0.3423140048980713,
        "processing": 0,
        "date_start": "2026-02-09T11:35:49+03:00",
        "date_finish": "2026-02-09T11:35:49+03:00",
        "operating_reset_at": 1770648349,
        "operating": 0.1015939712524414
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
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр `id` или `targetFolderId` ||
|| `DISK_OBJ_22000` | Файл с таким именем уже есть | Файл с таким именем уже есть ||
|| `DISK_FILE_22003` | Could not copy file | Ошибка при создании копии файла в базе данных ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Файл с указанным `id` или папка с указанным `targetFolderId` не найдены ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для копирования файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

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
- [{#T}](./disk-file-upload-version.md)
