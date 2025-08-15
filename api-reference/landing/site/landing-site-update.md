# Изменить сайт landing.site.update

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

Метод `landing.site.update` вносит изменения в сайт. Возвращает `true` в случае успеха, или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор сущности. | ||
|| **fields**
[`unknown`](../../data-types.md) | Изменяемые поля сущности. | ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.update',
    		{
    			id: 206,
    			fields: {
    				TITLE: 'My second site!'
    			}
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
                'landing.site.update',
                [
                    'id' => 206,
                    'fields' => [
                        'TITLE' => 'My second site!'
                    ]
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
        echo 'Error updating site: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.update',
        {
            id: 206,
            fields: {
                TITLE: 'My second site!'
            }
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