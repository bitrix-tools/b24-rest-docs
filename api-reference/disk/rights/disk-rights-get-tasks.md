# Получить список доступных уровней доступа disk.rights.getTasks

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.rights.getTasks` возвращает список доступных уровней доступа.

Используйте полученные идентификаторы уровней доступа для установки прав на файлы при их загрузке. Указывайте идентификаторы как значение параметра `TASK_ID` в методах [disk.storage.uploadfile](../storage/disk-storage-upload-file.md) и [disk.folder.uploadfile](../folder/disk-folder-upload-file.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/disk.rights.getTasks
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.rights.getTasks
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.rights.getTasks',
            {}
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
                'disk.rights.getTasks',
                []
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
        'disk.rights.getTasks',
        {},
        function (result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.rights.getTasks',
        []
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
        "ID": "79",
        "NAME": "disk_access_full",
        "TITLE": "Полный доступ"
        },
        {
        "ID": "75",
        "NAME": "disk_access_edit",
        "TITLE": "Редактирование"
        },
        {
        "ID": "71",
        "NAME": "disk_access_read",
        "TITLE": "Чтение"
        }
    ],
    "time": {
        "start": 1766494790,
        "finish": 1766494790.095506,
        "duration": 0.09550595283508301,
        "processing": 0,
        "date_start": "2025-12-23T12:59:50+03:00",
        "date_finish": "2025-12-23T12:59:50+03:00",
        "operating_reset_at": 1766495390,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с доступными уровнями доступа ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор уровня доступа ||
|| **NAME**
[`string`](../../data-types.md) | Символьный код уровня доступа||
|| **TITLE**
[`string`](../../data-types.md) | Название уровня доступа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-upload-file-to-task.md)