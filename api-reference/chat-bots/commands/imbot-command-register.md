# Добавить команду imbot.command.register

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.command.register` регистрирует команду для чат-бота.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **BOT_ID***
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить идентификатор бота можно с помощью метода [imbot.bot.list](../imbot-bot-list.md) ||
|| **COMMAND***
[`string`](../../data-types.md) | Текст команды, которую пользователь вводит в чате. Можно использовать латинские буквы и цифры без пробелов и специальных символов ||
|| **EVENT_COMMAND_ADD***
[`string`](../../data-types.md) | URL обработчика события [ONIMCOMMANDADD](./events/on-im-command-add.md), который вызывается при использовании команды ||
|| **LANG***
[`array`](../../data-types.md) | Массив локализаций команды. Структура описана [ниже](#lang) ||
|| **COMMON**
[`string`](../../data-types.md) | Доступность команды:
- `Y` - команда доступна в любых чатах
- `N` - команда доступна только там, где есть бот

По умолчанию - `N` ||
|| **HIDDEN**
[`string`](../../data-types.md) | Видимость команды:
- `Y` - скрытая команда
- `N` - видимая команда

По умолчанию - `N` ||
|| **EXTRANET_SUPPORT**
[`string`](../../data-types.md) | Доступность команды пользователям экстранета:
- `Y` - доступна
- `N` - недоступна

По умолчанию - `N` ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации.

Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|#

### Параметр LANG {#lang}

#|
|| **Название**
`тип` | **Описание** ||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Идентификатор языка, например `ru` или `en` ||
|| **TITLE***
[`string`](../../data-types.md) | Название команды на выбранном языке ||
|| **PARAMS**
[`string`](../../data-types.md) | Подсказка по параметрам команды на выбранном языке ||
|#

{% note info "" %}

При регистрации нескольких команд указывайте один и тот же URL в `EVENT_COMMAND_ADD`, а разбор конкретной команды выполняйте в коде обработчика по `COMMAND`/`COMMAND_ID`

{% endnote %}

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"BOT_ID":1291,"COMMAND":"echo","EVENT_COMMAND_ADD":"https://example.com/bot/command.php","LANG":[{"LANGUAGE_ID":"ru","TITLE":"Эхо","PARAMS":"текст"},{"LANGUAGE_ID":"en","TITLE":"Echo","PARAMS":"text"}],"COMMON":"Y","HIDDEN":"N","EXTRANET_SUPPORT":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.command.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"BOT_ID":1291,"COMMAND":"echo","EVENT_COMMAND_ADD":"https://example.com/bot/command.php","LANG":[{"LANGUAGE_ID":"ru","TITLE":"Эхо","PARAMS":"текст"},{"LANGUAGE_ID":"en","TITLE":"Echo","PARAMS":"text"}],"COMMON":"Y","HIDDEN":"N","EXTRANET_SUPPORT":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.command.register
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.command.register',
            {
                BOT_ID: 1291,
                COMMAND: 'echo',
                EVENT_COMMAND_ADD: 'https://example.com/bot/command.php',
                LANG: [
                    { LANGUAGE_ID: 'ru', TITLE: 'Эхо', PARAMS: 'текст' },
                    { LANGUAGE_ID: 'en', TITLE: 'Echo', PARAMS: 'text' }
                ],
                COMMON: 'Y',
                HIDDEN: 'N',
                EXTRANET_SUPPORT: 'N'
            }
        );
        
        const result = response.getData().result;
        console.log('Created element with ID:', result);
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
                'imbot.command.register',
                [
                    'BOT_ID' => 1291,
                    'COMMAND' => 'echo',
                    'EVENT_COMMAND_ADD' => 'https://example.com/bot/command.php',
                    'LANG' => [
                        ['LANGUAGE_ID' => 'ru', 'TITLE' => 'Эхо', 'PARAMS' => 'текст'],
                        ['LANGUAGE_ID' => 'en', 'TITLE' => 'Echo', 'PARAMS' => 'text']
                    ],
                    'COMMON' => 'Y',
                    'HIDDEN' => 'N',
                    'EXTRANET_SUPPORT' => 'N'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding product row: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.command.register',
        {
            BOT_ID: 1291,
            COMMAND: 'echo',
            EVENT_COMMAND_ADD: 'https://example.com/bot/command.php',
            LANG: [
                { LANGUAGE_ID: 'ru', TITLE: 'Эхо', PARAMS: 'текст' },
                { LANGUAGE_ID: 'en', TITLE: 'Echo', PARAMS: 'text' }
            ],
            COMMON: 'Y',
            HIDDEN: 'N',
            EXTRANET_SUPPORT: 'N'
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
        'imbot.command.register',
        [
            'BOT_ID' => 1291,
            'COMMAND' => 'echo',
            'EVENT_COMMAND_ADD' => 'https://example.com/bot/command.php',
            'LANG' => [
                ['LANGUAGE_ID' => 'ru', 'TITLE' => 'Эхо', 'PARAMS' => 'текст'],
                ['LANGUAGE_ID' => 'en', 'TITLE' => 'Echo', 'PARAMS' => 'text']
            ],
            'COMMON' => 'Y',
            'HIDDEN' => 'N',
            'EXTRANET_SUPPORT' => 'N'
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
    "result": 99,
    "time": {
        "start": 1772088116,
        "finish": 1772088116.785232,
        "duration": 0.7852320671081543,
        "processing": 0,
        "date_start": "2026-02-26T09:41:56+03:00",
        "date_finish": "2026-02-26T09:41:56+03:00",
        "operating_reset_at": 1772088716,
        "operating": 0.49926185607910156
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор зарегистрированной команды ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "COMMAND_ERROR",
    "error_description": "Command isn't specified"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `EVENT_COMMAND_ADD_ERROR` | Handler for "Command add" event isn't specified | Не передан параметр `EVENT_COMMAND_ADD` ||
|| `EVENT_COMMAND_ADD_ERROR` | Wrong handler URL | Передан невалидный URL обработчика события добавления команды ||
|| `COMMAND_ERROR` | Command isn't specified | Не указан текст команды ||
|| `BOT_ID_ERROR` | Bot not found | Чат-бот не найден ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Чат-бот зарегистрирован другим приложением ||
|| `LANG_ERROR` | Lang set can't be empty | Не передан массив локализаций `LANG` ||
|| `WRONG_REQUEST` | Command can't be created | Не удалось зарегистрировать команду ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-command-update.md)
- [{#T}](./imbot-command-unregister.md)
- [{#T}](./imbot-command-answer.md)
- [{#T}](./events/on-im-command-add.md)
