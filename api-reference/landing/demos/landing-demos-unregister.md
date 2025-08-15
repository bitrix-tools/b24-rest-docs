# Удалить зарегистрированный партнерский шаблон landing.demos.unregister

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.demos.unregister` удаляет зарегистрированный партнёрский шаблон. Возвращает *true* или ошибку. В случае, если шаблон уже был удален, или не найден, вернет *false*.

{% note warning %}

Удаляется как шаблон сайта с данным кодом, так и все шаблоны страниц с данным кодом. Созданные сайты и страниц по этим шаблонам остаются нетронутыми.

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **code**
[`unknown`](../../data-types.md) | Символьный код шаблона. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.demos.unregister',
    		{
    			code: 'myfirstsite'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.demos.unregister',
                [
                    'code' => 'myfirstsite'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unregistering demo: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.demos.unregister',
        {
            code: 'myfirstsite'
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}