# Перенести пункт чек-листа task.checklistitem.moveafteritem

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

Метод `task.checklistitem.moveafteritem` помещает элемент чек-листа в списке после указанного.

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **TASKID^*^**
[`unknown`](../../data-types.md) | Идентификатор задачи. ||
|| **ITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор элемента чек-листа. ||
|| **AFTERITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор элемента чек-листа, после которого будет помещен заданный элемент. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% note info %}

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

{% endnote %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.checklistitem.moveafteritem',
    		[13, 21, 9]
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
                'task.checklistitem.moveafteritem',
                [13, 21, 9]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error moving checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.moveafteritem',
        [13, 21, 9],
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}