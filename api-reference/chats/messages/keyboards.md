# Работа с клавиатурами
Клавиатура — это кнопки под сообщением. С их помощью можно открывать ссылки, выполнять действия и вызывать команды. 

Методы, которые поддерживают работу с клавиатурой:

- [imbot.message.add](../../chat-bots/outdated/messages/imbot-message-add.md) — отправить сообщение от имени чат-бота
- [imbot.message.update](../../chat-bots/outdated/messages/imbot-message-update.md) — изменить отправленное сообщение чат-бота
- [imbot.command.answer](../../chat-bots/outdated/commands/imbot-command-answer.md) — отправить ответ на команду чат-бота
- [imbot.v2.Chat.Message.send](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md) — отправить сообщение от имени чат-бота (v2)
- [imbot.v2.Chat.Message.update](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-update.md) — изменить отправленное сообщение чат-бота (v2)
- [imbot.v2.Command.answer](../../chat-bots/chat-bots-v2/imbot.v2/commands/command-answer.md) — отправить ответ на команду чат-бота (v2)
- [im.message.add](./im-message-add.md) — отправить сообщение в чат
- [im.message.update](./im-message-update.md) — изменить отправленное сообщение

## Как добавить клавиатуру

Чтобы добавить клавиатуру, при создании или обновлении сообщения передайте параметр `KEYBOARD`.

`KEYBOARD` можно передавать:

- строкой JSON
- объектом с корневым ключом `BUTTONS`
- массивом кнопок без обертки 

Если в `KEYBOARD` нет ключа `BUTTONS`, сервер автоматически считает, что передан сокращенный формат, и оборачивает массив в `BUTTONS`.

{% list tabs %}

- Полный формат с ключом BUTTONS

  ```json
  {
      "KEYBOARD": {
          "BUTTONS": [
          { "TEXT": "Кнопка", "LINK": "https://example.ru" }
          ]
      }
  }
  ```

- Сокращенный формат

  ```json
  {
      "KEYBOARD": [
          { "TEXT": "Кнопка", "LINK": "https://example.ru" }
          ]
  }
  ```

{% endlist %}

## Поля кнопки

#|
|| **Название**
`тип` | **Описание** ||
|| **TEXT**
[`string`](../../data-types.md) | Текст кнопки.

Для всех кнопок, кроме `TYPE`, обязательно указывать `TEXT` и одно поле действия — `LINK`, `COMMAND`, `ACTION + ACTION_VALUE` или `APP_ID` ||
|| **TYPE**
[`string`](../../data-types.md) | Перенос кнопки на новую строку. Единственное допустимое значение — `NEWLINE` ||
|| **LINK**
[`string`](../../data-types.md) | Ссылка кнопки. Допустимы `http/https` и относительный путь `/...` ||
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
|| **COMMAND**
[`string`](../../data-types.md) | Команда для бота.

