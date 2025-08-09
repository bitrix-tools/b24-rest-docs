# Получить поля задачи Скрама tasks.api.scrum.task.getFields

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает доступные поля задачи Скрама.

Без параметров.

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.task.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.task.getFields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.task.getFields',
    		{}
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
                'tasks.api.scrum.task.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.task.getFields',
        {},
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.api.scrum.task.getFields',
        []
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
    "fields": 
    {
        "entityId": 
        {
            "type": "integer"
        },
        "storyPoints": 
        {
            "type": "string"
        },
        "epicId": 
        {
            "type": "integer"
        },
        "sort": 
        {
            "type": "integer"
        },
        "createdBy": 
        {
            "type": "integer"
        },
        "modifiedBy": 
        {
            "type": "integer"
        }
    }
}
```

### Возвращаемые данные {#fields}

В качестве ответа возвращается объект `fields`, который содержит все поля задачи скрама и их типы `type`.

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId**
`integer` | Идентификатор бэклога или спринта ||
|| **storyPoints**
`string` | Стори Поинты (относительная оценка сложности задачи).

Может иметь строковое значение ||
|| **epicId**
`integer` | Идентификатор эпика ||
|| **sort**
`integer` | Сортировка ||
|| **createdBy**
`integer` | Кем создана задача ||
|| **modifiedBy**
`integer` | Кем изменена задача ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-task-update.md)
- [{#T}](./tasks-api-scrum-task-get.md)