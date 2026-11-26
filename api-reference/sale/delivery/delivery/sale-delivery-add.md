# Добавить службу доставки sale.delivery.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод `sale.delivery.add` добавляет службу доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **REST_CODE***
[`string`](../../../data-types.md) | Символьный код REST-обработчика службы доставки — поле `CODE` объекта [sale_delivery_handler](../../data-types.md#sale_delivery_handler).

Получить коды обработчиков можно методом [sale.delivery.handler.list](../handler/sale-delivery-handler-list.md), создать обработчик — методом [sale.delivery.handler.add](../handler/sale-delivery-handler-add.md) ||
|| **NAME***
[`string`](../../../data-types.md) | Название службы доставки ||
|| **CURRENCY***
[`crm_currency.CURRENCY`](../../../crm/data-types.md#crm_currency) | Символьный код валюты службы доставки, например `RUB`.

Получить коды валют можно методом [crm.currency.list](../../../crm/currency/crm-currency-list.md). Метод не проверяет, что валюта существует, и сохраняет любой переданный код ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание службы доставки.

Значение по умолчанию — пустая строка ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка. Нечисловое значение сохраняется как `0`.

Значение по умолчанию — `100` ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Активность службы доставки. Возможные значения:
- `Y` — активна
- `N` — неактивна

Другое значение вызывает ошибку `ERROR_DELIVERY_ADD`.

Значение по умолчанию — `Y` ||
|| **CONFIG**
[`object[]`](../../../data-types.md) | Массив значений настроек службы доставки. [Описание элемента](#config).

Набор настроек объявлен в `SETTINGS.CONFIG` обработчика. Получить его можно методом [sale.delivery.handler.list](../handler/sale-delivery-handler-list.md) ||
|| **LOGOTYPE**
[`string`](../../../data-types.md) \| [`array`](../../../data-types.md) | Логотип службы доставки. Передайте содержимое файла в формате Base64 строкой или массивом `["имя_файла.png", "содержимое в Base64"]` ||
|#

Профили службы создаются автоматически: для каждого профиля обработчика метод создает дочернюю службу доставки с той же валютой. Название и описание профиля берутся из обработчика.

### Элемент CONFIG {#config}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../../data-types.md) | Символьный код настройки — поле `CODE` элемента `SETTINGS.CONFIG` обработчика, например `SETTING_1`.

Метод не сверяет код с настройками обработчика и сохраняет любой переданный код ||
|| **VALUE***
[`any`](../../../data-types.md) | Значение настройки. Пустая строка не допускается.

Метод не проверяет значение по типу настройки, например для `ENUM` сохраняется любое значение ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REST_CODE":"uber","NAME":"Uber Taxi","CURRENCY":"RUB","DESCRIPTION":"Uber Taxi Description","SORT":"500","ACTIVE":"Y","CONFIG":[{"CODE":"SETTING_1","VALUE":"SETTING_1 string value"},{"CODE":"SETTING_2","VALUE":"Y"},{"CODE":"SETTING_3","VALUE":199.99},{"CODE":"SETTING_4","VALUE":"Option3Code"},{"CODE":"SETTING_5","VALUE":"10.04.2024"},{"CODE":"SETTING_6","VALUE":"0000144961"}],"LOGOTYPE":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REST_CODE":"uber","NAME":"Uber Taxi","CURRENCY":"RUB","DESCRIPTION":"Uber Taxi Description","SORT":"500","ACTIVE":"Y","CONFIG":[{"CODE":"SETTING_1","VALUE":"SETTING_1 string value"},{"CODE":"SETTING_2","VALUE":"Y"},{"CODE":"SETTING_3","VALUE":199.99},{"CODE":"SETTING_4","VALUE":"Option3Code"},{"CODE":"SETTING_5","VALUE":"10.04.2024"},{"CODE":"SETTING_6","VALUE":"0000144961"}],"LOGOTYPE":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SaleDeliveryAddResult = {
      parent: {
        NAME: string,
        ACTIVE: string,
        DESCRIPTION: string,
        CURRENCY: string,
        ID: number,
        PARENT_ID: number | null,
        SORT: number,
        LOGOTYPE: number | null,
      },
      profiles: Array<{
        NAME: string,
        ACTIVE: string,
        DESCRIPTION: string,
        CURRENCY: string,
        ID: number,
        PARENT_ID: number | null,
        SORT: number,
        LOGOTYPE: number | null,
      }>,
    }

    try {
      const response = await $b24.actions.v2.call.make<SaleDeliveryAddResult>({
        method: 'sale.delivery.add',
        params: {
          REST_CODE: 'uber',
          NAME: 'Uber Taxi',
          CURRENCY: 'RUB',
          DESCRIPTION: 'Uber Taxi Description',
          SORT: '500',
          ACTIVE: 'Y',
          CONFIG: [
            { CODE: 'SETTING_1', VALUE: 'SETTING_1 string value' },
            { CODE: 'SETTING_2', VALUE: 'Y' },
            { CODE: 'SETTING_3', VALUE: 199.99 },
            { CODE: 'SETTING_4', VALUE: 'Option3Code' },
            { CODE: 'SETTING_5', VALUE: '10.04.2024' },
            { CODE: 'SETTING_6', VALUE: '0000144961' },
          ],
          LOGOTYPE: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added delivery service ID:', result.parent.ID, 'Profiles:', result.profiles.length)
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
      async function addDelivery() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.delivery.add',
            params: {
              REST_CODE: 'uber',
              NAME: 'Uber Taxi',
              CURRENCY: 'RUB',
              DESCRIPTION: 'Uber Taxi Description',
              SORT: '500',
              ACTIVE: 'Y',
              CONFIG: [
                { CODE: 'SETTING_1', VALUE: 'SETTING_1 string value' },
                { CODE: 'SETTING_2', VALUE: 'Y' },
                { CODE: 'SETTING_3', VALUE: 199.99 },
                { CODE: 'SETTING_4', VALUE: 'Option3Code' },
                { CODE: 'SETTING_5', VALUE: '10.04.2024' },
                { CODE: 'SETTING_6', VALUE: '0000144961' },
              ],
              LOGOTYPE: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Added delivery service ID:', result.parent.ID, 'Profiles:', result.profiles.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDelivery)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    config = [
        {
            "CODE": "SETTING_1",
            "VALUE": "SETTING_1 string value",
        },
        {
            "CODE": "SETTING_2",
            "VALUE": "Y",
        },
        {
            "CODE": "SETTING_3",
            "VALUE": 199.99,
        },
        {
            "CODE": "SETTING_4",
            "VALUE": "Option3Code",
        },
        {
            "CODE": "SETTING_5",
            "VALUE": "10.04.2024",
        },
        {
            "CODE": "SETTING_6",
            "VALUE": "0000144961",
        },
    ]

    try:
        bitrix_response = client.sale.delivery.add(
            rest_code='uber',
            name='Uber Taxi',
            currency='RUB',
            description='Uber Taxi Description',
            sort=500,
            active=True,
            config=config,
            logotype='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.delivery.add',
                [
                    'REST_CODE'    => "uber",
                    'NAME'         => "Uber Taxi",
                    'CURRENCY'     => "RUB",
                    'DESCRIPTION'  => "Uber Taxi Description",
                    'SORT'         => "500",
                    'ACTIVE'       => "Y",
                    'CONFIG'       => [
                        [
                            'CODE'  => "SETTING_1",
                            'VALUE' => "SETTING_1 string value",
                        ],
                        [
                            'CODE'  => "SETTING_2",
                            'VALUE' => "Y",
                        ],
                        [
                            'CODE'  => "SETTING_3",
                            'VALUE' => 199.99,
                        ],
                        [
                            'CODE'  => "SETTING_4",
                            'VALUE' => "Option3Code",
                        ],
                        [
                            'CODE'  => "SETTING_5",
                            'VALUE' => "10.04.2024",
                        ],
                        [
                            'CODE'  => "SETTING_6",
                            'VALUE' => "0000144961",
                        ],
                    ],
                    'LOGOTYPE'     => "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding delivery method: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.add', {
            REST_CODE: "uber",
            NAME: "Uber Taxi",
            CURRENCY: "RUB",
            DESCRIPTION: "Uber Taxi Description",
            SORT: "500",
            ACTIVE: "Y",
            CONFIG: [{
                    CODE: "SETTING_1",
                    VALUE: "SETTING_1 string value",
                },
                {
                    CODE: "SETTING_2",
                    VALUE: "Y",
                },
                {
                    CODE: "SETTING_3",
                    VALUE: 199.99,
                },
                {
                    CODE: "SETTING_4",
                    VALUE: "Option3Code",
                },
                {
                    CODE: "SETTING_5",
                    VALUE: "10.04.2024",
                },
                {
                    CODE: "SETTING_6",
                    VALUE: "0000144961",
                },
            ],
    LOGOTYPE: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.delivery.add',
        [
            'REST_CODE' => "uber",
            'NAME' => "Uber Taxi",
            'CURRENCY' => "RUB",
            'DESCRIPTION' => "Uber Taxi Description",
            'SORT' => "500",
            'ACTIVE' => "Y",
            'CONFIG' => [
                ['CODE' => "SETTING_1", 'VALUE' => "SETTING_1 string value"],
                ['CODE' => "SETTING_2", 'VALUE' => "Y"],
                ['CODE' => "SETTING_3", 'VALUE' => 199.99],
                ['CODE' => "SETTING_4", 'VALUE' => "Option3Code"],
                ['CODE' => "SETTING_5", 'VALUE' => "10.04.2024"],
                ['CODE' => "SETTING_6", 'VALUE' => "0000144961"],
            ],
            'LOGOTYPE' => "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.delivery.add", b24.Params{
    	"REST_CODE":   "uber",
    	"NAME":        "Uber Taxi",
    	"CURRENCY":    "RUB",
    	"DESCRIPTION": "Uber Taxi Description",
    	"SORT":        "500",
    	"ACTIVE":      "Y",
    	"CONFIG": []b24.Params{
    		{
    			"CODE":  "SETTING_1",
    			"VALUE": "SETTING_1 string value",
    		},
    		{
    			"CODE":  "SETTING_2",
    			"VALUE": "Y",
    		},
    		{
    			"CODE":  "SETTING_3",
    			"VALUE": 199.99,
    		},
    		{
    			"CODE":  "SETTING_4",
    			"VALUE": "Option3Code",
    		},
    		{
    			"CODE":  "SETTING_5",
    			"VALUE": "10.04.2024",
    		},
    		{
    			"CODE":  "SETTING_6",
    			"VALUE": "0000144961",
    		},
    	},
    	"LOGOTYPE": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    })
    if err != nil {
    	return fmt.Errorf("sale.delivery.add: %w", err)
    }

    // Форма ответа показана ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
   "result":{
      "parent":{
         "NAME":"Uber Taxi",
         "ACTIVE":"Y",
         "DESCRIPTION":"Uber Taxi Description",
         "CURRENCY":"RUB",
         "ID":196,
         "PARENT_ID":null,
         "SORT":500,
         "LOGOTYPE":973
      },
      "profiles":[
         {
            "NAME":"Taxi",
            "ACTIVE":"Y",
            "DESCRIPTION":"Taxi Delivery",
            "CURRENCY":"RUB",
            "ID":197,
            "PARENT_ID":196,
            "SORT":500,
            "LOGOTYPE":null
         },
         {
            "NAME":"Cargo",
            "ACTIVE":"Y",
            "DESCRIPTION":"Cargo Delivery",
            "CURRENCY":"RUB",
            "ID":198,
            "PARENT_ID":196,
            "SORT":500,
            "LOGOTYPE":null
         }
      ]
   },
   "time":{
      "start":1713946187.579457,
      "finish":1713946187.925688,
      "duration":0.34623098373413086,
      "processing":0.06604909896850586,
      "date_start":"2024-04-24T11:09:47+03:00",
      "date_finish":"2024-04-24T11:09:47+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Созданная служба доставки и ее профили [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **parent**
[`object`](../../../data-types.md) | Созданная служба доставки [(подробное описание)](#delivery) ||
|| **profiles**
[`object[]`](../../../data-types.md) | Профили службы доставки, созданные по профилям обработчика. Структура элемента такая же, как у `parent` [(подробное описание)](#delivery).

Если у обработчика нет профилей, возвращается пустой массив ||
|#

#### Объект службы доставки {#delivery}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор службы доставки ||
|| **PARENT_ID**
[`integer`](../../../data-types.md) | Идентификатор родительской службы. У службы верхнего уровня — `null`, у профиля — идентификатор службы из `parent` ||
|| **NAME**
[`string`](../../../data-types.md) | Название ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Активность: `Y` — активна, `N` — неактивна ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание ||
|| **CURRENCY**
[`string`](../../../data-types.md) | Символьный код валюты ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **LOGOTYPE**
[`integer`](../../../data-types.md) | Идентификатор файла логотипа или `null`, если логотип не задан ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_HANDLER_NOT_FOUND",
    "error_description": "Handler \"nosuch\" not exists"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter REST_CODE is not defined | Не передан параметр `REST_CODE` или имя параметра передано не в верхнем регистре ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter NAME is not defined | Не передан параметр `NAME` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter CURRENCY is not defined | Не передан параметр `CURRENCY` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter CONFIG must be of array type | Параметр `CONFIG` передан не массивом ||
|| `400` | `ERROR_CHECK_FAILURE` | Config item CODE is not specified | В элементе `CONFIG` не передан `CODE` или передана пустая строка ||
|| `400` | `ERROR_CHECK_FAILURE` | Config item VALUE is not specified | В элементе `CONFIG` не передано `VALUE` или передана пустая строка ||
|| `400` | `ERROR_HANDLER_NOT_FOUND` | Handler "nosuch" not exists | Обработчик с кодом из `REST_CODE` не найден ||
|| `400` | `ERROR_DELIVERY_ADD` | Неправильное значение для "Активность" | В `ACTIVE` передано значение, отличное от `Y` и `N`. Код возвращается и при других ошибках сохранения службы, текст ошибки — в `error_description` ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет прав администратора CRM или обработчик создан другим приложением ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-update.md)
- [{#T}](./sale-delivery-get-list.md)
- [{#T}](./sale-delivery-delete.md)
- [{#T}](./sale-delivery-config-update.md)
- [{#T}](./sale-delivery-config-get.md)
- [{#T}](../../../../tutorials/sale/delivery-in-crm.md)
