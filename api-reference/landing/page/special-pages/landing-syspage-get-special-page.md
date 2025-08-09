# Получить адрес специальной страницы сайта landing.syspage.getSpecialPage

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

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.syspage.getSpecialPage` возвращает адрес специальной страницы сайта. В примере показано как получить ссылку на страницу персонального раздела сайта.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.syspage.getSpecialPage',
    		{
    			siteId: 1391,// ИД сайта
    			type: 'personal',// тип специальной страницы
    			additional: {// необязательный массив доп. параметров, которые будут добавлены к URL
    				SECTION: 'private'
    			}
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
                'landing.syspage.getSpecialPage',
                [
                    'siteId' => 1391, // ИД сайта
                    'type' => 'personal', // тип специальной страницы
                    'additional' => [ // необязательный массив доп. параметров, которые будут добавлены к URL
                        'SECTION' => 'private'
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
        echo 'Error getting special page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.syspage.getSpecialPage',
        {
            siteId: 1391,// ИД сайта
            type: 'personal',// тип специальной страницы
            additional: {// необязательный массив доп. параметров, которые будут добавлены к URL
                SECTION: 'private'
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