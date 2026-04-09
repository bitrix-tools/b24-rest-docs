# Зарегистрировать команду imbot.v2.Command.register

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Command.register` регистрирует слэш-команду бота.

Метод идемпотентный: повторный вызов с тем же `command` для того же бота от того же приложения возвращает существующую команду без обновления данных. Для обновления используйте [imbot.v2.Command.update](./command-update.md).

{% note warning "" %}

Формат вызова метода был изменен: параметры команды теперь передаются в объекте `fields`. Старый плоский формат поддерживается до 30.09.2026. Подробнее — [Журнал изменений API imbot.v2](../../change-log.md#command-register-fields).

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же `botToken`, который был указан при регистрации чат-бота ||
|| **fields***
[`object`](../../../../data-types.md) | Объект с параметрами команды [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **command***
[`string`](../../../../data-types.md) | Команда без символа `/`. Например: `help` ||
|| **title**
[`object`](../../../../data-types.md) | Заголовок команды на разных языках. Объект `{langCode: text}`, где `langCode` — двухбуквенный код языка в нижнем регистре: `en`, `ru`, `de` и т.д.

Отображается в списке доступных команд. Обязателен для видимых команд `hidden: false`. Для скрытых команд `hidden: true` можно не указывать ||
|| **params**
[`object`](../../../../data-types.md) | Описание параметров команды на разных языках. Объект `{langCode: text}`, аналогично `title`. Отображается как подсказка рядом с командой ||
|| **common**
[`boolean`](../../../../data-types.md) | Общая команда. Допустимые значения: `true`, `false`. По умолчанию `false`. Подробнее — [Общие и локальные команды](#common-types) ||
|| **hidden**
[`boolean`](../../../../data-types.md) | Скрытая команда. Допустимые значения: `true`, `false`. По умолчанию `false` ||
|| **extranetSupport**
[`boolean`](../../../../data-types.md) | Поддержка экстранет. Допустимые значения: `true`, `false`. По умолчанию `false` ||
|#

> Boolean-параметры принимают `true` и `false`. Если клиент не поддерживает JSON boolean, можно передавать строки `"Y"` и `"N"`.

## Общие и локальные команды {#common-types}

Параметр `common` определяет, где команда доступна:

- `common: true` — общая команда, доступна в любом чате
- `common: false` — локальная команда, доступна только в личном диалоге с ботом и в чатах, где бот состоит в участниках

Типичные сценарии:

- общие команды подходят для глобальных действий, например поиска или справки без обязательного присутствия бота в чате
- локальные команды подходят для действий, завязанных на конкретного бота и контекст его чата

Событие вызова команды: [ONIMBOTV2COMMANDADD](../events/events.md#onimbotv2commandadd).

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","fields":{"command":"help","title":{"en":"Show help","ru":"Показать помощь"},"params":{"en":"query","ru":"запрос"}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Command.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"fields":{"command":"help","title":{"en":"Show help","ru":"Показать помощь"},"params":{"en":"query","ru":"запрос"}},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Command.register
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Command.register', {
        botId: 456,
        fields: {
          command: 'help',
          title: { en: 'Show help', ru: 'Показать помощь' },
          params: { en: 'query', ru: 'запрос' },
        },
      });

      const { result } = response.getData();
      console.log('result:', result);
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
                'imbot.v2.Command.register',
                [
                    'botId' => 456,
                    'fields' => [
                        'command' => 'help',
                        'title' => ['en' => 'Show help', 'ru' => 'Показать помощь'],
                        'params' => ['en' => 'query', 'ru' => 'запрос'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: '. print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: '. $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Command.register',
        {
            botId: 456,
            fields: {
                command: 'help',
                title: { en: 'Show help', ru: 'Показать помощь' },
                params: { en: 'query', ru: 'запрос' },
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
        'imbot.v2.Command.register',
        [
            'botId' => 456,
            'fields' => [
                'command' => 'help',
                'title' => ['en' => 'Show help', 'ru' => 'Показать помощь'],
                'params' => ['en' => 'query', 'ru' => 'запрос'],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Command ID: '. $result['result']['command']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "command": {
            "id": 42,
            "botId": 456,
            "command": "/help",
            "common": false,
            "hidden": false,
            "extranetSupport": false
        }
    },
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.command**
[`Command`](../../entities.md#command) | Объект зарегистрированной команды [(подробное описание)](#command-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Command {#command-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор команды ||
|| **botId**
[`integer`](../../../../data-types.md) | Идентификатор бота ||
|| **command**
[`string`](../../../../data-types.md) | Текст команды ||
|| **common**
[`boolean`](../../../../data-types.md) | Команда доступна во всех чатах ||
|| **hidden**
[`boolean`](../../../../data-types.md) | Команда скрыта из списка команд ||
|| **extranetSupport**
[`boolean`](../../../../data-types.md) | Команда доступна экстранет-пользователям ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "COMMAND_REQUIRED",
    "error_description": "Command is required"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token is not specified | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | Bot ID is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot is registered by another application | Бот зарегистрирован другим приложением ||
|| `COMMAND_NAME_INVALID` | Command name is invalid | Имя команды должно быть строкой ||
|| `COMMAND_REQUIRED` | Command is required | Не указана команда (`fields.command`) ||
|| `COMMAND_TITLE_REQUIRED` | Command title is required | Не указан `fields.title` для видимой команды `fields.hidden: false` ||
|| `COMMAND_REGISTER_FAILED` | Command registration failed | Ошибка при регистрации команды ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./command-update.md)
- [{#T}](./command-list.md)
- [{#T}](./command-unregister.md)
- [{#T}](./command-answer.md)
- [Журнал изменений API imbot.v2](../../change-log.md#command-register-fields) — формат вызова метода был изменен, старый формат поддерживается до 2026-09
