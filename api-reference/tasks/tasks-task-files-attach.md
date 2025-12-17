# Прикрепить файлы к задаче tasks.task.files.attach

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: постановщик задачи или пользователь с доступом к редактированию задачи

Метод `tasks.task.files.attach` добавляет файл с Диска в задачу. У пользователя должен быть доступ к файлу на чтение или выше.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи, к которой нужно прикрепить файл.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md)
||
|| **fileId***
[`integer`](../data-types.md) | Идентификатор файла на Диске.

Получить идентификатор файла можно двумя способами.

Использовать один из методов загрузки файла:
  - [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md)
  - [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:
  - [disk.storage.getchildren](../disk/storage/disk-storage-get-children.md)
  - [disk.folder.getchildren ](../disk/folder/disk-folder-get-children.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"fileId":1065}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.files.attach
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"fileId":1065,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.files.attach
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.files.attach',
            {
                taskId: 8017,
                fileId: 1065
            }
        );
        
        const result = response.getData().result;
        console.log('File attached:', result);
        
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
                'tasks.task.files.attach',
                [
                    'taskId' => 8017,
                    'fileId' => 1065
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error attaching file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.files.attach',
        {
            taskId: 8017,
            fileId: 1065
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.files.attach',
        [
            'taskId' => 8017,
            'fileId' => 1065
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
        "attachmentId": 1079
    },
    "time": {
        "start": 1758806783,
        "finish": 1758806783.609955,
        "duration": 0.6099550724029541,
        "processing": 0,
        "date_start": "2025-09-25T16:26:23+03:00",
        "date_finish": "2025-09-25T16:26:23+03:00",
        "operating_reset_at": 1758807383,
        "operating": 0.4156019687652588
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит объект с описанием прикрепленного файла ||
|| **attachmentId**
[`integer`](../data-types.md) | Идентификатор прикрепления файла к задаче.

Получить данные о файле по идентификатору прикрепления можно методом [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md)  ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {fileId} (internal error)"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | CTaskItem All parameters in the constructor must have real class type (internal error) | Не указан обязательный параметр `taskId` ||
|| `0` | wrong task id (internal error) | В параметре `taskId` указано значение неверного типа ||
|| `100` | Could not find value for parameter \{fileId\} (internal error) | Не указан обязательный параметр `fileId` ||
|| `100` | Invalid value {value} to match with parameter \{fileId\}. Should be value of type int. (internal error) | В параметре `fileId` указано значение неверного типа ||
|| `ERROR_CORE` | Недостаточно прав.\\u003Cbr\\u003E | Нет доступа к указанному файлу ||
|| `0` | Access denied (internal error) | Недостаточно прав на изменение задачи ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](../../tutorials/tasks/how-to-upload-file-to-task.md)
- [{#T}](./tasks-task-get.md)
