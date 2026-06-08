# Получить локализации валюты crm.currency.localizations.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к настройкам CRM

Метод получает существующие локализации валюты.

## Параметры метода

#|
||  **Название**
`тип`| **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор валюты. 

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](../crm-currency-list.md)
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.localizations.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.localizations.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmCurrencyLocalizations = Record<string, CrmCurrencyLocalization>

    type CrmCurrencyLocalization = {
      FORMAT_STRING: string
      FULL_NAME: string
      DEC_POINT: string
      THOUSANDS_SEP: string | null
      DECIMALS: string
      THOUSANDS_VARIANT: string
      HIDE_ZERO: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmCurrencyLocalizations>({
        method: 'crm.currency.localizations.get',
        params: {
          id: 'RUB',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Localization languages:', Object.keys(result))
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
      async function getCurrencyLocalizations() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.currency.localizations.get',
            params: {
              id: 'RUB',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Localization languages:', Object.keys(result))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCurrencyLocalizations)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.currency.localizations.get',
                [
                    'id' => 'RUB',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting currency localizations: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.localizations.get",
        {
            id: "RUB"
        },
    )
    .then(
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result);
            }
        },
        function(error)
        {
            console.info(error);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.currency.localizations.get',
        [
            'id' => 'RUB'
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
        "en": {
            "FORMAT_STRING": "&#8381;#",
            "FULL_NAME": "Russian Ruble",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": null,
            "DECIMALS": "2",
            "THOUSANDS_VARIANT": "C",
            "HIDE_ZERO": "Y"
        },
        "ru": {
            "FORMAT_STRING": "# &#8381;",
            "FULL_NAME": "Российский рубль",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": "&nbsp;",
            "DECIMALS": "2",
            "THOUSANDS_VARIANT": "B",
            "HIDE_ZERO": "Y"
        }
    },
    "time": {
        "start": 1718114356.076467,
        "finish": 1718114356.682042,
        "duration": 0.6055748462677002,
        "processing": 0.03888106346130371,
        "date_start": "2024-06-11T15:59:16+02:00",
        "date_finish": "2024-06-11T15:59:16+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект в формате `{"lang_1": "value_1", ... "lang_N": "value_N"}`, где `lang_N` — идентификатор языка, а `value` — объект типа [crm_currency_localization](../../data-types.md#crm_currency_localization). ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "The parameter id is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | The parameter id is invalid or not defined. | Пустой идентификатор валюты ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-localizations-set.md)
- [{#T}](./crm-currency-localizations-delete.md)
- [{#T}](./crm-currency-localizations-fields.md)