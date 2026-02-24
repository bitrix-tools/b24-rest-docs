# Удалить файл навсегда disk.file.delete

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Полный доступ» для нужного файла

Метод `disk.file.delete` удаляет файл навсегда.

Если вы хотите переместить файл в корзину, используйте метод [disk.file.markdeleted](./disk-file-mark-deleted.md).

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор файла.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если файл находится в корне хранилища, и с помощью метода [disk.folder.getchildren](../folder/disk-folder-get-children.md), если файл находится в папке
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9035}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9035,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.delete',
            {
                id: 9035,
            }
        );
        
        const result = response.getData().result;
        console.log('Deleted file with ID:', result);
        
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
                'disk.file.delete',
                [
                    'id' => 9035
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.delete",
        {
            id: 9035
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
        'disk.file.delete',
        [
            'id' => 9035
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
    "result": true,
    "time": {
        "start": 1770649732,
        "finish": 1770649732.50942,
        "duration": 0.5094199180603027,
        "processing": 0,
        "date_start": "2026-02-09T13:08:52+03:00",
        "date_finish": "2026-02-09T13:08:52+03:00",
        "operating_reset_at": 1770650332,
        "operating": 0.2615058422088623
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если файл удален успешно ||
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
|| `DISK_FILE_22007` | Exclusive lock | Файл открыт на редактирование другим пользователем ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для удаления файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-file-copy-to.md)
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