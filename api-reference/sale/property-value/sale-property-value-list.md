# Получить список значений свойств sale.propertyvalue.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список вариантов значений свойств заказа.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [sale_order_property_value](../data-types.md)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля значений свойств
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных значений свойств в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field`соответствуют полям объекта [sale_order_property_value](../data-types.md).

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

Возможные значения для `field` соответствуют полям объекта [sale_order_property_value](../data-types.md).

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

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["code","id","name","orderId","orderPropsId","orderPropsXmlId","value"],"filter":{"=code":"FIO","%value":"Борис",">orderId":1600},"order":{"orderId":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertyvalue.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["code","id","name","orderId","orderPropsId","orderPropsXmlId","value"],"filter":{"=code":"FIO","%value":"Борис",">orderId":1600},"order":{"orderId":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyvalue.list
    ```

- JS

    ```js
    BX24.callMethod(
        "sale.propertyvalue.list", {
            "select": [
                "code",
                "id",
                "name",
                "orderId",
                "orderPropsId",
                "orderPropsXmlId",
                "value",
            ],
            "filter": {
                "=code": "FIO",
                "%value": "Борис",
                ">orderId": 1600,
            },
            "order": {
                "orderId": "desc",
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertyvalue.list',
        [
            'select' => [
                'code',
                'id',
                'name',
                'orderId',
                'orderPropsId',
                'orderPropsXmlId',
                'value',
            ],
            'filter' => [
                '=code' => 'FIO',
                '%value' => 'Борис',
                '>orderId' => 1600,
            ],
            'order' => [
                'orderId' => 'desc',
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
    "result":{
        "propertyValues":[
            {
                "code":"FIO",
                "id":10774,
                "name":"Имя Фамилия",
                "orderId":1650,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            },
            {
                "code":"FIO",
                "id":10763,
                "name":"Имя Фамилия",
                "orderId":1649,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            },
            {
                "code":"FIO",
                "id":10723,
                "name":"Имя Фамилия",
                "orderId":1641,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            },
            {
                "code":"FIO",
                "id":10718,
                "name":"Имя Фамилия",
                "orderId":1640,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            },
            {
                "code":"FIO",
                "id":10713,
                "name":"Имя Фамилия",
                "orderId":1639,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            },
            {
                "code":"FIO",
                "id":10708,
                "name":"Имя Фамилия",
                "orderId":1638,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            },
            {
                "code":"FIO",
                "id":10687,
                "name":"Имя Фамилия",
                "orderId":1634,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            },
            {
                "code":"FIO",
                "id":10517,
                "name":"Имя Фамилия",
                "orderId":1603,
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"Соколов Борис Викторович"
            }
        ]
    },
    "total":8,
    "time":{
        "start":1712061753.171393,
        "finish":1712061753.431631,
        "duration":0.2602381706237793,
        "processing":0.021820783615112305,
        "date_start":"2024-04-02T15:42:33+03:00",
        "date_finish":"2024-04-02T15:42:33+03:00"
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
[`sale_order_property_value[]`](../data-types.md) | Массив объектов с информацией о выбранных значениях свойств ||
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

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-value-modify.md)
- [{#T}](./sale-property-value-get.md)
- [{#T}](./sale-property-value-delete.md)
- [{#T}](./sale-property-value-get-fields.md)