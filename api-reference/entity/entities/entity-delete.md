# Удалить хранилище entity.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) на хранилище данных

Метод `entity.delete` удаляет хранилище данных приложения.

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
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример удаления хранилища, где `ENTITY` — идентификатор `dish_v2`.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish_v2","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.delete
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.delete',
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
                'entity.delete',
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
        echo 'Error deleting entity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.delete',
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
        'entity.delete',
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
    "result": true,
    "time": {
        "start": 1774271103,
        "finish": 1774271103.40342,
        "duration": 0.40341997146606445,
        "processing": 0,
        "date_start": "2026-03-23T16:05:03+03:00",
        "date_finish": "2026-03-23T16:05:03+03:00",
        "operating_reset_at": 1774271703,
        "operating": 0.13090085983276367
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат выполнения метода. Для успешного удаления возвращается `true` ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для удаления хранилища ||
|| `ERROR_CORE` | Internal error deleting entity. Try deleting again. | Внутренняя ошибка при удалении хранилища ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-add.md)
- [{#T}](./entity-update.md)
- [{#T}](./entity-get.md)
- [{#T}](./entity-rights.md)
