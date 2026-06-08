# Получить список валют crm.currency.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к настройкам CRM

Метод получает список валют, созданных на портале. 

{% note info %}

Параметры локализации (настройки, зависящие от языка) будут возвращены для текущего языка портала.

{% endnote %}

## Параметры метода

#|
||  **Название**
`тип`| **Описание** ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки записей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`, где `field_N` — идентификатор поля [crm_currency](../data-types.md#crm_currency).

Возможные значения для `order_N`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

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
    -d '{"order":{"sort":"asc","currency":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"sort":"asc","currency":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each currency object returned in result[]
    type CrmCurrencyListItem = {
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
    }

    try {
      // crm.currency.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<CrmCurrencyListItem[]>({
        method: 'crm.currency.list',
        params: {
          order: {
            sort: 'asc',
            currency: 'asc',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Currencies on this page:', result.length, result)
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
      async function listCurrencies() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.currency.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.currency.list',
            params: {
              order: {
                sort: 'asc',
                currency: 'asc',
              },
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
          console.info('Currencies on this page:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCurrencies)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.currency.list',
                [
                    'order' => [
                        'sort'     => 'asc',
                        'currency' => 'asc',
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
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.list",
        {
            order: {
                sort: 'asc',
                currency: 'asc',
            },
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
                console.log(result.data);
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
        'crm.currency.list',
        [
            'order' => [
                'sort' => 'asc',
                'currency' => 'asc',
            ]
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
            "DATE_UPDATE": "2024-01-29T12:28:40+02:00"
        },
        {
            "CURRENCY": "USD",
            "AMOUNT_CNT": "1",
            "AMOUNT": "68.7900",
            "SORT": "200",
            "BASE": "N",
            "FULL_NAME": "Доллар США",
            "LID": "ru",
            "FORMAT_STRING": "$#",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": null,
            "DECIMALS": "2",
            "DATE_UPDATE": "2023-03-21T15:19:50+02:00"
        },
        {
            "CURRENCY": "EUR",
            "AMOUNT_CNT": "1",
            "AMOUNT": "78.3200",
            "SORT": "300",
            "BASE": "N",
            "FULL_NAME": "Евро",
            "LID": "ru",
            "FORMAT_STRING": "# &euro;",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": "&nbsp;",
            "DECIMALS": "2",
            "DATE_UPDATE": "2023-03-21T15:19:50+02:00"
        },
        {
            "CURRENCY": "BYN",
            "AMOUNT_CNT": "1",
            "AMOUNT": "32.2000",
            "SORT": "500",
            "BASE": "N",
            "FULL_NAME": "Белорусский рубль",
            "LID": "ru",
            "FORMAT_STRING": "# руб.",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": "&nbsp;",
            "DECIMALS": "2",
            "DATE_UPDATE": "2023-03-21T15:19:50+02:00"
        },
    ],
    "total": 0,
    "time": {
        "start": 1716986687.629166,
        "finish": 1716986688.481436,
        "duration": 0.8522701263427734,
        "processing": 0.014969825744628906,
        "date_start": "2024-05-29T14:44:47+02:00",
        "date_finish": "2024-05-29T14:44:48+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`crm_currency[]`](../data-types.md#crm_currency) | Массив объектов с информацией о выбранных валютах ||
|| **total**
[`integer`](../../data-types.md) | На текущий момент всегда имеет значение `0` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | Failed to get list. General error. | Не установлен модуль currency (валюты) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)