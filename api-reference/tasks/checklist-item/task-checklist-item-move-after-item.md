# Перенести пункт чек-листа task.checklistitem.moveafteritem

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Права на выполнение метода:
> - любой пользователь с доступом к редактированию задачи
> - постановщик, исполнитель и соисполнители задачи

Метод `task.checklistitem.moveafteritem` перемещает пункт чек-листа `itemId` в позицию после элемента `afterItemId`.

Оба элемента должны быть в одной задаче `taskId`. Элементы могут быть в разных подсписках, но после перемещения `itemId` получит тот же `PARENT_ID`, что и `afterItemId`.

Проверить права на изменение пункта можно методом [task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md).

## Параметры метода

{% include [Обязательные параметры](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получить список задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор перемещаемого пункта чек-листа.

Идентификатор пункта чек-листа можно получить при [создании пункта](./task-checklist-item-add.md) или методом [получить список пунктов чек-листа](./task-checklist-item-get-list.md) ||
|| **AFTERITEMID***
[`integer`](../../data-types.md) | Идентификатор пункта чек-листа, после которого нужно расположить перемещаемый элемент.

Элемент должен относиться к той же задаче, что и `ITEMID`.

Идентификатор пункта чек-листа можно получить при [создании пункта](./task-checklist-item-add.md) или методом [получить список пунктов чек-листа](./task-checklist-item-get-list.md) ||
|#

## Примеры кода

{% include [Обязательные параметры в примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"AFTERITEMID":447}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.checklistitem.moveafteritem
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"AFTERITEMID":447,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.moveafteritem
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // result is null when the item is successfully moved
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MoveChecklistItemResult = null

    try {
      const response = await $b24.actions.v2.call.make<MoveChecklistItemResult>({
        method: 'task.checklistitem.moveafteritem',
        params: {
          TASKID: 13,
          ITEMID: 475,
          AFTERITEMID: 447,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Checklist item moved successfully, result:', result)
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
      async function moveChecklistItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.checklistitem.moveafteritem',
            params: {
              TASKID: 13,
              ITEMID: 475,
              AFTERITEMID: 447,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Checklist item moved successfully, result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveChecklistItem)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.checklistitem.moveafteritem',
                [
                    'TASKID' => 13,
                    'ITEMID' => 475,
                    'AFTERITEMID' => 447
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error moving checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.moveafteritem',
        {
            TASKID: 13,
            ITEMID: 475,
            AFTERITEMID: 447
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
        'task.checklistitem.moveafteritem',
        [
            'TASKID' => 13,
            'ITEMID' => 475,
            'AFTERITEMID' => 447
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
    "result": null,
    "time": {
        "start": 1764597401,
        "finish": 1764597401.936492,
        "duration": 0.9364919662475586,
        "processing": 0,
        "date_start": "2025-12-01T16:56:41+03:00",
        "date_finish": "2025-12-01T16:56:41+03:00",
        "operating_reset_at": 1764598001,
        "operating": 0.29050707817077637
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Возвращает `null`, если пункт успешно перемещен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "TASKS_ERROR_EXCEPTION_#8; Перемещение элемента: действие недоступно; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskchecklistitem::moveafteritem(), but not given.; 256/TE/WRONG_ARGUMENTS<br> | Не указан обязательный параметр `TASKID`, `ITEMID` или `AFTERITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::moveafteritem() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS<br> | Указан неверный тип значения для `TASKID`, `ITEMID` или `AFTERITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Перемещение элемента: действие недоступно; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | У пользователя нет прав доступа к задаче или не хватает прав на выполнение действия ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
