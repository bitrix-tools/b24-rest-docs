# Как создать коннектор открытых линий для чата на сайте

> Scope: [`imopenlines`, `imconnector`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь приложения

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коннектор передает сообщения посетителей сайта в Открытую линию Битрикс24, а ответы операторов — обратно на сайт. Посетитель пишет в чат на сайте, оператор отвечает из Битрикс24.

{% note warning "" %}

Коннектор работает только в контексте приложения (OAuth). Входящий вебхук не подойдет: методам `imconnector.*` нужна авторизация приложения.

SDK выполняют исходящие вызовы методов. Входящие события (`ONIMCONNECTORMESSAGEADD`) и настройку коннектора (placement `SETTING_CONNECTOR`) принимает ваш веб-сервер.

{% endnote %}

## Подготовка

Для сценария нужны:

- локальное приложение типа «Серверное» с правами `imopenlines`, `imconnector`, `im`
- публичный HTTPS-URL серверной части приложения
- URL обработчика установки `install_connector.*`
- URL обработчика события и настроек `handler.*`
- HTML-страница виджета чата `index.*`

В примерах замените:

- `example_site_chat` — на свой код коннектора
- `https://your-domain.example/handler` — на URL обработчика события и настроек
- `widgetUri` — на URL виджета чата
- `widgetName` — на название канала

Перед первым вызовом метода инициализируйте SDK по OAuth-токену приложения. В примерах `$b24` и `client` — уже инициализированные клиенты, которые выполняют вызовы от имени приложения.

## Инициализируйте SDK в контексте приложения

Битрикс24 передает авторизацию в запросах к обработчикам приложения. Используйте объект `auth`, чтобы создать клиент SDK перед вызовом методов `imconnector.*` и `event.bind`.

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const APP = { clientId: 'local.xxxxxxxx.xxxxxxxx', clientSecret: 'yyyyyyyy' }

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

    const $b24 = makeClient(req.body.auth)
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
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();
    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'local.xxxxxxxx.xxxxxxxx',
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'yyyyyyyy',
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'imopenlines,imconnector,im',
    ]);

    $authToken = AuthToken::initFromEventRequest($request);
    $domain = (string)$request->request->all('auth')['domain'];

    $log = new Logger('openlines');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from flask import request
    from b24pysdk import BitrixApp, BitrixToken, Client

    APP = BitrixApp(client_id="local.xxxxxxxx.xxxxxxxx", client_secret="yyyyyyyy")

    def make_client(auth: dict) -> tuple[Client, BitrixToken]:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token

    auth = request.json["auth"]  # словарь auth из тела запроса обработчика
    client, token = make_client(auth)
    ```

{% endlist %}

## Архитектура

Интеграция состоит из серверной части (приложение) и виджета чата на сайте:

| Файл | Назначение | Методы |
|---|---|---|
| `function.*` | Хелперы: идентификатор коннектора, хранение чатов и сообщений, номер линии | — |
| `install_connector.*` | Установка: регистрация коннектора и подписка на событие | `imconnector.register`, `event.bind` |
| `handler.*` | Настройка коннектора (placement) и прием сообщений из Битрикс24 | `imconnector.activate`, `imconnector.connector.data.set`, `imconnector.send.status.delivery` |
| `ajax.*` | Обмен данными между виджетом и Битрикс24 | `imconnector.send.messages` |
| `index.*` | Виджет чата на сайте (фронтенд) | — |

Идентификатор коннектора (`getConnectorID`), хранение истории чатов (`saveMessage`/`getChat`) и номера линии (`setLine`/`getLine`) — это платформозависимая логика хранения; в примерах ниже она вынесена в хелперы.

Минимальная логика хелперов:

| Хелпер | Что делает | Какие данные хранит |
|---|---|---|
| `getConnectorID` | Возвращает постоянный код коннектора | `example_site_chat` или другой код из параметра `ID` метода `imconnector.register` |
| `setLine` / `getLine` | Сохраняет и возвращает идентификатор открытой линии | `LINE` из `PLACEMENT_OPTIONS` |
| `saveMessage` | Сохраняет сообщение оператора во внешней истории чата | `message.id`, `chat.id`, `im.chat_id`, `im.message_id` |
| `getChat` | Возвращает историю сообщений для виджета | внешний идентификатор чата и список сообщений |

Сценарий состоит из пяти шагов.

1. Зарегистрируйте коннектор методом [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md)
2. Подпишите приложение на событие [OnImConnectorMessageAdd](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md) методом [event.bind](../../api-reference/events/event-bind.md)
3. Активируйте коннектор для открытой линии методами [imconnector.activate](../../api-reference/imopenlines/imconnector/imconnector-activate.md) и [imconnector.connector.data.set](../../api-reference/imopenlines/imconnector/imconnector-connector-data-set.md)
4. Передавайте сообщения посетителя методом [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md)
5. Принимайте ответы оператора в обработчике события и подтверждайте доставку методом [imconnector.send.status.delivery](../../api-reference/imopenlines/imconnector/imconnector-send-status-delivery.md)

## 1. Установка: регистрация коннектора

При установке приложения регистрируем коннектор методом [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md) и подписываемся на событие [OnImConnectorMessageAdd](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md) методом [event.bind](../../api-reference/events/event-bind.md).

В `imconnector.register` передаем: `ID` — идентификатор коннектора, `NAME` — название, `ICON`/`ICON_DISABLED` — иконки (DATA-представление SVG), `PLACEMENT_HANDLER` — URL обработчика настроек.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    const connectorId = 'example_site_chat'
    const handlerUrl = 'https://your-domain.example/handler'
    const icon = {
        DATA_IMAGE: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2070%2071%22%3E%3C/svg%3E',
        COLOR: '#a6ffa3', SIZE: '100%', POSITION: 'center',
    }

    const reg = await $b24.actions.v2.call.make({
        method: 'imconnector.register',
        params: { ID: connectorId, NAME: 'ExampleSiteChat', ICON: icon, ICON_DISABLED: { ...icon, COLOR: '#ffb3a3' }, PLACEMENT_HANDLER: handlerUrl },
        requestId: 'connector-register',
    })

    if (reg.getData().result) {
        await $b24.actions.v2.call.make({
            method: 'event.bind',
            params: { event: 'OnImConnectorMessageAdd', handler: handlerUrl },
            requestId: 'event-bind',
        })
    }
    ```

