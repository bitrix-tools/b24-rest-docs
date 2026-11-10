# Перенести пункт чек-листа task.checklistitem.moveafteritem

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к задаче на чтение, если он:
> - администратор Битрикс24
> - постановщик задачи или его руководитель
> - автор пункта или его руководитель
> - исполнитель или соисполнитель, если роль разрешает изменять чек-листы
> - участник группы с правом изменять задачи группы

Метод `task.checklistitem.moveafteritem` перемещает пункт чек-листа `ITEMID` в позицию после пункта `AFTERITEMID`.

Оба пункта должны быть в одной задаче `TASKID`. Пункты могут быть в разных подсписках, но после перемещения `ITEMID` получит тот же `PARENT_ID`, что и `AFTERITEMID`.

Например, чтобы переместить пункт `453` после пункта `447`, передайте `ITEMID = 453` и `AFTERITEMID = 447`:

```plaintext
ДО:                                            ПОСЛЕ:
Чек-лист 1 (431)                               Чек-лист 1 (431)
├── первый пункт (433)                         ├── первый пункт (433)
│   ├── подпункт 1 (435)                       │   ├── подпункт 1 (435)
│   ├── подпункт 2 (445)                       │   └── подпункт 2 (445)
│   └── подпункт 3 (453) ← PARENT_ID=433       ├── второй пункт (447)
├── второй пункт (447)                         ├── подпункт 3 (453) ← PARENT_ID=431
└── третий пункт (449)                         └── третий пункт (449)
```

Проверить права на изменение пункта можно методом [task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md).

## Параметры метода

{% note warning "" %}

Передавайте параметры в запросе в соответствии с порядком в таблице. Если нарушить порядок, запрос вернет ошибку или переместит не тот пункт.

{% endnote %}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

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
[`integer`](../../data-types.md) | Идентификатор пункта чек-листа, после которого нужно расположить перемещаемый пункт.

Идентификатор пункта чек-листа можно получить при [создании пункта](./task-checklist-item-add.md) или методом [получить список пунктов чек-листа](./task-checklist-item-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":453,"AFTERITEMID":447}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.checklistitem.moveafteritem
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":453,"AFTERITEMID":447,"auth":"**put_access_token_here**"}' \
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
          ITEMID: 453,
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
              ITEMID: 453,
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.task.checklistitem.moveafteritem(
            task_id=13,
            item_id=453,
            after_item_id=447,
        ).response
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
                'task.checklistitem.moveafteritem',
                [
                    'TASKID' => 13,
                    'ITEMID' => 453,
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
            ITEMID: 453,
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
            'ITEMID' => 453,
            'AFTERITEMID' => 447
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "task.checklistitem.moveafteritem", b24.Params{
    	"TASKID":      13,
    	"ITEMID":      453,
    	"AFTERITEMID": 447,
    })
    if err != nil {
    	return fmt.Errorf("task.checklistitem.moveafteritem: %w", err)
    }

    // При успехе result равен null
    fmt.Printf("%s\n", res.Result)
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
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (afterItemId) expected by method ctaskchecklistitem::moveafteritem(), but not given.; 256/TE/WRONG_ARGUMENTS<br> | Не передан обязательный параметр. Номер и имя параметра в сообщении: `Param #0 (taskId)`, `Param #1 (itemId)` или `Param #2 (afterItemId)` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::moveafteritem() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS<br> | Указан неверный тип значения. Номер и имя параметра в сообщении указывают, какое значение неверно ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Указано некорректное значение [] для поля [ENTITY_ID] в элементе [, ]; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | Пункта с идентификатором `ITEMID` нет ||
|| `ERROR_CORE` | TASKS_ERROR_ASSERT_EXCEPTION<br> | Значение `TASKID` или `ITEMID` меньше или равно нулю ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Родительский пункт не может быть своим подпунктом; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | `AFTERITEMID` — подпункт перемещаемого пункта `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Перемещение элемента: действие недоступно; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | У пользователя нет прав доступа к задаче или не хватает прав на выполнение действия ||
|#

Если пункта `AFTERITEMID` нет, сервер не возвращает ответ, и запрос завершается по таймауту без кода ошибки. Проверяйте пункт методом [task.checklistitem.get](./task-checklist-item-get.md) перед вызовом.

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
