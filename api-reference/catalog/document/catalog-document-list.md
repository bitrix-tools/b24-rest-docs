# Получить список документов складского учета catalog.document.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.document.list` возвращает постраничный список документов складского учета. По умолчанию к запросу добавляются фильтры, ограничивающие выборку доступными типами документов и правами текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив со списком полей [catalog_document](../data-types.md#catalog_document), которые необходимо выбрать.

Если массив не передан или передан пустой массив, то будут выбраны все доступные поля документа ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных документов в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_document](../data-types.md#catalog_document).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `=` — точное совпадение
- `!=`, `!` — не равно
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `=` — равно, точное совпадение, используется по умолчанию
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных документов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_document](../data-types.md#catalog_document).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания 

По умолчанию документы упорядочены по возрастанию `id` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы. 
Или передавайте значение из ключа `next` ответа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
          "select": ["id","docType","docNumber","title","status","dateDocument","total"],
          "filter": {">=dateCreate":"2025-10-01T00:00:00+03:00","<=dateCreate":"2025-10-15T23:59:59+03:00"},
          "order":  {"id":"ASC"},
          "start": 50
        }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
          "select": ["id","docType","docNumber","title","status","dateDocument","total"],
          "filter": {">=dateCreate":"2025-10-01T00:00:00+03:00","<=dateCreate":"2025-10-15T23:59:59+03:00"},
          "order":  {"id":"ASC"},
          "start": 50,
          "auth":  "**put_access_token_here**"
        }' \
    https://**put_your_bitrix24_address**/rest/catalog.document.list
    ```

- JS

    ```javascript
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'catalog.document.list',
        {
        select: ['id', 'docType', 'title', 'status'],
        filter: { '>=dateCreate': '2025-10-01T00:00:00+03:00', '<=dateCreate': '2025-10-15T23:59:59+03:00' },
        order: { id: 'ASC' }
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
    const generator = $b24.fetchListMethod('catalog.document.list', {
        select: ['id', 'docType', 'title', 'status'],
        filter: { '>=dateCreate': '2025-10-01T00:00:00+03:00', '<=dateCreate': '2025-10-15T23:59:59+03:00' },
        order: { id: 'ASC' },
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
    const response = await $b24.callMethod('catalog.document.list', {
        select: ['id', 'docType', 'title', 'status'],
        filter: { '>=dateCreate': '2025-10-01T00:00:00+03:00', '<=dateCreate': '2025-10-15T23:59:59+03:00' },
        order: { id: 'ASC' },
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
                'catalog.document.list',
                [
                    'select' => ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
                    'filter' => [
                        '>=dateCreate' => '2025-10-01T00:00:00+03:00',
                        '<=dateCreate' => '2025-10-15T23:59:59+03:00',
                    ],
                    'order'  => ['ID' => 'ASC'],
                    'start'  => 50, // значение next из предыдущего ответа
                ]
            );

        $payload = $response
            ->getResponseData()
            ->getResult();

        print_r($payload['documents']);

        $next = $response
            ->getResponseData()
            ->getNext();

        echo PHP_EOL . 'next: ' . ($next ?? 'null');
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error loading documents: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.list',
        {
            select: ['id', 'docType', 'title', 'status'],
            filter: { '>=dateCreate': '2025-10-01T00:00:00+03:00', '<=dateCreate': '2025-10-15T23:59:59+03:00' },
            order:  { id: 'ASC' },
            start:  '50'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
                return;
            }

            console.table(result.data().documents);

            if (result.more())
            {
                result.next(); // подставит значение из ответа в start и повторит запрос
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.document.list',
        [
            'select' => ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
            'filter' => [
                '>=dateCreate' => '2025-10-01T00:00:00+03:00',
                '<=dateCreate' => '2025-10-15T23:59:59+03:00',
            ],
            'order'  => ['ID' => 'ASC'],
            'start'  => 50,
        ]
    );

    echo '<PRE>';
    print_r($result['result']['documents']);
    echo PHP_EOL . 'next: ' . ($result['next'] ?? 'null');
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "documents": [
            {
                "docType": "S",
                "id": 1,
                "status": "Y",
                "title": "Оприходование #2"
            },
            {
                "docType": "A",
                "id": 7,
                "status": "N",
                "title": "Тест рест"
            },
            // ...другие документы
            {
                "docType": "S",
                "id": 105,
                "status": "N",
                "title": "оприходование 10"
            }
        ]
    },
    "next": 50,
    "total": 143,
    "time": {
        "start": 1761914886,
        "finish": 1761914886.802491,
        "duration": 0.8024909496307373,
        "processing": 0,
        "date_start": "2025-10-31T15:48:06+03:00",
        "date_finish": "2025-10-31T15:48:06+03:00",
        "operating_reset_at": 1761915486,
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
|| **documents**
[`catalog_document[]`](../data-types.md#catalog_document) | Список документов, структура ответа зависит от параметра `select` ||
|| **next**
[`integer`](../../data-types.md) | Указатель смещения для следующей страницы. Передайте значение в параметр `start`, чтобы получить следующие 50 записей ||
|| **total**
[`integer`](../../data-types.md) | Общее количество документов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Недостаточно прав для сохранения документа"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Недостаточно прав для сохранения документа | У пользователя нет права на просмотр ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-update.md)
- [{#T}](./document-element/catalog-document-element-list.md)
- [{#T}](../documentcontractor/catalog-documentcontractor-list.md)