- PHP

    ```php
    <?php
    // $b24 построен на токене приложения
    $connectorId = 'example_site_chat';
    $handlerUrl = 'https://your-domain.example/handler';
    $icon = [
        'DATA_IMAGE' => 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2070%2071%22%3E%3C/svg%3E',
        'COLOR' => '#a6ffa3', 'SIZE' => '100%', 'POSITION' => 'center',
    ];

    $reg = $b24->getIMOpenLinesScope()->connector()->register([
        'ID' => $connectorId,
        'NAME' => 'ExampleSiteChat',
        'ICON' => $icon,
        'ICON_DISABLED' => array_merge($icon, ['COLOR' => '#ffb3a3']),
        'PLACEMENT_HANDLER' => $handlerUrl,
    ]);

    if ($reg->isSuccess()) {
        // event.bind не входит в типизированный коннектор-сервис — вызываем через ядро
        $b24->core->call('event.bind', [
            'event' => 'OnImConnectorMessageAdd',
            'handler' => $handlerUrl,
        ]);
    }
    ```

- Python

    ```python
    # client построен на токене приложения
    connector_id = "example_site_chat"
    handler_url = "https://your-domain.example/handler"
    icon = {
        "DATA_IMAGE": "data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2070%2071%22%3E%3C/svg%3E",
        "COLOR": "#a6ffa3", "SIZE": "100%", "POSITION": "center",
    }

    reg = client.imconnector.register(
        bitrix_id=connector_id,
        name="ExampleSiteChat",
        icon=icon,
        placement_handler=handler_url,
        icon_disabled={**icon, "COLOR": "#ffb3a3"},
    ).response

    if reg.result:
        client.event.bind(event="OnImConnectorMessageAdd", handler=handler_url).response
    ```

{% endlist %}

После успешной регистрации коннектора и подписки на событие методы вернут `true`.

```json
{
    "result": true
}
```

## 2. Обработчик: активация и прием сообщений

Битрикс24 открывает обработчик в настройках Открытой линии (placement `SETTING_CONNECTOR`) и отправляет туда событие `ONIMCONNECTORMESSAGEADD` при сообщении от оператора.

**Активация коннектора для линии** — методами [imconnector.activate](../../api-reference/imopenlines/imconnector/imconnector-activate.md) и [imconnector.connector.data.set](../../api-reference/imopenlines/imconnector/imconnector-connector-data-set.md). `LINE` и `ACTIVE_STATUS` приходят в `PLACEMENT_OPTIONS`.

В `DATA` метода `imconnector.connector.data.set` передайте настройки внешнего канала:

- `ID` — идентификатор чата или канала во внешней системе
- `URL_IM` — ссылка на чат для интерфейса оператора
- `NAME` — название канала

{% list tabs %}

- JS

    ```js
    // В обработчике placement SETTING_CONNECTOR
    const options = JSON.parse(req.body.PLACEMENT_OPTIONS)
    const line = Number(options.LINE)

    await $b24.actions.v2.call.make({
        method: 'imconnector.activate',
        params: { CONNECTOR: connectorId, LINE: line, ACTIVE: Number(options.ACTIVE_STATUS) },
        requestId: 'connector-activate',
    })

    await $b24.actions.v2.call.make({
        method: 'imconnector.connector.data.set',
        params: { CONNECTOR: connectorId, LINE: line, DATA: { ID: `${connectorId}_line_${line}`, URL_IM: widgetUri, NAME: widgetName } },
        requestId: 'connector-data-set',
    })
    ```

