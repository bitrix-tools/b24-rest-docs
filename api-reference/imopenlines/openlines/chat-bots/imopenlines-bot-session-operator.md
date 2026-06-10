# Переключить диалог на свободного оператора imopenlines.bot.session.operator

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md), [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.bot.session.operator` переключает диалог со стороны чат-бота на свободного оператора открытой линии.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата, который нужно передать свободному оператору.

Идентификатор чата можно получить с помощью методов [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md) или [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.bot.session.operator
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.bot.session.operator
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
        method: 'imopenlines.bot.session.operator',
        params: {
          CHAT_ID: 112,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Session redirected to free operator:', result)
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
      async function redirectSessionToOperator() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.bot.session.operator',
            params: {
              CHAT_ID: 112,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Session redirected to free operator:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', redirectSessionToOperator)
    </script>
    ```

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'imopenlines.bot.session.operator',
              [
                  'CHAT_ID' => 112,
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Session redirected: ' . var_export($result, true);
  } catch (Throwable $exception) {
      error_log($exception->getMessage());
      echo 'Error redirecting session: ' . $exception->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'imopenlines.bot.session.operator',
      {
          CHAT_ID: 112,
      },
      function(result) {
          if (result.error()) {
              console.error(result.error().ex);
          } else {
              console.log(result.data());
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'imopenlines.bot.session.operator',
      [
          'CHAT_ID' => 112,
      ]
  );

  if (!empty($result['error'])) {
      echo 'Error: ' . $result['error_description'];
  } else {
      echo 'Session redirected: ' . var_export($result['result'], true);
  }
  ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1728626400.456,
        "finish": 1728626400.539,
        "duration": 0.083,
        "processing": 0.031,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Содержит `true`, если диалог успешно передан свободному оператору ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_CHAT",
    "error_description": "Operator is not a bot"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` или передано значение `<= 0` ||
|| `400` | `WRONG_CHAT` | Operator is not a bot | Указанный диалог уже ведет оператор, а не чат-бот ||
|| `403` | `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization | Метод вызван с сессионной авторизацией, для которой он запрещен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-bot-session-message-send.md)
- [{#T}](./imopenlines-bot-session-transfer.md)
- [{#T}](./imopenlines-bot-session-finish.md)
