# Установить настройки коннектора imconnector.connector.data.set

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.connector.data.set` устанавливает настройки канала во внешней системе для пользовательского коннектора и указанной открытой линии.

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
|| **LINE***
[`integer`](../../data-types.md) | Идентификатор открытой линии. 

Идентификатор можно получить методами [imopenlines.config.get](../openlines/imopenlines-config-get.md) и [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md) ||
|| **DATA***
[`object`](../../data-types.md) | Объект настроек канала во внешней системе. Метод не поддерживает отдельную установку или изменение одного поля: настройки записываются и перезаписываются через этот объект целиком. 

Структура объекта подробно описана [ниже](#data) ||
|#

### Параметр DATA {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор канала во внешней системе, например `channel-123`. 

Идентификатор нужно взять из внешней системы. Если готового нет, используйте уникальный ключ, например, комбинацию ID коннектора и линии: `myconnector_line107` ||
|| **URL**
[`string`](../../data-types.md) | Полная ссылка на чат или канал во внешней системе ||
|| **URL_IM**
[`string`](../../data-types.md) | Полная ссылка на чат в формате для интерфейса оператора. Если отдельной ссылки для оператора нет, используйте значение `URL` ||
|| **NAME**
[`string`](../../data-types.md) | Название канала для отображения в интерфейсе ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONNECTOR":"myconnector",
        "LINE":107,
        "DATA":{
          "ID":"channel-123",
          "URL":"https://example.ru/chats/123",
          "NAME":"Канал поддержки"
        },
        "auth":"**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imconnector.connector.data.set
    ```

- JS

    ```js
    const response = await $b24.callMethod('imconnector.connector.data.set', {
      CONNECTOR: 'myconnector',
      LINE: 107,
      DATA: {
        ID: 'channel-123',
        URL: 'https://example.ru/chats/123',
        NAME: 'Канал поддержки',
      },
    });
    console.log(response.getData());
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.connector.data.set',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'DATA' => [
                'ID' => 'channel-123',
                'URL' => 'https://example.ru/chats/123',
                'NAME' => 'Канал поддержки',
            ],
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.connector.data.set',
      {
        CONNECTOR: 'myconnector',
        LINE: 107,
        DATA: {
          ID: 'channel-123',
          URL: 'https://example.ru/chats/123',
          NAME: 'Канал поддержки',
        },
      },
      function(result) {
        console.log(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.connector.data.set',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'DATA' => [
                'ID' => 'channel-123',
                'URL' => 'https://example.ru/chats/123',
                'NAME' => 'Канал поддержки',
            ],
        ]
    );
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
    "start": 1738065600.11,
    "finish": 1738065600.20,
    "duration": 0.09,
    "processing": 0.04,
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
[`boolean`](../../data-types.md) | `true`, если данные сохранены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'DATA' is null or empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|| `400` | `ERROR_ARGUMENT` | Argument 'CONNECTOR' is null or empty | Не передан `CONNECTOR` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'LINE' is null or empty | Не передан `LINE` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'DATA' is null or empty | Не передан `DATA` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
- [{#T}](../../../tutorials/openlines/example-connector.md)
