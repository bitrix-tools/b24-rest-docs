# Загрузить новый файл в корень хранилища disk.storage.uploadfile

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление» для нужного хранилища

Метод `disk.storage.uploadfile` загружает новый файл в корень хранилища.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор хранилища, в которое нужно загрузить файл.

Идентификатор можно получить с помощью метода [disk.storage.getlist](../storage/disk-storage-get-list.md)
||
|| **data***
[`array`](../../data-types.md) | Массив с полем `NAME`, где `NAME` — имя файла ||
|| **fileContent***
[`array`](../../data-types.md) | Массив из имени файла и строки с [Base64](../../files/how-to-upload-files.md) ||
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

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1357,"data":{"NAME":"picture.png"},"fileContent":["picture.png","iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...RK5CYII="],"generateUniqueName":true,"rights":[{"TASK_ID":79,"ACCESS_CODE":"U1271"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.storage.uploadfile
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1357,"data":{"NAME":"picture.png"},"fileContent":["picture.png","iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...RK5CYII="],"generateUniqueName":true,"rights":[{"TASK_ID":79,"ACCESS_CODE":"U1271"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.storage.uploadfile
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.storage.uploadfile',
            {
                id: 1357,
                data: {
                    NAME: 'picture.png'
                },
                fileContent: [
                    'picture.png',
                    'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...RK5CYII='
                ],
                generateUniqueName: true,
                rights: [
                    {
                        TASK_ID: 79,
                        ACCESS_CODE: 'U1271'
                    }
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Uploaded file:', result);
        
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
                'disk.storage.uploadfile',
                [
                    'id' => 1357,
                    'data' => [
                        'NAME' => 'picture.png'
                    ],
                    'fileContent' => [
                        'picture.png',
                        'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...RK5CYII='
                    ],
                    'generateUniqueName' => true,
                    'rights' => [
                        [
                            'TASK_ID' => 79,
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
        "disk.storage.uploadfile",
        {
            id: 1357,
            data: {
                NAME: "picture.png"
            },
            fileContent: [
            'picture.png',
            'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...RK5CYII=',
            ],
            generateUniqueName: true,
            rights: [
                {
                    TASK_ID: 79,
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
        'disk.storage.uploadfile',
        [
            'id' => 1357,
            'data' => [
                'NAME' => 'picture.png'
            ],
            'fileContent' => [
                'picture.png',
                'iVBORw0KGgoAAAANSUhEUgAAAD4AAABDCAYAAADEfbZbAAAACXBIWXMAABJ0AAASdAHeZh94...RK5CYII='
            ],
            'generateUniqueName' => true,
            'rights' => [
                [
                    'TASK_ID' => 79,
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

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": 9035,
        "NAME": "picture.png",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "file",
        "PARENT_ID": "8875",
        "DELETED_TYPE": 0,
        "GLOBAL_CONTENT_VERSION": 1,
        "FILE_ID": 32895,
        "SIZE": "1679",
        "CREATE_TIME": "2026-02-02T16:01:59+03:00",
        "UPDATE_TIME": "2026-02-02T16:01:59+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": null,
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=b8d880690000071b006e2cf2000004f50000078dbaf74c54ad1b4e4205aba7ab57a395&token=disk%7CaWQ9OTAzNSZfPWU5eXpWQXpsVmJrdFE0OTJ3azBKQzNFVFVMek5UMTRU%7CImRvd25sb2FkfGRpc2t8YVdROU9UQXpOU1pmUFdVNWVYcFdRWHBzVm1KcmRGRTBPVEozYXpCS1F6TkZWRlZNZWs1VU1UUlV8YjhkODgwNjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDc4ZGJhZjc0YzU0YWQxYjRlNDIwNWFiYTdhYjU3YTM5NSI%3D.DJafMz5LAuRzlGbCxNLoGiCleoFwz1qGyj4iPf7n110%3D",
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/picture.png"
    },
    "time": {
        "start": 1770051719,
        "finish": 1770051719.707384,
        "duration": 0.7073841094970703,
        "processing": 0,
        "date_start": "2026-02-02T16:01:59+03:00",
        "date_finish": "2026-02-02T16:01:59+03:00",
        "operating_reset_at": 1770052319,
        "operating": 0.34273815155029297
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
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Хранилище с указанным `id` не найдено ||
|| `DISK_BASE_SERVICE_22001` | Error: required parameter NAME (DISK_BASE_SERVICE_22001) | Не указан обязательный параметр `NAME` в массиве `data` ||
|| `ERROR_COULD_NOT_SAVE_FILE` | Could not save file | Не удалось сохранить файл. Проверьте свободное место на Диске и корректность кодировки данных ||
|| — | Invalid rights format | Неверный формат параметра `rights` ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для добавления файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-storage-add-folder.md)
- [{#T}](./disk-storage-get-children.md)
- [{#T}](./disk-storage-get-fields.md)
- [{#T}](./disk-storage-get-for-app.md)
- [{#T}](./disk-storage-get-list.md)
- [{#T}](./disk-storage-get-types.md)
- [{#T}](./disk-storage-get.md)
- [{#T}](./disk-storage-rename.md)