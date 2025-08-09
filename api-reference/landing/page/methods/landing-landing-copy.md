# Копировать страницу landing.landing.copy

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

Метод `landing.landing.copy` копирует указанную страницу. Возвращает идентификатор новой страницы.

## Параметры

#|
|| **Параметры** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы. ||
|| **toSiteId**
[`unknown`](../../../data-types.md) | Не обязательный параметр, идентификатор сайта. Если указан, копирование произойдет в указанный сайт. ||
|| **toFolderId**
[`unknown`](../../../data-types.md) | Не обязательный параметр, идентификатор папки. Если указан, то копирование произойдет в указанную папку (при ее существовании и наличии туда доступа). В ином случае копирование произойдет в те же папку, в которой находится страница, либо в корень, в случае если источник также в корне. | 18.7.500 ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.copy',
    		{
    			lid: 1688
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch(error)
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
                'landing.landing.copy',
                [
                    'lid' => 1688
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
        echo 'Error copying landing: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.copy',
        {
            lid: 1688
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