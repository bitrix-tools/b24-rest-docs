# Получить список зарегистрированных обработчиков событий event.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `event.get` возвращает список обработчиков событий, которые приложение зарегистрировало методом [event.bind](./event-bind.md).

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Через вебхук метод вернет ошибку `WRONG_AUTH_TYPE`.

Администратор получает все обработчики приложения, включая зарегистрированные другими пользователями. Пользователю без прав администратора метод вернет только обработчики, у которых в `auth_type` указан его идентификатор.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/event.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each event handler returned in result[]
    type EventHandlerItem = {
      event: string,
      handler?: string,
      auth_type?: string,
      connector_id?: string,
      offline: number,
    }

    try {
      const response = await $b24.actions.v2.call.make<EventHandlerItem[]>({
        method: 'event.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(
          'Registered event handlers:',
          result.map(h => `${h.event} → ${h.handler}`)
        )
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
      async function getEventHandlers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(
            'Registered event handlers:',
            result.map(h => `${h.event} → ${h.handler}`)
          )
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEventHandlers)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.get().response
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
    try {
        $eventService = $serviceBuilder->getMainScope()->event();
        $result = $eventService->get();
        $eventHandlers = $result->getEventHandlers();
        foreach ($eventHandlers as $handler) {
            print("Event: " . $handler->event . "\n");
            print("Handler: " . $handler->handler . "\n");
            print("Auth Type: " . $handler->auth_type . "\n");
            print("Offline: " . $handler->offline . "\n");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "event.get",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.get',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "event.get", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("event.get: %w", err)
    }

    var items []struct {
    	Event       string `json:"event"`
    	Handler     string `json:"handler"`
    	AuthType    string `json:"auth_type"`
    	ConnectorID string `json:"connector_id"`
    	Offline     int    `json:"offline"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Event, it.Handler)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "event": "ONCRMLEADADD",
            "handler": "https:\/\/www.my-domain.ru\/handler\/",
            "auth_type": "0",
            "offline": 0
        },
        {
            "event": "ONCRMLEADADD",
            "handler": "https:\/\/www.my-domain.ru\/handler\/",
            "auth_type": "15",
            "offline": 0
        },
        {
            "event": "ONCRMDEALUPDATE",
            "connector_id": "",
            "offline": 1
        }
    ],
    "time": {
        "start": 1721297941.536696,
        "finish": 1721297941.661148,
        "duration": 0.12445211410522461,
        "processing": 0.0029609203338623047,
        "date_start": "2024-07-18T12:19:01+02:00",
        "date_finish": "2024-07-18T12:19:01+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Обработчики событий приложения в порядке регистрации [(подробное описание)](#handler). Метод возвращает все обработчики одним ответом, без постраничной навигации. Если обработчиков нет, метод вернет пустой массив ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Элемент списка обработчиков {#handler}

Состав полей зависит от типа подписки.

#|
|| **Название**
`тип` | **Описание** ||
|| **event**
[`string`](../data-types.md) | Код события в верхнем регистре, например `ONCRMLEADADD` ||
|| **handler**
[`string`](../data-types.md) | URL обработчика. Только у онлайн-подписок ||
|| **auth_type**
[`string`](../data-types.md) | Идентификатор пользователя, от имени которого обработчик получает авторизацию. `0` — пользователь, действие которого вызвало событие. Только у онлайн-подписок ||
|| **connector_id**
[`string`](../data-types.md) | Ключ источника `auth_connector`, указанный при подписке. Пустая строка, если источник не указан. Только у [офлайн-подписок](./offline-events.md) ||
|| **offline**
[`integer`](../data-types.md) | Тип подписки: `0` — онлайн-подписка, `1` — офлайн-подписка ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не в контексте приложения, например через вебхук ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
