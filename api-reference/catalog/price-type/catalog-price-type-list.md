# Получить список типов цен по фильтру catalog.priceType.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список типов цен по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select** 
[`array`](../../data-types.md)| Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_price_type](../data-types.md#catalog_price_type)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля типа цены
||
|| **filter** 
[`object`](../../data-types.md)| Объект для фильтрации выбранных типов цен в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_price_type](../data-types.md#catalog_price_type).

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
[`object`](../../data-types.md)| Объект для сортировки выбранных типов цен в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_price_type](../data-types.md#catalog_price_type).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start** 
[`integer`](../../data-types.md)| Параметр используется для управления постраничной навигацией.

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
    -d '{"select":["id","name","xmlId"],"filter":{"modifiedBy":1},"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.priceType.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","xmlId"],"filter":{"modifiedBy":1},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceType.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const parameters = {
        select: ['id', 'name', 'xmlId'],
        filter: { 'modifiedBy': 1 },
        order: { 'id': 'ASC' }
    };
    
    try {
        const response = await $b24.callListMethod(
            'catalog.priceType.list',
            parameters,
            (progress) => { console.log('Progress:', progress) }
        );
        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    const parameters = {
        select: ['id', 'name', 'xmlId'],
        filter: { 'modifiedBy': 1 },
        order: { 'id': 'ASC' }
    };
    
    try {
        const generator = $b24.fetchListMethod('catalog.priceType.list', parameters, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity); }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    const parameters = {
        select: ['id', 'name', 'xmlId'],
        filter: { 'modifiedBy': 1 },
        order: { 'id': 'ASC' }
    };
    
    try {
        const response = await $b24.callMethod('catalog.priceType.list', parameters, 0);
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
                'catalog.priceType.list',
                [
                    'select' => [
                        'id',
                        'name',
                        'xmlId'
                    ],
                    'filter' => [
                        'modifiedBy' => 1
                    ],
                    'order' => [
                        'id' => 'ASC'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        $result->next();
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching price types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceType.list',
        {
            select:[
                'id',
                'name',
                'xmlId'
            ],
            filter:{
                'modifiedBy': 1
            },
            order:{
                'id': 'ASC'
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
            result.next();
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.priceType.list',
        [
            'select' => [
                'id',
                'name',
                'xmlId'
            ],
            'filter' => [
                'modifiedBy' => 1
            ],
            'order' => [
                'id' => 'ASC'
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
    "priceTypes": [
        {
            "id": 1,
            "name": "BASE",
            "xmlId": "BASE"
        },
        {
            "id": 2,
            "name": "Base wholesale price",
            "xmlId": "basewholesale"
        }
    ],
    "total": 2,
    "time": {
        "start": 1712326352.63409,
        "finish": 1712326352.8319,
        "duration": 0.197818040847778,
        "processing": 0.00833678245544434,
        "date_start": "2024-04-05T16:24:46+02:00",
        "date_finish": "2024-04-05T16:24:46+02:00",
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
|| **priceTypes**
[`catalog_price_type[]`](../data-types.md#catalog_price_type) | Массив объектов с информацией о выбранных типах цен ||
|| **total**
[`integer`](../../data-types.md#time) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения
||
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-add.md)
- [{#T}](./catalog-price-type-update.md)
- [{#T}](./catalog-price-type-get.md)
- [{#T}](./catalog-price-type-delete.md)
- [{#T}](./catalog-price-type-get-fields.md)