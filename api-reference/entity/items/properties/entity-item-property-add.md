# Добавить свойство элементов хранилища entity.item.property.add

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) в хранилище данных

Метод `entity.item.property.add` добавляет свойство элементов хранилища данных приложения.

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
[`string`](../../../data-types.md) | Код нового свойства.

Разрешены символы `a-z`, `A-Z`, `0-9`, `_` ||
|| **NAME**
[`string`](../../../data-types.md) | Название свойства ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип свойства:
- `S` — строка
- `N` — число
- `F` — файл ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример добавления свойства, где:
- `ENTITY` — идентификатор хранилища `dish`
- `PROPERTY` — код свойства `new_prop`
- `NAME` — название свойства
- `TYPE` — тип `S`
- `SORT` — индекс сортировки

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","PROPERTY":"new_prop","NAME":"Новое свойство","TYPE":"S","SORT":100,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.property.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.property.add',
    		{
    			ENTITY: 'dish',
    			PROPERTY: 'new_prop',
    			NAME: 'Новое свойство',
    			TYPE: 'S',
    			SORT: 100,
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
                'entity.item.property.add',
                [
                    'ENTITY' => 'dish',
                    'PROPERTY' => 'new_prop',
                    'NAME' => 'Новое свойство',
                    'TYPE' => 'S',
                    'SORT' => 100,
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
        echo 'Error adding entity item property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.add',
        {
            ENTITY: 'dish',
            PROPERTY: 'new_prop',
            NAME: 'Новое свойство',
            TYPE: 'S',
            SORT: 100,
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
        'entity.item.property.add',
        [
            'ENTITY' => 'dish',
            'PROPERTY' => 'new_prop',
            'NAME' => 'Новое свойство',
            'TYPE' => 'S',
            'SORT' => 100,
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
        "start": 1774440592,
        "finish": 1774440592.563202,
        "duration": 0.563201904296875,
        "processing": 0,
        "date_start": "2026-03-25T15:09:52+03:00",
        "date_finish": "2026-03-25T15:09:52+03:00",
        "operating_reset_at": 1774441192,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат добавления свойства (`true` — успешно) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_PROPERTY_ALREADY_EXISTS",
    "error_description": "Property already exists"
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
|| `ERROR_ARGUMENT` | Argument 'PROPERTY' is null or empty | Параметр `PROPERTY` не передан ||
|| `ERROR_ARGUMENT` | Wrong entity item property type | Передан недопустимый тип `TYPE` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_PROPERTY_ALREADY_EXISTS` | Property already exists | Свойство с переданным `PROPERTY` уже существует ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для добавления свойства ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|| `ERROR_UNSUPPORTED_PROPERTY_TYPE` | Недопустимый тип свойства | Попытка создать свойство с типом `L` ||
|| `ERROR_CORE` | Internal error adding entity property. Try adding again. | Внутренняя ошибка при добавлении свойства ||
|| `ERROR_CORE` | Код свойства не может начинаться с цифры | Передан некорректный код свойства в `PROPERTY` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-property-get.md)
- [{#T}](./entity-item-property-update.md)
- [{#T}](./entity-item-property-delete.md)
- [{#T}](./index.md)
