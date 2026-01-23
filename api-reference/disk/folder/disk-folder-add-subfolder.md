# Создать дочернюю папку disk.folder.addsubfolder

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление» или «Редактирование» для нужной папки

Метод `disk.folder.addsubfolder` создает дочернюю папку.

Папка получит те же права доступа, что и ее родительская папка.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор родительской папки.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если папка находится в корне хранилища, и с помощью метода [disk.folder.getchildren](./disk-folder-get-children.md), если папка находится в другой папке
||
|| **data***
[`array`](../../data-types.md) | Массив с полем `NAME`, где `NAME` — имя дочерней папки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8907,"data":{"NAME":"Папка в папке"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.folder.addsubfolder
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8907,"data":{"NAME":"Папка в папке"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.folder.addsubfolder
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.folder.addsubfolder',
            {
                id: 8907,
                data: {
                    NAME: 'Папка в папке',
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Created subfolder with ID:', result);
        
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
                'disk.folder.addsubfolder',
                [
                    'id' => 8907,
                    'data' => [
                        'NAME' => 'Папка в папке'
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
        echo 'Error adding subfolder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.folder.addsubfolder",
        {
            id: 8907,
            data: {
                NAME: 'Папка в папке'
            },
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
        'disk.folder.addsubfolder',
        [
            'id' => 8907,
            'data' => [
                'NAME' => 'Папка в папке'
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
        "ID": 8930,
        "NAME": "Папка в папке",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "folder",
        "REAL_OBJECT_ID": 8930,
        "PARENT_ID": "8907",
        "DELETED_TYPE": 0,
        "CREATE_TIME": "2026-01-13T11:20:40+03:00",
        "UPDATE_TIME": "2026-01-13T11:20:40+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": null,
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/path/Папка/Папка в папке"
    },
    "time": {
        "start": 1768292440,
        "finish": 1768292440.894889,
        "duration": 0.8948891162872314,
        "processing": 0,
        "date_start": "2026-01-13T11:20:40+03:00",
        "date_finish": "2026-01-13T11:20:40+03:00",
        "operating_reset_at": 1768293040,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с данными о созданной папке ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор папки ||
|| **NAME**
[`string`](../../data-types.md) | Имя папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код папки ||
|| **STORAGE_ID**
[`integer`](../../data-types.md) | Идентификатор хранилища, в котором находится папка ||
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
|| **CREATE_TIME**
[`datetime`](../../data-types.md) | Дата и время создания папки ||
|| **UPDATE_TIME**
[`datetime`](../../data-types.md) | Дата и время последнего обновления папки ||
|| **DELETE_TIME**
[`datetime`](../../data-types.md) | Дата и время переноса папки в корзину ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего папку ||
|| **UPDATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, внесшего последнее изменение ||
|| **DELETED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, удалившего папку ||
|| **DETAIL_URL**
[`string`](../../data-types.md) | Ссылка для открытия папки в интерфейсе ||
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
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #1} | Не передано обязательное поле `NAME` в массиве `data` ||
|| `DISK_OBJ_22000` | Папка с таким именем уже есть | Папка с таким именем уже есть ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Папка с указанным `id` не найдена ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для создания папки ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-folder-copy-to.md)
- [{#T}](./disk-folder-delete-tree.md)
- [{#T}](./disk-folder-get-children.md)
- [{#T}](./disk-folder-get-external-link.md)
- [{#T}](./disk-folder-get-fields.md)
- [{#T}](./disk-folder-get.md)
- [{#T}](./disk-folder-mark-deleted.md)
- [{#T}](./disk-folder-move-to.md)
- [{#T}](./disk-folder-rename.md)
- [{#T}](./disk-folder-restore.md)
- [{#T}](./disk-folder-upload-file.md)