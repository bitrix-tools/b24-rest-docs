# Установить товары в лид crm.lead.productrows.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» лида

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.productrow.*](../universal/product-rows/index.md).

{% endnote %}

Метод `crm.lead.productrows.set` создает или обновляет товарные позиции лида. Существующие позиции, не переданные в метод, будут удалены из лида.

Чтобы изменить только одну позицию, используйте методы [crm.item.productrow.*](../universal/product-rows/index.md).

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../data-types.md) | Идентификатор лида. Можно получить с помощью метода получения списка лидов: [`crm.lead.list`](./crm-lead-list.md) или при создании лида: [`crm.lead.add`](./crm-lead-add.md) ||
|| **rows**
[`object[]`](#productrows) | Товарные позиции

Массив объектов, вида:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```
где
- `field_n` — название поля товарной позиции
- `value_n` — значение данного поля

Список доступных полей описан [ниже](#parameter-rows) ||
|#

### Список доступных полей у товарных позиций {#parameter-rows}

#|
|| **Название**
`тип` | **Описание** ||
|| **PRODUCT_ID**
[`integer`](../../data-types.md) | Идентификатор товара в каталоге. Можно получить список товаров с помощью метода [`catalog.product.list`](../../catalog/product/catalog-product-list.md)
`0` если не из каталога

По умолчанию - `0`
||
|| **PRODUCT_NAME**
[`string`](../../data-types.md) | Наименование товарной позиции. Если передан `PRODUCT_ID`, то название будет взято у товара

Если поля `PRODUCT_ID` и `PRODUCT_NAME` не переданы, то `PRODUCT_NAME` будет равен `[{id}]`, где `{id}` - Идентификатор созданной товарной позиции
||
|| **PRICE**
[`double`](../../data-types.md) | Итоговая стоимость товара за единицу

По умолчанию - `0.0`
||
|| **PRICE_EXCLUSIVE**
[`double`](../../data-types.md) | Стоимость за единицу с учетом скидок, без учета налогов ||
|| **PRICE_NETTO**
[`double`](../../data-types.md) | Стоимость за единицу без учета скидок и налогов ||
|| **PRICE_BRUTTO**
[`double`](../../data-types.md) | Стоимость за единицу без учета скидок, но с учетом налогов ||
|| **QUANTITY**
[`double`](../../data-types.md) | Количество единиц товара

По умолчанию - `1.0`
||
|| **DISCOUNT_TYPE_ID**
[`integer`](../../data-types.md) | Тип скидки
Возможные типы:
- `1` - Абсолютный
- `2` - Процентный

По умолчанию - `2`
||
|| **DISCOUNT_RATE**
[`double`](../../data-types.md) | Значение скидки в процентах (если используется тип скидки с процентным значением)

По умолчанию - `0.0`
||
|| **DISCOUNT_SUM**
[`double`](../../data-types.md) | Абсолютное значение скидки (если используется тип скидки с абсолютным значением)

По умолчанию - `0.0`
||
|| **TAX_RATE**
[`double`](../../data-types.md) | Ставка налога в процентах ||
|| **TAX_INCLUDED**
[`char`](../../data-types.md) | Индикатор того, включен ли налог в стоимость
Возможные значения:
- `Y` – налог включен
- `N` – налог не включен

По умолчанию - `N`
||
|| **MEASURE_CODE**
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения

Если передан `PRODUCT_ID`, то по умолчанию будет взято значение из товара, иначе `0`
||
|| **MEASURE_NAME**
[`string`](../../data-types.md) | Текстовое представление единицы измерения (например - шт, кг, м, л и т.д.)

Если передан `PRODUCT_ID`, то по умолчанию будет взято значение из товара, иначе `""`
||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка

По умолчанию - `0`
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
    -d '{"id":5,"rows":[{"PRODUCT_ID":456,"PRICE":1000,"QUANTITY":10,"DISCOUNT_TYPE_ID":1,"DISCOUNT_SUM":100,"TAX_RATE":13,"MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":10},{"PRODUCT_NAME":"Товар #2","PRICE":500,"QUANTITY":5,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":10,"TAX_RATE":10,"MEASURE_CODE":166,"MEASURE_NAME":"кг","SORT":20}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.productrows.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5,"rows":[{"PRODUCT_ID":456,"PRICE":1000,"QUANTITY":10,"DISCOUNT_TYPE_ID":1,"DISCOUNT_SUM":100,"TAX_RATE":13,"MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":10},{"PRODUCT_NAME":"Товар #2","PRICE":500,"QUANTITY":5,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":10,"TAX_RATE":10,"MEASURE_CODE":166,"MEASURE_NAME":"кг","SORT":20}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.productrows.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.lead.productrows.set',
        params: {
          id: 5,
          rows: [
            {
              PRODUCT_ID: 456,
              PRICE: 1000,
              QUANTITY: 10,
              DISCOUNT_TYPE_ID: 1,
              DISCOUNT_SUM: 100,
              TAX_RATE: 13,
              MEASURE_CODE: 796,
              MEASURE_NAME: 'pcs',
              SORT: 10,
            },
            {
              PRODUCT_NAME: 'Product #2',
              PRICE: 500,
              QUANTITY: 5,
              DISCOUNT_TYPE_ID: 2,
              DISCOUNT_RATE: 10,
              TAX_RATE: 10,
              MEASURE_CODE: 166,
              MEASURE_NAME: 'kg',
              SORT: 20,
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product rows set:', result)
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
      async function setLeadProductRows() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.productrows.set',
            params: {
              id: 5,
              rows: [
                {
                  PRODUCT_ID: 456,
                  PRICE: 1000,
                  QUANTITY: 10,
                  DISCOUNT_TYPE_ID: 1,
                  DISCOUNT_SUM: 100,
                  TAX_RATE: 13,
                  MEASURE_CODE: 796,
                  MEASURE_NAME: 'pcs',
                  SORT: 10,
                },
                {
                  PRODUCT_NAME: 'Product #2',
                  PRICE: 500,
                  QUANTITY: 5,
                  DISCOUNT_TYPE_ID: 2,
                  DISCOUNT_RATE: 10,
                  TAX_RATE: 10,
                  MEASURE_CODE: 166,
                  MEASURE_NAME: 'kg',
                  SORT: 20,
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Product rows set:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setLeadProductRows)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.lead.productrows.set',
                [
                    'id'   => 5,
                    'rows' => [
                        [
                            'PRODUCT_ID'       => 456,
                            'PRICE'           => 1000,
                            'QUANTITY'        => 10,
                            'DISCOUNT_TYPE_ID' => 1,
                            'DISCOUNT_SUM'    => 100,
                            'TAX_RATE'        => 13,
                            'MEASURE_CODE'    => 796,
                            'MEASURE_NAME'    => "шт",
                            'SORT'            => 10,
                        ],
                        [
                            'PRODUCT_NAME'     => "Товар #2",
                            'PRICE'           => 500,
                            'QUANTITY'        => 5,
                            'DISCOUNT_TYPE_ID' => 2,
                            'DISCOUNT_RATE'   => 10,
                            'TAX_RATE'        => 10,
                            'MEASURE_CODE'    => 166,
                            'MEASURE_NAME'    => "кг",
                            'SORT'            => 20,
                        ],
                    ],
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
        echo 'Error setting lead product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.lead.productrows.set',
        {
            id: 5,
            rows: [
                {
                    PRODUCT_ID: 456,
                    PRICE: 1000,
                    QUANTITY: 10,
                    DISCOUNT_TYPE_ID: 1,
                    DISCOUNT_SUM: 100,
                    TAX_RATE: 13,
                    MEASURE_CODE: 796,
                    MEASURE_NAME: "шт",
                    SORT: 10,
                },
                {
                    PRODUCT_NAME: "Товар #2",
                    PRICE: 500,
                    QUANTITY: 5,
                    DISCOUNT_TYPE_ID: 2,
                    DISCOUNT_RATE: 10,
                    TAX_RATE: 10,
                    MEASURE_CODE: 166,
                    MEASURE_NAME: "кг",
                    SORT: 20,
                },
            ],
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
        'crm.lead.productrows.set',
        [
            'id' => 5,
            'rows' => [
                [
                    'PRODUCT_ID' => 456,
                    'PRICE' => 1000,
                    'QUANTITY' => 10,
                    'DISCOUNT_TYPE_ID' => 1,
                    'DISCOUNT_SUM' => 100,
                    'TAX_RATE' => 13,
                    'MEASURE_CODE' => 796,
                    'MEASURE_NAME' => "шт",
                    'SORT' => 10,
                ],
                [
                    'PRODUCT_NAME' => "Товар #2",
                    'PRICE' => 500,
                    'QUANTITY' => 5,
                    'DISCOUNT_TYPE_ID' => 2,
                    'DISCOUNT_RATE' => 10,
                    'TAX_RATE' => 10,
                    'MEASURE_CODE' => 166,
                    'MEASURE_NAME' => "кг",
                    'SORT' => 20,
                ],
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.lead.productrows.set(
            bitrix_id=1201,
            rows=[
            {
            "PRODUCT_ID": 456,
            "PRODUCT_NAME": "Enterprise CRM License",
            "PRICE": 1200.0,
            "QUANTITY": 12,
            "DISCOUNT_TYPE_ID": 1,
            "DISCOUNT_SUM": 150.0,
            "TAX_RATE": 20.0,
            "TAX_INCLUDED": "N",
            "MEASURE_CODE": 796,
            "MEASURE_NAME": "pcs",
            "SORT": 10,
            },
            {
            "PRODUCT_NAME": "Implementation Package",
            "PRICE": 5000.0,
            "QUANTITY": 1,
            "DISCOUNT_TYPE_ID": 2,
            "DISCOUNT_RATE": 10.0,
            "TAX_RATE": 20.0,
            "TAX_INCLUDED": "N",
            "MEASURE_CODE": 796,
            "MEASURE_NAME": "pcs",
            "SORT": 20,
            },
            ],
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": true,
  "time": {
    "start": 1772549200,
    "finish": 1772549200.281883,
    "duration": 0.28188300132751465,
    "processing": 0,
    "date_start": "2026-03-03T17:46:40+03:00",
    "date_finish": "2026-03-03T17:46:40+03:00",
    "operating_reset_at": 1772549800,
    "operating": 0.9811058044433594
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "ERROR_CORE",
  "error_description": "Discount Sum (DISCOUNT_SUM) is required if Percentage Discount Type (DISCOUNT_TYPE_ID) is defined and Discount Rate (DISCOUNT_RATE) is 100%<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Описание** | **Значение** ||
|| The parameter id is invalid or not defined | В параметр `id` передано некорректное значение ||
|| The parameter rows must be array | В параметр `rows` передано значение не типа `array` ||
|| Access denied | У пользователя нет прав на «изменение» лида ||
|| Not found | Лид с переданным `id` не найден ||
|| Discount Rate (`DISCOUNT_RATE`) is required if Percentage Discount Type (`DISCOUNT_TYPE_ID`) is defined | Было передано `DISCOUNT_TYPE_ID = 2` и не передано `DISCOUNT_RATE` ||
|| Discount Sum (`DISCOUNT_SUM`) is required if Percentage Discount Type (`DISCOUNT_TYPE_ID`) is defined and Discount Rate (`DISCOUNT_RATE`) is 100% | Было передано `DISCOUNT_RATE = 100` и `DISCOUNT_TYPE_ID = 2` и не передано `DISCOUNT_SUM` ||
|| Discount Sum (`DISCOUNT_SUM`) is required if Monetary Discount Type (`DISCOUNT_TYPE_ID`) is defined | Было передано `DISCOUNT_TYPE_ID = 1` и не передано `DISCOUNT_SUM` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-productrows-get.md)





