# Получить список привязок поставщиков к документам catalog.documentcontractor.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами:
> — «Просмотр» на тип документа «Приход»,
> — «Просмотр раздела Складской учет»
> — «Просмотр каталога товаров»    

Метод `catalog.documentcontractor.list` возвращает список привязок поставщиков к документам складского учета. По умолчанию к запросу добавляются фильтры, ограничивающие выборку правами текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** || 
|| **select**
[`array`](../../data-types.md) | Массив со списком полей [catalog_documentcontractor](../data-types.md#catalog_documentcontractor), которые необходимо выбрать.

Если массив не передан или передан пустой массив, то будут выбраны все доступные поля документа ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных привязок в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_documentcontractor](../data-types.md#catalog_documentcontractor).

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

Возможные значения для `field` соответствуют полям объекта [catalog_documentcontractor](../data-types.md#catalog_documentcontractor).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания 

По умолчанию результаты упорядочены по возрастанию `id` ||
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
    -d '{"select":["id","documentId"],"filter":{"documentId":7},"order":{"id":"ASC"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.documentcontractor.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","documentId"],"filter":{"documentId":7},"order":{"id":"ASC"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.documentcontractor.list
    ```

- JS

    ```js  
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'catalog.documentcontractor.list',
        {
        select: ["id", "documentId"],
        filter: { "documentId": 7 },
        order: { "id": "ASC" },
        start: 0
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
    const generator = $b24.fetchListMethod('catalog.documentcontractor.list', {
        select: ["id", "documentId"],
        filter: { "documentId": 7 },
        order: { "id": "ASC" },
        start: 0
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
    const response = await $b24.callMethod('catalog.documentcontractor.list', {
        select: ["id", "documentId"],
        filter: { "documentId": 7 },
        order: { "id": "ASC" },
        start: 0
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
                'catalog.documentcontractor.list',
                [
                    'select' => ["id", "documentId"],
                    'filter' => ['documentId' => 7],
                    'order' => ['id' => 'ASC'],
                    'start' => 0
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.documentcontractor.list',
        {
            select: ["id", "documentId"],
            filter: { "documentId": 7 },
            order: { "id": "ASC" },
            start: 0
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
                
                // Если есть следующая страница
                if (result.more())
                {
                    console.log('Next page start: ' + result.next());
                }
            }
        }
    );
    ```	

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.documentcontractor.list',
        [
            'select' => ["id", "documentId"],
            'filter' => ['documentId' => 7],
            'order' => ['id' => 'ASC'],
            'start' => 0
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "documentContractor": [
        {
            "documentId": 7,
            "id": 5
        }
        ]
    },
    "total": 1,
    "time": {
        "start": 1766146580,
        "finish": 1766146580.866608,
        "duration": 0.8666079044342041,
        "processing": 0,
        "date_start": "2025-12-19T15:16:20+03:00",
        "date_finish": "2025-12-19T15:16:20+03:00",
        "operating_reset_at": 1766147180,
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
|| **documentContractor**
[`catalog_documentContractor[]`](../data-types.md#catalog_documentContractor) | Список привязок контрагентов, структура ответа зависит от параметра `select` || 
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
    "error_description": "Access denied"
}
```

### Возможные коды ошибок  

#|  
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied | Недостаточно прав для просмотра документа или привязок ||  
|| `0` | Contractors should be provided by CRM | Модуль CRM не активен как поставщик контрагентов ||  
|# 

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-documentcontractor-add.md)  
- [{#T}](./catalog-documentcontractor-delete.md)  
- [{#T}](./catalog-documentcontractor-get-fields.md)