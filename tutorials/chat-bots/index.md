# Как создать чат-бота, который отвечает списком просроченных задач

> Scope: [`imbot`, `task`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — владелец зарегистрированного бота
>
> - [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) — авторизованный пользователь
> - [imbot.v2.Chat.Message.send](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md) — владелец зарегистрированного бота
> - [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Создадим чат-бота «Докладун», который сообщает пользователю о его просроченных задачах. Бот обрабатывает одно сообщение — «что горит» — и отвечает списком задач, где пользователь исполнитель, а крайний срок уже прошел.

Проверяемый результат: после установки приложения в списке чатов появляется бот «Докладун», а на сообщение «что горит» он отвечает списком задач или сообщением о том, что просроченных задач нет.

В сценарии участвуют три объекта: приложение с OAuth-авторизацией, зарегистрированный чат-бот и задачи пользователя.

{% note info "" %}

Чат-бот — это [приложение](../../settings/app-installation/index.md) с OAuth-авторизацией, а не входящий вебхук. Приложение регистрирует бота, а Битрикс24 шлет события бота HTTP-запросами на публичный URL обработчика.

SDK выполняют исходящие вызовы REST. Входящие события принимает ваш веб-сервер — Express, PHP или Flask.

{% endnote %}

Сценарий состоит из четырех шагов.

1. Зарегистрировать бота при установке приложения методом [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md)
2. Отправить приветствие по событию [ONIMBOTV2JOINCHAT](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2joinchat) методом [imbot.v2.Chat.Message.send](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)
3. По событию [ONIMBOTV2MESSAGEADD](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2messageadd) получить задачи методом [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) и ответить методом [imbot.v2.Chat.Message.send](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)
4. Очистить данные бота по событию [ONIMBOTV2DELETE](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2delete)

Порядок шагов задан платформой: пока бот не зарегистрирован, события `ONIMBOTV2*` не приходят, а `dialogId` для ответа появляется только в событии.

## Подготовьте приложение

Бот регистрируется от имени приложения, поэтому сначала подготовьте локальное приложение и обработчик.

1. Разместите обработчик на публичном HTTPS-URL, например `https://example.com/handler`
2. В разделе *Приложения > Разработчикам > Другое > Локальное приложение* создайте серверное приложение
3. В поле *Путь для первоначальной установки* укажите адрес обработчика
4. Включите опцию *Приложение само завершает установку*
5. В поле *Путь вашего обработчика* укажите тот же адрес обработчика
6. Выдайте приложению права [`imbot`](../../api-reference/scopes/permissions.md) и [`task`](../../api-reference/scopes/permissions.md)
7. Сохраните приложение и скопируйте его `client_id` и `client_secret`

Подготовьте значения, которые нужно заменить своими:

#|
|| **Значение** | **Откуда взять** ||
|| `B24_CLIENT_ID` | Поле `client_id` в карточке локального приложения, вида `local.xxxxxxxx.xxxxxxxx` ||
|| `B24_CLIENT_SECRET` | Поле `client_secret` в карточке локального приложения ||
|| `HANDLER_URL` | Публичный HTTPS-адрес обработчика событий ||
|| `BOT_CODE` | Код бота, уникальный в рамках приложения, например `overdue_tasks_bot` ||
|#

Методы `imbot.v2` доступны в облаке и в коробочных версиях с актуальной ревизией API. Если бот работает в коробке, проверьте ревизию методом [imbot.v2.Revision.get](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/revision-get.md).

Приложению нужно хранилище: база данных, файл или менеджер секретов. В примерах оно обозначено объектом `store` с четырьмя операциями:

- `saveAuth` и `loadAuth` — сохранить и прочитать данные авторизации по ключу `application_token`
- `saveBot` и `removeBot` — сохранить и удалить идентификатор зарегистрированного бота

## Инициализация SDK по данным события {#sdk-init}

Авторизацию приложение получает в теле события установки. Токены живут один час, поэтому сохраните всю пару и пересоздавайте клиент SDK из хранилища при каждом следующем событии.

Весь код ниже выполняется только на сервере: `client_secret` и токены не должны попадать в код, который работает в браузере.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const APP = {
        clientId: process.env.B24_CLIENT_ID,
        clientSecret: process.env.B24_CLIENT_SECRET,
    }

    // store — ваше хранилище: база данных, файл или менеджер секретов

    // auth приходит в теле события установки
    function oauthParamsFromEvent(auth) {
        return {
            domain: auth.domain,
            clientEndpoint: auth.client_endpoint,
            serverEndpoint: auth.server_endpoint,
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
            memberId: auth.member_id,
            applicationToken: auth.application_token,
            scope: auth.scope,
            status: auth.status,
            // expires приходит не во всех событиях — считаем его из expires_in
            expires: Number(auth.expires ?? Math.floor(Date.now() / 1000) + Number(auth.expires_in)),
            expiresIn: Number(auth.expires_in),
            userId: Number(auth.user_id ?? 0),
        }
    }

    function makeClient(params) {
        const $b24 = new B24OAuth(params, APP)
        $b24.offClientSideWarning()
        // SDK обновляет токены сам — сохраняем новую пару целиком
        $b24.setCallbackRefreshAuth(async ({ b24OAuthParams }) => {
            await store.saveAuth(b24OAuthParams.applicationToken, b24OAuthParams)
        })
        return $b24
    }
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import os

    from b24pysdk import BitrixApp, BitrixToken, Client

    APP = BitrixApp(
        client_id=os.environ["B24_CLIENT_ID"],
        client_secret=os.environ["B24_CLIENT_SECRET"],
    )

    # store — ваше хранилище: база данных, файл или менеджер секретов


    # auth — словарь авторизации из тела события установки
    def make_client(auth: dict) -> tuple:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth["refresh_token"],
            expires_in=int(auth["expires_in"]),
            bitrix_app=APP,
        )
        return Client(token), token
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Credentials\AuthToken;
    use Bitrix24\SDK\Core\Credentials\DefaultOAuthServerUrl;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    // $store — ваше хранилище: база данных, файл или менеджер секретов
    // $auth — массив авторизации из тела события установки
    function makeServiceBuilder(array $auth) {
        $appProfile = ApplicationProfile::initFromArray([
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
            'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'imbot,task',
        ]);

        // expires приходит не во всех событиях — считаем его из expires_in
        $authToken = new AuthToken(
            (string)$auth['access_token'],
            (string)$auth['refresh_token'],
            time() + (int)$auth['expires_in'],
            (int)$auth['expires_in'],
        );

        $log = new Logger('bot');
        $log->pushHandler(new StreamHandler('php://stdout'));

        return (new ServiceBuilderFactory(new EventDispatcher(), $log))
            ->init($appProfile, $authToken, (string)$auth['domain'], DefaultOAuthServerUrl::default());
    }
    ```
{% endlist %}

## Примите событие в обработчике

Один эндпоинт принимает все события и маршрутизирует их по полю `event`. Тело запроса приходит как `application/x-www-form-urlencoded`, ключи имеют вид `data[bot][id]` и `auth[application_token]`.

Подлинность запроса проверяйте по `application_token` с **верхнего уровня** — `auth.application_token`, а не по токену из `data.bot.auth`. Сохраните его при установке и сравнивайте с ним все последующие события.

{% list tabs %}

- JS

    ```js
    import express from 'express'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const HANDLER_URL = process.env.HANDLER_URL
    const BOT_CODE = 'overdue_tasks_bot'

    app.post('/handler', async (req, res) => {
        const event = req.body.event
        const data = req.body.data || {}
        const auth = req.body.auth || {}

        if (event !== 'ONAPPINSTALL' && !(await store.loadAuth(auth.application_token))) {
            return res.sendStatus(403)
        }

        try {
            if (event === 'ONAPPINSTALL') {
                await handleInstall(auth)
            } else if (event === 'ONIMBOTV2JOINCHAT') {
                await handleJoinChat(auth, data)
            } else if (event === 'ONIMBOTV2MESSAGEADD') {
                await handleMessage(auth, data)
            } else if (event === 'ONIMBOTV2DELETE') {
                await handleBotDelete(auth, data)
            }
        } catch (error) {
            console.error(event, error)
        }

        // Платформа ждет ответ 200, повторная доставка события не гарантируется
        res.sendStatus(200)
    })

    app.listen(3000)
    ```

- Python

    ```python
    # handler.py
    import os
    import re

    from flask import Flask, request

    app = Flask(__name__)
    HANDLER_URL = os.environ["HANDLER_URL"]
    BOT_CODE = "overdue_tasks_bot"


    def unflatten(form) -> dict:
        """Собирает плоские ключи вида data[bot][id] во вложенный словарь"""
        result = {}
        for key, value in form.items():
            path = re.findall(r"[^\[\]]+", key)
            node = result
            for part in path[:-1]:
                node = node.setdefault(part, {})
            node[path[-1]] = value
        return result


    @app.post("/handler")
    def handler():
        payload = unflatten(request.form)
        event = payload.get("event")
        data = payload.get("data", {})
        auth = payload.get("auth", {})

        if event != "ONAPPINSTALL" and store.load_auth(auth.get("application_token", "")) is None:
            return "", 403

        try:
            if event == "ONAPPINSTALL":
                handle_install(auth)
            elif event == "ONIMBOTV2JOINCHAT":
                handle_join_chat(auth, data)
            elif event == "ONIMBOTV2MESSAGEADD":
                handle_message(auth, data)
            elif event == "ONIMBOTV2DELETE":
                handle_bot_delete(auth, data)
        except Exception as error:
            app.logger.error("%s: %s", event, error)

        # Платформа ждет ответ 200, повторная доставка события не гарантируется
        return "", 200
    ```


- PHP

    ```php
    <?php
    // handler.php
    require_once 'vendor/autoload.php';

    $event = (string)($_POST['event'] ?? '');
    $data = (array)($_POST['data'] ?? []);
    $auth = (array)($_POST['auth'] ?? []);

    $handlerUrl = getenv('HANDLER_URL');
    $botCode = 'overdue_tasks_bot';

    if ($event !== 'ONAPPINSTALL' && $store->loadAuth($auth['application_token'] ?? '') === null) {
        http_response_code(403);
        exit;
    }

    try {
        match ($event) {
            'ONAPPINSTALL' => handleInstall($auth),
            'ONIMBOTV2JOINCHAT' => handleJoinChat($auth, $data),
            'ONIMBOTV2MESSAGEADD' => handleMessage($auth, $data),
            'ONIMBOTV2DELETE' => handleBotDelete($auth, $data),
            default => null,
        };
    } catch (Throwable $exception) {
        error_log($event . ': ' . $exception->getMessage());
    }

    // Платформа ждет ответ 200, повторная доставка события не гарантируется
    http_response_code(200);
    ```
{% endlist %}

Функции шагов из примеров ниже разместите в этом же файле — обработчик вызывает их по имени события.

## 1. Зарегистрируйте бота при установке приложения

Событие [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md) приходит один раз после установки. В нем приложение получает токены и `application_token` — сохраните их и сразу зарегистрируйте бота.

В [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) параметры бота передаются в объекте `fields`:

- `code` — код бота, уникальный в рамках приложения
- `type` — тип `bot` подходит для личных диалогов и упоминаний в групповых чатах
- `eventMode` и `webhookUrl` — режим `webhook` включает доставку событий на адрес обработчика, отдельная подписка через `event.bind` не нужна
- `properties.name` — имя, которое пользователь увидит в списке чатов

При авторизации через OAuth параметр `botToken` не нужен: бот привязан к приложению через `client_id`.

{% list tabs %}

- JS

    ```js
    async function handleInstall(auth) {
        const params = oauthParamsFromEvent(auth)
        await store.saveAuth(params.applicationToken, params)

        const $b24 = makeClient(params)
        // Типизированной обертки для imbot.v2 нет, поэтому вызываем метод через ядро SDK
        const response = await $b24.actions.v2.call.make({
            method: 'imbot.v2.Bot.register',
            params: {
                fields: {
                    code: BOT_CODE,
                    type: 'bot',
                    eventMode: 'webhook',
                    webhookUrl: HANDLER_URL,
                    properties: {
                        name: 'Докладун',
                        workPosition: 'Докладываю о просроченных задачах',
                        color: 'aqua',
                    },
                },
            },
            requestId: 'imbot-v2-bot-register',
        })

        const { result } = response.getData()
        await store.saveBot(result.bot.id)
    }
    ```

- Python

    ```python
    def handle_install(auth: dict) -> None:
        store.save_auth(auth["application_token"], auth)

        _, token = make_client(auth)
        # Типизированной обертки для imbot.v2 нет, поэтому вызываем метод через ядро SDK
        response = token.call_method(
            "imbot.v2.Bot.register",
            {
                "fields": {
                    "code": BOT_CODE,
                    "type": "bot",
                    "eventMode": "webhook",
                    "webhookUrl": HANDLER_URL,
                    "properties": {
                        "name": "Докладун",
                        "workPosition": "Докладываю о просроченных задачах",
                        "color": "aqua",
                    },
                },
            },
        )
        store.save_bot(response["result"]["bot"]["id"])
    ```


- PHP

    ```php
    function handleInstall(array $auth): void
    {
        global $store, $handlerUrl, $botCode;

        $store->saveAuth((string)$auth['application_token'], $auth);

        $b24 = makeServiceBuilder($auth);
        // Типизированной обертки для imbot.v2 нет, поэтому вызываем метод через ядро SDK
        $result = $b24->core->call('imbot.v2.Bot.register', [
            'fields' => [
                'code' => $botCode,
                'type' => 'bot',
                'eventMode' => 'webhook',
                'webhookUrl' => $handlerUrl,
                'properties' => [
                    'name' => 'Докладун',
                    'workPosition' => 'Докладываю о просроченных задачах',
                    'color' => 'aqua',
                ],
            ],
        ])->getResponseData()->getResult();

        $store->saveBot((int)$result['bot']['id']);
    }
    ```
{% endlist %}

Успешный ответ содержит объект бота. Сохраните `result.bot.id` — он понадобится, если приложение регистрирует несколько ботов.

```json
{
    "result": {
        "bot": {
            "id": 456,
            "code": "overdue_tasks_bot",
            "type": "bot",
            "eventMode": "webhook"
        }
    }
}
```

Метод идемпотентен: повторный вызов с тем же `fields.code` от того же приложения вернет существующего бота и не изменит его данные. Чтобы поменять свойства зарегистрированного бота, используйте [imbot.v2.Bot.update](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-update.md).

## 2. Отправьте приветствие при добавлении бота в чат

Событие [ONIMBOTV2JOINCHAT](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2joinchat) приходит, когда пользователь открывает диалог с ботом или добавляет его в чат. Из события возьмите два значения:

- `data.bot.id` — идентификатор бота для параметра `botId`
- `data.dialogId` — идентификатор диалога для параметра `dialogId`

```json
{
    "event": "ONIMBOTV2JOINCHAT",
    "data": {
        "bot": {"id": 456, "code": "overdue_tasks_bot"},
        "dialogId": "chat5",
        "chat": {"id": 5, "dialogId": "chat5", "type": "chat"},
        "user": {"id": 1, "name": "Иван Иванов"}
    },
    "auth": {"domain": "example.bitrix24.ru", "application_token": "51856fefc120afa4b628cc82d3935cce"}
}
```

В тексте приветствия используем [BB-код](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/messages/message-formatting.md) `[send=текст]подпись[/send]`: пользователь нажимает на подпись, и бот получает сообщение с этим текстом.

{% list tabs %}

- JS

    ```js
    async function handleJoinChat(auth, data) {
        const $b24 = makeClient(await store.loadAuth(auth.application_token))

        await $b24.actions.v2.call.make({
            method: 'imbot.v2.Chat.Message.send',
            params: {
                botId: Number(data.bot.id),
                dialogId: data.dialogId,
                fields: {
                    message: 'Привет! Я Докладун. Спросите [send=что горит]Что горит?[/send]',
                },
            },
            requestId: 'imbot-v2-welcome',
        })
    }
    ```

- Python

    ```python
    def handle_join_chat(auth: dict, data: dict) -> None:
        _, token = make_client(store.load_auth(auth["application_token"]))

        token.call_method(
            "imbot.v2.Chat.Message.send",
            {
                "botId": int(data["bot"]["id"]),
                "dialogId": data["dialogId"],
                "fields": {
                    "message": "Привет! Я Докладун. Спросите [send=что горит]Что горит?[/send]",
                },
            },
        )
    ```


- PHP

    ```php
    function handleJoinChat(array $auth, array $data): void
    {
        global $store;

        $b24 = makeServiceBuilder($store->loadAuth((string)$auth['application_token']));

        $b24->core->call('imbot.v2.Chat.Message.send', [
            'botId' => (int)$data['bot']['id'],
            'dialogId' => (string)$data['dialogId'],
            'fields' => [
                'message' => 'Привет! Я Докладун. Спросите [send=что горит]Что горит?[/send]',
            ],
        ]);
    }
    ```
{% endlist %}

Успешный ответ содержит идентификатор отправленного сообщения:

```json
{
    "result": {
        "id": 789,
        "uuidMap": {}
    }
}
```

## 3. Ответьте списком просроченных задач

Событие [ONIMBOTV2MESSAGEADD](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2messageadd) приходит на каждое сообщение пользователя боту. Из события возьмите три значения:

- `data.message.text` — текст сообщения, по нему определяем команду
- `data.user.id` — автор сообщения, его подставляем в фильтр `RESPONSIBLE_ID`
- `data.chat.dialogId` — диалог, в который отвечаем

```json
{
    "event": "ONIMBOTV2MESSAGEADD",
    "data": {
        "bot": {"id": 456, "code": "overdue_tasks_bot"},
        "message": {"id": 790, "chatId": 5, "authorId": 1, "text": "что горит"},
        "chat": {"id": 5, "dialogId": "chat5", "type": "chat"},
        "user": {"id": 1, "name": "Иван Иванов"}
    },
    "auth": {"domain": "example.bitrix24.ru", "application_token": "51856fefc120afa4b628cc82d3935cce"}
}
```

{% note warning "" %}

В webhook-режиме все скалярные значения приходят строками: `"456"` вместо `456`, `"1"` или `"0"` вместо `true` и `false`. Приводите типы явно, иначе `botId` и `RESPONSIBLE_ID` уйдут в запрос строками.

{% endnote %}

Просроченные задачи получаем методом [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) с фильтром:

- `RESPONSIBLE_ID` — исполнитель, идентификатор автора сообщения
- `<DEADLINE` — крайний срок раньше текущего момента
- `!REAL_STATUS` со значениями `4` и `5` — задача не завершена и не ждет контроля. Битрикс24 не считает просроченными задачи в этих двух статусах, даже если крайний срок прошел

В ответе поля задач названы в нижнем регистре: `id`, `title`, `deadline`.

{% list tabs %}

- JS

    ```js
    async function handleMessage(auth, data) {
        const $b24 = makeClient(await store.loadAuth(auth.application_token))

        const text = (data.message.text || '').trim().toLowerCase()
        let message = 'Не соображу, что вы хотите узнать. Спросите [send=что горит]Что горит?[/send]'

        if (text === 'что горит') {
            const tasksResponse = await $b24.actions.v2.call.make({
                method: 'tasks.task.list',
                params: {
                    filter: {
                        RESPONSIBLE_ID: Number(data.user.id),
                        '<DEADLINE': new Date().toISOString(),
                        '!REAL_STATUS': [4, 5],
                    },
                    select: ['ID', 'TITLE', 'DEADLINE'],
                    order: { DEADLINE: 'asc' },
                },
                requestId: 'tasks-task-list',
            })

            const tasks = tasksResponse.getData().result.tasks || []
            message = tasks.length
                ? 'Просроченные задачи:[br]' + tasks.map((task) => `- ${task.title}`).join('[br]')
                : 'Шикарно работаете! Ни одной просроченной задачи.'
        }

        await $b24.actions.v2.call.make({
            method: 'imbot.v2.Chat.Message.send',
            params: {
                botId: Number(data.bot.id),
                dialogId: data.chat.dialogId,
                fields: { message },
            },
            requestId: 'imbot-v2-reply',
        })
    }
    ```

- Python

    ```python
    from datetime import datetime, timezone


    def handle_message(auth: dict, data: dict) -> None:
        client, token = make_client(store.load_auth(auth["application_token"]))

        text = (data["message"].get("text") or "").strip().lower()
        message = "Не соображу, что вы хотите узнать. Спросите [send=что горит]Что горит?[/send]"

        if text == "что горит":
            tasks = client.tasks.task.list(
                filter={
                    "RESPONSIBLE_ID": int(data["user"]["id"]),
                    "<DEADLINE": datetime.now(timezone.utc).isoformat(),
                    "!REAL_STATUS": [4, 5],
                },
                select=["ID", "TITLE", "DEADLINE"],
                order={"DEADLINE": "asc"},
            ).response.result["tasks"]

            message = (
                "Просроченные задачи:[br]" + "[br]".join(f"- {task['title']}" for task in tasks)
                if tasks
                else "Шикарно работаете! Ни одной просроченной задачи."
            )

        token.call_method(
            "imbot.v2.Chat.Message.send",
            {
                "botId": int(data["bot"]["id"]),
                "dialogId": data["chat"]["dialogId"],
                "fields": {"message": message},
            },
        )
    ```


- PHP

    ```php
    function handleMessage(array $auth, array $data): void
    {
        global $store;

        $b24 = makeServiceBuilder($store->loadAuth((string)$auth['application_token']));

        $text = mb_strtolower(trim((string)($data['message']['text'] ?? '')));
        $message = 'Не соображу, что вы хотите узнать. Спросите [send=что горит]Что горит?[/send]';

        if ($text === 'что горит') {
            $result = $b24->core->call('tasks.task.list', [
                'filter' => [
                    'RESPONSIBLE_ID' => (int)$data['user']['id'],
                    '<DEADLINE' => date('c'),
                    '!REAL_STATUS' => [4, 5],
                ],
                'select' => ['ID', 'TITLE', 'DEADLINE'],
                'order' => ['DEADLINE' => 'asc'],
            ])->getResponseData()->getResult();

            $tasks = $result['tasks'] ?? [];
            $message = $tasks
                ? 'Просроченные задачи:[br]' . implode('[br]', array_map(
                    static fn(array $task): string => '- ' . $task['title'],
                    $tasks,
                ))
                : 'Шикарно работаете! Ни одной просроченной задачи.';
        }

        $b24->core->call('imbot.v2.Chat.Message.send', [
            'botId' => (int)$data['bot']['id'],
            'dialogId' => (string)$data['chat']['dialogId'],
            'fields' => ['message' => $message],
        ]);
    }
    ```
{% endlist %}

Ответ `tasks.task.list` сокращен до полей, которые использует бот:

```json
{
    "result": {
        "tasks": [
            {
                "id": "8017",
                "title": "Согласовать смету",
                "deadline": "2025-10-24T19:00:00+03:00"
            }
        ]
    }
}
```

Если задач нет, `result.tasks` содержит пустой массив — бот отвечает, что просроченных задач нет.

## 4. Очистите данные при удалении бота

Событие [ONIMBOTV2DELETE](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2delete) приходит, когда бота удалили. Это последнее событие от него — освободите связанные с ботом данные.

{% list tabs %}

- JS

    ```js
    async function handleBotDelete(auth, data) {
        await store.removeBot(Number(data.bot.id))
    }
    ```

- Python

    ```python
    def handle_bot_delete(auth: dict, data: dict) -> None:
        store.remove_bot(int(data["bot"]["id"]))
    ```


- PHP

    ```php
    function handleBotDelete(array $auth, array $data): void
    {
        global $store;

        $store->removeBot((int)$data['bot']['id']);
    }
    ```
{% endlist %}

## Проверим результат

1. Установите приложение и убедитесь, что обработчик получил `ONAPPINSTALL`, а метод `imbot.v2.Bot.register` вернул `result.bot.id`
2. Проверьте регистрацию методом [imbot.v2.Bot.list](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-list.md) — в ответе должен быть бот с вашим `code`
3. Откройте чат с ботом «Докладун». Бот отправит приветствие — значит, событие `ONIMBOTV2JOINCHAT` дошло до обработчика
4. Отправьте «что горит». Бот ответит списком задач или сообщением о том, что просроченных задач нет

Успех подтверждают два признака: метод `imbot.v2.Chat.Message.send` вернул `result.id` отправленного сообщения, а сообщение появилось в чате.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса и права приложения.

- `BOT_CODE_ALREADY_TAKEN` — код бота занят другим приложением, выберите другое значение `fields.code`
- `BOT_WEBHOOK_URL_REQUIRED` — при `fields.eventMode = webhook` не передан `fields.webhookUrl`
- `BOT_INVALID_CALLBACK` — в `fields.webhookUrl` передан невалидный URL обработчика
- `BOT_ID_REQUIRED` — в `imbot.v2.Chat.Message.send` не передан `botId`, проверьте `data.bot.id` в событии
- `BOT_NOT_FOUND` — бот удален, повторите шаг 1 и зарегистрируйте его заново
- `ACCESS_DENIED` — бот не участник чата, проверьте `dialogId` из события
- `EMPTY_MESSAGE` — в `fields.message` пришла пустая строка
- `expired_token` — `access_token` истек. SDK обновит его по `refresh_token`, если клиент создан с `client_id` и `client_secret` приложения; сохраните новую пару в хранилище

Если ошибки нет, но бот молчит, проверьте цепочку по шагам:

- бот не появился в списке чатов — событие `ONAPPINSTALL` не дошло до обработчика или приложению не выдан scope `imbot`
- бот появился, но не отвечает — обработчик не получает события `ONIMBOTV2*`: проверьте `fields.eventMode` и `fields.webhookUrl` методом [imbot.v2.Bot.get](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-get.md)
- бот отвечает, но список задач всегда пустой — у пользователя токена нет доступа к задачам исполнителя, проверьте вызов `tasks.task.list` с тем же фильтром отдельно

## Что важно учитывать

- Методы и события ветки `imbot.*` устарели. Для новых ботов используйте `imbot.v2.*`, порядок перехода описан в статье [Миграция с imbot на imbot.v2](../../api-reference/chat-bots/chat-bots-v2/migration.md)
- Бот типа `bot` получает события в личном диалоге и по упоминанию `@bot` в групповых чатах. Чтобы бот видел все сообщения группового чата, нужен тип `personal` или `supervisor` — [Типы ботов](../../api-reference/chat-bots/chat-bots-v2/index.md#bot-types)
- Задачи возвращаются в пределах прав пользователя, чей токен использует приложение. Администратор видит все задачи, руководитель — задачи своих сотрудников
- После обновления токенов сохраняйте новую пару целиком, иначе после перезапуска приложение возьмет из хранилища устаревшие значения
- Платформа не гарантирует повторную доставку webhook-события. Если нужна гарантия, регистрируйте бота с `eventMode: "fetch"` и забирайте события методом [imbot.v2.Event.get](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/event-get.md)
- Чтобы адаптировать сценарий под другую задачу, меняйте только шаг 3: условие на текст сообщения и вызов, который собирает данные для ответа

## Продолжите изучение

- [{#T}](../../api-reference/chat-bots/chat-bots-v2/quick-start.md)
- [{#T}](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md)
- [{#T}](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)
- [{#T}](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md)
- [{#T}](../../api-reference/tasks/tasks-task-list.md)
- [{#T}](./open-lines-bot.md)
