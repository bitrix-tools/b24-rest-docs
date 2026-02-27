# Создать чат-бота imbot.register

> Scope: [`imbot`](../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое регистрирует чат-бота

Метод `imbot.register` регистрирует чат-бота и привязывает обработчики событий приложения.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CODE***
[`string`](../data-types.md) | Строковый код бота, уникальный в рамках Битрикс24 ||
|| **TYPE**
[`string`](../data-types.md) | Тип бота.

Допустимые значения:
- `B` — стандартный чат-бот. В групповых чатах видит сообщения, которые адресованы именно ему.
- `O` — чат-бот для Открытых линий.
- `H` — чат-бот в режиме «человек» (human). Перед автоответом включает статус «печатает...» `startWriting`.
- `S` — чат-бот с повышенными привилегиями (supervisor). Читает все сообщения в чатах, в которых состоит. Если бота добавили с показом истории, он видит старые и новые сообщения. Если без истории — только новые сообщения.

Значение по умолчанию: `B` ||
|| **OPENLINE**
[`string`](../data-types.md) | Режим работы с Открытыми линиями. 

Допустимые значения: 
- `Y` — включить режим поддержки Открытых линий
- `N` — отключить, значение по умолчанию

Для `TYPE=O` параметр можно не указывать. Значение будет принудительно установлено в `Y` ||
|| **EVENT_HANDLER**
[`string`](../data-types.md) | Общий URL обработчика событий. Если передан, его значение копируется в `EVENT_MESSAGE_ADD`, `EVENT_MESSAGE_UPDATE`, `EVENT_MESSAGE_DELETE`, `EVENT_WELCOME_MESSAGE`, `EVENT_BOT_DELETE`.

Если нужны разные обработчики, не передавайте `EVENT_HANDLER`. Задайте отдельные URL в параметрах `EVENT_MESSAGE_ADD`, `EVENT_MESSAGE_UPDATE`, `EVENT_MESSAGE_DELETE`, `EVENT_WELCOME_MESSAGE`, `EVENT_BOT_DELETE` ||
|| **EVENT_MESSAGE_ADD***
[`string`](../data-types.md) | URL обработчика события [ONIMBOTMESSAGEADD](./messages/events/on-imbot-message-add.md) ||
|| **EVENT_MESSAGE_UPDATE**
[`string`](../data-types.md) | URL обработчика события [ONIMBOTMESSAGEUPDATE](./messages/events/on-imbot-message-update.md).

Параметр игнорируется только для ботов с `TYPE=B/H` и `OPENLINE=N` ||
|| **EVENT_MESSAGE_DELETE**
[`string`](../data-types.md) | URL обработчика события [ONIMBOTMESSAGEDELETE](./messages/events/on-imbot-message-delete.md).

Параметр игнорируется только для ботов с `TYPE=B/H` и `OPENLINE=N` ||
|| **EVENT_WELCOME_MESSAGE***
[`string`](../data-types.md) | URL обработчика события [ONIMBOTJOINCHAT](./chats/events/on-imbot-join-chat.md) ||
|| **EVENT_BOT_DELETE***
[`string`](../data-types.md) | URL обработчика события [ONIMBOTDELETE](./events/on-imbot-delete.md) ||
|| **CLIENT_ID**
[`string`](../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации. Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|| **PROPERTIES***
[`object`](../data-types.md) | Свойства профиля чат-бота. Структура объекта подробно описана [ниже](#properties) ||
|#

### Параметр PROPERTIES {#properties}

#|
|| **Название**
`Тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Имя чат-бота. Обязательно передать `NAME` или `LAST_NAME` ||
|| **LAST_NAME***
[`string`](../data-types.md) | Фамилия чат-бота. Обязательно передать `NAME` или `LAST_NAME` ||
|| **COLOR**
[`string`](../data-types.md) | Цвет чат-бота для мобильного интерфейса: `RED`, `GREEN`, `MINT`, `LIGHT_BLUE`, `DARK_BLUE`, `PURPLE`, `AQUA`, `PINK`, `LIME`, `BROWN`, `AZURE`, `KHAKI`, `SAND`, `MARENGO`, `GRAY`, `GRAPHITE` ||
|| **EMAIL**
[`string`](../data-types.md) | Email для связи чат-бота. Бот создается как пользователь, поэтому email бота не должен совпадать с email реального пользователя Битрикс24. Это позволит избежать конфликтов учетных записей ||
|| **PERSONAL_BIRTHDAY**
[`string`](../data-types.md) | День рождения в формате `YYYY-MM-DD` ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность или описание чат-бота ||
|| **PERSONAL_WWW**
[`string`](../data-types.md) | Ссылка на сайт ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол, допустимые значения: `M` или `F` ||
|| **PERSONAL_PHOTO**
[`file`](../data-types.md) | Аватар чат-бота в формате [Base64](../files/how-to-upload-files.md)

Размер изображения не должен превышать ограничение в 5000x5000 ||
|#

{% note info "" %}

Если логика приложения позволяет, отправляйте ответ боту при явном упоминании. Проверить это можно по полю `TO_USER_ID`.

{% endnote %}

{% note warning "" %}

В одном приложении можно использовать только один набор URL обработчиков событий.

Если регистрируете второго бота, параметры `EVENT_MESSAGE_ADD`, `EVENT_WELCOME_MESSAGE` и `EVENT_BOT_DELETE` должны совпадать с первым ботом.

Если в приложении несколько ботов, различайте их внутри одного обработчика событий. В событие передавайте массив ботов.

Максимальное количество ботов для одного приложения: `5`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CODE":"newbot","TYPE":"B","EVENT_HANDLER":"https://example.ru/bot/events","OPENLINE":"N","PROPERTIES":{"NAME":"NewBot","WORK_POSITION":"Support bot"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CODE":"newbot","TYPE":"B","EVENT_HANDLER":"https://example.ru/bot/events","OPENLINE":"N","PROPERTIES":{"NAME":"NewBot"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.register
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.register', {
        CODE: 'newbot',
        TYPE: 'B',
        EVENT_HANDLER: 'https://example.ru/bot/events',
        OPENLINE: 'N',
        PROPERTIES: {
          NAME: 'NewBot',
          WORK_POSITION: 'Support bot',
        },
      });

      const { result } = response.getData();
      console.log('Created bot ID:', result);
    } catch (error) {
      console.error('Error registering bot:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.register',
                [
                    'CODE' => 'newbot',
                    'TYPE' => 'B',
                    'EVENT_HANDLER' => 'https://example.ru/bot/events',
                    'OPENLINE' => 'N',
                    'PROPERTIES' => [
                        'NAME' => 'NewBot',
                        'WORK_POSITION' => 'Support bot',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Created bot ID: ' . $result->data();
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error registering bot: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.register',
        {
            CODE: 'newbot',
            TYPE: 'B',
            EVENT_HANDLER: 'https://example.ru/bot/events',
            OPENLINE: 'N',
            PROPERTIES: {
                NAME: 'NewBot',
                WORK_POSITION: 'Support bot',
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
        'imbot.register',
        [
            'CODE' => 'newbot',
            'TYPE' => 'B',
            'EVENT_HANDLER' => 'https://example.ru/bot/events',
            'OPENLINE' => 'N',
            'PROPERTIES' => [
                'NAME' => 'NewBot',
                'WORK_POSITION' => 'Support bot',
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Created bot ID: ' . $result['result'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": 39,
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00",
        "operating_reset_at": 1762349466,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного чат-бота `BOT_ID` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CODE_ERROR",
    "error_description": "Bot code isn't specified"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization | Метод вызван с сессионной авторизацией вместо OAuth или вебхука ||
|| `ACCESS_DENIED` | Access denied! Client ID not specified | Не удалось определить приложение: отсутствует `clientId` авторизации и не передан `CLIENT_ID` ||
|| `EVENT_MESSAGE_ADD_ERROR` | Handler for "Message add" event isn't specified | Не передан обязательный обработчик события `EVENT_MESSAGE_ADD` ||
|| `EVENT_MESSAGE_ADD_ERROR` | Wrong handler URL | Передан невалидный URL `EVENT_MESSAGE_ADD` ||
|| `EVENT_MESSAGE_UPDATE_ERROR` | Wrong handler URL | Передан невалидный URL `EVENT_MESSAGE_UPDATE` ||
|| `EVENT_MESSAGE_DELETE_ERROR` | Wrong handler URL | Передан невалидный URL `EVENT_MESSAGE_DELETE` ||
|| `EVENT_WELCOME_MESSAGE_ERROR` | Handler for "Welcome message" event isn't specified | Не передан обязательный обработчик события `EVENT_WELCOME_MESSAGE` ||
|| `EVENT_WELCOME_MESSAGE_ERROR` | Wrong handler URL | Передан невалидный URL `EVENT_WELCOME_MESSAGE` ||
|| `EVENT_BOT_DELETE_ERROR` | Handler for "Bot delete" event isn't specified | Не передан обязательный обработчик события `EVENT_BOT_DELETE` ||
|| `EVENT_BOT_DELETE_ERROR` | Wrong handler URL | Передан невалидный URL `EVENT_BOT_DELETE` ||
|| `CODE_ERROR` | Bot code isn't specified | Не передан обязательный код бота `CODE` ||
|| `NAME_ERROR` | Bot name isn't specified | В `PROPERTIES` не указано одно из обязательных полей: `NAME` или `LAST_NAME` ||
|| `MAX_COUNT_ERROR` | Has reached the maximum number of bots for application (max: N) | Достигнуто ограничение на количество ботов приложения ||
|| `WRONG_REQUEST` | Bot can't be created | Бот не может быть создан ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-update.md)
- [{#T}](./imbot-unregister.md)
- [{#T}](./imbot-bot-list.md)
- [{#T}](./events/index.md)
