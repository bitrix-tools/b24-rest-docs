# Переместить страницу в другой сайт / папку landing.landing.move

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
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

Метод `landing.landing.move` перемещает страницу в другой сайт и/или папку.

## Параметры

#|
|| **Параметры** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы, которую надо переместить. ||
|| **toSiteId**
[`unknown`](../../../data-types.md) | Идентификатор сайта, куда надо переместить страницу. Должны быть права на запись в данный сайт. ||
|| **toFolderId**
[`unknown`](../../../data-types.md) | Идентификатор папки сайта, куда надо переместить страницу. Папка должна находиться в указанном сайте. Для перемещения в корень сайта параметр следует опустить. (для перемещения в текущем сайте - опустить и параметр toSiteId). ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.move',
    		{
    			lid: 11262,
    			toSiteId: 1817,
    			toFolderId: 737
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
                'landing.landing.move',
                [
                    'lid'        => 11262,
                    'toSiteId'   => 1817,
                    'toFolderId' => 737,
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
        echo 'Error moving landing: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.move',
        {
            lid: 11262,
            toSiteId: 1817,
            toFolderId: 737
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