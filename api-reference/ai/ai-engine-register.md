# Зарегистрировать сервис ai.engine.register

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.engine.register` регистрирует пользовательский AI-сервис.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../data-types.md) | Название сервиса, которое будет отображаться в интерфейсе ||
|| **code***
[`string`](../data-types.md) | Уникальный код сервиса.

Допустимы только символы `A-Za-z0-9-_` ||
|| **category***
[`string`](../data-types.md) | Категория сервиса.

Возможные значения:
- `text`
- `image`
- `audio`
- `call` ||
|| **completions_url***
[`string`](../data-types.md) | URL endpoint обработчика, который должен отвечать HTTP-статусом `200` при проверке регистрации [(подробное описание)](#endpoint) ||
|| **settings**
[`object`](../data-types.md) | Дополнительные настройки сервиса [(подробное описание)](#settings) ||
|#

### Параметр settings {#settings}

Метод принимает `settings` как JSON-объект без жесткой схемы. В коде сервиса используются следующие поля:

#|
|| **Название**
`тип` | **Описание** ||
|| **code_alias**
[`string`](../data-types.md) | Псевдоним модели.

По умолчанию используется `ChatGPT` ||
|| **model_context_type**
[`string`](../data-types.md) | Способ подсчета контекста.

Возможные значения:
- `token`
- `symbol`

По умолчанию используется `token` ||
|| **model_context_limit**
[`integer`](../data-types.md) | Лимит контекста.

По умолчанию используется `15666` ||
|#

## Endpoint {#endpoint}

`completions_url` должен указывать на ваш endpoint, который принимает запросы от Битрикс24 и обрабатывает их по ожидаемому формату.

{% note info "Внимание!" %}

Код endpoint из примеров можно использовать как основу, но для production обработку лучше выносить в отдельные части приложения.

{% endnote %}

[Шаблон](https://helpdesk.bitrix24.ru/examples/endpoint.zip) endpoint можно использовать как основу для собственного сервиса.

### Требования к endpoint

1. Endpoint должен быстро принять запрос и вернуть ответ или поставить задачу в свою внутреннюю очередь
2. Для категории `image` обработку нужно строить асинхронно
3. В payload запроса приходят `callbackUrl` и `errorCallbackUrl`. После обработки нужно отправлять результат в `callbackUrl`, а информацию об ошибке в `errorCallbackUrl`
4. Endpoint должен корректно возвращать HTTP-статусы:

- `200` — запрос обработан сразу
- `202` — запрос принят и поставлен в очередь
- `503` — сервис временно недоступен

Колбек ожидает ответ ограниченное время. Если endpoint не ответит вовремя, вызов станет невалидным.

{% note info "Внимание!" %}

Ответ endpoint на исходный запрос не заменяет callback-механику. При успешном принятии запроса endpoint должен возвращать `json_encode(['result' => 'OK'])`.

{% endnote %}

### Особенности для категории audio

Для категории `audio` в ключе `prompt` приходит объект со следующими полями:

#|
|| **Название**
`тип` | **Описание** ||
|| **file**
[`string`](../data-types.md) | Ссылка на файл. Файл может приходить без расширения ||
|| **fields**
[`object`](../data-types.md) | Дополнительные данные о файле [(подробное описание)](#audio-fields) ||
|#

#### Объект fields {#audio-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md) | Content-Type файла. Особенно важен, если файл передан без расширения, например `audio/ogg` ||
|| **prompt**
[`string`](../data-types.md) | Вспомогательный промпт для распознавания файла, например название компании ||
|#

### Дополнительные поля в запросе к endpoint

#|
|| **Название**
`тип` | **Описание** ||
|| **auth**
[`object`](../data-types.md) | Данные авторизации ||
|| **payload_raw**
[`string`](../data-types.md) | Сырое значение промпта. При использовании BitrixGPT здесь может приходить символьный код использованного промпта ||
|| **payload_provider**
[`string`](../data-types.md) | Символьный код провайдера препромпта. При использовании BitrixGPT здесь может приходить `prompt` ||
|| **payload_prompt_text**
[`string`](../data-types.md) | Если `payload_provider = prompt`, содержит сырую инструкцию препромпта ||
|| **payload_markers**
[`object`](../data-types.md) | Дополнительные маркеры пользователя, использованные при формировании промпта ||
|| **payload_role**
[`string`](../data-types.md) | Роль или инструкция, использованная при формировании промпта. В GPT-подобных системах это значение обычно передают как системное сообщение ||
|| **collect_context**
[`boolean`](../data-types.md) | Флаг, который показывает, нужно ли передавать контекст в модель ||
|| **context**
[`array`](../data-types.md) | Массив предыдущих сообщений в хронологическом порядке. Отправляемый объем зависит от настроек провайдера и типа подсчета контекста ||
|| **max_tokens**
[`integer`](../data-types.md) | Максимальное число лексем в ответе ||
|| **temperature**
[`number`](../data-types.md) | Параметр, который управляет степенью случайности вывода ||
|| **callbackUrl**
[`string`](../data-types.md) | URL, на который нужно отправить результат успешной обработки ||
|| **errorCallbackUrl**
[`string`](../data-types.md) | URL, на который нужно отправить информацию об ошибке ||
|#

Контекст нужно передавать в модель только если в запросе пришел `collect_context = true`. Если параметр отсутствует или равен `false`, контекст можно не использовать.

Пример структуры сообщения для GPT-подобной модели:

```json
[
    {
        "role": "system",
        "content": "$payload_role"
    },
    {
        "role": "user",
        "content": "$prompt"
    }
]
```

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "name": "Acme GPT",
        "code": "acme_gpt",
        "category": "text",
        "completions_url": "https://api.example.com/bitrix24/ai/completions",
        "settings": {
          "code_alias": "ChatGPT",
          "model_context_type": "token",
          "model_context_limit": 15666
        }
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_webhook_id**/**put_your_webhook_code**/ai.engine.register.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "name": "Acme GPT",
        "code": "acme_gpt",
        "category": "text",
        "completions_url": "https://api.example.com/bitrix24/ai/completions",
        "settings": {
          "code_alias": "ChatGPT",
          "model_context_type": "token",
          "model_context_limit": 15666
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/ai.engine.register
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'ai.engine.register',
            {
                name: 'Acme GPT',
                code: 'acme_gpt',
                category: 'text',
                completions_url: 'https://api.example.com/bitrix24/ai/completions',
                settings: {
                    code_alias: 'ChatGPT',
                    model_context_type: 'token',
                    model_context_limit: 15666
                }
            }
        );

        const result = response.getData().result;
        console.log('Engine registered:', result);
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
                'ai.engine.register',
                [
                    'name' => 'Acme GPT',
                    'code' => 'acme_gpt',
                    'category' => 'text',
                    'completions_url' => 'https://api.example.com/bitrix24/ai/completions',
                    'settings' => [
                        'code_alias' => 'ChatGPT',
                        'model_context_type' => 'token',
                        'model_context_limit' => 15666,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
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
            name: 'Acme GPT',
            code: 'acme_gpt',
            category: 'text',
            completions_url: 'https://api.example.com/bitrix24/ai/completions',
            settings: {
                code_alias: 'ChatGPT',
                model_context_type: 'token',
                model_context_limit: 15666
            }
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
        'ai.engine.register',
        [
            'name' => 'Acme GPT',
            'code' => 'acme_gpt',
            'category' => 'text',
            'completions_url' => 'https://api.example.com/bitrix24/ai/completions',
            'settings' => [
                'code_alias' => 'ChatGPT',
                'model_context_type' => 'token',
                'model_context_limit' => 15666,
            ],
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
    "result": 12,
    "time": {
        "start": 1774078200,
        "finish": 1774078200.315271,
        "duration": 0.31527090072631836,
        "processing": 0.02,
        "date_start": "2026-03-20T09:50:00+03:00",
        "date_finish": "2026-03-20T09:50:00+03:00",
        "operating_reset_at": 1774078800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор зарегистрированного сервиса ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENGINE_REGISTER_ERROR_CODE_UNIQUE",
    "error_description": "Запись с таким `code` уже существует."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ENGINE_REGISTER_ERROR_NAME` | Ключ `name` со строковым значением обязателен | Не передан параметр `name`, передано пустое значение или значение не является строкой ||
