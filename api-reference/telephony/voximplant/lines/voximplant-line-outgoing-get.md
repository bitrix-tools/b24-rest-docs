# Получить текущую выбранную линию в качестве исходящей линии по умолчанию voximplant.line.outgoing.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony all](../../_includes/scope-telephony-all.md) %}

Метод `voximplant.line.outgoing.get` возвращает текущую выбранную линии в качестве исходящей линии по умолчанию. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Управление номерами - изменение - любые`.

Входных параметров нет.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'voximplant.line.outgoing.get',
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
                'voximplant.line.outgoing.get',
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
        echo 'Error getting outgoing lines: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.line.outgoing.get',
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

Возвращает идентификатор линии (цифровой для арендованных, regXXX - для Облачных АТС, sipXXX - для Офисных АТС).