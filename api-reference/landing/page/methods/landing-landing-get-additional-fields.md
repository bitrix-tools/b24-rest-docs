# Получить дополнительные поля страницы landing.landing.getadditionalfields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.landing.getadditionalfields` получает [дополнительные поля](../additional-fields.md) страницы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 349
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.getadditionalfields.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 349,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.getadditionalfields.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AdditionalFieldsResult = Record<string, string | number | boolean | string[]>

    try {
      const response = await $b24.actions.v2.call.make<AdditionalFieldsResult>({
        method: 'landing.landing.getadditionalfields',
        params: {
          lid: 349,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Additional fields:', Object.keys(result).length, result)
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
            method: 'landing.landing.getadditionalfields',
            params: {
              lid: 349,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Additional fields:', Object.keys(result).length, result)
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
                'landing.landing.getadditionalfields',
                [
                    'lid' => 349,
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
        'landing.landing.getadditionalfields',
        {
            lid: 349
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
        'landing.landing.getadditionalfields',
        [
            'lid' => 349,
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

Ниже приведен сокращенный пример ответа. Фактический набор полей зависит от настроек страницы и подключенных для нее дополнительных полей.

```json
{
    "result": {
        "FONTS_CODE": "<noscript><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/...\" data-font=\"g-font-russo-one\"></noscript>",
        "GACOUNTER_USE": "N",
        "METAMAIN_USE": "Y",
        "METAMAIN_TITLE": "Фестиваль в Москве. 20-26 апреля 2022 г. Купить билеты онлайн",
        "METAOG_TITLE": "Фестиваль в Москве. 20-26 апреля 2022 г. Купить билеты онлайн",
        "METAOG_IMAGE": "https://cdn-ru.bitrix24.ru/.../cover_1x.webp",
        "SETTINGS_PRICE_CODE": [
            "BASE"
        ],
        "SETTINGS_SHOW_PRICE_COUNT": 1,
        "THEMEFONTS_LINE_HEIGHT": "1.6",
        "VIEW_TYPE": "no",
        "YACOUNTER_USE": "N"
    },
    "time": {
        "start": 1773722096,
        "finish": 1773722096.682451,
        "duration": 0.6824510097503662,
        "processing": 0,
        "date_start": "2026-03-17T12:34:56+03:00",
        "date_finish": "2026-03-17T12:34:56+03:00",
        "operating_reset_at": 1773722696,
        "operating": 0.11843705177307129
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Набор дополнительных полей страницы в формате `{"<КОД_ПОЛЯ>": "<ЗНАЧЕНИЕ>"}`.

Если у страницы нет доступных непустых дополнительных полей, метод возвращает пустой массив `[]` [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **<КОД_ПОЛЯ>**
[`string`](../../../data-types.md) \| [`integer`](../../../data-types.md) \| [`boolean`](../../../data-types.md) \| [`array`](../../../data-types.md) \| [`object`](../../../data-types.md) | Пара «код поля → значение поля». Метод возвращает только поля с непустыми значениями.  

Доступные коды полей перечислены в разделе [Дополнительные поля страницы](../additional-fields.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена: в `lid` передан идентификатор несуществующей или недоступной страницы ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-update.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-get-preview.md)
- [{#T}](./landing-landing-get-public-url.md)
