# Получить список доступных голосов для синтеза речи voximplant.tts.voices.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `voximplant.tts.voices.get` возвращает список доступных голосов для синтеза речи.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.tts.voices.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.tts.voices.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.tts.voices.get',
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
                'voximplant.tts.voices.get',
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
        'voximplant.tts.voices.get',
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
        'voximplant.tts.voices.get',
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
        "auenglishfemale": "Австралийский английский (женский) (Amazon)",
        "brportuguesefemale": "Бразильский португальский (женский) (Amazon)",
        "caenglishfemale": "Канадский английский (женский) (Default)",
        "cafrenchfemale": "Канадский французский (женский) (Amazon)",
        "cafrenchmale": "Канадский французский (мужской) (Amazon)",
        "chchinesefemale": "Китайский (женский) (Default)",
        "chchinesemale": "Китайский (мужской) (Default)",
        "eurcatalanfemale": "Каталонский (женский) (Default)",
        "eurczechfemale": "Чешский (женский) (Default)",
        "eurdanishfemale": "Датский (женский) (Default)",
        "eurdutchfemale": "Голландский (женский) (Default)",
        "eurfinnishfemale": "Финский (женский) (Default)",
        "eurfrenchfemale": "Французский (женский) (Amazon)",
        "eurfrenchmale": "Французский (мужской) (Amazon)",
        "eurgermanfemale": "Немецкий (женский) (Default)",
        "eurgermanmale": "Немецкий (мужской) (Default)",
        "euritalianfemale": "Итальянский (женский) (Default)",
        "euritalianmale": "Итальянский (мужской) (Default)",
        "eurnorwegianfemale": "Норвежский (женский) (Default)",
        "eurpolishfemale": "Польский (женский) (Default)",
        "eurportuguesefemale": "Португальский (женский) (Default)",
        "eurportuguesemale": "Португальский (мужской) (Default)",
        "eurspanishfemale": "Испанский (женский) (Default)",
        "eurspanishmale": "Испанский (мужской) (Default)",
        "eurturkishfemale": "Турецкий (женский) (Default)",
        "eurturkishmale": "Турецкий (мужской) (Default)",
        "hkchinesefemale": "Гонконгский кантонский (женский) (Default)",
        "huhungarianfemale": "Венгерский (женский) (Default)",
        "jpjapanesefemale": "Японский (женский) (Default)",
        "jpjapanesemale": "Японский (мужской) (Default)",
        "krkoreanfemale": "Корейский (женский) (Default)",
        "krkoreanmale": "Корейский (мужской) (Default)",
        "ruinternalfemale": "Русский (женский) (Default)",
        "ruinternalmale": "Русский (мужской) (Default)",
        "swswedishfemale": "Шведский (женский) (Default)",
        "twchinesefemale": "Тайванский китайский (женский) (Default)",
        "ukenglishfemale": "Английский (женский) (Amazon)",
        "ukenglishmale": "Английский (мужской) (Amazon)",
        "usenglishfemale": "Американский английский (женский) (Default)",
        "usenglishmale": "Американский английский (мужской) (Default)",
        "usspanishfemale": "Американский испанский (женский) (Amazon)",
        "usspanishmale": "Американский испанский (мужской) (Amazon)"
    },
    "time": {
        "start": 1773323829,
        "finish": 1773323829.353531,
        "duration": 0.3535308837890625,
        "processing": 0,
        "date_start": "2026-03-12T16:57:09+03:00",
        "date_finish": "2026-03-12T16:57:09+03:00",
        "operating_reset_at": 1773324429,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со списком доступных голосов для синтеза речи, где ключ — идентификатор голоса, а значение — название голоса ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-callback-start.md)
- [{#T}](./voximplant-infocall-start-with-sound.md)
- [{#T}](./voximplant-infocall-start-with-text.md)
- [{#T}](./voximplant-url-get.md)
