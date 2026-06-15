# Получить товарные позиции предложения crm.quote.productrows.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» коммерческих предложений

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.productrow.*](../universal/product-rows/index.md).

{% endnote %}

Метод `crm.quote.productrows.get` возвращает товарные позиции коммерческого предложения.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор коммерческого предложения.

Идентификатор можно получить с помощью методов [crm.quote.list](./crm-quote-list.md) или [crm.quote.add](./crm-quote-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить товарные позиции предложения с `id = 1`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.productrows.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.productrows.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each ProductRow returned in result[]
    type ProductRow = {
      ID: string
      OWNER_ID: string
      OWNER_TYPE: string
      PRODUCT_ID: number
      PRODUCT_NAME: string
      ORIGINAL_PRODUCT_NAME: string
      PRODUCT_DESCRIPTION: string
      PRICE: number
      PRICE_EXCLUSIVE: number
      PRICE_NETTO: number
      PRICE_BRUTTO: number
      PRICE_ACCOUNT: string
      QUANTITY: number
      DISCOUNT_TYPE_ID: number
      DISCOUNT_RATE: number
      DISCOUNT_SUM: number
      TAX_RATE: number
      TAX_INCLUDED: string
      CUSTOMIZED: string
      MEASURE_CODE: number
      MEASURE_NAME: string
      SORT: number
      XML_ID: string | null
      TYPE: number
      STORE_ID: number | null
      RESERVE_ID: number | null
      DATE_RESERVE_END: ISODate | null
      RESERVE_QUANTITY: number | null
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductRow[]>({
        method: 'crm.quote.productrows.get',
        params: {
          id: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product rows count:', result.length, result.map(r => r.PRODUCT_NAME))
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
      async function getQuoteProductRows() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.productrows.get',
            params: {
              id: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Product rows count:', result.length, result.map(r => r.PRODUCT_NAME))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getQuoteProductRows)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.productrows.get',
                [
                    'id' => 1,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting quote product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.productrows.get',
        {
            id: 1,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.quote.productrows.get',
        [
            'id' => 1,
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
            "ID": "77",
            "OWNER_ID": "1",
            "OWNER_TYPE": "Q",
            "PRODUCT_ID": 459,
            "PRODUCT_NAME": "Абонемент на две недели",
            "ORIGINAL_PRODUCT_NAME": "Абонемент на две недели",
            "PRODUCT_DESCRIPTION": "",
            "PRICE": 3000,
            "PRICE_EXCLUSIVE": 3000,
            "PRICE_NETTO": 0,
            "PRICE_BRUTTO": 0,
            "PRICE_ACCOUNT": "3000.00000000",
            "QUANTITY": 1,
            "DISCOUNT_TYPE_ID": 2,
            "DISCOUNT_RATE": 0,
            "DISCOUNT_SUM": 0,
            "TAX_RATE": 0,
            "TAX_INCLUDED": "Y",
            "CUSTOMIZED": "Y",
            "MEASURE_CODE": 796,
            "MEASURE_NAME": "шт",
            "SORT": 10,
            "XML_ID": null,
            "TYPE": 1,
            "STORE_ID": null,
            "RESERVE_ID": null,
            "DATE_RESERVE_END": null,
            "RESERVE_QUANTITY": null
        }
    ],
    "time": {
        "start": 1773415393,
        "finish": 1773415393.257197,
        "duration": 0.25719690322875977,
        "processing": 0,
        "date_start": "2026-03-13T18:23:13+03:00",
        "date_finish": "2026-03-13T18:23:13+03:00",
        "operating_reset_at": 1773415993,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`productrow[]`](#productrow) | Корневой элемент ответа, содержащий массив товарных позиций предложения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип productrow {#productrow}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор товарной позиции ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор элемента, к которому привязан товар. Для данного метода равен `id` предложения ||
|| **OWNER_TYPE**
[`string`](../data-types.md) | Строковый идентификатор типа CRM-объекта, к которому привязан товар. Для данного метода всегда равен `Q` ||
|| **PRODUCT_ID**
[`integer`](../data-types.md) | Идентификатор товара в каталоге. `0`, если товар не из каталога.

Для получения подробной информации о товаре используйте [catalog.product.get](../../catalog/product/catalog-product-get.md) ||
|| **PRODUCT_NAME**
[`string`](../data-types.md) | Наименование товарной позиции ||
|| **ORIGINAL_PRODUCT_NAME**
[`string`](../data-types.md) | Наименование товарной позиции в каталоге ||
|| **PRODUCT_DESCRIPTION**
[`string`](../data-types.md) | Описание товарной позиции ||
|| **PRICE**
[`double`](../data-types.md) | Итоговая стоимость товара за единицу ||
|| **PRICE_EXCLUSIVE**
[`double`](../data-types.md) | Стоимость за единицу с учетом скидок, без учета налогов ||
|| **PRICE_NETTO**
[`double`](../data-types.md) | Стоимость за единицу без учета скидок и налогов ||
|| **PRICE_BRUTTO**
[`double`](../data-types.md) | Стоимость за единицу без учета скидок, но с учетом налогов ||
|| **PRICE_ACCOUNT**
[`string`](../data-types.md) | Стоимость товара в валюте отчетов ||
|| **QUANTITY**
[`double`](../data-types.md) | Количество единиц товара ||
|| **DISCOUNT_TYPE_ID**
[`integer`](../data-types.md) | Тип скидки:
- `1` — абсолютная
- `2` — процентная ||
|| **DISCOUNT_RATE**
[`double`](../data-types.md) | Значение скидки в процентах ||
|| **DISCOUNT_SUM**
[`double`](../data-types.md) | Абсолютное значение скидки ||
|| **TAX_RATE**
[`double`](../data-types.md) | Ставка налога в процентах ||
|| **TAX_INCLUDED**
[`char`](../data-types.md) | Включен ли налог в стоимость:
- `Y` — да
- `N` — нет ||
|| **CUSTOMIZED**
[`char`](../data-types.md) | Признак ручного изменения товарной позиции:
- `Y` — да
- `N` — нет ||
|| **MEASURE_CODE**
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения ||
|| **MEASURE_NAME**
[`string`](../data-types.md) | Текстовое представление единицы измерения ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний код товарной позиции ||
|| **TYPE**
[`integer`](../data-types.md) | Тип товара:
- `1` — простой товар
- `4` — торговое предложение (вариация)
- `7` — услуга ||
|| **STORE_ID**
[`integer`](../data-types.md) | Идентификатор склада ||
|| **RESERVE_ID**
[`integer`](../data-types.md) | Идентификатор резерва ||
|| **DATE_RESERVE_END**
[`date`](../data-types.md) | Дата окончания резервирования ||
|| **RESERVE_QUANTITY**
[`double`](../data-types.md) | Количество зарезервированных единиц товара ||
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
|| `-` | `The parameter id is invalid or not defined.` | В параметр `id` не передано значение или передано невалидное значение ||
|| `-` | `Access denied.` | У пользователя нет прав на чтение коммерческого предложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-product-rows-set.md)
- [{#T}](./crm-quote-get.md)
- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-fields.md)





