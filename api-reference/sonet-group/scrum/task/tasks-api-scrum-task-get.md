# Получить поля задачи Скрама по id tasks.api.scrum.task.get

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод получает значения полей задачи Скрама по её идентификатору `id`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор задачи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.task.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.task.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.task.get',
    		{
    			id: 1
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'tasks.api.scrum.task.get',
                [
                    'id' => 1
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting scrum task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.task.get',
        {
            id: 1
        },
            function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.api.scrum.task.get',
        [
            'id' => 1
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
        "entityId": 2,
        "storyPoints": "2",
        "epicId": 4,
        "sort": 1,
        "createdBy": 1,
        "modifiedBy": 1
    },
    "time": {
        "start": 1721402687.900315,
        "finish": 1721402694.313811,
        "duration": 6.413496017456055,
        "processing": 6.387248992919922,
        "date_start": "2024-07-19T15:24:47+00:00",
        "date_finish": "2024-07-19T15:24:54+00:00",
        "operating": 6.387217998504639
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными задачи ||
|| **entityId** 
[`integer`](../../../data-types.md) | Идентификатор бэклога или спринта ||
|| **storyPoints**
[`string`](../../../data-types.md) | Количество стори поинтов. 

Тип данных — строка, так как стори поинтом необязательно будет число ||
|| **epicId**
[`integer`](../../../data-types.md) | Идентификатор эпика ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего задачу ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменял задачу ||
|| **time**
[`array`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": 0,
    "error_description": "Task not found"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `0` | Task not found | Такой задачи не существует или у пользователя нет доступа к этой задаче ||
|| `100` | Could not find value for parameter {id} | Неверно указано имя параметра или не задан параметр ||
|| `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | Неверный тип параметра ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-task-update.md)
- [{#T}](./tasks-api-scrum-task-get-fields.md)