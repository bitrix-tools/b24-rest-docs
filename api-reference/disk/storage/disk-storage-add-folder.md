# Создать папку в корне хранилища disk.storage.addfolder

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление» нужного хранилища

Метод `disk.storage.addfolder` создает папку в корне хранилища.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор хранилища.

Идентификатор можно получить с помощью метода [disk.storage.getlist](./disk-storage-get-list.md)
||
|| **data***
[`array`](../../data-types.md) | Массив с полем `NAME`, где `NAME` — имя новой папки ||
|| **rights**
[`array`](../../data-types.md) | Массив прав доступа на папку в формате `{"TASK_ID": 42, "ACCESS_CODE": "U35"}`, где
- `TASK_ID` — идентификатор уровня доступа
- `ACCESS_CODE` — код доступа, состоящий из буквенного кода пользователя или отдела и идентификатора

Категории пользователей:
- `U` — пользователь
- `*` — все пользователи
- `D` — все сотрудники отдела
- `DR` — все сотрудники отдела с подотделами

Список доступных идентификаторов `TASK_ID` для установки прав можно получить методом [disk.rights.getTasks](../rights/disk-rights-get-tasks.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1357,"data":{"NAME":"Новая папка"},"rights":[{"TASK_ID":71,"ACCESS_CODE":"U1271"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.storage.addfolder
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1357,"data":{"NAME":"Новая папка"},"rights":[{"TASK_ID":71,"ACCESS_CODE":"U1271"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.storage.addfolder
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.storage.addfolder',
            {
                id: 1357,
                data: {
                    NAME: 'Новая папка',
                },
                rights: [
                    {
                        TASK_ID: 71,
                        ACCESS_CODE: 'U1271'
                    }
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Created folder with ID:', result);
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
                'disk.storage.addfolder',
                [
                    'id' => 1357,
                    'data' => [
                        'NAME' => 'Новая папка'
                    ],
                    'rights' => [
                        [
                            'TASK_ID' => 71,
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
        echo 'Error adding folder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.addfolder",
        {
            id: 1357,
            data: {
                NAME: 'Новая папка'
            },
            rights: [
                {
                    TASK_ID: 71,
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
        'disk.storage.addfolder',
        [
            'id' => 1357,
            'data' => [
                'NAME' => 'Новая папка'
            ],
            'rights' => [
                [
                    'TASK_ID' => 71,
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
        "ID": 9031,
        "NAME": "Новая папка",
        "CODE": null,
        "STORAGE_ID": "1357",
        "TYPE": "folder",
        "REAL_OBJECT_ID": 9031,
        "PARENT_ID": "8875",
        "DELETED_TYPE": 0,
        "CREATE_TIME": "2026-01-28T17:23:11+03:00",
        "UPDATE_TIME": "2026-01-28T17:23:11+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1269",
        "UPDATED_BY": "1269",
        "DELETED_BY": null,
        "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/path/Новая папка"
    },
    "time": {
        "start": 1769610191,
        "finish": 1769610191.803601,
        "duration": 0.8036010265350342,
        "processing": 0,
        "date_start": "2026-01-28T17:23:11+03:00",
        "date_finish": "2026-01-28T17:23:11+03:00",
        "operating_reset_at": 1769610791,
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
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Хранилище с указанным `id` не найдено ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для создания папки ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-storage-get-children.md)
- [{#T}](./disk-storage-get-fields.md)
- [{#T}](./disk-storage-get-for-app.md)
- [{#T}](./disk-storage-get-list.md)
- [{#T}](./disk-storage-get-types.md)
- [{#T}](./disk-storage-get.md)
- [{#T}](./disk-storage-rename.md)
- [{#T}](./disk-storage-upload-file.md)