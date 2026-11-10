# Отправить push-уведомление пользователям приложения pull.application.push.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`pull`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: только администратор Битрикс24

Метод `pull.application.push.add` отправляет push-уведомление пользователям приложения. Уведомление приходит в мобильное приложение Битрикс24 от имени вашего приложения, поэтому у него должно быть заполнено название.

Push-уведомление не попадает в канал Push&Pull: его доставляет мобильное приложение, и получатель увидит уведомление, только если оно у него установлено. Чтобы обновить интерфейс открытого приложения, используйте [pull.application.event.add](./pull-application-event-add.md) — этот метод кладет событие в канал, откуда его читает клиент.

{% note info "" %}

Метод работает только в контексте [приложения](../app-installation/index.md). Запрос выполняется с OAuth-токеном приложения и scope `pull`, а вебхук такой контекст не создает.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../api-reference/data-types.md) \| [`string`](../../api-reference/data-types.md) \| [`integer[]`](../../api-reference/data-types.md) | Идентификатор пользователя или массив идентификаторов пользователей, которым отправляется push-уведомление. Передавайте параметр всегда: проверки на стороне REST нет, и без `USER_ID` метод вернет успешный ответ, но уведомление не уйдет.

Строку метод разбирает как JSON, поэтому `"577"` и `"[1, 2, 3]"` тоже принимаются.

`USER_ID` можно получить:
- методом [user.get](../../api-reference/user/user-get.md)
- методом [user.current](../../api-reference/user/user-current.md) для текущего пользователя

Количество получателей метод не ограничивает и отбрасывает повторяющиеся идентификаторы ||
|| **TEXT**^*^
[`string`](../../api-reference/data-types.md) | Текст push-уведомления.

Размер push-уведомления ограничен 4 КБ. Более длинный текст Битрикс24 обрезает.

Метод вернет ошибку, если `TEXT` не передан, пуст или равен `0` ||
|| **AVATAR**
[`string`](../../api-reference/data-types.md) | Абсолютный URL изображения для push-уведомления.

Изображение загружает мобильное приложение Битрикс24 при получении уведомления. Проверки доступности URL нет: если изображение не загрузится, уведомление придет без него, а метод вернет успешный ответ.

Битрикс24 разбирает значение как URL и пересобирает его заново, поэтому строка, которую не удалось разобрать, до устройства не дойдет ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример отправки push-уведомления пользователям приложения, где:
- `USER_ID` — идентификатор пользователя или массив идентификаторов пользователей
- `TEXT` — текст push-уведомления
- `AVATAR` — URL изображения для push-уведомления

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "USER_ID": [1, 2, 3],
        "TEXT": "Hello, world!",
        "AVATAR": "https://example.com/images/avatar.png",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/pull.application.push.add.json"
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
        method: 'pull.application.push.add',
        params: {
          USER_ID: [1, 2, 3],
          TEXT: 'Hello, world!',
          AVATAR: 'https://example.com/images/avatar.png',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Push accepted:', result)
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
      async function sendApplicationPush() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'pull.application.push.add',
            params: {
              USER_ID: [1, 2, 3],
              TEXT: 'Hello, world!',
              AVATAR: 'https://example.com/images/avatar.png',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Push accepted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendApplicationPush)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.pull.application.push.add(
            [1, 2, 3],
            text="Hello, world!",
            avatar="https://example.com/images/avatar.png",
        ).response
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
            ->call(
                'pull.application.push.add',
                [
                    'USER_ID' => [1, 2, 3],
                    'TEXT' => 'Hello, world!',
                    'AVATAR' => 'https://example.com/images/avatar.png',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending push notification: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'pull.application.push.add',
        {
            USER_ID: [1, 2, 3],
            TEXT: 'Hello, world!',
            AVATAR: 'https://example.com/images/avatar.png'
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
        'pull.application.push.add',
        [
            'USER_ID' => [1, 2, 3],
            'TEXT' => 'Hello, world!',
            'AVATAR' => 'https://example.com/images/avatar.png',
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
    "result": true,
    "time": {
        "start": 1743495945,
        "finish": 1743495945.285066,
        "duration": 0.2850658893585205,
        "processing": 0.008597135543823242,
        "date_start": "2025-04-01T11:52:25+03:00",
        "date_finish": "2025-04-01T11:52:25+03:00",
        "operating_reset_at": 1743496545,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../api-reference/data-types.md) | Признак того, что уведомление принято к отправке. Метод возвращает `true` независимо от того, дошло ли уведомление до устройства.

Другой полезной нагрузки в ответе нет: идентификатор уведомления метод не возвращает, и узнать из ответа статус доставки нельзя ||
|| **time**
[`time`](../../api-reference/data-types.md#time) | Информация о времени выполнения запроса. Состав полей — [Объект time](../../api-reference/data-types.md#time) ||
|#

### Почему уведомление не пришло

Если уведомление не пришло, проверьте условия доставки:

- в `USER_ID` остался хотя бы один положительный идентификатор: нули и отрицательные значения метод отбрасывает
- мобильное приложение Битрикс24 у получателя установлено и в нем выполнен вход
- у приложения заполнено название для текущего языка, иначе метод вернул бы `EMPTY_APP_NAME`
- push-уведомления включены в самом Битрикс24

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Send push notifications available only for application authorization."
}
```

HTTP-статус: **400**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You do not have access to send push notifications"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Send push notifications available only for application authorization. | Вызов метода не из контекста приложения, например, через вебхук ||
|| `400` | `ACCESS_ERROR` | You do not have access to send push notifications | Пользователь без прав администратора пытается отправить push-уведомление ||
|| `400` | `TEXT_ERROR` | Text can't be empty | Параметр `TEXT` не передан, пуст или равен `0` ||
|| `400` | `EMPTY_APP_NAME` | For send push-notification application name can't be empty | У приложения не заполнено название. Название на языке по умолчанию ошибку не снимает — Битрикс24 проверяет только название для текущего языка ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./push-and-pull-in-browser.md)
- [{#T}](./custom-push-and-pull-client.md)
- [{#T}](./pull-application-config-get.md)
- [{#T}](./pull-application-event-add.md)
