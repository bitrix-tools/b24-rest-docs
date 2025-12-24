# Получить список товаров в документах складского учета catalog.document.element.list

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом «Просмотр каталога товаров»

Метод `catalog.document.element.list` возвращает позиции товаров, связанные с документами складского учета. Записи автоматически ограничиваются доступными типами документов и правами пользователя на склады.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) |  Массив со списком полей [catalog_document_element](../../data-types.md#catalog_document_element), которые необходимо выбрать ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных записей товаров в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_document_element](../../data-types.md#catalog_document_element).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно,
- `>` — больше,
- `<=` — меньше либо равно,
- `<` — меньше,
- `@` — IN, в качестве значения передается массив,
- `!@` — NOT IN, в качестве значения передается массив,
- `=` — равно, точное совпадение, используется по умолчанию,
- `!=` — не равно,
- `!` — не равно
||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных записей товаров в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_document_element](../../data-types.md#catalog_document_element).

Возможные значения для `order`:
- `asc` — в порядке возрастания,
- `desc` — в порядке убывания 
||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docId","elementId","amount","storeFrom","storeTo"],"filter":{"docId":64},"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.element.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docId","elementId","amount","storeFrom","storeTo"],"filter":{"docId":64},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.element.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'catalog.document.element.list',
        {
        select: [
            'id',
            'docId',
            'elementId',
            'amount',
            'storeFrom',
            'storeTo'
        ],
        filter: {
            docId: 64
        },
        order: {
            id: 'ASC'
        }
        },
        (progress) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора.
    // Используйте для больших объемов данных для эффективного потребления памяти.

    try {
    const generator = $b24.fetchListMethod('catalog.document.element.list', {
        select: [
        'id',
        'docId',
        'elementId',
        'amount',
        'storeFrom',
        'storeTo'
        ],
        filter: {
        docId: 64
        },
        order: {
        id: 'ASC'
        }
    }, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start.
    // Используйте для точного контроля над пакетами запросов.
    // Для больших данных менее эффективен, чем fetchListMethod.

    try {
    const response = await $b24.callMethod('catalog.document.element.list', {
        select: [
        'id',
        'docId',
        'elementId',
        'amount',
        'storeFrom',
        'storeTo'
        ],
        filter: {
        docId: 64
        },
        order: {
        id: 'ASC'
        }
    }, 0);
    const result = response.getData().result || [];
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
                'catalog.document.element.list',
                [
                    'select' => [
                        'id',
                        'docId',
                        'elementId',
                        'amount',
                        'storeFrom',
                        'storeTo',
                        'purchasingPrice'
                    ],
                    'filter' => [
                        'docId' => 64
                    ],
                    'order' => [
                        'id' => 'ASC'
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        $result->next();

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching document elements: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.element.list',
        {
            select: [
                'id',
                'docId',
                'elementId',
                'amount',
                'storeFrom',
                'storeTo'
            ],
            filter: {
                docId: 64
            },
            order: {
                id: 'ASC'
            }
        },
        function(result)
        {
            if (result.error())
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
        'catalog.document.element.list',
        [
            'select' => [
                'id',
                'docId',
                'elementId',
                'amount',
                'storeFrom',
                'storeTo'
            ],
            'filter' => [
                'docId' => 64
            ],
            'order' => [
                'id' => 'ASC'
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
        "documentElements": [
            {
                "amount": 5,
                "docId": 64,
                "elementId": 312,
                "id": 148,
                "purchasingPrice": 1180,
                "storeFrom": null,
                "storeTo": 2
            },
            {
                "amount": 12,
                "docId": 64,
                "elementId": 420,
                "id": 149,
                "purchasingPrice": 560,
                "storeFrom": null,
                "storeTo": 2
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1759482402.511337,
        "finish": 1759482402.642843,
        "duration": 0.13150620460510254,
        "processing": 0.02694106101989746,
        "date_start": "2025-11-02T12:26:42+03:00",
        "date_finish": "2025-11-02T12:26:42+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **documentElement**
[`catalog_document_element[]`](../../data-types.md#catalog_document_element) | Объект с информацией о товарах документа, структура ответа зависит от параметра `select` ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество записей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_DOCUMENT_RIGHTS",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_DOCUMENT_RIGHTS` | Access denied | Недостаточно прав на чтение ||
|| `0` |  | Прочие ошибки обработки ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-document-element-get-fields.md)
- [{#T}](./catalog-document-element-add.md)
- [{#T}](./catalog-document-element-update.md)
- [{#T}](./catalog-document-element-delete.md)
