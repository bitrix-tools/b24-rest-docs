# Пример создания чат-бота

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В качестве примера создадим чат-бота, который сообщает пользователю о его просроченных задачах. Бот обрабатывает одну команду — «Что горит?» — и возвращает список просроченных задач.

{% note info "" %}

Чат-бот — это [приложение](../../settings/app-installation/index.md) с OAuth-авторизацией, а не входящий вебхук. Битрикс24 шлет приложению события (`ONAPPINSTALL`, `ONIMBOTMESSAGEADD`, `ONIMBOTJOINCHAT`, `ONIMBOTDELETE`) HTTP-запросами на один публичный URL обработчика. Приложению нужны права (scope): `imbot` — регистрация бота, `im` — отправка сообщений, `task` и `task_extended` — доступ к задачам.

SDK выполняют исходящие вызовы REST. Входящие события принимает ваш веб-сервер (Express, PHP, Flask), а авторизацию (`access_token`, `domain`) берет из тела запроса события.

{% endnote %}

## Как работает бот

1. `ONAPPINSTALL` — при установке регистрируем бота методом [imbot.register](../../api-reference/chat-bots/outdated/bots/imbot-register.md), указывая URL-обработчики событий
2. `ONIMBOTJOINCHAT` — при открытии диалога отправляем приветствие методом [imbot.message.add](../../api-reference/chat-bots/outdated/messages/imbot-message-add.md)
3. `ONIMBOTMESSAGEADD` — на сообщение «Что горит?» получаем просроченные задачи через [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) и отвечаем
4. `ONIMBOTDELETE` — при удалении бота очищаем сохраненную конфигурацию

{% note warning "" %}

В классическом примере используется устаревший метод `task.item.list`. В новых интеграциях применяйте [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) — он используется в примерах ниже.

{% endnote %}

## Инициализация SDK по данным события

