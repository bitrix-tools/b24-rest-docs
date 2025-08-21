# Изменить страницу landing.landing.update

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

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.landing.update` вносит изменения в страницу. Возвращает *true* в случае успеха, или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор сущности. ||
|| **fields**
[`unknown`](../../../data-types.md) | Изменяемые поля сущности. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.update',
    		{
    			lid: 349,
    			fields: {
    				TITLE: 'My second page!'
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
                'landing.landing.update',
                [
                    'lid' => 349,
                    'fields' => [
                        'TITLE' => 'My second page!'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating landing: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.update',
        {
            lid: 349,
            fields: {
                TITLE: 'My second page!'
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}