Подробнее об обработке команд чат-ботом читайте [ниже](#command-processing) ||
|| **COMMAND_PARAMS**
[`string`](../../data-types.md) | Параметры команды. Передавайте вместе с `COMMAND` ||
|| **BLOCK**
[`string`](../../data-types.md) | Блокировка кнопки.

Допустимые значения:
- `Y` — блокировать кнопку после нажатия
- `N` — не блокировать кнопку после нажатия 

По умолчанию — `N` ||
|| **DISABLED**
[`string`](../../data-types.md) | Активность кнопки.

Допустимые значения:
- `Y` — кнопка неактивна
- `N` — кнопка активна

По умолчанию — `N` ||
|| **CONTEXT**
[`string`](../../data-types.md) | Контекст отображения.

Допустимые значения:
- `MOBILE` — показывать только на мобильном устройстве
- `DESKTOP` — показывать только в десктопной версии
- `ALL` — показывать везде
 
По умолчанию — `ALL` ||
|| **DISPLAY**
[`string`](../../data-types.md) | Отображение кнопки.

Допустимые значения:
 - `LINE` — кнопка в строке
 - `BLOCK` — кнопка отдельным блоком
 
По умолчанию — `BLOCK` ||
|| **WIDTH**
[`integer`](../../data-types.md) | Ширина кнопки в пикселях ||
|| **BG_COLOR**
[`string`](../../data-types.md) | Цвет кнопки в формате HEX-кода ||
|| **BG_COLOR_TOKEN**
[`string`](../../data-types.md) | Токен цвета кнопки.

Допустимые значения:
 - `primary` — основной акцентный стиль
 - `secondary` — вторичный стиль
 - `alert` — предупреждающий стиль
 - `base` — базовый нейтральный стиль
 
По умолчанию — `base` ||
|| **TEXT_COLOR**
[`string`](../../data-types.md) | Цвет текста кнопки в формате HEX-кода  ||
|| **OFF_BG_COLOR**
[`string`](../../data-types.md) | Цвет кнопки в формате HEX-кода в неактивном состоянии ||
|| **OFF_TEXT_COLOR**
[`string`](../../data-types.md) | Цвет текста кнопки в формате HEX-кода в неактивном состоянии ||
|#

## Пример отправки чат-ботом сообщения с клавиатурой

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"BOT_ID":1291,"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие","URL_PREVIEW":"Y","KEYBOARD":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/","DISPLAY":"LINE","BG_COLOR_TOKEN":"primary"},{"TEXT":"Команда task","COMMAND":"task","COMMAND_PARAMS":"задача №1","DISPLAY":"LINE","BG_COLOR_TOKEN":"secondary"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить текст","ACTION":"PUT","ACTION_VALUE":"/task задача №1","DISPLAY":"BLOCK","BG_COLOR_TOKEN":"alert","TEXT_COLOR":"#FFFFFF"},{"TEXT":"Нейтральная кнопка","ACTION":"SEND","ACTION_VALUE":"Готово","DISPLAY":"BLOCK","BG_COLOR_TOKEN":"base"}]},"CLIENT_ID":"**put_your_client_id_here**"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.message.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"BOT_ID":1291,"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие","URL_PREVIEW":"Y","KEYBOARD":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/","DISPLAY":"LINE","BG_COLOR_TOKEN":"primary"},{"TEXT":"Команда task","COMMAND":"task","COMMAND_PARAMS":"задача №1","DISPLAY":"LINE","BG_COLOR_TOKEN":"secondary"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить текст","ACTION":"PUT","ACTION_VALUE":"/task задача №1","DISPLAY":"BLOCK","BG_COLOR_TOKEN":"alert","TEXT_COLOR":"#FFFFFF"},{"TEXT":"Нейтральная кнопка","ACTION":"SEND","ACTION_VALUE":"Готово","DISPLAY":"BLOCK","BG_COLOR_TOKEN":"base"}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.message.add
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imbot.message.add',
            {
                BOT_ID: 1291,
                DIALOG_ID: 'chat2725',
                MESSAGE: 'Выберите действие',
                URL_PREVIEW: 'Y',
                KEYBOARD: {
                    BUTTONS: [
                        {
                            TEXT: 'Открыть сайт',
                            LINK: 'https://www.example.ru/',
                            DISPLAY: 'LINE',
                            BG_COLOR_TOKEN: 'primary'
                        },
                        {
                            TEXT: 'Команда task',
                            COMMAND: 'task',
                            COMMAND_PARAMS: 'задача №1',
                            DISPLAY: 'LINE',
                            BG_COLOR_TOKEN: 'secondary'
                        },
                        { TYPE: 'NEWLINE' },
                        {
                            TEXT: 'Подставить текст',
                            ACTION: 'PUT',
                            ACTION_VALUE: '/task задача №1',
                            DISPLAY: 'BLOCK',
                            BG_COLOR_TOKEN: 'alert',
                            TEXT_COLOR: '#FFFFFF'
                        },
                        {
                            TEXT: 'Нейтральная кнопка',
                            ACTION: 'SEND',
                            ACTION_VALUE: 'Готово',
                            DISPLAY: 'BLOCK',
                            BG_COLOR_TOKEN: 'base'
                        }
                    ]
                }
            }
        );

        const result = response.getData().result;
        console.log('Created message with ID:', result);
        processResult(result);
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
                'imbot.message.add',
                [
                    'BOT_ID' => 1291,
                    'DIALOG_ID' => 'chat2725',
                    'MESSAGE' => 'Выберите действие',
                    'URL_PREVIEW' => 'Y',
                    'KEYBOARD' => [
                        'BUTTONS' => [
                            [
                                'TEXT' => 'Открыть сайт',
                                'LINK' => 'https://www.example.ru/',
                                'DISPLAY' => 'LINE',
                                'BG_COLOR_TOKEN' => 'primary'
                            ],
                            [
                                'TEXT' => 'Команда task',
                                'COMMAND' => 'task',
                                'COMMAND_PARAMS' => 'задача №1',
                                'DISPLAY' => 'LINE',
                                'BG_COLOR_TOKEN' => 'secondary'
                            ],
                            ['TYPE' => 'NEWLINE'],
                            [
                                'TEXT' => 'Подставить текст',
                                'ACTION' => 'PUT',
                                'ACTION_VALUE' => '/task задача №1',
                                'DISPLAY' => 'BLOCK',
                                'BG_COLOR_TOKEN' => 'alert',
                                'TEXT_COLOR' => '#FFFFFF'
                            ],
                            [
                                'TEXT' => 'Нейтральная кнопка',
                                'ACTION' => 'SEND',
                                'ACTION_VALUE' => 'Готово',
                                'DISPLAY' => 'BLOCK',
                                'BG_COLOR_TOKEN' => 'base'
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
        'imbot.message.add',
        {
            BOT_ID: 1291,
            DIALOG_ID: 'chat2725',
            MESSAGE: 'Выберите действие',
            URL_PREVIEW: 'Y',
            KEYBOARD: {
                BUTTONS: [
                    {
                        TEXT: 'Открыть сайт',
                        LINK: 'https://www.example.ru/',
                        DISPLAY: 'LINE',
                        BG_COLOR_TOKEN: 'primary'
                    },
                    {
                        TEXT: 'Команда task',
                        COMMAND: 'task',
                        COMMAND_PARAMS: 'задача №1',
                        DISPLAY: 'LINE',
                        BG_COLOR_TOKEN: 'secondary'
                    },

                    { TYPE: 'NEWLINE' },

                    {
                        TEXT: 'Подставить текст',
                        ACTION: 'PUT',
                        ACTION_VALUE: '/task задача №1',
                        DISPLAY: 'BLOCK',
                        BG_COLOR_TOKEN: 'alert',
                        TEXT_COLOR: '#FFFFFF'
                    },
                    {
                        TEXT: 'Нейтральная кнопка',
                        ACTION: 'SEND',
                        ACTION_VALUE: 'Готово',
                        DISPLAY: 'BLOCK',
                        BG_COLOR_TOKEN: 'base'
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
        'imbot.message.add',
        [
            'BOT_ID' => 1291,
            'DIALOG_ID' => 'chat2725',
            'MESSAGE' => 'Выберите действие',
            'URL_PREVIEW' => 'Y',
            'KEYBOARD' => [
                'BUTTONS' => [
                    [
                        'TEXT' => 'Открыть сайт',
                        'LINK' => 'https://www.example.ru/',
                        'DISPLAY' => 'LINE',
                        'BG_COLOR_TOKEN' => 'primary'
                    ],
                    [
                        'TEXT' => 'Команда task',
                        'COMMAND' => 'task',
                        'COMMAND_PARAMS' => 'задача №1',
                        'DISPLAY' => 'LINE',
                        'BG_COLOR_TOKEN' => 'secondary'
                    ],
                    ['TYPE' => 'NEWLINE'],
                    [
                        'TEXT' => 'Подставить текст',
                        'ACTION' => 'PUT',
                        'ACTION_VALUE' => '/task задача №1',
                        'DISPLAY' => 'BLOCK',
                        'BG_COLOR_TOKEN' => 'alert',
                        'TEXT_COLOR' => '#FFFFFF'
                    ],
                    [
                        'TEXT' => 'Нейтральная кнопка',
                        'ACTION' => 'SEND',
                        'ACTION_VALUE' => 'Готово',
                        'DISPLAY' => 'BLOCK',
                        'BG_COLOR_TOKEN' => 'base'
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

## Как обновить или удалить клавиатуру

Для обновления кнопок клавиатуры используйте методы:

- [im.message.update](./im-message-update.md)
- [imbot.message.update](../../chat-bots/outdated/messages/imbot-message-update.md)
- [imbot.v2.Chat.Message.update](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-update.md)

Чтобы отключить вывод кнопок, передайте:

- `KEYBOARD: 'N'`
- пустое значение `KEYBOARD`

## Обработка команд чат-ботом {#command-processing}

1. Чтобы команда отрабатывала в клавиатуре, зарегистрируйте ее через метод [imbot.command.register](../../chat-bots/outdated/commands/imbot-command-register.md).

    В кнопке укажите следующие ключи:

    ```php
    "COMMAND" => "example", // команда, которая будет отправлена чат-боту
    "COMMAND_PARAMS" => "example", // параметры для команды
     ```  

2. Нажатие на кнопку сформирует событие [ONIMCOMMANDADD](../../chat-bots/outdated/commands/events/on-im-command-add.md).
3. Внутри события в массиве `data[COMMAND]` будут переданы данные о вызванном событии. Значение `COMMAND_CONTEXT` покажет в каком контексте была вызвана команда:
   - `TEXTAREA` — команда введена вручную
   - `KEYBOARD` — команда вызвана кнопкой
   - `MENU` — команда вызвана из контекстного меню
