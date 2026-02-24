# Список версий файла disk.file.getVersions

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного файла

Метод `disk.file.getVersions` возвращает список версий файла.

Версии возвращаются в порядке убывания даты создания.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор файла.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если файл находится в корне хранилища, и с помощью метода [disk.folder.getchildren](../folder/disk-folder-get-children.md), если файл находится в папке ||
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

Список доступных полей для фильтрации:

- `ID` — идентификатор версии
- `SIZE` — размер версии в байтах
- `NAME` — название файла на момент создания версии
- `CREATE_TIME` — время создания версии
- `CREATED_BY` — идентификатор пользователя, который создал версию
||
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
    -d '{"id":9043,"filter":{"NAME":"%тест%"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.getVersions
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9043,"filter":{"NAME":"%тест%"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.getVersions
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.getVersions',
            {
                id: 9043,
                filter: {
                    NAME: '%тест%',
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Fetched file versions:', result);
        
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
                'disk.file.getVersions',
                [
                    'id' => 9043,
                    'filter' => [
                        'NAME' => '%тест%'
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
        echo 'Error fetching file versions: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.getVersions",
        {
            id: 9043,
            filter: {
                NAME: '%тест%'
            },
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
        'disk.file.getVersions',
        [
            'id' => 9043,
            'filter' => [
                'NAME' => '%тест%'
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
        "ID": "7201",
        "OBJECT_ID": "9043",
        "SIZE": "21796",
        "NAME": "Тест №2.docx",
        "GLOBAL_CONTENT_VERSION": "5",
        "CREATE_TIME": "2026-02-17T12:21:22+03:00",
        "CREATED_BY": "1271",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=343794690000071b006e2cf2000004f500000746484b1f82771b3434ff80eb15edc8f8&token=disk%7CaWQ9NzIwMSZzZXJ2aWNlPXZlcnNpb24mXz0zdHFiVHY5bkNPWm5hVk1rRm92TXlzZUdUSDNTanlVZQ%3D%3D%7CImRvd25sb2FkfGRpc2t8YVdROU56SXdNU1p6WlhKMmFXTmxQWFpsY25OcGIyNG1YejB6ZEhGaVZIWTVia05QV201aFZrMXJSbTkyVFhselpVZFVTRE5UYW5sVlpRPT18MzQzNzk0NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDc0NjQ4NGIxZjgyNzcxYjM0MzRmZjgwZWIxNWVkYzhmOCI%3D.dy270nYUZXvxmyBAR1vYnUtn%2Bkn%2FSClb2cIWT8FkOn0%3D"
        },
        {
        "ID": "7199",
        "OBJECT_ID": "9043",
        "SIZE": "21756",
        "NAME": "тест.docx",
        "GLOBAL_CONTENT_VERSION": "3",
        "CREATE_TIME": "2026-02-17T12:15:06+03:00",
        "CREATED_BY": "1269",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=343794690000071b006e2cf2000004f500000746484b1f82771b3434ff80eb15edc8f8&token=disk%7CaWQ9NzE5OSZzZXJ2aWNlPXZlcnNpb24mXz1Uall3RkZRa0NPMTBncklPM2tYYmxNajRmSWQ2ekVLNg%3D%3D%7CImRvd25sb2FkfGRpc2t8YVdROU56RTVPU1p6WlhKMmFXTmxQWFpsY25OcGIyNG1YejFVYWxsM1JrWlJhME5QTVRCbmNrbFBNMnRZWW14TmFqUm1TV1EyZWtWTE5nPT18MzQzNzk0NjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDc0NjQ4NGIxZjgyNzcxYjM0MzRmZjgwZWIxNWVkYzhmOCI%3D.mtFVuU%2F1h4eGP1VROTj7n4PDUDOSc4suh90NuNPQyyQ%3D"
        }
    ],
    "total": 2,
    "time": {
        "start": 1771320110,
        "finish": 1771320110.716905,
        "duration": 0.7169051170349121,
        "processing": 0,
        "date_start": "2026-02-17T12:21:50+03:00",
        "date_finish": "2026-02-17T12:21:50+03:00",
        "operating_reset_at": 1771320710,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список версий файла.

Пустой массив означает, что нет версий, удовлетворяющих фильтру ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор версии ||
|| **OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор файла, к которому принадлежит версия ||
|| **SIZE**
[`integer`](../../data-types.md) | Размер версии в байтах ||
|| **NAME**
[`string`](../../data-types.md) | Название файла на момент создания версии ||
|| **GLOBAL_CONTENT_VERSION**
[`integer`](../../data-types.md) | Инкрементальный счетчик версии файла ||
|| **CREATE_TIME**
[`string`](../../data-types.md) | Время создания версии ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал версию ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка на скачивание версии ||
|| **total**
[`integer`](../../data-types.md) | Общее количество версий файла ||
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
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Файл с указанным `id` не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для получения версий файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-file-copy-to.md)
- [{#T}](./disk-file-delete.md)
- [{#T}](./disk-file-get-external-link.md)
- [{#T}](./disk-file-get-fields.md)
- [{#T}](./disk-file-get.md)
- [{#T}](./disk-file-mark-deleted.md)
- [{#T}](./disk-file-move-to.md)
- [{#T}](./disk-file-rename.md)
- [{#T}](./disk-file-restore-from-version.md)
- [{#T}](./disk-file-restore.md)
- [{#T}](./disk-file-upload-version.md)