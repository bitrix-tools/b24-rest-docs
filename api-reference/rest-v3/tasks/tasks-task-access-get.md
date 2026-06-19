# Проверить права доступа tasks.task.access.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.access.get` проверяет доступные действия пользователя над задачей. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или старым методом [получения списка задач](../../tasks/tasks-task-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.access.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.access.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.access.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskAccessResult = {
      read: boolean
      watch: boolean
      mute: boolean
      createSubtask: boolean
      createResult: boolean
      edit: boolean
      remove: boolean
      complete: boolean
      approve: boolean
      disapprove: boolean
      start: boolean
      take: boolean
      delegate: boolean
      defer: boolean
      renew: boolean
      deadline: boolean
      datePlan: boolean
      changeDirector: boolean
      changeResponsible: boolean
      changeAccomplices: boolean
      pause: boolean
      timeTracking: boolean
      mark: boolean
      changeStatus: boolean
      reminder: boolean
      addAuditors: boolean
      elapsedTime: boolean
      favorite: boolean
      checklistAdd: boolean
      checklistEdit: boolean
      checklistSave: boolean
      checklistToggle: boolean
      automate: boolean
      resultEdit: boolean
      completeResult: boolean
      removeResult: boolean
      resultRead: boolean
      admin: boolean
      copy: boolean
      saveAsTemplate: boolean
      attachFile: boolean
      detachFile: boolean
      detachParent: boolean
      createGanttDependence: boolean
      sort: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<TaskAccessResult>({
        method: 'tasks.task.access.get',
        params: {
          id: 8017,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task access rights — edit:', result.edit, 'complete:', result.complete, 'remove:', result.remove)
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
      async function getTaskAccess() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'tasks.task.access.get',
            params: {
              id: 8017,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task access rights — edit:', result.edit, 'complete:', result.complete, 'remove:', result.remove)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskAccess)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.access.get',
                [
                    'id' => 8017,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```js
    BX24.callMethod(
        'tasks.task.access.get',
        {
            id: 8017,
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.access.get',
        [
            'id' => 8017,
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
        "read": true,
        "watch": true,
        "mute": true,
        "createSubtask": true,
        "createResult": true,
        "edit": true,
        "remove": true,
        "complete": true,
        "approve": false,
        "disapprove": false,
        "start": false,
        "take": false,
        "delegate": true,
        "defer": false,
        "renew": false,
        "deadline": true,
        "datePlan": true,
        "changeDirector": false,
        "changeResponsible": true,
        "changeAccomplices": true,
        "pause": false,
        "timeTracking": false,
        "mark": true,
        "changeStatus": true,
        "reminder": true,
        "addAuditors": true,
        "elapsedTime": true,
        "favorite": true,
        "checklistAdd": true,
        "checklistEdit": true,
        "checklistSave": true,
        "checklistToggle": true,
        "automate": true,
        "resultEdit": false,
        "completeResult": true,
        "removeResult": false,
        "resultRead": false,
        "admin": true,
        "copy": true,
        "saveAsTemplate": true,
        "attachFile": true,
        "detachFile": true,
        "detachParent": true,
        "createGanttDependence": true,
        "sort": false
    },
    "time": {
        "start": 1764849882,
        "finish": 1764849882.731575,
        "duration": 0.7315750122070312,
        "processing": 0,
        "date_start": "2025-12-04T15:04:42+03:00",
        "date_finish": "2025-12-04T15:04:42+03:00",
        "operating_reset_at": 1764850482,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект c описанием доступных действий для текущего пользователя ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `id` не указано",
                "field": "id"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса  

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Убедитесь, что значение — число, а не строка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-chat-message-send.md)
- [{#T}](./tasks-task-delete.md)
