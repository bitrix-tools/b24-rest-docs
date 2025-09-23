# Изменить папку в сайте landing.site.updateFolder

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

Метод `landing.site.updateFolder` изменяет папку в сайте.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **siteId**
[`unknown`](../../data-types.md) | Идентификатор сайта.

{% note warning %}

Требуются права на запись в указанный сайт.

{% endnote %}

 | ||
|| **folderId**
[`unknown`](../../data-types.md) | Идентификатор папки в сайте. | ||
|| **fields**
[`unknown`](../../data-types.md) | Поля папки: 
- ACTIVE – активность папки (Y/N). По умолчанию создается не активной;
- TITLE – заголовок (наименование) папки;
- INDEX_ID – идентификатор страницы внутри папки, которую требуется сделать индексной страницей папки;
- CODE – символьный код папки (часть URL страницы папки). По умолчанию транслитерируется из названия папки. | ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.updateFolder',
    		{
    			siteId: 1817,
    			folderId: 736,
    			fields: {
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
                'landing.site.updateFolder',
                [
                    'siteId'  => 1817,
                    'folderId' => 736,
                    'fields'  => [
                        'TITLE' => 'Измененная папка'
                    ],
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
        echo 'Error updating folder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.updateFolder',
        {
            siteId: 1817,
            folderId: 736,
            fields: {
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