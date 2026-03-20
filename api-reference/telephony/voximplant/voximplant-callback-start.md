# Запустить обратный звонок voximplant.callback.start

> Scope: [`telephony`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Исходящий звонок — Выполнение

Метод `voximplant.callback.start` запускает обратный звонок между сотрудником и клиентом.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FROM_LINE***
[`string`](../../data-types.md) | Идентификатор исходящей линии, с которой запускается обратный звонок.

Список доступных линий можно получить методом [voximplant.line.get](./lines/voximplant-line-get.md) ||
|| **TO_NUMBER***
[`string`](../../data-types.md) | Номер клиента, на который нужно позвонить ||
|| **TEXT_TO_PRONOUNCE***
[`string`](../../data-types.md) | Текст, который система произнесет сотруднику перед соединением с клиентом ||
|| **VOICE**
[`string`](../../data-types.md) | Идентификатор голоса для синтеза речи.

Если не передан, используется голос по умолчанию для языка портала.

Список доступных голосов можно получить методом [voximplant.tts.voices.get](./voximplant-tts-voices-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FROM_LINE":"reg151083","TO_NUMBER":"79991234567","TEXT_TO_PRONOUNCE":"Вам поступил запрос на обратный звонок","VOICE":"ruinternalfemale"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.callback.start
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FROM_LINE":"reg151083","TO_NUMBER":"79991234567","TEXT_TO_PRONOUNCE":"Вам поступил запрос на обратный звонок","VOICE":"ruinternalfemale","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.callback.start
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.callback.start',
            {
                FROM_LINE: 'reg151083',
                TO_NUMBER: '79991234567',
                TEXT_TO_PRONOUNCE: 'Вам поступил запрос на обратный звонок',
                VOICE: 'ruinternalfemale'
            }
        );

        const result = response.getData().result;
        console.log('Data:', result);
    }
    catch (error)
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
                'voximplant.callback.start',
                [
                    'FROM_LINE' => 'reg151083',
                    'TO_NUMBER' => '79991234567',
                    'TEXT_TO_PRONOUNCE' => 'Вам поступил запрос на обратный звонок',
                    'VOICE' => 'ruinternalfemale',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.callback.start',
        {
            FROM_LINE: 'reg151083',
            TO_NUMBER: '79991234567',
            TEXT_TO_PRONOUNCE: 'Вам поступил запрос на обратный звонок',
            VOICE: 'ruinternalfemale'
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
        'voximplant.callback.start',
        [
            'FROM_LINE' => 'reg151083',
            'TO_NUMBER' => '79991234567',
            'TEXT_TO_PRONOUNCE' => 'Вам поступил запрос на обратный звонок',
            'VOICE' => 'ruinternalfemale',
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
        "RESULT": true,
        "CALL_ID": "callback.72f42b118e019a4cc47629ff60525f43.1773736077"
    },
    "time": {
        "start": 1773736066,
        "finish": 1773736067.708955,
        "duration": 1.7089550495147705,
        "processing": 1,
        "date_start": "2026-03-17T11:27:46+03:00",
        "date_finish": "2026-03-17T11:27:47+03:00",
        "operating_reset_at": 1773736666,
        "operating": 0.9574570655822754
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом запуска обратного звонка ||
|| **RESULT**
[`boolean`](../../data-types.md) | Признак успешного запуска.

`true` — обратный звонок успешно запущен ||
|| **CALL_ID**
[`string`](../../data-types.md) | Идентификатор звонка ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Could not find line reg000000"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | `Could not find line <LINE_ID>` | Линия с указанным идентификатором не найдена ||
|| `ERROR_CORE` | `Could not find config for number <LINE_ID>` | Не найдена конфигурация для указанной линии ||
|| `ERROR_CORE` | `Phone number is not correct` | Некорректный номер в `TO_NUMBER` ||
|| `ACCESS_DENIED` | `Access denied` | Недостаточно прав на выполнение исходящих звонков ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-callback-start.md)
- [{#T}](./voximplant-infocall-start-with-sound.md)
- [{#T}](./voximplant-infocall-start-with-text.md)
- [{#T}](./voximplant-tts-voices-get.md)