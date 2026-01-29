# Получить список файлов и папок в корне хранилища disk.storage.getchildren

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.storage.getchildren` возвращает список файлов и папок, которые находятся в корне хранилища.

{% note info "" %}

Возвращаются только те файлы и папки, к которым у пользователя есть право «Чтение»

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор хранилища.

Идентификатор можно получить с помощью метода [disk.storage.getlist](./disk-storage-get-list.md) ||
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

Список доступных для фильтрации полей можно узнать с помощью метода [disk.folder.getfields](../folder/disk-folder-get-fields.md) ||
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

Список доступных для сортировки полей можно узнать с помощью метода [disk.folder.getfields](../folder/disk-folder-get-fields.md) ||
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
    -d '{"id":1357,"filter":{"NAME":"%Папка%"},"order":{"NAME":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.storage.getchildren
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1357,"filter":{"NAME":"%Папка%"},"order":{"NAME":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.storage.getchildren
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.storage.getchildren',
            {
                id: 1357,
                filter: {
                    NAME: '%Папка%',
                },
                order: {
                    NAME: 'DESC',
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Retrieved children:', result);
        
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
                'disk.storage.getchildren',
                [
                    'id' => 1357,
                    'filter' => [
                        'NAME' => '%Папка%'
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
        echo 'Error retrieving children: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.getchildren",
        {
            id: 1357,
            filter: {
                NAME: '%Папка%'
            },
            order: {
                NAME: 'DESC'
            }
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
        'disk.storage.getchildren',
        [
            'id' => 1357,
            'filter' => [
                'NAME' => '%Папка%'
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
            "ID": "8960",
            "NAME": "Папка в папке",
            "CODE": null,
            "STORAGE_ID": "1357",
            "TYPE": "folder",
            "REAL_OBJECT_ID": "8960",
            "PARENT_ID": "8875",
            "DELETED_TYPE": "0",
            "CREATE_TIME": "2026-01-14T15:01:14+03:00",
            "UPDATE_TIME": "2026-01-14T15:01:14+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1269",
            "UPDATED_BY": "1269",
            "DELETED_BY": "0",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/path/Папка в папке"
        },
        {
            "ID": "8907",
            "NAME": "Папка",
            "CODE": null,
            "STORAGE_ID": "1357",
            "TYPE": "folder",
            "REAL_OBJECT_ID": "8907",
            "PARENT_ID": "8875",
            "DELETED_TYPE": "0",
            "CREATE_TIME": "2025-12-30T14:16:49+03:00",
            "UPDATE_TIME": "2026-01-21T13:53:51+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1269",
            "UPDATED_BY": "1269",
            "DELETED_BY": "0",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/path/Папка"
        },
        {
            "ID": "9023",
            "NAME": "Новая папка",
            "CODE": null,
            "STORAGE_ID": "1357",
            "TYPE": "folder",
            "REAL_OBJECT_ID": "9023",
            "PARENT_ID": "8875",
            "DELETED_TYPE": "0",
            "CREATE_TIME": "2026-01-26T13:30:15+03:00",
            "UPDATE_TIME": "2026-01-26T13:30:15+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1269",
            "UPDATED_BY": "1269",
            "DELETED_BY": null,
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1269/disk/path/Новая папка"
        }
    ],
    "total": 3,
    "time": {
        "start": 1769539624,
        "finish": 1769539624.498846,
        "duration": 0.49884605407714844,
        "processing": 0,
        "date_start": "2026-01-26T14:47:04+03:00",
        "date_finish": "2026-01-26T14:47:04+03:00",
        "operating_reset_at": 1769540224,
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

Пустой массив означает, что у пользователя нет прав на просмотр файлов и папок, находящихся в корне хранилища ||
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
    "error_description":"Invalid value of parameter {Parameter #0}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #0} | Не указан обязательный параметр `id` ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Хранилище с указанным `id` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-storage-add-folder.md)
- [{#T}](./disk-storage-get-fields.md)
- [{#T}](./disk-storage-get-for-app.md)
- [{#T}](./disk-storage-get-list.md)
- [{#T}](./disk-storage-get-types.md)
- [{#T}](./disk-storage-get.md)
- [{#T}](./disk-storage-rename.md)
- [{#T}](./disk-storage-upload-file.md)