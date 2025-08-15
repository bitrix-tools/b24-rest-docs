# Определить модели прав landing.role.isEnabled

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `landing.role.isEnabled` определяет, какая модель в данный момент включена на проекте, расширенная или ролевая.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.role.isEnabled',
    		{}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		if (result.data())
    		{
    			console.log('Ролевая модель');
    		}
    		else
    		{
    			console.log('Расширенная модель');
    		}
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
        $response = $b24Service
            ->core
            ->call(
                'landing.role.isEnabled',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            if ($result->data()) {
                echo 'Ролевая модель';
            } else {
                echo 'Расширенная модель';
            }
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking role model: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.isEnabled',
        {
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                if (result.data())
                {
                    console.log('Ролевая модель');
                }
                else
                {
                    console.log('Расширенная модель');
                }
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}