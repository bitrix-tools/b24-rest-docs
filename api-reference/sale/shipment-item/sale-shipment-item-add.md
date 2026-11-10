# Добавить элемент в табличную часть отгрузки sale.shipmentitem.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.shipmentitem.add` добавляет товар из позиции корзины в отгрузку. Позиция корзины и отгрузка должны принадлежать одному заказу. Правила распределения количества между отгрузками — в [обзоре раздела](./index.md#quantity).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания элемента табличной части отгрузки [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderDeliveryId***
[`sale_order_shipment.id`](../data-types.md#sale_order_shipment) | Идентификатор отгрузки.

Можно получить методом [sale.shipment.list](../shipment/sale-shipment-list.md) ||
|| **basketId***
[`sale_basket_item.id`](../data-types.md#sale_basket_item) | Идентификатор позиции корзины.

Можно получить методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md) ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара в отгрузке. Должно быть больше `0`.

Сумма количества по всем отгрузкам заказа не может превышать количество в позиции корзины ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор. Если не передан, Битрикс24 генерирует значение вида `bx_6abcd8337a3d4`.

Можно использовать для синхронизации элемента табличной части отгрузки с аналогичной позицией во внешней системе ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderDeliveryId":33,"basketId":18,"quantity":1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentitem.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderDeliveryId":33,"basketId":18,"quantity":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentitem.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentItemAddResult = {
      shipmentItem: {
        basketId: number
        dateInsert: ISODate | null
        id: number
        orderDeliveryId: number
        quantity: number
        reservedQuantity: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ShipmentItemAddResult>({
        method: 'sale.shipmentitem.add',
        params: {
          fields: {
            orderDeliveryId: 33,
            basketId: 18,
            quantity: 1,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.shipmentItem.id, result.shipmentItem.basketId, result.shipmentItem.quantity)
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
      async function addShipmentItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipmentitem.add',
            params: {
              fields: {
                orderDeliveryId: 33,
                basketId: 18,
                quantity: 1,
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
          console.info(result.shipmentItem.id, result.shipmentItem.basketId, result.shipmentItem.quantity)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addShipmentItem)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "orderDeliveryId": 33,
        "basketId": 18,
        "quantity": 1,
    }

    try:
        bitrix_response = client.sale.shipmentitem.add(
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
                'sale.shipmentitem.add',
                [
                    'fields' => [
                        'orderDeliveryId' => 33,
                        'basketId'        => 18,
                        'quantity'        => 1,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding shipment item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.shipmentitem.add',
        {
            fields: {
                orderDeliveryId: 33,
                basketId: 18,
                quantity: 1
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.shipmentitem.add',
        [
            'fields' => [
                'orderDeliveryId' => 33,
                'basketId' => 18,
                'quantity' => 1
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
    res, err := client.Core().Call(ctx, "sale.shipmentitem.add", b24.Params{
    	"fields": b24.Params{
    		"orderDeliveryId": 33,
    		"basketId":        18,
    		"quantity":        1,
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.shipmentitem.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "shipmentItem".
    raw, ok := b24.Unwrap(res.Result, "shipmentItem")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа shipmentItem")
    }

    var item struct {
    	BasketID         b24.ID `json:"basketId"`
    	DateInsert       string `json:"dateInsert"`
    	ID               b24.ID `json:"id"`
    	OrderDeliveryID  b24.ID `json:"orderDeliveryId"`
    	Quantity         float64 `json:"quantity"`
    	ReservedQuantity float64 `json:"reservedQuantity"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.BasketID, item.DateInsert)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":{
        "shipmentItem":{
            "basketId":18,
            "dateInsert":"2024-04-11T10:10:35+03:00",
            "id":7,
            "orderDeliveryId":33,
            "quantity":1,
            "reservedQuantity":0,
            "xmlId":"bx_6617a2e1b3c5d"
        }
    },
    "time":{
        "start":1712819431.708122,
        "finish":1712819435.985352,
        "duration":4.2772300243377686,
        "processing":4.085968971252441,
        "date_start":"2024-04-11T10:10:31+03:00",
        "date_finish":"2024-04-11T10:10:35+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **shipmentItem**
[`sale_order_shipment_item`](../data-types.md#sale_order_shipment_item) | Добавленный элемент табличной части отгрузки ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"201250000001",
    "error_description":"Duplicate entry for key [basketId, orderDeliveryId]"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201250000001` | `Duplicate entry for key [basketId, orderDeliveryId]`

Элемент с указанными значениями полей `basketId` и `orderDeliveryId` уже существует.

Чтобы изменить количество товара, используйте метод [sale.shipmentitem.update](./sale-shipment-item-update.md) ||
|| `201240400002` | `shipment not exists`

Отгрузка не найдена или относится к другому заказу, чем позиция корзины. Проверьте `orderDeliveryId` ||
|| `201240400003` | `shipment not exists`

Позиция корзины не найдена. Некорректное значение `basketId` ||
|| `SALE_SHIPMENT_ITEM_LESS_AVAILABLE_QUANTITY` | `В корзине недостаточное количество свободного товара "<название>" для добавления в отгрузку. Возможно, вы уже добавили часть товара по этому заказу в другие отгрузки`

В корзине недостаточно свободного товара: количество превышает остаток, не распределенный по другим отгрузкам ||
|| `SALE_SHIPMENT_ITEM_ERR_QUANTITY_EMPTY` | `Количество <название> не может быть меньше или равны 0`

Передано `quantity` = `0` ||
|| `BARCODE_MORE_ITEM_QUANTITY` | `Штрих-кодов больше чем количества товара`

Передано отрицательное значение `quantity` ||
|| `200040300020` | `Access Denied`

Недостаточно прав для добавления элемента в табличную часть отгрузки ||
|| `100` | `Could not find value for parameter {fields}`

Не указан параметр `fields` ||
|| `0` | `Required fields: ...`

В `fields` не переданы обязательные поля ||
|| `0` | `Call to a member function setFields() on null`

Отгрузка уже отгружена (`deducted` = `Y`), добавить в нее товар нельзя ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-item-update.md)
- [{#T}](./sale-shipment-item-get.md)
- [{#T}](./sale-shipment-item-list.md)
- [{#T}](./sale-shipment-item-delete.md)
- [{#T}](./sale-shipment-item-get-fields.md)