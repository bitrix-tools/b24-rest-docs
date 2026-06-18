# Получить список сервисов ai.engine.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.engine.list` возвращает список зарегистрированных AI-сервисов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../data-types.md) | Массив формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет произведена фильтрация
- `value_n` — значение фильтра

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE, аналогично `=%`
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Список доступных для фильтрации полей приведен в разделе [(подробное описание)](#filter) ||
|| **limit**
[`integer`](../data-types.md) | Максимальное количество элементов в ответе ||
|#

### Параметр filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор сервиса ||
|| **APP_CODE**
[`string`](../data-types.md) | Код приложения, которому принадлежит сервис.

Без контекста приложения, например через вебхук, можно фильтровать по любому `APP_CODE`.

В контексте OAuth-приложения метод всегда показывает только сервисы текущего приложения ||
|| **NAME**
[`string`](../data-types.md) | Название сервиса ||
|| **CODE**
[`string`](../data-types.md) | Символьный код сервиса ||
|| **CATEGORY**
[`string`](../data-types.md) | Категория сервиса ||
|| **COMPLETIONS_URL**
[`string`](../data-types.md) | URL endpoint сервиса ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата и время создания сервиса в формате ISO 8601, например 2026-03-20T09:50:00+03:00 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "filter": {
          "=CATEGORY": "text"
        },
        "limit": 2
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_webhook_id**/**put_your_webhook_code**/ai.engine.list.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "filter": {
          "=CATEGORY": "text"
        },
        "limit": 2,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/ai.engine.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each AiEngineItem returned in result[]
    type AiEngineItem = {
      id: number
      app_code: string | null
      name: string
      code: string
      category: string
      completions_url: string
      settings: Record<string, unknown>
      date_create: number
    }

    try {
      // ai.engine.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<AiEngineItem[]>({
        method: 'ai.engine.list',
        params: {
          filter: {
            '=CATEGORY': 'text',
          },
          limit: 2,
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('AI engines found:', result.length, result[0]?.name)
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
      async function fetchAiEngines() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // ai.engine.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'ai.engine.list',
            params: {
              filter: {
                '=CATEGORY': 'text',
              },
              limit: 2,
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('AI engines found:', result.length, result[0]?.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchAiEngines)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'ai.engine.list',
                [
                    'filter' => [
                        '=CATEGORY' => 'text',
                    ],
                    'limit' => 2,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting AI engine list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'ai.engine.list',
        {
            filter: {
                '=CATEGORY': 'text'
            },
            limit: 2
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
        'ai.engine.list',
        [
            'filter' => [
                '=CATEGORY' => 'text',
            ],
            'limit' => 2,
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
    "result": [
        {
            "id": 12,
            "app_code": "rest_app_123456",
            "name": "Acme GPT",
            "code": "acme_gpt",
            "category": "text",
            "completions_url": "https://api.example.com/bitrix24/ai/completions",
            "settings": {
                "code_alias": "ChatGPT",
                "model_context_type": "token",
                "model_context_limit": 15666
            },
            "date_create": 1774078200
        }
    ],
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
[`array`](../data-types.md) | Массив зарегистрированных сервисов [(подробное описание)](#engine-item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект сервиса {#engine-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор сервиса ||
|| **app_code**
[`string`](../data-types.md) | Код приложения, которому принадлежит сервис.

Может вернуть `null`, если значение не задано ||
|| **name**
[`string`](../data-types.md) | Название сервиса ||
|| **code**
[`string`](../data-types.md) | Символьный код сервиса ||
|| **category**
[`string`](../data-types.md) | Категория сервиса ||
|| **completions_url**
[`string`](../data-types.md) | URL endpoint сервиса ||
|| **settings**
[`object`](../data-types.md) | Настройки сервиса, сохраненные при регистрации ||
|| **date_create**
[`integer`](../data-types.md) | Дата создания сервиса в формате Unix Timestamp ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./ai-engine-register.md)
- [{#T}](./ai-engine-unregister.md)
