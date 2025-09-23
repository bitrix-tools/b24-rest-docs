# Осуществить звонок на указанный номер с автоматическим произнесением заданного текста voximplant.infocall.startwithtext

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

{% include notitle [Скоуп telephony all](../_includes/scope-telephony-all.md) %}

Метод `voximplant.infocall.startwithtext` осуществляет звонок на указанный номер с автоматическим произнесением заданного текста. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Исходящий звонок - Выполнение - любые`.

Для доступа к методу приложение должно запросить право доступа Совершение звонков (call). Право указывается при [регистрации приложения](../../../settings/app-installation/index.md).

#|
|| **Параметр** | **Описание** ||
|| **FROM_LINE** | ID линии, с которой будет выполняться звонок. Список доступных линий можно получить методом [voximplant.line.get](lines/voximplant-line-get.md). ||
|| **TO_NUMBER** | Номер, на который звонить. ||
|| **TEXT_TO_PRONOUNCE** | Текст для произнесения. ||
|| **VOICE** | Голос, которым произнести этот текст (необязательный). Список голосов можно получить методом [voximplant.tts.voices.get](voximplant-tts-voices-get.md). ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'voximplant.infocall.startwithtext',
    		{
    			"FROM_LINE": "reg1332",
    			"TO_NUMBER": "7911xxxxxxx",
    			"PRONOUNCE": "Добрый день. Ваша заявка выполнена",
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
                'voximplant.infocall.startwithtext',
                [
                    'FROM_LINE' => 'reg1332',
                    'TO_NUMBER' => '7911xxxxxxx',
                    'PRONOUNCE' => 'Добрый день. Ваша заявка выполнена',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error starting info call: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.infocall.startwithtext',
        {
            "FROM_LINE": "reg1332",
            "TO_NUMBER": "7911xxxxxxx",
            "PRONOUNCE": "Добрый день. Ваша заявка выполнена",
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