# Как создать чат-бота для Открытых линий

> Scope: [`imbot`, `imopenlines`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — пользователь того приложения или вебхука, через который зарегистрирован чат-бот
>
> - [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) — авторизованный пользователь
> - [imopenlines.bot.session.message.send](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-message-send.md) — любой пользователь
> - [imopenlines.bot.session.operator](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-operator.md) — любой пользователь
> - [imopenlines.bot.session.transfer](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-transfer.md) и [imopenlines.bot.session.finish](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-finish.md) — пользователь приложения с зарегистрированным чат-ботом

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чат-бот для Открытых линий принимает обращения клиентов, отвечает первым сообщением и при необходимости передает диалог оператору. Для такого сценария используйте актуальную платформу [чат-ботов 2.0](../../api-reference/chat-bots/chat-bots-v2/index.md).

Проверяемый результат: клиент пишет в канал Открытой линии, бот отвечает автоматическим сообщением, а по слову «оператор» передает диалог сотруднику. В чате линии видно и ответ бота, и подключившегося оператора.

В сценарии участвуют три объекта:

- входящий вебхук со scope `imbot` и `imopenlines`
- зарегистрированный чат-бот с поддержкой Открытых линий
- Открытая линия, к которой подключен этот бот

{% note info "" %}

SDK выполняют только исходящие вызовы REST. Входящие события принимает ваш веб-сервер — например, приложение на Express, Flask или обычный PHP-скрипт.

{% endnote %}

Сценарий состоит из четырех шагов.

1. Зарегистрировать бота с поддержкой Открытых линий методом [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) и подключить его к линии
2. Принять событие [ONIMBOTV2MESSAGEADD](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2messageadd) в обработчике и проверить, что чат относится к Открытой линии
3. Ответить клиенту методом [imopenlines.bot.session.message.send](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-message-send.md)
4. Передать диалог оператору или завершить сессию методами [imopenlines.bot.session.operator](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-operator.md), [imopenlines.bot.session.transfer](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-transfer.md) и [imopenlines.bot.session.finish](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-finish.md)

Порядок задан платформой: идентификатор чата для управления сессией появляется только в событии, а события приходят лишь после регистрации бота.

## Подготовьте данные

Примеры на этой странице работают через входящий вебхук: он не требует установки приложения, и бот регистрируется в Битрикс24 сразу. Отличия сценария для приложения с OAuth-авторизацией собраны в блоке [Что важно учитывать](#important).

1. Создайте входящий вебхук со scope `imbot` и `imopenlines`
2. Разместите обработчик событий на публичном HTTPS-адресе, например `https://example.com/handler`
3. Настройте Открытую линию и подключите к ней канал — Онлайн-чат на сайте или мессенджер

Создать вебхук и настроить Открытую линию может только администратор Битрикс24.

Подготовьте значения, которые нужно заменить своими:

#|
|| **Значение** | **Откуда взять** ||
|| `B24_WEBHOOK_URL` | Адрес входящего вебхука вида `https://example.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/` ||
|| `BOT_TOKEN` | Придумайте уникальный токен бота длиной до 40 символов. Он привязывается к боту при регистрации ||
|| `HANDLER_URL` | Публичный HTTPS-адрес обработчика событий. В примерах на JS и Python обработчик слушает путь `/handler`, в примере на PHP это файл `handler.php` ||
|| `OPERATOR_ID` | Идентификатор сотрудника, которому бот передает диалог. Его видно в адресе профиля сотрудника или в ответе методов [user.get](../../api-reference/user/user-get.md) и [user.search](../../api-reference/user/user-search.md) — этим двум методам нужно отдельное право `user`, самому сценарию оно не требуется ||
|#

Идентификатор чата подставлять не нужно: он приходит в событии в поле `data.chat.id` и передается в параметр `CHAT_ID` методов управления сессией.

{% note warning "" %}

Адрес входящего вебхука и токен бота — секреты. Адрес дает весь доступ вебхука, токен позволяет управлять сессиями от имени бота. Храните оба значения в переменных окружения сервера и не размещайте их в коде, который выполняется в браузере.

{% endnote %}

Для Python-примера разложите адрес вебхука на домен `B24_DOMAIN` и путь `B24_WEBHOOK_TOKEN` вида `1/xxxxxxxxxxxxxxxx`.

Инициализируйте SDK и прочитайте подготовленные значения перед первым вызовом.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import { B24Hook, Text } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_WEBHOOK_URL)

    const botToken = process.env.BOT_TOKEN
    const handlerUrl = process.env.HANDLER_URL
    const operatorId = Number(process.env.OPERATOR_ID)

    // На ошибку REST SDK не бросает исключение, поэтому проверяем признак isSuccess
    async function call(method, params) {
        const response = await $b24.actions.v2.call.make({
            method,
            params,
            requestId: Text.getUuidRfc4122(),
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import os

    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],
        webhook_token=os.environ["B24_WEBHOOK_TOKEN"],
    )
    client = Client(token)

    bot_token = os.environ["BOT_TOKEN"]
    handler_url = os.environ["HANDLER_URL"]
    operator_id = int(os.environ["OPERATOR_ID"])
    ```


- PHP

    ```php
    <?php
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
    $handlerUrl = getenv('HANDLER_URL');
    $operatorId = (int)getenv('OPERATOR_ID');
    ```
{% endlist %}

Этот код нужен и разовому скрипту регистрации из шага 1, и постоянно работающему обработчику из шагов 2–4. Держите его в обоих файлах или вынесите в общий модуль.

## 1. Зарегистрируйте бота и подключите его к линии

В [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) параметры бота передаются в объекте `fields`:

- `code` — код бота, уникальный в рамках вебхука или приложения
- `botToken` — токен бота, обязателен при авторизации через входящий вебхук
- `type` — тип бота
- `isSupportOpenline` — поддержка Открытых линий
- `eventMode` — режим доставки событий, значение `webhook` отправляет события на адрес обработчика, отдельная подписка методом `event.bind` не нужна
- `webhookUrl` — адрес обработчика событий
- `properties` — профиль бота: имя `name`, должность `workPosition` и цвет аватара `color`

Тип выбирайте по задаче. Для гибридного бота, который работает в групповых чатах, личных диалогах и Открытых линиях, передайте `type = bot` и `isSupportOpenline = true`. Если бот нужен только для Открытых линий, передайте `type = openline` — поддержка линий включится сама. Без нее бот не получит события из чата линии.

Регистрация выполняется один раз. В примерах на Python и PHP SDK сами бросают исключение, если метод вернул ошибку, а в JS вызовы идут через функцию `call` из блока подготовки — она проверяет признак `isSuccess`.

{% list tabs %}

- JS

    ```js
    // Для imbot.v2 нет типизированной обертки, поэтому используется прямой вызов через ядро SDK.
    const result = await call('imbot.v2.Bot.register', {
        fields: {
            code: 'open_line_bot',
            botToken: botToken,
            type: 'bot',
            isSupportOpenline: true,
            eventMode: 'webhook',
            webhookUrl: handlerUrl,
            properties: {
                name: 'Линия поддержки',
                workPosition: 'Первая линия',
                color: 'green',
            },
        },
    })

    const botId = Number(result.bot.id)
    ```

- Python

    ```python
    # Для imbot.v2 нет типизированной обертки, поэтому используется прямой вызов через ядро SDK.
    response = token.call_method(
        "imbot.v2.Bot.register",
        {
            "fields": {
                "code": "open_line_bot",
                "botToken": bot_token,
                "type": "bot",
                "isSupportOpenline": True,
                "eventMode": "webhook",
                "webhookUrl": handler_url,
                "properties": {
                    "name": "Линия поддержки",
                    "workPosition": "Первая линия",
                    "color": "green",
                },
            }
        },
    )

    bot_id = int(response["result"]["bot"]["id"])
    ```


- PHP

    ```php
    // Для imbot.v2 нет типизированной обертки, поэтому используется прямой вызов через ядро SDK.
    $result = $b24->core->call('imbot.v2.Bot.register', [
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
                'color' => 'green',
            ],
        ],
    ])->getResponseData()->getResult();

    $botId = (int)$result['bot']['id'];
    ```
{% endlist %}

В успешном ответе сохраните `result.bot.id`: он нужен, когда вебхук управляет несколькими ботами. Поле `isSupportOpenline` подтверждает, что бот принят как бот Открытых линий. Пример сокращен, полная форма ответа — на странице [imbot.v2.Bot.register](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md).

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

Метод идемпотентен: повторный вызов с тем же `fields.code` вернет существующего бота и не изменит его данные. Чтобы поменять свойства зарегистрированного бота или адрес обработчика, используйте [imbot.v2.Bot.update](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-update.md).

После регистрации подключите бота к линии: откройте *Контакт-центр > Открытые линии*, отредактируйте нужную линию и укажите бота в блоке настроек чат-бота. Там же задается момент подключения — например, сразу при первом обращении клиента.

{% note warning "" %}

Пока бот не подключен к линии, он не входит в чат сессии. Метод регистрации при этом отработает успешно, но события `ONIMBOTV2*` из Открытой линии в обработчик не придут.

{% endnote %}

## 2. Примите событие и проверьте, что чат относится к линии

Битрикс24 отправляет события бота POST-запросом на адрес из `fields.webhookUrl`. Тело запроса приходит в формате `application/x-www-form-urlencoded`, ключи имеют вид `data[chat][entityType]` и `auth[application_token]`. Все скалярные значения передаются строками, поэтому приводите типы явно.

Обработчик принимает все события бота на одном адресе и разбирает их по полю `event`. Бот получает события из всех своих чатов, поэтому проверяйте поле `data.chat.entityType`: у чатов Открытых линий оно равно `LINES`.

Из события [ONIMBOTV2MESSAGEADD](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2messageadd) возьмите два значения:

- `data.chat.id` — идентификатор чата, его нужно передать в параметр `CHAT_ID` методов управления сессией
- `data.message.text` — текст сообщения клиента, по нему бот выбирает ответ

Подлинность запроса проверяйте по `auth.application_token` с верхнего уровня, а не по токену из `data.bot.auth`. У бота, зарегистрированного через входящий вебхук, `auth.application_token` равен строке `custom` со склеенным `botToken`, без разделителя.

```json
{
    "event": "ONIMBOTV2MESSAGEADD",
    "data": {
        "bot": {"id": 456, "code": "open_line_bot"},
        "message": {"id": 790, "chatId": 112, "authorId": 27, "text": "Нужен оператор"},
        "chat": {"id": 112, "dialogId": "chat112", "type": "lines", "entityType": "LINES"},
        "user": {"id": 27, "name": "Клиент"}
    },
    "auth": {"domain": "example.bitrix24.ru", "application_token": "custommy_bot_token"}
}
```

Пример показывает событие уже после разбора тела запроса. В самом запросе те же данные приходят плоскими ключами: `data[chat][entityType]=LINES`, `data[chat][id]=112`.

Функции `sendReply` и `handleLinesMessage` из шагов 3 и 4 разместите в этом же файле — обработчик вызывает их по имени.

{% list tabs %}

- JS

    ```js
    // Инициализация SDK и переменные — из блока «Подготовьте данные»
    import express from 'express'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    app.post('/handler', async (req, res) => {
        const data = req.body.data || {}
        const auth = req.body.auth || {}

        if (auth.application_token !== `custom${botToken}`) {
            return res.sendStatus(403)
        }

        if (req.body.event === 'ONIMBOTV2MESSAGEADD' && data.chat?.entityType === 'LINES') {
            const chatId = Number(data.chat.id)
            const text = String(data.message?.text ?? '').trim().toLowerCase()

            try {
                await handleLinesMessage(chatId, text)
            } catch (error) {
                console.error(error)
            }
        }

        // Платформа ждет ответ 200, повторная доставка события не гарантируется
        res.sendStatus(200)
    })

    app.listen(3000)
    ```

- Python

    ```python
    # Инициализация SDK и переменные — из блока «Подготовьте данные»
    import re

    from flask import Flask, request

    app = Flask(__name__)


    def unflatten(form) -> dict:
        """Собирает плоские ключи вида data[chat][entityType] во вложенный словарь"""
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
        data = payload.get("data", {})
        auth = payload.get("auth", {})

        if auth.get("application_token") != f"custom{bot_token}":
            return "", 403

        chat = data.get("chat", {})
        if payload.get("event") == "ONIMBOTV2MESSAGEADD" and chat.get("entityType") == "LINES":
            chat_id = int(chat["id"])
            text = (data.get("message", {}).get("text") or "").strip().lower()

            try:
                handle_lines_message(chat_id, text)
            except Exception as error:
                app.logger.error("%s", error)

        # Платформа ждет ответ 200, повторная доставка события не гарантируется
        return "", 200


    if __name__ == "__main__":
        app.run(port=3000)
    ```


- PHP

    ```php
    // Продолжение handler.php: инициализация SDK и переменные — из блока «Подготовьте данные»
    $event = (string)($_POST['event'] ?? '');
    $data = (array)($_POST['data'] ?? []);
    $auth = (array)($_POST['auth'] ?? []);

    if (($auth['application_token'] ?? '') !== 'custom' . $botToken) {
        http_response_code(403);
        exit;
    }

    if ($event === 'ONIMBOTV2MESSAGEADD' && ($data['chat']['entityType'] ?? '') === 'LINES') {
        $chatId = (int)($data['chat']['id'] ?? 0);
        $text = mb_strtolower(trim((string)($data['message']['text'] ?? '')));

        try {
            handleLinesMessage($chatId, $text);
        } catch (Throwable $exception) {
            error_log($exception->getMessage());
        }
    }

    // Платформа ждет ответ 200, повторная доставка события не гарантируется
    http_response_code(200);
    ```
{% endlist %}

## 3. Ответьте клиенту

Сообщение от имени бота в текущую сессию линии отправляет метод [imopenlines.bot.session.message.send](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-message-send.md). Параметры:

- `CHAT_ID` — идентификатор чата, значение `data.chat.id` из события
- `NAME` — режим ответа: `DEFAULT` отправляет текст из `MESSAGE`, `WELCOME` отправляет приветствие из настроек Открытой линии и игнорирует `MESSAGE`
- `MESSAGE` — текст ответа для режима `DEFAULT`. С пустым текстом сообщение в чат не добавится

Метод работает с текущей сессией линии, `CLIENT_ID` ему не нужен. Оформите вызов отдельной функцией — она пригодится в шаге 4.

{% list tabs %}

- JS

    ```js
    async function sendReply(chatId, message) {
        await call('imopenlines.bot.session.message.send', {
            CHAT_ID: chatId,
            NAME: 'DEFAULT',
            MESSAGE: message,
        })
    }
    ```

- Python

    ```python
    def send_reply(chat_id: int, message: str) -> None:
        client.imopenlines.bot.session.message.send(
            chat_id=chat_id,
            message=message,
            name="DEFAULT",
        ).response
    ```


- PHP

    ```php
    function sendReply(int $chatId, string $message): void
    {
        global $b24;

        $b24->core->call('imopenlines.bot.session.message.send', [
            'CHAT_ID' => $chatId,
            'NAME' => 'DEFAULT',
            'MESSAGE' => $message,
        ]);
    }
    ```
{% endlist %}

Ответ `true` подтверждает, что вызов выполнен. Метод не возвращает подтверждения, что сообщение появилось в чате, поэтому проверяйте результат в чате линии.

```json
{
    "result": true
}
```

## 4. Передайте диалог оператору или завершите сессию

Со scope `imopenlines` боту доступны три метода управления сессией:

- [imopenlines.bot.session.operator](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-operator.md) — передать диалог первому свободному оператору линии, нужен только `CHAT_ID`
- [imopenlines.bot.session.transfer](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-transfer.md) — передать конкретному сотруднику в параметре `USER_ID` или в очередь в параметре `QUEUE_ID`, за раз только одно назначение
- [imopenlines.bot.session.finish](../../api-reference/imopenlines/openlines/chat-bots/imopenlines-bot-session-finish.md) — завершить сессию

Методы `imopenlines.bot.session.transfer` и `imopenlines.bot.session.finish` действуют от имени бота, поэтому вебхук передает в параметр `CLIENT_ID` тот же `botToken`, который использовался при регистрации. У метода `imopenlines.bot.session.operator` параметра `CLIENT_ID` нет.

Флаг `LEAVE` в методе `imopenlines.bot.session.transfer` определяет, останется ли бот в чате: `Y` — бот выходит сразу, `N` — остается до подтверждения передачи. Значение по умолчанию — `N`.

Соберите ветки ответа в функцию `handleLinesMessage`, которую вызывает обработчик из шага 2. Пример разбирает три ключевых слова:

- «оператор» — передать диалог первому свободному сотруднику линии
- «менеджер» — передать диалог сотруднику из `OPERATOR_ID`
- «спасибо» — попрощаться и завершить сессию

На остальные сообщения бот отвечает подсказкой.

{% list tabs %}

- JS

    ```js
    async function handleLinesMessage(chatId, text) {
        if (text.includes('оператор')) {
            await call('imopenlines.bot.session.operator', { CHAT_ID: chatId })
            return
        }

        if (text.includes('менеджер')) {
            await call('imopenlines.bot.session.transfer', {
                CHAT_ID: chatId,
                USER_ID: operatorId,
                LEAVE: 'Y',
                CLIENT_ID: botToken,
            })
            return
        }

        if (text === 'спасибо') {
            await sendReply(chatId, 'Рады помочь! Обращайтесь еще')
            await call('imopenlines.bot.session.finish', {
                CHAT_ID: chatId,
                CLIENT_ID: botToken,
            })
            return
        }

        await sendReply(chatId, 'Здравствуйте! Опишите вопрос или напишите «оператор», чтобы подключить сотрудника')
    }
    ```

- Python

    ```python
    def handle_lines_message(chat_id: int, text: str) -> None:
        if "оператор" in text:
            client.imopenlines.bot.session.operator(chat_id=chat_id).response
            return

        if "менеджер" in text:
            # Типизированная обертка не принимает CLIENT_ID, поэтому вызываем метод через ядро SDK
            token.call_method(
                "imopenlines.bot.session.transfer",
                {
                    "CHAT_ID": chat_id,
                    "USER_ID": operator_id,
                    "LEAVE": "Y",
                    "CLIENT_ID": bot_token,
                },
            )
            return

        if text == "спасибо":
            send_reply(chat_id, "Рады помочь! Обращайтесь еще")
            token.call_method(
                "imopenlines.bot.session.finish",
                {"CHAT_ID": chat_id, "CLIENT_ID": bot_token},
            )
            return

        send_reply(chat_id, "Здравствуйте! Опишите вопрос или напишите «оператор», чтобы подключить сотрудника")
    ```


- PHP

    ```php
    function handleLinesMessage(int $chatId, string $text): void
    {
        global $b24, $botToken, $operatorId;

        if (str_contains($text, 'оператор')) {
            $b24->core->call('imopenlines.bot.session.operator', ['CHAT_ID' => $chatId]);

            return;
        }

        if (str_contains($text, 'менеджер')) {
            $b24->core->call('imopenlines.bot.session.transfer', [
                'CHAT_ID' => $chatId,
                'USER_ID' => $operatorId,
                'LEAVE' => 'Y',
                'CLIENT_ID' => $botToken,
            ]);

            return;
        }

        if ($text === 'спасибо') {
            sendReply($chatId, 'Рады помочь! Обращайтесь еще');
            $b24->core->call('imopenlines.bot.session.finish', [
                'CHAT_ID' => $chatId,
                'CLIENT_ID' => $botToken,
            ]);

            return;
        }

        sendReply($chatId, 'Здравствуйте! Опишите вопрос или напишите «оператор», чтобы подключить сотрудника');
    }
    ```
{% endlist %}

Успешный ответ каждого метода управления сессией:

```json
{
    "result": true
}
```

## Проверим результат

1. Проверьте регистрацию методом [imbot.v2.Bot.list](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-list.md) с параметром `botToken` — в массиве `result.bots` есть бот с вашим `code`, у него `isSupportOpenline` равен `true`, а `eventMode` равен `webhook`
2. Напишите в канал, подключенный к линии. В обработчик придет `ONIMBOTV2MESSAGEADD`, в котором `data.chat.entityType` равен `LINES`, а бот ответит текстом из шага 3
3. Напишите «оператор». Метод `imopenlines.bot.session.operator` вернет `true`, и к диалогу подключится сотрудник линии

Диалог целиком виден в разделе *Контакт-центр > Открытые линии*: в истории сессии есть и ответы бота, и момент передачи оператору.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса и scope вебхука.

- `BOT_TOKEN_NOT_SPECIFIED` — не передан `fields.botToken`, при авторизации через вебхук он обязателен
- `BOT_TOKEN_INVALID_LENGTH` — токен бота длиннее 40 символов, укоротите значение `BOT_TOKEN`
- `BOT_WEBHOOK_URL_REQUIRED` — для webhook-режима не передан `fields.webhookUrl`, подставьте адрес обработчика
- `BOT_INVALID_CALLBACK` — в `fields.webhookUrl` передан невалидный адрес, проверьте схему `https` и доменное имя
- `BOT_CODE_ALREADY_TAKEN` — код бота занят, выберите другое значение `fields.code`
- `CHAT_ID_EMPTY` — не передан `CHAT_ID` или передано значение `<= 0`, возьмите `data.chat.id` из события
- `USER_ID_EMPTY` — в `imopenlines.bot.session.transfer` передан пустой `USER_ID` или значение `<= 0`. Так бывает, когда переменная `OPERATOR_ID` не задана в окружении
- `BOT_ID_ERROR` — в `CLIENT_ID` передано значение, для которого нет зарегистрированного бота, сравните его с `fields.botToken` из шага 1
- `ACCESS_DENIED` — параметр `CLIENT_ID` не передан вовсе или у вебхука нет scope `imopenlines`, проверьте оба условия
- `WRONG_CHAT` — диалог уже ведет оператор, а не бот, передавать сессию повторно не нужно
- `OPERATOR_WRONG` — передать диалог указанному сотруднику или в очередь нельзя, проверьте `USER_ID`

Если ошибки нет, но бот молчит, пройдите цепочку по шагам:

- события не приходят в обработчик — бот не подключен к линии в настройках Открытой линии или в `fields.eventMode` осталось значение `fetch`. Проверьте бота методом `imbot.v2.Bot.list` и повторите шаг 1
- события приходят, но обработчик отвечает `403` — значение `BOT_TOKEN` в окружении сервера не совпадает с токеном регистрации, сравните его с `fields.botToken` из шага 1
- события приходят, но условие не срабатывает — сравните `data.chat.entityType` со строкой `LINES` и помните, что в webhook-режиме все скаляры приходят строками
- обработчик отвечает не `200` — платформа не гарантирует повторную доставку события, диалог останется без ответа

## Что важно учитывать {#important}

- Методы и события ветки `imbot.*` устарели. Для новых ботов используйте `imbot.v2.*`, порядок перехода описан в статье [Миграция с imbot на imbot.v2](../../api-reference/chat-bots/chat-bots-v2/migration.md)
- Бот, зарегистрированный методами `imbot.*`, получает события `ONIMBOT*`, а бот из `imbot.v2.*` — события `ONIMBOTV2*`
- В чате Открытой линии бот получает все сообщения клиента без упоминания `@bot`, в отличие от групповых чатов
- В приложении с OAuth-авторизацией `fields.botToken` при регистрации и `CLIENT_ID` при управлении сессией не нужны: бот привязан к приложению через `client_id`. При этом события не приходят, пока приложение [не завершило установку](../../settings/app-installation/installation-finish.md)
- Чтобы адаптировать сценарий под свою задачу, меняйте только функцию `handleLinesMessage`: условия на текст, тексты ответов и способ передачи диалога
- Чтобы направлять обращения в очередь, передавайте в `imopenlines.bot.session.transfer` параметр `QUEUE_ID` со значением поля `ID` из ответа метода [imopenlines.config.list.get](../../api-reference/imopenlines/openlines/imopenlines-config-list-get.md)

## Продолжите изучение

- [{#T}](../../api-reference/chat-bots/chat-bots-v2/migration.md)
- [{#T}](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md)
- [{#T}](../../api-reference/chat-bots/chat-bots-v2/imbot.v2/events/events.md)
- [{#T}](../../api-reference/imopenlines/openlines/chat-bots/index.md)
- [{#T}](./index.md)
