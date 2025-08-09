# Добавить страницу по шаблону landing.landing.addByTemplate

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

Метод `landing.landing.addByTemplate` добавляет страницу по шаблону (список шаблонов, который видит пользователь перед созданием страницы). Возвращает `ID` созданной страницы или ошибку.

Вы не можете влиять на поля создаваемой страницы, для этого вам поможет [landing.landing.add](./landing-landing-add.md).

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **siteId**
[`unknown`](../../../data-types.md) | `ID` сайта, в котором требуется создать страницу. ||
|| **code**
[`unknown`](../../../data-types.md) | Идентификатор шаблона для создания. Список шаблонов вы можете получить методом [landing.demos.getPageList](../../demos/landing-demos-get-page-list.md). ||
|| **fields**
[`unknown`](../../../data-types.md) | Необязательный. Можно передать массив полей для создаваемой страницы. Пока поддерживается только ключ TITLE и DESCRIPTION. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.addByTemplate',
    		{
    			siteId: 870,
    			code: 'agency',
    			fields: {
    				TITLE: 'Заголовок страницы',
    				DESCRIPTION: 'Описание страницы'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
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
                'landing.landing.addByTemplate',
                [
                    'siteId' => 870,
                    'code' => 'agency',
                    'fields' => [
                        'TITLE' => 'Заголовок страницы',
                        'DESCRIPTION' => 'Описание страницы'
                    ]
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
        echo 'Error adding landing by template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.addByTemplate',
        {
            siteId: 870,
            code: 'agency',
            fields: {
                TITLE: 'Заголовок страницы',
                DESCRIPTION: 'Описание страницы'
            }
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}