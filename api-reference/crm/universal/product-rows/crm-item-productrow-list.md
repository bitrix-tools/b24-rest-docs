# Получить товарные позиции объекта CRM crm.item.productrow.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение объекта CRM, товарные позиции которого выбираются

Метод `crm.item.productrow.list` получает товарные позиции объекта CRM.

Если нужна одна позиция с известным идентификатором, используйте метод [crm.item.productrow.get](./crm-item-productrow-get.md). Если нужны только позиции без выставленной оплаты — метод [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации выбранных записей в формате `{"field_1": "value_1", ... "field_N": "value_N"}` [(подробное описание)](#filter) ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных товарных позиций в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Сортировать можно по полям `id` и `sort`. Остальные поля метод игнорирует.

Без параметра `order` метод возвращает позиции в порядке возрастания значения `sort`.

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`, третью — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Передайте `-1`, чтобы не считать общее количество записей: метод не вернет `total` и отработает быстрее.

По умолчанию — `0`
 ||
|#

Метод не поддерживает параметр `select` и всегда возвращает полный набор полей товарной позиции.

### Параметр filter {#filter}

Ключи `=ownerType` и `=ownerId` обязательны — без них метод вернет ошибку `REQUIRED_ARG_MISSING`.

#|
|| **Название**
`тип` | **Описание** ||
|| **=ownerType***
[`string`](../../../data-types.md) | Краткий символьный код [типа объекта CRM](../../data-types.md#object_type): `L` — лид, `D` — сделка, `Q` — предложение, `SI` — новый счет, `T` и шестнадцатеричный идентификатор типа — смарт-процесс ||
|| **=ownerId***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM ||
|| **id**
[`crm_item_product_row.id`](../../data-types.md#crm_item_product_row) | Идентификатор товарной позиции ||
|| **productId**
[`catalog_product.id`](../../../catalog/data-types.md#catalog_product) | Идентификатор товара из каталога ||
|#

Фильтровать можно только по полям из таблицы: у остальных полей товарной позиции нет индекса в базе. Условия по `price`, `productName`, `quantity`, `sort`, `type` и по неизвестным полям метод молча игнорирует и возвращает все позиции объекта CRM — проверяйте состав выборки на своей стороне.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `=` — равно
- `!=` — не равно
- `>` — больше
- `>=` — больше либо равно
- `<` — меньше
- `<=` — меньше либо равно
- `@` — любое из значений массива

Префиксы применимы к ключам `id` и `productId`. Ключи `=ownerType` и `=ownerId` передавайте только с префиксом `=`.

Единственный ключ, который принимает массив значений, — `@id`. Например, `{"@id": [17640, 17641]}` вернет две позиции. В остальных ключах массив метод игнорирует так же, как неподдерживаемое условие.

Ключи фильтра пишите в camelCase: `=ownerType`, а не `=OWNER_TYPE`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"=ownerType":"D","=ownerId":13142,">id":17640},"order":{"sort":"asc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"=ownerType":"D","=ownerId":13142,">id":17640},"order":{"sort":"asc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductRowListResult = {
      productRows: {
        id: number
        ownerId: number
        ownerType: string
        productId: number
        productName: string
        price: number
        priceAccount: number
        priceExclusive: number
        priceNetto: number
        priceBrutto: number
        quantity: number
        discountTypeId: number
        discountRate: number
        discountSum: number
        taxRate: number | null
        taxIncluded: string
        taxName: string
        customized: string
        measureCode: number
        measureName: string
        sort: number
        xmlId: string
        type: number
        storeId: number | null
      }[]
    }

    try {
      // crm.item.productrow.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ProductRowListResult>({
        method: 'crm.item.productrow.list',
        params: {
          filter: {
            '=ownerType': 'D',
            '=ownerId': 13142,
            '>id': 17640,
          },
          order: {
            sort: 'asc',
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
        console.info(result.productRows.length, result.productRows)
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
      async function listProductRows() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.item.productrow.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.productrow.list',
            params: {
              filter: {
                '=ownerType': 'D',
                '=ownerId': 13142,
                '>id': 17640,
              },
              order: {
                sort: 'asc',
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
          console.info(result.productRows.length, result.productRows)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listProductRows)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.productrow.list(
            filter={
                "=ownerType": "D",
                "=ownerId": 13142,
                ">id": 17640,
            },
            order={
                "sort": "asc",
            },
            start=0,
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
        bitrix_response = client.crm.item.productrow.list(
            filter={
                "=ownerType": "D",
                "=ownerId": 13142,
                ">id": 17640,
            },
            order={
                "sort": "asc",
            },
            start=0,
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

    Пример `as_list_fast`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # as_list_fast задает порядок и постраничную навигацию сам,
        # поэтому order и start в таком вызове передавать не нужно
        bitrix_response = client.crm.item.productrow.list(
            filter={
                "=ownerType": "D",
                "=ownerId": 13142,
            },
        ).as_list_fast(descending=True).response
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
                'crm.item.productrow.list',
                [
                    'filter' => [
                        "=ownerType" => 'D',
                        "=ownerId"   => 13142,
                        ">id"        => 17640,
                    ],
                    'order'  => [
                        'sort' => "asc"
                    ],
                    'start'  => 0,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.list', {
            filter: {
                "=ownerType": 'D',
                "=ownerId": 13142,
                ">id": 17640,
            },
            order: {
                sort: "asc"
            },
            start: 0,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.productrow.list',
        [
            'filter' => [
                "=ownerType" => 'D',
                "=ownerId" => 13142,
                ">id" => 17640,
            ],
            'order' => [
                'sort' => "asc"
            ],
            'start' => 0
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.item.productrow.list", b24.Params{
    	"filter": b24.Params{
    		"=ownerType": "D",
    		"=ownerId":   13142,
    		">id":        17640,
    	},
    	"order": b24.Params{
    		"sort": "asc",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.item.productrow.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "productRows".
    raw, ok := b24.Unwrap(res.Result, "productRows")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа productRows")
    }

    var items []struct {
    	ID          b24.ID  `json:"id"`
    	OwnerID     b24.ID  `json:"ownerId"`
    	OwnerType   string  `json:"ownerType"`
    	ProductID   b24.ID  `json:"productId"`
    	ProductName string  `json:"productName"`
    	Price       float64 `json:"price"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID)
    }
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":{
      "productRows":[
         {
            "id":17649,
            "ownerId":13142,
            "ownerType":"D",
            "productId":9621,
            "productName":"iphone 14",
            "price":90000,
            "priceAccount":90000,
            "priceExclusive":81818.18181818,
            "priceNetto":90909.09090909,
            "priceBrutto":100000,
            "quantity":3,
            "discountTypeId":2,
            "discountRate":10,
            "discountSum":9090.90909091,
            "taxRate":10,
            "taxIncluded":"Y",
            "taxName":"НДС 10",
            "customized":"Y",
            "measureCode":796,
            "measureName":"шт",
            "sort":10,
            "xmlId":"sale_basket_8147",
            "type":4,
            "storeId":19
         },
         {
            "id":17650,
            "ownerId":13142,
            "ownerType":"D",
            "productId":9623,
            "productName":"iphone 10xs",
            "price":5550,
            "priceAccount":5550,
            "priceExclusive":5550,
            "priceNetto":5550,
            "priceBrutto":5550,
            "quantity":1,
            "discountTypeId":2,
            "discountRate":0,
            "discountSum":0,
            "taxRate":null,
            "taxIncluded":"Y",
            "taxName":"Без НДС",
            "customized":"Y",
            "measureCode":6,
            "measureName":"м",
            "sort":20,
            "xmlId":"sale_basket_8148",
            "type":4,
            "storeId":17
         }
      ]
   },
   "total":2,
   "time":{
      "start":1716905609.186602,
      "finish":1716905609.434087,
      "duration":0.24748492240905762,
      "processing":0.06894516944885254,
      "date_start":"2024-05-28T17:13:29+03:00",
      "date_finish":"2024-05-28T17:13:29+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **next**
[`integer`](../../../data-types.md) | Значение для параметра `start` следующей страницы. Возвращается, только если выбраны не все записи ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей. Не возвращается, если передан `start: -1` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **productRows**
[`crm_item_product_row[]`](../../data-types.md#crm_item_product_row) | Массив объектов с информацией о выбранных товарных позициях объекта CRM ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"ACCESS_DENIED",
   "error_description":"Доступ запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `REQUIRED_ARG_MISSING` | В фильтре нет обязательного ключа `=ownerType` или `=ownerId` ||
|| `ACCESS_DENIED` | Доступ запрещен. Эту же ошибку метод вернет, если объекта CRM с переданным `=ownerId` не существует или его тип не поддерживает товарные позиции ||
|| `INVALID_ARG_VALUE` | Некорректные значения входящих параметров. Например, массив в значении ключа фильтра с префиксом сравнения ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-productrow-add.md)
- [{#T}](./crm-item-productrow-update.md)
- [{#T}](./crm-item-productrow-get.md)
- [{#T}](./crm-item-productrow-delete.md)
- [{#T}](./crm-item-productrow-set.md)
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-fields.md)
