# Получить конфигурацию подключения к RT-серверам pull.application.config.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`pull`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователь авторизованный в приложении

Метод `pull.application.config.get` возвращает конфигурацию подключения к Push&Pull серверам для текущего приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CACHE**
[`string`](../../../api-reference/data-types.md) | Использовать кешированные данные:

- `Y` — использовать кеш
- `N` — не использовать кеш

Если параметр не передан, кеш используется ||
|| **REOPEN**
[`string`](../../../api-reference/data-types.md) | Обновлять каналы при истечении срока:

- `Y` — обновлять
- `N` — не обновлять

Если параметр не передан, обновление включено ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения конфигурации Push&Pull для приложения, где:
- `CACHE` — используется кешированные данных
- `REOPEN` — обновляет каналы

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "CACHE": "Y",
        "REOPEN": "Y",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/pull.application.config.get.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'pull.application.config.get',
    		{
    			CACHE: 'Y',
    			REOPEN: 'Y'
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
                'pull.application.config.get',
                [
                    'CACHE' => 'Y',
                    'REOPEN' => 'Y',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting pull config: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'pull.application.config.get',
        {
            CACHE: 'Y',
            REOPEN: 'Y'
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
        'pull.application.config.get',
        [
            'CACHE' => 'Y',
            'REOPEN' => 'Y',
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
        "server": {
            "version": 4,
            "server_enabled": true,
            "mode": "personal",
            "hostname": "your-portal.bitrix24.ru",
            "long_polling": "https://rtc-**.bitrix24.com/sub2/",
            "long_pooling_secure": "https://rtc-**.bitrix24.com/sub2/",
            "websocket_enabled": true,
            "websocket": "wss://rtc-**.bitrix24.com/subws2/",
            "websocket_secure": "wss://rtc-**.bitrix24.com/subws2/",
            "publish_enabled": true,
            "publish": "https://rtc-**.bitrix24.com/rest/",
            "publish_secure": "https://rtc-**.bitrix24.com/rest/",
            "config_timestamp": 1774886062
        },
        "api": {
            "revision_web": 19,
            "revision_mobile": 3
        },
        "channels": {
            "shared": {
                "id": "***masked***",
                "start": "2026-03-31T17:05:18+03:00",
                "end": "2026-04-01T05:05:23+03:00",
                "type": "shared"
            },
            "private": {
                "id": "***masked***",
                "public_id": "***masked***",
                "start": "2026-03-31T17:05:18+03:00",
                "end": "2026-04-01T05:05:23+03:00",
                "type": "private"
            }
        },
        "exp": 1775052318,
        "publicChannels": {
            "<user_id>": {
                "user_id": 577,
                "public_id": "***masked***",
                "signature": "***masked***",
                "start": "2026-03-31T10:06:39+03:00",
                "end": "2026-03-31T22:06:44+03:00"
            }
        }
    },
    "time": {
        "start": 1774965918,
        "finish": 1774965918.322255,
        "duration": 0.32225489616394043,
        "processing": 0,
        "date_start": "2026-03-31T17:05:18+03:00",
        "date_finish": "2026-03-31T17:05:18+03:00",
        "operating_reset_at": 1774966518,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../api-reference/data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — поле объекта `result`
- `value_n` — значение поля `result`

Поля объекта `result` смотрите в разделе [Тип result](#result-type).

Состав полей может отличаться и зависит от конфигурации Push&Pull сервера ||
|| **time**
[`time`](../../../api-reference/data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **server**
[`object`](../../../api-reference/data-types.md) | Параметры сервера Push&Pull [подробнее](#result-server-type) ||
|| **api**
[`object`](../../../api-reference/data-types.md) | Версии API Push&Pull:

- **revision_web** [`integer`](../../../api-reference/data-types.md) — версия web API
- **revision_mobile** [`integer`](../../../api-reference/data-types.md) — версия mobile API ||
|| **channels**
[`object`](../../../api-reference/data-types.md) | Каналы приложения.

Содержит два варианта канала: `shared` и `private`.

Описание полей канала смотрите в разделе [Тип канала shared/private](#result-channel-type) ||
|| **exp**
[`integer`](../../../api-reference/data-types.md) | Время истечения конфигурации в формате Unix timestamp ||
|| **publicChannels**
[`object`](../../../api-reference/data-types.md) | Публичные каналы пользователей в формате:

```
{
    "<user_id>": {
        "user_id": user_id,
        "public_id": "string",
        "signature": "string",
        "start": "datetime",
        "end": "datetime"
    }
}
```

где:
- `<user_id>` — идентификатор пользователя
- `user_id` — идентификатор пользователя
- `public_id` — публичный идентификатор канала
- `signature` — подпись канала
- `start` — время начала действия канала
- `end` — время окончания действия канала ||
|| **clientId**
[`string`](../../../api-reference/data-types.md) | Публичный идентификатор клиента.

Возвращается в shared-режиме сервера ||
|| **jwt**
[`string`](../../../api-reference/data-types.md) | JWT-токен для подключения.

Возвращается, если включена выдача JWT в конфигурации сервера ||
|#

### Тип server {#result-server-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **version**
[`integer`](../../../api-reference/data-types.md) | Версия Push&Pull сервера ||
|| **server_enabled**
[`boolean`](../../../api-reference/data-types.md) | Признак доступности сервера ||
|| **mode**
[`string`](../../../api-reference/data-types.md) | Режим сервера ||
|| **hostname**
[`string`](../../../api-reference/data-types.md) | Хост портала ||
|| **long_polling**
[`string`](../../../api-reference/data-types.md) | URL long polling ||
|| **long_pooling_secure**
[`string`](../../../api-reference/data-types.md) | URL long polling для защищенного соединения ||
|| **websocket_enabled**
[`boolean`](../../../api-reference/data-types.md) | Признак доступности websocket ||
|| **websocket**
[`string`](../../../api-reference/data-types.md) | URL websocket ||
|| **websocket_secure**
[`string`](../../../api-reference/data-types.md) | URL websocket для защищенного соединения ||
|| **publish_enabled**
[`boolean`](../../../api-reference/data-types.md) | Признак доступности publish API ||
|| **publish**
[`string`](../../../api-reference/data-types.md) | URL publish API ||
|| **publish_secure**
[`string`](../../../api-reference/data-types.md) | URL publish API для защищенного соединения ||
|| **config_timestamp**
[`integer`](../../../api-reference/data-types.md) | Метка версии конфигурации ||
|#

### Тип канала shared/private {#result-channel-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../api-reference/data-types.md) | Идентификатор канала ||
|| **public_id**
[`string`](../../../api-reference/data-types.md) \| [`null`](../../../api-reference/data-types.md) | Публичный идентификатор канала.

Для `shared` может отсутствовать ||
|| **start**
[`datetime`](../../../api-reference/data-types.md) | Время начала действия канала ||
|| **end**
[`datetime`](../../../api-reference/data-types.md) | Время окончания действия канала ||
|| **type**
[`string`](../../../api-reference/data-types.md) | Тип канала:

- `shared`
- `private` ||
  |#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Get access to application config available only for application authorization."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Get access to application config available only for application authorization. | Вызов метода не из контекста OAuth-приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../interactivity/index.md)
- [{#T}](./pull-application-event-add.md)
- [{#T}](./pull-application-push-add.md)
