# Получить список доступных событий events

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Кто может выполнять метод: любой пользователь

Метод `events` возвращает коды событий Битрикс24. По этому списку приложение выбирает, на какие события подписаться методом [event.bind](./event-bind.md). Какие события попадут в список, зависит от параметров `SCOPE` и `FULL`.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Через вебхук он вернет ошибку `WRONG_AUTH_TYPE`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SCOPE**
[`string`](../data-types.md) | [Scope](../scopes/permissions.md), события которого нужно получить, например `crm` или `user`. Метод вернет события только этого scope, даже если у приложения нет такого разрешения.

Если передать пустую строку, метод вернет только общие события приложения. Для неизвестного scope метод вернет пустой массив без ошибки ||
|| **FULL**
[`boolean`](../data-types.md) | Если передать `true`, метод вернет все события Битрикс24 независимо от разрешений приложения.

Параметр не работает, если передан `SCOPE`, даже пустой ||
|#

Если не передать параметры, метод вернет события из scope приложения и общие события, которые доступны любому приложению: например, [ONAPPINSTALL](../common/events/on-app-install.md) и [ONOFFLINEEVENT](./on-offline-event.md).

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    Пример №1

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "SCOPE": "user",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/events
    ```

    Пример №2

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "FULL": true,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/events
    ```

- BX24.js

    Пример №1

    ```js
    BX24.callMethod(
        "events",
        {
            "SCOPE": "user"
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

    Пример №2

    ```js
    BX24.callMethod(
        "events",
        {
            "FULL": true
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- Python

    Пример №1

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.events(
            scope="user",
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

    Пример №2

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.events(
            full=True,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP CRest

    Пример №1

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'events',
        [
            'SCOPE' => 'user'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

    Пример №2

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'events',
        [
            'FULL' => true
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Ответ на первый пример — запрос с `SCOPE: "user"`:

```json
{
    "result": [
        "ONUSERADD"
    ],
    "time": {
        "start": 1790304784,
        "finish": 1790304784.638336,
        "duration": 0.6383359432220459,
        "processing": 0,
        "date_start": "2026-09-25T05:53:04+03:00",
        "date_finish": "2026-09-25T05:53:04+03:00",
        "operating_reset_at": 1790305384,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив строк — символьных кодов событий в верхнем регистре, например `ONCRMDEALADD`. Код передают в параметре `event` метода [event.bind](./event-bind.md).

Какие коды попадут в массив, зависит от параметров `SCOPE` и `FULL` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Сообщение об ошибке** | **Описание** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не из приложения, например через вебхук ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