- PHP

    ```php
    $options = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
    $line = (string)(int)$options['LINE'];

    $b24->getIMOpenLinesScope()->connector()->activate($connectorId, $line, (int)$options['ACTIVE_STATUS']);

    $b24->getIMOpenLinesScope()->connector()->setData($connectorId, $line, [
        'ID' => $connectorId . '_line_' . $line,
        'URL_IM' => $widgetUri,
        'NAME' => $widgetName,
    ]);
    ```

- Python

    ```python
    import json
    options = json.loads(request.form["PLACEMENT_OPTIONS"])
    line = int(options["LINE"])

    client.imconnector.activate(connector=connector_id, line=line, active=int(options["ACTIVE_STATUS"])).response

    client.imconnector.connector.data.set(
        connector=connector_id,
        line=line,
        data={"ID": f"{connector_id}_line_{line}", "URL_IM": widget_uri, "NAME": widget_name},
    ).response
    ```

{% endlist %}

После активации коннектора и сохранения настроек канала методы вернут `true`.

```json
{
    "result": true
}
```

**Прием сообщения от оператора.** На событии `ONIMCONNECTORMESSAGEADD` сохраняем сообщение и подтверждаем доставку методом [imconnector.send.status.delivery](../../api-reference/imopenlines/imconnector/imconnector-send-status-delivery.md).

Для подтверждения доставки используйте объект `im` из события. В нем приходят внутренние идентификаторы `chat_id` и `message_id`. Внешний `message.id`, который вернул `saveMessage`, передайте отдельным массивом в `message.id`.

{% list tabs %}

- JS

    ```js
    if (req.body.event === 'ONIMCONNECTORMESSAGEADD' && req.body.data.CONNECTOR === connectorId) {
        for (const message of req.body.data.MESSAGES) {
            const messageId = saveMessage(message.chat.id, message) // локальное хранение
            await $b24.actions.v2.call.make({
                method: 'imconnector.send.status.delivery',
                params: {
                    CONNECTOR: connectorId,
                    LINE: getLine(),
                    MESSAGES: [{
                        im: { chat_id: message.im.chat_id, message_id: message.im.message_id },
                        message: { id: [messageId], date: Math.floor(Date.now() / 1000) },
                        chat: { id: message.chat.id },
                    }],
                },
                requestId: 'status-delivery',
            })
        }
    }
    ```

- PHP

    ```php
    if (($_REQUEST['event'] ?? '') === 'ONIMCONNECTORMESSAGEADD'
        && ($_REQUEST['data']['CONNECTOR'] ?? '') === $connectorId) {
        foreach ($_REQUEST['data']['MESSAGES'] as $message) {
            $messageId = saveMessage($message['chat']['id'], $message); // локальное хранение
            $b24->getIMOpenLinesScope()->connector()->sendStatusDelivery($connectorId, getLine(), [
                [
                    'im' => [
                        'chat_id' => $message['im']['chat_id'],
                        'message_id' => $message['im']['message_id'],
                    ],
                    'message' => ['id' => [$messageId], 'date' => time()],
                    'chat' => ['id' => $message['chat']['id']],
                ],
            ]);
        }
    }
    ```

- Python

    ```python
    import time

    if request.form.get("event") == "ONIMCONNECTORMESSAGEADD":
        for message in messages:  # data[MESSAGES] из тела события
            message_id = save_message(message["chat"]["id"], message)  # локальное хранение
            client.imconnector.send.status.delivery(
                connector=connector_id,
                line=get_line(),
                messages=[{
                    "im": {"chat_id": message["im"]["chat_id"], "message_id": message["im"]["message_id"]},
                    "message": {"id": [message_id], "date": int(time.time())},
                    "chat": {"id": message["chat"]["id"]},
                }],
            ).response
    ```

{% endlist %}

Успешное подтверждение доставки возвращает `SUCCESS: true`.

```json
{
    "result": {
        "SUCCESS": true,
        "DATA": []
    }
}
```

## 3. AJAX: отправка сообщений посетителя в Битрикс24

Виджет на сайте отправляет сообщения посетителя на `ajax.*`. Серверная часть передает их в Открытую линию методом [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md).

Структура сообщения `MESSAGES[]`: `user` (`id`, `name`), `message` (`id`, `date`, `text`), `chat` (`id`, `url`).

{% list tabs %}

