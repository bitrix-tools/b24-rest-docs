# Получить папки сайта landing.site.getFolders

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

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.site.getFolders` получает папки сайта.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **siteId**
[`unknown`](../../data-types.md) | Идентификатор сайта. 

{% note warning %}

Требуются права на запись в указанный сайт. 

{% endnote %}

| ||
|| **filter**
[`unknown`](../../data-types.md) | Опциональный фильтр. Может принимать поля:
- ACTIVE – активность папки (Y/N). По умолчанию создается не активной;
- DELETED – папка удалена (Y/N). По умолчанию возвращаются не удаленные папки;
- PARENT_ID – идентификатор родительской папки;
- TITLE – заголовок папки;
- INDEX_ID – идентификатор индексной страницы папки;
- CODE – символьный код папки;
- CREATED_BY_ID – идентификатор пользователя, создавшего папку;
- MODIFIED_BY_ID – идентификатор пользователя, изменившего папку; | ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getFolders',
    		{
    			siteId: 1817,
    			filter: {
    				TITLE: 'Измененная папка'
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
                'landing.site.getFolders',
                [
                    'siteId' => 1817,
                    'filter' => [
                        'TITLE' => 'Измененная папка'
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
        echo 'Error getting site folders: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getFolders',
        {
            siteId: 1817,
            filter: {
                TITLE: 'Измененная папка'
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