# Изменить пункт чек-листа task.checklistitem.update

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не хватает примеров (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- добавить описание с подсказками, что можно проверять право на изменение специальным методом

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.checklistitem.update` обновляет данные элемента чек-листа.

Рекомендуется перед обновлением данных проверять, допустимо ли данное действие ([task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md)).

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **TASKID^*^**
[`unknown`](../../data-types.md) | Идентификатор задачи. ||
|| **ITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор элемента чек-листа. ||
|| **FIELDS^*^**
[`unknown`](../../data-types.md) | Массив полей элемента чек-листа (**TITLE**, **SORT_INDEX**, **IS_COMPLETE**). ||
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
    		'task.checklistitem.update',
    		[13, 25, {'TITLE': 'Пункт не выполнен', 'IS_COMPLETE': 'N'}]
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
                'task.checklistitem.update',
                [
                    13,
                    25,
                    ['TITLE' => 'Пункт не выполнен', 'IS_COMPLETE' => 'N'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Обновляем для элемента c ID=25 состояние на "невыполнен", а текст на "Пункт не выполнен"
    BX24.callMethod(
        'task.checklistitem.update',
        [13, 25, {'TITLE': 'Пункт не выполнен', 'IS_COMPLETE': 'N'}],
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}