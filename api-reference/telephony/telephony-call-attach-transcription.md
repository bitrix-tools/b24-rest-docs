# Добавить расшифровку записи к звонку telephony.call.attachTranscription

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony all](./_includes/scope-telephony-all.md) %}

Метод `telephony.call.attachTranscription` добавляет расшифровку записи к звонку.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **CALL_ID** 
[`string`](../data-types.md) | Идентификатор звонка. ||
|| **COST** 
[`float`](../data-types.md) | Стоимость расшифровки. ||
|| **COST_CURRENCY** 
[`string`](../data-types.md) | Валюта стоимости расшифровки. ||
|| **MESSAGES** | Расшифровка звонка. Массив объектов типа `TranscriptMessage`. ||
|#

## Поля класса TranscriptMessage

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **SIDE** 
[`string`](../data-types.md) | Участник разговора. Варианты значения: 
- User - пользователь портала, 
- Client - внешний участник. ||
|| **START_TIME** 
[`int`](../data-types.md) | Время начала фразы в секундах, считая от начала разговора. ||
|| **STOP_TIME** 
[`int`](../data-types.md) | Время окончания фразы в секундах, считая от начала разговора. ||
|| **MESSAGE** 
[`string`](../data-types.md) | Текст фразы. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"telephony.call.attachTranscription",
    		{
    			CALL_ID: callId,
    			MESSAGES: messages
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
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
                'telephony.call.attachTranscription',
                [
                    'CALL_ID' => $callId,
                    'MESSAGES' => [
                        [
                            'SIDE' => 'User',
                            'START_TIME' => 1,
                            'STOP_TIME' => 3,
                            'MESSAGE' => 'Добрый день, чем могу помочь'
                        ],
                        [
                            'SIDE' => 'Client',
                            'START_TIME' => 4,
                            'STOP_TIME' => 8,
                            'MESSAGE' => 'Здравствуйте, вы продаете пылесосы?'
                        ],
                        [
                            'SIDE' => 'User',
                            'START_TIME' => 9,
                            'STOP_TIME' => 11,
                            'MESSAGE' => 'К сожалению, нет'
                        ],
                        [
                            'SIDE' => 'Client',
                            'START_TIME' => 11,
                            'STOP_TIME' => 13,
                            'MESSAGE' => 'Понятно, до свидания'
                        ],
                        [
                            'SIDE' => 'User',
                            'START_TIME' => 13,
                            'STOP_TIME' => 15,
                            'MESSAGE' => 'До свидания'
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error attaching transcription: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var callId = '<Id of the call>';
    var messages = [
        {
            SIDE: "User",
            START_TIME: 1,
            STOP_TIME: 3,
            MESSAGE: "Добрый день, чем могу помочь"
        },
        {
            SIDE: "Client",
            START_TIME: 4,
            STOP_TIME: 8,
            MESSAGE: "Здравствуйте, вы продаете пылесосы?"
        },
        {
            SIDE: "User",
            START_TIME: 9,
            STOP_TIME: 11,
            MESSAGE: "К сожалению, нет"
        },
        {
            SIDE: "Client",
            START_TIME: 11,
            STOP_TIME: 13,
            MESSAGE: "Понятно, до свидания"
        },
        {
            SIDE: "User",
            START_TIME: 13,
            STOP_TIME: 15,
            MESSAGE: "До свидания"
        },
    ];

    BX24.callMethod(
        "telephony.call.attachTranscription",
        {
            CALL_ID: callId,
            MESSAGES: messages
        },
        function(response)
        {
            console.log(response.data())
        }
    );
    ```

{% endlist %}



{% include [Сноска о примерах](../../_includes/examples.md) %}