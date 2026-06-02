# Добавить комментарий к задаче task.comment.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [tasks.task.chat.message.send](../../rest-v3/tasks/tasks-task-chat-message-send.md).

{% endnote %}

Метод добавляет комментарии к задаче.

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **TASKID** | Идентификатор задачи ||
|| **COMMENTTEXT** | Комментарий ||
|#

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"POST_MESSAGE":"текст комментария"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.comment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"POST_MESSAGE":"текст комментария"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.comment.add
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // TODO: verify API version
    // Shape of the payload returned in result (comment ID)
    type TaskCommentAddResult = number

    try {
      const response = await $b24.actions.v2.call.make<TaskCommentAddResult>({
        method: 'task.comment.add',
        params: {
          TASKID: 1,
          FIELDS: {
            POST_MESSAGE: 'comment text',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created comment ID:', result)
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
      async function addTaskComment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.comment.add',
            params: {
              TASKID: 1,
              FIELDS: {
                POST_MESSAGE: 'comment text',
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
          console.info('Created comment ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskComment)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.comment.add',
                [
                    1,
                    'текст комментария',
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
        echo 'Error adding task comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.comment.add',
        [1, 'текст комментария'],
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
        'task.comment.add',
        [
            'TASKID' => 1,
            'FIELDS' => [
                'POST_MESSAGE' => 'текст комментария'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}





