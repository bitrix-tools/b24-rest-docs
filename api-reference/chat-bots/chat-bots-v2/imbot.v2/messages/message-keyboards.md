# Работа с клавиатурами

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Клавиатура — это кнопки под сообщением. С их помощью можно открывать ссылки, выполнять действия и вызывать команды.

Методы, которые поддерживают работу с клавиатурой:

**Чат-боты 2.0 (`imbot.v2`)**

- [imbot.v2.Chat.Message.send](./chat-message-send.md) — отправить сообщение от имени чат-бота
- [imbot.v2.Chat.Message.update](./chat-message-update.md) — изменить отправленное сообщение чат-бота
- [imbot.v2.Command.answer](../commands/command-answer.md) — отправить ответ на команду чат-бота

**Чаты (`im`)**

- [im.message.add](../../../../chats/messages/im-message-add.md) — отправить сообщение в чат
- [im.message.update](../../../../chats/messages/im-message-update.md) — изменить отправленное сообщение

**Устаревшие чат-боты (`imbot`)**

- [imbot.message.add](../../../outdated/messages/imbot-message-add.md) — отправить сообщение от имени чат-бота
- [imbot.message.update](../../../outdated/messages/imbot-message-update.md) — изменить отправленное сообщение чат-бота
- [imbot.command.answer](../../../outdated/commands/imbot-command-answer.md) — отправить ответ на команду чат-бота

## Как добавить клавиатуру

Чтобы добавить клавиатуру, при создании или обновлении сообщения передайте параметр `KEYBOARD`.

`KEYBOARD` можно передавать:

- строкой JSON
- объектом с корневым ключом `BUTTONS`
- массивом кнопок без обертки

Если в `KEYBOARD` нет ключа `BUTTONS`, сервер автоматически считает, что передан сокращенный формат, и оборачивает массив в `BUTTONS`.

{% list tabs %}

- Полный формат с ключом `BUTTONS`

  ```json
  {
      "KEYBOARD": {
          "BUTTONS": [
              {"TEXT": "Кнопка", "LINK": "https://example.ru"}
          ]
      }
  }
  ```

- Сокращенный формат

  ```json
  {
      "KEYBOARD": [
          {"TEXT": "Кнопка", "LINK": "https://example.ru"}
      ]
  }
  ```

{% endlist %}

## Поля кнопки

#|
|| **Название**
`тип` | **Описание** ||
|| **TEXT**
[`string`](../../../../data-types.md) | Текст кнопки.

Для всех кнопок, кроме `TYPE`, обязательно указывать `TEXT` и одно поле действия: `LINK`, `COMMAND`, `ACTION + ACTION_VALUE` или `APP_ID` ||
|| **TYPE**
[`string`](../../../../data-types.md) | Перенос кнопки на новую строку. Единственное допустимое значение — `NEWLINE` ||
|| **LINK**
[`string`](../../../../data-types.md) | Ссылка кнопки. Допустимы `http/https` и относительный путь `/...` ||
|| **APP_ID**
[`integer`](../../../../data-types.md) | Идентификатор приложения для чата.

Устаревший сценарий. Чтобы открыть приложение из чата, используйте встройки ||
|| **APP_PARAMS**
[`string`](../../../../data-types.md) | Параметры запуска приложения для чата. Передавайте вместе с `APP_ID`.

Устаревший сценарий. Чтобы открыть приложение из чата, используйте встройки ||
|| **ACTION**
[`string`](../../../../data-types.md) | Действие:

- `PUT` — вставить текст в поле ввода
- `SEND` — отправить текст
- `COPY` — копировать текст в буфер обмена
- `CALL` — позвонить
- `DIALOG` — открыть чат ||
|| **ACTION_VALUE**
[`string`](../../../../data-types.md) | Значение для `ACTION`:

