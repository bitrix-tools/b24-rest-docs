# Отключить режим «Без звука» tasks.task.unmute

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
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

Метод `tasks.task.unmute` выключает режим «Без звука» для задачи.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Возвращаемое значение

Возвращает json массив данных о задаче (аналогично методу [`tasks.task.get`](./tasks-task-get.md)).

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.task.unmute',
    		{
    			id: 1223
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Result:', result);
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
                'tasks.task.unmute',
                [
                    'id' => 1223,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unmuting task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('tasks.task.unmute', {id: 1223})
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}