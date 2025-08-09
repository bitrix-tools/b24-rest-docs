# Обновить пользовательское поле task.item.userfield.update

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- не хватает 1 примера (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `task.item.userfield.update` используется для редактирования параметров свойства.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **auth**
[`unknown`](../../data-types.md) | Токен авторизации. ||
|| **ID**
[`unknown`](../../data-types.md) | Идентификатор пользовательского поля. ||
|| **DATA**
[`unknown`](../../data-types.md) | Массив `array('поле'=>'значение', ...)`. Содержит значения редактируемых параметров. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.userfield.update',
    		{
    			'auth': 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa',
    			'ID': 77,
    			'DATA': {'XML_ID': 'new_external_id'}
    		}
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
                'task.item.userfield.update',
                [
                    'auth' => 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa',
                    'ID' => 77,
                    'DATA' => ['XML_ID' => 'new_external_id']
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
        echo 'Error updating user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.userfield.update',
        {
            'auth': 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa',
            'ID': 77,
            'DATA': {'XML_ID': 'new_external_id'}
        },

        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- cURL

    ```http
    $appParams = array(
        'auth' => 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa',
        'ID' => 77,
        'DATA' => array('XML_ID' => 'new_external_id')
    ;
    ```

    ```http
    $request = 'http://your-domain.ru/rest/task.item.userfield.update.xml?' . http_build_query($appParams);
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}