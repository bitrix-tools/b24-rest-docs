# Изменить свойство элементов хранилища entity.item.property.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) в хранилище данных

Метод `entity.item.property.update` изменяет свойство элементов хранилища данных приложения.

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
|| **PROPERTY**^*^
[`string`](../../../data-types.md) | Код существующего свойства, которое нужно изменить.

Получить код свойства можно методом [entity.item.property.get](./entity-item-property-get.md)||
|| **PROPERTY_NEW**
[`string`](../../../data-types.md) | Новый код свойства.

Разрешены символы `a-z`, `A-Z`, `0-9`, `_` ||
|| **NAME**
[`string`](../../../data-types.md) | Новое название свойства ||
|| **TYPE**
[`string`](../../../data-types.md) | Новый тип свойства:
- `S` — строка
- `N` — число
- `F` — файл ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки свойства ||
|#
## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример обновления свойства, где:
- `ENTITY` — идентификатор хранилища `dish`
- `PROPERTY` — исходный код свойства `new_prop`
- `PROPERTY_NEW` — новый код свойства `updated_prop`
- `NAME`, `SORT` — новые значения

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","PROPERTY":"new_prop","PROPERTY_NEW":"updated_prop","NAME":"Обновленное свойство","SORT":200,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.property.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.property.update',
    		{
    			ENTITY: 'dish',
    			PROPERTY: 'new_prop',
    			PROPERTY_NEW: 'updated_prop',
    			NAME: 'Обновленное свойство',
    			SORT: 200,
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
                'entity.item.property.update',
                [
                    'ENTITY' => 'dish',
                    'PROPERTY' => 'new_prop',
                    'PROPERTY_NEW' => 'updated_prop',
                    'NAME' => 'Обновленное свойство',
                    'SORT' => 200,
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
        echo 'Error updating entity item property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.update',
        {
            ENTITY: 'dish',
            PROPERTY: 'new_prop',
            PROPERTY_NEW: 'updated_prop',
            NAME: 'Обновленное свойство',
            SORT: 200,
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
        'entity.item.property.update',
        [
            'ENTITY' => 'dish',
            'PROPERTY' => 'new_prop',
            'PROPERTY_NEW' => 'updated_prop',
            'NAME' => 'Обновленное свойство',
            'SORT' => 200,
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
    "result": true,
    "time": {
        "start": 1774442553,
        "finish": 1774442553.149827,
        "duration": 0.1498270034790039,
        "processing": 0,
        "date_start": "2026-03-25T15:42:33+03:00",
        "date_finish": "2026-03-25T15:42:33+03:00",
        "operating_reset_at": 1774443153,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления свойства (`true` — успешно) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `ERROR_ARGUMENT` | Wrong entity item property type | Передан недопустимый тип `TYPE` ||
|| `ERROR_ARGUMENT` | Cannot change property type to File | Попытка изменить тип свойства на `F` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_PROPERTY_NOT_FOUND` | Property not found | Свойство с переданным `PROPERTY` не найдено ||
|| `ERROR_PROPERTY_ALREADY_EXISTS` | Property <PROPERTY_NEW> already exists | Свойство с кодом `PROPERTY_NEW` уже существует ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для изменения свойства ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|| `ERROR_CORE` | Internal error updating entity property. Try updating again. | Внутренняя ошибка при обновлении свойства ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-property-get.md)
- [{#T}](./entity-item-property-add.md)
- [{#T}](./entity-item-property-delete.md)
- [{#T}](./index.md)

