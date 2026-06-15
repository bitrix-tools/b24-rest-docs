# Получить дополнительные поля сайта landing.site.getadditionalfields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.site.getadditionalfields` получает дополнительные поля сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../types.md) ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 205
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getadditionalfields.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 205,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getadditionalfields.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AdditionalFieldsResult = Record<string, string | number | string[]> | null

    try {
      const response = await $b24.actions.v2.call.make<AdditionalFieldsResult>({
        method: 'landing.site.getadditionalfields',
        params: {
          id: 205,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Additional fields:', result)
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
      async function getAdditionalFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.getadditionalfields',
            params: {
              id: 205,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Additional fields:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAdditionalFields)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.site.getadditionalfields',
                [
                    'id' => 205,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting additional fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getadditionalfields',
        {
            id: 205
        },
        function(result)
        {
            if (result.error())
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.getadditionalfields',
        [
            'id' => 205,
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Ниже приведен сокращенный пример ответа. Фактический набор полей зависит от настроек конкретного сайта.

```json
{
    "result": {
        "COOKIES_USE": "Y",
        "COOKIES_AGREEMENT_ID": "19",
        "COOKIES_COLOR_BG": "#03c1fe",
        "COOKIES_COLOR_TEXT": "#fff",
        "COOKIES_POSITION": "bottom_left",
        "COOKIES_MODE": "I",
        "B24BUTTON_CODE": "https://cdn-ru.bitrix24.ru/b13743910/crm/site_button/loader_1_68znkz.js",
        "B24BUTTON_COLOR": "site",
        "B24BUTTON_COLOR_VALUE": "#03c1fe",
        "COPYRIGHT_SHOW": "Y",
        "COPYRIGHT_CODE": "6",
        "SETTINGS_PRICE_CODE": [
            "BASE"
        ],
        "SETTINGS_SHOW_PRICE_COUNT": 1,
        "SETTINGS_CURRENCY_ID": "RUB",
        "SPEED_USE_LAZY": "Y",
        "THEME_CODE": "1construction",
        "THEME_COLOR": "#f7b70b",
        "YACOUNTER_USE": "Y",
        "YACOUNTER_COUNTER": "73521121",
        "ROBOTS_USE": "Y",
        "ROBOTS_CONTENT": "Disallow: /preview/*",
        "CSSBLOCK_USE": "N",
        "HEADBLOCK_USE": "N"
    },
    "time": {
        "start": 1773278929,
        "finish": 1773278929.806224,
        "duration": 0.8062241077423096,
        "processing": 0,
        "date_start": "2026-03-12T04:28:49+03:00",
        "date_finish": "2026-03-12T04:28:49+03:00",
        "operating_reset_at": 1773279529,
        "operating": 0.11928892135620117
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) \| `null` | Набор дополнительных полей сайта в формате `{"<КОД_ПОЛЯ>": "<ЗНАЧЕНИЕ>"}`. 

Если доступных полей нет, метод может вернуть `null` или пустой массив `[]` [(подробное описание)](#result-fields) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **<КОД_ПОЛЯ>**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) \| [`boolean`](../../data-types.md) \| [`array`](../../data-types.md) \| [`object`](../../data-types.md) | Пара «код поля → значение поля». 

Значение может быть строкой (`"Y"`, `"#03c1fe"`), числом (`1`) или массивом (например, `["BASE"]`). 

Состав и тип значения зависят от конкретного дополнительного поля. Доступные коды полей описаны в [списке дополнительных полей сайта](./additional-fields.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-get-folders.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-get-preview.md)
- [{#T}](./landing-site-get-public-url.md)
