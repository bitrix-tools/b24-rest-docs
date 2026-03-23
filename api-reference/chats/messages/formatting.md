# Форматирование сообщений

BB-коды позволяют форматировать текст сообщений: выделять фрагменты, добавлять ссылки, переносы строк и специальные вставки.

Чаще всего форматирование передают в поле `MESSAGE` метода [im.message.add](./im-message-add.md).

## Что можно сделать

- выделить текст: `[B]`, `[I]`, `[U]`, `[S]`
- добавить ссылку: `[URL=...]...[/URL]`
- сделать перенос строки: `[BR]` или `\n`
- вставить командную ссылку: `[SEND=...]...[/SEND]`, `[PUT=...]...[/PUT]`

## Пример отправки сообщения с форматированием

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.add
  ```

- JS

  ```js
  try {
      const response = await $b24.callMethod(
          'im.message.add',
          {
              DIALOG_ID: 'chat2725',
              MESSAGE: '[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]',
          }
      );

      const result = response.getData().result;
      console.log('Created message ID:', result);
  } catch (error) {
      console.error('Error:', error);
  }
  ```

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'im.message.add',
              [
                  'DIALOG_ID' => 'chat2725',
                  'MESSAGE' => '[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]',
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Created message ID: ' . $result;
  } catch (Throwable $e) {
      error_log($e->getMessage());
      echo 'Error: ' . $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'im.message.add',
      {
          DIALOG_ID: 'chat2725',
          MESSAGE: '[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]',
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
      'im.message.add',
      [
          'DIALOG_ID' => 'chat2725',
          'MESSAGE' => '[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]',
      ]
  );

  print_r($result);
  ```

{% endlist %}

{% note warning "" %}

Актуальная документация по форматированию находится в разделе Чат-боты 2.0:

- [Форматирование текста (BB-коды)](../../chat-bots/chat-bots-v2/imbot.v2/messages/message-formatting.md)

{% endnote %}

## Продолжите изучение

- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)
