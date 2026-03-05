# Получить список сервисов ai.engine.list

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список зарегистрированных [пользовательских сервисов](./ai-engine-register.md) для текущего портала.

## Примеры

{% list tabs %}

- Curl (WebHook)

    ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/ai.engine.list

    ```

- Curl (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/ai.engine.list
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod('ai.engine.list', {});
        
        const result = response.getData().result;
        console.info(result);
    }
    catch( error )
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call('ai.engine.list', []);
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling AI engine list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'ai.engine.list',
        {
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": "9",
            "app_code": "itsolutionru.gptconnector",
            "name": "IT-Solution GPT (Текстовая модель)",
            "code": "gptconnector_bitr_text",
            "category": "text",
            "completions_url": "https://gptconnector.it-solution.ru/gptconnector/handle_request/",
            "settings": {
                "code_alias": "ChatGPT",
                "model_context_type": "token",
                "model_context_limit": "16384"
            },
            "date_create": 1700124275
        },
        {
            "id": "11",
            "app_code": "itsolutionru.gptconnector",
            "name": "IT-Solution GPT (Аудио модель)",
            "code": "gptconnector_bitr_audio",
            "category": "audio",
            "completions_url": "https://gptconnector.it-solution.ru/gptconnector/handle_request_audio/",
            "settings": {
                "code_alias": "ChatGPT",
                "model_context_type": "token",
                "model_context_limit": "16384"
            },
            "date_create": 1700124275
        },
    ],
    "time": {
        "start": 1772396993,
        "finish": 1772396993.236353,
        "duration": 0.23635292053222656,
        "processing": 0,
        "date_start": "2026-03-01T23:29:53+03:00",
        "date_finish": "2026-03-01T23:29:53+03:00",
        "operating_reset_at": 1772397593,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив зарегистрированных сервисов ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}