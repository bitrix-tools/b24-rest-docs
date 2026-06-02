# Удалить комментарий из результата tasks.task.result.deleteFromComment

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

Метод `tasks.task.result.deleteFromComment` снимает фиксацию комментария как результата задачи. Чтобы удалить комментарий с результатом используйте метод [task.commentitem.delete](../comment-item/task-comment-item-delete.md).

Пользователь может снять фиксацию только своего комментария. Администратор может снять фиксацию с комментария любого пользователя.

{% note warning " " %}

При работе с [новой карточкой задачи](../tasks-new.md) с чатом с версии модуля `tasks 25.700.0` метод не работает.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **commentId***
[`integer`](../../data-types.md) | Идентификатор комментария, для которого нужно снять фиксацию результата. 

Идентификатор комментария можно получить при [добавлении нового комментария](../comment-item/task-comment-item-add.md) или методом [получения списка комментариев](../comment-item/task-comment-item-get-list.md) задачи ||
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.result.deleteFromComment
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"commentId":3199,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.result.deleteFromComment
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // result is null on success (the comment was unfixed from the task result)
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DeleteFromCommentResult = null

    try {
      const response = await $b24.actions.v2.call.make<DeleteFromCommentResult>({
        method: 'tasks.task.result.deleteFromComment',
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
        console.info('Comment successfully unfixed from task result:', result)
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
      async function deleteFromComment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.result.deleteFromComment',
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
          console.info('Comment successfully unfixed from task result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteFromComment)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.deleteFromComment',
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
        echo 'Error deleting comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.result.deleteFromComment',
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
        'tasks.task.result.deleteFromComment',
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
    "result": null,
    "time": {
        "start": 1755611282.263157,
        "finish": 1755611282.322503,
        "duration": 0.05934619903564453,
        "processing": 0.031157970428466797,
        "date_start": "2025-08-19T16:48:02+03:00",
        "date_finish": "2025-08-19T16:48:02+03:00",
        "operating_reset_at": 1755611882,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Возвращает `null` в случае успешного выполнения ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#4; Action is not allowed; 4/TE/ACTION_NOT_ALLOWED.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied. | У пользователя нет прав доступа к задаче или комментарий не принадлежит пользователю ||
|| `100` | Invalid value {значение} to match with parameter {commentId}. Should be value of type int. | В параметре `commentId` передано значение неверного типа. Должно быть значение типа `integer` ||
|| `0` | Comment not found. | Комментария с таким идентификатором не существует ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-result-list.md)
- [{#T}](./tasks-task-result-add-from-comment.md)