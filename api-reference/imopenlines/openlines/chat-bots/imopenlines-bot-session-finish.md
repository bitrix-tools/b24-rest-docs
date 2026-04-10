# Завершить диалог imopenlines.bot.session.finish

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md), [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь приложения с зарегистрированным чат-ботом

Метод `imopenlines.bot.session.finish` завершает текущий диалог открытой линии от имени чат-бота приложения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата, диалог которого нужно завершить. 

Идентификатор чата можно получить с помощью методов [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md) или [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) ||
|| **CLIENT_ID**
[`string`](../../../data-types.md) | Параметр обязателен только для вебхуков.

Передавайте:
- тот же `CLIENT_ID`, который был указан при регистрации чат-бота методом [imbot.register](../../../chat-bots/outdated/bots/imbot-register.md)
- или значение параметра `botToken`, переданного при регистрации чат-бота методом [imbot.v2.Bot.register](../../../chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"CLIENT_ID":"**put_your_client_id_or_bot_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.bot.session.finish
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.bot.session.finish
  ```

- JS

  ```js
  try {
    const response = await $b24.callMethod('imopenlines.bot.session.finish', {
      CHAT_ID: 112,
    });

    const { result } = response.getData();
    console.log('Session finished:', result);
  } catch (error) {
    console.error('Error finishing session:', error);
  }
  ```

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'imopenlines.bot.session.finish',
              [
                  'CHAT_ID' => 112,
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Session finished: ' . var_export($result, true);
  } catch (Throwable $exception) {
      error_log($exception->getMessage());
      echo 'Error finishing session: ' . $exception->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'imopenlines.bot.session.finish',
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
      'imopenlines.bot.session.finish',
      [
          'CHAT_ID' => 112,
      ]
  );

  if (!empty($result['error'])) {
      echo 'Error: ' . $result['error_description'];
  } else {
      echo 'Session finished: ' . var_export($result['result'], true);
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
[`boolean`](../../../data-types.md) | Содержит `true`, если диалог успешно завершен ||
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
|| `400` | `BOT_ID_ERROR` | Bot not found | В приложении не найден зарегистрированный чат-бот ||
|| `403` | `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization | Метод вызван с сессионной авторизацией, для которой он запрещен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-bot-session-message-send.md)
- [{#T}](./imopenlines-bot-session-operator.md)
- [{#T}](./imopenlines-bot-session-transfer.md)
