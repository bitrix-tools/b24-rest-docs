# Получить ссылки для навигации по страницам телефонии voximplant.url.get

> Scope: [`telephony`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `voximplant.url.get` возвращает ссылки для навигации по страницам телефонии.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.url.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.url.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.url.get',
            {}
        );
        
        const result = response.getData().result;
        console.log('Data:', result);
        
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
                'voximplant.url.get',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.url.get',
        {},
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
        'voximplant.url.get',
        []
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
        "detail_statistics": "https://test.bitrix24.ru/telephony/detail.php",
        "buy_connector": "https://test.bitrix24.ru/settings/license_phone_sip.php",
        "edit_config": "https://test.bitrix24.ru/telephony/edit.php?ID=#CONFIG_ID#",
        "lines": "https://test.bitrix24.ru/telephony/lines.php"
    },
    "time": {
        "start": 1773323182,
        "finish": 1773323182.857974,
        "duration": 0.8579740524291992,
        "processing": 0,
        "date_start": "2026-03-12T16:46:22+03:00",
        "date_finish": "2026-03-12T16:46:22+03:00",
        "operating_reset_at": 1773323782,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со ссылками на страницы телефонии ||
|| **detail_statistics**
[`string`](../../data-types.md) | Ссылка на страницу детальной статистики ||
|| **buy_connector**
[`string`](../../data-types.md) | Ссылка на страницу покупки SIP-коннектора ||
|| **edit_config**
[`string`](../../data-types.md) | Ссылка на страницу редактирования подключенной линии. Вместо `#CONFIG_ID#` нужно подставить идентификатор настройки ||
|| **lines**
[`string`](../../data-types.md) | Ссылка на страницу списка линий ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-callback-start.md)
- [{#T}](./voximplant-infocall-start-with-sound.md)
- [{#T}](./voximplant-infocall-start-with-text.md)
- [{#T}](./voximplant-tts-voices-get.md)
