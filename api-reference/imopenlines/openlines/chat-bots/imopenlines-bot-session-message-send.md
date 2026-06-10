# Отправить автоматическое сообщение в диалог imopenlines.bot.session.message.send

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md), [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.bot.session.message.send` отправляет в диалог открытой линии автоматическое сообщение от чат-бота приложения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата, в который метод отправляет сообщение.

Идентификатор чата можно получить с помощью методов [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md) или [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) ||
|| **NAME**
[`string`](../../../data-types.md) | Код типа автоответа. 

Допустимые значения:
- `WELCOME` — отправляет автоматическое приветствие из настроек Открытой линии, параметр `MESSAGE` в этом режиме игнорируется
- `DEFAULT` — отправляет текст из параметра `MESSAGE` ||
|| **MESSAGE**
[`string`](../../../data-types.md) | Текст сообщения для режима `NAME=DEFAULT`. По умолчанию используется пустая строка.

Если передать `NAME=DEFAULT` и пустой `MESSAGE`, новое сообщение в чат не добавится ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"NAME":"DEFAULT","MESSAGE":"Здравствуйте! Чем могу помочь?"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.bot.session.message.send
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"NAME":"DEFAULT","MESSAGE":"Здравствуйте! Чем могу помочь?","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.bot.session.message.send
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
        method: 'imopenlines.bot.session.message.send',
        params: {
          CHAT_ID: 112,
          NAME: 'DEFAULT',
          MESSAGE: 'Hello! How can I help you?',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Auto message sent:', result)
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
      async function sendSessionMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.bot.session.message.send',
            params: {
              CHAT_ID: 112,
              NAME: 'DEFAULT',
              MESSAGE: 'Hello! How can I help you?',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Auto message sent:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendSessionMessage)
    </script>
    ```

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'imopenlines.bot.session.message.send',
              [
                  'CHAT_ID' => 112,
                  'NAME' => 'DEFAULT',
                  'MESSAGE' => 'Здравствуйте! Чем могу помочь?',
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Auto message sent: ' . var_export($result, true);
  } catch (Throwable $exception) {
      error_log($exception->getMessage());
      echo 'Error sending auto message: ' . $exception->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'imopenlines.bot.session.message.send',
      {
          CHAT_ID: 112,
          NAME: 'DEFAULT',
          MESSAGE: 'Здравствуйте! Чем могу помочь?',
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
      'imopenlines.bot.session.message.send',
      [
          'CHAT_ID' => 112,
          'NAME' => 'DEFAULT',
          'MESSAGE' => 'Здравствуйте! Чем могу помочь?',
      ]
  );

  if (!empty($result['error'])) {
      echo 'Error: ' . $result['error_description'];
  } else {
      echo 'Auto message sent: ' . var_export($result['result'], true);
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
[`boolean`](../../../data-types.md) | Флаг успешного вызова метода. Метод не возвращает признак фактического создания сообщения в чате ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` или передано значение `<= 0` ||
|| `403` | `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization | Метод вызван с сессионной авторизацией, для которой он запрещен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-bot-session-operator.md)
- [{#T}](./imopenlines-bot-session-transfer.md)
- [{#T}](./imopenlines-bot-session-finish.md)
