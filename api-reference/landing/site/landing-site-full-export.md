# Экспортировать сайт landing.site.fullExport

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

Метод `landing.site.fullExport` экспортирует сайт и всего его страницы в специальный массив, который требуется для работы метода [landing.demos.register](../demos/landing-demos-register.md).

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор сайта. | ||
|| **params**
[`unknown`](../../data-types.md) | Опциональный массив, ключи которого описаны в примере ниже. | ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.fullExport',
    		{
    			id: 326,
    			params: {
    				edit_mode: 'Y',
    				//scope: 'knowledge',//передаем scope, если требуется ([подробнее](.))
    				hooks_disable: ['B24BUTTON_CODE'],//коды доп.полей, которые не надо экспртировать
    				code: 'myfirstsite',//симв.код сайта
    				name: 'Сайт автомастерской',//имя сайта (страницы)
    				description: 'Сайт для вашего автосервиса. Под капотом все самое нужное.',//описание сайта
    				preview: 'http://site.ru/preview.jpg',//основная превью-картинка для списка шаблонов (реком. 280x115)
    				preview2x: 'http://site.ru/preview.jpg',//увеличенная превью-картинка (рекомен. 560x230)
    				preview3x: 'http://site.ru/preview.jpg'//ретина-размер превью картинки (рекомен. 845x345)
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
                'landing.site.fullExport',
                [
                    'id' => 326,
                    'params' => [
                        'edit_mode'    => 'Y',
                        //scope: 'knowledge',//передаем scope, если требуется ([подробнее](.))
                        'hooks_disable' => ['B24BUTTON_CODE'],//коды доп.полей, которые не надо экспртировать
                        'code'         => 'myfirstsite',//симв.код сайта
                        'name'         => 'Сайт автомастерской',//имя сайта (страницы)
                        'description'  => 'Сайт для вашего автосервиса. Под капотом все самое нужное.',//описание сайта
                        'preview'      => 'http://site.ru/preview.jpg',//основная превью-картинка для списка шаблонов (реком. 280x115)
                        'preview2x'    => 'http://site.ru/preview.jpg',//увеличенная превью-картинка (рекомен. 560x230)
                        'preview3x'    => 'http://site.ru/preview.jpg'//ретина-размер превью картинки (рекомен. 845x345)
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
        echo 'Error exporting site: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.fullExport',
        {
            id: 326,
            params: {
                edit_mode: 'Y',
                //scope: 'knowledge',//передаем scope, если требуется ([подробнее](.))
                hooks_disable: ['B24BUTTON_CODE'],//коды доп.полей, которые не надо экспртировать
                code: 'myfirstsite',//симв.код сайта
                name: 'Сайт автомастерской',//имя сайта (страницы)
                description: 'Сайт для вашего автосервиса. Под капотом все самое нужное.',//описание сайта
                preview: 'http://site.ru/preview.jpg',//основная превью-картинка для списка шаблонов (реком. 280x115)
                preview2x: 'http://site.ru/preview.jpg',//увеличенная превью-картинка (рекомен. 560x230)
                preview3x: 'http://site.ru/preview.jpg'//ретина-размер превью картинки (рекомен. 845x345)
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