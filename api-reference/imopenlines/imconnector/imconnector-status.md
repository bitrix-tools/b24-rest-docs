# Получить статус коннектора imconnector.status

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.status` возвращает текущий статус коннектора для указанной открытой линии.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %} 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONNECTOR***
[`string`](../../data-types.md) | Строковый код коннектора, который задали в параметре `ID` при вызове [imconnector.register](./imconnector-register.md) ||
|| **LINE**
[`string`](../../data-types.md) | Идентификатор открытой линии ||
|#

Если параметр `LINE` не передан, метод автоматически использует значение `0`. Это влияет на результат проверки:
- для настоящего идентификатора линии коннектор может быть активен и настроен,
- с `LINE=0` метод обычно возвращает `CONFIGURED=false` и `STATUS=false`, даже если коннектор работает для других линий.

Для получения корректного статуса всегда указывайте идентификатор открытой линии.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CONNECTOR":"myconnector","LINE":"12","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imconnector.status
    ```

- JS

    ```js
    const response = await $b24.callMethod('imconnector.status', {
      CONNECTOR: 'myconnector',
      LINE: '12',
    });
    console.log(response.getData());
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.status',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => '12',
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.status',
      {
        CONNECTOR: 'myconnector',
        LINE: '12',
      },
      function(result) {
        console.log(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.status',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => '12',
        ]
    );
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "LINE": 12,
        "CONNECTOR": "myconnector",
        "ERROR": false,
        "CONFIGURED": true,
        "STATUS": true
    },
    "time": {
        "start": 1738065600.11,
        "finish": 1738065600.18,
        "duration": 0.07,
        "processing": 0.03,
        "date_start": "2025-01-28T12:00:00+00:00",
        "date_finish": "2025-01-28T12:00:00+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **LINE**
[`integer`](../../data-types.md) | Идентификатор открытой линии ||
|| **CONNECTOR**
[`string`](../../data-types.md) | Идентификатор коннектора ||
|| **ERROR**
[`boolean`](../../data-types.md) | Признак ошибки состояния коннектора ||
|| **CONFIGURED**
[`boolean`](../../data-types.md) | Признак завершенной настройки коннектора ||
|| **STATUS**
[`boolean`](../../data-types.md) | Итоговый статус доступности коннектора ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CONNECTOR",
    "error_description": "Argument 'CONNECTOR' is null or empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|| `400` | `CONNECTOR` | Argument 'CONNECTOR' is null or empty | Не передан идентификатор коннектора `CONNECTOR` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
