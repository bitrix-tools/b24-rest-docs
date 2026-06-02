# Переместить задачу из одной стадии в другую task.stages.movetask

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий «Моего плана»
> - любой пользователь с доступом к группе для стадий канбана

Метод перемещает задачу из одной стадии в другую и позволяет изменить положение задачи в рамках канбана группы или «Моего плана».

Метод работает следующим образом:
- Если передана стадия группы, перемещение происходит в рамках канбана группы
- Если передана стадия «Моего плана», перемещение происходит в нем

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

Параметры `before` и `after` — взаимоисключающие. Указывается или тот, или другой параметр.

Если оба параметры не заполнены, задача добавляется в колонку стадии согласно настройкам проекта или «Моего плана».

{% endnote %}

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 1,
    "stageId": 2,
    "before": 3,
    "after": 4
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.movetask
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 1,
    "stageId": 2,
    "before": 3,
    "after": 4
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.movetask
    ```

- TS

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
          after: 4,
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

- UMD

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
              after: 4,
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.stages.movetask',
                [
                    'id'     => $taskId,
                    'stageId' => $stageId,
                    'before' => 3,
                    'after'  => 4
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
            before: 3,
            after: 4
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
            'before' => 3,
            'after' => 4
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-Статус: **200**

```json
{
    "result": true
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного перемещения стадии
||
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
|| **Код** | **Описание** ||
|| `ACCESS_DENIED_MOVE` | Вы не можете перемещать эту задачу ||
|| `TASK_NOT_FOUND` | Задача не найдена или доступ к ней запрещен ||
|| `NOT_FOUND` | Стадия не найдена ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-delete.md)