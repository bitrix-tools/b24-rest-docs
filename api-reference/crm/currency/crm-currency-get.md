# Получить валюту по коду crm.currency.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение хотя бы одного объекта CRM

Метод `crm.currency.get` возвращает валюту по коду, например `USD`. В ответе — курс к базовой валюте, сортировка и параметры вывода на разных языках.

{% note info %}

Название валюты, формат суммы и разделители метод возвращает для текущего языка Битрикс24. Локализации на всех языках приходят в поле `LANG`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`| **Описание** ||
|| **id***
[`crm_currency.CURRENCY`](../data-types.md#crm_currency) | Символьный идентификатор валюты.

Соответствует стандарту ISO 4217.

Регистр не важен: `usd` метод примет как `USD`.

Код можно получить методом [crm.currency.list](./crm-currency-list.md) ||
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.currency.get(bitrix_id="RUB").response
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
                'crm.currency.get',
                [
                    'id' => 'RUB',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.get",
        {
            id: "RUB"
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
        'crm.currency.get',
        [
            'id' => 'RUB'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.currency.get", b24.Params{
    	"id": "RUB",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.currency.get: %w", err)
    }

    var item struct {
    	Currency  string `json:"CURRENCY"`
    	AmountCnt string `json:"AMOUNT_CNT"`
    	Amount    string `json:"AMOUNT"`
    	Sort      string `json:"SORT"`
    	Base      string `json:"BASE"`
    	FullName  string `json:"FULL_NAME"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Currency, item.AmountCnt)
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
[`crm_currency`](../data-types.md#crm_currency) | Данные валюты [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

Числовые значения приходят строками. Поля `FULL_NAME`, `LID`, `FORMAT_STRING`, `DEC_POINT`, `THOUSANDS_SEP` и `DECIMALS` относятся к текущему языку Битрикс24. Если для этого языка нет локализации, `FULL_NAME` равно коду валюты, а остальные поля — `null`.

#|
|| **Название**
`тип` | **Описание** ||
|| **CURRENCY**
[`string`](../../data-types.md) | Код валюты по ISO 4217, например `USD` ||
|| **AMOUNT_CNT**
[`string`](../../data-types.md) | Номинал — количество единиц валюты, для которого указан курс, например `1` ||
|| **AMOUNT**
[`string`](../../data-types.md) | Курс номинала к базовой валюте, например `92.5000` ||
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
|| **LANG**
[`object`](../../data-types.md) | Локализации валюты по языкам в формате `{"ru": {...}, "en": {...}}`. Поля локализации описаны в типе [crm_currency_localization](../data-types.md#crm_currency_localization). Если локализаций нет — пустой массив `[]` ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет доступа на чтение ни одного объекта CRM ||
|| `400` | Пустое значение | `ID is not defined or invalid.` | Не передан параметр `id` ||
|| `400` | Пустое значение | `The parameter id is not string.` | `id` передан не строкой ||
|| `400` | Пустое значение | `Not found` | Валюты с таким кодом нет ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-list.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)
- [{#T}](./index.md)