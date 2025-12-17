# Проверить права доступа tasks.task.access.get

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.access.get` проверяет доступные действия пользователя над задачей. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или старым методом [получения списка задач](../../tasks/tasks-task-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.access.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.access.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.access.get
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.access.get',
            {
                id: 8017,
            }
        );
        
        const result = response.getData().result;
        console.log('Access data:', result);
        
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.access.get',
                [
                    'id' => 8017,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```js
    BX24.callMethod(
        'tasks.task.access.get',
        {
            id: 8017,
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.access.get',
        [
            'id' => 8017,
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
        "read": true,
        "watch": true,
        "mute": true,
        "createSubtask": true,
        "createResult": true,
        "edit": true,
        "remove": true,
        "complete": true,
        "approve": false,
        "disapprove": false,
        "start": false,
        "take": false,
        "delegate": true,
        "defer": false,
        "renew": false,
        "deadline": true,
        "datePlan": true,
        "changeDirector": false,
        "changeResponsible": true,
        "changeAccomplices": true,
        "pause": false,
        "timeTracking": false,
        "mark": true,
        "changeStatus": true,
        "reminder": true,
        "addAuditors": true,
        "elapsedTime": true,
        "favorite": true,
        "checklistAdd": true,
        "checklistEdit": true,
        "checklistSave": true,
        "checklistToggle": true,
        "automate": true,
        "resultEdit": false,
        "completeResult": true,
        "removeResult": false,
        "resultRead": false,
        "admin": true,
        "copy": true,
        "saveAsTemplate": true,
        "attachFile": true,
        "detachFile": true,
        "detachParent": true,
        "createGanttDependence": true,
        "sort": false
    },
    "time": {
        "start": 1764849882,
        "finish": 1764849882.731575,
        "duration": 0.7315750122070312,
        "processing": 0,
        "date_start": "2025-12-04T15:04:42+03:00",
        "date_finish": "2025-12-04T15:04:42+03:00",
        "operating_reset_at": 1764850482,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект c описанием доступных действий для текущего пользователя ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `id` не указано",
                "field": "id"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса  

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Убедитесь, что значение — число, а не строка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-chat-message-send.md)
- [{#T}](./tasks-task-delete.md)