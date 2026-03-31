# Обновить команду imbot.v2.Command.update

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Command.update` обновляет слэш-команду бота.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **commandId***
[`integer`](../../../../data-types.md) | ID команды ||
|| **fields***
[`object`](../../../../data-types.md) | Обновляемые поля команды. Структура объекта описана [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **command**
[`string`](../../../../data-types.md) | Новая команда (без `/`) ||
|| **title**
[`object`](../../../../data-types.md) | Заголовок команды на разных языках:

- строковое значение обновляет перевод
- значение `null` удаляет перевод
- отсутствие ключа оставляет перевод без изменений

Пример: `{"ru": "Новый", "en": null}` обновит `ru` и удалит `en` ||
|| **params**
[`object`](../../../../data-types.md) | Описание параметров на разных языках. Аналогично `title`, применяется только к тем языкам, которые переданы в `title` ||
|| **common**
[`string`](../../../../data-types.md) | Общая команда. Допустимые значения: `Y`, `N` ||
|| **hidden**
[`string`](../../../../data-types.md) | Скрытая команда. Допустимые значения: `Y`, `N` ||
|| **extranetSupport**
[`string`](../../../../data-types.md) | Поддержка экстранет. Допустимые значения: `Y`, `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

### Пример 1. Обновление переводов

Обновить заголовок на `ru` и `en`. Переводы на других языках, если они были, останутся без изменений.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"b15f6e80ef345c97e23db31e727281f4","commandId":42,"fields":{"title":{"en":"Updated help","ru":"Обновленная помощь"}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Command.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"commandId":42,"fields":{"title":{"en":"Updated help","ru":"Обновленная помощь"}},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Command.update
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Command.update', {
        botId: 456,
        commandId: 42,
        fields: {
          title: {
            en: 'Updated help',
            ru: 'Обновленная помощь',
          },
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
                'imbot.v2.Command.update',
                [
                    'botId' => 456,
                    'commandId' => 42,
                    'fields' => [
                        'title' => [
                            'en' => 'Updated help',
                            'ru' => 'Обновленная помощь',
                        ],
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
        'imbot.v2.Command.update',
        {
            botId: 456,
            commandId: 42,
            fields: {
                title: {
                    en: 'Updated help',
                    ru: 'Обновленная помощь',
                },
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
        'imbot.v2.Command.update',
        [
            'botId' => 456,
            'commandId' => 42,
            'fields' => [
                'title' => [
                    'en' => 'Updated help',
                    'ru' => 'Обновленная помощь',
                ],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'result: '. print_r($result['result'], true);
    }
    ```

{% endlist %}

### Пример 2. Удаление перевода

Обновить `ru` и удалить `en`. Для удаления передайте `null` в качестве значения.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"b15f6e80ef345c97e23db31e727281f4","commandId":42,"fields":{"title":{"ru":"Помощь","en":null}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Command.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"commandId":42,"fields":{"title":{"ru":"Помощь","en":null}},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Command.update
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Command.update', {
        botId: 456,
        commandId: 42,
        fields: {
          title: {
            ru: 'Помощь',
            en: null,
          },
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
                'imbot.v2.Command.update',
                [
                    'botId' => 456,
                    'commandId' => 42,
                    'fields' => [
                        'title' => [
                            'ru' => 'Помощь',
                            'en' => null,
                        ],
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
        'imbot.v2.Command.update',
        {
            botId: 456,
            commandId: 42,
            fields: {
                title: {
                    ru: 'Помощь',
                    en: null,
                },
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
        'imbot.v2.Command.update',
        [
            'botId' => 456,
            'commandId' => 42,
            'fields' => [
                'title' => [
                    'ru' => 'Помощь',
                    'en' => null,
                ],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'result: '. print_r($result['result'], true);
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
[`Command`](../../entities.md#command) | Объект обновлённой команды [(подробное описание)](#command-object) ||
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
    "error": "COMMAND_NOT_FOUND",
    "error_description": "Command not found"
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
|| `COMMAND_NOT_FOUND` | Command not found | Команда не найдена или нет доступа ||
|| `COMMAND_NAME_EMPTY` | Command name is empty | Передано пустое имя команды ||
|| `COMMAND_NAME_INVALID` | Command name is invalid | Имя команды должно быть строкой ||
|| `COMMAND_ALREADY_EXISTS` | Command already exists | Команда с таким именем уже зарегистрирована у этого бота ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./command-register.md)
- [{#T}](./command-list.md)
- [{#T}](./command-unregister.md)

