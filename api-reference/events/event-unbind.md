# Отменить зарегистрированный обработчик события event.unbind

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `event.unbind` удаляет обработчики события, зарегистрированные приложением методом [event.bind](./event-bind.md). В BX24.js для метода есть обертка [BX24.callUnbind](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-unbind.md).

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Пользователю без прав администратора метод доступен с ограничениями:

- офлайн-события недоступны: вызов с `event_type=offline` вернет ошибку `ACCESS_DENIED`
- удалить можно только свои обработчики онлайн-событий

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../data-types.md) | Код события, например `ONCRMLEADADD`. Регистр не важен ||
|| **handler***
[`string`](../data-types.md) | URL обработчика, указанный при регистрации. Обязателен для онлайн-событий. При `event_type=offline` значение игнорируется ||
|| **auth_type**
[`integer`](../data-types.md) | Идентификатор пользователя, под которым авторизуется обработчик события. Без параметра администратор удаляет обработчики всех пользователей, а пользователь без прав администратора — только свои. Пользователю без прав администратора параметр передавать не нужно: если он передан, допустим только собственный ID целым числом, а строка `"15"` или `0` вернут ошибку `ACCESS_DENIED`. При `event_type=offline` параметр не учитывается

{% note info %}

Чтобы удалить только обработчики, которые авторизуются от имени пользователя, вызвавшего событие, администратор передает `auth_type=0`. Обработчики с другим `auth_type` останутся.

{% endnote %}
||
|| **event_type**
[`string`](../data-types.md) | Тип подписки: `online` или `offline`, регистр не важен. По умолчанию `online`. При `offline` метод работает с [офлайн-событиями](./offline-events.md) ||
|| **auth_connector**
[`string`](../data-types.md) | Ключ источника. Учитывается только при `event_type=offline`: удаляются офлайн-обработчики с тем же `auth_connector`, что передан в [event.bind](./event-bind.md). Без параметра удаляются обработчики без ключа источника ||
|#

Метод удаляет все обработчики приложения, которые совпали по переданным параметрам.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "event": "ONCRMLEADADD",
        "handler": "https://www.my-domain.ru/handler/",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/event.unbind
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EventUnbindResult = {
      count: number
    }

    try {
      const response = await $b24.actions.v2.call.make<EventUnbindResult>({
        method: 'event.unbind',
        params: {
          event: 'ONCRMLEADADD',
          handler: 'https://www.my-domain.ru/handler/',
          auth_type: 15,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Unbound handlers count:', result.count)
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
      async function unbindEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.unbind',
            params: {
              event: 'ONCRMLEADADD',
              handler: 'https://www.my-domain.ru/handler/',
              auth_type: 15,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Unbound handlers count:', result.count)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', unbindEvent)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.unbind(
            event="ONCRMLEADADD",
            handler="https://www.my-domain.ru/handler/",
            auth_type=15,
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
    try {
        $eventCode = 'your_event_code'; // Replace with your actual event code
        $handlerUrl = 'https://your.handler.url'; // Replace with your actual handler URL
        $userId = null; // Replace with your actual user ID or leave as null
        $result = $serviceBuilder
            ->getMainScope()
            ->event()
            ->unbind($eventCode, $handlerUrl, $userId);
        print($result->getUnbindedHandlersCount());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.unbind',
        [
            'event' => 'ONCRMLEADADD',
            'handler' => 'https://www.my-domain.ru/handler/',
            'auth_type' => 15
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод возвращает количество удаленных обработчиков.

```json
{
    "result": {
        "count": 1
    },
    "time": {
        "start": 1721298360.468008,
        "finish": 1721298360.553977,
        "duration": 0.0859689712524414,
        "processing": 0.0023431777954101562,
        "date_start": "2024-07-18T12:26:00+02:00",
        "date_finish": "2024-07-18T12:26:00+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Результат удаления [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **count**
[`integer`](../data-types.md) | Количество удаленных обработчиков. Если подходящих обработчиков нет — `0` ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! Offline events unbinding requires administrator access rights"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | Argument 'EVENT' is null or empty | Не передан параметр `event` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'HANDLER' is null or empty | Не передан параметр `handler` для онлайн-события ||
|| `400` | `ERROR_ARGUMENT` | ```Value must be one of {online|offline}``` | Передано недопустимое значение `event_type` ||
|| `403` | `ACCESS_DENIED` | Access denied! Offline events unbinding requires administrator access rights | Метод вызвал не администратор с `event_type=offline` ||
|| `403` | `ACCESS_DENIED` | Access denied! Event unbinding with AUTH_TYPE requires administrator access rights | Метод вызвал не администратор и передал `auth_type`, не равный своему ID целым числом ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не в контексте приложения, например через вебхук ||
|| `403` | `WRONG_LICENSE` | This feature is not enabled for the current license: auth_connector | Передан `auth_connector`, а тариф не поддерживает ключи источников ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
