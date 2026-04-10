# Получить список разделов хранилища entity.section.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь при авторизации приложения

Метод `entity.section.get` получает список разделов хранилища данных приложения.

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

Список доступных полей для сортировки смотрите в разделе [Тип section](#section).

По умолчанию используется `{"ID":"ASC"}`.

Пример: `{"NAME":"ASC","ID":"DESC"}` ||
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

Список доступных полей для фильтрации смотрите в разделе [Тип section](#section).

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

Пример получения разделов хранилища, где:
- `ENTITY` — идентификатор хранилища `dish`
- `SORT` — сортировка по названию
- `FILTER` — только активные разделы

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","SORT":{"NAME":"ASC"},"FILTER":{"ACTIVE":"Y"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.section.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.section.get',
    		{
    			ENTITY: 'dish',
    			SORT: { NAME: 'ASC' },
    			FILTER: { ACTIVE: 'Y' },
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
                'entity.section.get',
                [
                    'ENTITY' => 'dish',
                    'SORT' => ['NAME' => 'ASC'],
                    'FILTER' => ['ACTIVE' => 'Y'],
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
        echo 'Error getting entity sections: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.section.get',
        {
            ENTITY: 'dish',
            SORT: { NAME: 'ASC' },
            FILTER: { ACTIVE: 'Y' },
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
        'entity.section.get',
        [
            'ENTITY' => 'dish',
            'SORT' => ['NAME' => 'ASC'],
            'FILTER' => ['ACTIVE' => 'Y'],
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
            "ID": "671",
            "CODE": null,
            "TIMESTAMP_X": "2026-03-23T17:15:51+03:00",
            "DATE_CREATE": "2026-03-23T17:15:51+03:00",
            "CREATED_BY": "577",
            "MODIFIED_BY": "577",
            "ACTIVE": "Y",
            "SORT": "500",
            "NAME": "Родительский раздел",
            "PICTURE": null,
            "DETAIL_PICTURE": null,
            "DESCRIPTION": null,
            "LEFT_MARGIN": "1",
            "RIGHT_MARGIN": "6",
            "DEPTH_LEVEL": "1",
            "ENTITY": "dish",
            "SECTION": null
        },
        {
            "ID": "669",
            "CODE": null,
            "TIMESTAMP_X": "2026-03-23T17:14:22+03:00",
            "DATE_CREATE": "2026-03-23T17:14:22+03:00",
            "CREATED_BY": "577",
            "MODIFIED_BY": "577",
            "ACTIVE": "Y",
            "SORT": "500",
            "NAME": "Тестовый раздел",
            "PICTURE": null,
            "DETAIL_PICTURE": null,
            "DESCRIPTION": null,
            "LEFT_MARGIN": "7",
            "RIGHT_MARGIN": "8",
            "DEPTH_LEVEL": "1",
            "ENTITY": "dish",
            "SECTION": null
        },
        {
            "ID": "673",
            "CODE": null,
            "TIMESTAMP_X": "2026-03-23T17:16:37+03:00",
            "DATE_CREATE": "2026-03-23T17:16:37+03:00",
            "CREATED_BY": "577",
            "MODIFIED_BY": "577",
            "ACTIVE": "Y",
            "SORT": "500",
            "NAME": "Тестовый раздел",
            "PICTURE": null,
            "DETAIL_PICTURE": null,
            "DESCRIPTION": null,
            "LEFT_MARGIN": "4",
            "RIGHT_MARGIN": "5",
            "DEPTH_LEVEL": "2",
            "ENTITY": "dish",
            "SECTION": "671"
        },
        {
            "ID": "675",
            "CODE": "testovyy-razdel",
            "TIMESTAMP_X": "2026-03-23T17:42:32+03:00",
            "DATE_CREATE": "2026-03-23T17:42:32+03:00",
            "CREATED_BY": "577",
            "MODIFIED_BY": "577",
            "ACTIVE": "Y",
            "SORT": "500",
            "NAME": "Тестовый раздел",
            "PICTURE": null,
            "DETAIL_PICTURE": null,
            "DESCRIPTION": "Описание тестового раздела",
            "LEFT_MARGIN": "2",
            "RIGHT_MARGIN": "3",
            "DEPTH_LEVEL": "2",
            "ENTITY": "dish",
            "SECTION": "671"
        }
    ],
    "total": 4,
    "time": {
        "start": 1774338416,
        "finish": 1774338416.415466,
        "duration": 0.4154660701751709,
        "processing": 0,
        "date_start": "2026-03-24T10:46:56+03:00",
        "date_finish": "2026-03-24T10:46:56+03:00",
        "operating_reset_at": 1774339016,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`section[]`](#section) | Список разделов хранилища ||
|| **total**
[`integer`](../../data-types.md) | Общее количество разделов в выборке ||
|| **next**
[`integer`](../../data-types.md) | Смещение для получения следующей страницы (если есть) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип section {#section}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор раздела ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код раздела ||
|| **TIMESTAMP_X**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего раздел ||
|| **MODIFIED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего раздел ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности (`Y` или `N`) ||
|| **SORT**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **NAME**
[`string`](../../data-types.md) | Название раздела ||
|| **PICTURE**
[`string`](../../data-types.md) | URL картинки раздела или `null` ||
|| **DETAIL_PICTURE**
[`string`](../../data-types.md) | URL детальной картинки раздела или `null` ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание раздела ||
|| **LEFT_MARGIN**
[`integer`](../../data-types.md) | Левая граница раздела в дереве ||
|| **RIGHT_MARGIN**
[`integer`](../../data-types.md) | Правая граница раздела в дереве ||
|| **DEPTH_LEVEL**
[`integer`](../../data-types.md) | Уровень вложенности раздела ||
|| **ENTITY**
[`string`](../../data-types.md) | Идентификатор хранилища ||
|| **SECTION**
[`integer`](../../data-types.md) | Идентификатор родительского раздела или `null` ||
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
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-section-add.md)
- [{#T}](./entity-section-update.md)
- [{#T}](./entity-section-delete.md)
- [{#T}](./index.md)
