# Работа с контекстным меню

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Контекстное меню — это набор действий в сообщении. Вы можете добавить свои пункты в контекстное меню, чтобы открывать ссылки или отправлять команды боту.

Методы, которые поддерживают работу с контекстным меню:

- [imbot.message.add](../../chat-bots/outdated/messages/imbot-message-add.md) — отправить сообщение от имени чат-бота
- [imbot.message.update](../../chat-bots/outdated/messages/imbot-message-update.md) — изменить отправленное сообщение чат-бота
- [imbot.command.answer](../../chat-bots/outdated/commands/imbot-command-answer.md) — отправить ответ на команду чат-бота
- [im.message.add](./im-message-add.md) — отправить сообщение в чат
- [im.message.update](./im-message-update.md) — изменить отправленное сообщение

## Как добавить пункт в контекстное меню

Чтобы добавить пункт в контекстное меню, при создании или обновлении сообщения передайте параметр `MENU`.

`MENU` можно передавать:

- строкой JSON
- объектом с корневым ключом `ITEMS`
- массивом пунктов без обертки

Если в `MENU` нет ключа `ITEMS`, сервер автоматически считает, что передан сокращенный формат, и оборачивает массив в `ITEMS`.

{% list tabs %}

- Полный формат с ключом ITEMS

  ```json
  {
      "MENU": {
          "ITEMS": [
              { "TEXT": "Открыть сайт", "LINK": "https://example.com" }
          ]
      }
  }
  ```

- Сокращенный формат

  ```json
  {
      "MENU": [
          { "TEXT": "Открыть сайт", "LINK": "https://example.com" }
      ]
  }
  ```

{% endlist %}

## Поля пункта меню

#|
|| **Название**
`тип` | **Описание** ||
|| **TEXT**
[`string`](../../data-types.md) | Текст пункта меню.

Для пунктов меню обязательно указывать `TEXT` и одно поле действия — `LINK`, `COMMAND`, `ACTION + ACTION_VALUE` или `APP_ID` ||
|| **LINK**
[`string`](../../data-types.md) | Ссылка пункта меню. Допустимы `http/https` и относительный путь `/...` ||
|| **COMMAND**
[`string`](../../data-types.md) | Команда для бота.

