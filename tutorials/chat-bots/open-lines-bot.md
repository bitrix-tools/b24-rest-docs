# Как создать чат-бота для Открытых линий

> Scope: [`imbot`, `imopenlines`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права приложения `imbot` и `imopenlines`
>
> - [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) — авторизованный пользователь
> - [imopenlines.bot.session.operator](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-operator.md) — любой пользователь
> - [imopenlines.bot.session.transfer](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-transfer.md) и [imopenlines.bot.session.finish](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-finish.md) — пользователь приложения с зарегистрированным чат-ботом

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чат-бот для Открытых линий принимает обращения клиентов, отвечает первым сообщением и при необходимости переводит диалог на оператора. Для такого сценария используйте актуальную платформу [чат-ботов 2.0](../../api-reference/chat-bots/chat-bots-v2/index.md).

Сценарий состоит из трех шагов.

1. Зарегистрировать бота методом [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md)
2. В обработчиках событий [ONIMBOTV2MESSAGEADD и ONIMBOTV2JOINCHAT](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md) проверить, что событие пришло из Открытой линии
3. Управлять диалогом методами [imopenlines.bot.session.*](../../api-reference/imopenlines/openlines/chat-bots/index.md)

## Подготовьте данные

Перед началом создайте приложение или входящий вебхук с правами `imbot` и `imopenlines`.

Подготовьте значения:

- `HANDLER_URL` — публичный HTTPS URL обработчика событий
- `botToken` — токен бота длиной до 40 символов, если используете входящий вебхук
- `chatId` — идентификатор чата Открытой линии из события `data.message.chatId` или `data.chat.id`
- `operatorId` — идентификатор сотрудника, на которого нужно перевести диалог

Для примеров с входящим вебхуком сохраните URL вебхука в переменной окружения `B24_WEBHOOK_URL`, а токен бота — в `BOT_TOKEN`. Для Python-примера разложите URL вебхука на домен `B24_DOMAIN` и путь `B24_WEBHOOK_TOKEN` вида `1/xxxxxxxxxxxxxxxx`.

Инициализируйте SDK перед первым вызовом.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_WEBHOOK_URL)
    const botToken = process.env.BOT_TOKEN
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook(getenv('B24_WEBHOOK_URL'));

    $botToken = getenv('BOT_TOKEN');
    ```

- Python

    ```python
    # pip install b24pysdk
    import os
    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],
        webhook_token=os.environ["B24_WEBHOOK_TOKEN"],
    )
    client = Client(token)
    bot_token = os.environ["BOT_TOKEN"]
    ```

{% endlist %}

## 1. Зарегистрируйте бота для Открытых линий

В [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) параметры бота передаются в объекте `fields`.

Для гибридного режима, когда бот работает в групповых чатах, личных диалогах и Открытых линиях, передайте `fields.type = bot` и `fields.isSupportOpenline = true`. Если бот нужен только для Открытых линий, передайте `fields.type = openline`.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // Для imbot.v2 нет типизированной обертки, поэтому используется прямой вызов через ядро SDK.
    await $b24.actions.v2.call.make({
        method: 'imbot.v2.Bot.register',
        params: {
            fields: {
                code: 'open_line_bot',
                botToken: botToken,
                type: 'bot',
                isSupportOpenline: true,
                eventMode: 'webhook',
                webhookUrl: HANDLER_URL,
                properties: {
                    name: 'Линия поддержки',
                    workPosition: 'Первая линия',
                    color: 'GREEN',
                },
            },
        },
        requestId: 'imbot-v2-bot-register-ol',
    })
    ```

- PHP

    ```php
    // Для imbot.v2 нет типизированной обертки, поэтому используется прямой вызов через ядро SDK.
    $b24->core->call('imbot.v2.Bot.register', [
        'fields' => [
            'code' => 'open_line_bot',
            'botToken' => $botToken,
            'type' => 'bot',
            'isSupportOpenline' => true,
            'eventMode' => 'webhook',
            'webhookUrl' => $handlerUrl,
            'properties' => [
                'name' => 'Линия поддержки',
                'workPosition' => 'Первая линия',
                'color' => 'GREEN',
            ],
        ],
    ]);
    ```

- Python

    ```python
    # Для imbot.v2 нет типизированной обертки, поэтому используется прямой вызов через ядро SDK.
    token.call_method(
        "imbot.v2.Bot.register",
        {
            "fields": {
                "code": "open_line_bot",
                "botToken": bot_token,
                "type": "bot",
                "isSupportOpenline": True,
                "eventMode": "webhook",
                "webhookUrl": HANDLER_URL,
                "properties": {
                    "name": "Линия поддержки",
                    "workPosition": "Первая линия",
                    "color": "GREEN",
                },
            }
        },
    )
    ```

{% endlist %}

В успешном ответе сохраните `result.bot.id`. Он понадобится, если приложение работает с несколькими ботами.

```json
{
    "result": {
        "bot": {
            "id": 456,
            "code": "open_line_bot",
            "type": "bot",
            "isSupportOpenline": true,
            "eventMode": "webhook"
        }
    }
}
```

## 2. Проверьте тип чата в обработчике

В событиях `ONIMBOTV2MESSAGEADD` и `ONIMBOTV2JOINCHAT` данные приходят в формате V2: поля названы в camelCase, а данные чата находятся в объекте `data.chat`.

