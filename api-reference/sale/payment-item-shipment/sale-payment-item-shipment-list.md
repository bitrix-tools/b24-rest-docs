# Получить список привязок sale.paymentItemShipment.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список привязок оплат к отгрузкам по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [sale_payment_item_shipment](../data-types.md#sale_payment_item_shipment)).
 
Если не передан или передан пустой массив, то будут выбраны все доступные поля привязок оплат к отгрузкам ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных привязок оплат к отгрузкам в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [sale_payment_item_shipment](../data-types.md).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `=` — равно (работает и с массивами)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `>` — больше
- `<` — меньше
- `!=` — не равно
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `>=` — больше либо равно
- `<=` — меньше либо равно
- `=%` — LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры: 
    - `"мол%"` — ищем значения начинающиеся с «мол»
    - `"%мол"` — ищем значения заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (смотрите описание выше)
- `!=%` — NOT LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения не начинающиеся с «мол»
    - `"%мол"` — ищем значения не заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (смотрите описание выше)
 ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных привязок оплат к отгрузкам в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [sale_payment_item_shipment](../data-types.md).
 
Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","shipmentId","paymentId","xmlId","dateInsert"],"filter":{"paymentId":1025,"shipmentId":2467},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paymentitemshipment.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","shipmentId","paymentId","xmlId","dateInsert"],"filter":{"paymentId":1025,"shipmentId":2467},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paymentitemshipment.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PaymentItemShipmentListResult = {
      paymentItemsShipment: {
        id: number
        shipmentId: number
        paymentId: number
        xmlId: string
        dateInsert: ISODate | null
      }[]
    }

    // sale.paymentitemshipment.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<PaymentItemShipmentListResult>({
        method: 'sale.paymentitemshipment.list',
        params: {
          select: [
            'id',
            'shipmentId',
            'paymentId',
            'xmlId',
            'dateInsert',
          ],
          filter: {
            paymentId: 1025,
            shipmentId: 2467,
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
        console.info('Items:', result.paymentItemsShipment, 'Count:', result.paymentItemsShipment.length)
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
      async function fetchPaymentItemShipments() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.paymentitemshipment.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.paymentitemshipment.list',
            params: {
              select: [
                'id',
                'shipmentId',
                'paymentId',
                'xmlId',
                'dateInsert',
              ],
              filter: {
                paymentId: 1025,
                shipmentId: 2467,
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
          console.info('Items:', result.paymentItemsShipment, 'Count:', result.paymentItemsShipment.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchPaymentItemShipments)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.paymentitemshipment.list',
                [
                    'select' => [
                        'id',
                        'shipmentId',
                        'paymentId',
                        'xmlId',
                        'dateInsert',
                    ],
                    'filter' => [
                        'paymentId'  => 1025,
                        'shipmentId' => 2467,
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching payment item shipments: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.paymentitemshipment.list", {
            "select": [
                "id",
                "shipmentId",
                "paymentId",
                "xmlId",
                "dateInsert",
            ],
            "filter": {
                "paymentId": 1025,
                "shipmentId": 2467,
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
        'sale.paymentitemshipment.list',
        [
            'select' => [
                'id',
                'shipmentId',
                'paymentId',
                'xmlId',
                'dateInsert',
            ],
            'filter' => [
                'paymentId' => 1025,
                'shipmentId' => 2467,
            ],
            'order' => [
                'id' => 'desc',
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
        "paymentItemsShipment":[
            {
                "dateInsert":"2024-04-11T16:59:21+03:00",
                "id":1180,
                "paymentId":1025,
                "shipmentId":2467,
                "xmlId":"bx_6617fac9afe1e"
            }
        ]
    },
    "total":1,
    "time":{
        "start":1713172802.193215,
        "finish":1713172802.464073,
        "duration":0.2708580493927002,
        "processing":0.018366098403930664,
        "date_start":"2024-04-15T12:20:02+03:00",
        "date_finish":"2024-04-15T12:20:02+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **paymentItemsShipment**
[`sale_payment_item_shipment[]`](../data-types.md) | Массив объектов с информацией о выбранных привязках оплат к отгрузкам ||
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
|| `200040300010` | Недостаточно прав для чтения элементов табличной части отгрузки ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-payment-item-shipment-add.md)
- [{#T}](./sale-payment-item-shipment-update.md)
- [{#T}](./sale-payment-item-shipment-get.md)
- [{#T}](./sale-payment-item-shipment-delete.md)
- [{#T}](./sale-payment-item-shipment-get-fields.md)