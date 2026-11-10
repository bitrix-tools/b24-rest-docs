# Получить конфигурацию подключения к серверам Push&Pull pull.application.config.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`pull`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, авторизованный в приложении

Метод `pull.application.config.get` возвращает конфигурацию подключения к серверам Push&Pull для текущего приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../app-installation/index.md). Запрос выполняется с OAuth-токеном приложения и scope `pull`, а вебхук такой контекст не создает.

{% endnote %}

По ответу метода клиент собирает адрес подключения. Адрес сервера берется из `server.websocket_secure` или `server.long_pooling_secure`, а идентификаторы каналов — из `channels.private.id` и `channels.shared.id`, и подставляются в адрес именно в этом порядке. Как из них собрать адрес вручную, описано в статье [{#T}](./custom-push-and-pull-client.md); в браузере это делает штатный клиент — [{#T}](./push-and-pull-in-browser.md).

Конфигурация персональна: `channels.private` и `publicChannels` принадлежат тому пользователю, чьим токеном выполнен запрос. Одну конфигурацию нельзя раздать нескольким пользователям — запрашивайте ее для каждого отдельно.

Отслеживайте время `end` каждого канала и поле `exp` в ответе. Когда срок истекает, запрашивайте конфигурацию заново. Если поля `exp` в ответе нет, ориентируйтесь на `end` канала.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

Обязательных параметров у метода нет.

#|
|| **Название**
`тип` | **Описание** ||
|| **CACHE**
[`string`](../../api-reference/data-types.md) | Признак использования кеша:

- `N` — не использовать кеш
- любое другое значение — использовать кеш

По умолчанию — использовать кеш.

В текущей версии Битрикс24 параметр на выдачу конфигурации не влияет: кеш используется всегда ||
|| **REOPEN**
[`string`](../../api-reference/data-types.md) | Признак выдачи нового канала, если срок действия текущего истек:

- `N` — не выдавать
- любое другое значение — выдавать

По умолчанию — выдавать.

В текущей версии Битрикс24 параметр на выдачу конфигурации не влияет: канал с истекшим сроком выдается заново всегда ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример получения конфигурации Push&Pull для приложения. Метод вызывается без параметров.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/pull.application.config.get.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<Record<string, any>>({
        method: 'pull.application.config.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Push&Pull config:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getApplicationPullConfig() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'pull.application.config.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Push&Pull config:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getApplicationPullConfig)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.pull.application.config.get().response
        print(bitrix_response.result)
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

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call('pull.application.config.get');

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
        {},
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
    $result = CRest::call('pull.application.config.get');

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
            "577": {
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

Если Битрикс24 работает на общем сервере Push&Pull, в `result` дополнительно приходит `clientId`. В примере показаны только отличия от ответа выше:

```json
{
    "result": {
        "server": {
            "mode": "shared",
            "version": 4
        },
        "clientId": "***masked***"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../api-reference/data-types.md) | Объект формата:

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

Поля объекта `result` — [(подробное описание)](#result) ||
|| **time**
[`time`](../../api-reference/data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

Состав полей зависит от настроек сервера Push&Pull — поля `exp`, `clientId` и `jwt` приходят не всегда.

#|
|| **Название**
`тип` | **Описание** ||
|| **server**
[`object`](../../api-reference/data-types.md) | Параметры сервера Push&Pull [подробнее](#result-server-type) ||
|| **api**
[`object`](../../api-reference/data-types.md) | Ревизии протокола Push&Pull. По ним клиент проверяет, совместима ли его версия библиотеки с сервером:

- **revision_web** [`integer`](../../api-reference/data-types.md) — ревизия для браузерного клиента
- **revision_mobile** [`integer`](../../api-reference/data-types.md) — ревизия для мобильного клиента ||
|| **channels**
[`object`](../../api-reference/data-types.md) | Каналы приложения.

Содержит два канала: `shared` — общий канал приложения, `private` — личный канал пользователя, от чьего имени выполнен запрос.

Поля канала — [(подробное описание)](#result-channel-type). Порядок, в котором идентификаторы каналов подставляют в адрес подключения, описан в статье [{#T}](./custom-push-and-pull-client.md) ||
|| **exp**
[`integer`](../../api-reference/data-types.md) | Срок действия конфигурации в формате Unix timestamp. В облачном Битрикс24 конфигурация действует 24 часа с момента запроса.

В коробочной версии поле приходит, если администратор задал этот срок. При версии сервера 5 и выше поле приходит всегда и совпадает со сроком действия `jwt` ||
|| **publicChannels**
[`object`](../../api-reference/data-types.md) \| [`boolean`](../../api-reference/data-types.md) | Публичный идентификатор личного канала текущего пользователя. Это канал пользователя в Битрикс24, а не канал приложения.

Если версия сервера Push&Pull ниже 4, поле приходит со значением `false`.

Формат:

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
- `<user_id>` — ключ объекта, идентификатор пользователя
- **user_id** [`integer`](../../api-reference/data-types.md) — идентификатор пользователя внутри объекта канала
- **public_id** [`string`](../../api-reference/data-types.md) — публичный идентификатор канала
- **signature** [`string`](../../api-reference/data-types.md) — подпись канала
- **start** [`datetime`](../../api-reference/data-types.md) — время выдачи канала
- **end** [`datetime`](../../api-reference/data-types.md) — время окончания работы канала ||
|| **clientId**
[`string`](../../api-reference/data-types.md) | Публичный идентификатор Битрикс24 на общем сервере Push&Pull.

Возвращается, когда `server.mode` равен `shared`. В этом случае добавьте `clientId` в адрес подключения к серверу — [{#T}](./custom-push-and-pull-client.md) ||
|| **jwt**
[`string`](../../api-reference/data-types.md) | Токен JWT для подключения к серверу. Когда он есть, каналы уже зашиты в токен и `CHANNEL_ID` в адрес подключения не передают — [{#T}](./custom-push-and-pull-client.md).

Возвращается, когда `server.version` равен 5 или выше. На общем сервере Push&Pull токен не выдается, поэтому `jwt` и `clientId` в одном ответе не встречаются ||
|#

##### Объект server {#result-server-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **version**
[`integer`](../../api-reference/data-types.md) | Версия сервера Push&Pull. От нее зависят протокол подключения и формат работы с историей канала — подробности в статье [Собственный Push&Pull клиент](./custom-push-and-pull-client.md).

В режиме `shared` версия всегда равна 4. В режиме `personal` значение задает администратор, по умолчанию — 2 ||
|| **server_enabled**
[`boolean`](../../api-reference/data-types.md) | Признак доступности сервера. Если значение `false`, подключаться не к чему — Push&Pull в этом Битрикс24 не настроен ||
|| **mode**
[`string`](../../api-reference/data-types.md) | Режим сервера:

- `personal` — собственный сервер Push&Pull
- `shared` — общий сервер Push&Pull ||
|| **hostname**
[`string`](../../api-reference/data-types.md) | Домен Битрикс24 ||
|| **long_polling**
[`string`](../../api-reference/data-types.md) | URL long polling ||
|| **long_pooling_secure**
[`string`](../../api-reference/data-types.md) | URL long polling для защищенного соединения.

Имя поля приходит из API с опечаткой — `pooling` вместо `polling`. Читайте его как есть, иначе разбор ответа сломается ||
|| **websocket_enabled**
[`boolean`](../../api-reference/data-types.md) | Признак доступности websocket. Если значение `false`, подключайтесь по long polling ||
|| **websocket**
[`string`](../../api-reference/data-types.md) | URL websocket ||
|| **websocket_secure**
[`string`](../../api-reference/data-types.md) | URL websocket для защищенного соединения.

Параметры подключения передаются в адресе, поэтому подключайтесь по защищенному адресу. На общем сервере Push&Pull `websocket` и `websocket_secure` совпадают, на собственном их задает администратор ||
|| **publish_enabled**
[`boolean`](../../api-reference/data-types.md) | Признак доступности publish API ||
|| **publish**
[`string`](../../api-reference/data-types.md) | URL publish API ||
|| **publish_secure**
[`string`](../../api-reference/data-types.md) | URL publish API для защищенного соединения ||
|| **config_timestamp**
[`integer`](../../api-reference/data-types.md) | Метка версии конфигурации ||
|#

##### Объект канала shared и private {#result-channel-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../api-reference/data-types.md) | Идентификатор канала ||
|| **public_id**
[`string`](../../api-reference/data-types.md) | Публичный идентификатор канала.

У канала `shared` поле не возвращается. У канала `private` поле приходит пустой строкой, если версия сервера Push&Pull 3 или ниже ||
|| **start**
[`datetime`](../../api-reference/data-types.md) | Время выдачи канала ||
|| **end**
[`datetime`](../../api-reference/data-types.md) | Время окончания работы канала — через 12 часов после выдачи ||
|| **type**
[`string`](../../api-reference/data-types.md) | Тип канала:

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

HTTP-статус: **500**

```json
{
    "error": "SERVER_ERROR",
    "error_description": "Push & Pull server is not configured"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Get access to application config available only for application authorization. | Вызов метода не из контекста приложения, например, через вебхук ||
|| `500` | `SERVER_ERROR` | Push & Pull server is not configured | Сервер Push&Pull не настроен или выключен в Битрикс24 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./push-and-pull-in-browser.md)
- [{#T}](./custom-push-and-pull-client.md)
- [{#T}](./pull-application-event-add.md)
- [{#T}](./pull-application-push-add.md)
