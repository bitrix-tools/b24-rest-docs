# Прикрепить файлы к задаче tasks.task.files.attach

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.files.attach
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"fileId":1065,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.files.attach
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AttachFileResult = {
      attachmentId: number
    }

    try {
      const response = await $b24.actions.v2.call.make<AttachFileResult>({
        method: 'tasks.task.files.attach',
        params: {
          taskId: 8017,
          fileId: 1065,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Attachment ID:', result.attachmentId)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- UMD

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function attachFile() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.files.attach',
            params: {
              taskId: 8017,
              fileId: 1065,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Attachment ID:', result.attachmentId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', attachFile)
    </script>
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