- JS

    ```js
    const arMessage = {
        user: { id: chatId, name: visitorName },
        message: { id: messageId, date: Math.floor(Date.now() / 1000), text: visitorText },
        chat: { id: chatId, url: pageUrl },
    }

    await $b24.actions.v2.call.make({
        method: 'imconnector.send.messages',
        params: { CONNECTOR: connectorId, LINE: lineId, MESSAGES: [arMessage] },
        requestId: 'send-messages',
    })
    ```

- PHP

    ```php
    $arMessage = [
        'user' => ['id' => $chatID, 'name' => htmlspecialchars($_POST['name'])],
        'message' => ['id' => $messageId, 'date' => time(), 'text' => htmlspecialchars($_POST['message'])],
        'chat' => ['id' => $chatID, 'url' => htmlspecialchars($_SERVER['HTTP_REFERER'])],
    ];

    $b24->getIMOpenLinesScope()->connector()->sendMessages($connectorId, $lineId, [$arMessage]);
    ```

- Python

    ```python
    import time
    ar_message = {
        "user": {"id": chat_id, "name": visitor_name},
        "message": {"id": message_id, "date": int(time.time()), "text": visitor_text},
        "chat": {"id": chat_id, "url": page_url},
    }

    client.imconnector.send.messages(connector=connector_id, line=line_id, messages=[ar_message]).response
    ```

{% endlist %}

В ответе сохраните `session.CHAT_ID` и `session.ID`. Они подтверждают, что сообщение попало в открытую линию.

```json
{
    "result": {
        "SUCCESS": true,
        "DATA": {
            "RESULT": [
                {
                    "SUCCESS": true,
                    "session": {
                        "ID": "323",
                        "CHAT_ID": "1767"
                    }
                }
            ]
        }
    }
}
```

## 4. Виджет чата на сайте

`index.*` возвращает HTML-страницу с чатом: поле ввода, список сообщений и периодический опрос `ajax.*` для загрузки истории и ответов оператора. Это обычный фронтенд (HTML + JS + fetch к вашему `ajax.*`), без вызовов методов Битрикс24 напрямую — все обращения к Битрикс24 идут через серверную часть.

## 5. Запуск коннектора

1. Разместите серверные файлы на публичном HTTPS-URL
2. Создайте [локальное приложение](../../settings/app-installation/local-apps/index.md) типа «Серверное» с правами `imopenlines`, `imconnector`, `im`
3. Откройте `install_connector.*`, чтобы зарегистрировать коннектор и подписаться на событие
4. В **Контакт-центре** откройте коннектор `ExampleSiteChat`, выберите Открытую линию и активируйте — Битрикс24 вызовет `handler.*` с placement `SETTING_CONNECTOR`
5. Разместите виджет (`index.*`) на сайте и проверьте обмен сообщениями

## Проверим результат

Отправьте сообщение из виджета на сайте. В Битрикс24 должен открыться диалог в выбранной открытой линии. Ответ оператора должен появиться в истории чата на сайте.

Проверьте, что серверная часть сохраняет:

- `CONNECTOR` — код коннектора
- `LINE` — идентификатор открытой линии
- `session.CHAT_ID` из ответа `imconnector.send.messages`
- `im.chat_id` и `im.message_id` из события `ONIMCONNECTORMESSAGEADD`

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

- `WRONG_AUTH_TYPE` — метод вызван не в контексте приложения OAuth
- `ERROR_ARGUMENT` — не передан обязательный параметр `CONNECTOR`, `LINE`, `MESSAGES`, `DATA` или `ACTIVE`
- `ERROR_EVENT_NOT_FOUND` — в `event.bind` передан неверный код события
- `NOT_ACTIVE_LINE` — линия неактивна или не существует

Если не приходит событие `ONIMCONNECTORMESSAGEADD`, проверьте, что установка приложения завершена, обработчик `handler.*` доступен по HTTPS и событие зарегистрировано методом `event.bind`.

После исправления ошибки повторите сценарий с шага, на котором остановилось выполнение:

- ошибка регистрации коннектора или подписки на событие — повторите шаг 1
- ошибка активации или сохранения настроек канала — повторите шаг 2
- ошибка отправки сообщения посетителя — повторите шаг 3
- ошибка доставки ответа оператора во внешний чат — повторите обработку события `ONIMCONNECTORMESSAGEADD`

## Что важно учитывать

- Методы `imconnector.*` работают только в контексте приложения OAuth
- URL обработчика события и placement-обработчика должен быть доступен из интернета по HTTPS
- События начнут приходить только после завершения установки приложения
- Повторный запуск `install_connector.*` с тем же `ID` обновит существующий коннектор

## Продолжите изучение

- [{#T}](../../api-reference/imopenlines/imconnector/imconnector-register.md)
- [{#T}](../../api-reference/imopenlines/imconnector/imconnector-activate.md)
- [{#T}](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md)
- [{#T}](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md)
