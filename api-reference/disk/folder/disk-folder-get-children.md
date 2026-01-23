# Получить список файлов и папок, находящихся в папке disk.folder.getchildren

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для файлов и папок

Метод `disk.folder.getchildren` возвращает список файлов и папок, которые находятся в папке. 

{% note info "" %}

Возвращаются только те файлы и папки, к которым у пользователя есть право «Чтение»

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор папки.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если папка находится в корне хранилища, и с помощью метода [disk.folder.getchildren](./disk-folder-get-children.md), если папка находится в другой папке ||
|| **filter**
[`array`](../../data-types.md) | Массив формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет произведена фильтрация
- `value_n` — значение фильтра

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Список доступных для фильтрации полей можно узнать с помощью метода [disk.folder.getfields](./disk-folder-get-fields.md) ||
|| **order**
[`array`](../../data-types.md) | Массив формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет произведена сортировка
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных для сортировки полей можно узнать с помощью метода [disk.folder.getfields](./disk-folder-get-fields.md) ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8907,"filter":{">=CREATE_TIME":"2026-01-12"},"order":{"NAME":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.folder.getchildren
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8907,"filter":{">=CREATE_TIME":"2026-01-12"},"order":{"NAME":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.folder.getchildren
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.folder.getchildren',
            {
                id: 8907,
                filter: {
                    '>=CREATE_TIME': '2026-01-12'
                },
                order: {
                    NAME: 'DESC'
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Data:', result);
        
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
                'disk.folder.getchildren',
                [
                    'id' => 8907,
                    'filter' => [
                        '>=CREATE_TIME' => '2026-01-12'
                    ],
                    'order' => [
                        'NAME' => 'DESC'
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
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.folder.getchildren",
        {
            id: 8907,
            filter: {
                '>=CREATE_TIME': '2026-01-12'
            },
            order: {
                NAME: 'DESC'
            }
        },
        function (result) {
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
        'disk.folder.getchildren',
        [
            'id' => 8907,
            'filter' => [
                '>=CREATE_TIME' => '2026-01-12'
            ],
            'order' => [
                'NAME' => 'DESC'
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
    "result": [
        {
            "ID": "8930",
            "NAME": "Папка в папке",
            "CODE": null,
            "STORAGE_ID": "1357",
            "TYPE": "folder",
            "REAL_OBJECT_ID": "8930",
            "PARENT_ID": "8907",
            "DELETED_TYPE": "0",
            "CREATE_TIME": "2026-01-13T16:16:35+03:00",
            "UPDATE_TIME": "2026-01-13T16:16:35+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1269",
            "UPDATED_BY": "1269",
            "DELETED_BY": "0",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/path/Папка/Папка в папке"
        },
        {
            "ID": "8964",
            "NAME": "Картинка.png",
            "CODE": null,
            "STORAGE_ID": "1357",
            "TYPE": "file",
            "PARENT_ID": "8907",
            "DELETED_TYPE": "0",
            "GLOBAL_CONTENT_VERSION": "1",
            "FILE_ID": "32718",
            "SIZE": "52486",
            "CREATE_TIME": "2026-01-14T17:05:05+03:00",
            "UPDATE_TIME": "2026-01-14T17:05:39+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1269",
            "UPDATED_BY": "1269",
            "DELETED_BY": "0",
            "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=d9c467690000071b006e2cf2000004f5000007248f2adc44d050ace99adb3cb9d0f1aa&token=disk%7CaWQ9ODk2NCZfPU9zTE4wUFNMRVBacFJiZXF6Q203dkY4d3V6ZUQyd0Rt%7CImRvd25sb2FkfGRpc2t8YVdROU9EazJOQ1pmUFU5elRFNHdVRk5NUlZCYWNGSmlaWEY2UTIwM2RrWTRkM1Y2WlVReWQwUnR8ZDljNDY3NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDcyNDhmMmFkYzQ0ZDA1MGFjZTk5YWRiM2NiOWQwZjFhYSI%3D.oSqXbtR%2FjZL8%2BfY%2BUvgqYQdxoHVh7PCvocXUvtS9n4s%3D",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/file/Папка/Картинка.png"
        },
        {
            "ID": "8936",
            "NAME": "Документы",
            "CODE": null,
            "STORAGE_ID": "1357",
            "TYPE": "folder",
            "REAL_OBJECT_ID": "8936",
            "PARENT_ID": "8907",
            "DELETED_TYPE": "0",
            "CREATE_TIME": "2026-01-13T17:00:40+03:00",
            "UPDATE_TIME": "2026-01-14T17:05:25+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1271",
            "UPDATED_BY": "1271",
            "DELETED_BY": "0",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/path/Папка/Документы"
        }
    ],
    "total": 3,
    "time": {
        "start": 1768407161,
        "finish": 1768407161.323201,
        "duration": 0.32320094108581543,
        "processing": 0,
        "date_start": "2026-01-14T17:12:41+03:00",
        "date_finish": "2026-01-14T17:12:41+03:00",
        "operating_reset_at": 1768407761,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список файлов и папок с описанием полей.

Пустой массив означает, что у пользователя нет прав на просмотр файлов и папок, находящихся в указанной папке ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор файла/папки ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла/папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код файла/папки ||
|| **STORAGE_ID**
[`integer`](../../data-types.md) | Идентификатор хранилища, в котором находится файл/папка ||
|| **TYPE**
[`enum`](../../data-types.md) | Тип объекта ||
|| **REAL_OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор объекта ||
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
[`datetime`](../../data-types.md) | Дата и время создания файла/папки ||
|| **UPDATE_TIME**
[`datetime`](../../data-types.md) | Дата и время последнего обновления файла/папки ||
|| **DELETE_TIME**
[`datetime`](../../data-types.md) | Дата и время переноса файла/папки в корзину ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего файл/папку ||
|| **UPDATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, внесшего последнее изменение ||
|| **DELETED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, удалившего файл/папку ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|| **DETAIL_URL**
[`string`](../../data-types.md) | Ссылка для открытия файла/папки в интерфейсе ||
|| **total**
[`integer`](../../data-types.md) | Общее количество файлов и папок ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_ARGUMENT",
    "error_description":"Invalid value of parameter {Parameter #1}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #1} | Не указан обязательный параметр `id` ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Папка с указанным `id` не найдена ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-folder-add-subfolder.md)
- [{#T}](./disk-folder-copy-to.md)
- [{#T}](./disk-folder-delete-tree.md)
- [{#T}](./disk-folder-get-external-link.md)
- [{#T}](./disk-folder-get-fields.md)
- [{#T}](./disk-folder-get.md)
- [{#T}](./disk-folder-mark-deleted.md)
- [{#T}](./disk-folder-move-to.md)
- [{#T}](./disk-folder-rename.md)
- [{#T}](./disk-folder-restore.md)
- [{#T}](./disk-folder-share-to-user.md)
- [{#T}](./disk-folder-upload-file.md)
