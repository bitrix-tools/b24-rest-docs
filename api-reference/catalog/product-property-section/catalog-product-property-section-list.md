# Получить список секционных настроек свойств catalog.productPropertySection.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertySection.list` возвращает список секционных настроек свойств товаров и вариаций по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать.

Доступные поля:

- `displayExpanded` — отображается ли свойство развернутым в фильтре
- `displayType` — вид свойства в умном фильтре
- `filterHint` — подсказка в умном фильтре для посетителей
- `propertyId` — идентификатор свойства товара или вариации
- `smartFilter` — отображается ли свойство в умном фильтре

По умолчанию возвращаются все доступные поля ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных настроек в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property_section](../data-types.md#catalog_product_property_section).

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

Если `propertyId` не передан, метод выбирает секционные настройки всех свойств торговых каталогов. Если передан `propertyId`, который не существует или не относится к торговому каталогу, метод вернет пустой список ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных настроек в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property_section](../data-types.md#catalog_product_property_section).

Возможные значения для `order`:
- `ASC` — в порядке возрастания
- `DESC` — в порядке убывания

Если параметр не передан, применяется сортировка `propertyId ASC` ||
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
      -d '{"select":["propertyId","smartFilter","displayType","displayExpanded","filterHint"],"filter":{"propertyId":901},"order":{"propertyId":"ASC"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertySection.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["propertyId","smartFilter","displayType","displayExpanded","filterHint"],"filter":{"propertyId":901},"order":{"propertyId":"ASC"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertySection.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'catalog.productPropertySection.list',
        {
        select: ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
        filter: { propertyId: 901 },
        order: { propertyId: 'ASC' }
        },
        (progress: number) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.

    try {
    const generator = $b24.fetchListMethod('catalog.productPropertySection.list', {
        select: ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
        filter: { propertyId: 901 },
        order: { propertyId: 'ASC' }
    }, 'PROPERTY_ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.

    try {
    const response = await $b24.callMethod('catalog.productPropertySection.list', {
        select: ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
        filter: { propertyId: 901 },
        order: { propertyId: 'ASC' }
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
                'catalog.productPropertySection.list',
                [
                    'select' => ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
                    'filter' => [
                        'propertyId' => 901,
                    ],
                    'order' => ['propertyId' => 'ASC'],
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
        'catalog.productPropertySection.list',
        {
            select: ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
            filter: {
                propertyId: 901
            },
            order: { propertyId: 'ASC' }
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
        'catalog.productPropertySection.list',
        [
            'select' => ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
            'filter' => ['propertyId' => 901],
            'order' => ['propertyId' => 'ASC'],
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
        "productPropertySections": [
        {
            "displayExpanded": "N",
            "displayType": "F",
            "filterHint": "Подсказка для фильтра",
            "propertyId": 901,
            "smartFilter": "Y"
        }
        ]
    },
    "total": 1,
    "time": {
        "start": 1774266816,
        "finish": 1774266816.883621,
        "duration": 0.8836209774017334,
        "processing": 0,
        "date_start": "2026-03-23T14:53:36+03:00",
        "date_finish": "2026-03-23T14:53:36+03:00",
        "operating_reset_at": 1774267416,
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
|| **productPropertySections**
[`catalog_product_property_section[]`](../data-types.md#catalog_product_property_section) | Массив объектов секционных настроек свойства ||
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
    "error": "0",
    "error_description": "Access Denied"
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

- [{#T}](./catalog-product-property-section-set.md)
- [{#T}](./catalog-product-property-section-get.md)
