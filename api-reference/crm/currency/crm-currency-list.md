# Получить список валют crm.currency.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение хотя бы одного объекта CRM

Метод `crm.currency.list` возвращает все валюты Битрикс24 одним ответом. Для каждой валюты — код, курс к базовой валюте, сортировка и параметры вывода. Постраничной выборки у метода нет, параметр `start` не учитывается.

{% note info %}

Название валюты, формат суммы и разделители метод возвращает для текущего языка Битрикс24.

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип`| **Описание** ||
|| **order**
[`object`](../../data-types.md) | Необязательный объект для сортировки записей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`, где `field_N` — идентификатор поля [crm_currency](../data-types.md#crm_currency), например `sort`. Сортировать можно по полям `sort`, `currency` и `name` — названию валюты.

Метод учитывает только первое поле в `order`, остальные пропускает. По умолчанию — `{"sort": "asc"}`.

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
      // crm.currency.list returns all currencies in one response (no paging)
      const response = await $b24.actions.v2.call.make<CrmCurrencyListItem[]>({
        method: 'crm.currency.list',
        params: {
          order: {
            sort: 'asc',
            currency: 'asc',
          },
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

          // crm.currency.list returns all currencies in one response (no paging)
          const response = await $b24.actions.v2.call.make({
            method: 'crm.currency.list',
            params: {
              order: {
                sort: 'asc',
                currency: 'asc',
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
          console.info('Currencies on this page:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCurrencies)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.currency.list(
            order={
                "sort": "asc",
                "currency": "asc",
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.currency.list(
            order={
                "sort": "asc",
                "currency": "asc",
            },
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.currency.list", b24.Params{
    	"order": b24.Params{
    		"sort":     "asc",
    		"currency": "asc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.currency.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
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
        }
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
[`crm_currency[]`](../data-types.md#crm_currency) | Массив всех валют Битрикс24 [(подробное описание)](#result) ||
|| **total**
[`integer`](../../data-types.md) | Всегда `0`. Число валют — длина массива `result` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

Числовые значения приходят строками. Если для текущего языка Битрикс24 нет локализации, поля `FULL_NAME`, `LID`, `FORMAT_STRING`, `DEC_POINT`, `THOUSANDS_SEP` и `DECIMALS` равны `null`. Метод [crm.currency.get](./crm-currency-get.md) возвращает локализации на всех языках в поле `LANG`.

#|
|| **Название**
`тип` | **Описание** ||
|| **CURRENCY**
[`string`](../../data-types.md) | Код валюты, например `USD` ||
|| **AMOUNT_CNT**
[`string`](../../data-types.md) | Номинал — количество единиц валюты, для которого указан курс ||
|| **AMOUNT**
[`string`](../../data-types.md) | Сколько стоит номинал в базовой валюте ||
|| **SORT**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **BASE**
[`string`](../../data-types.md) | Базовая ли валюта: `Y` или `N` ||
|| **FULL_NAME**
[`string`](../../data-types.md) | Название валюты на текущем языке ||
|| **LID**
[`string`](../../data-types.md) | Язык, для которого возвращены поля вывода ||
|| **FORMAT_STRING**
[`string`](../../data-types.md) | Шаблон вывода суммы, например `# руб.` ||
|| **DEC_POINT**
[`string`](../../data-types.md) | Десятичный разделитель ||
|| **THOUSANDS_SEP**
[`string`](../../data-types.md) | Разделитель разрядов ||
|| **DECIMALS**
[`string`](../../data-types.md) | Количество знаков после запятой ||
|| **DATE_UPDATE**
[`string`](../../data-types.md) | Дата и время последнего изменения в формате ISO 8601 ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Parameter 'order' must be array.` | `order` передан не объектом ||
|| `400` | Пустое значение | `Parameter 'filter' must be array.` | `filter` передан не объектом. Метод проверяет только тип `filter`, сам фильтр не применяет ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет доступа на чтение ни одного объекта CRM ||
|| `400` | Пустое значение | `Failed to get list. General error.` | Не установлен модуль «Валюты» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)
- [{#T}](./index.md)