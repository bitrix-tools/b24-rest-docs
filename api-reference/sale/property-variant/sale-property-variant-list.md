# Получить список вариантов свойств sale.propertyvariant.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список вариантов значений свойств. Метод актуален только для свойств с типом `ENUM`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [sale_order_property_variant](../data-types.md)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля вариантов значений свойств ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных вариантов значений свойств в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_property_variant](../data-types.md).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `+` — фильтрация по точному значению заданного поля; при этом в выборку также попадают и те элементы, у которых значение поля не определено (NULL)
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных вариантов значений свойств в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_property_variant](../data-types.md).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
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
    -d '{"select":["id","name","orderPropsId","value"],"filter":{">=id":5},"order":{"orderPropsId":"desc","id":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertyvariant.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","orderPropsId","value"],"filter":{">=id":5},"order":{"orderPropsId":"desc","id":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyvariant.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.propertyvariant.list',
        {
          "select": ["id", "name", "orderPropsId", "value"],
          "filter": {
            ">=id": 5,
          },
          "order": {
            "orderPropsId": "desc",
            "id": "asc",
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
      const generator = $b24.fetchListMethod('sale.propertyvariant.list', {
        "select": ["id", "name", "orderPropsId", "value"],
        "filter": {
          ">=id": 5,
        },
        "order": {
          "orderPropsId": "desc",
          "id": "asc",
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
      const response = await $b24.callMethod('sale.propertyvariant.list', {
        "select": ["id", "name", "orderPropsId", "value"],
        "filter": {
          ">=id": 5,
        },
        "order": {
          "orderPropsId": "desc",
          "id": "asc",
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
                'sale.propertyvariant.list',
                [
                    'select' => ['id', 'name', 'orderPropsId', 'value'],
                    'filter' => [
                        '>=id' => 5,
                    ],
                    'order' => [
                        'orderPropsId' => 'desc',
                        'id' => 'asc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching property variants: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.propertyvariant.list", {
            "select": ["id", "name", "orderPropsId", "value"],
            "filter": {
                ">=id": 5,
            },
            "order": {
                "orderPropsId": "desc",
                "id": "asc",
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
        'sale.propertyvariant.list',
        [
            'select' => ['id', 'name', 'orderPropsId', 'value'],
            'filter' => ['>=id' => 5],
            'order' => [
                'orderPropsId' => 'desc',
                'id' => 'asc',
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
        "propertyVariants":[
            {
                "id":8,
                "name":"M",
                "orderPropsId":50,
                "value":"m"
            },
            {
                "id":9,
                "name":"L",
                "orderPropsId":50,
                "value":"l"
            },
            {
                "id":6,
                "name":"Красный",
                "orderPropsId":49,
                "value":"red"
            },
            {
                "id":7,
                "name":"Зеленый",
                "orderPropsId":49,
                "value":"green"
            }
        ]
    },
    "total":4,
    "time":{
        "start":1711633054.631642,
        "finish":1711633054.872368,
        "duration":0.24072599411010742,
        "processing":0.011013984680175781,
        "date_start":"2024-03-28T16:37:34+03:00",
        "date_finish":"2024-03-28T16:37:34+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyVariants**
[`sale_order_property_variant[]`](../data-types.md) | Массив объектов с информацией о выбранных вариантах значений свойств ||
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
|| `200040300010` | Недостаточно прав для чтения вариантов значений свойств ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-variant-add.md)
- [{#T}](./sale-property-variant-update.md)
- [{#T}](./sale-property-variant-get.md)
- [{#T}](./sale-property-variant-delete.md)
- [{#T}](./sale-property-variant-get-fields.md)