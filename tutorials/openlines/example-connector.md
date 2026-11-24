# Как создать коннектор открытых линий для чата на сайте

> Scope: [`imopenlines`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнить сценарий: администратор Битрикс24 — пример проверяет права при открытии приложения

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коннектор передает сообщения посетителей сайта в Открытую линию Битрикс24, а ответы операторов — обратно на сайт. Пример передает только текст сообщений: файлы и вложения требуют отдельной обработки на сервере и в виджете. Текст ответа оператора приходит с BB-кодами, например `[b]...[/b]` и `[br]`, учебный виджет выводит их как есть.

{% note warning "" %}

Коннектор работает только в контексте приложения (OAuth). Входящий вебхук не подойдет: методам `imconnector.*` нужна авторизация приложения.

SDK выполняют исходящие вызовы методов. Входящие события (`ONIMCONNECTORMESSAGEADD`) и настройку коннектора (placement `SETTING_CONNECTOR`) принимает ваш веб-сервер.

{% endnote %}

## Подготовка

Для сценария нужны:

- локальное приложение типа «Серверное» с правом `imopenlines`
- активная Открытая линия, к которой подключите канал
- публичный HTTPS-URL серверной части приложения
- URL страницы регистрации `install_connector.*`
- URL обработчика события и настроек `handler.*`
- HTML-страница виджета чата `index.*`

В примерах замените:

- `example_site_chat` — на свой код коннектора
- `https://your-domain.example/handler` — на URL обработчика события и настроек: маршрут `/handler` для JS и Python или адрес файла `handler.php` для PHP. Этот же адрес укажите в настройках приложения
- `WIDGET_URI` — на HTTPS-адрес виджета чата, `WIDGET_NAME` — на название канала, `CHAT_STORE` — на абсолютный путь к JSON-файлу хранилища вне публичного каталога. Задайте их переменными окружения на сервере

Используйте код коннектора строчными буквами: при регистрации Битрикс24 приводит `ID` к нижнему регистру. Получите идентификатор и секрет приложения в его настройках и задайте на сервере переменные окружения `B24_CLIENT_ID` и `B24_CLIENT_SECRET`. В `B24_DOMAIN` задайте известный адрес вашего Битрикс24 без схемы и пути, например `example.bitrix24.ru`. Секрет и токены остаются на сервере, не попадают в репозиторий и код виджета.

В настройках приложения укажите `handler.*` в поле *Путь для первоначальной установки*, а `install_connector.*` — в поле *Путь вашего обработчика*: для JS и Python это маршруты `/handler` и `/install_connector`, для PHP — адреса файлов `handler.php` и `install_connector.php`. Оставьте выключенной опцию *Приложение само завершает установку*: при сохранении приложения Битрикс24 отправит `ONAPPINSTALL` на `handler.*`.

1. Зарегистрируем коннектор методом [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md) и подпишемся на ответы оператора через [event.bind](../../api-reference/events/event-bind.md) — шаг 1
2. Подключим линию через [imconnector.activate](../../api-reference/imopenlines/imconnector/imconnector-activate.md) и зададим данные канала через [imconnector.connector.data.set](../../api-reference/imopenlines/imconnector/imconnector-connector-data-set.md) — шаг 2
3. Передадим сообщение посетителя через [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md) — шаг 3
4. Примем ответ оператора из события [OnImConnectorMessageAdd](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md) и подтвердим доставку через [imconnector.send.status.delivery](../../api-reference/imopenlines/imconnector/imconnector-send-status-delivery.md) — функция обработки события в шаге 2
5. Покажем историю и форму отправки в виджете — шаг 4

## Архитектура и хранилище

| Файл | Назначение |
|---|---|
| `function.*` | Хранилище и инициализация SDK из блоков ниже |
| `install_connector.*` | Регистрация и подписка, шаг 1 |
| `handler.*` | Установка, placement и событие оператора, шаг 2 |
| `ajax.*` | Отправка и история, шаг 3 |
| `index.*` | Виджет, шаг 4 |

Выберите один язык. В PHP сохраните в `function.php` блоки хранилища и инициализации SDK, а также функции `handlePlacement` и `handleEvent` из шага 2; остальные файлы подключают его через `require_once`. Для JS соберите серверные фрагменты по порядку в `app.mjs`, для Python — в `app.py`; имена файлов в таблице обозначают их роли.

В примере один Битрикс24 и одна линия на коннектор. Для нескольких линий храните соответствие «чат → линия». JSON-файл разместите вне публичного каталога с правами только для пользователя приложения; для продакшена используйте базу данных с транзакциями. Файловый пример рассчитан на один процесс без параллельных записей. `saveAuth` сохраняет авторизацию по `member_id`; выбранная линия определяет, чьи токены загрузить для AJAX.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    import fs from 'node:fs'
    import { randomUUID } from 'node:crypto'
    const file = process.env.CHAT_STORE // абсолютный путь вне публичного каталога
    const read = () => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { auth: {}, chats: {} }
    const write = data => fs.writeFileSync(file, JSON.stringify(data), { mode: 0o600 })
    const getConnectorID = () => 'example_site_chat'
    function setLine(line, member) {
        const s = read();
        s.line = line;
        s.member = member;
        write(s)
    }
    const getLine = () => read().line
    function saveAuth(auth) {
        const s = read();
        s.auth[auth.member_id] = { ...s.auth[auth.member_id], ...auth };
        write(s)
    }
    const loadAuth = (member = read().member) => read().auth[member]
    function saveMessage(chat, message) {
        const s = read(), id = String(message.message.id ?? (message.im ? `operator-${message.im.message_id}` : randomUUID()))
        const rows = s.chats[chat] ??= []
        if (!rows.some(row => row.id === id)) rows.push({ id, name: message.user?.name ?? 'Оператор', text: message.message.text })
        write(s); return id
    }
    const getChat = chat => read().chats[chat] ?? []
    ```

- Python

    ```python
    import json, os, uuid
    from pathlib import Path
    FILE = Path(os.environ["CHAT_STORE"])  # вне публичного каталога
    def read():
        return json.loads(FILE.read_text()) if FILE.exists() else {"auth": {}, "chats": {}}
    def write(data):
        with os.fdopen(os.open(FILE, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600), "w") as out:
            json.dump(data, out)
    def get_connector_id(): return "example_site_chat"
    def set_line(line, member):
        s = read()
        s.update(line=line, member=member)
        write(s)
    def get_line(): return read()["line"]
    def save_auth(auth):
        s = read(); key = auth["member_id"]
        s["auth"][key] = {**s["auth"].get(key, {}), **auth}; write(s)
    def load_auth(member=None): return read()["auth"].get(member or read().get("member"))
    def save_message(chat, message):
        s = read(); mid = str(message["message"].get("id") or (f"operator-{message['im']['message_id']}" if "im" in message else uuid.uuid4()))
        rows = s["chats"].setdefault(str(chat), [])
        if not any(row["id"] == mid for row in rows):
            rows.append({"id": mid, "name": message.get("user", {}).get("name", "Оператор"), "text": message["message"]["text"]})
        write(s); return mid
    def get_chat(chat): return read()["chats"].get(str(chat), [])
    ```

- PHP

    ```php
    <?php
    function readStore() { return is_file(getenv('CHAT_STORE')) ? json_decode(file_get_contents(getenv('CHAT_STORE')), true) : ['auth' => [], 'chats' => []]; }
    function writeStore($s) {
        $mask = umask(0077);
        file_put_contents(getenv('CHAT_STORE'), json_encode($s), LOCK_EX);
        umask($mask);
    }
    function getConnectorID() { return 'example_site_chat'; }
    function setLine($line, $member) {
        $s = readStore();
        $s['line'] = $line;
        $s['member'] = $member;
        writeStore($s);
    }
    function getLine() { return readStore()['line']; }
    function saveAuth($auth) {
        $s = readStore();
        $key = $auth['member_id'];
        $s['auth'][$key] = array_merge($s['auth'][$key] ?? [], $auth);
        writeStore($s);
    }
    function loadAuth($member = null) { $s = readStore(); return $s['auth'][$member ?? $s['member'] ?? ''] ?? null; }
    function saveMessage($chat, $message) {
        $s = readStore(); $id = (string)($message['message']['id'] ?? (isset($message['im']) ? 'operator-' . $message['im']['message_id'] : bin2hex(random_bytes(16))));
        $rows = $s['chats'][$chat] ?? [];
        if (!in_array($id, array_column($rows, 'id'), true)) {
            $rows[] = ['id' => $id, 'name' => $message['user']['name'] ?? 'Оператор', 'text' => $message['message']['text']];
        }
        $s['chats'][$chat] = $rows;
        writeStore($s);
        return $id;
    }
    function getChat($chat) { return readStore()['chats'][$chat] ?? []; }
    ```

{% endlist %}

## Инициализируйте SDK

События приходят POST-запросом `application/x-www-form-urlencoded` с ключами `auth[access_token]`, `data[MESSAGES][0][im][chat_id]`. Express разбирает их во вложенный объект, PHP — в `$_POST`; во Flask нужен `unflatten`, который превращает числовые ключи сообщений в словарь.

Для [placement и страницы установки](../../api-reference/widgets/index.md) авторизация приходит отдельными полями `AUTH_ID`, `REFRESH_ID`, `member_id` и параметром `DOMAIN` в query string, поэтому для них используется отдельный конструктор. AJAX виджета не несет авторизацию Битрикс24: клиент создается из сохраненных токенов. Обновленные SDK токены также сохраняются.

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk@3.0.0
    import express from 'express'
    import { fileURLToPath } from 'node:url'
    import { B24OAuth } from '@bitrix24/b24jssdk'
    const app = express()
    app.use(express.urlencoded({ extended: true }))
    const visitorChat = req => req.headers.cookie?.match(/(?:^|;\s*)chat_id=([^;]+)(?:;|$)/)?.[1]
    app.get('/', (req, res) => {
        if (!visitorChat(req)) res.cookie('chat_id', randomUUID(), { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
        res.sendFile(fileURLToPath(new URL('./index.html', import.meta.url)))
    })
    const widgetUri = process.env.WIDGET_URI, widgetName = process.env.WIDGET_NAME
    const APP = { clientId: process.env.B24_CLIENT_ID, clientSecret: process.env.B24_CLIENT_SECRET }
    function fromEvent(auth) {
        if (auth.domain !== process.env.B24_DOMAIN) throw new Error('Unknown domain')
        const params = {
            domain: auth.domain, accessToken: auth.access_token, refreshToken: auth.refresh_token,
            memberId: auth.member_id, applicationToken: auth.application_token, userId: Number(auth.user_id ?? 0),
            expires: Number(auth.expires ?? Date.now() / 1000 + Number(auth.expires_in)), expiresIn: Number(auth.expires_in),
            scope: auth.scope, status: auth.status, clientEndpoint: `https://${process.env.B24_DOMAIN}/rest/`, serverEndpoint: 'https://oauth.bitrix24.tech/rest/',
        }
        const b24 = new B24OAuth(params, APP)
        b24.offClientSideWarning()
        b24.setCallbackRefreshAuth(async ({ b24OAuthParams: p }) => {
            saveAuth({ ...auth, access_token: p.accessToken, refresh_token: p.refreshToken, expires: p.expires, expires_in: p.expiresIn })
        })
        return b24
    }
    function placementAuth(req) {
        const p = req.body
        return { domain: req.query.DOMAIN, access_token: p.AUTH_ID, refresh_token: p.REFRESH_ID,
            expires: Math.floor(Date.now() / 1000) + Number(p.AUTH_EXPIRES), expires_in: Number(p.AUTH_EXPIRES), member_id: p.member_id, application_token: p.APPLICATION_TOKEN,
            scope: p.APPLICATION_SCOPE, status: p.status, server_endpoint: p.SERVER_ENDPOINT,
            client_endpoint: `https://${req.query.DOMAIN}/rest/` }
    }
    const fromPlacement = req => fromEvent(placementAuth(req))
    const fromStore = () => fromEvent(loadAuth())
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import re, time
    from flask import Flask, request, jsonify, abort, g, send_from_directory
    from b24pysdk import BitrixApp, BitrixToken, Client
    app = Flask(__name__)
    @app.get("/")
    def widget():
        response = send_from_directory(app.root_path, "index.html")
        if not request.cookies.get("chat_id"):
            response.set_cookie("chat_id", str(uuid.uuid4()), httponly=True, secure=True, samesite="Lax", path="/")
        return response
    widget_uri = os.environ["WIDGET_URI"]; widget_name = os.environ["WIDGET_NAME"]
    APP = BitrixApp(client_id=os.environ["B24_CLIENT_ID"], client_secret=os.environ["B24_CLIENT_SECRET"])
    def unflatten(form):
        result = {}
        for key, value in form.items():
            path = re.findall(r"[^\[\]]+", key); node = result
            for part in path[:-1]: node = node.setdefault(part, {})
            node[path[-1]] = value
        return result
    def from_event(auth):
        if auth["domain"] != os.environ["B24_DOMAIN"]: abort(403)
        token = BitrixToken(domain=auth["domain"], auth_token=auth["access_token"],
                            refresh_token=auth["refresh_token"], bitrix_app=APP)
        g.credentials = (auth, token)
        return Client(token), token
    def placement_auth():
        p = request.form
        return dict(domain=request.args["DOMAIN"], access_token=p["AUTH_ID"], refresh_token=p["REFRESH_ID"],
                    expires_in=int(p["AUTH_EXPIRES"]), member_id=p["member_id"], application_token=p["APPLICATION_TOKEN"])
    def from_placement(): return from_event(placement_auth())
    def from_store(): return from_event(load_auth())
    @app.after_request
    def persist_tokens(response):
        if hasattr(g, "credentials"):
            auth, token = g.credentials; saved = load_auth(auth.get("member_id", ""))
            if saved and saved.get("application_token") == auth.get("application_token"):
                save_auth({**auth, "access_token": token.auth_token, "refresh_token": token.refresh_token})
        return response
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';
    use Bitrix24\SDK\Core\Credentials\{ApplicationProfile, AuthToken, DefaultOAuthServerUrl};
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Events\AuthTokenRenewedEvent;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    function fromEvent($auth) {
        if ($auth['domain'] !== getenv('B24_DOMAIN')) { http_response_code(403); exit; }
        $profile = ApplicationProfile::initFromArray([
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
            'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'imopenlines',
        ]);
        $token = new AuthToken($auth['access_token'], $auth['refresh_token'], (int)($auth['expires'] ?? time() + (int)$auth['expires_in']));
        $dispatcher = new EventDispatcher();
        $dispatcher->addListener(AuthTokenRenewedEvent::class, function ($event) use ($auth) {
            $t = $event->getRenewedToken()->authToken;
            saveAuth(array_merge($auth, ['access_token' => $t->accessToken, 'refresh_token' => $t->refreshToken, 'expires' => $t->expires]));
        });
        return (new ServiceBuilderFactory($dispatcher, new Logger('chat')))
            ->init($profile, $token, $auth['domain'], DefaultOAuthServerUrl::default());
    }
    function placementAuth() {
        return ['domain' => $_GET['DOMAIN'], 'access_token' => $_POST['AUTH_ID'], 'refresh_token' => $_POST['REFRESH_ID'],
            'expires' => time() + (int)$_POST['AUTH_EXPIRES'], 'expires_in' => (int)$_POST['AUTH_EXPIRES'], 'member_id' => $_POST['member_id'], 'application_token' => $_POST['APPLICATION_TOKEN']];
    }
    function fromPlacement() { return fromEvent(placementAuth()); }
    function fromStore() { return fromEvent(loadAuth()); }
    ```

{% endlist %}

## 1. Установка: регистрация коннектора

При открытии приложения регистрируем коннектор методом [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md) и подписываемся на событие [OnImConnectorMessageAdd](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md) методом [event.bind](../../api-reference/events/event-bind.md).

Страница установки получает placement-запрос. Вызов [app.info](../../api-reference/common/system/app-info.md) проверяет OAuth до сохранения учетных данных: `CODE` должен совпасть с `B24_CLIENT_ID`. Вызов [user.admin](../../api-reference/common/users/user-admin.md) пропускает дальше только администратора Битрикс24. Конструкторы допускают только заранее заданный `B24_DOMAIN`. Перед подпиской [event.get](../../api-reference/events/event-get.md) проверяет, есть ли уже обработчик: повторное открытие приложения не создает подписку заново. `event.get` возвращает имя события в верхнем регистре, поэтому обработчик ищется по `ONIMCONNECTORMESSAGEADD`. Значок коннектора — `ICON.DATA_IMAGE`, замените его на изображение своего канала.

В `imconnector.register` передаем: `ID` — идентификатор коннектора, `NAME` — название, `ICON`/`ICON_DISABLED` — иконки (DATA-представление SVG), `PLACEMENT_HANDLER` — URL обработчика настроек.

{% list tabs %}

- JS

    ```js
    app.post('/install_connector', async (req, res) => {
        const $b24 = fromPlacement(req)
        const info = await $b24.actions.v2.call.make({ method: 'app.info', requestId: 'verify-install' })
        if (info.getData()?.result?.CODE !== APP.clientId) return res.sendStatus(403)
        const admin = await $b24.actions.v2.call.make({ method: 'user.admin', requestId: 'check-admin' })
        if (admin.getData()?.result !== true) return res.sendStatus(403)
        saveAuth(placementAuth(req)) // токены только что выданы, SDK не обновлял их во время проверок
        const connectorId = getConnectorID()
        const handlerUrl = 'https://your-domain.example/handler'
        const icon = {
            DATA_IMAGE: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2070%2070%22%3E%3Ccircle%20cx%3D%2235%22%20cy%3D%2235%22%20r%3D%2228%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E',
            COLOR: '#a6ffa3', SIZE: '100%', POSITION: 'center',
        }
        const reg = await $b24.actions.v2.call.make({
            method: 'imconnector.register',
            params: { ID: connectorId, NAME: 'ExampleSiteChat', ICON: icon, ICON_DISABLED: { ...icon, COLOR: '#ffb3a3' }, PLACEMENT_HANDLER: handlerUrl },
            requestId: 'connector-register',
        })
        if (reg.getData().result.result !== true) return res.sendStatus(502)
        const handlers = await $b24.actions.v2.call.make({ method: 'event.get', requestId: 'event-get' })
        const bound = handlers.getData().result.some(h => h.event === 'ONIMCONNECTORMESSAGEADD' && h.handler === handlerUrl)
        if (!bound) {
            const binding = await $b24.actions.v2.call.make({
                method: 'event.bind',
                params: { event: 'OnImConnectorMessageAdd', handler: handlerUrl },
                requestId: 'event-bind',
            })
            if (binding.getData()?.result !== true) return res.sendStatus(502)
        }
        res.send('Коннектор зарегистрирован')
    })
    ```

- Python

    ```python
    @app.post("/install_connector")
    def install_connector():
        client, token = from_placement()
        if token.call_method("app.info", {}).get("result", {}).get("CODE") != os.environ["B24_CLIENT_ID"]: abort(403)
        if token.call_method("user.admin", {}).get("result") is not True: abort(403)
        save_auth(placement_auth())  # токены только что выданы, SDK не обновлял их во время проверок
        connector_id = get_connector_id()
        handler_url = "https://your-domain.example/handler"
        icon = {
            "DATA_IMAGE": "data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2070%2070%22%3E%3Ccircle%20cx%3D%2235%22%20cy%3D%2235%22%20r%3D%2228%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E",
            "COLOR": "#a6ffa3", "SIZE": "100%", "POSITION": "center",
        }
        reg = client.imconnector.register(
            bitrix_id=connector_id,
            name="ExampleSiteChat",
            icon=icon,
            placement_handler=handler_url,
            icon_disabled={**icon, "COLOR": "#ffb3a3"},
        ).response
        if reg.result["result"] is not True: abort(502)
        handlers = token.call_method("event.get", {}).get("result", [])
        if not any(h["event"] == "ONIMCONNECTORMESSAGEADD" and h["handler"] == handler_url for h in handlers):
            binding = client.event.bind(event="OnImConnectorMessageAdd", handler=handler_url).response
            if binding.result is not True: abort(502)
        return "Коннектор зарегистрирован", 200
    ```


- PHP

    ```php
    <?php
    require_once 'function.php';
    $b24 = fromPlacement();
    $info = $b24->core->call('app.info', [])->getResponseData()->getResult();
    if (($info['CODE'] ?? '') !== getenv('B24_CLIENT_ID')) { http_response_code(403); exit; }
    // скалярный результат SDK возвращает элементом [0]
    $isAdmin = $b24->core->call('user.admin', [])->getResponseData()->getResult()[0] ?? false;
    if ($isAdmin !== true) { http_response_code(403); exit; }
    saveAuth(placementAuth()); // токены только что выданы, SDK не обновлял их во время проверок
    $connectorId = getConnectorID();
    $handlerUrl = 'https://your-domain.example/handler';
    $icon = [
        'DATA_IMAGE' => 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2070%2070%22%3E%3Ccircle%20cx%3D%2235%22%20cy%3D%2235%22%20r%3D%2228%22%20fill%3D%22%23ffffff%22/%3E%3C/svg%3E',
        'COLOR' => '#a6ffa3', 'SIZE' => '100%', 'POSITION' => 'center',
    ];
    $reg = $b24->getIMOpenLinesScope()->connector()->register([
        'ID' => $connectorId,
        'NAME' => 'ExampleSiteChat',
        'ICON' => $icon,
        'ICON_DISABLED' => array_merge($icon, ['COLOR' => '#ffb3a3']),
        'PLACEMENT_HANDLER' => $handlerUrl,
    ]);
    // RegisterResult::isSuccess() проверяет внутренний result регистрации
    if (!$reg->isSuccess()) { http_response_code(502); exit; }
    $handlers = $b24->core->call('event.get', [])->getResponseData()->getResult();
    $bound = false;
    foreach ($handlers as $h) {
        $bound = $bound || ($h['event'] === 'ONIMCONNECTORMESSAGEADD' && $h['handler'] === $handlerUrl);
    }
    if (!$bound) {
        // event.bind не входит в типизированный коннектор-сервис — вызываем через ядро
        $binding = $b24->core->call('event.bind', ['event' => 'OnImConnectorMessageAdd', 'handler' => $handlerUrl]);
        if (($binding->getResponseData()->getResult()[0] ?? false) !== true) { http_response_code(502); exit; }
    }
    echo 'Коннектор зарегистрирован';
    ```

{% endlist %}

Сокращенный ответ регистрации — `result.result: true`. Внешний `result` — обертка REST, внутренний — результат регистрации:

```json
{ "result": { "result": true } }
```

Подписка `event.bind` возвращает отдельно `{"result": true}`. При отрицательном внутреннем `result` регистрации верните HTTP 502 и не вызывайте `event.bind`.

## 2. Обработчик: установка, активация и ответы оператора

Маршрут `POST /handler` для JS и Python, файл `handler.php` для PHP сначала различает `event` и `PLACEMENT`. Событие `ONAPPINSTALL` приходит первым — при сохранении приложения, до открытия страницы установки из шага 1. На `ONAPPINSTALL` создайте клиент из `auth` через конструктор события, вызовите `app.info` для проверки OAuth, затем сохраните `auth` через `saveAuth` / `save_auth` и верните HTTP 200. Сохраненный `auth.application_token` служит для [проверки последующих событий](../../api-reference/events/safe-event-handlers.md). Не перезаписывайте его данными непроверенного события.

{% list tabs %}

- JS

    ```js
    app.post('/handler', async (req, res) => {
        try {
            if (req.body.event === 'ONAPPINSTALL') {
                const auth = req.body.auth, b24 = fromEvent(auth)
                const info = await b24.actions.v2.call.make({ method: 'app.info', requestId: 'verify-event' })
                if (info.getData()?.result?.CODE !== APP.clientId) return res.sendStatus(403)
                saveAuth(auth); return res.sendStatus(200)
            }
            if (req.body.PLACEMENT === 'SETTING_CONNECTOR') return await handlePlacement(req, res)
            return await handleEvent(req, res)
        } catch { return res.sendStatus(502) }
    })
    ```

- Python

    ```python
    @app.post("/handler")
    def handler():
        if request.form.get("event") == "ONAPPINSTALL":
            auth = unflatten(request.form)["auth"]; client, token = from_event(auth)
            if token.call_method("app.info", {}).get("result", {}).get("CODE") != os.environ["B24_CLIENT_ID"]: abort(403)
            save_auth(auth)
            return "", 200
        if request.form.get("PLACEMENT") == "SETTING_CONNECTOR": return handle_placement()
        return handle_event()
    ```

- PHP

    ```php
    <?php
    require_once 'function.php';
    if (($_POST['event'] ?? '') === 'ONAPPINSTALL') {
        $auth = $_POST['auth']; $b24 = fromEvent($auth);
        $info = $b24->core->call('app.info', [])->getResponseData()->getResult();
        if (($info['CODE'] ?? '') !== getenv('B24_CLIENT_ID')) { http_response_code(403); exit; }
        saveAuth($auth);
    } elseif (($_POST['PLACEMENT'] ?? '') === 'SETTING_CONNECTOR') {
        handlePlacement();
    } else { handleEvent(); }
    ```

{% endlist %}

**Активация.** Битрикс24 открывает placement `SETTING_CONNECTOR` после нажатия **Подключить**. `ACTIVE_STATUS` в `PLACEMENT_OPTIONS` показывает текущее состояние; для подключения передайте явное `ACTIVE: 1`, для отключения — `0`. Затем `imconnector.connector.data.set` задает внешний `ID` канала, ссылку `URL_IM` и название `NAME`. Авторизацию из placement сохраните до вызовов, чтобы токены, обновленные SDK, не затерлись старыми. После успеха обоих вызовов сохраните `LINE` и `member_id`.

Функция настройки:

{% list tabs %}

- JS

    ```js
    async function handlePlacement(req, res) {
        const auth = placementAuth(req), saved = loadAuth(auth.member_id)
        if (!saved?.application_token || saved.application_token !== auth.application_token) return res.sendStatus(403)
        saveAuth(auth) // до вызовов: обновленные SDK токены перезапишут эту запись
        const $b24 = fromPlacement(req), connectorId = getConnectorID()
        const line = Number(JSON.parse(req.body.PLACEMENT_OPTIONS).LINE)
        const active = await $b24.actions.v2.call.make({
            method: 'imconnector.activate', params: { CONNECTOR: connectorId, LINE: line, ACTIVE: 1 }, requestId: 'activate',
        })
        if (!active.getData().result) throw new Error('Activation failed')
        const channel = await $b24.actions.v2.call.make({ method: 'imconnector.connector.data.set', requestId: 'data',
            params: { CONNECTOR: connectorId, LINE: line, DATA: { ID: `${connectorId}_${line}`, URL_IM: widgetUri, NAME: widgetName } } })
        if (!channel.getData().result) throw new Error('Channel data not saved')
        setLine(line, auth.member_id)
        res.send('Канал подключен')
    }
    ```

- Python

    ```python
    def handle_placement():
        auth = placement_auth(); saved = load_auth(auth["member_id"])
        if not saved or not saved.get("application_token") or saved["application_token"] != auth["application_token"]: abort(403)
        save_auth(auth)  # до вызовов: обновленные SDK токены перезапишут эту запись
        client, token = from_placement(); connector_id = get_connector_id()
        line = int(json.loads(request.form["PLACEMENT_OPTIONS"])["LINE"])
        active = client.imconnector.activate(connector=connector_id, line=line, active=1).response
        if not active.result: abort(502)
        channel = client.imconnector.connector.data.set(connector=connector_id, line=line,
            data={"ID": f"{connector_id}_{line}", "URL_IM": widget_uri, "NAME": widget_name}).response
        if not channel.result: abort(502)
        set_line(line, auth["member_id"])
        return "Канал подключен", 200
    ```

- PHP

    ```php
    function handlePlacement() {
        $widgetUri = getenv('WIDGET_URI'); $widgetName = getenv('WIDGET_NAME');
        $auth = placementAuth(); $saved = loadAuth($auth['member_id']);
        if (empty($saved['application_token']) || $saved['application_token'] !== $auth['application_token']) { http_response_code(403); exit; }
        saveAuth($auth); // до вызовов: обновленные SDK токены перезапишут эту запись
        $b24 = fromPlacement(); $connectorId = getConnectorID();
        $line = (string)(int)json_decode($_POST['PLACEMENT_OPTIONS'], true)['LINE'];
        $active = $b24->getIMOpenLinesScope()->connector()->activate($connectorId, $line, 1);
        if (!$active->isSuccess()) { http_response_code(502); exit; }
        $channel = $b24->getIMOpenLinesScope()->connector()->setData($connectorId, $line, [
            'ID' => $connectorId . '_' . $line, 'URL_IM' => $widgetUri, 'NAME' => $widgetName,
        ]);
        if (!$channel->isSuccess()) { http_response_code(502); exit; }
        setLine($line, $auth['member_id']);
        echo 'Канал подключен';
    }
    ```

{% endlist %}

Успешные `imconnector.activate` и `imconnector.connector.data.set` возвращают `{"result": true}`.

**Ответ оператора.** До изменения истории проверьте токен и код коннектора. Из `data.MESSAGES` возьмите внешний `chat.id`, исходный текст и внутренний объект `im`. Вернувшийся из `saveMessage` внешний идентификатор передайте массивом в `message.id` подтверждения доставки.

{% list tabs %}

- JS

    ```js
    async function handleEvent(req, res) {
        const { event, auth = {}, data = {} } = req.body
        const saved = loadAuth(auth.member_id ?? '')
        if (!saved?.application_token || saved.application_token !== auth.application_token) return res.sendStatus(403)
        if (event !== 'ONIMCONNECTORMESSAGEADD' || data.CONNECTOR !== getConnectorID()) return res.sendStatus(200)
        const $b24 = fromEvent(saved)
        for (const message of Object.values(data.MESSAGES ?? {})) {
            const id = saveMessage(message.chat.id, message)
            const delivery = await $b24.actions.v2.call.make({ method: 'imconnector.send.status.delivery', requestId: `delivery-${id}`,
                params: { CONNECTOR: getConnectorID(), LINE: getLine(), MESSAGES: [{
                    im: message.im, chat: message.chat, message: { id: [id], date: Math.floor(Date.now() / 1000) },
                }] } })
            if (!delivery.getData().result?.SUCCESS) return res.sendStatus(502)
        }
        res.sendStatus(200)
    }
    ```

- Python

    ```python
    def handle_event():
        payload = unflatten(request.form)
        auth = payload.get("auth", {}); data = payload.get("data", {})
        saved = load_auth(auth.get("member_id", ""))
        if not saved or not saved.get("application_token") or saved["application_token"] != auth.get("application_token"): abort(403)
        if payload.get("event") == "ONIMCONNECTORMESSAGEADD" and data.get("CONNECTOR") == get_connector_id():
            client, token = from_event(saved)
            messages = data.get("MESSAGES", {}).values()
            for message in messages:
                mid = save_message(message["chat"]["id"], message)
                delivery = client.imconnector.send.status.delivery(connector=get_connector_id(), line=get_line(), messages=[{
                    "im": message["im"], "chat": message["chat"], "message": {"id": [mid], "date": int(time.time())},
                }]).response
                if not delivery.result["SUCCESS"]: abort(502)
        return "", 200
    ```

- PHP

    ```php
    function handleEvent() {
        $auth = $_POST['auth'] ?? []; $data = $_POST['data'] ?? [];
        $saved = loadAuth($auth['member_id'] ?? '');
        if (empty($saved['application_token']) || $saved['application_token'] !== ($auth['application_token'] ?? '')) { http_response_code(403); exit; }
        if (($_POST['event'] ?? '') === 'ONIMCONNECTORMESSAGEADD' && ($data['CONNECTOR'] ?? '') === getConnectorID()) {
            $b24 = fromEvent($saved);
            foreach ($data['MESSAGES'] as $message) {
                $id = saveMessage($message['chat']['id'], $message);
                $delivery = $b24->getIMOpenLinesScope()->connector()->sendStatusDelivery(getConnectorID(), (string)getLine(), [[
                    'im' => $message['im'], 'chat' => $message['chat'], 'message' => ['id' => [$id], 'date' => time()],
                ]]);
                if (!$delivery->isSuccess()) { http_response_code(502); exit; }
            }
        }
        http_response_code(200);
    }
    ```

{% endlist %}

Успешное подтверждение доставки:

```json
{ "result": { "SUCCESS": true, "DATA": [] } }
```

## 3. AJAX: отправка и история

Разместите AJAX и виджет на одном источнике. GET `?action=history` возвращает историю, POST принимает `name` и `message`. Сервер берет внешний `chat.id` только из cookie `chat_id`, установленной при открытии виджета; без нее возвращает HTTP 403. Историю получает любой запрос с этим значением cookie, поэтому в рабочем сервисе свяжите cookie с сессией посетителя и ограничьте частоту запросов на веб-сервере. В REST передавайте исходный текст; при выводе используйте `textContent`.

Сначала сформируйте сообщение с внешними идентификаторами `user.id`, `chat.id`, `message.id`, отправьте `imconnector.send.messages`, проверьте успех и сохраните его для виджета. Ошибки SDK обрабатывайте как HTTP 502 без выдачи токенов клиенту.

{% list tabs %}

- JS

    ```js
    app.all('/ajax', async (req, res) => {
        const chat = visitorChat(req)
        if (!chat) return res.sendStatus(403)
        if (req.method === 'GET' && req.query.action === 'history') return res.json(getChat(chat))
        if (req.method !== 'POST') return res.sendStatus(405)
        const text = String(req.body.message ?? '').trim()
        if (!text) return res.sendStatus(400)
        try {
            const message = { user: { id: chat, name: String(req.body.name || 'Посетитель') },
                chat: { id: chat }, message: { id: randomUUID(), date: Math.floor(Date.now() / 1000), text } }
            const result = await fromStore().actions.v2.call.make({ method: 'imconnector.send.messages', requestId: message.message.id,
                params: { CONNECTOR: getConnectorID(), LINE: getLine(), MESSAGES: [message] } })
            const sent = result.getData().result
            if (!sent.SUCCESS || !sent.DATA.RESULT[0].SUCCESS) return res.sendStatus(502)
            saveMessage(chat, message)
            res.json(getChat(chat))
        } catch { res.sendStatus(502) }
    })
    app.listen(process.env.PORT || 3000)
    ```

- Python

    ```python
    @app.route("/ajax", methods=["GET", "POST"])
    def ajax():
        chat = request.cookies.get("chat_id", "")
        if not chat: abort(403)
        if request.method == "GET" and request.args.get("action") == "history": return jsonify(get_chat(chat))
        if request.method != "POST": abort(405)
        text = request.form.get("message", "").strip()
        if not text: abort(400)
        message = {"user": {"id": chat, "name": request.form.get("name") or "Посетитель"},
                   "chat": {"id": chat}, "message": {"id": str(uuid.uuid4()), "date": int(time.time()), "text": text}}
        try:
            client, token = from_store()
            sent = client.imconnector.send.messages(connector=get_connector_id(), line=get_line(), messages=[message]).response.result
            if not sent["SUCCESS"] or not sent["DATA"]["RESULT"][0]["SUCCESS"]: abort(502)
            save_message(chat, message)
        except Exception:
            abort(502)
        return jsonify(get_chat(chat))
    ```

- PHP

    ```php
    <?php
    require_once 'function.php';
    header('Content-Type: application/json; charset=utf-8');
    $chat = (string)($_COOKIE['chat_id'] ?? '');
    if ($chat === '') { http_response_code(403); exit; }
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($_GET['action'] ?? '') === 'history') { echo json_encode(getChat($chat)); exit; }
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
    $text = trim((string)($_POST['message'] ?? ''));
    if ($text === '') { http_response_code(400); exit; }
    try {
        $message = ['user' => ['id' => $chat, 'name' => ($_POST['name'] ?? '') ?: 'Посетитель'],
            'chat' => ['id' => $chat], 'message' => ['id' => bin2hex(random_bytes(16)), 'date' => time(), 'text' => $text]];
        $sent = fromStore()->getIMOpenLinesScope()->connector()->sendMessages(getConnectorID(), (string)getLine(), [$message]);
        if (!$sent->isSuccess() || !$sent->getData()['RESULT'][0]['SUCCESS']) { http_response_code(502); exit; }
        saveMessage($chat, $message);
        echo json_encode(getChat($chat));
    } catch (Throwable $error) { http_response_code(502); }
    ```

{% endlist %}

Сокращенный успешный REST-ответ отправки содержит внутренние идентификаторы сессии и чата Битрикс24. Они помогают диагностике и не заменяют внешний `chat.id`:

```json
{ "result": { "SUCCESS": true, "DATA": { "RESULT": [
    { "SUCCESS": true, "session": { "ID": "323", "CHAT_ID": "1767" } }
] } } }
```

## 4. Виджет чата на сайте

Сохраните HTML ниже в `index.html` рядом с серверным файлом. JS и Python отдают его маршрутом `GET /` из раздела инициализации. Для PHP замените в HTML `/ajax` на `/ajax.php` и создайте рядом `index.php`:

```php
<?php
if (empty($_COOKIE['chat_id'])) {
    setcookie('chat_id', bin2hex(random_bytes(16)), ['path' => '/', 'httponly' => true, 'secure' => true, 'samesite' => 'Lax']);
}
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/index.html');
```

`WIDGET_URI` — HTTPS-адрес маршрута `GET /` или `index.php`. При первом открытии сервер записывает случайный идентификатор в cookie `chat_id` с флагами `HttpOnly`, `Secure`, `SameSite=Lax`.

```html
<!doctype html>
<html lang="ru">
<meta charset="utf-8">
<title>Чат с оператором</title>
<body>
<ul id="history"></ul>
<form id="chat">
  <input name="name" placeholder="Имя" required>
  <input name="message" placeholder="Сообщение" required>
  <button>Отправить</button>
