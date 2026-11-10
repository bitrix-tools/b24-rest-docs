# Добавить позицию с товаром из каталога в корзину заказа sale.basketitem.addCatalogProduct

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.basketitem.addCatalogProduct` добавляет позицию с товаром или услугой из модуля catalog в корзину существующего заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания позиции корзины в заказе [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderId***
[`sale_order.id`](../data-types.md#sale_order) | Идентификатор заказа. Изменить его после создания позиции нельзя.

Получите идентификатор методом [sale.order.add](../order/sale-order-add.md) или [sale.order.list](../order/sale-order-list.md) ||
|| **productId***
[`catalog_product.id`](../../catalog/data-types.md#catalog_product) | Идентификатор товара, услуги или вариации из каталога. Изменить его после создания позиции нельзя.

Получите идентификатор методом [catalog.product.list](../../catalog/product/catalog-product-list.md) ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара. Передавайте значение больше `0`: при `0` метод создаст позицию без цены и названия. Можно передать дробное число, например `1.5` ||
|| **currency***
[`crm_currency.CURRENCY`](../../crm/data-types.md) | Валюта цены, например `RUB`. Должна совпадать с валютой заказа, иначе метод вернет ошибку `200140400011`. Изменить ее после создания позиции нельзя ||
|| **price**
[`double`](../../data-types.md) | Цена за единицу с учетом скидок и наценок.

Если параметр не передан, цену рассчитает Битрикс24 по данным каталога. Если параметр передан, у позиции будет `customPrice` = `Y`.

Если у товара в каталоге нет цены, передайте `price`, иначе метод вернет ошибку `200140400007` ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке позиций заказа. По умолчанию `100` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код позиции корзины. Если не передан, Битрикс24 создаст код сам, например `bx_662675fba6516` ||
|#

Название, единицу измерения, базовую цену `basePrice`, скидку `discountPrice`, вес и НДС метод берет из карточки товара в каталоге. Если передать их в `fields`, значения будут проигнорированы. Чтобы задать название и цену позиции вручную, используйте метод [sale.basketitem.add](./sale-basket-item-add.md).

Полный список полей с признаками обязательности и изменяемости возвращает метод [sale.basketitem.getFieldsCatalogProduct](./sale-basket-item-get-catalog-product-fields.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5147,"quantity":1,"productId":4347,"currency":"RUB"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.basketitem.addCatalogProduct
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5147,"quantity":1,"productId":4347,"currency":"RUB"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.addCatalogProduct
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AddCatalogProductResult = {
      basketItem: {
        barcodeMulti: string
        basePrice: number
        canBuy: string
        catalogXmlId: string
        currency: string
        customPrice: string
        dateInsert: ISODate | null
        dateUpdate: ISODate | null
        dimensions: string
        discountPrice: number
        id: number
        measureCode: string
        measureName: string
        name: string
        orderId: number
        price: number
        productId: number
        productXmlId: string
        properties: object[]
        quantity: number
        reservations: object[]
        sort: number
        type: number
        vatIncluded: string
        vatRate: number | null
        weight: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<AddCatalogProductResult>({
        method: 'sale.basketitem.addCatalogProduct',
        params: {
          fields: {
            orderId: 5147,
            quantity: 1,
            productId: 4347,
            currency: 'RUB',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.basketItem.id, result.basketItem.name, result.basketItem.price)
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
      async function addCatalogProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.basketitem.addCatalogProduct',
            params: {
              fields: {
                orderId: 5147,
                quantity: 1,
                productId: 4347,
                currency: 'RUB',
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
          console.info(result.basketItem.id, result.basketItem.name, result.basketItem.price)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCatalogProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "orderId": 5147,
        "quantity": 1,
        "productId": 4347,
        "currency": "RUB",
    }

    try:
        bitrix_response = client.sale.basketitem.add_catalog_product(
            fields=fields,
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
                'sale.basketitem.addCatalogProduct',
                [
                    'fields' => [
                        'orderId'   => 5147,
                        'quantity'  => 1,
                        'productId' => 4347,
                        'currency'  => 'RUB',
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
        echo 'Error adding catalog product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketitem.addCatalogProduct",
        {
            fields: {
                orderId: 5147,
                quantity: 1,
                productId: 4347,
                currency: 'RUB',
            }
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
        'sale.basketitem.addCatalogProduct',
        [
            'fields' => [
                'orderId' => 5147,
                'quantity' => 1,
                'productId' => 4347,
                'currency' => 'RUB',
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
    res, err := client.Core().Call(ctx, "sale.basketitem.addCatalogProduct", b24.Params{
    	"fields": b24.Params{
    		"orderId":   5147,
    		"quantity":  1,
    		"productId": 4347,
    		"currency":  "RUB",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.basketitem.addCatalogProduct: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "basketItem".
    raw, ok := b24.Unwrap(res.Result, "basketItem")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа basketItem")
    }

    var item struct {
    	BasePrice    float64 `json:"basePrice"`
    	CanBuy       string  `json:"canBuy"`
    	CatalogXmlID string  `json:"catalogXmlId"`
    	Currency     string  `json:"currency"`
    	CustomPrice  string  `json:"customPrice"`
    	DateInsert   string  `json:"dateInsert"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.BasePrice, item.CanBuy)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "basketItem": {
            "barcodeMulti": "N",
            "basePrice": 1234,
            "canBuy": "Y",
            "catalogXmlId": "FUTURE-ERP-CATALOG",
            "currency": "RUB",
            "customPrice": "N",
            "dateInsert": "2024-04-22T16:36:43+02:00",
            "dateUpdate": "2024-04-22T16:36:43+02:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";N;s:6:\"HEIGHT\";N;s:6:\"LENGTH\";N;}",
            "discountPrice": 124,
            "id": 6784,
            "measureCode": "796",
            "measureName": "шт",
            "name": "Услуга2",
            "orderId": 5147,
            "price": 1110,
            "productId": 4347,
            "productXmlId": "4347",
            "properties": [],
            "quantity": 1,
            "reservations": [],
            "sort": 100,
            "type": 2,
            "vatIncluded": "N",
            "vatRate": null,
            "weight": 0,
            "xmlId": "bx_662675fba6516"
        }
    },
    "total": 1,
    "time": {
        "start": 1713796602.830767,
        "finish": 1713796604.315251,
        "duration": 1.4844841957092285,
        "processing": 0.6749260425567627,
        "date_start": "2024-04-22T16:36:42+02:00",
        "date_finish": "2024-04-22T16:36:44+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **basketItem**
[`sale_basket_item`](../data-types.md#sale_basket_item) | Созданная позиция корзины. Ключевые поля:
- `id` — идентификатор позиции, его передают в методы [sale.basketitem.updateCatalogProduct](./sale-basket-item-update-catalog-product.md), [sale.basketitem.get](./sale-basket-item-get.md) и [sale.basketitem.delete](./sale-basket-item-delete.md)
- `name`, `measureCode`, `measureName`, `catalogXmlId`, `productXmlId` — данные из карточки товара в каталоге
- `price`, `basePrice`, `discountPrice` — цена за единицу, цена без скидок и размер скидки
- `customPrice` — `Y`, если цена задана вручную в `price`, `N`, если рассчитана по каталогу
- `type` — тип позиции: `2` для услуги, `null` для обычного товара, товара с вариациями и вариации

Описание всех полей — в типе [sale_basket_item](../data-types.md#sale_basket_item) ||
|| **total**
[`integer`](../../data-types.md) | Число обработанных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200140400011",
    "error_description": "Currency must be the currency of the order"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | `Could not find value for parameter {fields}`

Не передан параметр `fields`
||
|| `0` | `Required fields: productId`

Не переданы обязательные поля. В тексте ошибки перечислены все пропущенные поля из `orderId`, `productId`, `quantity` и `currency`, например `Required fields: orderId, currency, quantity`. С этим же кодом метод возвращает другие ошибки, например фатальные
||
|| `200140400006` | `Module catalog is not exists`

Не установлен модуль «Торговый каталог»
||
|| `200140400007` | `basket item is not saved - bad data`

Позиция не создана: товара с таким `productId` нет, он неактивен или у него нет цены в каталоге, а `price` не передан.

В заказе при этом может остаться пустая позиция без товара и цены. Найдите ее методом [sale.basketitem.list](./sale-basket-item-list.md) и удалите методом [sale.basketitem.delete](./sale-basket-item-delete.md)
||
|| `200140400009` | `Order not found`

Заказ с таким `orderId` не найден
||
|| `200140400011` | `Currency must be the currency of the order`

Валюта `currency` не совпадает с валютой заказа
||
|| `200040300010` | Недостаточно прав для добавления позиции
||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-basket-item-add.md)
- [{#T}](./sale-basket-item-update.md)
- [{#T}](./sale-basket-item-get.md)
- [{#T}](./sale-basket-item-list.md)
- [{#T}](./sale-basket-item-delete.md)
- [{#T}](./sale-basket-item-update-catalog-product.md)
- [{#T}](./sale-basket-item-get-fields.md)
- [{#T}](./sale-basket-item-get-catalog-product-fields.md)
