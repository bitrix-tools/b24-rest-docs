# Получить список коннекторов imconnector.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменения коннекторов открытых линий

Метод `imconnector.list` возвращает список коннекторов, которые доступны в Битрикс24 и могут быть подключены к открытой линии.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}

В список попадают:

- встроенные коннекторы, которые доступны в регионе и включены в настройках Битрикс24: онлайн-чат, Telegram, Битрикс24 Network и другие
- пользовательские коннекторы, зарегистрированные приложениями через [imconnector.register](./imconnector-register.md)

На пользовательские коннекторы настройки Битрикс24 не влияют: они попадают в список сразу после регистрации.

Метод не показывает, к каким линиям подключены коннекторы и в каком они состоянии. Состояние коннектора на конкретной линии проверяйте методом [imconnector.status](./imconnector-status.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imconnector.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ConnectorListResult = Record<string, string>

    try {
      const response = await $b24.actions.v2.call.make<ConnectorListResult>({
        method: 'imconnector.list',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Connectors:', result)
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
      async function listConnectors() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imconnector.list',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Connectors:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listConnectors)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imconnector.list().response
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
        'imconnector.list',
        []
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.list',
      {},
      function(result) {
        console.log(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.list',
        []
    );
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imconnector.list", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imconnector.list: %w", err)
    }

    var item struct {
    	Livechat    string `json:"livechat"`
    	Telegrambot string `json:"telegrambot"`
    	Network     string `json:"network"`
    	Myconnector string `json:"myconnector"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Livechat, item.Telegrambot)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "livechat": "Онлайн-чат",
        "telegrambot": "Telegram",
        "network": "Битрикс24 Network",
        "myconnector": "Мой коннектор"
    },
    "time": {
        "start": 1738065600.11,
        "finish": 1738065600.17,
        "duration": 0.06,
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
[`object`](../../data-types.md) | Объект вида `connector_id: connector_name`, где:

- ключ — код коннектора. Для пользовательского коннектора это значение параметра `ID` метода [imconnector.register](./imconnector-register.md), приведенное к нижнему регистру
- значение — название коннектора на языке интерфейса Битрикс24: для пользовательского коннектора это параметр `NAME` метода [imconnector.register](./imconnector-register.md)

Ключ подставляют в параметр `CONNECTOR` остальных методов раздела.

Если доступных коннекторов нет, в `result` приходит пустой массив `[]` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

Вызов вне контекста приложения:

```json
{
    "error": "ERROR_CORE",
    "error_description": "Current authorization type is denied for this method"
}
```

Нет права изменения коннекторов:

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "You dont have access to this action"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Current authorization type is denied for this method | Метод вызван не в контексте приложения OAuth. В отличие от остальных методов раздела, этот метод отвечает кодом `ERROR_CORE` и статусом `400` ||
|| `400` | `ACCESS_DENIED` | The ImOpenLines module is not installed. | В Битрикс24 не установлен модуль `imopenlines`. Эта проверка выполняется раньше проверки контекста приложения ||
|| `400` | `ACCESS_DENIED` | You dont have access to this action | У пользователя нет права изменения коннекторов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
- [{#T}](../../../tutorials/openlines/example-connector.md)