|| `ENGINE_REGISTER_ERROR_CODE` | Ключ `code` со строковым значением обязателен | Не передан параметр `code`, передано пустое значение или значение не является строкой ||
|| `ENGINE_REGISTER_ERROR_CODE_FORMAT` | Ключ `code` должен содержать только символы `A-Za-z0-9-_` | В `code` переданы недопустимые символы ||
|| `ENGINE_REGISTER_ERROR_CODE_UNIQUE` | Запись с таким `code` уже существует | Сервис с таким кодом уже зарегистрирован в той же категории ||
|| `ENGINE_REGISTER_ERROR_CATEGORY` | Ключ `category` обязателен | Не передан параметр `category` или передано пустое значение ||
|| `ENGINE_REGISTER_ERROR_CATEGORY_FORMAT` | Ключ `category` может содержать одно из значений: `text, image, audio, call` | Передано значение `category`, которого нет в списке доступных категорий ||
|| `ENGINE_REGISTER_ERROR_COMPLETIONS_URL` | Ключ `completions_url` со строковым значением обязателен | Не передан параметр `completions_url`, передано пустое значение или значение не является строкой ||
|| `ENGINE_REGISTER_ERROR_COMPLETIONS_URL_FAIL` | Значением ключа `completions_url` должен быть валидный URL , который при проверке возвращает статус `200` | URL недоступен, невалиден или при проверке возвращает статус, отличный от `200` ||
|| `ENGINE_REGISTER_ERROR_SETTINGS_FORMAT` | Значением ключа `settings` должен быть валидный JSON | Параметр `settings` передан не в виде объекта ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./ai-engine-list.md)
- [{#T}](./ai-engine-unregister.md)

