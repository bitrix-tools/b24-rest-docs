# Вложения в сообщениях

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

`ATTACH` позволяет отправлять структурированный контент в сообщении: текстовые блоки, ссылки, изображения, файлы, разделители и таблицы.

Вложения передаются в параметре `ATTACH` метода [im.message.add](./im-message-add.md) и [im.message.update](./im-message-update.md).

## Форматы ATTACH

- полная форма: объект с `BLOCKS`
- сокращенная форма: массив блоков без обертки

## Пример отправки сообщения с ATTACH

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Карточка","ATTACH":{"ID":1,"COLOR_TOKEN":"primary","BLOCKS":[{"MESSAGE":"[B]Новая заявка[/B]"},{"LINK":{"NAME":"Открыть","LINK":"https://example.com"}}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Карточка","ATTACH":{"ID":1,"COLOR_TOKEN":"primary","BLOCKS":[{"MESSAGE":"[B]Новая заявка[/B]"},{"LINK":{"NAME":"Открыть","LINK":"https://example.com"}}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.add
  ```

- JS

  ```js
  try {
      const response = await $b24.callMethod(
          'im.message.add',
          {
              DIALOG_ID: 'chat2725',
              MESSAGE: 'Карточка',
              ATTACH: {
                  ID: 1,
                  COLOR_TOKEN: 'primary',
                  BLOCKS: [
                      { MESSAGE: '[B]Новая заявка[/B]' },
                      { LINK: { NAME: 'Открыть', LINK: 'https://example.com' } },
                  ],
              },
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
                  'MESSAGE' => 'Карточка',
                  'ATTACH' => [
                      'ID' => 1,
                      'COLOR_TOKEN' => 'primary',
                      'BLOCKS' => [
                          ['MESSAGE' => '[B]Новая заявка[/B]'],
                          ['LINK' => ['NAME' => 'Открыть', 'LINK' => 'https://example.com']],
                      ],
                  ],
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
          MESSAGE: 'Карточка',
          ATTACH: {
              ID: 1,
              COLOR_TOKEN: 'primary',
              BLOCKS: [
                  { MESSAGE: '[B]Новая заявка[/B]' },
                  { LINK: { NAME: 'Открыть', LINK: 'https://example.com' } },
              ],
          },
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
          'MESSAGE' => 'Карточка',
          'ATTACH' => [
              'ID' => 1,
              'COLOR_TOKEN' => 'primary',
              'BLOCKS' => [
                  ['MESSAGE' => '[B]Новая заявка[/B]'],
                  ['LINK' => ['NAME' => 'Открыть', 'LINK' => 'https://example.com']],
              ],
          ],
      ]
  );

  print_r($result);
  ```

{% endlist %}

{% note warning "" %}

Актуальная документация по вложениям находится в разделе Чат-боты 2.0:

- [Вложения в сообщениях (Attach)](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/index.md)

{% endnote %}

## Продолжите изучение

- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)



