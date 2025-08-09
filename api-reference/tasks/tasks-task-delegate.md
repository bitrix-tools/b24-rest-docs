# Делегировать задачу tasks.task.delegate

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.delegate` для делегирования задачи

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **taskId**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|| **userId**
[`unknown`](../data-types.md) | Идентификатор пользователя, на которого необходимо делегировать задачу. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.task.delegate',
    		{taskId: 1, userId: 2}
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
                'tasks.task.delegate',
                [
                    'taskId' => 1,
                    'userId' => 2,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . $result['answer']['result'];
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error delegating task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.delegate',
        {taskId:1, userId: 2},
        function(res){console.log(res.answer.result);}
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}