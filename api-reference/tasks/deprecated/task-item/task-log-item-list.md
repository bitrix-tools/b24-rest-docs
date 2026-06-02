# Просмотреть историю изменения задачи task.logitem.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [tasks.task.history.list](../../tasks-task-history-list.md).

{% endnote %}

Метод возвращает историю изменений задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название** | **Описание** ||
|| **ID*** | Идентификатор задачи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":1205}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.logitem.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":1205,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.logitem.list
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskLogItemListResult = Array<{
      CREATED_DATE: ISODate | null
      USER_ID: string
      TASK_ID: string
      FIELD: string
      FROM_VALUE: string
      TO_VALUE: string
    }>

    try {
      // task.logitem.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TaskLogItemListResult>({
        method: 'task.logitem.list',
        params: {
          taskId: 1205,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Log items count:', result.length, 'First item:', result[0])
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
      async function fetchTaskLogItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // task.logitem.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'task.logitem.list',
            params: {
              taskId: 1205,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Log items count:', result.length, 'First item:', result[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchTaskLogItems)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.logitem.list',
                [1205]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task log items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.logitem.list',
        [1205],
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
        'task.logitem.list',
        ['taskId' => 1205]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
Array
(
    [result] => Array
        (
            [0] => Array
                (
                    [CREATED_DATE] => 2022-12-09T11:10:49+02:00
                    [USER_ID] => 1
                    [TASK_ID] => 1223
                    [FIELD] => NEW
                    [FROM_VALUE] =>
                    [TO_VALUE] =>
                )

            [1] => Array
                (
                    [CREATED_DATE] => 2022-12-09T11:11:29+02:00
                    [USER_ID] => 1
                    [TASK_ID] => 1223
                    [FIELD] => COMMENT
                    [FROM_VALUE] =>
                    [TO_VALUE] => 1247
                )

            [2] => Array
                (
                    [CREATED_DATE] => 2022-12-09T11:11:40+02:00
                    [USER_ID] => 1
                    [TASK_ID] => 1223
                    [FIELD] => TAGS
                    [FROM_VALUE] =>
                    [TO_VALUE] => это секретно
                )
        )

    [time] => Array
        (
            [start] => 1670577445.3012
            [finish] => 1670577447.9552
            [duration] => 2.6539649963379
            [processing] => 2.2574801445007
            [date_start] => 2022-12-09T11:17:25+02:00
            [date_finish] => 2022-12-09T11:17:27+02:00
            [operating] => 2.2573609352112
        )
)
```




