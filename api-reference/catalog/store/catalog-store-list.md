# Получить список складов по фильтру catalog.store.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список складов по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select** 
[`array`](../../data-types.md)| Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_store](../data-types.md#catalog_store)) 
||
|| **filter** 
[`object`](../../data-types.md)| Объект для фильтрации выбранных складов в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_store](../data-types.md#catalog_store).

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
[`object`](../../data-types.md)| Объект для сортировки выбранных складов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_store](../data-types.md#catalog_store).

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
    -d '{"select":["id","title","active","address","description","gpsN","gpsS","imageId","dateModify","dateCreate","userId","modifiedBy","phone","schedule","xmlId","sort","email","issuingCenter","code"],"filter":{"@userId":[1,2],"<sort":200,"modifiedBy":1},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.store.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","active","address","description","gpsN","gpsS","imageId","dateModify","dateCreate","userId","modifiedBy","phone","schedule","xmlId","sort","email","issuingCenter","code"],"filter":{"@userId":[1,2],"<sort":200,"modifiedBy":1},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.store.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const selectFields = [
        'id',
        'title',
        'active',
        'address',
        'description',
        'gpsN',
        'gpsS',
        'imageId',
        'dateModify',
        'dateCreate',
        'userId',
        'modifiedBy',
        'phone',
        'schedule',
        'xmlId',
        'sort',
        'email',
        'issuingCenter',
        'code',
    ];
    
    try {
        const response = await $b24.callListMethod(
            'catalog.store.list',
            {
                select: selectFields,
                filter: {
                    '@userId': [1, 2],
                    '<sort': 200,
                    'modifiedBy': 1,
                },
                order: {
                    id: 'desc',
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
        const generator = $b24.fetchListMethod('catalog.store.list', {
            select: selectFields,
            filter: {
                '@userId': [1, 2],
                '<sort': 200,
                'modifiedBy': 1,
            },
            order: {
                id: 'desc',
            },
        }, 'id');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity); }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
        const response = await $b24.callMethod('catalog.store.list', {
            select: selectFields,
            filter: {
                '@userId': [1, 2],
                '<sort': 200,
                'modifiedBy': 1,
            },
            order: {
                id: 'desc',
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
                'catalog.store.list',
                [
                    'select' => [
                        'id',
                        'title',
                        'active',
                        'address',
                        'description',
                        'gpsN',
                        'gpsS',
                        'imageId',
                        'dateModify',
                        'dateCreate',
                        'userId',
                        'modifiedBy',
                        'phone',
                        'schedule',
                        'xmlId',
                        'sort',
                        'email',
                        'issuingCenter',
                        'code',
                    ],
                    'filter' => [
                        '@userId'    => [1, 2],
                        '<sort'      => 200,
                        'modifiedBy' => 1,
                    ],
                    'order'  => [
                        'id' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching store list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.store.list',
            {
                select:[
                    'id',
                    'title',
                    'active',
                    'address',
                    'description',
                    'gpsN',
                    'gpsS',
                    'imageId',
                    'dateModify',
                    'dateCreate',
                    'userId',
                    'modifiedBy',
                    'phone',
                    'schedule',
                    'xmlId',
                    'sort',
                    'email',
                    'issuingCenter',
                    'code',
                ],
                filter:{
                    '@userId': [1, 2],
                    '<sort': 200,
                    'modifiedBy': 1,
                },
                order:{
                    id: 'desc',
                },
            },
            function(result)
            {
                if(result.error()) {
                    console.error(result.error());
                } else {
                    console.log(result.data());
                }
            }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.store.list',
        [
            'select' => [
                'id',
                'title',
                'active',
                'address',
                'description',
                'gpsN',
                'gpsS',
                'imageId',
                'dateModify',
                'dateCreate',
                'userId',
                'modifiedBy',
                'phone',
                'schedule',
                'xmlId',
                'sort',
                'email',
                'issuingCenter',
                'code',
            ],
            'filter' => [
                '@userId' => [1, 2],
                '<sort' => 200,
                'modifiedBy' => 1,
            ],
            'order' => [
                'id' => 'desc',
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
        "stores": [
            {
                "active": "Y",
                "address": "пр. Московский д. 52",
                "code": "store_1",
                "dateCreate": "2024-10-18T16:30:45+03:00",
                "dateModify": "2024-10-21T14:29:06+03:00",
                "description": "Описание",
                "email": "test@test.ru",
                "gpsN": 54.71411,
                "gpsS": 21.56675,
                "id": 1,
                "imageId": {
                    "id": 1,
                    "url": "\/upload\/iblock\/6f1\/bkm7jmwso31wisk423gtp28iagy2e8v0\/test.jpeg"
                },
                "issuingCenter": "N",
                "modifiedBy": 1,
                "phone": "8 (495) 212 85 06",
                "schedule": "Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00",
                "sort": 100,
                "title": "Склад 1",
                "userId": 1,
                "xmlId": null
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1729524388.951684,
        "finish": 1729524389.466658,
        "duration": 0.5149741172790527,
        "processing": 0.04066300392150879,
        "date_start": "2024-10-21T18:26:28+03:00",
        "date_finish": "2024-10-21T18:26:29+03:00",
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **stores**
[`catalog_store[]`](../data-types.md#catalog_store) | Массив объектов с информацией о выбранных складах ||
|| **total**
[`integer`](../../data-types.md#time) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения ||
|| `0` | Другие ошибки (например, фатальные ошибки) || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-store-add.md)
- [{#T}](./catalog-store-update.md)
- [{#T}](./catalog-store-get.md)
- [{#T}](./catalog-store-delete.md)
- [{#T}](./catalog-store-get-fields.md)
