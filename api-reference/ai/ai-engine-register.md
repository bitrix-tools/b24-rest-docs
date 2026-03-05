# Зарегистрировать сервис ai.engine.register

{% note alert %}

Метод работает только для облачных установок.

{% endnote %}

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод для регистрации пользовательского сервиса AI. При повторном вызове обновляет его. 

## Параметры метода

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **name***
[`string`](../data-types.md) | Осмысленное и короткое название, которое будет появляться в интерфейсе пользователя. | ||
|| **code***
[`string`](../data-types.md) | Уникальный код сервиса | ||
|| **category***
[`string`](../data-types.md) | Может быть либо `text` (генерация текста), либо `image` (генерация картинок), либо `audio` (распознавание текста). | ||
|| **completions_url***
[`string`](../data-types.md) | Адрес для обработки пользовательского запроса. | ||
|| **settings**
[`object`](../data-types.md) | Дополнительные параметры провайдера AI (см. описание ниже). Необязательный. | 23.800 ||
|#

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

### Дополнительные параметры

Описывает структуту дополнительных параметров провайдера

#|
|| **Параметр** | **Описание** ||
|| **code_alias**
[`string`](../data-types.md) 
| Тип AI. 
Доступны значения: `ChatGPT` (Open AI), `GigaChat` (Сбер), `YandexGPT` (Яндекс) (по умолчанию `ChatGPT`). ||
|| **model_context_type**
[`string`](../data-types.md)
| Тип подсчета контекста.
Доступны значения: `token` - токены, `symbol` - символы. По умолчанию `token`. ||
|| **model_context_limit**
[`integer`](../data-types.md)
| Объем контекста (по умолчанию `15666`).
Перед отправкой вам запроса пользователя, проверяется лимит контекста согласно типу подсчета. ||
|#

## Примеры

{% list tabs %}

- Curl (WebHook)
    ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"name": "Ivanov GPT", "code": "ivanov_gpt", "category": "text", "completions_url": "https://antonds.ru/ai/aul/completions/", "settings": {"code_alias": "ChatGPT", "model_context_type": "token", "model_context_limit": 16384}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/ai.engine.register

    ```

- Curl (OAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name": "Ivanov GPT", "code": "ivanov_gpt", "category": "text", "completions_url": "https://antonds.ru/ai/aul/completions/", "settings": {"code_alias": "ChatGPT", "model_context_type": "token", "model_context_limit": 16384}, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/ai.engine.register
    ```

- JS
    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'ai.engine.register',
    		{
    			name: 'Ivanov GPT',
    			code: 'ivanov_gpt',
    			category: 'text',
    			completions_url: 'https://antonds.ru/ai/aul/completions/',
    			settings: {
    				code_alias: 'ChatGPT',
    				model_context_type: 'token',
    				model_context_limit: 16*1024,
    			},
    		}
    	);
    	
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
            ->call(
                'ai.engine.register',
                [
                    'name'            => 'Ivanov GPT',
                    'code'            => 'ivanov_gpt',
                    'category'        => 'text',
                    'completions_url' => 'https://antonds.ru/ai/aul/completions/',
                    'settings'        => [
                        'code_alias'          => 'ChatGPT',
                        'model_context_type'  => 'token',
                        'model_context_limit' => 16384,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering AI engine: ' . $e->getMessage();
    }
    ```

- BX24.js
    ```javascript
    BX24.callMethod(
        'ai.engine.register',
        {
            name: 'Ivanov GPT',
            code: 'ivanov_gpt',
            category: 'text',
            completions_url: 'https://antonds.ru/ai/aul/completions/',
            settings: {
                code_alias: 'ChatGPT',
                model_context_type: 'token',
                model_context_limit: 16384,
            },
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
    "result": 21,
    "time": {
        "start": 1772388318,
        "finish": 1772388319.163114,
        "duration": 1.163114070892334,
        "processing": 1,
        "date_start": "2026-03-01T21:05:18+03:00",
        "date_finish": "2026-03-01T21:05:19+03:00",
        "operating_reset_at": 1772388918,
        "operating": 0.1637129783630371
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор добавленного сервиса ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENGINE_REGISTER_ERROR_COMPLETIONS_URL_FAIL",
    "error_description": "Значением ключа `completions_url` должен быть валидный URL и отвечать статусом 200."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ENGINE_REGISTER_ERROR_CODE_UNIQUE` | Запись с таким `code` уже существует. ||
|| `ENGINE_REGISTER_ERROR_COMPLETIONS_URL_FAIL` | Значением ключа `completions_url` должен быть валидный URL и отвечать статусом 200. ||
|| `ENGINE_REGISTER_ERROR_CODE_FORMAT` | Ключ `code` должен содержать только символы `A-Za-z0-9-_`. ||
|| `ENGINE_REGISTER_ERROR_CATEGORY_FORMAT` | Ключ `category` может содержать одно из значений: `text`, `image`, `audio`, `call`. ||
|| `ENGINE_REGISTER_ERROR_SETTINGS_FORMAT` | Значением ключа `settings` должен быть валидный JSON ||
|| `ENGINE_REGISTER_ERROR_NAME` | Ключ `name` со строковым значением обязателен. ||
|| `ENGINE_REGISTER_ERROR_CODE` | Ключ `code` со строковым значением обязателен. ||
|| `ENGINE_REGISTER_ERROR_CATEGORY` | Ключ `category` обязателен. ||
|| `ENGINE_REGISTER_ERROR_COMPLETIONS_URL` | Ключ `completions_url` со строковым значением обязателен. ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}
