# Получить список привязок типов цен к группам покупателей catalog.priceTypeGroup.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление типами цен»

Метод `catalog.priceTypeGroup.list` возвращает список привязок типов цен к группам покупателей.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md)| Массив со списком полей [catalog_price_type_group](../../data-types.md#catalog_price_type_group), которые необходимо выбрать.

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля привязки
||
|| **filter**
[`object`](../../data-types.md)| Объект для фильтрации выбранных привязок в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_price_type_group](../../data-types.md#catalog_price_type_group).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Если условия фильтра не соответствуют ни одной записи, метод вернет пустой список
||
|| **order**
[`object`](../../data-types.md)| Объект для сортировки выбранных привязок в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_price_type_group](../../data-types.md#catalog_price_type_group).

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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","catalogGroupId","groupId","access"],"filter":{"catalogGroupId":9,"groupId":23},"order":{"id":"ASC"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.priceTypeGroup.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","catalogGroupId","groupId","access"],"filter":{"catalogGroupId":9,"groupId":23},"order":{"id":"ASC"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeGroup.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    const parameters = {
        select: ['id', 'catalogGroupId', 'groupId', 'access'],
        filter: { 'catalogGroupId': 9, 'groupId': 23 },
        order: { 'id': 'ASC' }
    };
    
    try {
        const response = await $b24.callListMethod(
            'catalog.priceTypeGroup.list',
            parameters,
            (progress) => { console.log('Progress:', progress) }
        );
        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    const parameters = {
        select: ['id', 'catalogGroupId', 'groupId', 'access'],
        filter: { 'catalogGroupId': 9, 'groupId': 23 },
        order: { 'id': 'ASC' }
    };
    
    try {
        const generator = $b24.fetchListMethod('catalog.priceTypeGroup.list', parameters, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity); }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    const parameters = {
        select: ['id', 'catalogGroupId', 'groupId', 'access'],
        filter: { 'catalogGroupId': 9, 'groupId': 23 },
        order: { 'id': 'ASC' }
    };
    
    try {
        const response = await $b24.callMethod('catalog.priceTypeGroup.list', parameters, 0);
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
                'catalog.priceTypeGroup.list',
                [
                    'select' => ['id', 'catalogGroupId', 'groupId', 'access'],
                    'filter' => [
                        'catalogGroupId' => 9,
                        'groupId' => 23
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
        echo 'Error listing price type groups: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeGroup.list',
        {
            select: ['id', 'catalogGroupId', 'groupId', 'access'],
            filter: {
                catalogGroupId: 9,
                groupId: 23
            },
            order: {
                id: 'ASC'
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
        'catalog.priceTypeGroup.list',
        [
            'select' => ['id', 'catalogGroupId', 'groupId', 'access'],
            'filter' => [
                'catalogGroupId' => 9,
                'groupId' => 23
            ],
            'order' => [
                'id' => 'ASC'
            ],
            'start' => 0
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
        "priceTypeGroups": [
            {
                "access": "Y",
                "catalogGroupId": 9,
                "groupId": 23,
                "id": 109
            },
            {
                "access": "N",
                "catalogGroupId": 9,
                "groupId": 23,
                "id": 111
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1774259997,
        "finish": 1774259997.152525,
        "duration": 0.1525249481201172,
        "processing": 0,
        "date_start": "2026-03-23T12:59:57+03:00",
        "date_finish": "2026-03-23T12:59:57+03:00",
        "operating_reset_at": 1774260597,
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
|| **priceTypeGroups**
[`catalog_price_type_group[]`](../../data-types.md#catalog_price_type_group) | Массив объектов с информацией о выбранных привязках типов цен к группам покупателей, структура зависит от параметра `select` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300010` | Access Denied | Недостаточно прав на просмотр каталога ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-group-add.md)
- [{#T}](./catalog-price-type-group-delete.md)
- [{#T}](./catalog-price-type-group-get-fields.md)

