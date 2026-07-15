# Как создать коннектор открытых линий для чата на сайте

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коннектор передает сообщения посетителей сайта в Открытую линию Битрикс24, а ответы операторов — обратно на сайт. Посетитель пишет в чат на сайте, оператор отвечает из Битрикс24.

{% note warning "" %}

Коннектор работает **только в контексте приложения** (OAuth). Входящий вебхук не подойдет: методам `imconnector.*` нужна авторизация приложения. SDK выполняют исходящие вызовы REST; входящие события (`ONIMCONNECTORMESSAGEADD`) и настройку коннектора (placement `SETTING_CONNECTOR`) принимает ваш веб-сервер. Инициализацию SDK по токену приложения смотрите в [примере чат-бота](../chat-bots/index.md#инициализация-sdk-по-данным-события).

{% endnote %}

## Архитектура

Интеграция состоит из серверной части (приложение) и виджета чата на сайте:

| Файл | Назначение | Методы REST |
|---|---|---|
| `function.*` | Хелперы: идентификатор коннектора, хранение чатов и сообщений, номер линии | — |
| `install_connector.*` | Установка: регистрация коннектора и подписка на событие | `imconnector.register`, `event.bind` |
| `handler.*` | Настройка коннектора (placement) и приём сообщений из Битрикс24 | `imconnector.activate`, `imconnector.connector.data.set`, `imconnector.send.status.delivery` |
| `ajax.*` | Обмен данными между виджетом и Битрикс24 | `imconnector.send.messages` |
| `index.*` | Виджет чата на сайте (фронтенд) | — |

Идентификатор коннектора (`getConnectorID`), хранение истории чатов (`saveMessage`/`getChat`) и номера линии (`setLine`/`getLine`) — это платформозависимая логика хранения; в примерах ниже она вынесена в хелперы.

## 1. Установка: регистрация коннектора

При установке приложения регистрируем коннектор методом [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md) и подписываемся на событие [OnImConnectorMessageAdd](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md) методом [event.bind](../../api-reference/events/event-bind.md).

В `imconnector.register` передаем: `ID` — идентификатор коннектора, `NAME` — название, `ICON`/`ICON_DISABLED` — иконки (DATA-представление SVG), `PLACEMENT_HANDLER` — URL обработчика настроек.

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
    // $b24 построен на токене приложения (см. пример чат-бота)
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
    # client построен на токене приложения (см. пример чат-бота)
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

## 2. Обработчик: активация и приём сообщений

Битрикс24 открывает обработчик в настройках Открытой линии (placement `SETTING_CONNECTOR`) и шлет туда событие `ONIMCONNECTORMESSAGEADD` при сообщении от оператора.

**Активация коннектора для линии** — методами [imconnector.activate](../../api-reference/imopenlines/imconnector/imconnector-activate.md) и [imconnector.connector.data.set](../../api-reference/imopenlines/imconnector/imconnector-connector-data-set.md). `LINE` и `ACTIVE_STATUS` приходят в `PLACEMENT_OPTIONS`.

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
        params: { CONNECTOR: connectorId, LINE: line, DATA: { id: `${connectorId}line${line}`, url_im: widgetUri, name: widgetName } },
        requestId: 'connector-data-set',
    })
    ```

- PHP

    ```php
    $options = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
    $line = (string)(int)$options['LINE'];

    $b24->getIMOpenLinesScope()->connector()->activate($connectorId, $line, (int)$options['ACTIVE_STATUS']);

    $b24->getIMOpenLinesScope()->connector()->setData($connectorId, $line, [
        'id' => $connectorId . 'line' . $line,
        'url_im' => $widgetUri,
        'name' => $widgetName,
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
        data={"id": f"{connector_id}line{line}", "url_im": widget_uri, "name": widget_name},
    ).response
    ```

{% endlist %}

**Приём сообщения от оператора.** На событии `ONIMCONNECTORMESSAGEADD` сохраняем сообщение и подтверждаем доставку методом [imconnector.send.status.delivery](../../api-reference/imopenlines/imconnector/imconnector-send-status-delivery.md).

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
                    MESSAGES: [{ im: message.im, message: { id: [messageId] }, chat: { id: message.chat.id } }],
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
                ['im' => $message['im'], 'message' => ['id' => [$messageId]], 'chat' => ['id' => $message['chat']['id']]],
            ]);
        }
    }
    ```

- Python

    ```python
    if request.form.get("event") == "ONIMCONNECTORMESSAGEADD":
        for message in messages:  # data[MESSAGES] из тела события
            message_id = save_message(message["chat"]["id"], message)  # локальное хранение
            client.imconnector.send.status.delivery(
                connector=connector_id,
                line=get_line(),
                messages=[{"im": message["im"], "message": {"id": [message_id]}, "chat": {"id": message["chat"]["id"]}}],
            ).response
    ```

{% endlist %}

## 3. AJAX: отправка сообщений посетителя в Битрикс24

Виджет на сайте шлет сообщения посетителя на `ajax.*`, откуда они уходят в Открытую линию методом [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md).

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

## 4. Виджет чата на сайте

`index.*` отдает HTML-страницу с чатом: поле ввода, список сообщений и периодический опрос `ajax.*` для загрузки истории и ответов оператора. Это обычный фронтенд (HTML + JS + fetch к вашему `ajax.*`), без вызовов REST Битрикс24 напрямую — все обращения к Битрикс24 идут через серверную часть.

## 5. Запуск коннектора

1. Разместите серверные файлы на публичном HTTPS-URL
2. Создайте [локальное приложение](../../settings/app-installation/local-apps/index.md) типа «Серверное» с правами `imopenlines`, `imconnector`, `im`
3. Откройте `install_connector.*`, чтобы зарегистрировать коннектор и подписаться на событие
4. В **Контакт-центре** откройте коннектор `ExampleSiteChat`, выберите Открытую линию и активируйте — Битрикс24 вызовет `handler.*` с placement `SETTING_CONNECTOR`
5. Разместите виджет (`index.*`) на сайте и проверьте обмен сообщениями
