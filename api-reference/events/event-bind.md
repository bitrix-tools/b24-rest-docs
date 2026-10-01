# Зарегистрировать новый обработчик события event.bind

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `event.bind` регистрирует новый обработчик события.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Через вебхук метод вернет ошибку `WRONG_AUTH_TYPE`.

Для пользователя без прав администратора действуют ограничения:

- офлайн-события недоступны: подписка с `event_type=offline` вернет ошибку `ACCESS_DENIED`
- в `auth_type` можно указать только свой идентификатор, для другого пользователя метод вернет ошибку `ACCESS_DENIED`

{% note info %}

Битрикс24 отправляет данные события POST-запросом на URL обработчика, поэтому адрес должен быть доступен из интернета. Как проверить обработчик, описано в статье [{#T}](./test-handler.md).

{% endnote %}

Метод можно вызвать через [BX24.callBind](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-bind.md).

{% note info %}

При удалении приложения его обработчики событий удаляются, при обновлении — сохраняются. Если установщик новой версии снова зарегистрирует тот же обработчик, метод вернет ошибку `ERROR_CORE`. Перед регистрацией проверьте текущие обработчики методом [event.get](./event-get.md).

{% endnote %}

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../settings/app-installation/installation-finish.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../data-types.md) | Код события, например `ONCRMLEADADD`. Событие должно входить в scope приложения или быть базовым, иначе метод вернет ошибку `ERROR_EVENT_NOT_FOUND`. Список доступных событий возвращает метод [events](./events.md) ||
|| **handler***
[`string`](../data-types.md) | URL обработчика со схемой `http` или `https`. В имени хоста должна быть точка, поэтому адрес `localhost` не подходит. Обязателен для онлайн-событий, при `event_type=offline` значение игнорируется ||
|| **auth_type**
[`integer`](../data-types.md) | Идентификатор пользователя, под которым авторизуется обработчик события. По умолчанию для администратора — пользователь, действие которого вызвало событие; для пользователя без прав администратора — он сам. При `event_type=offline` параметр не учитывается ||
|| **event_type**
[`string`](../data-types.md) | Тип подписки: `online` или `offline`. По умолчанию `online`. При `offline` событие попадает в [очередь офлайн-событий](./offline-events.md) ||
|| **auth_connector**
[`string`](../data-types.md) | Ключ источника для [офлайн-событий](./offline-events.md). С этим ключом создается отдельная очередь, в которую не попадают изменения из запросов самого приложения с тем же `auth_connector`. То же значение передают в методы `event.offline.*`. Параметр доступен не на всех тарифах: проверьте его методом [feature.get](../common/system/feature-get.md) с кодом `rest_auth_connector`, иначе метод вернет ошибку `WRONG_LICENSE` ||
|| **options**
[`object`](../data-types.md) | Дополнительные настройки регистрируемого события. Набор полей зависит от события.

Для события `ONOFFLINEEVENT` поддерживается поле `minTimeout` — минимальный интервал между уведомлениями в секундах. По умолчанию 1. Подробнее в статье [{#T}](./on-offline-event.md#min-timeout) ||
|#

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
    https://**put_your_bitrix24_address**/rest/event.bind
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'event.bind',
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
        console.info('Handler registered:', result)
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
      async function bindEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.bind',
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
          console.info('Handler registered:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindEvent)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.bind(
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.bind',
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "event.bind", b24.Params{
    	"event":   "ONCRMLEADADD",
    	"handler": "https://www.my-domain.ru/handler/",
    })
    if err != nil {
    	return fmt.Errorf("event.bind: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1721296536.908506,
        "finish": 1721296537.007365,
        "duration": 0.09885907173156738,
        "processing": 0.03251290321350098,
        "date_start": "2024-07-18T11:55:36+02:00",
        "date_finish": "2024-07-18T11:55:37+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Успешность выполнения ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error":"ERROR_EVENT_NOT_FOUND",
    "error_description":"Event not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_EVENT_NOT_FOUND` | Event not found | Событие не найдено или не входит в scope приложения ||
|| `400` | `ERROR_ARGUMENT` | Argument 'EVENT' is null or empty | Не передан параметр `event` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'HANDLER' is null or empty | Не передан параметр `handler` для онлайн-события ||
|| `400` | `ERROR_ARGUMENT` | ```Value must be one of {online|offline}``` | Передано недопустимое значение `event_type` ||
|| `400` | `ERROR_ARGUMENT` | Offline event cannot be registered for this event. | Событие нельзя получать офлайн, например `ONOFFLINEEVENT` ||
|| `400` | `ERROR_WRONG_HANDLER_URL` | Wrong handler URL | В URL обработчика нет хоста или в имени хоста нет точки ||
|| `400` | `ERROR_UNSUPPORTED_PROTOCOL` | Unsupported handler protocol | Схема URL обработчика не `http` и не `https` ||
|| `400` | `ERROR_CORE` | Unable to set event handler: Handler already binded | Такой обработчик уже зарегистрирован ||
|| `400` | `ERROR_CORE` | Unable to set event handler: Process of binding the handler has already started | Тот же обработчик регистрируется параллельным запросом ||
|| `403` | `ACCESS_DENIED` | Access denied! Offline events binding requires administrator access rights | Обработчик офлайн-события регистрирует пользователь без прав администратора ||
|| `403` | `ACCESS_DENIED` | Access denied! Event binding with AUTH_TYPE requires administrator access rights | Пользователь без прав администратора указал в `auth_type` другого пользователя ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не в контексте приложения, например через вебхук ||
|| `403` | `WRONG_LICENSE` | This feature is not enabled for the current license: auth_connector | Передан `auth_connector`, а тариф не поддерживает ключи источников ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./events.md)
- [{#T}](./test-handler.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
