# Изменить элемент в табличной части отгрузки sale.shipmentitem.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.shipmentitem.update` изменяет количество товара и внешний идентификатор элемента табличной части отгрузки.

Позицию корзины и отгрузку у элемента изменить нельзя: переданные `basketId` и `orderDeliveryId` метод игнорирует без ошибки. Чтобы перенести товар в другую отгрузку, удалите элемент методом [sale.shipmentitem.delete](./sale-shipment-item-delete.md) и добавьте новый методом [sale.shipmentitem.add](./sale-shipment-item-add.md).

Элементы системной отгрузки изменить нельзя. В отгрузке с `deducted` = `Y` можно изменить только `xmlId`, а в `quantity` нужно передать текущее значение. Правила распределения количества между отгрузками — в [обзоре раздела](./index.md#quantity).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment_item.id`](../data-types.md#sale_order_shipment_item) | Идентификатор элемента табличной части отгрузки.

Можно получить методом [sale.shipmentitem.list](./sale-shipment-item-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления элемента табличной части отгрузки [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **quantity***
[`double`](../../data-types.md) | Количество товара в отгрузке. Должно быть больше `0`.

Сумма количества по всем отгрузкам заказа не может превышать количество в позиции корзины ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор. Если поле не передано, прежнее значение сохраняется.

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
    -d '{"id":7,"fields":{"quantity":5,"xmlId":"myNewXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentitem.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7,"fields":{"quantity":5,"xmlId":"myNewXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentitem.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentItemUpdateResult = {
      shipmentItem: {
        basketId: number
        dateInsert: ISODate
        id: number
        orderDeliveryId: number
        quantity: number
        reservedQuantity: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ShipmentItemUpdateResult>({
        method: 'sale.shipmentitem.update',
        params: {
          id: 7,
          fields: {
            quantity: 5,
            xmlId: 'myNewXmlId',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.shipmentItem)
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
      async function updateShipmentItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipmentitem.update',
            params: {
              id: 7,
              fields: {
                quantity: 5,
                xmlId: 'myNewXmlId',
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
          console.info(result.shipmentItem)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateShipmentItem)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "quantity": 5,
        "xmlId": "myNewXmlId",
    }

    try:
        bitrix_response = client.sale.shipmentitem.update(
            bitrix_id=7,
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
                'sale.shipmentitem.update',
                [
                    'id' => 7,
                    'fields' => [
                        'quantity' => 5,
                        'xmlId' => 'myNewXmlId',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating shipment item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
       'sale.shipmentitem.update', {
            id: 7,
            fields: {
                quantity: 5,
                xmlId: 'myNewXmlId',
            }
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
        'sale.shipmentitem.update',
        [
            'id' => 7,
            'fields' => [
                'quantity' => 5,
                'xmlId' => 'myNewXmlId',
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
    res, err := client.Core().Call(ctx, "sale.shipmentitem.update", b24.Params{
    	"id": 7,
    	"fields": b24.Params{
    		"quantity": 5,
    		"xmlId":    "myNewXmlId",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.shipmentitem.update: %w", err)
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
            "basketId":2716,
            "dateInsert":"2024-04-11T09:10:34+03:00",
            "id":7,
            "orderDeliveryId":2431,
            "quantity":5,
            "reservedQuantity":0,
            "xmlId":"myNewXmlId"
        }
    },
    "time":{
        "start":1712819636.302217,
        "finish":1712819637.183715,
        "duration":0.8814980983734131,
        "processing":0.6984810829162598,
        "date_start":"2024-04-11T10:13:56+03:00",
        "date_finish":"2024-04-11T10:13:57+03:00"
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
[`sale_order_shipment_item`](../data-types.md#sale_order_shipment_item) | Измененный элемент табличной части отгрузки ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"100",
    "error_description":"Could not find value for parameter {fields}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201240400001` | `shipment item is not exists`

Обновляемый элемент табличной части отгрузки не найден ||
|| `200040300020` | `Access Denied`

Недостаточно прав для обновления элемента табличной части отгрузки ||
|| `100` | `Bitrix\Sale\ShipmentItem constructor must be is public`

Не указан параметр `id` ||
|| `100` | `Could not find value for parameter {fields}`

Не указан параметр `fields` ||
|| `0` | `Required fields: quantity`

В `fields` не передано поле `quantity` ||
|| `150` | `Системная отгрузка недоступна для изменения`

Элемент относится к системной отгрузке, в которой числится нераспределенный товар ||
|| `SALE_SHIPMENT_ITEM_SHIPMENT_ALREADY_SHIPPED_CANNOT_EDIT` | `Отгрузка уже отправлена. Изменения невозможны.`

Отгрузка уже отгружена (`deducted` = `Y`), а `quantity` отличается от текущего ||
|| `SALE_SHIPMENT_ITEM_LESS_AVAILABLE_QUANTITY` | `В корзине недостаточное количество свободного товара "<название>" для добавления в отгрузку. Возможно, вы уже добавили часть товара по этому заказу в другие отгрузки`

В корзине недостаточно свободного товара: количество превышает остаток, не распределенный по другим отгрузкам ||
|| `SALE_SHIPMENT_ITEM_ERR_QUANTITY_EMPTY` | `Количество <название> не может быть меньше или равны 0`

Передано `quantity` = `0` ||
|| `BARCODE_MORE_ITEM_QUANTITY` | `Штрих-кодов больше чем количества товара`

Передано отрицательное значение `quantity` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-item-add.md)
- [{#T}](./sale-shipment-item-get.md)
- [{#T}](./sale-shipment-item-list.md)
- [{#T}](./sale-shipment-item-delete.md)
- [{#T}](./sale-shipment-item-get-fields.md)