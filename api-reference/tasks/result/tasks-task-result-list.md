# Получить список результатов задачи tasks.task.result.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

Метод `tasks.task.result.list` получает список результатов, закрепленных в задаче.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../../data-types.md) | Идентификатор задачи, из которой нужно получить результаты.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.result.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.result.list
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of one task result item returned in result[]
    type TaskResultItem = {
      id: number
      taskId: number
      commentId: number
      createdBy: number
      createdAt: ISODate | null
      updatedAt: ISODate | null
      status: number
      text: string
      formattedText: string
      files: number[]
    }

    try {
      // tasks.task.result.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TaskResultItem[]>({
        method: 'tasks.task.result.list',
        params: {
          taskId: 8017,
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task results count:', result.length, 'First result:', result[0]?.id, result[0]?.text)
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
      async function fetchTaskResultList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // tasks.task.result.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.result.list',
            params: {
              taskId: 8017,
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task results count:', result.length, 'First result:', result[0]?.id, result[0]?.text)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchTaskResultList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.list',
                [
                    'taskId' => 8017
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing task results: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.result.list',
        {
            "taskId": 8017
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
        'tasks.task.result.list',
        [
            'taskId' => 8017
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
    "result": [
        {
            "id": 23,
            "taskId": 8017,
            "commentId": 3197,
            "createdBy": 503,
            "createdAt": "2025-07-15T14:30:00+03:00",
            "updatedAt": "2025-08-19T16:45:48+03:00",
            "status": 0,
            "text": "Клиент подписал документы",
            "formattedText": "Клиент подписал документы",
            "files": []
        },
        {
            "id": 21,
            "taskId": 8017,
            "commentId": 3199,
            "createdBy": 503,
            "createdAt": "2025-07-13T14:30:00+03:00",
            "updatedAt": "2025-08-19T16:45:56+03:00",
            "status": 0,
            "text": "Отправил документы клиенту. Клиент обещает ответить в [B]понедельник[\/B].",
            "formattedText": "Отправил документы клиенту. Клиент обещает ответить в \u003Cb\u003Eпонедельник\u003C\/b\u003E.",
            "files": [1055,1057,1059,1061,1063]
        }
    ],
    "time": {
        "start": 1755611166.509052,
        "finish": 1755611166.542696,
        "duration": 0.03364396095275879,
        "processing": 0.00906991958618164,
        "date_start": "2025-08-19T16:46:06+03:00",
        "date_finish": "2025-08-19T16:46:06+03:00",
        "operating_reset_at": 1755611766,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов, где каждый объект описывает результат задачи ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор результата ||
|| **taskId**
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **commentId**
[`integer`](../../data-types.md) | Идентификатор комментария, закрепленного как результат ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, закрепившего результат ||
|| **createdAt**
[`string`](../../data-types.md) | Дата и время закрепления результата в формате ISO 8601 ||
|| **updatedAt**
[`string`](../../data-types.md) | Дата и время последнего изменения результата в формате ISO 8601 ||
|| **status**
[`integer`](../../data-types.md) | Статус результата. Возможные значения:
- `0` — результат открыт
- `1` — результат закрыт

Результат становится закрытым после завершения задачи и сохраняет этот статус после возобновления задачи. Открытыми будут только новые результаты в незавершенной задаче.

Комментарий с открытым результатом нельзя повторно добавить в результат. Если результат закрыт — добавление возможно
 ||
|| **text**
[`string`](../../data-types.md) | Текст результата ||
|| **formattedText**
[`string`](../../data-types.md) | Текст результата с форматированием ||
|| **files**
[`array`](../../data-types.md) | Список идентификаторов файлов, прикрепленных к результату.

Соддержит пустой массив, если файлов в комментарии нет ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"100",
    "error_description":"Invalid value {значение} to match with parameter {commentId}. Should be value of type int."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied. | У пользователя нет доступа к задаче или задачи с таким `ID` не существует ||
|| `100` | Invalid value {значение} to match with parameter {commentId}. Should be value of type int. | В параметре `taskId` передано значение неверного типа. Должно быть значение типа `integer` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-result-add-from-comment.md)
- [{#T}](./tasks-task-result-delete-from-comment.md)