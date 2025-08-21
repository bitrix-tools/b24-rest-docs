# Удалить спринт tasks.api.scrum.sprint.delete

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод `tasks.api.scrum.sprint.delete` удаляет спринт.

При удалении спринта с задачами задачи будут перемещены в бэклог.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор спринта ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 1
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.delete
    ```
    
- cURL (oAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 1
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.delete
    ```
    
- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.sprint.delete',
    		{
    			id: sprintId
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'tasks.api.scrum.sprint.delete',
                [
                    'id' => $sprintId
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting sprint: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const sprintId = 1;
    BX24.callMethod(
        'tasks.api.scrum.sprint.delete',
        {
            id: sprintId
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

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.sprint.delete',
        [
            'id' => 1,
        ]
    );

    // Обработка ответа от Битрикс24
    if (isset($result['error'])) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result" : []
}
```

При успешном удалении метод возвращает пустой массив.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Sprint not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `0` | `Access denied` | Нет доступа к Скраму ||
|| `0` | `Sprint not found` | Такого спринта не существует ||
|| `0` | `It is forbidden remove a sprint with items` | Нельзя удалить спринт, в котором есть задачи ||
|| `0` | `Sprint items have not been moved to backlog` | Не удалось переместить задачи из спринта в бэклог ||
|| `100` | `Could not find value for parameter {id}` | Неверно указано имя параметра или не задан параметр ||
|| `100` | `Invalid value {stringValue} to match with parameter {id}. Should be value of type int` | Неверный тип параметра ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-sprint-add.md)
- [{#T}](./tasks-api-scrum-sprint-update.md)
- [{#T}](./tasks-api-scrum-sprint-start.md)
- [{#T}](./tasks-api-scrum-sprint-complete.md)
- [{#T}](./tasks-api-scrum-sprint-get.md)
- [{#T}](./tasks-api-scrum-sprint-list.md)
- [{#T}](./tasks-api-scrum-sprint-get-fields.md)