Авторизацию приложение получает в теле каждого события. По ней строим клиент SDK для исходящих вызовов.

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const APP = { clientId: 'local.xxxxxxxx.xxxxxxxx', clientSecret: 'yyyyyyyy' }

    // auth приходит в теле события: { domain, access_token, refresh_token, application_token, ... }
    function makeClient(auth) {
        const $b24 = new B24OAuth({
            domain: auth.domain,
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
            memberId: auth.member_id,
        }, APP)
        $b24.offClientSideWarning()
        return $b24
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Credentials\AuthToken;
    use Bitrix24\SDK\Core\Credentials\DefaultOAuthServerUrl;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    function makeServiceBuilder(Request $request) {
        $appProfile = ApplicationProfile::initFromArray([
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'local.xxxxxxxx.xxxxxxxx',
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'yyyyyyyy',
            'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'imbot,im,task',
        ]);
        // Токен приложения берется из тела события
        $authToken = AuthToken::initFromEventRequest($request);
        $domain = (string)$request->request->all('auth')['domain'];

        $log = new Logger('bot');
        $log->pushHandler(new StreamHandler('php://stdout'));
        return (new ServiceBuilderFactory(new EventDispatcher(), $log))
            ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());
    }
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from b24pysdk import Client, BitrixApp, BitrixToken

    APP = BitrixApp(client_id="local.xxxxxxxx.xxxxxxxx", client_secret="yyyyyyyy")

    def make_client(auth: dict) -> tuple:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token
    ```

{% endlist %}

## Обработчик событий

Один эндпоинт принимает все события и маршрутизирует их по полю `event`.

{% list tabs %}

- JS

    ```js
    import express from 'express'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const HANDLER_URL = 'https://your-domain.example/handler'

    app.post('/handler', async (req, res) => {
        const event = req.body.event
        const auth = req.body.auth || {}
        const data = req.body.data || {}
        const $b24 = makeClient(auth)

        try {
            if (event === 'ONAPPINSTALL') {
                await $b24.actions.v2.call.make({
                    method: 'imbot.register',
                    params: {
                        CODE: 'ReportBot',
                        TYPE: 'B',
                        EVENT_MESSAGE_ADD: HANDLER_URL,
                        EVENT_WELCOME_MESSAGE: HANDLER_URL,
                        EVENT_BOT_DELETE: HANDLER_URL,
                        PROPERTIES: { NAME: 'Докладун', COLOR: 'AQUA', WORK_POSITION: 'Докладываю о делах' },
                    },
                    requestId: 'imbot-register',
                })
            } else if (event === 'ONIMBOTJOINCHAT') {
                await $b24.actions.v2.call.make({
                    method: 'imbot.message.add',
                    params: {
                        DIALOG_ID: data.PARAMS.DIALOG_ID,
                        MESSAGE: 'Привет! Я Докладун. Спросите [send=что горит]Что горит?[/send]',
                    },
                    requestId: 'welcome',
                })
            } else if (event === 'ONIMBOTMESSAGEADD') {
                const text = (data.PARAMS.MESSAGE || '').toLowerCase()
                const userId = data.PARAMS.FROM_USER_ID
                let message = 'Не соображу, что вы хотите узнать.'
                if (text === 'что горит') {
                    const tasksResp = await $b24.actions.v2.call.make({
                        method: 'tasks.task.list',
                        params: {
                            filter: { RESPONSIBLE_ID: userId, '<DEADLINE': new Date().toISOString() },
                            select: ['ID', 'TITLE', 'DEADLINE'],
                        },
                        requestId: 'tasks',
                    })
                    const tasks = tasksResp.getData().result.tasks || []
                    message = tasks.length
                        ? 'Просроченные задачи:\n' + tasks.map((t) => `• ${t.title}`).join('\n')
                        : 'Шикарно работаете! Ни одной просроченной задачи.'
                }
                await $b24.actions.v2.call.make({
                    method: 'imbot.message.add',
                    params: { DIALOG_ID: data.PARAMS.DIALOG_ID, MESSAGE: message },
                    requestId: 'reply',
                })
            }
            // ONIMBOTDELETE — очистка конфигурации при необходимости
            res.send('ok')
        } catch (error) {
            res.status(200).send('error: ' + error.message)
        }
    })

    app.listen(3000)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();
    $event = (string)$request->request->get('event');
    $data = $request->request->all('data');
    $handlerUrl = 'https://your-domain.example/handler';

    $b24 = makeServiceBuilder($request); // см. «Инициализация SDK по данным события»

    // imbot.* нет среди типизированных сервисов PHP — вызываем через ядро
    if ($event === 'ONAPPINSTALL') {
        $b24->core->call('imbot.register', [
            'CODE' => 'ReportBot',
            'TYPE' => 'B',
            'EVENT_MESSAGE_ADD' => $handlerUrl,
            'EVENT_WELCOME_MESSAGE' => $handlerUrl,
            'EVENT_BOT_DELETE' => $handlerUrl,
            'PROPERTIES' => ['NAME' => 'Докладун', 'COLOR' => 'AQUA', 'WORK_POSITION' => 'Докладываю о делах'],
        ]);
    } elseif ($event === 'ONIMBOTJOINCHAT') {
        $b24->core->call('imbot.message.add', [
            'DIALOG_ID' => $data['PARAMS']['DIALOG_ID'],
            'MESSAGE' => 'Привет! Я Докладун. Спросите [send=что горит]Что горит?[/send]',
        ]);
    } elseif ($event === 'ONIMBOTMESSAGEADD') {
        $text = mb_strtolower($data['PARAMS']['MESSAGE'] ?? '');
        $userId = (int)$data['PARAMS']['FROM_USER_ID'];
        $message = 'Не соображу, что вы хотите узнать.';
        if ($text === 'что горит') {
            // result имеет вид {"tasks": [...]}, поля задач — в нижнем регистре (id, title, deadline)
            $result = $b24->core->call('tasks.task.list', [
                'filter' => ['RESPONSIBLE_ID' => $userId, '<DEADLINE' => date('c')],
                'select' => ['ID', 'TITLE', 'DEADLINE'],
            ])->getResponseData()->getResult();
            $tasks = $result['tasks'] ?? [];
            $message = $tasks
                ? "Просроченные задачи:\n" . implode("\n", array_map(static fn($t) => '• ' . $t['title'], $tasks))
                : 'Шикарно работаете! Ни одной просроченной задачи.';
        }
        $b24->core->call('imbot.message.add', [
            'DIALOG_ID' => $data['PARAMS']['DIALOG_ID'],
            'MESSAGE' => $message,
        ]);
    }
    // ONIMBOTDELETE — очистка конфигурации при необходимости
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from flask import Flask, request
    from datetime import datetime

    app = Flask(__name__)
    HANDLER_URL = "https://your-domain.example/handler"


    @app.post("/handler")
    def handler():
        event = request.form.get("event")
        auth = {k[5:-1]: v for k, v in request.form.items() if k.startswith("auth[")}
        data = request.form  # PARAMS приходят как data[PARAMS][...]
        client, token = make_client(auth)

        if event == "ONAPPINSTALL":
            # imbot.register типизирован в b24pysdk
            client.imbot.register(
                code="ReportBot",
                properties={"NAME": "Докладун", "COLOR": "AQUA", "WORK_POSITION": "Докладываю о делах"},
                event_message_add=HANDLER_URL,
                event_welcome_message=HANDLER_URL,
                event_bot_delete=HANDLER_URL,
                type="B",
            ).response
        elif event == "ONIMBOTJOINCHAT":
            client.imbot.message.add(
                "Привет! Я Докладун. Спросите [send=что горит]Что горит?[/send]",
                dialog_id=data.get("data[PARAMS][DIALOG_ID]"),
            ).response
        elif event == "ONIMBOTMESSAGEADD":
            text = (data.get("data[PARAMS][MESSAGE]") or "").lower()
            user_id = int(data.get("data[PARAMS][FROM_USER_ID]") or 0)
            message = "Не соображу, что вы хотите узнать."
            if text == "что горит":
                tasks = client.tasks.task.list(
                    filter={"RESPONSIBLE_ID": user_id, "<DEADLINE": datetime.now().isoformat()},
                    select=["ID", "TITLE", "DEADLINE"],
                ).response.result["tasks"]
                message = (
                    "Просроченные задачи:\n" + "\n".join(f"• {t['title']}" for t in tasks)
                    if tasks else "Шикарно работаете! Ни одной просроченной задачи."
                )
            client.imbot.message.add(
                message,
                dialog_id=data.get("data[PARAMS][DIALOG_ID]"),
            ).response
        # ONIMBOTDELETE — очистка конфигурации при необходимости
        return "ok"
    ```

{% endlist %}

После установки приложения в общем чате появится бот «Докладун». Откройте с ним диалог и отправьте «Что горит?», чтобы получить список просроченных задач.

## Запуск как локального приложения

1. Разместите обработчик на публичном HTTPS-URL
2. В разделе **Приложения → Разработчикам → Другое → Локальное приложение** создайте серверное приложение
3. Включите `Использует только API`, путь обработчика и путь установки укажите на один и тот же URL
4. Выдайте права: `im`, `imbot`, `task`, `task_extended`
5. Сохраните и переустановите приложение — придет событие `ONAPPINSTALL`, и бот зарегистрируется
