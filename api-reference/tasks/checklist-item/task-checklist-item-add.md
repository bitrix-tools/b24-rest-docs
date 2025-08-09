# Добавить пункт чек-листа task.checklistitem.add

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- не хватает 1 примера (должно быть три примера - curl, js, php)
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

Метод `task.checklistitem.add` добавляет новый элемент чек-листа к задаче. Возвращает идентификатор добавленного элемента. Метод не добавляет права на задачу указанному в массиве `FIELDS` пользователю, как это делается через интерфейс Б24. Если у пользователя не было прав на просмотр, то появление его в чек-листе в любой роли не сделает задачу доступной.

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **TASKID**
[`unknown`](../../data-types.md) | Идентификатор задачи. Обязательный параметр. ||
|| **FIELDS**
[`unknown`](../../data-types.md) | Массив полей элемента чек-листа (`TITLE`, `SORT_INDEX`, `IS_COMPLETE`). Обязательный параметр. ||
|#

{% note info %}

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

{% endnote %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.checklistitem.add',
    		[13, {'TITLE': 'Пункт выполнен', 'IS_COMPLETE': 'Y'}]
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
                'task.checklistitem.add',
                [
                    13,
                    ['TITLE' => 'Пункт выполнен', 'IS_COMPLETE' => 'Y']
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
        echo 'Error adding checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Добавляем к задаче с ID=13 новый "выполненный" элемент чек-листа с текстом "Пункт выполнен"
    BX24.callMethod(
        'task.checklistitem.add',
        [13, {'TITLE': 'Пункт выполнен', 'IS_COMPLETE': 'Y'}],
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    // Для добавления пользователя к элементу чек-листа:
    $fields = [
        'TITLE' => "Заголовок пункта Имя Пользователя",//$user['NAME']." ".$user['LAST_NAME'], порядок в зависимости от настроек портала.
        'IS_COMPLETE' => 'N',
        'IS_IMPORTANT' => 'N',
        'MEMBERS' => [13 => ['TYPE' => 'A']], //TYPE - роль_в_чеклисте: A - соисполнитель, U - наблюдатель
        'PARENT_ID' => '$result[0]' // для вызова в batch, иначе просто ID вышестоящего элемента
    ];
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}