# Получить список привязок заказов к объектам CRM crm.orderentity.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: менеджер интернет-магазина

Метод возвращает список привязок заказов к объектам CRM.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [crm_orderentity](../../data-types.md#crm_orderentity)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля привязки заказа к объекту CRM
||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных записей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field_N` соответствуют полям объекта [crm_orderentity](../../data-types.md#crm_orderentity).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно 
||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки записей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`, где `field_N` — идентификатор поля [crm_orderentity](../../data-types.md#crm_orderentity).

Возможные значения для `order_N`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Если объект не передан или передан пустой объект, сортировка будет по возрастанию поля [crm_orderentity.OWNER_ID](../../data-types.md#crm_orderentity)
||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Если указать значение `-1`, будут выбраны все записи, отвечающие условиям фильтра
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить идентификаторы заказов, привязанных к трем сделкам:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["orderId","ownerId"],"filter":{"=ownerTypeId":2,"@ownerId":[6938,6937,6933]},"order":{"orderId":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.orderentity.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["orderId","ownerId"],"filter":{"=ownerTypeId":2,"@ownerId":[6938,6937,6933]},"order":{"orderId":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.orderentity.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type OrderEntityListResult = {
      orderEntity: {
        orderId: number
        ownerId: number
      }[]
    }

    try {
      // crm.orderentity.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<OrderEntityListResult>({
        method: 'crm.orderentity.list',
        params: {
          select: [
            'orderId',
            'ownerId',
          ],
          filter: {
            '=ownerTypeId': 2,
            '@ownerId': [6938, 6937, 6933],
          },
          order: {
            orderId: 'asc',
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
        console.info('Order entities:', result.orderEntity.length, result.orderEntity)
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
      async function listOrderEntities() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.orderentity.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.orderentity.list',
            params: {
              select: [
                'orderId',
                'ownerId',
              ],
              filter: {
                '=ownerTypeId': 2,
                '@ownerId': [6938, 6937, 6933],
              },
              order: {
                orderId: 'asc',
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
          console.info('Order entities:', result.orderEntity.length, result.orderEntity)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listOrderEntities)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.orderentity.list',
                [
                    'select' => [
                        'orderId',
                        'ownerId',
                    ],
                    'filter' => [
                        '=ownerTypeId' => 2,
                        '@ownerId'    => [6938, 6937, 6933],
                    ],
                    'order'  => [
                        'orderId' => 'asc',
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
        echo 'Error fetching order entities: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.orderentity.list",
        {
            select: [
                'orderId',
                'ownerId',
            ],
            filter: {
                '=ownerTypeId': 2,
                '@ownerId': [6938, 6937, 6933],
            },
            order: {
                orderId: 'asc'
            },
        },)
        .then(
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result.data);
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
        'crm.orderentity.list',
        [
            'select' => [
                'orderId',
                'ownerId',
            ],
            'filter' => [
                '=ownerTypeId' => 2,
                '@ownerId' => [6938, 6937, 6933],
            ],
            'order' => [
                'orderId' => 'asc'
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
        "orderEntity": [
            {
                "orderId": 5125,
                "ownerId": 6933
            },
            {
                "orderId": 5127,
                "ownerId": 6937
            },
            {
                "orderId": 5128,
                "ownerId": 6938
            }
        ]
    },
    "total": 3,
    "time": {
        "start": 1719315806.858516,
        "finish": 1719315807.569731,
        "duration": 0.7112150192260742,
        "processing": 0.039324045181274414,
        "date_start": "2024-06-25T13:43:26+02:00",
        "date_finish": "2024-06-25T13:43:27+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **orderEntity**
[`crm_orderentity[]`](../../data-types.md#crm_orderentity) | Массив объектов с информацией о выбранных заказах ||
|| **total**
[`integer`](../../../data-types.md) | Общее число выбранных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200040300010",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Описание** ||
|| `200040300010` | `Access Denied` 
Недостаточно прав доступа
||
|| `200540400002` | `module sale does not exist` 
Отсутствует модуль `Интернет-магазин` (sale)
||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-order-entity-add.md)
- [{#T}](./crm-order-entity-delete-by-filter.md)
- [{#T}](./crm-order-entity-get-fields.md)
