# Добавить произвольную позицию в корзину заказа sale.basketitem.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.basketitem.add` добавляет позицию в корзину существующего заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей позиции корзины [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

Значения полей, отмеченных **, будут взяты из данных о товаре в каталоге, если в поле `productId` передан реальный идентификатор товара. Переданные значения этих полей для товара из каталога не сохраняются. Для произвольной позиции заполните эти поля самостоятельно. {.b24-info}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderId***
[`sale_order.id`](../data-types.md#sale_order) | Идентификатор заказа ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке позиций заказа. По умолчанию `100` ||
|| **productId***
[`catalog_product.id`](../../catalog/data-types.md#catalog_product) | Идентификатор товара или вариации из каталога.

Для произвольной позиции, которой нет в каталоге, передайте `0`. Для товара из каталога удобнее метод [sale.basketitem.addCatalogProduct](./sale-basket-item-add-catalog-product.md)
 ||
|| **price**
[`double`](../../data-types.md) | Цена за единицу с учетом наценок и скидок.

Если передать `price`, цена сохранится как указанная вручную: в ответе будет `customPrice` = `Y`, а пересчета из каталога не будет. Если не передать, для товара из каталога цена берется из каталога, для произвольной позиции — `0`
 ||
|| **basePrice**
[`double`](../../data-types.md) | Исходная цена без учета наценок и скидок. Для товара из каталога по умолчанию берется из каталога. У произвольной позиции без `basePrice` поле равно `0`, даже если передан `price` ||
|| **discountPrice**
[`double`](../../data-types.md) | Величина итоговой скидки или наценки. Если передаете `price`, `basePrice` и `discountPrice` сами, соблюдайте условие `basePrice = price + discountPrice` ||
|| **currency***
[`crm_currency.CURRENCY`](../../crm/data-types.md) | Валюта цены. Должна совпадать с валютой заказа, иначе метод вернет ошибку `200140400011`. Валюту заказа возвращает метод [sale.order.get](../order/sale-order-get.md) ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код позиции корзины. Если не передать, Битрикс24 создаст код вида `bx_6ab9ff3cc2d0a` ||
|| **name****
[`string`](../../data-types.md) | Название товара. Для произвольной позиции передайте его явно: без `name` позиция создастся без названия ||
|| **weight****
[`double`](../../data-types.md) | Вес товара. Сохраняется в том виде, в котором передан ||
|| **dimensions****
[`string`](../../data-types.md) | Размеры товара — строка с сериализованным PHP-массивом с ключами `WIDTH`, `HEIGHT`, `LENGTH`, например `a:3:{s:5:"WIDTH";i:100;s:6:"HEIGHT";i:200;s:6:"LENGTH";i:300;}`. Если передать объект, вместо размеров сохранится строка `Array` ||
|| **measureCode****
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения товара ||
|| **measureName****
[`catalog_measure.symbol`](../../catalog/data-types.md#catalog_measure) | Название единицы измерения ||
|| **canBuy****
[`string`](../../data-types.md) | Флаг доступности товара. Возможные значения:
- `Y` — да
- `N` — нет

У произвольной позиции по умолчанию `Y` ||
|| **vatRate****
[`double`](../../data-types.md) | Ставка налога долей от единицы: `0.1` — это 10 %. Для ставки «Без НДС» передайте пустую строку ||
|| **vatIncluded****
[`string`](../../data-types.md) | Флаг того, включен ли НДС или налог в цену товара. Возможные значения:
- `Y` — да
- `N` — нет

У произвольной позиции по умолчанию `Y` ||
|| **catalogXmlId****
[`string`](../../data-types.md) | Внешний код каталога товаров ||
|| **productXmlId****
[`string`](../../data-types.md) | Внешний код товара ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":923,"productId":0,"name":"Доставка крупногабаритного груза","price":1500,"currency":"RUB","quantity":1,"measureCode":"796","measureName":"шт"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.basketitem.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":923,"productId":0,"name":"Доставка крупногабаритного груза","price":1500,"currency":"RUB","quantity":1,"measureCode":"796","measureName":"шт"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BasketItemAddResult = {
      basketItem: {
        id: number
        orderId: number
        productId: number
        name: string
        sort: number
        quantity: number
        price?: number
        basePrice: number
        discountPrice?: number
        currency: string
        customPrice: string
        vatRate: number | null
        vatIncluded?: string
        weight?: number
        dimensions?: string
        measureCode?: string
        measureName?: string
        canBuy: string
        xmlId: string
        catalogXmlId?: string
        productXmlId?: string
        dateInsert: ISODate | null
        dateUpdate: ISODate | null
        properties: unknown[]
        reservations: unknown[]
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<BasketItemAddResult>({
        method: 'sale.basketitem.add',
        params: {
          fields: {
            orderId: 923,
            productId: 0,
            name: 'Доставка крупногабаритного груза',
            price: 1500,
            currency: 'RUB',
            quantity: 1,
            measureCode: '796',
            measureName: 'шт',
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
      async function addBasketItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.basketitem.add',
            params: {
              fields: {
                orderId: 923,
                productId: 0,
                name: 'Доставка крупногабаритного груза',
                price: 1500,
                currency: 'RUB',
                quantity: 1,
                measureCode: '796',
                measureName: 'шт',
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

      document.addEventListener('DOMContentLoaded', addBasketItem)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "orderId": 923,
        "productId": 0,
        "name": "Доставка крупногабаритного груза",
        "price": 1500,
        "currency": "RUB",
        "quantity": 1,
        "measureCode": "796",
        "measureName": "шт",
    }

    try:
        bitrix_response = client.sale.basketitem.add(
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
                'sale.basketitem.add',
                [
                    'fields' => [
                        'orderId'     => 923,
                        'productId'   => 0,
                        'name'        => 'Доставка крупногабаритного груза',
                        'price'       => 1500,
                        'currency'    => 'RUB',
                        'quantity'    => 1,
                        'measureCode' => '796',
                        'measureName' => 'шт',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding basket item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketitem.add",
        {
            fields: {
                orderId: 923,
                productId: 0,
                name: 'Доставка крупногабаритного груза',
                price: 1500,
                currency: 'RUB',
                quantity: 1,
                measureCode: '796',
                measureName: 'шт',
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
        'sale.basketitem.add',
        [
            'fields' =>
            [
                'orderId' => 923,
                'productId' => 0,
                'name' => 'Доставка крупногабаритного груза',
                'price' => 1500,
                'currency' => 'RUB',
                'quantity' => 1,
                'measureCode' => '796',
                'measureName' => 'шт',
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
    res, err := client.Core().Call(ctx, "sale.basketitem.add", b24.Params{
    	"fields": b24.Params{
    		"orderId":     923,
    		"productId":   0,
    		"name":        "Доставка крупногабаритного груза",
    		"price":       1500,
    		"currency":    "RUB",
    		"quantity":    1,
    		"measureCode": "796",
    		"measureName": "шт",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.basketitem.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "basketItem".
    raw, ok := b24.Unwrap(res.Result, "basketItem")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа basketItem")
    }

    var item struct {
    	ID          int     `json:"id"`
    	OrderID     int     `json:"orderId"`
    	ProductID   int     `json:"productId"`
    	Name        string  `json:"name"`
    	Price       float64 `json:"price"`
    	Currency    string  `json:"currency"`
    	Quantity    float64 `json:"quantity"`
    	MeasureCode string  `json:"measureCode"`
    	MeasureName string  `json:"measureName"`
    	CustomPrice string  `json:"customPrice"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name, item.Price)
    ```

{% endlist %}

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../../tutorials/sale/add-basket-item-to-order.md)

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "basketItem": {
            "basePrice": 0,
            "canBuy": "Y",
            "currency": "RUB",
            "customPrice": "Y",
            "dateInsert": "2026-09-28T08:49:12+03:00",
            "dateUpdate": "2026-09-28T08:49:12+03:00",
            "id": 1313,
            "measureCode": "796",
            "measureName": "шт",
            "name": "Доставка крупногабаритного груза",
            "orderId": 923,
            "price": 1500,
            "productId": 0,
            "properties": [],
            "quantity": 1,
            "reservations": [],
            "sort": 100,
            "vatRate": null,
            "xmlId": "bx_6aba0de846c91"
        }
    },
    "total": 1,
    "time": {
        "start": 1790578152,
        "finish": 1790578153.972347,
        "duration": 1.9723470211029053,
        "processing": 1,
        "date_start": "2026-09-28T09:49:12+03:00",
        "date_finish": "2026-09-28T09:49:13+03:00",
        "operating_reset_at": 1790578752,
        "operating": 1.7863950729370117
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
[`sale_basket_item`](../data-types.md#sale_basket_item) | Объект с данными созданной позиции корзины. Основные поля:
- `id` — идентификатор позиции, его передают в [sale.basketitem.update](./sale-basket-item-update.md), [sale.basketitem.get](./sale-basket-item-get.md) и [sale.basketitem.delete](./sale-basket-item-delete.md)
- `orderId`, `productId`, `name`, `quantity`, `currency` — данные позиции
- `price`, `basePrice`, `discountPrice` — цена за единицу, исходная цена и скидка
- `customPrice` — `Y`, если цена задана вручную, `N` — если взята из каталога
- `xmlId` — внешний код позиции
- `properties` — свойства позиции, массив [sale_basket_item_property](../data-types.md#sale_basket_item_property)
- `reservations` — резервы позиции, массив [sale_basket_item_reservation](../data-types.md#sale_basket_item_reservation)

В ответе `add` для произвольной позиции нет полей, которые не переданы в запросе: в примере выше это `discountPrice`, `weight`, `dimensions`, `vatIncluded`, `catalogXmlId`, `productXmlId`, `type`, `barcodeMulti`. Их значения возвращает [sale.basketitem.get](./sale-basket-item-get.md). Полный список полей — в описании типа [sale_basket_item](../data-types.md#sale_basket_item) ||
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
|| `200140400007` | `basket item is not saved - bad data`

Позиция не создана. Ошибка возникает, если передан несуществующий идентификатор товара или товар неактивен
||
|| `200140400009` | `Order not found`

Заказ с переданным `orderId` не найден
||
|| `200140400011` | `Currency must be the currency of the order`

Валюта позиции не совпадает с валютой заказа
||
|| `200040300010` | Недостаточно прав для добавления
||
|| `100` | `Could not find value for parameter {fields}`

Не передан параметр `fields`
||
|| `0` | `Required fields: orderId`

В `fields` не передано обязательное поле. Вместо `orderId` в тексте будет имя пропущенного поля: `productId`, `quantity` или `currency`
||
|| `0` | Другие ошибки (например, фатальные ошибки)
||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-basket-item-update.md)
- [{#T}](./sale-basket-item-get.md)
- [{#T}](./sale-basket-item-list.md)
- [{#T}](./sale-basket-item-delete.md)
- [{#T}](./sale-basket-item-add-catalog-product.md)
- [{#T}](./sale-basket-item-update-catalog-product.md)
- [{#T}](./sale-basket-item-get-fields.md)
- [{#T}](./sale-basket-item-get-catalog-product-fields.md)
