# Загрузить файл к задаче task.item.addfile

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [tasks.task.files.attach](../../tasks-task-files-attach.md).

{% endnote %}

Метод загружает файл к задаче. Пока реализована загрузка файла через `post` с передачей содержимого файла в параметре `CONTENT`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **TASK_ID** | Идентификатор задачи ||
|| **NAME**
[`string`](../../../data-types.md) | Имя файла ||
|| **CONTENT** | Содержимое файла в формате `base64` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":"140","FILE":{"NAME":"desc.txt","CONTENT":"BASE64_ENCODED_CONTENT_OF_DESC.TXT"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.addfile
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":"140","FILE":{"NAME":"desc.txt","CONTENT":"BASE64_ENCODED_CONTENT_OF_DESC.TXT"},"auth":"z3eamwwkpgl7u18kx14q1s4c0ffckqsn"}' \
    https://**put_your_bitrix24_address**/rest/task.item.addfile
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // TODO: verify API version — the page does not show a JSON response example
    // Shape of the payload returned in result (ID of the uploaded file)
    type AddFileResult = number

    try {
      const response = await $b24.actions.v2.call.make<AddFileResult>({
        method: 'task.item.addfile',
        params: {
          TASK_ID: '140',
          FILE: {
            NAME: 'desc.txt',
            CONTENT: 'BASE64_ENCODED_CONTENT_OF_DESC.TXT',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Uploaded file ID:', result)
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
      async function addFileToTask() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.item.addfile',
            params: {
              TASK_ID: '140',
              FILE: {
                NAME: 'desc.txt',
                CONTENT: 'BASE64_ENCODED_CONTENT_OF_DESC.TXT',
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
          console.info('Uploaded file ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addFileToTask)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.item.addfile',
                [
                    'TASK_ID' => '140',
                    'FILE'    => [
                        'NAME'    => 'desc.txt',
                        'CONTENT' => 'BASE64_ENCODED_CONTENT_OF_DESC.TXT',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding file to task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "task.item.addfile",
        {
            TASK_ID: "140",
            FILE: {
                NAME: "desc.txt",
                CONTENT: "BASE64_ENCODED_CONTENT_OF_DESC.TXT"
            }
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.addfile',
        [
            'TASK_ID' => "140",
            'FILE' => [
                'NAME' => 'desc.txt',
                'CONTENT' => base64_encode(file_get_contents($_SERVER['DOCUMENT_ROOT'] .'/desc.txt'))
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}






