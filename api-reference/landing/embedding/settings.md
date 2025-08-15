# Меню настроек LANDING_SETTINGS

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров

{% endnote %}

{% endif %}

Место встраивания **LANDING_SETTINGS** позволяет добавить новый пункт в меню настроек (Страницы / Сайта) в режиме редактирования страницы.

## Параметры

Для данного места встраивания доступны параметры:

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **SITE_ID**
[`unknown`](../../data-types.md) | идентификатор сайта. | ||
|| **LID**
[`unknown`](../../data-types.md) | идентификатор страницы. | ||
|#

Получить параметры можно из PLACEMENT_OPTIONS:

```php
$placement = isset($_REQUEST['PLACEMENT_OPTIONS'])
    ? json_decode($_REQUEST['PLACEMENT_OPTIONS'], true)
    : [];
```

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.bind',
    		{
    			fields: {
    				PLACEMENT: 'LANDING_SETTINGS',
    				PLACEMENT_HANDLER: 'https://cpe/rest/settings.php',
    				TITLE: 'My settings'
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
                'landing.repo.bind',
                [
                    'fields' => [
                        'PLACEMENT'        => 'LANDING_SETTINGS',
                        'PLACEMENT_HANDLER' => 'https://cpe/rest/settings.php',
                        'TITLE'            => 'My settings',
                    ],
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
        echo 'Error binding repository: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_SETTINGS',
                PLACEMENT_HANDLER: 'https://cpe/rest/settings.php',
                TITLE: 'My settings'
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

{% include [Сноска о примерах](../../../_includes/examples.md) %}