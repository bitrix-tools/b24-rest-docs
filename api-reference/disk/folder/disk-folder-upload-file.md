# Загрузить новый файл в указанную папку disk.folder.uploadfile

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление» для нужной папки

Метод `disk.folder.uploadfile` загружает новый файл в указанную папку.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор папки, в которую нужно загрузить файл.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если папка находится в корне хранилища, и с помощью метода [disk.folder.getchildren](./disk-folder-get-children.md), если папка находится в другой папке
||
|| **data***
[`array`](../../data-types.md) | Массив с полем `NAME`, где `NAME` — имя файла.

Необязателен, если файл загружается не напрямую, а через URL. Пример загрузки файла через URL [ниже](#uploadurl)  ||
|| **fileContent**
[`array`](../../data-types.md) | Массив из имени файла и строки с [Base64](../../files/how-to-upload-files.md).

Если параметр не передан, метод не загружает файл, а возвращает URL для загрузки `UploadUrl` и имя поля формы `field` ||
|| **rights**
[`array`](../../data-types.md) | Массив прав доступа на загружаемый файл в формате `{"TASK_ID": 42, "ACCESS_CODE": "U35"}`, где
- `TASK_ID` — идентификатор уровня доступа
- `ACCESS_CODE` — код доступа, состоящий из буквенного кода пользователя или отдела и идентификатора

Категории пользователей:
- `U` — пользователь
- `*` — все пользователи
- `D` — все сотрудники отдела
- `DR` — все сотрудники отдела с подотделами

Список доступных идентификаторов `TASK_ID` для установки прав можно получить методом [disk.rights.getTasks](../rights/disk-rights-get-tasks.md) ||
|| **generateUniqueName**
[`boolean`](../../data-types.md) | Генерация уникального имени файла, если файл с таким именем уже существует. Например, file (1).docx.

Возможные значения:
- `true` — генерировать
- `false` — не генерировать

По умолчанию — `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

### Прямая загрузка файла

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8930,"data":{"NAME":"test.png"},"fileContent":["test.png","iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...rk5CYII="],"generateUniqueName":true,"rights":[{"TASK_ID":75,"ACCESS_CODE":"U1271"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.folder.uploadfile
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8930,"data":{"NAME":"test.png"},"fileContent":["test.png","iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...rk5CYII="],"generateUniqueName":true,"rights":[{"TASK_ID":75,"ACCESS_CODE":"U1271"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.folder.uploadfile
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'disk.folder.uploadfile',
            {
                id: 8930,
                data: {
                    NAME: 'test.png',
                },
                fileContent: [
                    'test.png',
                    'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...rk5CYII=',
                ],
                generateUniqueName: true,
                rights: [
                    {
                        TASK_ID: 75,
                        ACCESS_CODE: 'U1271'
                    }
                ]
            }
        );

        const result = response.getData().result;
        console.log(result);
        processResult(result);
    } catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'disk.folder.uploadfile',
                [
                    'id' => 8930,
                    'data' => [
                        'NAME' => 'test.png'
                    ],
                    'fileContent' => [
                        'test.png',
                        'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...rk5CYII='
                    ],
                    'generateUniqueName' => true,
                    'rights' => [
                        [
                            'TASK_ID' => 75,
                            'ACCESS_CODE' => 'U1271'
                        ]
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
        echo 'Error uploading file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.folder.uploadfile",
        {
            id: 8930,
            data: {
                NAME: "test.png"
            },
            fileContent: [
            'test.png',
            'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...rk5CYII=',
            ],
            generateUniqueName: true,
            rights: [
                {
                    TASK_ID: 75,
                    ACCESS_CODE: 'U1271'
                }
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
        'disk.folder.uploadfile',
        [
            'id' => 8930,
            'data' => [
                'NAME' => 'test.png'
            ],
            'fileContent' => [
                'test.png',
                'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...rk5CYII='
            ],
            'generateUniqueName' => true,
            'rights' => [
                [
                    'TASK_ID' => 75,
                    'ACCESS_CODE' => 'U1271'
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Загрузка файла через URL {#uploadurl}

1. Вызовите метод и передайте только `ID` папки.

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":8930}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.folder.uploadfile
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":8930,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/disk.folder.uploadfile
        ```

    - JS

        ```js
        try
        {
            const response = await $b24.callMethod(
                'disk.folder.uploadfile',
                {
                    id: 8930,
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
                    'disk.folder.uploadfile',
                    [
                        'id' => 8930
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error uploading file: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            "disk.folder.uploadfile",
            {
                id: 8930
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
            'disk.folder.uploadfile',
            [
                'id' => 8930
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. В ответ вы получите URL для загрузки `UploadUrl` и имя поля формы `field`.

    ```json
    "result": {
            "field": "file",
            "uploadUrl": "https://test.bitrix24.ru/rest/upload.json?auth=929b78690000071b006e2cf2000004f5000007dde54ef79d3b6e5c447d8f8a714563bd&token=disk%7CaWQ9ODkzMCZnZW5lcmF0ZVVuaXF1ZU5hbWU9MCZfPU4zS0pqUFJiVDFSengzUmpUaTVPcGM4R1VQTlFkTWU0%7CInVwbG9hZHxkaXNrfGFXUTlPRGt6TUNablpXNWxjbUYwWlZWdWFYRjFaVTVoYldVOU1DWmZQVTR6UzBwcVVGSmlWREZTZW5nelVtcFVhVFZQY0dNNFIxVlFUbEZrVFdVMHw5MjliNzg2OTAwMDAwNzFiMDA2ZTJjZjIwMDAwMDRmNTAwMDAwN2RkZTU0ZWY3OWQzYjZlNWM0NDdkOGY4YTcxNDU2M2JkIg%3D%3D.OHwSxVni%2FKX9Pw%2FyMzpfR974ImX5bC0sigTqA0UTCp8%3D"
            },
        "time": {
            "start": 1769511710,
            "finish": 1769511710.411701,
            "duration": 0.411700963973999,
            "processing": 0,
            "date_start": "2026-01-27T14:01:50+03:00",
            "date_finish": "2026-01-27T14:01:50+03:00",
            "operating_reset_at": 1769512310,
            "operating": 0
        }
    ```
3. Отправьте файл на полученный адрес `UploadUrl` с помощью POST-запроса, используя тип `multipart/form-data`. Имя поля для файла внутри этого запроса должно совпадать со значением параметра `field` из ответа.

    ```
    http --form POST "https://test.bitrix24.ru/rest/upload.json?auth=929b78690000071b006e2cf2000004f5000007dde54ef79d3b6e5c447d8f8a714563bd&token=disk%7CaWQ9ODkzMCZnZW5lcmF0ZVVuaXF1ZU5hbWU9MCZfPU4zS0pqUFJiVDFSengzUmpUaTVPcGM4R1VQTlFkTWU0%7CInVwbG9hZHxkaXNrfGFXUTlPRGt6TUNablpXNWxjbUYwWlZWdWFYRjFaVTVoYldVOU1DWmZQVTR6UzBwcVVGSmlWREZTZW5nelVtcFVhVFZQY0dNNFIxVlFUbEZrVFdVMHw5MjliNzg2OTAwMDAwNzFiMDA2ZTJjZjIwMDAwMDRmNTAwMDAwN2RkZTU0ZWY3OWQzYjZlNWM0NDdkOGY4YTcxNDU2M2JkIg%3D%3D.OHwSxVni%2FKX9Pw%2FyMzpfR974ImX5bC0sigTqA0UTCp8%3D" file@/path/to/file.png
    ```
4. В случае успеха сервер вернет массив с данными о загруженном файле.

### Загрузка файла через URL на PHP

{% list tabs %}

- PHP CRest

    ```php
    <?php
    require_once (__DIR__.'/crest.php');

    $path = __DIR__ . '/pic.jpg';
    $folderId = 1;

    $result = [];
    if (file_exists($path))
    {
        $file = CRest::call(
            'disk.folder.uploadfile',
            [
                'id' => $folderId,
            ]
        );
        if (!empty($file['result']['uploadUrl']))
        {
            $info = pathinfo($path);
            if ($info['basename'])
            {
                $delimiter = '-------------' . uniqid('', true);
                $name = $info['basename'];
                $mime = mime_content_type($path);
                $content = file_get_contents($path);

                $body = '--' . $delimiter. "\r\n";
                $body .= 'Content-Disposition: form-data; name="file"';
                $body .= '; filename="' . $name . '"' . "\r\n";
                $body .= 'Content-Type: ' . $mime . "\r\n\r\n";
                $body .= $content . "\r\n";
                $body .= "--" . $delimiter . "--\r\n";

                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $file['result']['uploadUrl']);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
                curl_setopt(
                    $ch,
                    CURLOPT_HTTPHEADER,
                    [
                        'Content-Type: multipart/form-data; boundary=' . $delimiter,
                        'Content-Length: ' . strlen($body),
                    ]
                );
                $out = curl_exec($ch);
                try
                {
                    $result = json_decode($out, true, 512, JSON_THROW_ON_ERROR);
                }
                catch (JsonException $e)
                {
                    $result = [
                        'error' => $e->getMessage(),
                    ];
                }
            }
        }
    }

    echo '<pre>';
        print_r($result);
    echo '</pre>';
    ?>
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": 9011,
        "NAME": "test.png",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "file",
        "PARENT_ID": "8930",
        "DELETED_TYPE": 0,
        "GLOBAL_CONTENT_VERSION": 1,
        "FILE_ID": 32877,
        "SIZE": "1679",
        "CREATE_TIME": "2026-01-27T13:06:55+03:00",
        "UPDATE_TIME": "2026-01-27T13:06:55+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": null,
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=929b78690000071b006e2cf2000004f5000007dde54ef79d3b6e5c447d8f8a714563bd&token=disk%7CaWQ9OTAxMSZfPUFKQTNyWWVLZkxVdEw0VDRjY1QyOGpyN1NqYXZneFRI%7CImRvd25sb2FkfGRpc2t8YVdROU9UQXhNU1pmUFVGS1FUTnlXV1ZMWmt4VmRFdzBWRFJqWTFReU9HcHlOMU5xWVhabmVGUkl8OTI5Yjc4NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDdkZGU1NGVmNzlkM2I2ZTVjNDQ3ZDhmOGE3MTQ1NjNiZCI%3D.XX%2BUFpxsl2eoLuCwolEaMKsrAJ5IIpIPmzg1j6QOuE0%3D",
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/Папка/Папка в папке/test.png"
    },
    "time": {
        "start": 1769508415,
        "finish": 1769508416.040339,
        "duration": 1.0403389930725098,
        "processing": 1,
        "date_start": "2026-01-27T13:06:55+03:00",
        "date_finish": "2026-01-27T13:06:56+03:00",
        "operating_reset_at": 1769509015,
        "operating": 0.7169051170349121
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
[`string`](../../data-types.md) | Инкрементальный счетчик версии файла ||
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
    "error":"ERROR_NOT_FOUND",
    "error_description":"Could not find entity with id `X`"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр `id` ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Папка с указанным `id` не найдена ||
|| `DISK_BASE_SERVICE_22001` | Error: required parameter NAME (DISK_BASE_SERVICE_22001) | Не указан обязательный параметр `NAME` в массиве `data` ||
|| `ERROR_COULD_NOT_SAVE_FILE` | Could not save file | Не удалось сохранить файл. Проверьте свободное место на Диске и корректность кодировки данных ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для добавления файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-folder-add-subfolder.md)
- [{#T}](./disk-folder-copy-to.md)
- [{#T}](./disk-folder-delete-tree.md)
- [{#T}](./disk-folder-get-children.md)
- [{#T}](./disk-folder-get-external-link.md)
- [{#T}](./disk-folder-get-fields.md)
- [{#T}](./disk-folder-get.md)
- [{#T}](./disk-folder-move-to.md)
- [{#T}](./disk-folder-rename.md)
- [{#T}](./disk-folder-restore.md)
- [{#T}](./disk-folder-share-to-user.md)