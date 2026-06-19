# Получить список элементов табличной части отгрузки sale.shipmentitem.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.shipmentitem.list` позволяет получить список элементов табличной части отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите поля объекта [sale_order_shipment_item](../data-types.md#sale_order_shipment_item)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля элементов табличной части отгрузки. ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных элементов табличной части отгрузки в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_shipment_item](../data-types.md#sale_order_shipment_item).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@`— NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - "мол%" — ищем значения, начинающиеся с «мол»
    - "%мол" — ищем значения, заканчивающиеся на «мол»
    - "%мол%" — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - "мол%" — ищем значения, не начинающиеся с «мол»
    - "%мол" — ищем значения, не заканчивающиеся на «мол»
    - "%мол%" — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` - не равно
- `!` — не равно
 ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных элементов табличной части отгрузки в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_shipment_item](../data-types.md#sale_order_shipment_item).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","orderDeliveryId","basketId","quantity","xmlId","dateInsert","reservedQuantity"],"filter":{"<id":10,"@orderDeliveryId":[2431,2430],"basketId":2716},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentitem.list
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","orderDeliveryId","basketId","quantity","xmlId","dateInsert","reservedQuantity"],"filter":{"<id":10,"@orderDeliveryId":[2431,2430],"basketId":2716},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentitem.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentItemListResult = {
      shipmentItems: {
        id: number
        orderDeliveryId: number
        basketId: number
        quantity: number
        xmlId: string
        dateInsert: ISODate | null
        reservedQuantity: number
      }[]
    }

    // sale.shipmentitem.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<ShipmentItemListResult>({
        method: 'sale.shipmentitem.list',
        params: {
          select: [
            'id',
            'orderDeliveryId',
            'basketId',
            'quantity',
            'xmlId',
            'dateInsert',
            'reservedQuantity',
          ],
          filter: {
            '<id': 10,
            '@orderDeliveryId': [2431, 2430],
            basketId: 2716,
          },
          order: {
            id: 'desc',
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
        console.info('Shipment items count:', result.shipmentItems.length, result.shipmentItems)
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
      async function listShipmentItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.shipmentitem.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipmentitem.list',
            params: {
              select: [
                'id',
                'orderDeliveryId',
                'basketId',
                'quantity',
                'xmlId',
                'dateInsert',
                'reservedQuantity',
              ],
              filter: {
                '<id': 10,
                '@orderDeliveryId': [2431, 2430],
                basketId: 2716,
              },
              order: {
                id: 'desc',
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
          console.info('Shipment items count:', result.shipmentItems.length, result.shipmentItems)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listShipmentItems)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipmentitem.list',
                [
                    'select' => [
                        'id',
                        'orderDeliveryId',
                        'basketId',
                        'quantity',
                        'xmlId',
                        'dateInsert',
                        'reservedQuantity',
                    ],
                    'filter' => [
                        '<id'            => 10,
                        '@orderDeliveryId' => [2431, 2430],
                        'basketId'       => 2716,
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching shipment items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipmentitem.list", {
            "select": [
                "id",
                "orderDeliveryId",
                "basketId",
                "quantity",
                "xmlId",
                "dateInsert",
                "reservedQuantity",
            ],
            "filter": {
                "<id": 10,
                "@orderDeliveryId": [2431, 2430],
                "basketId": 2716,
            },
            "order": {
                "id": "desc",
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
        'sale.shipmentitem.list',
        [
            'select' => [
                "id",
                "orderDeliveryId",
                "basketId",
                "quantity",
                "xmlId",
                "dateInsert",
                "reservedQuantity",
            ],
            'filter' => [
                "<id" => 10,
                "@orderDeliveryId" => [2431, 2430],
                "basketId" => 2716,
            ],
            'order' => [
                "id" => "desc",
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":{
        "shipmentItems":[
            {
                "basketId":2716,
                "dateInsert":"2024-04-11T09:10:34+03:00",
                "id":7,
                "orderDeliveryId":2431,
                "quantity":5,
                "reservedQuantity":0,
                "xmlId":"myNewXmlId"
            },
            {
                "basketId":2716,
                "dateInsert":"2024-04-08T10:36:24+03:00",
                "id":1,
                "orderDeliveryId":2430,
                "quantity":5,
                "reservedQuantity":0,
                "xmlId":"myXmlId2"
            }
        ]
    },
    "total":2,
    "time":{
        "start":1712819741.592596,
        "finish":1712819741.796288,
        "duration":0.20369195938110352,
        "processing":0.01679706573486328,
        "date_start":"2024-04-11T10:15:41+03:00",
        "date_finish":"2024-04-11T10:15:41+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **shipmentItems**
[`sale_order_shipment_item[]`](../data-types.md) | Массив объектов с информацией о выбранных элементах табличной части отгрузки ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения элемента табличной части отгрузки ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./sale-shipment-item-add.md)
- [{#T}](./sale-shipment-item-update.md)
- [{#T}](./sale-shipment-item-get.md)
- [{#T}](./sale-shipment-item-delete.md)
- [{#T}](./sale-shipment-item-get-fields.md)