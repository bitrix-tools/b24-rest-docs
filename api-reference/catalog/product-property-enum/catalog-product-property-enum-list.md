# Получить список значений списочных свойств catalog.productPropertyEnum.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertyEnum.list` возвращает список значений списочных свойств по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [catalog_product_property_enum](../data-types.md#catalog_product_property_enum)).

Если параметр не передан, будут выбраны все поля ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных значений в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property_enum](../data-types.md#catalog_product_property_enum).

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
  
Если `propertyId` не передан, метод выбирает значения всех списочных свойств торговых каталогов. Если передан `propertyId`, который не существует или не относится к торговому каталогу, метод вернет пустой список ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных значений в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property_enum](../data-types.md#catalog_product_property_enum).

Возможные значения для `order`:
- `ASC` — в порядке возрастания
- `DESC` — в порядке убывания

Если параметр не передан, применяется сортировка `id ASC` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — `100` и так далее.

Формула расчета значения параметра `start`: `start = (N - 1) * 50`, где `N` — номер нужной страницы.

Если передать значение `-1`, в ответе не будет поля `total` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["id","propertyId","value","def","sort","xmlId"],"filter":{"propertyId":431},"order":{"id":"ASC"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyEnum.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["id","propertyId","value","def","sort","xmlId"],"filter":{"propertyId":431},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyEnum.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.

    try {
        const response = await $b24.callListMethod(
            'catalog.productPropertyEnum.list',
            {
                select: ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
                filter: { propertyId: 431 },
                order: { id: 'ASC' }
            },
            (progress) => { console.log('Progress:', progress) }
        );
        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
        console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.

    try {
        const generator = $b24.fetchListMethod('catalog.productPropertyEnum.list', {
            select: ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
            filter: { propertyId: 431 },
            order: { id: 'ASC' }
        }, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity) }
        }
    } catch (error) {
        console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.

    try {
        const response = await $b24.callMethod('catalog.productPropertyEnum.list', {
            select: ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
            filter: { propertyId: 431 },
            order: { id: 'ASC' }
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
                'catalog.productPropertyEnum.list',
                [
                    'select' => ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
                    'filter' => [
                        'propertyId' => 431,
                    ],
                    'order' => ['id' => 'ASC'],
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productPropertyEnum.list',
        {
            select: ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
            filter: {
                propertyId: 431
            },
            order: { id: 'ASC' }
        },
        function(result) {
            if (result.error()) {
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
        'catalog.productPropertyEnum.list',
        [
            'select' => ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
            'filter' => ['propertyId' => 431],
            'order' => ['id' => 'ASC'],
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "productPropertyEnums": [
        {
            "def": "N",
            "id": 433,
            "propertyId": 431,
            "sort": 500,
            "value": "первое",
            "xmlId": "1"
        },
        {
            "def": "N",
            "id": 435,
            "propertyId": 431,
            "sort": 500,
            "value": "второе",
            "xmlId": "2"
        },
        {
            "def": "N",
            "id": 437,
            "propertyId": 431,
            "sort": 500,
            "value": "третье",
            "xmlId": "3"
        },
        {
            "def": "N",
            "id": 439,
            "propertyId": 431,
            "sort": 500,
            "value": "четвертое",
            "xmlId": "4"
        },
        {
            "def": "N",
            "id": 441,
            "propertyId": 431,
            "sort": 500,
            "value": "пятое",
            "xmlId": "5"
        }
        ]
    },
    "total": 5,
    "time": {
        "start": 1774339997,
        "finish": 1774339997.456867,
        "duration": 0.456866979598999,
        "processing": 0,
        "date_start": "2026-03-24T11:13:17+03:00",
        "date_finish": "2026-03-24T11:13:17+03:00",
        "operating_reset_at": 1774340597,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа ||
|| **productPropertyEnums**
[`catalog_product_property_enum[]`](../data-types.md#catalog_product_property_enum) | Массив объектов с информацией о выбранных значениях списочных свойств ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value string to match with parameter filter. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для просмотра каталога ||
|| `100` | Invalid value {wrong_type} to match with parameter {filter}. Should be value of type array. | Неверный тип данных у значения параметра `filter` ||
|| `100` | Invalid value {wrong_type} to match with parameter {select}. Should be value of type array. | Неверный тип данных у значения параметра `select` ||
|| `100` | Invalid value {wrong_type} to match with parameter {order}. Should be value of type array. | Неверный тип данных у значения параметра `order` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-add.md)
- [{#T}](./catalog-product-property-enum-update.md)
- [{#T}](./catalog-product-property-enum-get.md)
- [{#T}](./catalog-product-property-enum-delete.md)
- [{#T}](./catalog-product-property-enum-get-fields.md)
