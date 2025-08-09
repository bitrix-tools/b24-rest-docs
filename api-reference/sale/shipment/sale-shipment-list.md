# Получить список отгрузок sale.shipment.list

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipment.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","accountNumber","allowDelivery","basePriceDelivery","canceled","comments","companyId","currency","customPriceDelivery","dateAllowDelivery","dateCanceled","dateDeducted","dateInsert","dateMarked","dateResponsibleId","deducted","deliveryDocDate","deliveryDocNum","deliveryId","deliveryName","deliveryXmlId","discountPrice","empAllowDeliveryId","empCanceledId","empDeductedId","empMarkedId","empResponsibleId","externalDelivery","id1c","marked","orderId","priceDelivery","reasonMarked","reasonUndoDeducted","responsibleId","statusId","statusXmlId","system","trackingDescription","trackingLastCheck","trackingNumber","trackingStatus","updated1c","version1c","xmlId"],"filter":{"@orderId":[2069,2070],">=id":2464},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.shipment.list',
        {
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
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтительно использовать при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('sale.shipment.list', {
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
      }, 'id');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('sale.shipment.list', {
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
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
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