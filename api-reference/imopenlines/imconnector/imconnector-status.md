# Получить статус коннектора imconnector.status

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
[`integer`](../../data-types.md) | Идентификатор открытой линии ||
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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ConnectorStatusResult = {
      LINE: number
      CONNECTOR: string
      ERROR: boolean
      CONFIGURED: boolean
      STATUS: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<ConnectorStatusResult>({
        method: 'imconnector.status',
        params: {
          CONNECTOR: 'myconnector',
          LINE: '12',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Connector status:', result.STATUS, '| Configured:', result.CONFIGURED, '| Error:', result.ERROR)
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
      async function getConnectorStatus() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imconnector.status',
            params: {
              CONNECTOR: 'myconnector',
              LINE: '12',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Connector status:', result.STATUS, '| Configured:', result.CONFIGURED, '| Error:', result.ERROR)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getConnectorStatus)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imconnector.status(
            connector="myconnector",
            line="12",
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imconnector.status", b24.Params{
    	"CONNECTOR": "myconnector",
    	"LINE":      "12",
    })
    if err != nil {
    	return fmt.Errorf("imconnector.status: %w", err)
    }

    var item struct {
    	Line       int    `json:"LINE"`
    	Connector  string `json:"CONNECTOR"`
    	Error      bool   `json:"ERROR"`
    	Configured bool   `json:"CONFIGURED"`
    	Status     bool   `json:"STATUS"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Line, item.Connector)
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
|| **result**
[`object`](../../data-types.md) | Объект статуса коннектора [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

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
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'CONNECTOR' is null or empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|| `400` | `ERROR_ARGUMENT` | Argument 'CONNECTOR' is null or empty | Не передан идентификатор коннектора `CONNECTOR` ||
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
