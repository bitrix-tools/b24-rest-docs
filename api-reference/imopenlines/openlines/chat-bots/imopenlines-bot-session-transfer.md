# Перевести диалог на оператора или очередь imopenlines.bot.session.transfer

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md), [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь приложения с зарегистрированным чат-ботом

Метод `imopenlines.bot.session.transfer` переводит диалог открытой линии от чат-бота на указанного оператора или очередь.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата, диалог которого нужно перевести.

Идентификатор чата можно получить с помощью методов [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md) или [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) ||
|| **USER_ID**
[`integer`](../../../data-types.md) | Идентификатор сотрудника, на которого нужно перевести диалог.

Идентификатор пользователя можно получить с помощью методов [user.get](../../../user/user-get.md) или [user.search](../../../user/user-search.md) ||
|| **QUEUE_ID**
[`integer`](../../../data-types.md) | Идентификатор очереди, в которую нужно перевести диалог.

В параметр передавайте значение поля `ID` из ответа метода [imopenlines.config.list.get](../imopenlines-config-list-get.md).

Поле `QUEUE` из ответа [imopenlines.config.list.get](../imopenlines-config-list-get.md) содержит `USER_ID` сотрудников очереди и не подходит как `QUEUE_ID` ||
|| **TRANSFER_ID**
[`string`](../../../data-types.md)\|[`integer`](../../../data-types.md) | Универсальный параметр назначения перевода.

Допустимые форматы: `USER_ID` сотрудника или строка `queue<QUEUE_ID>`.

Идентификатор пользователя можно получить методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md), идентификатор очереди — методом [imopenlines.config.list.get](../imopenlines-config-list-get.md) ||
|| **LEAVE**
[`boolean`](../../../data-types.md) | Флаг присутствия чат-бота в диалоге после перевода. 

Допустимые значения:
- `Y` — бот покидает чат сразу
- `N` — бот остается до подтверждения перевода

По умолчанию используется `N` ||
|| **CLIENT_ID**
[`string`](../../../data-types.md) | Параметр обязателен только для вебхуков.

Передавайте:
- тот же `CLIENT_ID`, который был указан при регистрации чат-бота методом [imbot.register](../../../chat-bots/outdated/bots/imbot-register.md)
- или значение параметра `botToken`, переданного при регистрации чат-бота методом [imbot.v2.Bot.register](../../../chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) ||
|#

Рекомендуется передавать только один параметр назначения: `USER_ID`, `QUEUE_ID`, или `TRANSFER_ID`. Если переданы несколько параметров одновременно, метод использует приоритет: `USER_ID` -> `QUEUE_ID` -> `TRANSFER_ID`. При передаче `TRANSFER_ID` метод преобразует его в `USER_ID` или `QUEUE_ID`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"USER_ID":12,"LEAVE":"N","CLIENT_ID":"**put_your_client_id_or_bot_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.bot.session.transfer
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"USER_ID":12,"LEAVE":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.bot.session.transfer
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
      method: 'imopenlines.bot.session.transfer',
      params: {
        CHAT_ID: 112,
        USER_ID: 12,
        LEAVE: 'N',
      },
      requestId: Text.getUuidRfc4122()
    })

    // The payload is available only on a successful response
    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      const result = response.getData()!.result
      console.info('Session transferred:', result)
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
    async function transferSession() {
      try {
        // Initialize the SDK inside a Bitrix24 frame
        const $b24 = await B24Js.initializeB24Frame()

        const response = await $b24.actions.v2.call.make({
          method: 'imopenlines.bot.session.transfer',
          params: {
            CHAT_ID: 112,
            USER_ID: 12,
            LEAVE: 'N',
          },
          requestId: B24Js.Text.getUuidRfc4122()
        })

        // The payload is available only on a successful response
        if (!response.isSuccess) {
          console.error(response.getErrorMessages().join('; '))
          return
        }

        const result = response.getData().result
        console.info('Session transferred:', result)
      } catch (error) {
        // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
        console.error(error)
      }
    }

    document.addEventListener('DOMContentLoaded', transferSession)
  </script>
  ```

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'imopenlines.bot.session.transfer',
              [
                  'CHAT_ID' => 112,
                  'USER_ID' => 12,
                  'LEAVE' => 'N',
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Session transferred: ' . var_export($result, true);
  } catch (Throwable $exception) {
      error_log($exception->getMessage());
      echo 'Error transferring session: ' . $exception->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'imopenlines.bot.session.transfer',
      {
          CHAT_ID: 112,
          USER_ID: 12,
          LEAVE: 'N',
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
      'imopenlines.bot.session.transfer',
      [
          'CHAT_ID' => 112,
          'USER_ID' => 12,
          'LEAVE' => 'N',
      ]
  );

  if (!empty($result['error'])) {
      echo 'Error: ' . $result['error_description'];
  } else {
      echo 'Session transferred: ' . var_export($result['result'], true);
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
[`boolean`](../../../data-types.md) | Содержит `true`, если диалог успешно переведен ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "TRANSFER_ID_EMPTY",
    "error_description": "Queue ID or User ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` или передано значение `<= 0` ||
|| `400` | `USER_ID_EMPTY` | User ID can't be empty | Передан `USER_ID` с пустым значением или значением `<= 0` ||
|| `400` | `QUEUE_ID_EMPTY` | QUEUE ID can't be empty | Передан `QUEUE_ID` с пустым значением или значением `<= 0` ||
|| `400` | `TRANSFER_ID_EMPTY` | Queue ID or User ID can't be empty | Не переданы `USER_ID` и `QUEUE_ID`, а также не задан `TRANSFER_ID` ||
|| `400` | `BOT_ID_ERROR` | Bot not found | В приложении не найден зарегистрированный чат-бот ||
|| `400` | `OPERATOR_WRONG` | You can not redirect to this operator | Перевод на указанного оператора или очередь недоступен ||
|| `403` | `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization | Метод вызван с сессионной авторизацией, для которой он запрещен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-bot-session-message-send.md)
- [{#T}](./imopenlines-bot-session-operator.md)
- [{#T}](./imopenlines-bot-session-finish.md)
