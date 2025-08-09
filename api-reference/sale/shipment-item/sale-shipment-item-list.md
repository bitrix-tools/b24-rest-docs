# Получить список элементов табличной части отгрузки sale.shipmentitem.list

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipmentitem.list
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","orderDeliveryId","basketId","quantity","xmlId","dateInsert","reservedQuantity"],"filter":{"<id":10,"@orderDeliveryId":[2431,2430],"basketId":2716},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentitem.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.shipmentitem.list',
        {
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
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('sale.shipmentitem.list', {
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
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('sale.shipmentitem.list', {
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
      }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
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