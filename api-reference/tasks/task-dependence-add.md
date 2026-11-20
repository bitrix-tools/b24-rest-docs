# Создать связь между задачами task.dependence.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.dependence.add` создает связь между двумя задачами в диаграмме Ганта: задача `taskIdTo` начинает зависеть от задачи `taskIdFrom`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskIdFrom***
[`integer`](../data-types.md) | Идентификатор задачи, от которой зависит вторая задача ||
|| **taskIdTo***
[`integer`](../data-types.md) | Идентификатор зависимой задачи ||
|| **linkType***
[`integer`](../data-types.md) | Тип связи:
- `0` — старт-старт: задача `taskIdTo` не может начаться раньше начала задачи `taskIdFrom`
- `1` — старт-финиш: задача `taskIdTo` не может завершиться раньше начала задачи `taskIdFrom`
- `2` — финиш-старт: задача `taskIdTo` не может начаться раньше завершения задачи `taskIdFrom`
- `3` — финиш-финиш: задача `taskIdTo` не может завершиться раньше завершения задачи `taskIdFrom`

Метод не проверяет значение: передавайте только числа из списка ||
|#

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md).

Между двумя задачами может быть только одна связь любого типа и направления. Связь задачи с самой собой и повторная связь между той же парой задач вернут ошибку о циклической зависимости. Чтобы сменить тип связи, удалите ее методом [task.dependence.delete](./task-dependence-delete.md) и создайте заново.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskIdFrom":100,"taskIdTo":101,"linkType":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.dependence.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskIdFrom":100,"taskIdTo":101,"linkType":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.dependence.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (empty array on success)
    type DependenceAddResult = unknown[]

    try {
      const response = await $b24.actions.v2.call.make<DependenceAddResult>({
        method: 'task.dependence.add',
        params: {
          taskIdFrom: 100,
          taskIdTo: 101,
          linkType: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Dependence added, result:', result)
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
      async function addTaskDependence() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.dependence.add',
            params: {
              taskIdFrom: 100,
              taskIdTo: 101,
              linkType: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Dependence added, result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskDependence)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.task.dependence.add(
            task_id_from=100,
            task_id_to=101,
            link_type=0,
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
                'task.dependence.add',
                [
                    'taskIdFrom' => 100,
                    'taskIdTo'   => 101,
                    'linkType'   => 0,
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
        echo 'Error adding task dependence: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.dependence.add', {
            "taskIdFrom":100,
            "taskIdTo":101,
            "linkType":0
        },
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

    $result = CRest::call('task.dependence.add', [
        'taskIdFrom' => 100,
        'taskIdTo' => 101,
        'linkType' => 0,
    ]);

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "task.dependence.add", b24.Params{
    	"taskIdFrom": 100,
    	"taskIdTo":   101,
    	"linkType":   0,
    })
    if err != nil {
    	return fmt.Errorf("task.dependence.add: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [],
    "time": {
        "start": 1795106720,
        "finish": 1795106721.263738,
        "duration": 1.2637379169464111,
        "processing": 1,
        "date_start": "2026-11-19T19:45:20+03:00",
        "date_finish": "2026-11-19T19:45:21+03:00",
        "operating_reset_at": 1795107300,
        "operating": 0.2896251678466797
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Пустой массив `[]`, если связь создана ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACTION_FAILED",
    "error_description": "Нельзя создавать циклическую зависимость (4363, 4361)"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ACTION_FAILED` | Нельзя создавать циклическую зависимость (`taskIdTo`, `taskIdFrom`) | Между задачами уже есть связь любого типа или направления, `taskIdFrom` и `taskIdTo` совпадают или связь замкнет цепочку зависимостей ||
|| `400` | `ACTION_FAILED` | Task not found | Задача `taskIdTo` не найдена ||
|| `400` | `ACTION_NOT_ALLOWED.RESTRICTED` | Действие над задачей не разрешено | Одна из задач не найдена или у пользователя нет права на ее чтение ||
|| `400` | `DISPATCHER_ERROR` | Argument "`имя параметра`" is required, but no value passed for task.dependence.add | Не передан обязательный параметр `taskIdFrom`, `taskIdTo` или `linkType` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-dependence-delete.md)