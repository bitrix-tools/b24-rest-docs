# Добавить комментарий в результат tasks.task.result.addFromComment

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

Метод `tasks.task.result.addFromComment` закрепляет комментарий как результат выполнения задачи. 

Пользователь может закрепить как результат только свой комментарий. Администратор может закрепить комментарий любого пользователя, при этом он становится автором результата.

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

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.result.addFromComment',
            {
                commentId: 3199,
            }
        );
        
        const result = response.getData().result;
        console.log('Task result added from comment:', result);
        
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
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