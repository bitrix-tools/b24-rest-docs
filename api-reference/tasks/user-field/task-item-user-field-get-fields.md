# Получить поля пользовательского поля task.item.userfield.getfields

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (должно быть три примера - curl, js, php)
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

Метод `task.item.userfield.getfields` возвращает все доступные поля.

## Параметры

Без параметров.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.userfield.getfields',
    		{}
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
                'task.item.userfield.getfields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.userfield.getfields',
        {},
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Список полей

#|
|| **Код** / **Тип** | **Поле** | **Примечание** ||
|| **ID**
[`int`](../../data-types.md) | Идентификатор | Только для чтения ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Объект ||
|| **FIELD_NAME**
[`string`](../../data-types.md) | Код | Неизменяемое ||
|| **USER_TYPE_ID**
[`string`](../../data-types.md) | Тип данных | Неизменяемое ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор (XML ID) ||
|| **SORT**
[`int`](../../data-types.md) | Сортировка ||
|| **MULTIPLE**
[`char`](../../data-types.md) | Множественное ||
|| **MANDATORY**
[`char`](../../data-types.md) | Обязательное ||
|| **SHOW_FILTER**
[`char`](../../data-types.md) | Показывать в фильтре списка ||
|| **SHOW_IN_LIST**
[`char`](../../data-types.md) | Показывать в списке ||
|| **EDIT_IN_LIST**
[`char`](../../data-types.md) | Разрешать редактирование пользователем ||
|| **IS_SEARCHABLE**
[`char`](../../data-types.md) | Значения поля участвуют в поиске ||
|| **EDIT_FORM_LABEL**
[`string`](../../data-types.md) | Подпись в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`string`](../../data-types.md) | Заголовок в списке ||
|| **LIST_FILTER_LABEL**
[`string`](../../data-types.md) | Подпись фильтра в списке ||
|| **ERROR_MESSAGE**
[`string`](../../data-types.md) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../data-types.md) | Помощь ||
|| **LIST**
[`uf_enum_element`](../../data-types.md) | Элементы списка | Множественное ||
|| **SETTINGS**
[`object`](../../data-types.md) | Дополнительные настройки (зависят от типа) ||
|#