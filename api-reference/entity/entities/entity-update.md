# Изменить параметры хранилища entity.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) на хранилище данных

Метод `entity.update` обновляет параметры хранилища данных приложения.

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
|| **NAME**
[`string`](../../data-types.md) | Новое название хранилища ||
|| **ENTITY_NEW**
[`string`](../../data-types.md) | Новый идентификатор хранилища.

Используется для переименования кода хранилища.

Разрешены только символы `a-z`, `A-Z`, `0-9`, `_`.

Максимальная длина рассчитывается динамически по формуле:
`50 - strlen("APP_<clientId>_")`. В большинстве случаев для Битрикс24 это 13 символов ||
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

Если передан другой уровень, такая запись права не будет добавлена

При передаче `ACCESS` текущему пользователю принудительно добавляется право `X` (`U<id>`) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример обновления хранилища, где:
- `ENTITY` — идентификатор текущего хранилища `dish`
- `NAME` — новое название `Dishes v2`
- `ENTITY_NEW` — новый код хранилища `dish_v2`
- `ACCESS` — права доступа: `U1` с уровнем `W` и `AU` с уровнем `R`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","NAME":"Dishes v2","ENTITY_NEW":"dish_v2","ACCESS":{"U1":"W","AU":"R"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.update',
    		{
    			ENTITY: 'dish',
    			NAME: 'Dishes v2',
    			ENTITY_NEW: 'dish_v2',
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
                'entity.update',
                [
                    'ENTITY' => 'dish',
                    'NAME' => 'Dishes v2',
                    'ENTITY_NEW' => 'dish_v2',
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
        echo 'Error updating entity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.update',
        {
            ENTITY: 'dish',
            NAME: 'Dishes v2',
            ENTITY_NEW: 'dish_v2',
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
        'entity.update',
        [
            'ENTITY' => 'dish',
            'NAME' => 'Dishes v2',
            'ENTITY_NEW' => 'dish_v2',
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
    "result": true,
    "time": {
        "start": 1774257803,
        "finish": 1774257803.550779,
        "duration": 0.5507791042327881,
        "processing": 0,
        "date_start": "2026-03-23T12:23:23+03:00",
        "date_finish": "2026-03-23T12:23:23+03:00",
        "operating_reset_at": 1774258403,
        "operating": 0.11757302284240723
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат выполнения метода. При успешном выполнении возвращается `true` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_ENTITY_ALREADY_EXISTS` | Entity already exists | Хранилище с `ENTITY_NEW` уже существует ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY_NEW` ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для изменения хранилища ||
|| `ERROR_CORE` | Internal error updating entity. Try updating again. | Внутренняя ошибка при обновлении хранилища ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-add.md)
- [{#T}](./entity-get.md)
- [{#T}](./entity-delete.md)
- [{#T}](./entity-rights.md)

