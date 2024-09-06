# Получить список групп свойств sale.propertygroup.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод предназначен для получения списка групп свойств.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [sale_order_property_group](../data-types.md)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля групп свойств
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных групп свойств в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_property_group](../data-types.md). 

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
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
[`object`](../../data-types.md) | Объект для сортировки выбранных групп свойств в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_property_group](../data-types.md).

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
    -d '{"select":["id","name","personTypeId","sort"],"filter":{">=id":14},"order":{"name":"asc","id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertygroup.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","personTypeId","sort"],"filter":{">=id":14},"order":{"name":"asc","id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertygroup.list
    ```

- JS

    ```js
    BX24.callMethod(
        "sale.propertygroup.list", {
            "select": ["id", "name", "personTypeId", "sort"],
            "filter": {
                ">=id": 14,
            },
            "order": {
                "name": "asc",
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertygroup.list',
        [
            'select' => ['id', 'name', 'personTypeId', 'sort'],
            'filter' => ['>=id' => 14],
            'order' => [
                'name' => 'asc',
                'id' => 'desc',
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
        "propertyGroups":[
            {
                "id":18,
                "name":"Новая группа свойств 2",
                "personTypeId":3,
                "sort":100
            },
            {
                "id":14,
                "name":"Новая группа свойств 1",
                "personTypeId":3,
                "sort":100
            }
        ]
    },
    "total":2,
    "time":{
        "start":1711544498.747502,
        "finish":1711544498.987554,
        "duration":0.2400519847869873,
        "processing":0.010115861892700195,
        "date_start":"2024-03-27T16:01:38+03:00",
        "date_finish":"2024-03-27T16:01:38+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyGroups**
[`sale_order_property_group[]`](../data-types.md) | Массив объектов с информацией о выбранных группах свойств ||
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
|| `200040300010` | Недостаточно прав для чтения групп свойств ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-group-add.md)
- [{#T}](./sale-property-group-update.md)
- [{#T}](./sale-property-group-get.md)
- [{#T}](./sale-property-group-delete.md)
- [{#T}](./sale-property-group-get-fields.md)