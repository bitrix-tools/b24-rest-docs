# Получить список заказов sale.order.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.order.list` получает список заказов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите поля объекта [sale_order](../data-types.md#sale_order)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля заказов. ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных заказов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [sale_order](../data-types.md#sale_order).

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
- `!` — не равно ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных заказов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [sale_order](../data-types.md#sale_order).
 
Возможные значения для `order`:

- asc — в порядке возрастания
- desc — в порядке убывания
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
    -d '{"select":["id","lid","dateInsert","dateUpdate","personTypeId","personTypeXmlId","statusId","dateStatus","empStatusId","marked","dateMarked","empMarkedId","reasonMarked","price","discountValue","taxValue","userDescription","additionalInfo","comments","companyId","responsibleId","recurringId","lockedBy","dateLock","recountFlag","affiliateId","updated1c","orderTopic","xmlId","statusXmlId","id1c","version","version1c","externalOrder","canceled","dateCanceled","empCanceledId","reasonCanceled","userId","currency","accountNumber","payed","deducted"],"filter":{"<id":10,"@personTypeId":[3,4],"payed":"N"},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.order.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","lid","dateInsert","dateUpdate","personTypeId","personTypeXmlId","statusId","dateStatus","empStatusId","marked","dateMarked","empMarkedId","reasonMarked","price","discountValue","taxValue","userDescription","additionalInfo","comments","companyId","responsibleId","recurringId","lockedBy","dateLock","recountFlag","affiliateId","updated1c","orderTopic","xmlId","statusXmlId","id1c","version","version1c","externalOrder","canceled","dateCanceled","empCanceledId","reasonCanceled","userId","currency","accountNumber","payed","deducted"],"filter":{"<id":10,"@personTypeId":[3,4],"payed":"N"},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.order.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.order.list',
        {
          "select": [
            "id",
            "lid",
            "dateInsert",
            "dateUpdate",
            "personTypeId",
            "personTypeXmlId",
            "statusId",
            "dateStatus",
            "empStatusId",
            "marked",
            "dateMarked",
            "empMarkedId",
            "reasonMarked",
            "price",
            "discountValue",
            "taxValue",
            "userDescription",
            "additionalInfo",
            "comments",
            "companyId",
            "responsibleId",
            "recurringId",
            "lockedBy",
            "dateLock",
            "recountFlag",
            "affiliateId",
            "updated1c",
            "orderTopic",
            "xmlId",
            "statusXmlId",
            "id1c",
            "version",
            "version1c",
            "externalOrder",
            "canceled",
            "dateCanceled",
            "empCanceledId",
            "reasonCanceled",
            "userId",
            "currency",
            "accountNumber",
            "payed",
            "deducted",
          ],
          "filter": {
            "<id": 10,
            "@personTypeId": [3, 4],
            "payed": "N",
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
    
    // fetchListMethod предпочтительн при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('sale.order.list', {
        "select": [
          "id",
          "lid",
          "dateInsert",
          "dateUpdate",
          "personTypeId",
          "personTypeXmlId",
          "statusId",
          "dateStatus",
          "empStatusId",
          "marked",
          "dateMarked",
          "empMarkedId",
          "reasonMarked",
          "price",
          "discountValue",
          "taxValue",
          "userDescription",
          "additionalInfo",
          "comments",
          "companyId",
          "responsibleId",
          "recurringId",
          "lockedBy",
          "dateLock",
          "recountFlag",
          "affiliateId",
          "updated1c",
          "orderTopic",
          "xmlId",
          "statusXmlId",
          "id1c",
          "version",
          "version1c",
          "externalOrder",
          "canceled",
          "dateCanceled",
          "empCanceledId",
          "reasonCanceled",
          "userId",
          "currency",
          "accountNumber",
          "payed",
          "deducted",
        ],
        "filter": {
          "<id": 10,
          "@personTypeId": [3, 4],
          "payed": "N",
        },
        "order": {
          "id": "desc",
        }
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('sale.order.list', {
        "select": [
          "id",
          "lid",
          "dateInsert",
          "dateUpdate",
          "personTypeId",
          "personTypeXmlId",
          "statusId",
          "dateStatus",
          "empStatusId",
          "marked",
          "dateMarked",
          "empMarkedId",
          "reasonMarked",
          "price",
          "discountValue",
          "taxValue",
          "userDescription",
          "additionalInfo",
          "comments",
          "companyId",
          "responsibleId",
          "recurringId",
          "lockedBy",
          "dateLock",
          "recountFlag",
          "affiliateId",
          "updated1c",
          "orderTopic",
          "xmlId",
          "statusXmlId",
          "id1c",
          "version",
          "version1c",
          "externalOrder",
          "canceled",
          "dateCanceled",
          "empCanceledId",
          "reasonCanceled",
          "userId",
          "currency",
          "accountNumber",
          "payed",
          "deducted",
        ],
        "filter": {
          "<id": 10,
          "@personTypeId": [3, 4],
          "payed": "N",
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
                'sale.order.list',
                [
                    'select' => [
                        'id',
                        'lid',
                        'dateInsert',
                        'dateUpdate',
                        'personTypeId',
                        'personTypeXmlId',
                        'statusId',
                        'dateStatus',
                        'empStatusId',
                        'marked',
                        'dateMarked',
                        'empMarkedId',
                        'reasonMarked',
                        'price',
                        'discountValue',
                        'taxValue',
                        'userDescription',
                        'additionalInfo',
                        'comments',
                        'companyId',
                        'responsibleId',
                        'recurringId',
                        'lockedBy',
                        'dateLock',
                        'recountFlag',
                        'affiliateId',
                        'updated1c',
                        'orderTopic',
                        'xmlId',
                        'statusXmlId',
                        'id1c',
                        'version',
                        'version1c',
                        'externalOrder',
                        'canceled',
                        'dateCanceled',
                        'empCanceledId',
                        'reasonCanceled',
                        'userId',
                        'currency',
                        'accountNumber',
                        'payed',
                        'deducted',
                    ],
                    'filter' => [
                        '<id'          => 10,
                        '@personTypeId' => [3, 4],
                        'payed'        => 'N',
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
        echo 'Error fetching order list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.order.list", {
            "select": [
                "id",
                "lid",
                "dateInsert",
                "dateUpdate",
                "personTypeId",
                "personTypeXmlId",
                "statusId",
                "dateStatus",
                "empStatusId",
                "marked",
                "dateMarked",
                "empMarkedId",
                "reasonMarked",
                "price",
                "discountValue",
                "taxValue",
                "userDescription",
                "additionalInfo",
                "comments",
                "companyId",
                "responsibleId",
                "recurringId",
                "lockedBy",
                "dateLock",
                "recountFlag",
                "affiliateId",
                "updated1c",
                "orderTopic",
                "xmlId",
                "statusXmlId",
                "id1c",
                "version",
                "version1c",
                "externalOrder",
                "canceled",
                "dateCanceled",
                "empCanceledId",
                "reasonCanceled",
                "userId",
                "currency",
                "accountNumber",
                "payed",
                "deducted",
            ],
            "filter": {
                "<id": 10,
                "@personTypeId": [3, 4],
                "payed": "N",
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
        'sale.order.list',
        [
            'select' => [
                "id",
                "lid",
                "dateInsert",
                "dateUpdate",
                "personTypeId",
                "personTypeXmlId",
                "statusId",
                "dateStatus",
                "empStatusId",
                "marked",
                "dateMarked",
                "empMarkedId",
                "reasonMarked",
                "price",
                "discountValue",
                "taxValue",
                "userDescription",
                "additionalInfo",
                "comments",
                "companyId",
                "responsibleId",
                "recurringId",
                "lockedBy",
                "dateLock",
                "recountFlag",
                "affiliateId",
                "updated1c",
                "orderTopic",
                "xmlId",
                "statusXmlId",
                "id1c",
                "version",
                "version1c",
                "externalOrder",
                "canceled",
                "dateCanceled",
                "empCanceledId",
                "reasonCanceled",
                "userId",
                "currency",
                "accountNumber",
                "payed",
                "deducted",
            ],
            'filter' => [
                "<id" => 10,
                "@personTypeId" => [3, 4],
                "payed" => "N",
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
    "result": {
        "orders": [
            {
                "accountNumber": "165",
                "additionalInfo": "",
                "affiliateId": null,
                "canceled": "N",
                "comments": "",
                "companyId": null,
                "currency": "RUB",
                "dateCanceled": null,
                "dateInsert": "2022-10-14T17:19:11+03:00",
                "dateLock": null,
                "dateMarked": null,
                "dateStatus": "2022-10-14T17:19:03+03:00",
                "dateUpdate": "2022-10-14T17:19:11+03:00",
                "deducted": "N",
                "discountValue": 0,
                "empCanceledId": null,
                "empMarkedId": null,
                "empStatusId": 1,
                "externalOrder": "N",
                "id": 9,
                "id1c": "",
                "lid": "s1",
                "lockedBy": "",
                "marked": "N",
                "orderTopic": "",
                "payed": "N",
                "personTypeId": 4,
                "personTypeXmlId": "",
                "price": 1176,
                "reasonCanceled": "",
                "reasonMarked": "",
                "recountFlag": "Y",
                "recurringId": "",
                "responsibleId": 1,
                "statusId": "N",
                "statusXmlId": "",
                "taxValue": 196,
                "updated1c": "N",
                "userDescription": "",
                "userId": 2,
                "version": 0,
                "version1c": "",
                "xmlId": "bx_63498bf7c8d31"
            },
        ]
    },
    "total": 1,
    "time": {
        "start": 1712847891.436862,
        "finish": 1712847892.028163,
        "duration": 0.5913009643554688,
        "processing": 0.1332709789276123,
        "date_start": "2024-04-11T18:04:51+03:00",
        "date_finish": "2024-04-11T18:04:52+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **orders**
[`sale_order[]`](../data-types.md) | Массив объектов с информацией о выбранных заказах ||
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
|| `200040300010` | Недостаточно прав для чтения заказов ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./sale-order-add.md)
- [{#T}](./sale-order-update.md)
- [{#T}](./sale-order-get.md)
- [{#T}](./sale-order-delete.md)
- [{#T}](./sale-order-get-fields.md)