- `PUT` — текст для вставки в поле ввода
- `SEND` — текст для отправки
- `COPY` — текст для копирования
- `CALL` — номер телефона в международном формате
- `DIALOG` — идентификатор чата (`chatXXX`) или `ID` пользователя для личного чата ||
|| **COMMAND**
[`string`](../../../../data-types.md) | Команда для бота. Подробнее об обработке — [ниже](#command-processing) ||
|| **COMMAND_PARAMS**
[`string`](../../../../data-types.md) | Параметры команды. Передавайте вместе с `COMMAND` ||
|| **BLOCK**
[`string`](../../../../data-types.md) | Блокировка кнопки:

- `Y` — блокировать после нажатия
- `N` — не блокировать

По умолчанию — `N` ||
|| **DISABLED**
[`string`](../../../../data-types.md) | Активность кнопки:

- `Y` — кнопка неактивна
- `N` — кнопка активна

По умолчанию — `N` ||
|| **CONTEXT**
[`string`](../../../../data-types.md) | Контекст отображения:

- `MOBILE` — только мобильное устройство
- `DESKTOP` — только десктоп
- `ALL` — везде

По умолчанию — `ALL` ||
|| **DISPLAY**
[`string`](../../../../data-types.md) | Отображение кнопки:

- `LINE` — кнопка в строке
- `BLOCK` — кнопка отдельным блоком

По умолчанию — `BLOCK` ||
|| **WIDTH**
[`integer`](../../../../data-types.md) | Ширина кнопки в пикселях ||
|| **BG_COLOR**
[`string`](../../../../data-types.md) | Цвет кнопки в формате HEX ||
|| **BG_COLOR_TOKEN**
[`string`](../../../../data-types.md) | Токен цвета кнопки:

- `primary`
- `secondary`
- `alert`
- `base`

По умолчанию — `base` ||
|| **TEXT_COLOR**
[`string`](../../../../data-types.md) | Цвет текста кнопки в формате HEX ||
|| **OFF_BG_COLOR**
[`string`](../../../../data-types.md) | Цвет кнопки в неактивном состоянии ||
|| **OFF_TEXT_COLOR**
[`string`](../../../../data-types.md) | Цвет текста кнопки в неактивном состоянии ||
|#

{% note info "" %}

Вариант с параметрами `APP_ID` и `APP_PARAMS` используется в чатах [Открытых линий](../../../../imopenlines/openlines/index.md).

{% endnote %}

## Пример отправки сообщения с клавиатурой

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat2725","fields":{"message":"Выберите действие","keyboard":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить команду","ACTION":"PUT","ACTION_VALUE":"/help"}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.send
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"botId":456,"dialogId":"chat2725","fields":{"message":"Выберите действие","keyboard":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить команду","ACTION":"PUT","ACTION_VALUE":"/help"}]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.send
  ```

- JS

  ```js
  try {
      const response = await $b24.callMethod('imbot.v2.Chat.Message.send', {
          botId: 456,
          dialogId: 'chat2725',
          fields: {
              message: 'Выберите действие',
              keyboard: {
                  BUTTONS: [
                      { TEXT: 'Открыть сайт', LINK: 'https://www.example.ru/' },
                      { TYPE: 'NEWLINE' },
                      { TEXT: 'Подставить команду', ACTION: 'PUT', ACTION_VALUE: '/help' },
                  ],
              },
          },
      });

      const result = response.getData().result.id;
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
              'imbot.v2.Chat.Message.send',
              [
                  'botId' => 456,
                  'dialogId' => 'chat2725',
                  'fields' => [
                      'message' => 'Выберите действие',
                      'keyboard' => [
                          'BUTTONS' => [
                              ['TEXT' => 'Открыть сайт', 'LINK' => 'https://www.example.ru/'],
                              ['TYPE' => 'NEWLINE'],
                              ['TEXT' => 'Подставить команду', 'ACTION' => 'PUT', 'ACTION_VALUE' => '/help'],
                          ],
                      ],
                  ],
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult()['id'];

      echo 'Created message ID: ' . $result;
  } catch (Throwable $e) {
      error_log($e->getMessage());
      echo 'Error: ' . $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'imbot.v2.Chat.Message.send',
      {
          botId: 456,
          dialogId: 'chat2725',
          fields: {
              message: 'Выберите действие',
              keyboard: {
                  BUTTONS: [
                      { TEXT: 'Открыть сайт', LINK: 'https://www.example.ru/' },
                      { TYPE: 'NEWLINE' },
                      { TEXT: 'Подставить команду', ACTION: 'PUT', ACTION_VALUE: '/help' },
                  ],
              },
          },
      },
      function(result) {
          if (result.error()) {
              console.error(result.error().ex);
          } else {
              console.log('Message ID:', result.data().id);
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'imbot.v2.Chat.Message.send',
      [
          'botId' => 456,
          'dialogId' => 'chat2725',
          'fields' => [
              'message' => 'Выберите действие',
              'keyboard' => [
                  'BUTTONS' => [
                      ['TEXT' => 'Открыть сайт', 'LINK' => 'https://www.example.ru/'],
                      ['TYPE' => 'NEWLINE'],
                      ['TEXT' => 'Подставить команду', 'ACTION' => 'PUT', 'ACTION_VALUE' => '/help'],
                  ],
              ],
          ],
      ]
  );

  if (!empty($result['error'])) {
      echo 'Error: ' . $result['error_description'];
  } else {
      echo 'Message ID: ' . $result['result']['id'];
  }
  ```

{% endlist %}

## Как обновить или удалить клавиатуру

Для обновления кнопок используйте методы:

- [imbot.v2.Chat.Message.update](./chat-message-update.md)
- [im.message.update](../../../../chats/messages/im-message-update.md)
- [imbot.message.update](../../../outdated/messages/imbot-message-update.md)

Чтобы отключить вывод кнопок, передайте:

- `KEYBOARD: 'N'`
- пустое значение `KEYBOARD`

## Обработка команд чат-ботом {#command-processing}

1. Чтобы команда отрабатывала в клавиатуре, зарегистрируйте ее через метод [imbot.v2.Command.register](../commands/command-register.md).

2. Нажатие на кнопку сформирует событие [ONIMBOTV2COMMANDADD](../events/events.md#onimbotv2commandadd).

3. В событии значение `command.context` показывает, в каком контексте была вызвана команда:
- `textarea` — введена вручную
- `keyboard` — вызвана кнопкой
- `menu` — вызвана из контекстного меню
