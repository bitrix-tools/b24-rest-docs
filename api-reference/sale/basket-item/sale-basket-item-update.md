# Изменить позицию корзины заказа sale.basketitem.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.basketitem.update` изменяет позицию корзины существующего заказа. После изменения количества или цены Битрикс24 пересчитывает сумму заказа.

Для позиции с товаром из каталога есть метод [sale.basketitem.updateCatalogProduct](./sale-basket-item-update-catalog-product.md): он берет название и валюту позиции из каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_basket_item.id`](../data-types.md#sale_basket_item) | Идентификатор позиции корзины. Получить идентификаторы позиций можно методом [sale.basketitem.list](./sale-basket-item-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Значения изменяемых полей [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара. Передавайте в каждом вызове, даже если количество не меняется, иначе метод вернет ошибку `Required fields: quantity`.

Нулевое, отрицательное или нечисловое значение метод игнорирует без ошибки ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке позиций корзины ||
|| **price**
[`double`](../../data-types.md) | Цена с учетом наценок и скидок. Если передать цену, Битрикс24 установит позиции `customPrice` = `Y` — цена считается указанной вручную и больше не берется из каталога ||
|| **basePrice**
[`double`](../../data-types.md) | Исходная цена без учета наценок и скидок. Передавайте вместе с `price` и `discountPrice` так, чтобы выполнялось условие `basePrice = price + discountPrice` ||
|| **discountPrice**
[`double`](../../data-types.md) | Величина итоговой скидки или наценки. Для наценки значение отрицательное ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код позиции корзины ||
|| **name**
[`string`](../../data-types.md) | Название товара ||
|| **weight**
[`double`](../../data-types.md) | Вес товара. Позиция из каталога получает значение поля `weight` товара без пересчета, поэтому передавайте вес в тех же единицах, что в каталоге ||
|| **dimensions**
[`string`](../../data-types.md) | Размеры товара — строка с PHP-сериализованным массивом с ключами `WIDTH`, `HEIGHT` и `LENGTH`, например `a:3:{s:5:"WIDTH";i:244;s:6:"HEIGHT";i:100;s:6:"LENGTH";i:31;}`. В таком виде размеры хранятся у позиций, добавленных из каталога.

Метод не проверяет формат и сохраняет любую строку как есть. Если передать объект вместо строки, сохранится значение `Array` ||
|| **measureCode**
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения товара ||
|| **measureName**
[`catalog_measure.symbol`](../../catalog/data-types.md#catalog_measure) | Название единицы измерения ||
|| **canBuy**
[`string`](../../data-types.md) | Флаг доступности товара. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **vatRate**
[`double`](../../data-types.md) | Ставка налога долей от единицы: `0.1` — это 10 %. Для ставки «Без НДС» передайте пустую строку, в ответе будет `null` ||
|| **vatIncluded**
[`string`](../../data-types.md) | Флаг того, включен ли НДС или налог в цену товара. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

Поля `orderId`, `productId`, `currency`, `customPrice`, `catalogXmlId` и `productXmlId` через `sale.basketitem.update` изменить нельзя. Метод игнорирует их без ошибки и возвращает прежние значения. Валюта позиции `currency` всегда совпадает с валютой заказа, ее задают при добавлении позиции.

Чтобы перенести товар в другой заказ или заменить товар, удалите позицию методом [sale.basketitem.delete](./sale-basket-item-delete.md) и добавьте новую методом [sale.basketitem.add](./sale-basket-item-add.md).

Неизвестные поля метод тоже пропускает без ошибки. Проверяйте результат по объекту `basketItem` в ответе.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6791,"fields":{"quantity":7,"price":10,"discountPrice":990}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.basketitem.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6791,"fields":{"quantity":7,"price":10,"discountPrice":990},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BasketItemUpdateResult = {
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
        properties: unknown[]
        quantity: number
        reservations: unknown[]
        sort: number
        type: string | null
        vatIncluded: string
        vatRate: number | null
        weight: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<BasketItemUpdateResult>({
        method: 'sale.basketitem.update',
        params: {
          id: 6791,
          fields: {
            quantity: 7,
            price: 10,
            discountPrice: 990,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.basketItem.id, result.basketItem.name, result.basketItem.quantity, result.basketItem.price)
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
      async function updateBasketItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.basketitem.update',
            params: {
              id: 6791,
              fields: {
                quantity: 7,
                price: 10,
                discountPrice: 990,
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
          console.info(result.basketItem.id, result.basketItem.name, result.basketItem.quantity, result.basketItem.price)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateBasketItem)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "quantity": 7,
        "price": 10,
        "discountPrice": 990,
    }

    try:
        bitrix_response = client.sale.basketitem.update(
            bitrix_id=6791,
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
                'sale.basketitem.update',
                [
                    'id' => 6791,
                    'fields' => [
                        'quantity'      => 7,
                        'price'         => 10,
                        'discountPrice' => 990,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating basket item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketitem.update",
        {
            id: 6791,
            fields: {
                quantity: 7,
                price: 10,
                discountPrice: 990,
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
                    console.log(result);
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
        'sale.basketitem.update',
        [
            'id' => 6791,
            'fields' =>
            [
                'quantity' => 7,
                'price' => 10,
                'discountPrice' => 990,
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
    res, err := client.Core().Call(ctx, "sale.basketitem.update", b24.Params{
    	"id": 6791,
    	"fields": b24.Params{
    		"quantity":      7,
    		"price":         10,
    		"discountPrice": 990,
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.basketitem.update: %w", err)
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
            "basePrice": 1000,
            "canBuy": "Y",
            "catalogXmlId": "",
            "currency": "RUB",
            "customPrice": "Y",
            "dateInsert": "2024-04-23T18:51:28+02:00",
            "dateUpdate": "2024-04-24T14:02:25+02:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";i:244;s:6:\"HEIGHT\";i:100;s:6:\"LENGTH\";i:31;}",
            "discountPrice": 990,
            "id": 6791,
            "measureCode": "768",
            "measureName": "шт",
            "name": "Пробный товар",
            "orderId": 5147,
            "price": 10,
            "productId": 0,
            "productXmlId": "ProductKey",
            "properties": [],
            "quantity": 7,
            "reservations": [],
            "sort": 400,
            "type": null,
            "vatIncluded": "Y",
            "vatRate": 0.1,
            "weight": 40,
            "xmlId": "BasketPositionId"
        }
    },
    "total": 1,
    "time": {
        "start": 1713960144.842687,
        "finish": 1713960146.089664,
        "duration": 1.2469770908355713,
        "processing": 0.5501749515533447,
        "date_start": "2024-04-24T14:02:24+02:00",
        "date_finish": "2024-04-24T14:02:26+02:00",
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
[`sale_basket_item`](../data-types.md#sale_basket_item) | Обновленная позиция корзины. Содержит все поля позиции, а не только измененные. Ключевые поля:
- `id`, `orderId`, `productId` — идентификаторы позиции, заказа и товара
- `name`, `quantity`, `currency` — название товара, количество и валюта позиции
- `price`, `basePrice`, `discountPrice` — цена за единицу, цена без скидок и размер скидки
- `customPrice` — `Y`, если цена задана вручную, `N`, если рассчитана по каталогу
- `weight`, `dimensions` — вес и размеры в том виде, в котором они сохранены
- `properties` — массив [свойств позиции](../data-types.md#sale_basket_item_property)
- `reservations` — массив [резервов позиции на складах](../data-types.md#sale_basket_item_reservation)

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
    "error": "0",
    "error_description": "Required fields: quantity"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | `Required fields: quantity`

В `fields` не передано обязательное поле `quantity`
||
|| `200140400001` | `basket item is not exists`

Позиции корзины с таким `id` нет
||
|| `200040300010` | Недостаточно прав для изменения
||
|| `100` | `Could not find value for parameter {fields}`

Не передан параметр `fields`
||
|| `100` | `Bitrix\Sale\BasketItem constructor must be is public`

Не передан параметр `id`
||
|| `0` | Другие ошибки (например, фатальные ошибки)
||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-basket-item-add.md)
- [{#T}](./sale-basket-item-get.md)
- [{#T}](./sale-basket-item-list.md)
- [{#T}](./sale-basket-item-delete.md)
- [{#T}](./sale-basket-item-add-catalog-product.md)
- [{#T}](./sale-basket-item-update-catalog-product.md)
- [{#T}](./sale-basket-item-get-fields.md)
- [{#T}](./sale-basket-item-get-catalog-product-fields.md)
