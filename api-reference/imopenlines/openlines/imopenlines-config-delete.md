# Удалить открытую линию imopenlines.config.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет открытую линию.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CONFIG_ID***
[`unknown`](../../data-types.md) | Идентификатор линии ||
|#

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS


    ```js
    try
    {
    	const params = {
    		CONFIG_ID: 1
    	};
    	
    	const response = await $b24.callMethod(
    		'imopenlines.config.delete',
    		params
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		alert("Error: " + result.error());
    	}
    	else
    	{
    		alert("Успешно: " + result);
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
        $params = [
            'CONFIG_ID' => 1
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.config.delete',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Успешно: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //imopenlines.config.delete
    function configDelete()
    {
        var params = {
            CONFIG_ID: 1
        };
        BX24.callMethod(
            'imopenlines.config.delete',
            params,
            function (result) {
                if (result.error())
                    alert("Error: " + result.error());
                else
                    alert("Успешно: " + result.data());
            }
        );
    }
    ```

- PHP CRest

    // пример для php

{% endlist %}
