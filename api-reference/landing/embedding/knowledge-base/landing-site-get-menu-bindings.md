# Получить список привязок в меню landing.site.getMenuBindings

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

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.site.getMenuBindings` возвращает список привязанных к меню (конкретному или всем) Баз знаний. Вернутся только привязки, к Базам знаний которых текущий пользователь имеет доступ на чтение.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **menuCode**
[`unknown`](../../../data-types.md) | Символьный код меню, как мы определяли выше. Не обязательный, по умолчанию возвращаются все привязки. | ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getMenuBindings',
    		{
    			menuCode: 'crm_switcher:deal'
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
                'landing.site.getMenuBindings',
                [
                    'menuCode' => 'crm_switcher:deal'
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
        echo 'Error getting menu bindings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getMenuBindings',
        {
            menuCode: 'crm_switcher:deal'
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}