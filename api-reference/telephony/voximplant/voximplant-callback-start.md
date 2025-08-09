# Запустить обратный звонок voximplant.callback.start

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

Метод `voximplant.callback.start` запускает обратный звонок. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Исходящий звонок - Выполнение - любые`.

Алгоритм обратного звонка выглядит так:

0. Клиент заполняет некую форму на сайте, указывает свой номер.

1. По факту заполнения формы, стороннее приложение запускает rest-апи метод.

2. Система выполняет входящий звонок на указанную в параметре FROM_LINE линию, в соответствии с настройками линии и дожидается соединения с менеджером. входящий звонок - настоящий, со всеми правилами обработки. т.е. если, например, на линии включена переадресация на мобильный - звонок пойдет на мобильный.

3. После того, как менеджер возьмет трубку, система произносит для менеджера текст, указанный в параметре TEXT_TO_PRONOUNCE, голосом, указанным в параметре VOICE. Это необходимо, чтобы менеджер понял, что ему поступил не обычный входящий звонок, а именно обратный звонок.

4. Система выполняет исходящий звонок на номер, указанный в параметре TO_NUMBER, и, после того, как клиент возьмет трубку, соединяет его с менеджером.

Для доступа к методу приложение должно запросить право доступа Совершение звонков (call). Право указывается при регистрации приложения.

#|
|| **Параметр** | **Описание** ||
|| **FROM_LINE** | ID линии, с которой будет выполняться звонок. Список доступных линий можно получить методом [voximplant.line.get](lines/voximplant-line-get.md). ||
|| **TO_NUMBER** | Номер, на который звонить. ||
|| **TEXT_TO_PRONOUNCE** | Текст, который произносится менеджеру перед началом звонка. ||
|| **VOICE** | Голос, которым произнести этот текст (необязательный). Список голосов можно получить методом [voximplant.tts.voices.get](voximplant-tts-voices-get.md). ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'voximplant.callback.start',
    		{
    			"FROM_LINE": "reg1332",
    			"TO_NUMBER": "7911xxxxxxx",
    			"TEXT_TO_PRONOUNCE": "Вам поступил запрос на обратный звонок, соединяю с клиентом.",
    			"VOICE": "ruinternalfemale"
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
                'voximplant.callback.start',
                [
                    'FROM_LINE'         => 'reg1332',
                    'TO_NUMBER'         => '7911xxxxxxx',
                    'TEXT_TO_PRONOUNCE' => 'Вам поступил запрос на обратный звонок, соединяю с клиентом.',
                    'VOICE'             => 'ruinternalfemale',
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
        echo 'Error starting callback: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.callback.start',
        {
            "FROM_LINE": "reg1332",
            "TO_NUMBER": "7911xxxxxxx",
            "TEXT_TO_PRONOUNCE": "Вам поступил запрос на обратный звонок, соединяю с клиентом.",
            "VOICE": "ruinternalfemale"
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