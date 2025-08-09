# Получить список привязок заказов к объектам CRM crm.orderentity.list

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

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.orderentity.list',
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
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.orderentity.list', {
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
      }, 'orderId');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.orderentity.list', {
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
