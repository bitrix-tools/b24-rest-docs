# Получить список отгрузок sale.shipment.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список отгрузок. 

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) |Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [sale_order_shipment](../data-types.md)).
 ||
|| **filter**
[`object`](../../data-types.md) |  Объект для фильтрации выбранных привязок оплат к отгрузкам в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [sale_order_shipment](../data-types.md).

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
 
Возможные значения для `field` соответствуют полям объекта [sale_order_shipment](../data-types.md).
 
Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **start**
[`integer`](../../data-types.md) |  Параметр используется для управления постраничной навигацией.
 
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

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","accountNumber","allowDelivery","basePriceDelivery","canceled","comments","companyId","currency","customPriceDelivery","dateAllowDelivery","dateCanceled","dateDeducted","dateInsert","dateMarked","dateResponsibleId","deducted","deliveryDocDate","deliveryDocNum","deliveryId","deliveryName","deliveryXmlId","discountPrice","empAllowDeliveryId","empCanceledId","empDeductedId","empMarkedId","empResponsibleId","externalDelivery","id1c","marked","orderId","priceDelivery","reasonMarked","reasonUndoDeducted","responsibleId","statusId","statusXmlId","system","trackingDescription","trackingLastCheck","trackingNumber","trackingStatus","updated1c","version1c","xmlId"],"filter":{"@orderId":[2069,2070],">=id":2464},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipment.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","accountNumber","allowDelivery","basePriceDelivery","canceled","comments","companyId","currency","customPriceDelivery","dateAllowDelivery","dateCanceled","dateDeducted","dateInsert","dateMarked","dateResponsibleId","deducted","deliveryDocDate","deliveryDocNum","deliveryId","deliveryName","deliveryXmlId","discountPrice","empAllowDeliveryId","empCanceledId","empDeductedId","empMarkedId","empResponsibleId","externalDelivery","id1c","marked","orderId","priceDelivery","reasonMarked","reasonUndoDeducted","responsibleId","statusId","statusXmlId","system","trackingDescription","trackingLastCheck","trackingNumber","trackingStatus","updated1c","version1c","xmlId"],"filter":{"@orderId":[2069,2070],">=id":2464},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentListResult = {
      shipments: {
        id: number
        accountNumber: string
        allowDelivery: string
        basePriceDelivery: number
        canceled: string
        comments: string
        companyId: number
        currency: string
        customPriceDelivery: string
        dateAllowDelivery: ISODate | null
        dateCanceled: ISODate | null
        dateDeducted: ISODate | null
        dateInsert: ISODate
        dateMarked: ISODate | null
        dateResponsibleId: ISODate
        deducted: string
        deliveryDocDate: ISODate | null
        deliveryDocNum: string
        deliveryId: number
        deliveryName: string
        deliveryXmlId: string
        discountPrice: number | null
        empAllowDeliveryId: number | null
        empCanceledId: number | null
        empDeductedId: number | null
        empMarkedId: number | null
        empResponsibleId: number | null
        externalDelivery: string
        id1c: string
        marked: string
        orderId: number
        priceDelivery: number
        reasonMarked: string
        reasonUndoDeducted: string
        responsibleId: number
        statusId: string
        statusXmlId: string
        system: string
        trackingDescription: string
        trackingLastCheck: string
        trackingNumber: string
        trackingStatus: string
        updated1c: string
        version1c: string
        xmlId: string
      }[]
    }

    try {
      // sale.shipment.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ShipmentListResult>({
        method: 'sale.shipment.list',
        params: {
          select: [
            'id',
            'accountNumber',
            'allowDelivery',
            'basePriceDelivery',
            'canceled',
            'comments',
            'companyId',
            'currency',
            'customPriceDelivery',
            'dateAllowDelivery',
            'dateCanceled',
            'dateDeducted',
            'dateInsert',
            'dateMarked',
            'dateResponsibleId',
            'deducted',
            'deliveryDocDate',
            'deliveryDocNum',
            'deliveryId',
            'deliveryName',
            'deliveryXmlId',
            'discountPrice',
            'empAllowDeliveryId',
            'empCanceledId',
            'empDeductedId',
            'empMarkedId',
            'empResponsibleId',
            'externalDelivery',
            'id1c',
            'marked',
            'orderId',
            'priceDelivery',
            'reasonMarked',
            'reasonUndoDeducted',
            'responsibleId',
            'statusId',
            'statusXmlId',
            'system',
            'trackingDescription',
            'trackingLastCheck',
            'trackingNumber',
            'trackingStatus',
            'updated1c',
            'version1c',
            'xmlId',
          ],
          filter: {
            '>=id': 2464,
            '@orderId': [2069, 2070],
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
        console.info('Shipments fetched:', result.shipments.length, result.shipments)
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
      async function fetchShipmentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.shipment.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipment.list',
            params: {
              select: [
                'id',
                'accountNumber',
                'allowDelivery',
                'basePriceDelivery',
                'canceled',
                'comments',
                'companyId',
                'currency',
                'customPriceDelivery',
                'dateAllowDelivery',
                'dateCanceled',
                'dateDeducted',
                'dateInsert',
                'dateMarked',
                'dateResponsibleId',
                'deducted',
                'deliveryDocDate',
                'deliveryDocNum',
                'deliveryId',
                'deliveryName',
                'deliveryXmlId',
                'discountPrice',
                'empAllowDeliveryId',
                'empCanceledId',
                'empDeductedId',
                'empMarkedId',
                'empResponsibleId',
                'externalDelivery',
                'id1c',
                'marked',
                'orderId',
                'priceDelivery',
                'reasonMarked',
                'reasonUndoDeducted',
                'responsibleId',
                'statusId',
                'statusXmlId',
                'system',
                'trackingDescription',
                'trackingLastCheck',
                'trackingNumber',
                'trackingStatus',
                'updated1c',
                'version1c',
                'xmlId',
              ],
              filter: {
                '>=id': 2464,
                '@orderId': [2069, 2070],
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
          console.info('Shipments fetched:', result.shipments.length, result.shipments)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchShipmentList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipment.list',
                [
                    'select' => [
                        'id',
                        'accountNumber',
                        'allowDelivery',
                        'basePriceDelivery',
                        'canceled',
                        'comments',
                        'companyId',
                        'currency',
                        'customPriceDelivery',
                        'dateAllowDelivery',
                        'dateCanceled',
                        'dateDeducted',
                        'dateInsert',
                        'dateMarked',
                        'dateResponsibleId',
                        'deducted',
                        'deliveryDocDate',
                        'deliveryDocNum',
                        'deliveryId',
                        'deliveryName',
                        'deliveryXmlId',
                        'discountPrice',
                        'empAllowDeliveryId',
                        'empCanceledId',
                        'empDeductedId',
                        'empMarkedId',
                        'empResponsibleId',
                        'externalDelivery',
                        'id1c',
                        'marked',
                        'orderId',
                        'priceDelivery',
                        'reasonMarked',
                        'reasonUndoDeducted',
                        'responsibleId',
                        'statusId',
                        'statusXmlId',
                        'system',
                        'trackingDescription',
                        'trackingLastCheck',
                        'trackingNumber',
                        'trackingStatus',
                        'updated1c',
                        'version1c',
                        'xmlId',
                    ],
                    'filter' => [
                        '>=id'     => 2464,
                        '@orderId' => [2069, 2070],
                    ],
                    'order'  => [
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
        echo 'Error fetching shipment list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipment.list", {
            "select": [
                "id",
                "accountNumber",
                "allowDelivery",
                "basePriceDelivery",
                "canceled",
                "comments",
                "companyId",
                "currency",
                "customPriceDelivery",
                "dateAllowDelivery",
                "dateCanceled",
                "dateDeducted",
                "dateInsert",
                "dateMarked",
                "dateResponsibleId",
                "deducted",
                "deliveryDocDate",
                "deliveryDocNum",
                "deliveryId",
                "deliveryName",
                "deliveryXmlId",
                "discountPrice",
                "empAllowDeliveryId",
                "empCanceledId",
                "empDeductedId",
                "empMarkedId",
                "empResponsibleId",
                "externalDelivery",
                "id1c",
                "marked",
                "orderId",
                "priceDelivery",
                "reasonMarked",
                "reasonUndoDeducted",
                "responsibleId",
                "statusId",
                "statusXmlId",
                "system",
                "trackingDescription",
                "trackingLastCheck",
                "trackingNumber",
                "trackingStatus",
                "updated1c",
                "version1c",
                "xmlId",
            ],
            "filter": {
                ">=id": 2464,
                "@orderId": [2069, 2070],
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
        'sale.shipment.list',
        [
            'select' => [
                "id",
                "accountNumber",
                "allowDelivery",
                "basePriceDelivery",
                "canceled",
                "comments",
                "companyId",
                "currency",
                "customPriceDelivery",
                "dateAllowDelivery",
                "dateCanceled",
                "dateDeducted",
                "dateInsert",
                "dateMarked",
                "dateResponsibleId",
                "deducted",
                "deliveryDocDate",
                "deliveryDocNum",
                "deliveryId",
                "deliveryName",
                "deliveryXmlId",
                "discountPrice",
                "empAllowDeliveryId",
                "empCanceledId",
                "empDeductedId",
                "empMarkedId",
                "empResponsibleId",
                "externalDelivery",
                "id1c",
                "marked",
                "orderId",
                "priceDelivery",
                "reasonMarked",
                "reasonUndoDeducted",
                "responsibleId",
                "statusId",
                "statusXmlId",
                "system",
                "trackingDescription",
                "trackingLastCheck",
                "trackingNumber",
                "trackingStatus",
                "updated1c",
                "version1c",
                "xmlId",
            ],
            'filter' => [
                ">=id" => 2464,
                "@orderId" => [2069, 2070],
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

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":{
      "shipments":[
         {
            "accountNumber":"2070\/2",
            "allowDelivery":"N",
            "basePriceDelivery":0,
            "canceled":"N",
            "comments":"",
            "companyId":0,
            "currency":"RUB",
            "customPriceDelivery":"N",
            "dateAllowDelivery":null,
            "dateCanceled":null,
            "dateDeducted":null,
            "dateInsert":"2024-04-11T16:59:20+03:00",
            "dateMarked":null,
            "dateResponsibleId":"2024-04-11T16:59:20+03:00",
            "deducted":"N",
            "deliveryDocDate":null,
            "deliveryDocNum":"",
            "deliveryId":1,
            "deliveryName":"Без доставки",
            "deliveryXmlId":"",
            "discountPrice":null,
            "empAllowDeliveryId":null,
            "empCanceledId":null,
            "empDeductedId":null,
            "empMarkedId":null,
            "empResponsibleId":null,
            "externalDelivery":"N",
            "id":2467,
            "id1c":"",
            "marked":"N",
            "orderId":2070,
            "priceDelivery":0,
            "reasonMarked":"",
            "reasonUndoDeducted":"",
            "responsibleId":0,
            "statusId":"DN",
            "statusXmlId":"FFdddd",
            "system":"N",
            "trackingDescription":"",
            "trackingLastCheck":"",
            "trackingNumber":"",
            "trackingStatus":"",
            "updated1c":"N",
            "version1c":"",
            "xmlId":"bx_6617fac818ee2"
         },
         {
            "accountNumber":"2069\/2",
            "allowDelivery":"N",
            "basePriceDelivery":600,
            "canceled":"N",
            "comments":"",
            "companyId":0,
            "currency":"RUB",
            "customPriceDelivery":"N",
            "dateAllowDelivery":null,
            "dateCanceled":null,
            "dateDeducted":null,
            "dateInsert":"2024-04-11T15:05:48+03:00",
            "dateMarked":null,
            "dateResponsibleId":"2024-04-11T15:05:48+03:00",
            "deducted":"N",
            "deliveryDocDate":null,
            "deliveryDocNum":"",
            "deliveryId":2,
            "deliveryName":"Доставка курьером",
            "deliveryXmlId":"",
            "discountPrice":null,
            "empAllowDeliveryId":null,
            "empCanceledId":null,
            "empDeductedId":null,
            "empMarkedId":null,
            "empResponsibleId":null,
            "externalDelivery":"N",
            "id":2465,
            "id1c":"",
            "marked":"N",
            "orderId":2069,
            "priceDelivery":600,
            "reasonMarked":"",
            "reasonUndoDeducted":"",
            "responsibleId":0,
            "statusId":"DN",
            "statusXmlId":"FFdddd",
            "system":"N",
            "trackingDescription":"",
            "trackingLastCheck":"",
            "trackingNumber":"",
            "trackingStatus":"",
            "updated1c":"N",
            "version1c":"",
            "xmlId":"bx_6617e02cae2a1"
         }
      ]
   },
   "total":2,
   "time":{
      "start":1712847615.641893,
      "finish":1712847615.857499,
      "duration":0.2156059741973877,
      "processing":0.02844095230102539,
      "date_start":"2024-04-11T18:00:15+03:00",
      "date_finish":"2024-04-11T18:00:15+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **shipments**
[`sale_order_shipment[]`](../data-types.md) | Массив объектов с информацией о выбранных отгрузках ||
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
|| `200040300010` | Недостаточно прав для чтения отгрузок ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-add.md)
- [{#T}](./sale-shipment-update.md)
- [{#T}](./sale-shipment-get.md)
- [{#T}](./sale-shipment-delete.md)
- [{#T}](./sale-shipment-get-fields.md)