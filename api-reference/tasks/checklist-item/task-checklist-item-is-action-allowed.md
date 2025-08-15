# Проверить разрешение действия task.checklistitem.isactionallowed

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не хватает примеров (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.checklistitem.isactionallowed` проверяет, разрешено ли действие.

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **TASKID^*^**
[`unknown`](../../data-types.md) | Идентификатор задачи. ||
|| **ITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор элемента чек-листа. ||
|| **ACTIONID^*^**
[`unknown`](../../data-types.md) | Идентификатор проверяемого действия:
- **1** - ACTION_TIME_ADD;
- **2** - ACTION_MODIFY;
- **3** - ACTION_REMOVE;
- **4** - ACTION_TOGGLE. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.checklistitem.isactionallowed',
    		[13, 21, 2]
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'task.checklistitem.isactionallowed',
                [13, 21, 2]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking if action is allowed: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Для элемента с ID=21 проверяем, разрешено ли действие его изменения
    BX24.callMethod(
        'task.checklistitem.isactionallowed',
        [13, 21, 2],
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}