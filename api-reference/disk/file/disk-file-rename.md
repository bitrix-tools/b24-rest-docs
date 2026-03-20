# Переименовать файл disk.file.rename

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование» для нужного файла

Метод `disk.file.rename` переименовывает файл.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор файла.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если файл находится в корне хранилища, и с помощью метода [disk.folder.getchildren](../folder/disk-folder-get-children.md), если файл находится в папке ||
|| **newName***
[`string`](../../data-types.md) | Новое имя файла.

Имя файла нужно передавать вместе с расширением, соответствующим его формату. Если использовать имя без расширения или с расширением, не совпадающим с исходным, файл будет поврежден ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8964,"newName":"Новое имя файла.png"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.rename
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8964,"newName":"Новое имя файла.png","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.rename
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.rename',
            {
                id: 8964,
                newName: 'Новое имя файла.png'
            }
        );
        
        const result = response.getData().result;
        console.log('Renamed file with ID:', result);
        
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
                'disk.file.rename',
                [
                    'id' => 8964,
                    'newName' => 'Новое имя файла.png'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error renaming file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.rename",
        {
            id: 8964,
            newName: 'Новое имя файла.png'
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
        'disk.file.rename',
        [
            'id' => 8964,
            'newName' => 'Новое имя файла.png'
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
        "ID": "8964",
        "NAME": "Новое имя файла.png",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "file",
        "PARENT_ID": "9023",
        "DELETED_TYPE": "0",
        "GLOBAL_CONTENT_VERSION": "1",
        "FILE_ID": "32718",
        "SIZE": "52486",
        "CREATE_TIME": "2026-01-14T17:05:05+03:00",
        "UPDATE_TIME": "2026-02-17T11:59:55+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": "0",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=343794690000071b006e2cf2000004f500000746484b1f82771b3434ff80eb15edc8f8&token=disk%7CaWQ9ODk2NCZfPXU2V3NhdUVHeXBsY2thekFuTjB3ekNWMFd6d3dwVEZa%7CImRvd25sb2FkfGRpc2t8YVdROU9EazJOQ1pmUFhVMlYzTmhkVVZIZVhCc1kydGhla0Z1VGpCM2VrTldNRnQ2ZDNkd1ZFWmF8MzQzNzk0NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDc0NjQ4NGIxZjgyNzcxYjM0MzRmZjgwZWIxNWVkYzhmOCI%3D.6Rmg3D5ED7iWrkUSMB7E1%2FTrnlxTtQ3bf8H6drXRVM4%3D",
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/Новое имя файла.png"
    },
    "time": {
        "start": 1771318795,
        "finish": 1771318795.11888,
        "duration": 0.11888003349304199,
        "processing": 0,
        "date_start": "2026-02-17T11:59:55+03:00",
        "date_finish": "2026-02-17T11:59:55+03:00",
        "operating_reset_at": 1771319395,
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
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр `id` или `newName` ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Файл с указанным `id` не найден ||
|| `DISK_OBJ_22000` | Файл с таким именем уже есть | Файл с таким именем уже есть ||
||  `0` | Empty name | Передано пустое имя файла ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для переименования файла ||
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
- [{#T}](./disk-file-restore-from-version.md)
- [{#T}](./disk-file-restore.md)
- [{#T}](./disk-file-upload-version.md)
