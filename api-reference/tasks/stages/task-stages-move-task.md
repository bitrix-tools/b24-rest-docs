# Переместить задачу из одной стадии в другую task.stages.movetask

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий своего «Моего плана»
> - пользователь с правом сортировать задачи в группе для стадий канбана группы

Метод `task.stages.movetask` перемещает задачу в другую стадию и может поставить ее перед другой задачей или после нее.

Метод определяет канбан по стадии `stageId`: если стадия принадлежит группе, задача перемещается в канбане группы, если «Моему плану» — в «Моем плане».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **stageId***
[`integer`](../../data-types.md) | `ID` стадии, в которую надо переместить задачу ||
|| **before**
[`integer`](../../data-types.md) | `ID` задачи, перед которой надо поставить задачу в стадии ||
|| **after**
[`integer`](../../data-types.md) | `ID` задачи, после которой надо поставить задачу в стадии ||
|#

{% note info %}

Параметры `before` и `after` передают по одному, не вместе. Если передать оба, метод учтет только `before`. В примерах ниже задача встает перед задачей `3`. Чтобы поставить ее после другой задачи, передайте `after` вместо `before`.

Если не передать ни `before`, ни `after`, задача встанет в стадии по настройкам группы или «Моего плана».

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
    "id": 1,
    "stageId": 2,
    "before": 3
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.stages.movetask
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
    "id": 1,
    "stageId": 2,
    "before": 3,
    "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.stages.movetask
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MoveTaskResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<MoveTaskResult>({
        method: 'task.stages.movetask',
        params: {
          id: 1,
          stageId: 2,
          before: 3,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task moved successfully:', result)
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
      async function moveTask() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.stages.movetask',
            params: {
              id: 1,
              stageId: 2,
              before: 3,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task moved successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveTask)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.task.stages.movetask(
            bitrix_id=1,
            stage_id=2,
            before=3,
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
                'task.stages.movetask',
                [
                    'id'      => 1,
                    'stageId' => 2,
                    'before'  => 3
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
        echo 'Error moving task stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const taskId = 1;
    const stageId = 2;
    BX24.callMethod(
        'task.stages.movetask',
        {
            id: taskId,
            stageId: stageId,
            before: 3
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $taskId = 1;
    $stageId = 2;

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.movetask',
        [
            'id' => $taskId,
            'stageId' => $stageId,
            'before' => 3
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "task.stages.movetask", b24.Params{
    	"id":      1,
    	"stageId": 2,
    	"before":  3,
    })
    if err != nil {
    	return fmt.Errorf("task.stages.movetask: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1793956087,
        "finish": 1793956087.677343,
        "duration": 0.6773428916931152,
        "processing": 0,
        "date_start": "2026-11-06T12:08:07+03:00",
        "date_finish": "2026-11-06T12:08:07+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного перемещения задачи
||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED_MOVE",
    "error_description": "Вы не можете перемещать эту задачу"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `NOT_FOUND` | Стадия не найдена | Стадии с идентификатором `stageId` нет ||
|| `400` | `TASK_NOT_FOUND` | Задача не найдена или доступ к ней запрещен | Задачи с идентификатором `id` нет или у пользователя нет к ней доступа ||
|| `400` | `ACCESS_DENIED_MOVE` | Вы не можете перемещать эту задачу | У пользователя нет права сортировать задачи в группе или стадия из чужого «Моего плана» ||
|| `400` | `DIFFERENT_STAGES` | Стадия и задача находятся в разных группах | Стадия `stageId` относится к канбану другой группы, а не той, в которой задача ||
|| `400` | `DISPATCHER_ERROR` | Argument "id" is required, but no value passed for task.stages.movetask | Не передан обязательный параметр `id`. Если не передан `stageId`, в тексте ошибки будет его имя ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-delete.md)
- [{#T}](./task-stages-can-move-task.md)
