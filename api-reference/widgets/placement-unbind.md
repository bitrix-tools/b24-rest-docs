# Удалить зарегистрированный обработчик места встраивания placement.unbind

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`placement`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, авторизованный в приложении

Метод `placement.unbind` удаляет зарегистрированный обработчик места встраивания.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT**^*^
[`string`](../data-types.md) | Идентификатор места встраивания.

`PLACEMENT` можно получить:
- методом [placement.list](./placement-list.md)
- методом [placement.get](./placement-get.md) в поле `placement` ||
|| **HANDLER**
[`string`](../data-types.md) | URL обработчика места встраивания.

`HANDLER` можно получить методом [placement.get](./placement-get.md) в поле `handler`.

Если параметр не передан или передан пустым, метод удаляет все обработчики указанного места встраивания, зарегистрированные приложением ||
|| **USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя Битрикс24, для которого был зарегистрирован обработчик.

`USER_ID` можно получить:
- методом [user.get](../user/user-get.md)
- методом [user.current](../user/user-current.md) для текущего пользователя

Если параметр передан, метод удаляет только обработчики указанного пользователя ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример удаления зарегистрированного обработчика места встраивания, где:
- `PLACEMENT` — идентификатор места встраивания
- `HANDLER` — URL обработчика места встраивания

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "PLACEMENT": "CRM_LEAD_DETAIL_TAB",
        "HANDLER": "https://www.myapplicationhost.com/placement/",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/placement.unbind.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.unbind',
    		{
    			PLACEMENT: 'CRM_LEAD_DETAIL_TAB',
    			HANDLER: 'https://www.myapplicationhost.com/placement/'
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.unbind',
                [
                    'PLACEMENT' => 'CRM_LEAD_DETAIL_TAB',
                    'HANDLER' => 'https://www.myapplicationhost.com/placement/',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unbinding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.unbind',
        {
            PLACEMENT: 'CRM_LEAD_DETAIL_TAB',
            HANDLER: 'https://www.myapplicationhost.com/placement/'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'placement.unbind',
        [
            'PLACEMENT' => 'CRM_LEAD_DETAIL_TAB',
            'HANDLER' => 'https://www.myapplicationhost.com/placement/',
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "count": 4
    },
    "time": {
        "start": 1775058296,
        "finish": 1775058296.998083,
        "duration": 0.9980831146240234,
        "processing": 0,
        "date_start": "2026-04-01T18:44:56+03:00",
        "date_finish": "2026-04-01T18:44:56+03:00",
        "operating_reset_at": 1775058896,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с результатом удаления:

- **count** [`integer`](../data-types.md) — число, которое метод увеличивает:
  - на `1` при каждой найденной записи обработчика перед вызовом удаления
  - еще на `1` после каждого успешного удаления ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Вызов метода не из контекста приложения ||
|| `403` | `ACCESS_DENIED` | Access denied! | Пользователь не является администратором ||
|| `400` | `ERROR_ARGUMENT` | Argument 'PLACEMENT' is null or empty | Не передан `PLACEMENT` или передано пустое значение ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument 'PLACEMENT' must be of type string | Параметр `PLACEMENT` передан не строкой ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./placements.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-get.md)
- [{#T}](./ui-interaction/index.md)
