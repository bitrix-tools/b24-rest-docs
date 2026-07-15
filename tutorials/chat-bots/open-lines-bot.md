# Пример создания чат-бота для Открытых линий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Создание чат-бота для *Открытых линий* аналогично [созданию обычного чат-бота](./index.md), но есть два отличия:

1. При регистрации в [imbot.register](../../api-reference/chat-bots/outdated/bots/imbot-register.md) в параметр `TYPE` передаем `O`. Чтобы расширить уже существующего бота, передаем `OPENLINE => Y` — тогда бот работает в гибридном режиме (групповой чат, личный чат и Открытые линии)

2. В гибридном режиме во всех входящих событиях ([ONIMBOTMESSAGEADD](../../api-reference/chat-bots/outdated/messages/events/on-imbot-message-add.md) и [ONIMBOTJOINCHAT](../../api-reference/chat-bots/outdated/chats/events/on-imbot-join-chat.md)) проверяем `CHAT_ENTITY_TYPE` — для Открытых линий он равен `LINES`

Для тесной интеграции с Открытыми линиями нужен scope [`imopenlines`](../../api-reference/scopes/permissions.md). Инициализацию SDK по данным события смотрите в [примере обычного чат-бота](./index.md#инициализация-sdk-по-данным-события).

## Регистрация бота для Открытых линий

{% list tabs %}

- JS

    ```js
    await $b24.actions.v2.call.make({
        method: 'imbot.register',
        params: {
            CODE: 'OpenLineBot',
            TYPE: 'O',          // тип бота для Открытых линий
            OPENLINE: 'Y',      // гибридный режим
            EVENT_MESSAGE_ADD: HANDLER_URL,
            EVENT_WELCOME_MESSAGE: HANDLER_URL,
            EVENT_BOT_DELETE: HANDLER_URL,
            PROPERTIES: { NAME: 'Линия поддержки', COLOR: 'GREEN' },
        },
        requestId: 'imbot-register-ol',
    })
    ```

- PHP

    ```php
    // imbot.* нет среди типизированных сервисов PHP — вызываем через ядро
    $b24->core->call('imbot.register', [
        'CODE' => 'OpenLineBot',
        'TYPE' => 'O',
        'OPENLINE' => 'Y',
        'EVENT_MESSAGE_ADD' => $handlerUrl,
        'EVENT_WELCOME_MESSAGE' => $handlerUrl,
        'EVENT_BOT_DELETE' => $handlerUrl,
        'PROPERTIES' => ['NAME' => 'Линия поддержки', 'COLOR' => 'GREEN'],
    ]);
    ```

- Python

    ```python
    client.imbot.register(
        code="OpenLineBot",
        properties={"NAME": "Линия поддержки", "COLOR": "GREEN"},
        event_message_add=HANDLER_URL,
        event_welcome_message=HANDLER_URL,
        event_bot_delete=HANDLER_URL,
        type="O",
        openline=True,
    ).response
    ```

{% endlist %}

## Проверка типа чата в обработчике

В гибридном режиме обрабатываем сообщения из Открытых линий отдельно — по полю `CHAT_ENTITY_TYPE`.

{% list tabs %}

- JS

    ```js
    if (data.PARAMS.CHAT_ENTITY_TYPE === 'LINES') {
        // сообщение из Открытой линии — логика первой линии поддержки
    }
    ```

- PHP

    ```php
    if (($data['PARAMS']['CHAT_ENTITY_TYPE'] ?? '') === 'LINES') {
        // сообщение из Открытой линии
    }
    ```

- Python

    ```python
    if data.get("data[PARAMS][CHAT_ENTITY_TYPE]") == "LINES":
        # сообщение из Открытой линии
        ...
    ```

{% endlist %}

## Управление сессией

С правом `imopenlines` доступны команды для управления разговором:

- [imopenlines.bot.session.operator](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-operator.md) — перевести на свободного оператора
- [imopenlines.bot.session.transfer](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-transfer.md) — перевести на конкретного оператора
- [imopenlines.bot.session.finish](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-finish.md) — завершить сессию

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
        params: { CHAT_ID: chatId, USER_ID: operatorId },
        requestId: 'session-transfer',
    })

    // Завершить сессию
    await $b24.actions.v2.call.make({
        method: 'imopenlines.bot.session.finish',
        params: { CHAT_ID: chatId },
        requestId: 'session-finish',
    })
    ```

- PHP

    ```php
    $b24->core->call('imopenlines.bot.session.operator', ['CHAT_ID' => $chatId]);
    $b24->core->call('imopenlines.bot.session.transfer', ['CHAT_ID' => $chatId, 'USER_ID' => $operatorId]);
    $b24->core->call('imopenlines.bot.session.finish', ['CHAT_ID' => $chatId]);
    ```

- Python

    ```python
    client.imopenlines.bot.session.operator(chat_id=chat_id).response
    client.imopenlines.bot.session.transfer(chat_id=chat_id, user_id=operator_id).response
    client.imopenlines.bot.session.finish(chat_id=chat_id).response
    ```

{% endlist %}

## Готовый пример: ITR Bot

В качестве примера бота для Открытых линий с многоуровневым меню используйте «ITR Bot»: его можно [скачать с GitHub](https://github.com/bitrix24com/bots) (файл `itr.php`) или найти в коробочной версии в папке `\Bitrix\ImBot\Bot\OpenlinesMenuExample`.

Бот выступает первой линией поддержки: сначала сообщения поступают к нему, затем — операторам в очередь. Клиент может в любой момент переключиться на оператора, отправив `0`.
