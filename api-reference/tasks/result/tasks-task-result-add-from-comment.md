# Добавить комментарий в результат tasks.task.result.addFromComment

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

Метод `tasks.task.result.addFromComment` закрепляет комментарий как результат выполнения задачи. 

Пользователь может закрепить как результат только свой комментарий. Администратор может закрепить комментарий любого пользователя, при этом он становится автором результата.

{% note warning " " %}

При работе с [новой карточкой задачи](../tasks-new.md) с чатом с версии модуля `tasks 25.700.0` метод не работает.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **commentId***
[`integer`](../../data-types.md) | Идентификатор комментария, который нужно закрепить как результат. 

Идентификатор комментария можно получить при [добавлении нового комментария](../comment-item/task-comment-item-add.md) или методом [получения списка комментариев](../comment-item/task-comment-item-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"commentId":3199}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.result.addFromComment
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"commentId":3199,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.result.addFromComment
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskResultAddResult = {
      id: number
      taskId: number
      commentId: number
      createdBy: number
      createdAt: ISODate
      updatedAt: ISODate
      status: number
      text: string
      formattedText: string
      files: null
    }

    try {
      const response = await $b24.actions.v2.call.make<TaskResultAddResult>({
        method: 'tasks.task.result.addFromComment',
        params: {
          commentId: 3199,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id, result.taskId, result.text)
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
      async function addTaskResultFromComment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.result.addFromComment',
            params: {
              commentId: 3199,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.id, result.taskId, result.text)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskResultFromComment)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.addFromComment',
                [
                    'commentId' => 3199
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding task result from comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.result.addFromComment',
        {
            "commentId": 3199
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
        'tasks.task.result.addFromComment',
        [
            'commentId' => 3199
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
    "result": {
        "id": 21,
        "taskId": 8017,
        "commentId": 3199,
        "createdBy": 503,
        "createdAt": "2025-07-13T14:30:00+03:00",
        "updatedAt": "2025-07-13T14:30:00+03:00",
        "status": 0,
        "text": "Отправил документы клиенту. Клиент обещает ответить в [B]понедельник[\/B].",
        "formattedText": "Отправил документы клиенту. Клиент обещает ответить в \u003Cb\u003Eпонедельник\u003C\/b\u003E.",
        "files": null
    },
    "time": {
        "start": 1755597246.027815,
        "finish": 1755597246.115861,
        "duration": 0.08804583549499512,
        "processing": 0.05956697463989258,
        "date_start": "2025-08-19T12:54:06+03:00",
        "date_finish": "2025-08-19T12:54:06+03:00",
        "operating_reset_at": 1755597846,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект, описывающий закрепленный результат ||
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
[`string`](../../data-types.md) | Отформатированный текст результата ||
|| **files**
`null` | Имеет значение `null`. 

Список файлов, прикрепленных к результату, можно получить методом [tasks.task.result.list](./tasks-task-result-list.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"0",
    "error_description":"Comment not found."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied. | У пользователя нет прав доступа к задаче или комментарий не принадлежит пользователю ||
|| `0` | Result already exists. | Комментарий уже закреплен как результат ||
|| `100` | Invalid value {значение} to match with parameter {commentId}. Should be value of type int. | В параметре `commentId` передано значение неверного типа. Должно быть значение типа `integer` ||
|| `0` | Comment not found. | Комментария с таким идентификатором не существует ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-result-list.md)
- [{#T}](./tasks-task-result-delete-from-comment.md)