Подробнее об обработке команд чат-ботом читайте [ниже](#command-processing) ||
|| **COMMAND_PARAMS**
[`string`](../../data-types.md) | Параметры команды. Передавайте вместе с `COMMAND` ||
|| **APP_ID**
[`integer`](../../data-types.md) | Идентификатор приложения для чата.

Устаревший сценарий. Чтобы открыть приложение из чата, используйте встройки ||
|| **APP_PARAMS**
[`string`](../../data-types.md) | Параметры запуска приложения для чата. Передавайте вместе с `APP_ID`. 

Устаревший сценарий. Чтобы открыть приложение из чата, используйте встройки

{% note info "" %}

На текущий момент вариант с параметрами `APP_ID` и `APP_PARAMS` используется в чатах [Открытых линий](../../imopenlines/openlines/index.md)

{% endnote %}
||
|| **ACTION**
[`string`](../../data-types.md) | Действие:

- `PUT` — вставить текст в поле ввода
- `SEND` — отправить текст
- `COPY` — копировать текст в буфер обмена
- `CALL` — позвонить
- `DIALOG` — открыть чат

Доступно начиная с [ревизии REST API IM](../im-revision-get.md) 28 ||
|| **ACTION_VALUE**
[`string`](../../data-types.md) | Значение для `ACTION`:

- `PUT` — текст, который будет вставлен в поле ввода
- `SEND` — текст, который будет отправлен
- `COPY` — текст, который будет скопирован в буфер обмена
- `CALL` — номер телефона в международном формате
- `DIALOG` — идентификатор чата в формате `chatXXX` для группового чата и `ID` пользователя для личного чата

Доступно начиная с [ревизии REST API IM](../im-revision-get.md) 28 ||
|| **CONTEXT**
[`string`](../../data-types.md) | Контекст отображения.

Допустимые значения:
- `MOBILE` — показывать только на мобильном устройстве
- `DESKTOP` — показывать только в десктопной версии
- `ALL` — показывать везде

По умолчанию — `ALL` ||
|| **DISABLED**
[`string`](../../data-types.md) | Активность пункта меню.

Допустимые значения:
- `Y` — пункт меню неактивен
- `N` — пункт меню активен

По умолчанию — `N` ||
|#

## Пример отправки сообщения с контекстным меню

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие в меню","URL_PREVIEW":"Y","MENU":{"ITEMS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TEXT":"Отправить текст","ACTION":"SEND","ACTION_VALUE":"Готово"}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие в меню","URL_PREVIEW":"Y","MENU":{"ITEMS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TEXT":"Отправить текст","ACTION":"SEND","ACTION_VALUE":"Готово"}]}},"auth":"**put_access_token_here**"}' \
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
          MESSAGE: 'Select an action from the menu',
          URL_PREVIEW: 'Y',
          MENU: {
            ITEMS: [
              {
                TEXT: 'Open website',
                LINK: 'https://www.example.ru/',
              },
              {
                TEXT: 'Send text',
                ACTION: 'SEND',
                ACTION_VALUE: 'Done',
              },
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
        console.info('Created message with ID:', result)
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
      async function addMessageWithMenu() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.add',
            params: {
              DIALOG_ID: 'chat2725',
              MESSAGE: 'Select an action from the menu',
              URL_PREVIEW: 'Y',
              MENU: {
                ITEMS: [
                  {
                    TEXT: 'Open website',
                    LINK: 'https://www.example.ru/',
                  },
                  {
                    TEXT: 'Send text',
                    ACTION: 'SEND',
                    ACTION_VALUE: 'Done',
                  },
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
          console.info('Created message with ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addMessageWithMenu)
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
                    'MESSAGE' => 'Выберите действие в меню',
                    'URL_PREVIEW' => 'Y',
                    'MENU' => [
                        'ITEMS' => [
                            [
                                'TEXT' => 'Открыть сайт',
                                'LINK' => 'https://www.example.ru/'
                            ],
                            [
                                'TEXT' => 'Отправить текст',
                                'ACTION' => 'SEND',
                                'ACTION_VALUE' => 'Готово'
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.add',
        {
            DIALOG_ID: 'chat2725',
            MESSAGE: 'Выберите действие в меню',
            URL_PREVIEW: 'Y',
            MENU: {
                ITEMS: [
                    {
                        TEXT: 'Открыть сайт',
                        LINK: 'https://www.example.ru/'
                    },
                    {
                        TEXT: 'Отправить текст',
                        ACTION: 'SEND',
                        ACTION_VALUE: 'Готово',
                    }
                ]
            }
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
            'MESSAGE' => 'Выберите действие в меню',
            'URL_PREVIEW' => 'Y',
            'MENU' => [
                'ITEMS' => [
                    [
                        'TEXT' => 'Открыть сайт',
                        'LINK' => 'https://www.example.ru/'
                    ],
                    [
                        'TEXT' => 'Отправить текст',
                        'ACTION' => 'SEND',
                        'ACTION_VALUE' => 'Готово'
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Как обновить или удалить контекстное меню

Для обновления пунктов меню используйте методы:

- [im.message.update](./im-message-update.md)
- [imbot.message.update](../../chat-bots/outdated/messages/imbot-message-update.md)

Чтобы отключить показ дополнительных пунктов меню, передайте:

- `MENU: 'N'`
- пустое значение `MENU`

## Обработка команд чат-ботом {#command-processing}

1. Чтобы команда отрабатывала в меню, зарегистрируйте ее через метод [imbot.command.register](../../chat-bots/outdated/commands/imbot-command-register.md).

    В пункте меню укажите следующие ключи:

    ```php
    "COMMAND" => "example", // команда, которая будет отправлена чат-боту
    "COMMAND_PARAMS" => "example", // параметры для команды
     ```  
     
2. Нажатие на пункт меню сформирует событие [ONIMCOMMANDADD](../../chat-bots/outdated/commands/events/on-im-command-add.md).
3. Внутри события в массиве `data[COMMAND]` будут переданы данные о вызванном событии. Значение `COMMAND_CONTEXT` покажет в каком контексте была вызвана команда:
   - `TEXTAREA` — команда введена вручную
   - `KEYBOARD` — команда вызвана кнопкой
   - `MENU` — команда вызвана из контекстного меню

