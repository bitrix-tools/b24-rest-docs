# Получить валюту по id crm.currency.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к настройкам CRM

Метод получает данные валюты по её символьному идентификатору `id` по ISO 4217.

{% note info %}

Параметры локализации (настройки, зависящие от языка) будут возвращены для текущего языка портала.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
||  **Название**
`тип`| **Описание** ||
|| **id**
[`crm_currency.CURRENCY`](../data-types.md#crm_currency) | Символьный идентификатор валюты.

Соответствует стандарту ISO 4217.

Можно получить методом [crm.currency.list](./crm-currency-list.md)
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmCurrencyResult = {
      CURRENCY: string
      AMOUNT_CNT: string
      AMOUNT: string
      SORT: string
      BASE: string
      FULL_NAME: string
      LID: string
      FORMAT_STRING: string
      DEC_POINT: string
      THOUSANDS_SEP: string | null
      DECIMALS: string
      DATE_UPDATE: ISODate | null
      LANG: Record<string, CrmCurrencyLang>
    }

    type CrmCurrencyLang = {
      FORMAT_STRING: string
      FULL_NAME: string
      DEC_POINT: string
      THOUSANDS_SEP: string | null
      DECIMALS: string
      THOUSANDS_VARIANT: string
      HIDE_ZERO: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmCurrencyResult>({
        method: 'crm.currency.get',
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
        console.info('Currency:', result.CURRENCY, result.FULL_NAME)
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
      async function getCurrency() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.currency.get',
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
          console.info('Currency:', result.CURRENCY, result.FULL_NAME)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCurrency)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.currency.get',
                [
                    'id' => 'RUB',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling crm.currency.get: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.get",
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
                console.log(result.data());
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
        'crm.currency.get',
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
        "CURRENCY": "RUB",
        "AMOUNT_CNT": "1",
        "AMOUNT": "1.0000",
        "SORT": "100",
        "BASE": "Y",
        "FULL_NAME": "Российский рубль",
        "LID": "ru",
        "FORMAT_STRING": "# &#8381;",
        "DEC_POINT": ".",
        "THOUSANDS_SEP": "&nbsp;",
        "DECIMALS": "2",
        "DATE_UPDATE": "2024-01-29T12:28:40+02:00",
        "LANG": {
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
        }
    },
    "time": {
        "start": 1718357792.091095,
        "finish": 1718357792.889212,
        "duration": 0.79811692237854,
        "processing": 0.10800814628601074,
        "date_start": "2024-06-14T11:36:32+02:00",
        "date_finish": "2024-06-14T11:36:32+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`crm_currency`](../data-types.md#crm_currency) | Объект с данными валюты ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "Not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | Not found | Валюта с указанным кодом не найдена ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-list.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)