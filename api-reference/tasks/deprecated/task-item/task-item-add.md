# Добавить задачу task.item.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новую задачу. Возвращает идентификатор добавленной задачи. Доступны следующие [поля](./index.md).

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [tasks.task.add](../../tasks-task-add.md).

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKDATA**
[`array`](../../../data-types.md) | Массив полей данных по задаче (`TITLE`, `DESCRIPTION` и так далее) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Создание задачи.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"created via REST API at **current_datetime_here**","RESPONSIBLE_ID":1,"DEADLINE":"2013-05-13T16:06:06+03:00"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"created via REST API at **current_datetime_here**","RESPONSIBLE_ID":1,"DEADLINE":"2013-05-13T16:06:06+03:00"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // task.item.add returns the ID of the newly created task
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskItemAddResult = number

    try {
      const response = await $b24.actions.v2.call.make<TaskItemAddResult>({
        method: 'task.item.add',
        params: {
          fields: {
            TITLE: 'created via REST API at ' + new Date().toLocaleString(),
            RESPONSIBLE_ID: 1,
            DEADLINE: '2013-05-13T16:06:06+03:00',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New task ID:', result)
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
      async function addTaskItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.item.add',
            params: {
              fields: {
                TITLE: 'created via REST API at ' + new Date().toLocaleString(),
                RESPONSIBLE_ID: 1,
                DEADLINE: '2013-05-13T16:06:06+03:00',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('New task ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskItem)
    </script>
    ```

- PHP


    ```php
    try {
        $dt = new DateTime();
        $response = $b24Service
            ->core
            ->call(
                'task.item.add',
                [
                    [
                        'TITLE'         => 'created via REST API at ' . $dt->format('Y-m-d H:i:s'),
                        'RESPONSIBLE_ID' => 1,
                        'DEADLINE'      => '2013-05-13T16:06:06+03:00',
                    ],
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
        echo 'Error adding task item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var dt = new Date();
    BX24.callMethod(
        'task.item.add',
        [{TITLE: 'created via REST API at ' + dt.toLocaleString(), RESPONSIBLE_ID: 1, DEADLINE: '2013-05-13T16:06:06+03:00'}],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $dt = new DateTime();
    $title = 'created via REST API at ' . $dt->format('Y-m-d H:i:s');

    $result = CRest::call(
        'task.item.add',
        [
            'fields' => [
                'TITLE' => $title,
                'RESPONSIBLE_ID' => 1,
                'DEADLINE' => '2013-05-13T16:06:06+03:00'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Пример записи значений с CRM.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // task.item.update returns true on success
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskItemUpdateResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<TaskItemUpdateResult>({
        method: 'task.item.update',
        params: {
          TASKID: 1,
          FIELDS: {
            UF_CRM_TASK: ['L_4', 'C_7', 'CO_5', 'D_10'],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task CRM fields updated:', result)
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
      async function updateTaskCrmFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.item.update',
            params: {
              TASKID: 1,
              FIELDS: {
                UF_CRM_TASK: ['L_4', 'C_7', 'CO_5', 'D_10'],
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task CRM fields updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTaskCrmFields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.item.update',
                [
                    1,
                    ['UF_CRM_TASK' => ["L_4", "C_7", "CO_5", "D_10"]],
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
        echo 'Error updating task item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.update',
        [1, {UF_CRM_TASK: ["L_4", "C_7", "CO_5", "D_10"]}],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.update',
        [
            'TASKID' => 1,
            'FIELDS' => [
                'UF_CRM_TASK' => ["L_4", "C_7", "CO_5", "D_10"]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Цифры — это `ID` соответствующих значений. Значение `L_4` означает привязку к задаче лида с `ID = 4`. Можно задавать несколько связей одного типа, например, `L_4, L_5`.

- `L` — лид
- `C` — контакт
- `CO` — компания
- `D` — сделка







