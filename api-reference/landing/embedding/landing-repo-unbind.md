# Удалить места встраивания landing.repo.unbind

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют параметры или поля
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

Удаление происходит собственным методом модуля `landing.repo.unbind`, которому просто передаётся код места встраивания. Удалятся все места встраивания по этому коду. Если приложением зарегистрировано несколько мест с различными путями, то удалить конкретное можно, передав адрес места встраивания.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.unbind',
    		{
    			code: 'LANDING_SETTINGS',
        //        handler: 'https://site.ru/rt/placement.php?version=3'
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.info(result);
    	}
    }
    catch(error)
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
                'landing.repo.unbind',
                [
                    'code' => 'LANDING_SETTINGS',
                    // 'handler' => 'https://site.ru/rt/placement.php?version=3'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unbinding landing repository: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.unbind',
        {
            code: 'LANDING_SETTINGS',
    //        handler: 'https://site.ru/rt/placement.php?version=3'
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}