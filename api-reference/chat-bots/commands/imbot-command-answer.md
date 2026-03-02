# Отправить ответ на команду imbot.command.answer

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.command.answer` публикует ответ на команду чат-бота.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMAND_ID***
[`integer`](../../data-types.md) | Идентификатор команды. Обязателен, если не передан `COMMAND` ||
|| **COMMAND***
[`string`](../../data-types.md) | Текст команды. Обязателен, если не передан `COMMAND_ID` ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения, на которое отправляется ответ.

Идентификатор можно узнать из входящего события [ONIMCOMMANDADD](./events/on-im-command-add.md) ||
|| **MESSAGE***
[`string`](../../data-types.md) | Текст ответа ||
|| **ATTACH**
[`object`](../../data-types.md) | Объект с вложением к сообщению. Минимальный формат: 

```json
{
  "BLOCKS": [
    { "MESSAGE": "Текст блока" }
  ]
}
```

[Подробное описание](../../chats/messages/attachments/index.md)||
|| **KEYBOARD**
[`object`](../../data-types.md) | Клавиатура сообщения. Минимальный формат:

```json
{
  "BUTTONS": [
    { "TEXT": "Повторить", "COMMAND": "echo repeat" }
  ]
}
```

[Подробное описание](../../chats/messages/keyboards.md) ||
|| **MENU**
[`object`](../../data-types.md) | Контекстное меню сообщения. Минимальный формат:

```json
[
  { "TEXT": "bitrix24", "LINK": "https://bitrix24.ru" }
]
```

[Подробное описание](../../chats/messages/menu.md) ||
|| **SYSTEM**
[`string`](../../data-types.md) | Тип сообщения:
- `Y` - системное сообщение
- `N` - обычное сообщение

По умолчанию - `N` ||
|| **URL_PREVIEW**
[`string`](../../data-types.md) | Преобразование ссылок в rich-ссылки:
- `Y` - включено
- `N` - выключено

По умолчанию - `Y`.

Работает для ссылок, переданных в поле `MESSAGE` ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации.

Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"COMMAND_ID":99,"MESSAGE_ID":33871,"MESSAGE":"Принято. Выполняю команду.","SYSTEM":"N","URL_PREVIEW":"Y","ATTACH":{"BLOCKS":[{"MESSAGE":"Детали задачи"},{"DELIMITER":true},{"LINK":{"NAME":"Открыть","LINK":"https://example.com"}}]},"KEYBOARD":{"BUTTONS":[{"TEXT":"Повторить","COMMAND":"echo repeat"}]},"MENU":[{"TEXT":"bitrix24","LINK":"https://bitrix24.ru"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.command.answer
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"COMMAND_ID":99,"MESSAGE_ID":33871,"MESSAGE":"Принято. Выполняю команду.","SYSTEM":"N","URL_PREVIEW":"Y","ATTACH":{"BLOCKS":[{"MESSAGE":"Детали задачи"},{"DELIMITER":true},{"LINK":{"NAME":"Открыть","LINK":"https://example.com"}}]},"KEYBOARD":{"BUTTONS":[{"TEXT":"Повторить","COMMAND":"echo repeat"}]},"MENU":[{"TEXT":"bitrix24","LINK":"https://bitrix24.ru"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.command.answer
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.command.answer',
            {
                COMMAND_ID: 99,
                MESSAGE_ID: 33871,
                MESSAGE: 'Принято. Выполняю команду.',
                SYSTEM: 'N',
                URL_PREVIEW: 'Y',
                ATTACH: {
                    BLOCKS: [
                        {MESSAGE: 'Детали задачи'},
                        {DELIMITER: true},
                        {LINK: {NAME: 'Открыть', LINK: 'https://example.com'}}
                    ]
                },
                KEYBOARD: {
                    BUTTONS: [
                        {TEXT: 'Повторить', COMMAND: 'echo repeat'}
                    ]
                },
                MENU: [
                    {TEXT: 'bitrix24', LINK: 'https://bitrix24.ru'}
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Answered command with ID:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.command.answer',
                [
                    'COMMAND_ID' => 99,
                    'MESSAGE_ID' => 33871,
                    'MESSAGE' => 'Принято. Выполняю команду.',
                    'SYSTEM' => 'N',
                    'URL_PREVIEW' => 'Y',
                    'ATTACH' => [
                        'BLOCKS' => [
                            ['MESSAGE' => 'Детали задачи'],
                            ['DELIMITER' => true],
                            ['LINK' => ['NAME' => 'Открыть', 'LINK' => 'https://example.com']]
                        ]
                    ],
                    'KEYBOARD' => [
                        'BUTTONS' => [
                            ['TEXT' => 'Повторить', 'COMMAND' => 'echo repeat']
                        ]
                    ],
                    'MENU' => [
                        ['TEXT' => 'bitrix24', 'LINK' => 'https://bitrix24.ru']
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
        echo 'Error answering command: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.command.answer',
        {
            COMMAND_ID: 99,
            MESSAGE_ID: 33871,
            MESSAGE: 'Принято. Выполняю команду.',
            SYSTEM: 'N',
            URL_PREVIEW: 'Y',
            ATTACH: {
                BLOCKS: [
                    {MESSAGE: 'Детали задачи'},
                    {DELIMITER: true},
                    {LINK: {NAME: 'Открыть', LINK: 'https://example.com'}}
                ]
            },
            KEYBOARD: {
                BUTTONS: [
                    {TEXT: 'Повторить', COMMAND: 'echo repeat'}
                ]
            },
            MENU: [
                    {TEXT: 'bitrix24', LINK: 'https://bitrix24.ru'}
            ]
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.command.answer',
        [
            'COMMAND_ID' => 99,
            'MESSAGE_ID' => 33871,
            'MESSAGE' => 'Принято. Выполняю команду.',
            'SYSTEM' => 'N',
            'URL_PREVIEW' => 'Y',
            'ATTACH' => [
                'BLOCKS' => [
                    ['MESSAGE' => 'Детали задачи'],
                    ['DELIMITER' => true],
                    ['LINK' => ['NAME' => 'Открыть', 'LINK' => 'https://example.com']]
                ]
            ],
            'KEYBOARD' => [
                'BUTTONS' => [
                    ['TEXT' => 'Повторить', 'COMMAND' => 'echo repeat']
                ]
            ],
            'MENU' => [
                ['TEXT' => 'bitrix24', 'LINK' => 'https://bitrix24.ru']
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 33879,
    "time": {
        "start": 1772102358,
        "finish": 1772102359.061859,
        "duration": 1.061858892440796,
        "processing": 1,
        "date_start": "2026-02-26T13:39:18+03:00",
        "date_finish": "2026-02-26T13:39:19+03:00",
        "operating_reset_at": 1772102958,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор отправленного сообщения-ответа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MESSAGE_EMPTY",
    "error_description": "Message can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `COMMAND_ID_ERROR` | Command not found | Команда не найдена ||
|| `APP_ID_ERROR` | Command was installed by another rest application | Команда зарегистрирована другим приложением ||
|| `MESSAGE_ID_EMPTY` | Message ID can't be empty | Не передан `MESSAGE_ID` ||
|| `MESSAGE_EMPTY` | Message can't be empty | Не передан текст сообщения ||
|| `ATTACH_ERROR` | Incorrect attach params | Невалидный объект `ATTACH` ||
|| `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Размер `ATTACH` превышает допустимый ||
|| `KEYBOARD_ERROR` | Incorrect keyboard params | Невалидный объект `KEYBOARD` ||
|| `KEYBOARD_OVERSIZE` | You have exceeded the maximum allowable size of keyboard | Размер `KEYBOARD` превышает допустимый ||
|| `MENU_ERROR` | Incorrect menu params | Невалидный объект `MENU` ||
|| `WRONG_REQUEST` | Message isn't added | Не удалось отправить сообщение ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-command-register.md)
- [{#T}](./imbot-command-update.md)
- [{#T}](./imbot-command-unregister.md)
- [{#T}](./events/on-im-command-add.md)
- [{#T}](../../chats/messages/keyboards.md)
- [{#T}](../../chats/messages/attachments/index.md)
- [{#T}](../../chats/messages/menu.md)
