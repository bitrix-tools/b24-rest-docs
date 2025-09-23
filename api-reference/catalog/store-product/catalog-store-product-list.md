# Получить список остатков по складам по фильтру catalog.storeproduct.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.storeproduct.list` возвращает список остатков товаров по складам по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select** 
[`array`](../../data-types.md)| Массив со списком полей [catalog_storeproduct](../data-types.md#catalog_storeproduct), которые необходимо выбрать.

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля остатков
||
|| **filter** 
[`object`](../../data-types.md)| Объект для фильтрации выбранных остатков товаров по складам в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_storeproduct](../data-types.md#catalog_storeproduct).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `=` — равно, точное совпадение, фильтр по умолчанию
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md)| Объект для сортировки выбранных остатков в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_storeproduct](../data-types.md#catalog_storeproduct).

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
    -d '{"select":["id","productId","storeId","amount"],"filter":{"productId":6973},"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.storeproduct.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","storeId","amount"],"filter":{"productId":6973},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.storeproduct.list
    ```

- JS
  
    ```javascript
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'catalog.storeproduct.list',
        {
        select: [
            'id',
            'productId',
            'storeId',
            'amount'
        ],
        filter: {
            'productId': 6973
        },
        order: {
            'id': 'ASC'
        }
        },
        (progress: number) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора.
    // Используйте для больших объемов данных для эффективного потребления памяти.

    try {
    const generator = $b24.fetchListMethod('catalog.storeproduct.list', {
        select: [
        'id',
        'productId',
        'storeId',
        'amount'
        ],
        filter: {
        'productId': 6973
        },
        order: {
        'id': 'ASC'
        }
    }, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start.
    // Используйте для точного контроля над пакетами запросов.
    // Для больших данных менее эффективен, чем fetchListMethod.

    try {
    const response = await $b24.callMethod('catalog.storeproduct.list', {
        select: [
        'id',
        'productId',
        'storeId',
        'amount'
        ],
        filter: {
        'productId': 6973
        },
        order: {
        'id': 'ASC'
        }
    }, 0);
    const result = response.getData().result || [];
    for (const entity of result) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.storeproduct.list',
                [
                    'select' => [
                        'id',
                        'productId',
                        'storeId',
                        'amount'
                    ],
                    'filter' => [
                        'productId' => 6973
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
        echo 'Error fetching store products: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.storeproduct.list',
        {
            select:[
                'id',
                'productId',
                'storeId',
                'amount'
            ],
            filter:{
                'productId': 6973
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
        'catalog.storeproduct.list',
        [
            'select' => [
                'id',
                'productId',
                'storeId',
                'amount'
            ],
            'filter' => [
                'productId' => 6973
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
    "result": {
        "storeProducts": [
            {
                "amount": 54,
                "id": 11,
                "productId": 6973,
                "storeId": 1
            },
            {
                "amount": 14,
                "id": 13,
                "productId": 6973,
                "storeId": 11
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1758089258.945514,
        "finish": 1758089258.976911,
        "duration": 0.031397104263305664,
        "processing": 0.003245115280151367,
        "date_start": "2025-09-17T09:07:38+03:00",
        "date_finish": "2025-09-17T09:07:38+03:00",
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
|| **storeProducts**
[`catalog_storeproduct[]`](../data-types.md#catalog_storeproduct) | Массив объектов с информацией о выбранных остатках товаров по складам, структура зависит от параметра `select` ||
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
|| **Код** | **Описание** | **Значение** ||
|| `200040300010` | Access Denied | Недостаточно прав для чтения ||
|| `0` | | Другие ошибки || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-product-get.md)
- [{#T}](./catalog-store-product-get-fields.md)