# Получить набор ссылок для навигации по страницам телефонии voximplant.url.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony all](../_includes/scope-telephony-all.md) %}

Метод `voximplant.url.get` возвращает набор ссылок для навигации по страницам телефонии. Метод не имеет ограничений по [правам](https://helpdesk.bitrix24.ru/open/18177766/).

Входных параметров нет.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'voximplant.url.get',
    		{}
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
                'voximplant.url.get',
                []
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
        echo 'Error getting Voximplant URL: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.url.get',
        {},
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

## Возвращаемые данные

#|
|| **Поле** | **Описание** ||
|| **detail_statistics** | Страница детальной статистики (таблица). ||
|| **buy_connector** | Страница для покупки SIP коннектора. ||
|| **edit_config** | Страница для настройки подключенной линии (SIP-номера), `#CONFIG_ID#` нужно заменить на необходимый идентификатор настройки. ||
|#
