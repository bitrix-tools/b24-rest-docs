# Получить список методов и их описание task.checklistitem.getmanifest

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.checklistitem.getmanifest` получает информацию о методах работы с пунктами чек-листа задач `task.checklistitem.*`.

Рекомендуем использовать результат только в качестве справочника, так как структуру ответа метода разработчик может изменить в любой момент.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.checklistitem.getmanifest
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.getmanifest
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ManifestResult = Record<string, unknown>

    try {
      const response = await $b24.actions.v2.call.make<ManifestResult>({
        method: 'task.checklistitem.getmanifest',
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

- UMD

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getChecklistItemManifest() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.checklistitem.getmanifest',
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

      document.addEventListener('DOMContentLoaded', getChecklistItemManifest)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.checklistitem.getmanifest',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting manifest: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.getmanifest',
        {},
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
        'task.checklistitem.getmanifest',
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
    "result": {
        "Manifest version": "2.0",
        "Warning": "don't rely on format of this manifest, it can be changed without any notification",
        "REST: shortname alias to class": "checklistitem",
        "REST: writable checklistitem data fields": [
            "PARENT_ID",
            "TITLE",
            "SORT_INDEX",
            "IS_COMPLETE",
            "IS_IMPORTANT",
            "MEMBERS"
        ],
        "REST: readable checklistitem data fields": [
            "ID",
            "TASK_ID",
            "PARENT_ID",
            "CREATED_BY",
            "TITLE",
            "SORT_INDEX",
            "IS_COMPLETE",
            "IS_IMPORTANT",
            "TOGGLED_BY",
            "TOGGLED_DATE",
            "MEMBERS",
            "ATTACHMENTS"
        ],
        "REST: sortable checklistitem data fields": [
            "ID",
            "PARENT_ID",
            "CREATED_BY",
            "TITLE",
            "SORT_INDEX",
            "IS_COMPLETE",
            "IS_IMPORTANT",
            "TOGGLED_BY",
            "TOGGLED_DATE"
        ],
        "REST: date fields": [
            "TOGGLED_DATE"
        ],
        "REST: available methods": {
            "getmanifest": {
                "staticMethod": true,
                "params": []
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
                    "PARENT_ID",
                    "CREATED_BY",
                    "TITLE",
                    "SORT_INDEX",
                    "IS_COMPLETE",
                    "IS_IMPORTANT",
                    "TOGGLED_BY",
                    "TOGGLED_DATE",
                    "MEMBERS",
                    "ATTACHMENTS"
                ]
            },
            "getlist": {
                "staticMethod": true,
                "mandatoryParamsCount": 1,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "arOrder",
                        "type": "array",
                        "allowedKeys": [
                            "ID",
                            "PARENT_ID",
                            "CREATED_BY",
                            "TITLE",
                            "SORT_INDEX",
                            "IS_COMPLETE",
                            "IS_IMPORTANT",
                            "TOGGLED_BY",
                            "TOGGLED_DATE"
                        ]
                    }
                ],
                "allowedKeysInReturnValue": [
                    "ID",
                    "TASK_ID",
                    "PARENT_ID",
                    "CREATED_BY",
                    "TITLE",
                    "SORT_INDEX",
                    "IS_COMPLETE",
                    "IS_IMPORTANT",
                    "TOGGLED_BY",
                    "TOGGLED_DATE",
                    "MEMBERS",
                    "ATTACHMENTS"
                ],
                "collectionInReturnValue": true
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
                        "description": "arFields",
                        "type": "array",
                        "allowedKeys": [
                            "PARENT_ID",
                            "TITLE",
                            "SORT_INDEX",
                            "IS_COMPLETE",
                            "IS_IMPORTANT",
                            "MEMBERS"
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
                        "description": "arFields",
                        "type": "array",
                        "allowedKeys": [
                            "PARENT_ID",
                            "TITLE",
                            "SORT_INDEX",
                            "IS_COMPLETE",
                            "IS_IMPORTANT",
                            "MEMBERS"
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
            "complete": {
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
            "renew": {
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
            "moveafteritem": {
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
                        "description": "afterItemId",
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
    "time": {
        "start": 1769070876,
        "finish": 1769070877.009113,
        "duration": 1.009113073348999,
        "processing": 0,
        "date_start": "2026-01-22T11:34:36+03:00",
        "date_finish": "2026-01-22T11:34:37+03:00",
        "operating_reset_at": 1769071477,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с описанием методов `task.checklistitem.*` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
