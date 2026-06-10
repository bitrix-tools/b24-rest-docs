# Добавить задачу в канбан Скрама tasks.api.scrum.kanban.addTask

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет задачу в канбан Скрама.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sprintId***
[`integer`](../../../data-types.md) | Идентификатор спринта. Получить идентификатор можно при помощи метода [tasks.api.scrum.sprint.list](../sprint/tasks-api-scrum-sprint-list.md) ||
|| **taskId***
[`integer`](../../../data-types.md) | Идентификатор задачи. Получить идентификатор можно при помощи метода [tasks.task.list](../../../tasks/tasks-task-list.md) ||
|| **stageId***
[`integer`](../../../data-types.md) | Идентификатор стадии. Получить идентификатор можно при помощи метода [tasks.api.scrum.kanban.getStages](./tasks-api-scrum-kanban-get-stages.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"sprintId":5,"taskId":751,"stageId":58}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.kanban.addTask
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"sprintId":5,"taskId":751,"stageId":58,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.kanban.addTask
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'tasks.api.scrum.kanban.addTask',
        params: {
          sprintId: 5,
          taskId: 751,
          stageId: 58,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task added to kanban:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addTaskToKanban() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.kanban.addTask',
            params: {
              sprintId: 5,
              taskId: 751,
              stageId: 58,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task added to kanban:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskToKanban)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.kanban.addTask',
                [
                    'sprintId' => 5,
                    'taskId'   => 751,
                    'stageId'  => 58,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.kanban.addTask',
        {
            "sprintId": 5,
            "taskId": 751,
            "stageId": 58,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.api.scrum.kanban.addTask',
        [
            'sprintId' => 5,
            'taskId' => 751,
            'stageId' => 58
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
    "time":{
        "start":1712137817.343984,
        "finish":1712137817.605804,
        "duration":0.26182007789611816,
        "processing":0.018325090408325195,
        "date_start":"2024-04-03T12:50:17+03:00",
        "date_finish":"2024-04-03T12:50:17+03:00"
    }
}
```

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"TaskId id not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Sprint id not found` | Не заполнено обязательное поле `sprintId` ||
|| `0` | `TaskId id not found` | Не заполнено обязательное поле `taskId` ||
|| `0` | `StageId id not found` | Не заполнено обязательное поле `stageId` ||
|| `0` | `Sprint not found` | Передан неизвестный идентификатор спринта ||
|| `0` | `Stage not found` | Передан неизвестный идентификатор стадии ||
|| `0` | `Task not found. The task must be with GROUP_ID` | Передан неизвестный идентификатор задачи или задача не принадлежит группе спринта ||
|| `0` | `Access denied` | Доступ запрещен ||
|| `0` | Неизвестная ошибка | ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-kanban-add-stage.md)
- [{#T}](./tasks-api-scrum-kanban-update-stage.md)
- [{#T}](./tasks-api-scrum-kanban-delete-stage.md)
- [{#T}](./tasks-api-scrum-kanban-delete-task.md)
- [{#T}](./tasks-api-scrum-kanban-get-fields.md)
- [{#T}](./tasks-api-scrum-kanban-get-stages.md)