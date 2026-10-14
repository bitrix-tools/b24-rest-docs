# Зарегистрировать сервис ai.engine.register

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.engine.register` регистрирует пользовательский AI-сервис.

Метод доступен в облачной версии Битрикс24. В коробочной версии он не регистрируется в REST API.

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
- `text` — текстовые запросы
- `image` — генерация изображений
- `audio` — обработка аудио
- `call` — обработка аудиозаписей звонков
- `vision` — анализ изображений
- `classify` — классификация данных ||
|| **completions_url***
[`string`](../data-types.md) | URL endpoint обработчика, который должен отвечать HTTP-статусом `200` при проверке регистрации [(подробное описание)](#endpoint) ||
|| **settings**
[`object`](../data-types.md) | Дополнительные настройки сервиса [(подробное описание)](#settings). Если параметр не передан, сохраняется пустой набор настроек ||
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
- `token` — подсчет по токенам
- `symbol` — подсчет по символам

По умолчанию используется `token` ||
|| **model_context_limit**
[`integer`](../data-types.md) | Лимит контекста.

По умолчанию используется `15666` ||
|#

## Endpoint {#endpoint}

`completions_url` должен указывать на ваш endpoint, который принимает запросы от Битрикс24 и обрабатывает их по ожидаемому формату.

{% note info "" %}

Шаблон endpoint можно использовать как основу. В рабочей среде разделите прием запроса и его обработку.

{% endnote %}

[Шаблон](https://helpdesk.bitrix24.ru/examples/endpoint.zip) endpoint можно использовать как основу для собственного сервиса.

### Требования к endpoint

1. Endpoint должен быстро принять запрос и вернуть ответ или поставить задачу в свою внутреннюю очередь. На первичный ответ дается не более пяти секунд — по истечении таймаута соединение обрывается
2. Обработку нужно строить асинхронно: подтвердить прием запроса, а результат отправить через callback
3. В payload запроса приходят `callbackUrl` и `errorCallbackUrl`. После обработки нужно отправлять результат в `callbackUrl`, а информацию об ошибке в `errorCallbackUrl`
4. В ответ на POST-запрос endpoint должен вернуть JSON и HTTP-статус `202`. Другой статус считается ошибкой обработки

Параметр `ttl` содержит плановый срок жизни задания в секундах. По умолчанию он равен `14400`, максимальное значение — `86400`. После истечения срока `errorCallbackUrl` больше не принимает ошибку. Успешный результат в `callbackUrl` может быть принят позднее, пока запись задания еще не удалена, но полагаться на это поведение не следует.

{% note info "" %}

Ответ endpoint на исходный запрос не заменяет callback-механику. При успешном принятии запроса endpoint должен вернуть HTTP-статус `202` и `json_encode(['result' => 'OK'])`.

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
|| **fileExtension**
[`string`](../data-types.md) | Расширение файла, если его удалось определить. Может приходить пустой строкой ||
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

### Особенности для категории image

Для категории `image` в ключе `prompt` приходит объект со следующими полями:

#|
|| **Название**
`тип` | **Описание** ||
|| **prompt**
[`string`](../data-types.md) | Текстовое описание того, что нужно сгенерировать ||
|| **style**
[`string`](../data-types.md) | Стиль генерации изображения. Может отсутствовать, если стиль не был задан ||
|| **format**
[`string`](../data-types.md) \| [`null`](../data-types.md) | Формат изображения.

Возможные значения:
- `square` — квадратное изображение 1:1, 1024×1024 пикселей
- `portrait` — вертикальное изображение 9:16, 1024×1792 пикселей
- `landscape` — горизонтальное изображение 16:9, 1792×1024 пикселей
- `null` — формат не задан ||
|| **images_number**
[`integer`](../data-types.md) | Количество изображений, которое нужно сгенерировать. Может отсутствовать, если значение не было задано ||
|#

### Дополнительные поля в запросе к endpoint

#|
|| **Название**
`тип` | **Описание** ||
|| **auth**
[`object`](../data-types.md) \| [`null`](../data-types.md) | Данные авторизации приложения. Приходит `null`, если сервис зарегистрирован без контекста приложения ||
|| **payload_raw**
[`string`](../data-types.md) | Сырое значение промпта. При использовании BitrixGPT здесь может приходить символьный код использованного промпта ||
|| **payload_provider**
[`string`](../data-types.md) | Символьный код провайдера препромпта. При использовании BitrixGPT здесь может приходить `prompt` ||
|| **payload_prompt_text**
[`string`](../data-types.md) \| [`null`](../data-types.md) | Если `payload_provider = prompt`, содержит исходную инструкцию препромпта. Для других значений `payload_provider` приходит `null` ||
|| **payload_markers**
[`object`](../data-types.md) | Дополнительные маркеры пользователя, использованные при формировании промпта ||
|| **payload_role**
[`string`](../data-types.md) \| [`null`](../data-types.md) | Роль или инструкция, использованная при формировании промпта. В GPT-подобных системах это значение обычно передают как системное сообщение. Приходит `null`, если роль не задана ||
|| **collect_context**
[`boolean`](../data-types.md) | Флаг, который показывает, нужно ли передавать контекст в модель ||
|| **context**
[`array`](../data-types.md) | Массив предыдущих сообщений в хронологическом порядке. Отправляемый объем зависит от настроек провайдера и типа подсчета контекста ||
|| **max_tokens**
[`integer`](../data-types.md) | Максимальное число лексем в ответе ||
|| **temperature**
[`double`](../data-types.md) | Параметр, который управляет степенью случайности вывода ||
|| **callbackUrl**
[`string`](../data-types.md) | URL, на который нужно отправить результат успешной обработки ||
|| **errorCallbackUrl**
[`string`](../data-types.md) | URL, на который нужно отправить информацию об ошибке ||
|| **ttl**
[`integer`](../data-types.md) | Плановый срок жизни задания в секундах. По умолчанию — `14400`, максимальное значение — `86400` ||
|#

Контекст нужно передавать в модель только если в запросе пришел `collect_context = true`. Если параметр отсутствует или равен `false`, контекст можно не использовать.

### Пример запроса к endpoint и callback

Битрикс24 отправляет в `completions_url` POST-запрос. Набор дополнительных полей зависит от сценария. Пример для категории `text`:

```json
{
    "prompt": "Подготовь краткое резюме встречи",
    "payload_raw": "Подготовь краткое резюме встречи",
    "payload_provider": "text",
    "payload_prompt_text": null,
    "payload_markers": {
        "language": "ru"
    },
    "payload_role": "Ты — помощник по подготовке резюме",
    "context": [
        {
            "role": "user",
            "content": "Обсудили сроки запуска и ответственных"
        }
    ],
    "collect_context": true,
    "max_tokens": 1000,
    "temperature": 0.7,
    "auth": null,
    "category": "text",
    "ttl": 14400,
    "callbackUrl": "https://example.bitrix24.ru/bitrix/services/main/ajax.php?action=ai.controller.integration.thirdparty.callbackSuccess&hash=example&rid=example",
    "errorCallbackUrl": "https://example.bitrix24.ru/bitrix/services/main/ajax.php?action=ai.controller.integration.thirdparty.callbackError&hash=example&rid=example"
}
```

После приема запроса endpoint должен в течение пяти секунд вернуть HTTP-статус `202` и JSON:

```json
{
    "result": "OK"
}
```

После обработки отправьте результат POST-запросом в `callbackUrl`:

```json
{
    "result": "Запуск запланирован на 15 сентября. Ответственный — Иван Петров."
}
```

Если обработка завершилась ошибкой, отправьте ее в `errorCallbackUrl`:

```json
{
    "message": "Provider temporarily unavailable",
    "code": 503,
    "api_request_completed": false
}
```

Поле `api_request_completed` показывает, был ли выполнен запрос к AI-провайдеру. При значении `false` Битрикс24 восстанавливает списанный лимит.

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'ai.engine.register',
        params: {
          name: 'Acme GPT',
          code: 'acme_gpt',
          category: 'text',
          completions_url: 'https://api.example.com/bitrix24/ai/completions',
          settings: {
            code_alias: 'ChatGPT',
            model_context_type: 'token',
            model_context_limit: 15666,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Registered AI engine ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function registerAiEngine() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'ai.engine.register',
            params: {
              name: 'Acme GPT',
              code: 'acme_gpt',
              category: 'text',
              completions_url: 'https://api.example.com/bitrix24/ai/completions',
              settings: {
                code_alias: 'ChatGPT',
                model_context_type: 'token',
                model_context_limit: 15666,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Registered AI engine ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', registerAiEngine)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.ai.engine.register(
            name='Acme GPT',
            code='acme_gpt',
            category='text',
            completions_url='https://api.example.com/bitrix24/ai/completions',
            settings={
                "code_alias": "ChatGPT",
                "model_context_type": "token",
                "model_context_limit": 15666,
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "ai.engine.register", b24.Params{
    	"name":            "Acme GPT",
    	"code":            "acme_gpt",
    	"category":        "text",
    	"completions_url": "https://api.example.com/bitrix24/ai/completions",
    	"settings": b24.Params{
    		"code_alias":          "ChatGPT",
    		"model_context_type":  "token",
    		"model_context_limit": 15666,
    	},
    })
    if err != nil {
    	return fmt.Errorf("ai.engine.register: %w", err)
    }

    var value b24.ID
    if err := json.Unmarshal(res.Result, &value); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("результат:", value)
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
|| `ENGINE_REGISTER_ERROR_CATEGORY_FORMAT` | Ключ `category` может содержать одно из значений: `text, image, audio, call, vision, classify` | Передано значение `category`, которого нет в списке доступных категорий ||
|| `ENGINE_REGISTER_ERROR_COMPLETIONS_URL` | Ключ `completions_url` со строковым значением обязателен | Не передан параметр `completions_url`, передано пустое значение или значение не является строкой ||
|| `ENGINE_REGISTER_ERROR_COMPLETIONS_URL_FAIL` | Значением ключа `completions_url` должен быть валидный URL, который при проверке возвращает статус `200` | URL недоступен, невалиден или при проверке возвращает статус, отличный от `200` ||
|| `ENGINE_REGISTER_ERROR_SETTINGS_FORMAT` | Значением ключа `settings` должен быть валидный JSON | Параметр `settings` передан не в виде объекта ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./ai-engine-list.md)
- [{#T}](./ai-engine-unregister.md)

