# Получить параметры хранилища или список хранилищ entity.get

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь при авторизации приложения

Метод `entity.get` возвращает параметры указанного хранилища или список всех хранилищ приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**
[`string`](../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища.

Если параметр передан, метод возвращает данные только этого хранилища.

Разрешены символы `a-z`, `A-Z`, `0-9`, `_` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения параметров конкретного хранилища, где `ENTITY` — идентификатор `dish_v2`.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish_v2","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.get',
    		{
    			ENTITY: 'dish_v2',
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
                'entity.get',
                [
                    'ENTITY' => 'dish_v2',
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
        echo 'Error getting entity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.get',
        {
            ENTITY: 'dish_v2',
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
        'entity.get',
        [
            'ENTITY' => 'dish_v2',
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
        "ID": "183",
        "IBLOCK_TYPE_ID": "rest_entity",
        "ENTITY": "dish_v2",
        "NAME": "Dishes v2"
    },
    "time": {
        "start": 1774270219,
        "finish": 1774270219.086362,
        "duration": 0.08636188507080078,
        "processing": 0,
        "date_start": "2026-03-23T15:50:19+03:00",
        "date_finish": "2026-03-23T15:50:19+03:00",
        "operating_reset_at": 1774270819,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`result`](#result) | Корневой элемент ответа. Содержит объект хранилища или список хранилищ ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| `object`
[`entity`](#entity) | Возвращается, если передан параметр `ENTITY` ||
|| [`entity[]`](#entity) | Возвращается, если параметр `ENTITY` не передан ||
|#

#### Тип entity {#entity}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор хранилища ||
|| **IBLOCK_TYPE_ID**
[`string`](../../data-types.md) | Идентификатор типа хранилища ||
|| **ENTITY**
[`string`](../../data-types.md) | Идентификатор хранилища, переданный приложением ||
|| **NAME**
[`string`](../../data-types.md) | Название хранилища ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ENTITY_NOT_FOUND",
    "error_description": "Entity not found"
}
```

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Entity code is too long. Max length is 13 characters.",
    "argument": ""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` передан, но пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is 13 characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-add.md)
- [{#T}](./entity-update.md)
- [{#T}](./entity-delete.md)
- [{#T}](./entity-rights.md)
