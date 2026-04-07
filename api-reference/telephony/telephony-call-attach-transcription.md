# Добавить расшифровку записи к звонку telephony.call.attachTranscription

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.call.attachTranscription` добавляет расшифровку разговора к завершенному звонку.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID***
[`string`](../data-types.md) | Идентификатор звонка из метода [telephony.externalCall.register](./telephony-external-call-register.md) ||
|| **MESSAGES***
[`array`](../data-types.md) | Массив [реплик расшифровки](#messages) ||
|| **COST**
[`double`](../data-types.md) | Стоимость расшифровки.

По умолчанию — не задается ||
|| **COST_CURRENCY**
[`string`](../data-types.md) | Валюта стоимости расшифровки. Используется только вместе с `COST`.

По умолчанию — не задается ||
|#

### Параметр MESSAGES {#messages}

#|
|| **Название**
`тип` | **Описание** ||
|| **SIDE***
[`string`](../data-types.md) | Участник разговора.

Возможные значения:
- `User` — пользователь портала
- `Client` — клиент ||
|| **START_TIME***
[`integer`](../data-types.md) | Время начала реплики в секундах от начала звонка.

Минимальное значение — `0` ||
|| **STOP_TIME***
[`integer`](../data-types.md) | Время окончания реплики в секундах от начала звонка.

Минимальное значение — `1` ||
|| **MESSAGE***
[`string`](../data-types.md) | Текст реплики ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","MESSAGES":[{"SIDE":"User","START_TIME":1,"STOP_TIME":3,"MESSAGE":"Добрый день"},{"SIDE":"Client","START_TIME":4,"STOP_TIME":7,"MESSAGE":"Здравствуйте"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/telephony.call.attachTranscription
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","MESSAGES":[{"SIDE":"User","START_TIME":1,"STOP_TIME":3,"MESSAGE":"Добрый день"},{"SIDE":"Client","START_TIME":4,"STOP_TIME":7,"MESSAGE":"Здравствуйте"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.call.attachTranscription
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'telephony.call.attachTranscription',
            {
                CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                MESSAGES: [
                    { SIDE: 'User', START_TIME: 1, STOP_TIME: 3, MESSAGE: 'Добрый день' },
                    { SIDE: 'Client', START_TIME: 4, STOP_TIME: 7, MESSAGE: 'Здравствуйте' }
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Transcription attached:', result);
        processResult(result);
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
                    'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                    'MESSAGES' => [
                        ['SIDE' => 'User', 'START_TIME' => 1, 'STOP_TIME' => 3, 'MESSAGE' => 'Добрый день'],
                        ['SIDE' => 'Client', 'START_TIME' => 4, 'STOP_TIME' => 7, 'MESSAGE' => 'Здравствуйте']
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error attaching transcription: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.call.attachTranscription",
        {
            CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            MESSAGES: [
                { SIDE: 'User', START_TIME: 1, STOP_TIME: 3, MESSAGE: 'Добрый день' },
                { SIDE: 'Client', START_TIME: 4, STOP_TIME: 7, MESSAGE: 'Здравствуйте' }
            ]
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'telephony.call.attachTranscription',
        [
            'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            'MESSAGES' => [
                ['SIDE' => 'User', 'START_TIME' => 1, 'STOP_TIME' => 3, 'MESSAGE' => 'Добрый день'],
                ['SIDE' => 'Client', 'START_TIME' => 4, 'STOP_TIME' => 7, 'MESSAGE' => 'Здравствуйте']
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "TRANSCRIPT_ID": 1
    },
    "time": {
        "start": 1773136191,
        "finish": 1773136191.49517,
        "duration": 0.49517011642456055,
        "processing": 0,
        "date_start": "2026-03-10T12:49:51+03:00",
        "date_finish": "2026-03-10T12:49:51+03:00",
        "operating_reset_at": 1773136791,
        "operating": 0.1380019187927246
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **TRANSCRIPT_ID**
[`integer`](../data-types.md) | Идентификатор расшифровки ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "MESSAGES should be an array"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | CALL_ID should be set | Не передан `CALL_ID` ||
|| `ERROR_CORE` | MESSAGES should be an array | Параметр `MESSAGES` передан не как массив ||
|| `ERROR_CORE` | MESSAGES[{N}][SIDE] should be either Client or User | Недопустимое значение `SIDE` ||
|| `ERROR_CORE` | MESSAGES[{N}][START_TIME] should be greater or equal to zero | Некорректное `START_TIME` ||
|| `ERROR_CORE` | MESSAGES[{N}][STOP_TIME] should be greater than zero | Некорректное `STOP_TIME` ||
|| `ERROR_CORE` | MESSAGES[{N}][MESSAGE] is empty | Пустой текст реплики ||
|| `ERROR_CORE` | Call {CALL_ID} is not found. Is it finished? | Звонок не найден в статистике. Убедитесь, что звонок завершен ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-register.md)
- [{#T}](./telephony-external-call-finish.md)
- [{#T}](./telephony-external-call-attach-record.md)
- [{#T}](./voximplant/voximplant-statistic-get.md)
