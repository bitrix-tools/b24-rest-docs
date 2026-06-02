# Удалить задачу tasks.task.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом удаления задачи

Метод `tasks.task.delete` удаляет задачу.

Проверить право на удаление задачи можно методом [проверки доступа к задаче](./tasks-task-get-access.md).

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8131}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8131,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.delete
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // The API wraps the deletion flag: result.task === true on success
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskDeleteResult = {
      task: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<TaskDeleteResult>({
        method: 'tasks.task.delete',
        params: {
          taskId: 8131 // ID of the task to delete
        },
        requestId: Text.getUuidRfc4122() // optional unique tracking id for this request
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else if (response.getData()!.result.task) {
        console.info('Task deleted successfully')
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
      async function deleteTask() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.delete',
            params: {
              taskId: 8131 // ID of the task to delete
            },
            requestId: B24Js.Text.getUuidRfc4122() // optional unique tracking id for this request
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          if (response.getData().result.task) {
            console.info('Task deleted successfully')
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteTask)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.delete',
                [
                    'taskId' => 8131
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.delete',
        {
            'taskId': 8131
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
        'tasks.task.delete',
        [
            'taskId' => 8131
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
        "task": true
    },
    "time": {
        "start": 1758184832.67041,
        "finish": 1758184832.961555,
        "duration": 0.29114508628845215,
        "processing": 0.2604410648345947,
        "date_start": "2025-09-18T11:40:32+03:00",
        "date_finish": "2025-09-18T11:40:32+03:00",
        "operating_reset_at": 1758185432,
        "operating": 0.2604219913482666
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Корневой элемент ответа ||
|| **task**
[`boolean`](../data-types.md) | Возвращает `true`, если задача успешно удалена ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"1048582",
    "error_description":"Нет доступа к удалению задачи"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | wrong task id | В параметре `taskId` указано значение неверного типа ||
|| `1048582` | Нет доступа к удалению задачи | У пользователя нет доступа к задаче или нет прав на удаление задачи ||
|| `100` | CTaskItem All parameters in the constructor must have real class type | Не указан обязательный параметр `taskId` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-add.md)
- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)
- [{#T}](./tasks-task-get-fields.md)

