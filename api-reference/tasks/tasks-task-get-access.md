# Проверить доступ к задаче tasks.task.getaccess

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.getaccess` проверяет доступные действия пользователей над задачей.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|| **users**
[`array`](../data-types.md) | Массив идентификаторов пользователей, для которых нужно проверить доступ.

По умолчанию используется текущий пользователь.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.getaccess
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"users":[503,547],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.getaccess
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.getaccess',
            {
                taskId: 8017,
                users: [503, 547],
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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "allowedActions": {
            "503": {
                "ACCEPT": false,
                "DECLINE": false,
                "COMPLETE": true,
                "APPROVE": false,
                "DISAPPROVE": false,
                "START": false,
                "PAUSE": true,
                "DELEGATE": true,
                "REMOVE": true,
                "EDIT": true,
                "DEFER": false,
                "RENEW": false,
                "CREATE": true,
                "CHANGE_DEADLINE": true,
                "CHECKLIST_ADD_ITEMS": true,
                "ADD_FAVORITE": false,
                "DELETE_FAVORITE": true,
                "RATE": true,
                "TAKE": false,
                "EDIT.ORIGINATOR": false,
                "CHECKLIST.REORDER": true,
                "ELAPSEDTIME.ADD": true,
                "DAYPLAN.TIMER.TOGGLE": true,
                "EDIT.PLAN": true,
                "CHECKLIST.ADD": true,
                "FAVORITE.ADD": false,
                "FAVORITE.DELETE": true
            },
            "547": {
                "ACCEPT": false,
                "DECLINE": false,
                "COMPLETE": false,
                "APPROVE": false,
                "DISAPPROVE": false,
                // ...
                "FAVORITE.DELETE": false
            }
        }
    },
    "time": {
        "start": 1758177122.815386,
        "finish": 1758177122.911002,
        "duration": 0.09561586380004883,
        "processing": 0.054609060287475586,
        "date_start": "2025-09-18T09:32:02+03:00",
        "date_finish": "2025-09-18T09:32:02+03:00",
        "operating_reset_at": 1758177722,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа.

Содержит объект c описанием доступных действий для каждого пользователя ||
|| **allowedActions**
[`object`](../data-types.md) | Объект, в котором ключ — `ID` пользователя, значение — объект с [описанием доступных действий](./fields.md#action) над задачей.

Если у пользователя, выполняющего метод, нет доступа к задаче, вернется пустой массив `"allowedActions":[]`.

{% note info "" %}

Для несушествующих пользователей из параметра `users` метод вернет ответ со значением `false` для всех действий

{% endnote %}

 ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"100",
    "error_description":"Invalid value {} to match with parameter {users}. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | wrong task id | В параметре `taskId` указано значение неверного типа ||
|| `100` | Invalid value {} to match with parameter {users}. Should be value of type array. | Указано неверное значение в параметре `users` ||
|| `100` | CTaskItem All parameters in the constructor must have real class type | Не указан обязательный параметр `taskId` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)