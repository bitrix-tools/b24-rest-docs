# Осуществить автозвонок голосовым роботом voximplant.infocall.startwithtext

> Scope: [`telephony`](../../scopes/permissions.md), [`call`](../../scopes/permissions.md) 
>
> Кто может выполнять метод: пользователь с правом Исходящий звонок — Выполнение

Метод `voximplant.infocall.startwithtext` запускает автозвонок и воспроизводит получателю заданный текст с помощью синтеза речи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FROM_LINE***
[`string`](../../data-types.md) | Идентификатор исходящей линии, с которой запускается звонок.

Список доступных линий можно получить методом [voximplant.line.get](./lines/voximplant-line-get.md) ||
|| **TO_NUMBER***
[`string`](../../data-types.md) | Номер, на который нужно выполнить звонок ||
|| **TEXT_TO_PRONOUNCE***
[`string`](../../data-types.md) | Текст, который будет озвучен получателю ||
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
    -d '{"FROM_LINE":"reg151083","TO_NUMBER":"79991234567","TEXT_TO_PRONOUNCE":"Добрый день. Напоминаем о записи"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.infocall.startwithtext
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FROM_LINE":"reg151083","TO_NUMBER":"79991234567","TEXT_TO_PRONOUNCE":"Добрый день. Напоминаем о записи","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.infocall.startwithtext
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.infocall.startwithtext',
            {
                FROM_LINE: 'reg151083',
                TO_NUMBER: '79991234567',
                TEXT_TO_PRONOUNCE: 'Добрый день. Напоминаем о записи'
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
                'voximplant.infocall.startwithtext',
                [
                    'FROM_LINE' => 'reg151083',
                    'TO_NUMBER' => '79991234567',
                    'TEXT_TO_PRONOUNCE' => 'Добрый день. Напоминаем о записи',
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
        'voximplant.infocall.startwithtext',
        {
            FROM_LINE: 'reg151083',
            TO_NUMBER: '79991234567',
            TEXT_TO_PRONOUNCE: 'Добрый день. Напоминаем о записи'
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
        'voximplant.infocall.startwithtext',
        [
            'FROM_LINE' => 'reg151083',
            'TO_NUMBER' => '79991234567',
            'TEXT_TO_PRONOUNCE' => 'Добрый день. Напоминаем о записи',
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
        "CALL_ID": "infocall.4aa8f8e35bb6ece352fec0537b58ac42.1773740701"
    },
    "time": {
        "start": 1773740709,
        "finish": 1773740710.094622,
        "duration": 1.0946218967437744,
        "processing": 1,
        "date_start": "2026-03-17T12:45:09+03:00",
        "date_finish": "2026-03-17T12:45:10+03:00",
        "operating_reset_at": 1773741309,
        "operating": 0.14156007766723633
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом запуска автозвонка ||
|| **RESULT**
[`boolean`](../../data-types.md) | Признак успешного запуска.

`true` — автозвонок успешно запущен ||
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
    "error_description": "Infocall limit for this month is exceeded"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | `Making infocall using LINK_BASE_NUMBER is not allowed` | Нельзя запускать автозвонок через служебную линию ||
|| `ERROR_CORE` | `Could not find config for number <LINE_ID>` | Не найдена конфигурация для указанной линии ||
|| `ERROR_CORE` | `Infocall limit for this month is exceeded` | Превышен месячный лимит автозвонков ||
|| `ERROR_CORE` | `Phone number is not correct` | Некорректный номер в `TO_NUMBER` ||
|| `ERROR_CORE` | `Infocall failure` | Ошибка при запуске автозвонка ||
|| `ACCESS_DENIED` | `Access denied` | Недостаточно прав на выполнение исходящих звонков ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-callback-start.md)
- [{#T}](./voximplant-infocall-start-with-sound.md)
- [{#T}](./voximplant-infocall-start-with-text.md)
- [{#T}](./voximplant-tts-voices-get.md)