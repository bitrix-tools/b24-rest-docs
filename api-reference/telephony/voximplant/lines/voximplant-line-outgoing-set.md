# Установить выбранную линию в качестве исходящей линии по умолчанию voximplant.line.outgoing.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony admin](../../_includes/scope-telephony-admin.md) %}

Метод `voximplant.line.outgoing.set` устанавливает выбранную линию в качестве исходящей линии по умолчанию. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Настройки телефонии - изменение - любые`.

#|
|| **Параметр** | **Описание** ||
|| **LINE_ID** | Идентификатор линии, полученный от метода [voximplant.line.get](voximplant-line-get.md) или [voximplant.line.outgoing.get](voximplant-line-outgoing-get.md). ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"voximplant.line.outgoing.set",
    		{
    			"LINE_ID": 55,
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
                'voximplant.line.outgoing.set',
                [
                    'LINE_ID' => 55,
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
        echo 'Error setting outgoing line: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "voximplant.line.outgoing.set",
        {
            "LINE_ID": 55,
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

## Ответ в случае успеха

Возвращает 1 при успешном выполнении