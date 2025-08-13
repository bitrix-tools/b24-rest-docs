# Делегировать задание бизнес-процесса bizproc.task.delegate

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, ответственный за задание бизнес-процесса

Метод делегирует задание бизнес-процесса. Делегировать можно только свое задание.

{% note tip "Пользовательская документация" %}

- [Действия: Задания](https://helpdesk.bitrix24.ru/open/7451037/)

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASK_IDS***
[`array`](../../data-types.md) | Список идентификаторов заданий.

Получить идентификаторы можно методом [bizproc.task.list](./bizproc-task-list.md) ||
|| **FROM_USER_ID***
[`integer`](../../data-types.md) | Идентификатор пользователя, от которого задачи будут делегированы.

Получить идентификатор пользователя можно методом [user.get](../../user/user-get.md) ||
|| **TO_USER_ID***
[`integer`](../../data-types.md) | Идентификатор пользователя, которому задачи будут делегированы.

Получить идентификатор пользователя можно методом [user.get](../../user/user-get.md).

Кому можно делегировать, зависит от настроек задания: только подчиненным, всем сотрудникам или никому. ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_IDS":[1128,1129,1130],"FROM_USER_ID":15,"TO_USER_ID":37}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/bizproc.task.delegate
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_IDS":[1128,1129,1130],"FROM_USER_ID":15,"TO_USER_ID":37,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.task.delegate
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'bizproc.task.delegate',
            {
                TASK_IDS: [1128, 1129, 1130],
                FROM_USER_ID: 15,
                TO_USER_ID: 37,
            }
        );
        
        const result = response.getData().result;
        console.log('Delegated tasks:', result);
        
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
                'bizproc.task.delegate',
                [
                    'TASK_IDS' => [1128, 1129, 1130],
                    'FROM_USER_ID' => 15,
                    'TO_USER_ID' => 37,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error delegating task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.task.delegate',
        {
            'TASK_IDS': [1128, 1129, 1130],
            'FROM_USER_ID': 15,
            'TO_USER_ID': 37,
        },
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.task.delegate',
        [
            'TASK_IDS' => [1128, 1129, 1130],
            'FROM_USER_ID' => 15,
            'TO_USER_ID' => 37
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
    "result": true,
    "time": {
        "start": 1748526089.625516,
        "finish": 1748526089.656787,
        "duration": 0.03127098083496094,
        "processing": 0.008746147155761719,
        "date_start": "2025-05-29T16:41:29+03:00",
        "date_finish": "2025-05-29T16:41:29+03:00",
        "operating_reset_at": 1748526689,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если задание делегировано успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_INVALID_USER_ID",
    "error_description": "Invalid FROM_USER_ID"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок
 
#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ERROR_TASK_VALIDATION` | Invalid TASK_IDS | Некорректные идентификаторы задач или не передан параметр `TASK_IDS` ||
|| `ERROR_INVALID_USER_ID` | Invalid FROM_USER_ID | Некорректный или отсутствующий идентификатор пользователя, от которого идет делегирование ||
|| `ERROR_INVALID_USER_ID` | Invalid TO_USER_ID | Некорректный или отсутствующий идентификатор пользователя, которому идет делегирование ||
|| `ERROR_DELEGATION_NOT_ALLOWED` | Пользователь не является ответственным за задание | Пользователь, указанный в параметре `FROM_USER_ID` не является ответственным за задание ||
|| `ERROR_DELEGATION_NOT_ALLOWED` | Делегирование заданий доступно только для интранет-пользователей | Пользователь, указанный в параметре `TO_USER_ID`, не является интранет-пользователем ||
|| `ERROR_DELEGATION_NOT_ALLOWED` | Перечисление ошибок через символ `;` | В методе можно передать несколько заданий. Если возникнут ошибки в нескольких заданиях, они вернуться перечислением через символ `;` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-task-list.md)
- [{#T}](./bizproc-task-complete.md)
