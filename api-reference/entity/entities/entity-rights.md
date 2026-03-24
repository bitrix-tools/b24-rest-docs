# Получить или изменить права доступа entity.rights

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - получить текущие права может любой пользователь
> - изменить права может пользователь с уровнем права `X` (управление) на хранилище данных

Метод `entity.rights` возвращает текущий набор прав доступа к хранилищу данных приложения.

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

Получить идентификатор можно методом [entity.get](./entity-get.md) ||
|| **ACCESS**
[`object`](../../data-types.md) | Новый набор прав в формате `{"код_доступа":"уровень_права"}`.

Примеры кодов доступа:
- `U<id>` — пользователь, например `U1`
- `G<id>` — группа пользователей, например `G2`
- `AU` — все авторизованные пользователи

Метод принимает стандартные коды доступа Битрикс24. Проверить название кода можно методом [access.name](../../common/system/access-name.md).

Поддерживаемые уровни:
- `R` — чтение
- `W` — запись
- `X` — управление

Если передан другой уровень, такая запись права не будет добавлена.

При передаче `ACCESS` текущему пользователю принудительно добавляется право `X` (`U<id>`). ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример изменения прав доступа, где:
- `ENTITY` — идентификатор хранилища `dish`
- `ACCESS` — новый набор прав: `U1` с уровнем `W` и `AU` с уровнем `R`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","ACCESS":{"U1":"W","AU":"R"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.rights
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.rights',
    		{
    			ENTITY: 'dish',
    			ACCESS: {
    				U1: 'W',
    				AU: 'R',
    			},
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
                'entity.rights',
                [
                    'ENTITY' => 'dish',
                    'ACCESS' => [
                        'U1' => 'W',
                        'AU' => 'R',
                    ],
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
        echo 'Error getting entity rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.rights',
        {
            ENTITY: 'dish',
            ACCESS: {
                U1: 'W',
                AU: 'R',
            },
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
        'entity.rights',
        [
            'ENTITY' => 'dish',
            'ACCESS' => [
                'U1' => 'W',
                'AU' => 'R',
            ],
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
        "U1": "W",
        "AU": "R",
        "U577": "X"
    },
    "time": {
        "start": 1774267885,
        "finish": 1774267885.803565,
        "duration": 0.8035650253295898,
        "processing": 0,
        "date_start": "2026-03-23T15:11:25+03:00",
        "date_finish": "2026-03-23T15:11:25+03:00",
        "operating_reset_at": 1774268485,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`result`](#result) | Корневой элемент ответа. Содержит права доступа к хранилищу ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
||
[`object`](../../data-types.md) | Объект прав доступа в формате `{"код_доступа":"уровень_права"}`, где уровень права — `R`, `W` или `X` ||
||
`null` | Возвращается, если хранилище с переданным `ENTITY` не найдено ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is 13 characters. | Слишком длинное значение `ENTITY` ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для изменения прав доступа хранилища ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-add.md)
- [{#T}](./entity-update.md)
- [{#T}](./entity-get.md)
- [{#T}](./entity-delete.md)
