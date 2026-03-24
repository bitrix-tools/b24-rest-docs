# Работа с клавиатурами

`KEYBOARD` добавляет в сообщение интерактивные кнопки: переход по ссылке, выполнение команды, подстановку текста в поле ввода и другие действия.

Клавиатуру передают в параметре `KEYBOARD` при отправке или обновлении сообщения: [im.message.add](./im-message-add.md), [im.message.update](./im-message-update.md).

## Минимальная структура

- `KEYBOARD.BUTTONS` — массив кнопок
- `TEXT` — текст кнопки
- одно действие: `LINK` или `ACTION` + `ACTION_VALUE` или `COMMAND`

## Пример отправки сообщения с клавиатурой

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие","KEYBOARD":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить команду","ACTION":"PUT","ACTION_VALUE":"/help"}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие","KEYBOARD":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить команду","ACTION":"PUT","ACTION_VALUE":"/help"}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.add
  ```

- JS

  ```js
  try {
      const response = await $b24.callMethod(
          'im.message.add',
          {
              DIALOG_ID: 'chat2725',
              MESSAGE: 'Выберите действие',
              KEYBOARD: {
                  BUTTONS: [
                      { TEXT: 'Открыть сайт', LINK: 'https://www.example.ru/' },
                      { TYPE: 'NEWLINE' },
                      { TEXT: 'Подставить команду', ACTION: 'PUT', ACTION_VALUE: '/help' },
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
                  'MESSAGE' => 'Выберите действие',
                  'KEYBOARD' => [
                      'BUTTONS' => [
                          ['TEXT' => 'Открыть сайт', 'LINK' => 'https://www.example.ru/'],
                          ['TYPE' => 'NEWLINE'],
                          ['TEXT' => 'Подставить команду', 'ACTION' => 'PUT', 'ACTION_VALUE' => '/help'],
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
          MESSAGE: 'Выберите действие',
          KEYBOARD: {
              BUTTONS: [
                  { TEXT: 'Открыть сайт', LINK: 'https://www.example.ru/' },
                  { TYPE: 'NEWLINE' },
                  { TEXT: 'Подставить команду', ACTION: 'PUT', ACTION_VALUE: '/help' },
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
          'MESSAGE' => 'Выберите действие',
          'KEYBOARD' => [
              'BUTTONS' => [
                  ['TEXT' => 'Открыть сайт', 'LINK' => 'https://www.example.ru/'],
                  ['TYPE' => 'NEWLINE'],
                  ['TEXT' => 'Подставить команду', 'ACTION' => 'PUT', 'ACTION_VALUE' => '/help'],
              ],
          ],
      ]
  );

  print_r($result);
  ```

{% endlist %}

{% note warning "" %}

Актуальная документация по клавиатурам находится в разделе Чат-боты 2.0:

- [Клавиатуры в сообщениях](../../chat-bots/chat-bots-v2/imbot.v2/messages/message-keyboards.md)

{% endnote %}

## Продолжите изучение

- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)
