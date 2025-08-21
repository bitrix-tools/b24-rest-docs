# Удаление блока из Мои блоки

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

{% note info "landing.landing.unFavoriteBlock" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.landing.unFavoriteBlock` удаляет блок, который был сохранен в «Мои блоки».

## Параметры

#|
|| **Метод** | **Описание** ||
|| **blockId**
[`unknown`](../../../data-types.md) | Идентификатор блока. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.unFavoriteBlock',
    		{
    			blockId: 81827
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
                'landing.landing.unFavoriteBlock',
                [
                    'blockId' => 81827
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
        echo 'Error un-favoriting block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.unFavoriteBlock',
        {
            blockId: 81827
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