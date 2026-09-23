# Изменить товарную позицию объекта CRM crm.item.productrow.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение объекта CRM, которому принадлежит товарная позиция

Метод `crm.item.productrow.update` изменяет товарную позицию объекта CRM.

Метод меняет одну позицию — чтобы заменить весь набор, используйте метод [crm.item.productrow.set](./crm-item-productrow-set.md). После изменения `price` или `quantity` CRM пересчитывает сумму объекта: например, сумма сделки вырастет, если поднять цену позиции.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`crm_item_product_row.id`](../../data-types.md#crm_item_product_row) | Идентификатор товарной позиции.
Получить его можно методом [crm.item.productrow.list](./crm-item-productrow-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект, содержащий значения полей для обновления товарной позиции объекта CRM [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

Передавайте только те поля, которые нужно изменить. Непереданные поля сохранят прежние значения, а зависимые CRM пересчитает сама: например, после изменения `price` метод пересчитает `priceExclusive`, `priceNetto` и `priceBrutto` с учетом скидки и налога позиции.

Поля `id`, `priceAccount`, `priceExclusive`, `priceNetto`, `priceBrutto`, `type`, `xmlId` и `storeId` для записи недоступны. Если рядом с недоступными полями передать хотя бы одно доступное, метод обновит позицию и проигнорирует недоступные значения. Если же ни одного доступного поля в `fields` нет, метод вернет ошибку `INVALID_ARG_VALUE`.

Исключение — пустой объект `fields`: его метод примет без ошибки, вернет `result: null` и позицию не изменит.

Поля `ownerId`, `ownerType`, `measureName` и `customized` метод принимает, но значения их не сохраняет. Сменить владельца позиции через обновление нельзя.

#|
|| **Название**
`тип` | **Описание** ||
|| **productId**
[`catalog_product.id`](../../../catalog/data-types.md#catalog_product) | Идентификатор товара из каталога ||
|| **productName**
[`string`](../../../data-types.md) | Название товара в товарной позиции.
Если сменить `productId` и не передать `productName`, метод подставит название нового товара из каталога ||
|| **price**
[`double`](../../../data-types.md) | Цена за единицу товарной позиции с учетом скидок и налогов. Указывается в валюте объекта CRM.
При смене `productId` цена из каталога не подставляется: чтобы изменить цену, передайте `price` ||
|| **quantity**
[`double`](../../../data-types.md) | Количество товара ||
|| **discountTypeId**
[`integer`](../../../data-types.md) | Тип скидки.
Возможные значения:
- `1` — абсолютное значение
- `2` — процентное значение ||
|| **discountRate**
[`double`](../../../data-types.md) | Значение скидки в процентах (если используется тип скидки с процентным значением) ||
|| **discountSum**
[`double`](../../../data-types.md) | Абсолютное значение скидки (если используется тип скидки с абсолютным значением) ||
|| **taxRate**
[`double`](../../../data-types.md) | Ставка налога в процентах ||
|| **taxIncluded**
[`string`](../../../data-types.md) | Индикатор того, включен ли налог в стоимость.
Возможные значения:
- `Y` — налог включен
- `N` — налог не включен ||
|| **taxName**
[`string`](../../../data-types.md) | Название налоговой ставки. Например, `НДС 20`.
Это только подпись: в расчете участвует значение `taxRate`, а `taxName` метод сохраняет как есть ||
|| **measureCode**
[`catalog_measure.code`](../../../catalog/data-types.md#catalog_measure) | Код единицы измерения.
При смене `productId` единица измерения из каталога не подставляется ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17648,"fields":{"productId":9621,"price":90000,"quantity":3,"discountTypeId":2,"discountRate":10,"taxRate":10,"taxIncluded":"Y","measureCode":796,"sort":20}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17648,"fields":{"productId":9621,"price":90000,"quantity":3,"discountTypeId":2,"discountRate":10,"taxRate":10,"taxIncluded":"Y","measureCode":796,"sort":20},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductRowUpdateResult = {
      productRow: {
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
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductRowUpdateResult>({
        method: 'crm.item.productrow.update',
        params: {
          id: 17648,
          fields: {
            productId: 9621,
            price: 90000,
            quantity: 3,
            discountTypeId: 2,
            discountRate: 10,
            taxRate: 10,
            taxIncluded: 'Y',
            measureCode: 796,
            sort: 20,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productRow.id, result.productRow.productName, result.productRow.price)
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
      async function updateProductRow() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.productrow.update',
            params: {
              id: 17648,
              fields: {
                productId: 9621,
                price: 90000,
                quantity: 3,
                discountTypeId: 2,
                discountRate: 10,
                taxRate: 10,
                taxIncluded: 'Y',
                measureCode: 796,
                sort: 20,
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
          console.info(result.productRow.id, result.productRow.productName, result.productRow.price)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateProductRow)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.productrow.update(
            bitrix_id=17648,
            fields={
                "productId": 9621,
                "price": 90000,
                "quantity": 3,
                "discountTypeId": 2,
                "discountRate": 10,
                "taxRate": 10,
                "taxIncluded": "Y",
                "measureCode": 796,
                "sort": 20,
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.productrow.update',
                [
                    'id' => 17648,
                    'fields' => [
                        'productId'      => 9621,
                        'price'          => 90000,
                        'quantity'       => 3,
                        'discountTypeId' => 2,
                        'discountRate'   => 10,
                        'taxRate'        => 10,
                        'taxIncluded'    => 'Y',
                        'measureCode'    => 796,
                        'sort'           => 20,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating product row: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.update', {
            id: 17648,
            fields: {
                productId: 9621,
                price: 90000,
                quantity: 3,
                discountTypeId: 2,
                discountRate: 10,
                taxRate: 10,
                taxIncluded: 'Y',
                measureCode: 796,
                sort: 20,
            },
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
        'crm.item.productrow.update',
        [
            'id' => 17648,
            'fields' => [
                'productId' => 9621,
                'price' => 90000,
                'quantity' => 3,
                'discountTypeId' => 2,
                'discountRate' => 10,
                'taxRate' => 10,
                'taxIncluded' => 'Y',
                'measureCode' => 796,
                'sort' => 20,
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
    res, err := client.Core().Call(ctx, "crm.item.productrow.update", b24.Params{
    	"id": 17648,
    	"fields": b24.Params{
    		"productId":      9621,
    		"price":          90000,
    		"quantity":       3,
    		"discountTypeId": 2,
    		"discountRate":   10,
    		"taxRate":        10,
    		"taxIncluded":    "Y",
    		"measureCode":    796,
    		"sort":           20,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.item.productrow.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "productRow".
    raw, ok := b24.Unwrap(res.Result, "productRow")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа productRow")
    }

    var item struct {
    	ID          b24.ID  `json:"id"`
    	OwnerID     b24.ID  `json:"ownerId"`
    	OwnerType   string  `json:"ownerType"`
    	ProductID   b24.ID  `json:"productId"`
    	ProductName string  `json:"productName"`
    	Price       float64 `json:"price"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.OwnerID)
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":{
      "productRow":{
         "id":17648,
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
         "sort":20,
         "xmlId":"sale_basket_8146",
         "type":4
      }
   },
   "time":{
      "start":1716890008.714214,
      "finish":1716890010.275307,
      "duration":1.5610928535461426,
      "processing":1.3967258930206299,
      "date_start":"2024-05-28T12:53:28+03:00",
      "date_finish":"2024-05-28T12:53:30+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result).
Если в `fields` передан пустой объект, метод вернет `null` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **productRow**
[`crm_item_product_row`](../../data-types.md#crm_item_product_row) | Объект с информацией об обновленной товарной позиции ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"NOT_FOUND",
   "error_description":"Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | Этот тип объектов CRM не поддерживает товарные позиции ||
|| `ACCESS_DENIED` | У пользователя нет права на изменение объекта CRM, которому принадлежит товарная позиция ||
|| `NOT_FOUND` | Товарная позиция не найдена ||
|| `INVALID_ARG_VALUE` | Все переданные в `fields` поля неизвестны или недоступны для обновления.
Эту же ошибку метод вернет, если товар с переданным `productId` не найден в каталоге ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-productrow-add.md)
- [{#T}](./crm-item-productrow-get.md)
- [{#T}](./crm-item-productrow-list.md)
- [{#T}](./crm-item-productrow-delete.md)
- [{#T}](./crm-item-productrow-set.md)
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-fields.md)