</form>
<p id="error" role="status"></p>
<script>
const endpoint = '/ajax', form = document.querySelector('#chat')
async function exchange(options) {
  const url = `${endpoint}?action=history`
  try {
    const response = await fetch(options ? endpoint : url, options)
    if (!response.ok) throw new Error('Не удалось обновить чат')
    const rows = await response.json()
    document.querySelector('#history').replaceChildren(...rows.map(row => {
      const li = document.createElement('li');
      li.textContent = `${row.name}: ${row.text}`;
      return li
    }))
    document.querySelector('#error').textContent = ''
  } catch (error) { document.querySelector('#error').textContent = error.message }
}
form.addEventListener('submit', async event => {
  event.preventDefault()
  const body = new URLSearchParams(new FormData(form))
  await exchange({ method: 'POST', body })
})
exchange(); setInterval(exchange, 3000)
</script>
</body>
</html>
```

## 5. Запуск коннектора

1. Задайте серверные переменные `B24_CLIENT_ID`, `B24_CLIENT_SECRET`, `B24_DOMAIN`, `CHAT_STORE`, `WIDGET_URI`, `WIDGET_NAME`
2. Разместите серверные файлы и `index.html` на публичном HTTPS-URL: запустите JS командой `node app.mjs`, Python — `flask --app app run` за HTTPS reverse proxy; для PHP настройте веб-сервер с PHP
3. Сохраните приложение в Битрикс24 и дождитесь `ONAPPINSTALL`: `handler.*` сохранит токен проверки событий. Откройте приложение — страница `install_connector.*` зарегистрирует коннектор и подписку
4. В **Контакт-центре** откройте `ExampleSiteChat`, выберите Открытую линию и нажмите **Подключить** — Битрикс24 вызовет `handler.*` с placement `SETTING_CONNECTOR`
5. Откройте `WIDGET_URI` и проверьте обмен

## Проверим результат

Отправьте сообщение из виджета. В выбранной открытой линии должен появиться диалог. Ответ оператора должен появиться на сайте после очередного опроса. В JSON-хранилище проверьте сохраненную линию и обе записи истории по одному внешнему `chat.id`. Для диагностики временно записывайте в журнал сервера `SUCCESS` и `session.CHAT_ID` из ответа отправки, `im.chat_id` и `im.message_id` из события. Токены в журнал не пишите.

## Ошибки и диагностика

- Виджет не открывается — проверьте маршрут `GET /` или `index.php`, `WIDGET_URI` и HTTPS
- `WRONG_AUTH_TYPE` — вызов выполнен без контекста приложения OAuth
- `ERROR_ARGUMENT` — проверьте обязательные `CONNECTOR`, `LINE`, `MESSAGES`, `DATA`, `ACTIVE` по странице вызванного метода
- `ERROR_EVENT_NOT_FOUND` — исправьте имя события в `event.bind`
- `ERROR_CORE` с текстом `Handler already binded` — подписка на этот адрес уже есть, проверьте ее методом [event.get](../../api-reference/events/event-get.md)
- HTTP 403 на странице установки — приложение открыл не администратор Битрикс24 или `app.info` вернул чужой `CODE`
- `NOT_ACTIVE_LINE` — проверьте существование и активность выбранной линии
- Настройка открылась, но канал не подключился — проверьте `LINE` и явное `ACTIVE: 1`, повторите активацию на шаге 2
- HTTP 403 обработчика — сравните `member_id` и сохраненный `application_token`; проверьте получение `ONAPPINSTALL`, не отключайте проверку токена
- Пустые `auth` или `MESSAGES` — проверьте Content-Type, `express.urlencoded({ extended: true })` или `unflatten(request.form)`; для placement используйте отдельный конструктор
- Ответ оператора не появился — проверьте завершение установки, подписку `event.bind`, HTTPS-доступность обработчика, совпадение `data.CONNECTOR` и внешнего `chat.id`

После исправления повторите соответствующий шаг: регистрацию и подписку — шаг 1, активацию — шаг 2, отправку — шаг 3. Повторная отправка посетителя создает новое сообщение; хранение идентификаторов для повторов и транзакции добавьте при адаптации для продакшена.

## Продолжите изучение

- [{#T}](../../api-reference/imopenlines/imconnector/imconnector-register.md)
- [{#T}](../../api-reference/imopenlines/imconnector/imconnector-activate.md)
- [{#T}](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md)
- [{#T}](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md)
