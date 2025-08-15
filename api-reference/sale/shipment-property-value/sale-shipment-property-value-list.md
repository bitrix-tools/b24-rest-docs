# Получить список значений свойств отгрузки sale.shipmentpropertyvalue.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список значений свойств отгрузки.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [sale_shipment_property_value](../data-types.md#sale_shipment_property_value)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля значений свойств
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных значений свойств в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field`соответствуют полям объекта [sale_shipment_property_value](../data-types.md#sale_shipment_property_value).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
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
[`object`](../../data-types.md) | Объект для сортировки выбранных значений свойств в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_shipment_property_value](../data-types.md#sale_shipment_property_value).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` – номер нужной страницы
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
    -d '{"select":["code","id","name","shipmentId","shipmentPropsId","shipmentPropsXmlId","value"],"filter":{"@shipmentId":[4120]},"order":{"shipmentId":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentpropertyvalue.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["code","id","name","shipmentId","shipmentPropsId","shipmentPropsXmlId","value"],"filter":{"@shipmentId":[4120]},"order":{"shipmentId":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentpropertyvalue.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.shipmentpropertyvalue.list',
        {
          "select": [
            "code",
            "id",
            "name",
            "shipmentId",
            "shipmentPropsId",
            "shipmentPropsXmlId",
            "value",
          ],
          "filter": {
            "@shipmentId": [4120],
          },
          "order": {
            "shipmentId": "desc",
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
      const generator = $b24.fetchListMethod('sale.shipmentpropertyvalue.list', {
        "select": [
          "code",
          "id",
          "name",
          "shipmentId",
          "shipmentPropsId",
          "shipmentPropsXmlId",
          "value",
        ],
        "filter": {
          "@shipmentId": [4120],
        },
        "order": {
          "shipmentId": "desc",
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
      const response = await $b24.callMethod('sale.shipmentpropertyvalue.list', {
        "select": [
          "code",
          "id",
          "name",
          "shipmentId",
          "shipmentPropsId",
          "shipmentPropsXmlId",
          "value",
        ],
        "filter": {
          "@shipmentId": [4120],
        },
        "order": {
          "shipmentId": "desc",
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
                'sale.shipmentpropertyvalue.list',
                [
                    'select' => [
                        'code',
                        'id',
                        'name',
                        'shipmentId',
                        'shipmentPropsId',
                        'shipmentPropsXmlId',
                        'value',
                    ],
                    'filter' => [
                        '@shipmentId' => [4120],
                    ],
                    'order' => [
                        'shipmentId' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching shipment property values: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipmentpropertyvalue.list", {
            "select": [
                "code",
                "id",
                "name",
                "shipmentId",
                "shipmentPropsId",
                "shipmentPropsXmlId",
                "value",
            ],
            "filter": {
                "@shipmentId": [4120],
            },
            "order": {
                "shipmentId": "desc",
            },
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
        'sale.shipmentpropertyvalue.list',
        [
            'select' => [
                "code",
                "id",
                "name",
                "shipmentId",
                "shipmentPropsId",
                "shipmentPropsXmlId",
                "value",
            ],
            'filter' => [
                "@shipmentId" => [4120],
            ],
            'order' => [
                "shipmentId" => "desc",
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
        "propertyValues":[
            {
                "code":null,
                "id":38164,
                "name":"Comments",
                "shipmentId":4120,
                "shipmentPropsId":105,
                "shipmentPropsXmlId":"bx_6661d1b6690d5",
                "value":"Comments value"
            },
            {
                "code":null,
                "id":38166,
                "name":"Description",
                "shipmentId":4120,
                "shipmentPropsId":106,
                "shipmentPropsXmlId":"bx_6666cc212db52",
                "value":"Description value"
            }
        ]
    },
    "total":2,
    "time":{
        "start":1718023945.124614,
        "finish":1718023945.312019,
        "duration":0.18740510940551758,
        "processing":0.016345977783203125,
        "date_start":"2024-06-10T15:52:25+03:00",
        "date_finish":"2024-06-10T15:52:25+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyValues**
[`sale_shipment_property_value[]`](../data-types.md#sale_shipment_property_value) | Массив объектов с информацией о выбранных значениях свойств отгрузки ||
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
|| `200040300010` | Недостаточно прав для чтения значений свойств ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-shipment-property-value-modify.md)
- [{#T}](./sale-shipment-property-value-get.md)
- [{#T}](./sale-shipment-propertyvalue-delete.md)
- [{#T}](./sale-shipment-property-value-get-fields.md)