# Вложения в сообщениях

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'im.message.add',
        params: {
          DIALOG_ID: 'chat2725',
          MESSAGE: 'Card',
          ATTACH: {
            ID: 1,
            COLOR_TOKEN: 'primary',
            BLOCKS: [
              { MESSAGE: '[B]New request[/B]' },
              { LINK: { NAME: 'Open', LINK: 'https://example.com' } },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created message ID:', result)
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
      async function sendMessageWithAttach() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.add',
            params: {
              DIALOG_ID: 'chat2725',
              MESSAGE: 'Card',
              ATTACH: {
                ID: 1,
                COLOR_TOKEN: 'primary',
                BLOCKS: [
                  { MESSAGE: '[B]New request[/B]' },
                  { LINK: { NAME: 'Open', LINK: 'https://example.com' } },
                ],
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created message ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendMessageWithAttach)
    </script>
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



