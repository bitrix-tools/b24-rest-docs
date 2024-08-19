# Получить список секций торгового каталога

> Название метода: **catalog.section.list**
>
> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.section.list` позволяет получить список секций торгового каталога. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите поля объекта [catalog_section](../data-types.md#catalog_section)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля секции каталога. ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных выбранных секций каталога в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_section](../data-types.md#catalog_section).

**Поле `iblockId` является обязательным**.

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

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` - не равно ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных секций каталога в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_section](../data-types.md#catalog_section).

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
    -d '{
        "select": ["id", "name", "sort"],
        "filter": {
            "iblockId": 14,
            "<=sort": 100
        },
        "order": {
            "sort": "DESC"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.section.list
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "select": ["id", "name", "sort"],
        "filter": {
            "iblockId": 14,
            "<=sort": 100
        },
        "order": {
            "sort": "DESC"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/catalog.section.list
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.section.list', 
        {
            select: ["id", "name", "sort"],
            filter: {
                'iblockId': 14,
                '<=sort': 100
            },
            order: {'sort': 'DESC'}
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.section.list',
        [
            'select' => ["id", "name", "sort"],
            'filter' => [
                'iblockId' => 14,
                '<=sort' => 100
            ],
            'order' => [
                'sort' => 'DESC'
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
    "sections": [
        {
            "id": 13,
            "name": "Товары",
            "sort": 500
        },
        {
            "id": 14,
            "name": "Услуги",
            "sort": 500
        },
        {
            "id": 22,
            "name": "Обувь",
            "sort": 50
        }
    ],
    "total": 3,
    "time": {
        "start": 1712326352.63409,
        "finish": 1712326352.8319,
        "duration": 0.197818040847778,
        "processing": 0.00833678245544434,
        "date_start": "2024-04-05T16:12:32+02:00",
        "date_finish": "2024-04-05T16:12:32+02:00",
        "operating": 0
    }
}

```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **section**
[`catalog_section[]`](../data-types.md#catalog_section) | Массив объектов с информацией о выбранных секциях каталога ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300030,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300030` | Недостаточно прав для чтения секции каталога ||
|| `0` | Не переданы обязательные поля структуры `filter` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-section-add.md)
- [{#T}](./catalog-section-update.md)
- [{#T}](./catalog-section-get.md)
- [{#T}](./catalog-section-delete.md)
- [{#T}](./catalog-section-get-fields.md)