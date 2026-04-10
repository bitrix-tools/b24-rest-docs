# Получить список элементов хранилища entity.item.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь авторизованный в приложении

Метод `entity.item.get` получает список элементов хранилища данных приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища.

Получить идентификатор можно методом [entity.get](../entities/entity-get.md) ||
|| **SORT**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — поле сортировки
- `value_n` — направление сортировки: `ASC` или `DESC`

Список доступных полей для сортировки смотрите в разделе [Тип item](#item).

По умолчанию используется `{"ID":"ASC"}` ||
|| **FILTER**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — поле фильтрации
- `value_n` — значение фильтра

Список доступных полей для фильтрации смотрите в разделе [Тип item](#item).

К ключам `field_n` можно добавлять префиксы:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `=` — равно (по умолчанию)
- `!=` или `!` — не равно
- `><` — диапазон
- `!><` — не в диапазоне
- `%` — LIKE
- `!%` — NOT LIKE
- `?` — проверка на `null`/`not null`||
|| **start**
[`integer`](../../data-types.md) | Параметр постраничной навигации.

Размер страницы фиксирован: `50` записей.

Формула для получения N-й страницы:
`start = (N - 1) * 50`

Подробнее в статье [Особенности списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения элементов хранилища, где:
- `ENTITY` — идентификатор хранилища `dish_v2`
- `SORT` — сортировка по дате активности и идентификатору
- `FILTER` — диапазон дат активности

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish_v2","SORT":{"DATE_ACTIVE_FROM":"ASC","ID":"ASC"},"FILTER":{">=DATE_ACTIVE_FROM":"2026-03-01T00:00:00+03:00","<DATE_ACTIVE_FROM":"2026-04-01T00:00:00+03:00"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.get',
    		{
    			ENTITY: 'dish_v2',
    			SORT: {
    				DATE_ACTIVE_FROM: 'ASC',
    				ID: 'ASC',
    			},
    			FILTER: {
    				'>=DATE_ACTIVE_FROM': '2026-03-01T00:00:00+03:00',
    				'<DATE_ACTIVE_FROM': '2026-04-01T00:00:00+03:00',
    			},
    			start: 0,
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.item.get',
                [
                    'ENTITY' => 'dish_v2',
                    'SORT' => [
                        'DATE_ACTIVE_FROM' => 'ASC',
                        'ID' => 'ASC',
                    ],
                    'FILTER' => [
                        '>=DATE_ACTIVE_FROM' => '2026-03-01T00:00:00+03:00',
                        '<DATE_ACTIVE_FROM' => '2026-04-01T00:00:00+03:00',
                    ],
                    'start' => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting entity items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.get',
        {
            ENTITY: 'dish_v2',
            SORT: {
                DATE_ACTIVE_FROM: 'ASC',
                ID: 'ASC',
            },
            FILTER: {
                '>=DATE_ACTIVE_FROM': '2026-03-01T00:00:00+03:00',
                '<DATE_ACTIVE_FROM': '2026-04-01T00:00:00+03:00',
            },
            start: 0,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'entity.item.get',
        [
            'ENTITY' => 'dish_v2',
            'SORT' => [
                'DATE_ACTIVE_FROM' => 'ASC',
                'ID' => 'ASC',
            ],
            'FILTER' => [
                '>=DATE_ACTIVE_FROM' => '2026-03-01T00:00:00+03:00',
                '<DATE_ACTIVE_FROM' => '2026-04-01T00:00:00+03:00',
            ],
            'start' => 0,
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
    "result": [
        {
            "ID": "2331",
            "TIMESTAMP_X": "2026-03-25T12:29:06+03:00",
            "MODIFIED_BY": "577",
            "DATE_CREATE": "2026-03-25T12:29:06+03:00",
            "CREATED_BY": "577",
            "ACTIVE": "Y",
            "DATE_ACTIVE_FROM": "",
            "DATE_ACTIVE_TO": "",
            "SORT": "500",
            "NAME": "Тестовый элемент",
            "PREVIEW_PICTURE": null,
            "PREVIEW_TEXT": null,
            "DETAIL_PICTURE": null,
            "DETAIL_TEXT": null,
            "CODE": null,
            "ENTITY": "dish",
            "SECTION": null
        }
    ],
    "total": 1,
    "time": {
        "start": 1774430946,
        "finish": 1774430946.627232,
        "duration": 0.6272320747375488,
        "processing": 0,
        "date_start": "2026-03-25T12:29:06+03:00",
        "date_finish": "2026-03-25T12:29:06+03:00",
        "operating_reset_at": 1774431546,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`item[]`](#item) | Список элементов хранилища ||
|| **total**
[`integer`](../../data-types.md) | Общее количество элементов в выборке ||
|| **next**
[`integer`](../../data-types.md) | Смещение для получения следующей страницы (если есть) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор элемента ||
|| **TIMESTAMP_X**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ||
|| **MODIFIED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего элемент ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего элемент ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности (`Y` или `N`) ||
|| **DATE_ACTIVE_FROM**
[`datetime`](../../data-types.md) \| [`string`](../../data-types.md) | Дата начала активности или пустая строка ||
|| **DATE_ACTIVE_TO**
[`datetime`](../../data-types.md) \| [`string`](../../data-types.md) | Дата окончания активности или пустая строка ||
|| **SORT**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **NAME**
[`string`](../../data-types.md) | Название элемента ||
|| **PREVIEW_PICTURE**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | URL картинки анонса ||
|| **PREVIEW_TEXT**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Текст анонса ||
|| **DETAIL_PICTURE**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | URL детальной картинки ||
|| **DETAIL_TEXT**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Детальный текст ||
|| **CODE**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Символьный код элемента ||
|| **ENTITY**
[`string`](../../data-types.md) | Идентификатор хранилища ||
|| **SECTION**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор раздела ||
|| **PROPERTY_VALUES**
[`object`](../../data-types.md) | Объект значений свойств в формате `{"CODE": value}`. Поле присутствует, если у хранилища есть свойства.

Список доступных кодов свойств можно получить методом [entity.item.property.get](./properties/entity-item-property-get.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```

```json
{
    "error": "ERROR_ENTITY_NOT_FOUND",
    "error_description": "Entity not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ARGUMENT` | Ошибки валидатора фильтра | Переданы невалидные значения параметра `FILTER` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-add.md)
- [{#T}](./entity-item-update.md)
- [{#T}](./entity-item-delete.md)
- [{#T}](./properties/index.md)
