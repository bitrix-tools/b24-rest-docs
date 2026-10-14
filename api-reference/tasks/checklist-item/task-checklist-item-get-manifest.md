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

Структура ответа может измениться без уведомления, поэтому используйте результат только как справочник.

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

- JS (TS)

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

- JS (UMD)

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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.task.checklistitem.getmanifest().response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "task.checklistitem.getmanifest", nil)
    if err != nil {
    	return fmt.Errorf("task.checklistitem.getmanifest: %w", err)
    }

    var item struct {
    	ManifestVersion           string `json:"Manifest version"`
    	Warning                   string `json:"Warning"`
    	RestShortnameAliasToClass string `json:"REST: shortname alias to class"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ManifestVersion, item.Warning)
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
[`object`](../../data-types.md) | Объект с [описанием методов](#result) `task.checklistitem.*` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **Manifest version**
[`string`](../../data-types.md) | Версия структуры манифеста ||
|| **Warning**
[`string`](../../data-types.md) | Предупреждение о том, что формат манифеста может измениться без уведомления ||
|| **REST: shortname alias to class**
[`string`](../../data-types.md) | Короткое имя объекта в названиях методов — `checklistitem` ||
|| **REST: writable checklistitem data fields**
[`array`](../../data-types.md) | Поля, которые можно передать в `FIELDS` методов [task.checklistitem.add](./task-checklist-item-add.md) и [task.checklistitem.update](./task-checklist-item-update.md) ||
|| **REST: readable checklistitem data fields**
[`array`](../../data-types.md) | Поля пункта, которые возвращают [task.checklistitem.get](./task-checklist-item-get.md) и [task.checklistitem.getlist](./task-checklist-item-get-list.md) ||
|| **REST: sortable checklistitem data fields**
[`array`](../../data-types.md) | Поля, по которым можно сортировать результат `task.checklistitem.getlist` ||
|| **REST: date fields**
[`array`](../../data-types.md) | Поля типа дата и время ||
|| **REST: available methods**
[`object`](../../data-types.md) | Описания методов. Ключ — короткое имя метода, например `add` или `getlist`, значение — [объект описания метода](#method) ||
|#

#### Объект описания метода {#method}

#|
|| **Название**
`тип` | **Описание** ||
|| **staticMethod**
[`boolean`](../../data-types.md) | `false` — метод работает с конкретным пунктом, `true` — метод не привязан к пункту. У метода `get` поля нет, он тоже работает с конкретным пунктом ||
|| **mandatoryParamsCount**
[`integer`](../../data-types.md) | Количество обязательных параметров. Обязательны первые параметры из списка `params`. У метода `getmanifest` поля нет ||
|| **params**
[`array`](../../data-types.md) | Параметры метода в том порядке, в котором их передают в запросе. Каждый элемент содержит:
- `description` — имя параметра в коде
- `type` — тип значения: `integer` или `array`
- `allowedKeys` — допустимые ключи, если параметр передается объектом ||
|| **allowedKeysInReturnValue**
[`array`](../../data-types.md) | Поля, которые метод возвращает в ответе. Есть у `get` и `getlist` ||
|| **collectionInReturnValue**
[`boolean`](../../data-types.md) | `true`, если метод возвращает массив пунктов. Есть у `getlist` ||
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
