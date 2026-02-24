# Восстановить файл из конкретной версии disk.file.restoreFromVersion

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Полный доступ» для нужного файла

Метод `disk.file.restoreFromVersion` восстанавливает файл из конкретной версии.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор файла.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если файл находится в корне хранилища, и с помощью метода [disk.folder.getchildren](../folder/disk-folder-get-children.md), если файл находится в папке ||
|| **versionId***
[`integer`](../../data-types.md) | Идентификатор версии файла.

Идентификатор можно получить с помощью метода [disk.file.getVersions](./disk-file-get-versions.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9043,"versionId":7199}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.restoreFromVersion
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9043,"versionId":7199,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.restoreFromVersion
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.restoreFromVersion',
            {
                id: 9043,
                versionId: 7199
            }
        );
        
        const result = response.getData().result;
        console.log('Restored file from version with ID:', result);
        
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
                'disk.file.restoreFromVersion',
                [
                    'id' => 9043,
                    'versionId' => 7199
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error restoring file from version: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.restoreFromVersion",
        {
            id: 9043,
            versionId: 7199
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
        'disk.file.restoreFromVersion',
        [
            'id' => 9043,
            'versionId' => 7199
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
        "GLOBAL_CONTENT_VERSION": 6,
        "FILE_ID": "32983",
        "SIZE": "21756",
        "CREATE_TIME": "2026-02-16T12:52:05+03:00",
        "UPDATE_TIME": "2026-02-17T12:33:15+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": "0",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=343794690000071b006e2cf2000004f500000746484b1f82771b3434ff80eb15edc8f8&token=disk%7CaWQ9OTA0MyZfPVM4bEhYNjhjOWN2cmd0QlFnUHo1U3BVUzBaRTBXM3ZP%7CImRvd25sb2FkfGRpc2t8YVdROU9UQTBNeVpmUFZNNGJFaFlOamhqT1dOMmNtZDBRbEZuVUhvMVUzQlZVekJhUlRCWE0zWlB8MzQzNzk0NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDc0NjQ4NGIxZjgyNzcxYjM0MzRmZjgwZWIxNWVkYzhmOCI%3D.oJ%2BsjpEomvXjuciM5ixZPUhh037HG8qHi%2BdU49CNyFo%3D",
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/Папка/Папка/Тест №2.docx"
    },
    "time": {
        "start": 1771320794,
        "finish": 1771320795.058413,
        "duration": 1.058413028717041,
        "processing": 1,
        "date_start": "2026-02-17T12:33:14+03:00",
        "date_finish": "2026-02-17T12:33:15+03:00",
        "operating_reset_at": 1771321394,
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
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр `id` или `versionId` ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Файл с указанным `id` не найден ||
|| `DISK_FILE_22003` | Could not copy file | Не удалось скопировать версию файла ||
|| `DISK_FILE_22004` | Невозможно восстановить версию из другого файла | Версия принадлежит другому файлу ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для восстановления версии файла ||
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
- [{#T}](./disk-file-restore.md)
- [{#T}](./disk-file-upload-version.md)