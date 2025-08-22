# Получить список привязок свойства sale.propertyRelation.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.propertyRelation.list` позволяет получить список привязок свойств. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите поля объекта [sale_order_property_relation](../data-types.md#sale_order_property_relation)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля привязок свойств. ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных привязок свойств в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_property_relation](../data-types.md#sale_order_property_relation).

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
[`object`](../../data-types.md) | Объект для сортировки выбранных привязок свойств в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_property_relation](../data-types.md#sale_order_property_relation).

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
    -d '{"select":["entityId","entityType","propertyId"],"filter":{"entityId":6},"order":{"entityId":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertyRelation.list
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["entityId","entityType","propertyId"],"filter":{"entityId":6},"order":{"entityId":"asc"},    "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyRelation.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.propertyRelation.list',
        {
          select: [
            'entityId',
            'entityType',
            'propertyId',
          ],
          filter: {
            entityId: 6,
          },
          order: {
            entityId: 'asc',
          },
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
      const generator = $b24.fetchListMethod('sale.propertyRelation.list', {
        select: [
          'entityId',
          'entityType',
          'propertyId',
        ],
        filter: {
          entityId: 6,
        },
        order: {
          entityId: 'asc',
        },
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('sale.propertyRelation.list', {
        select: [
          'entityId',
          'entityType',
          'propertyId',
        ],
        filter: {
          entityId: 6,
        },
        order: {
          entityId: 'asc',
        },
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
                'sale.propertyRelation.list',
                [
                    'select' => [
                        'entityId',
                        'entityType',
                        'propertyId',
                    ],
                    'filter' => [
                        'entityId' => 6,
                    ],
                    'order' => [
                        'entityId' => 'asc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing sale property relations: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.propertyRelation.list', 
        {
            select:[
                'entityId',
                'entityType',
                'propertyId',
            ],
            filter:{
                entityId: 6,
            },
            order:{
                entityId: 'asc',
            },
        }, 
        function(result)
        {
            if(result.error())
                console.error(result.error());
           else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertyRelation.list',
        [
            'select' => [
                'entityId',
                'entityType',
                'propertyId',
            ],
            'filter' => [
                'entityId' => 6,
            ],
            'order' => [
                'entityId' => 'asc',
            ],
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
        "propertyRelations": [
            {
                "entityId": 6,
                "entityType": "L",
                "propertyId": 39
            },
            {
                "entityId": 6,
                "entityType": "D",
                "propertyId": 40
            },
            {
                "entityId": 6,
                "entityType": "L",
                "propertyId": 40
            },
        ]
    },
    "total": 3,
    "time": {
        "start": 1712308456.66363,
        "finish": 1712308457.096419,
        "duration": 0.4327890872955322,
        "processing": 0.023340940475463867,
        "date_start": "2024-04-05T12:14:16+03:00",
        "date_finish": "2024-04-05T12:14:17+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyRelations**
[`sale_order_property_relation`](../data-types.md) | Массив объектов с информацией о выбранных привязках свойств ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения доступных полей привязок свойств ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./sale-property-relation-add.md)
- [{#T}](./sale-property-relation-delete-by-filter.md)
- [{#T}](./sale-property-relation-get-fields.md)