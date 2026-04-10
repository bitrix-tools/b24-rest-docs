# Список ботов приложения imbot.v2.Bot.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Bot.list` возвращает список ботов текущего приложения в расширенном формате.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **filter**
[`object`](../../../../data-types.md) | Фильтр результатов.

Доступные поля фильтра:
- `type` — тип бота. Описание типов — [Типы ботов](../../index.md#bot-types) ||
|| **limit**
[`integer`](../../../../data-types.md) | Количество ботов на страницу. По умолчанию `50` ||
|| **offset**
[`integer`](../../../../data-types.md) | Смещение для пагинации. По умолчанию `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botToken":"my_bot_token","filter":{"type":"bot"},"limit":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Bot.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"filter":{"type":"bot"},"limit":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Bot.list
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Bot.list', {
        filter: { type: 'bot' },
        limit: 10,
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
                'imbot.v2.Bot.list',
                [
                    'filter' => ['type' => 'bot'],
                    'limit' => 10,
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
        'imbot.v2.Bot.list',
        {
            filter: { type: 'bot' },
            limit: 10,
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
        'imbot.v2.Bot.list',
        [
            'filter' => ['type' => 'bot'],
            'limit' => 10,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        foreach ($result['result']['bots'] as $bot) {
            echo $bot['id']. ': '. $bot['code']. "\n";
        }
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "bots": [
            {
                "id": 456,
                "code": "support_bot",
                "type": "bot",
                "isHidden": false,
                "isSupportOpenline": false,
                "isReactionsEnabled": true,
                "backgroundId": null,
                "language": "ru",
                "moduleId": "rest",
                "appId": "local.67890abcdef12.34567890",
                "eventMode": "fetch",
                "countMessage": 150,
                "countCommand": 3,
                "countChat": 12,
                "countUser": 45
            }
        ],
        "users": [
            {
                "id": 456,
                "active": true,
                "name": "Support Bot",
                "bot": true,
                "type": "bot"
            }
        ],
        "hasNextPage": false
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
[`object`](../../../../data-types.md) | Результат запроса ||
|| **result.bots**
[`Bot[]`](../../entities.md#bot) | Массив ботов в расширенном формате [(подробное описание)](#bot-object) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив связанных пользователей [(подробное описание)](#user-object) ||
|| **result.hasNextPage**
[`boolean`](../../../../data-types.md) | Есть ли следующая страница ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Bot {#bot-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор бота ||
|| **code**
[`string`](../../../../data-types.md) | Символьный код бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип бота ||
|| **isHidden**
[`boolean`](../../../../data-types.md) | Бот скрыт от списка контактов ||
|| **isSupportOpenline**
[`boolean`](../../../../data-types.md) | Бот поддерживает открытые линии ||
|| **isReactionsEnabled**
[`boolean`](../../../../data-types.md) | Для сообщений бота включены реакции ||
|| **backgroundId**
[`string|null`](../../../../data-types.md) | ID фона чата или `null` ||
|| **language**
[`string`](../../../../data-types.md) | Язык бота ||
|| **moduleId**
[`string`](../../../../data-types.md) | Идентификатор модуля ||
|| **appId**
[`string`](../../../../data-types.md) | ID приложения, зарегистрировавшего бота ||
|| **eventMode**
[`string`](../../../../data-types.md) | Режим доставки событий: `webhook` или `fetch` ||
|| **countMessage**
[`integer`](../../../../data-types.md) | Количество сообщений, отправленных ботом ||
|| **countCommand**
[`integer`](../../../../data-types.md) | Количество зарегистрированных команд ||
|| **countChat**
[`integer`](../../../../data-types.md) | Количество чатов бота ||
|| **countUser**
[`integer`](../../../../data-types.md) | Количество пользователей, взаимодействовавших с ботом ||
|#

### Поля объекта User {#user-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../../../data-types.md) | Пользователь активен ||
|| **name**
[`string`](../../../../data-types.md) | Имя и фамилия пользователя ||
|| **bot**
[`boolean`](../../../../data-types.md) | Признак пользователя-бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип пользователя ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)


{% note info "" %}

Метод всегда возвращает успешный ответ. Если у приложения нет ботов или передано неизвестное значение `filter.type` — возвращается пустой массив `bots`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "BOT_TOKEN_NOT_SPECIFIED",
    "error_description": "Bot token is not specified"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token is not specified | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./bot-register.md)
- [{#T}](./bot-get.md)
- [{#T}](./bot-update.md)
- [{#T}](./bot-unregister.md)
