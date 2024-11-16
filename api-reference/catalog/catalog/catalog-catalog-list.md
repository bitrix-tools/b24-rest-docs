# Получить список торговых каталогов catalog.catalog.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список торговых каталогов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | 
Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_catalog](../data-types.md#catalog_catalog)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля торговых каталогов
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных записей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_catalog](../data-types.md#catalog_catalog). 

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
- `!` — не равно ||
|| **order**
[`object`](../../data-types.md) | 
Объект для сортировки выбранных торговых каталогов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_catalog](../data-types.md#catalog_catalog).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

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
    -d '{"select":["iblockId","iblockTypeId","id","lid","name","productIblockId","skuPropertyId","subscription","vatId"],"filter":{">id":10,"@vatId":[1,2],"skuPropertyId":121},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["iblockId","iblockTypeId","id","lid","name","productIblockId","skuPropertyId","subscription","vatId"],"filter":{">id":10,"@vatId":[1,2],"skuPropertyId":121},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.catalog.list
    ```

- JS

    ```js
    BX24.callMethod(
        "catalog.catalog.list", {
            "select": [
                "iblockId",
                "iblockTypeId",
                "id",
                "lid",
                "name",
                "productIblockId",
                "skuPropertyId",
                "subscription",
                "vatId"
            ],
            "filter": {
                ">id": 10,
                "@vatId": [1, 2],
                "skuPropertyId": 121,
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.catalog.list',
        [
            'select' => [
                'iblockId',
                'iblockTypeId',
                'id',
                'lid',
                'name',
                'productIblockId',
                'skuPropertyId',
                'subscription',
                'vatId'
            ],
            'filter' => [
                '>id' => 10,
                '@vatId' => [1, 2],
                'skuPropertyId' => 121,
            ],
            'order' => [
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
    "result": {
        "catalogs": [
            {
                "iblockId": 24,
                "iblockTypeId": 0,
                "id": 24,
                "lid": "s1",
                "name": "Товарный каталог CRM (предложения)",
                "productIblockId": 23,
                "skuPropertyId": 97,
                "subscription": "N",
                "vatId": 1
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1716796276.902035,
        "finish": 1716796277.31202,
        "duration": 0.4099850654602051,
        "processing": 0.01759815216064453,
        "date_start": "2024-05-27T10:51:16+03:00",
        "date_finish": "2024-05-27T10:51:17+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **catalogs**
[`catalog_catalog[]`](../data-types.md#catalog_catalog) | Массив объектов с информацией о выбранных торговых каталогах ||
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
|| `200040300010` | Недостаточно прав для чтения торговых каталогов
|| 
|| `200040300030` | Недостаточно прав для чтения торговых каталогов
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-get.md)
- [{#T}](./catalog-catalog-is-offers.md)
- [{#T}](./catalog-catalog-get-fields.md)