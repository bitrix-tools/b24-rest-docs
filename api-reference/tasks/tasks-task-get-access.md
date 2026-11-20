# Проверить доступ к задаче tasks.task.getaccess

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.getaccess` возвращает, какие действия над задачей доступны каждому из указанных пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|| **users**
[`array`](../data-types.md) | Массив идентификаторов пользователей, для которых нужно проверить доступ.

По умолчанию и при пустом массиве проверяется текущий пользователь.

Идентификатор пользователя можно получить методом [получения списка пользователей](../user/user-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"users":[503,547]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.getaccess
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"users":[503,547],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.getaccess
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskAccessResult = {
      allowedActions: Record<string, Record<string, boolean>>
    }

    try {
      const response = await $b24.actions.v2.call.make<TaskAccessResult>({
        method: 'tasks.task.getaccess',
        params: {
          taskId: 8017,
          users: [503, 547],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Allowed actions by user:', result.allowedActions)
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
      async function getTaskAccess() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.getaccess',
            params: {
              taskId: 8017,
              users: [503, 547],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Allowed actions by user:', result.allowedActions)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskAccess)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.task.getaccess(
            task_id=8017,
            users=[
                503,
                547,
            ],
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
                'tasks.task.getaccess',
                [
                    'taskId' => 8017,
                    'users' => [503, 547]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.getaccess',
        {
            'taskId': 8017,
            'users': [503, 547]
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
        'tasks.task.getaccess',
        [
            'taskId' => 8017,
            'users' => [503, 547]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.task.getaccess", b24.Params{
    	"taskId": 8017,
    	"users":  []int{503, 547},
    })
    if err != nil {
    	return fmt.Errorf("tasks.task.getaccess: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "allowedActions".
    raw, ok := b24.Unwrap(res.Result, "allowedActions")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа allowedActions")
    }

    fmt.Printf("%s\n", raw)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "allowedActions": {
            "1269": {
                "ACCEPT": false,
                "DECLINE": false,
                "COMPLETE": true,
                "APPROVE": false,
                "DISAPPROVE": false,
                "START": true,
                "PAUSE": false,
                "DELEGATE": true,
                "REMOVE": true,
                "EDIT": true,
                "DEFER": true,
                "RENEW": false,
                "CREATE": true,
                "CHANGE_DEADLINE": true,
                "CHECKLIST_ADD_ITEMS": true,
                "ADD_FAVORITE": true,
                "DELETE_FAVORITE": false,
                "RATE": true,
                "TAKE": false,
                "EDIT.ORIGINATOR": false,
                "CHECKLIST.REORDER": true,
                "ELAPSEDTIME.ADD": true,
                "DAYPLAN.TIMER.TOGGLE": false,
                "EDIT.PLAN": true,
                "CHECKLIST.ADD": true,
                "FAVORITE.ADD": true,
                "FAVORITE.DELETE": false
            }
        }
    },
    "time": {
        "start": 1795106839,
        "finish": 1795106839.631999,
        "duration": 0.6319990158081055,
        "processing": 0,
        "date_start": "2026-11-19T19:47:19+03:00",
        "date_finish": "2026-11-19T19:47:19+03:00",
        "operating_reset_at": 1795107420,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **allowedActions**
[`object`](../data-types.md) \| [`array`](../data-types.md) | Объект, в котором ключ — идентификатор пользователя, а значение — объект с [доступными действиями](./fields.md#action) над задачей. В ответе ключи действий приходят в верхнем регистре: например, `CHANGE_DEADLINE` соответствует полю `changeDeadline` в описании.

Если задача не найдена или у пользователя, который вызывает метод, нет к ней доступа, метод возвращает пустой массив `"allowedActions": []` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Действия `ACCEPT` и `DECLINE` устарели и всегда равны `false`.

Для несуществующего пользователя из `users` метод не возвращает ошибку: все действия, кроме `CREATE`, равны `false`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value {1269} to match with parameter {users}. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for {taskId} | Не передан обязательный параметр `taskId` ||
|| `400` | `0` | wrong task id | В `taskId` передано не число, например `abc` ||
|| `400` | `100` | Invalid value {`значение`} to match with parameter {users}. Should be value of type array. | В `users` передан не массив, например строка ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)
- [{#T}](./fields.md)
