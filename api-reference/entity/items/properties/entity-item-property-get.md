# Получить свойства элементов хранилища entity.item.property.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, авторизованный в приложении

Метод `entity.item.property.get` возвращает свойства элементов хранилища данных приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища.

Получить идентификатор можно методом [entity.get](../../entities/entity-get.md) ||
|| **PROPERTY**
[`string`](../../../data-types.md) | Код свойства.

Если параметр не передан, метод возвращает список всех свойств хранилища.

Разрешены символы `a-z`, `A-Z`, `0-9`, `_` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения списка свойств элементов, где `ENTITY` — идентификатор хранилища `dish`.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.property.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.property.get',
    		{
    			ENTITY: 'dish',
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
                'entity.item.property.get',
                [
                    'ENTITY' => 'dish',
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
        echo 'Error getting entity item properties: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.get',
        {
            ENTITY: 'dish',
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
        'entity.item.property.get',
        [
            'ENTITY' => 'dish',
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
            "PROPERTY": "test",
            "NAME": "Тестовое свойство",
            "TYPE": "S",
            "SORT": "100"
        },
        {
            "PROPERTY": "test1",
            "NAME": "Второе свойство",
            "TYPE": "N",
            "SORT": "200"
        }
    ],
    "time": {
        "start": 1774439396,
        "finish": 1774439396.082458,
        "duration": 0.0824580192565918,
        "processing": 0,
        "date_start": "2026-03-25T14:49:56+03:00",
        "date_finish": "2026-03-25T14:49:56+03:00",
        "operating_reset_at": 1774439996,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`result`](#result) | Корневой элемент ответа. Содержит объект свойства или массив свойств ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| `object`
[`property`](#property) | Возвращается, если передан параметр `PROPERTY` ||
|| [`property[]`](#property) | Возвращается, если параметр `PROPERTY` не передан ||
|#

#### Тип property {#property}

#|
|| **Название**
`тип` | **Описание** ||
|| **PROPERTY**
[`string`](../../../data-types.md) | Код свойства ||
|| **NAME**
[`string`](../../../data-types.md) | Название свойства ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип свойства (`S`, `N`, `F`) ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки свойства ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_PROPERTY_NOT_FOUND",
    "error_description": "Property not found"
}
```

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```
{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_PROPERTY_NOT_FOUND` | Property not found | Свойство с переданным `PROPERTY` не найдено ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-property-add.md)
- [{#T}](./entity-item-property-update.md)
- [{#T}](./entity-item-property-delete.md)
- [{#T}](./index.md)