Чтобы обрабатывать сообщения из Открытых линий отдельно, проверяйте поле `data.chat.entityType`. Для Открытых линий оно равно `LINES`.

В событии сохраните `data.message.chatId` в переменную `chatId`. Это значение передается в параметр `CHAT_ID` методов управления сессией.

```json
{
    "event": "ONIMBOTV2MESSAGEADD",
    "data": {
        "message": {
            "chatId": 112
        },
        "chat": {
            "id": 112,
            "entityType": "LINES"
        }
    }
}
```

{% list tabs %}

- JS

    ```js
    if (event.data.chat.entityType === 'LINES') {
        const chatId = event.data.message.chatId;
        // сообщение из Открытой линии
    }
    ```

- PHP

    ```php
    if (($event['data']['chat']['entityType'] ?? '') === 'LINES') {
        $chatId = (int)$event['data']['message']['chatId'];
        // сообщение из Открытой линии
    }
    ```

- Python

    ```python
    if event["data"]["chat"].get("entityType") == "LINES":
        chat_id = event["data"]["message"]["chatId"]
        # сообщение из Открытой линии
        ...
    ```

{% endlist %}

## 3. Управляйте сессией

С правом `imopenlines` доступны команды для управления разговором:

- [imopenlines.bot.session.operator](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-operator.md) — перевести на свободного оператора
- [imopenlines.bot.session.transfer](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-transfer.md) — перевести на конкретного оператора
- [imopenlines.bot.session.finish](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-finish.md) — завершить сессию

При вызове `imopenlines.bot.session.transfer` и `imopenlines.bot.session.finish` передавайте тот же `CLIENT_ID`, который использовался при регистрации бота. Если бот зарегистрирован через `imbot.v2.Bot.register` с `fields.botToken`, передайте это значение в `CLIENT_ID`.

{% list tabs %}

- JS

    ```js
    // Перевести разговор на свободного оператора
    await $b24.actions.v2.call.make({
        method: 'imopenlines.bot.session.operator',
        params: { CHAT_ID: chatId },
        requestId: 'session-operator',
    })

    // Перевести на конкретного оператора
    await $b24.actions.v2.call.make({
        method: 'imopenlines.bot.session.transfer',
        params: { CHAT_ID: chatId, USER_ID: operatorId, CLIENT_ID: botToken },
        requestId: 'session-transfer',
    })

    // Завершить сессию
    await $b24.actions.v2.call.make({
        method: 'imopenlines.bot.session.finish',
        params: { CHAT_ID: chatId, CLIENT_ID: botToken },
        requestId: 'session-finish',
    })
    ```

- PHP

    ```php
    $b24->core->call('imopenlines.bot.session.operator', ['CHAT_ID' => $chatId]);
    $b24->core->call('imopenlines.bot.session.transfer', [
        'CHAT_ID' => $chatId,
        'USER_ID' => $operatorId,
        'CLIENT_ID' => $botToken,
    ]);
    $b24->core->call('imopenlines.bot.session.finish', [
        'CHAT_ID' => $chatId,
        'CLIENT_ID' => $botToken,
    ]);
    ```

- Python

    ```python
    client.imopenlines.bot.session.operator(chat_id=chat_id).response
    token.call_method(
        "imopenlines.bot.session.transfer",
        {"CHAT_ID": chat_id, "USER_ID": operator_id, "CLIENT_ID": bot_token},
    )
    token.call_method(
        "imopenlines.bot.session.finish",
        {"CHAT_ID": chat_id, "CLIENT_ID": bot_token},
    )
    ```

{% endlist %}

Успешный ответ каждого метода управления сессией:

```json
{
    "result": true
}
```

## Проверим результат

Отправьте сообщение в подключенный канал Открытой линии. В обработчик должен прийти `ONIMBOTV2MESSAGEADD` с `data.chat.entityType = LINES`.

Если нужно передать диалог оператору, вызовите `imopenlines.bot.session.operator` или `imopenlines.bot.session.transfer` с `CHAT_ID` из события. Успешный ответ этих методов — `true`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса и права приложения.

- `BOT_TOKEN_NOT_SPECIFIED` — не передан `fields.botToken` при авторизации через вебхук
- `BOT_INVALID_TYPE` — в `fields.type` передано значение не из списка допустимых типов
- `BOT_INVALID_EVENT_MODE` — в `fields.eventMode` передано значение не `fetch` и не `webhook`
- `BOT_WEBHOOK_URL_REQUIRED` — для webhook-режима не передан `fields.webhookUrl`
- `CHAT_ID_EMPTY` — не передан `CHAT_ID` или передано значение `<= 0`
- `BOT_ID_ERROR` — в приложении не найден зарегистрированный чат-бот

## Что важно учитывать

- Методы и события ветки `imbot.*` устарели. Для новых ботов используйте `imbot.v2.*`
- Бот, зарегистрированный через V1, получает события `ONIMBOT*`; бот, зарегистрированный через V2, получает события `ONIMBOTV2*`
- Для webhook-режима укажите публичный HTTPS URL в `fields.webhookUrl`
- Для управления сессией нужен scope `imopenlines`

## Продолжите изучение

- [{#T}](../../api-reference/chat-bots/chat-bots-v2/migration.md)
- [{#T}](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md)
- [{#T}](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md)
- [{#T}](../../api-reference/imopenlines/openlines/chat-bots/index.md)
