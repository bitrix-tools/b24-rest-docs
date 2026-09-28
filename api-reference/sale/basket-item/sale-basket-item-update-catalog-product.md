# Изменить позицию с товаром из каталога sale.basketitem.updateCatalogProduct

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.basketitem.updateCatalogProduct` изменяет позицию корзины с товаром из каталога в существующем заказе.

Метод меняет только поля `quantity`, `price`, `sort` и `xmlId`. Название, валюту и товар он берет из каталога, а значения этих полей в `fields` пропускает без ошибки. Чтобы изменить название позиции вручную, используйте метод [sale.basketitem.update](./sale-basket-item-update.md). Список изменяемых полей возвращает метод [sale.basketitem.getFieldsCatalogProduct](./sale-basket-item-get-catalog-product-fields.md): у них `isReadOnly` и `isImmutable` равны `false`.

После вызова поле `customPrice` позиции становится `Y`: цена фиксируется и больше не пересчитывается по каталогу, даже если `price` не передавали.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_basket_item.id`](../data-types.md#sale_basket_item) | Идентификатор позиции корзины. Получить его можно методами [sale.basketitem.addCatalogProduct](./sale-basket-item-add-catalog-product.md) и [sale.basketitem.list](./sale-basket-item-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с изменяемыми полями [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара, например `4` или `1.5`. Передавайте всегда, даже если меняете только другие поля: без него метод вернет ошибку `Required fields: quantity`.

Значение `0`, отрицательное число или строку метод пропускает без ошибки, количество остается прежним. Чтобы убрать позицию из заказа, используйте метод [sale.basketitem.delete](./sale-basket-item-delete.md) ||
|| **price**
[`double`](../../data-types.md) | Цена за единицу товара. Если не передать, остается текущая цена позиции ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке позиций заказа ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код позиции корзины ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6783,"fields":{"quantity":4}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.basketitem.updateCatalogProduct
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6783,"fields":{"quantity":4},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.updateCatalogProduct
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
        barcodeMulti: string,
        basePrice: number,
        canBuy: string,
        catalogXmlId: string,
        currency: string,
        customPrice: string,
        dateInsert: ISODate | null,
        dateUpdate: ISODate | null,
        dimensions: string,
        discountPrice: number,
        id: number,
        measureCode: string,
        measureName: string,
        name: string,
        orderId: number,
        price: number,
        productId: number,
        productXmlId: string,
        properties: Array<{ basketId: number, code: string, id: number, name: string, sort: number, value: string, xmlId: string }>,
        quantity: number,
        reservations: Array<{ basketId: number, dateReserve: ISODate, dateReserveEnd: ISODate, id: number, quantity: number, reservedBy: number | null, storeId: number }>,
        sort: number,
        type: number | null,
        vatIncluded: string,
        vatRate: number | null,
        weight: number,
        xmlId: string,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<BasketItemUpdateResult>({
        method: 'sale.basketitem.updateCatalogProduct',
        params: {
          id: 6783,
          fields: {
            quantity: 4,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.basketItem.id, result.basketItem.name, result.basketItem.quantity)
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
      async function updateCatalogProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.basketitem.updateCatalogProduct',
            params: {
              id: 6783,
              fields: {
                quantity: 4,
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
          console.info(result.basketItem.id, result.basketItem.name, result.basketItem.quantity)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCatalogProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "quantity": 4,
    }

    try:
        bitrix_response = client.sale.basketitem.update_catalog_product(
            bitrix_id=6783,
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
                'sale.basketitem.updateCatalogProduct',
                [
                    'id'     => 6783,
                    'fields' => [
                        'quantity' => 4,
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
        echo 'Error updating catalog product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketitem.updateCatalogProduct",
        {
            id: 6783,
            fields: {
                quantity: 4,
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
        'sale.basketitem.updateCatalogProduct',
        [
            'id' => 6783,
            'fields' => [
                'quantity' => 4,
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
    res, err := client.Core().Call(ctx, "sale.basketitem.updateCatalogProduct", b24.Params{
    	"id": 6783,
    	"fields": b24.Params{
    		"quantity": 4,
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.basketitem.updateCatalogProduct: %w", err)
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
            "basePrice": 100,
            "canBuy": "Y",
            "catalogXmlId": "FUTURE-1C-CATALOG",
            "currency": "RUB",
            "customPrice": "Y",
            "dateInsert": "2026-09-28T07:46:42+03:00",
            "dateUpdate": "2026-09-28T07:46:49+03:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";N;s:6:\"HEIGHT\";N;s:6:\"LENGTH\";N;}",
            "discountPrice": 0,
            "id": 6783,
            "measureCode": "796",
            "measureName": "шт",
            "name": "Головной товар",
            "orderId": 5147,
            "price": 100,
            "productId": 6967,
            "productXmlId": "6967",
            "properties": [],
            "quantity": 4,
            "reservations": [
                {
                    "basketId": 6783,
                    "dateReserve": "2026-09-28T07:46:42+03:00",
                    "dateReserveEnd": "2026-10-01T21:00:00+03:00",
                    "id": 329,
                    "quantity": 1,
                    "reservedBy": null,
                    "storeId": 1
                }
            ],
            "sort": 100,
            "type": null,
            "vatIncluded": "N",
            "vatRate": 0,
            "weight": 0,
            "xmlId": "bx_6ab9ff420a704"
        }
    },
    "total": 1,
    "time": {
        "start": 1790574409,
        "finish": 1790574410.105003,
        "duration": 1.1050031185150146,
        "processing": 1,
        "date_start": "2026-09-28T08:46:49+03:00",
        "date_finish": "2026-09-28T08:46:50+03:00",
        "operating_reset_at": 1790575009,
        "operating": 0.23203706741333008
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
[`sale_basket_item`](../data-types.md#sale_basket_item) | Объект с данными измененной позиции корзины. Основные поля:
- `id` — идентификатор позиции
- `orderId` — идентификатор заказа
- `productId` — идентификатор товара в каталоге
- `name` — название товара из каталога
- `quantity` — количество
- `price` — цена за единицу с учетом скидок и наценок, `basePrice` — цена без них
- `customPrice` — `Y`, если цена зафиксирована вручную
- `currency` — валюта цены
- `properties` — свойства позиции, массив объектов [sale_basket_item_property](../data-types.md#sale_basket_item_property)
- `reservations` — резервы позиции на складах, массив объектов [sale_basket_item_reservation](../data-types.md#sale_basket_item_reservation)

Полный список полей с типами — в описании типа [sale_basket_item](../data-types.md#sale_basket_item) ||
|| **total**
[`integer`](../../data-types.md) | Число обработанных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200140400001",
    "error_description": "basket item is not exists"
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
|| `100` | `Could not find value for parameter {fields}`

Не передан параметр `fields`
||
|| `100` | `Bitrix\Sale\BasketItem constructor must be is public`

Не передан параметр `id`
||
|| `200140400006` | `Module catalog is not exists`

Не установлен модуль Торговый каталог
||
|| `200140400009` | `Order not found`

Заказ позиции не найден
||
|| `200040300010` | Недостаточно прав для изменения
||
|| `0` | Другие ошибки (например, фатальные ошибки)
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
- [{#T}](./sale-basket-item-add-catalog-product.md)
- [{#T}](./sale-basket-item-get-fields.md)
- [{#T}](./sale-basket-item-get-catalog-product-fields.md)
