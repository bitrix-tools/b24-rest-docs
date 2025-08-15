# Получить открытую линию по Id imopenlines.config.get

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

Метод получает открытую линию по её ID.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CONFIG_ID***
[`unknown`](../../data-types.md) | ID линии ||
|| **WITH_QUEUE**
[`unknown`](../../data-types.md) | Выводить со списком операторов линии (Y/N, по-умолчанию: Y) ||
|| **SHOW_OFFLINE**
[`unknown`](../../data-types.md) | Показывать ли список вместе с операторами, которые не в сети (Y/N, по-умолчанию: Y) ||
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
    		CONFIG_ID:    1,
    		WITH_QUEUE: 'Y',
    		SHOW_OFFLINE: 'Y'
    	};
    	
    	const response = await $b24.callMethod(
    		'imopenlines.config.get',
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
            'CONFIG_ID'   => 1,
            'WITH_QUEUE'  => 'Y',
            'SHOW_OFFLINE' => 'Y',
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.config.get',
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
        echo 'Error calling imopenlines.config.get: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //imopenlines.config.get
    function configGet()
    {
        var params = {
            CONFIG_ID:    1,
            WITH_QUEUE: 'Y',
            SHOW_OFFLINE: 'Y'
        };
        BX24.callMethod(
            'imopenlines.config.get',
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

