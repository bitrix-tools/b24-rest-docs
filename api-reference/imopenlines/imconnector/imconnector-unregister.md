# Отменить регистрацию коннектора imconnector.unregister

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.unregister` удаляет пользовательский коннектор.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %} 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`string`](../../data-types.md) | Идентификатор коннектора, который был передан при регистрации в [imconnector.register](./imconnector-register.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":"myconnector","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imconnector.unregister
    ```

- JS

    ```js
    const response = await $b24.callMethod('imconnector.unregister', {
      ID: 'myconnector',
    });
    console.log(response.getData());
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.unregister',
        [
            'ID' => 'myconnector',
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imconnector.unregister',
        {
          ID: 'myconnector',
        },
        function(result) {
          console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.unregister',
        [
            'ID' => 'myconnector',
        ]
    );
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
    "result": true
    },
    "time": {
    "start": 1738065600.11,
    "finish": 1738065600.25,
    "duration": 0.14,
    "processing": 0.06,
    "date_start": "2025-01-28T12:00:00+00:00",
    "date_finish": "2025-01-28T12:00:00+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если регистрация коннектора снята ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

В методе возможны два формата ошибок.

1. HTTP-статус: **200** с `result = false`

  ```json
    {
        "result": {
            "result": false,
            "error": "APPLICATION_UNREGISTRATION_ERROR",
            "error_description": "Ошибка снятия регистрации приложения"
        }
    }
  ```

2. HTTP-статус: **403** для системной ошибки авторизации

  ```json
    {
        "error": "WRONG_AUTH_TYPE",
        "error_description": "Current authorization type is denied for this method Application context required"
    }
  ```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `200` | `APPLICATION_UNREGISTRATION_ERROR` | Ошибка снятия регистрации приложения | Не удалось удалить коннектор по `ID` для текущего приложения ||
|| `200` | `NO_APPLICATION_ID` | Не удалось получить ID приложения | В контексте запроса не найдено приложение ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
