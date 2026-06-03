# Получить перечень методов и их описаний task.elapseditem.getmanifest

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список методов вида `task.elapseditem.*` и их описание.

Возвращаемое значение этого метода не предназначено для автоматической обработки, так как его формат может быть изменен без предупреждения.

Метод может быть полезен в качестве справочной информации, так как всегда содержит актуальную информацию.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.elapseditem.getmanifest
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.elapseditem.getmanifest
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetManifestResult = Record<string, unknown>

    try {
      const response = await $b24.actions.v2.call.make<GetManifestResult>({
        method: 'task.elapseditem.getmanifest',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result)
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
      async function getManifest() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.elapseditem.getmanifest',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getManifest)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.elapseditem.getmanifest',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting manifest: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.elapseditem.getmanifest',
        {},
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
        'task.elapseditem.getmanifest',
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
    "result":{
        "Manifest version": "1.2",
        "Manifest change date": "22 Feb 2018",
        "Warning": "Don't rely on format of this manifest, it can be changed without any notifications!",
        "REST: shortname alias to class": "elapseditem",
        "REST: writable elapseditem data fields": [
            "USER_ID",
            "COMMENT_TEXT",
            "SECONDS",
            "SOURCE",
            "CREATED_DATE",
            "DATE_START",
            "DATE_STOP"
        ],
        "REST: readable elapseditem data fields": [
            "ID",
            "TASK_ID",
            "USER_ID",
            "COMMENT_TEXT",
            "SECONDS",
            "MINUTES",
            "SOURCE",
            "CREATED_DATE",
            "DATE_START",
            "DATE_STOP"
        ],
        "REST: sortable elapseditem data fields": [
            "ID",
            "TASK_ID",
            "USER_ID",
            "SECONDS",
            "MINUTES",
            "CREATED_DATE",
            "DATE_START",
            "DATE_STOP"
        ],
        "REST: filterable elapseditem data fields": [
            "ID",
            "TASK_ID",
            "USER_ID",
            "CREATED_DATE"
        ],
        "REST: date fields": [
            "CREATED_DATE",
            "DATE_START",
            "DATE_STOP"
        ],
        "REST: available methods": {
            "getmanifest": {
                "staticMethod": true,
                "params": []
            },
            "getlist": {
                "staticMethod": true,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "order",
                        "type": "array",
                        "allowedKeys": [
                            "ID",
                            "TASK_ID",
                            "USER_ID",
                            "SECONDS",
                            "MINUTES",
                            "CREATED_DATE",
                            "DATE_START",
                            "DATE_STOP"
                        ]
                    },
                    {
                        "description": "filter",
                        "type": "array",
                        "allowedKeys": [
                            "ID",
                            "TASK_ID",
                            "USER_ID",
                            "CREATED_DATE"
                        ],
                        "allowedKeyPrefixes": [
                            "!",
                            "<=",
                            "<",
                            ">=",
                            ">"
                        ]
                    },
                    {
                        "description": "select",
                        "type": "array",
                        "allowedValues": [
                            "",
                            "*",
                            "ID",
                            "TASK_ID",
                            "USER_ID",
                            "COMMENT_TEXT",
                            "SECONDS",
                            "MINUTES",
                            "SOURCE",
                            "CREATED_DATE",
                            "DATE_START",
                            "DATE_STOP"
                        ],
                        "allowedAggregations": [
                            "MAX",
                            "MIN",
                            "COUNT",
                            "SUM",
                            "AVG"
                        ],
                        "allowedValuesInAggregation": [
                            "ID",
                            "USER_ID",
                            "SECONDS",
                            "MINUTES"
                        ]
                    },
                    {
                        "description": "params",
                        "type": "array",
                        "allowedKeys": [
                            "NAV_PARAMS"
                        ]
                    }
                ],
                "allowedKeysInReturnValue": [
                    "ID",
                    "TASK_ID",
                    "USER_ID",
                    "COMMENT_TEXT",
                    "SECONDS",
                    "MINUTES",
                    "SOURCE",
                    "CREATED_DATE",
                    "DATE_START",
                    "DATE_STOP"
                ],
                "allowedAggregations": [
                    "MAX",
                    "MIN",
                    "COUNT",
                    "SUM",
                    "AVG"
                ],
                "collectionInReturnValue": true
            },
            "get": {
                "mandatoryParamsCount": 2,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    }
                ],
                "allowedKeysInReturnValue": [
                    "ID",
                    "TASK_ID",
                    "USER_ID",
                    "COMMENT_TEXT",
                    "SECONDS",
                    "MINUTES",
                    "SOURCE",
                    "CREATED_DATE",
                    "DATE_START",
                    "DATE_STOP"
                ]
            },
            "add": {
                "staticMethod": true,
                "mandatoryParamsCount": 2,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "fields",
                        "type": "array",
                        "allowedKeys": [
                            "USER_ID",
                            "COMMENT_TEXT",
                            "SECONDS",
                            "SOURCE",
                            "CREATED_DATE",
                            "DATE_START",
                            "DATE_STOP"
                        ]
                    }
                ]
            },
            "update": {
                "staticMethod": false,
                "mandatoryParamsCount": 3,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    },
                    {
                        "description": "fields",
                        "type": "array",
                        "allowedKeys": [
                            "USER_ID",
                            "COMMENT_TEXT",
                            "SECONDS",
                            "SOURCE",
                            "CREATED_DATE",
                            "DATE_START",
                            "DATE_STOP"
                        ]
                    }
                ]
            },
            "delete": {
                "staticMethod": false,
                "mandatoryParamsCount": 2,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    }
                ]
            },
            "isactionallowed": {
                "staticMethod": false,
                "mandatoryParamsCount": 3,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    },
                    {
                        "description": "actionId",
                        "type": "integer"
                    }
                ]
            }
        }
    },
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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Описание методов `task.elapseditem.*` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-elapsed-item-add.md)
- [{#T}](./task-elapsed-item-update.md)
- [{#T}](./task-elapsed-item-get.md)
- [{#T}](./task-elapsed-item-get-list.md)
- [{#T}](./task-elapsed-item-delete.md)
- [{#T}](./task-elapsed-item-is-action-allowed.md)