# Чат-боты 2.0: обзор методов

Чат-боты 2.0 объединяют два набора API:
— методы `imbot.v2` отвечают за жизненный цикл бота, сообщения, команды, файлы и управление чатами. 
— методы `im.v2` позволяют приложению или пользователю подписываться на события мессенджера и получать их в режиме polling — когда приложение само периодически запрашивает у сервера накопленные события, без необходимости иметь публичный URL для входящих запросов.

> Быстрый переход: [быстрый старт](./quick-start.md) | [авторизация](#auth) | [типы ботов](#bot-types) | [события](#event-modes) | [лимиты](#limits) | [все методы](#all-methods)

## Какие задачи решает раздел

- зарегистрировать и настроить чат-бота
- получать события от бот-платформы или от мессенджера
- отправлять и изменять сообщения
- управлять групповыми чатами и участниками
- загружать и скачивать файлы
- регистрировать слэш-команды и отвечать на них

## Как начать работу {#how-to-start}

Типичный порядок работы с новым API:

1. Зарегистрируйте бота через [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md).
2. Настройте получение событий через [imbot.v2.Event.get](./imbot.v2/events/event-get.md) или [im.v2.Event.subscribe](./im.v2/events/event-subscribe.md).
3. Отправьте сообщение методом [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md).
4. Прочитайте исходное сообщение по `replyId` через [imbot.v2.Chat.Message.get](./imbot.v2/messages/chat-message-get.md) — только для ботов типа `supervisor` и `personal`.
5. Получите контекст диалога через [imbot.v2.Chat.Message.getContext](./imbot.v2/messages/chat-message-get-context.md) — только для ботов типа `supervisor` и `personal`.
6. Загружайте файлы через [imbot.v2.File.upload](./imbot.v2/files/file-upload.md) и скачивайте через [imbot.v2.File.download](./imbot.v2/files/file-download.md).

Подробный пошаговый сценарий с cURL-примерами: [Быстрый старт](./quick-start.md).

## Авторизация {#auth}

Чат-боты 2.0 поддерживают два способа авторизации.

### Webhook

URL содержит токен авторизации. Такой вариант подходит для локальных интеграций, AI-агентов и тестирования.

```text
POST https://{portal}/rest/{user_id}/{webhook_token}/{method_name}
Content-Type: application/json
```

При webhook-авторизации параметр `botToken` обязателен для методов `imbot.v2`. Это произвольная строка, которую вы задаете при регистрации бота и затем используете во всех вызовах от имени этого бота.

### OAuth

Токен передается параметром `auth`. Такой вариант подходит для приложений из Маркета и внутренних приложений.

```text
POST https://{portal}/rest/{method_name}?auth={access_token}
Content-Type: application/json
```

При OAuth-авторизации параметр `botToken` для `imbot.v2` не нужен, потому что бот привязан к приложению через `client_id`.

## Типы ботов {#bot-types}

Параметр `fields.type` при регистрации бота определяет его поведение в чатах.

#|
|| **Тип** | **Описание** | **Видимость событий в групповых чатах** ||
|| `bot` | Обычный бот. Реагирует на упоминание `@bot` в групповых чатах и на личные сообщения | Получает события только при упоминании `@bot` или в диалоге один на один ||
|| `supervisor` | Системный наблюдатель. Видит все сообщения в чатах, где состоит | Получает все события без упоминания ||
|| `personal` | Персональный ассистент. Видит все сообщения в чатах, где состоит | Получает все события без упоминания — аналогично `supervisor`. Поиск такого бота среди чатов ограничен для определенных групп пользователей ||
|| `openline` | Бот для Открытых линий | Поведение аналогично `bot` ||
|#

Тип по умолчанию `bot` подходит для большинства сценариев.

Тип `personal` рекомендуется для AI-ассистентов, которым нужен полный контекст группового диалог. Боты с этим типом в будущем будут скрыты из поиска для пользователей, у которых к нему нет доступа.

{% note warning "" %}

Боты типов `personal` и `supervisor` получают поток всех сообщений в чатах, где состоят. Фильтрацию нерелевантных сообщений бот выполняет самостоятельно.

{% endnote %}

## Формат ответа

Все методы возвращают JSON-ответ в единой обертке:

```json
{
    "result": {},
    "time": {
        "start": 1700000000,
        "finish": 1700000000.5,
        "duration": 0.5,
        "date_start": "2025-01-15T10:00:00+03:00",
        "date_finish": "2025-01-15T10:00:00+03:00"
    }
}
```

- `result` — данные ответа метода
- `time` — метаинформация о времени выполнения

При ошибке вместо `result` возвращается:

```json
{
    "error": "ERROR_CODE",
    "error_description": "Human-readable description"
}
```

Поле `error` стабильно и подходит для программной обработки (switch/case). Поле `error_description` предназначено для логирования — его текст может меняться.

### Пример обработки ошибок

```php
$result = CRest::call('imbot.v2.Chat.Message.send', [
    'botId'    => $botId,
    'botToken' => $botToken,
    'dialogId' => $dialogId,
    'fields'   => ['message' => 'Hello'],
]);

if (isset($result['error'])) {
    switch ($result['error']) {
        case 'BOT_NOT_FOUND':
            // Бот удалён — перерегистрировать
            break;
        case 'ACCESS_DENIED':
            // Бот не в чате — пропустить
            break;
        default:
            error_log('API error: ' . $result['error'] . ' — ' . ($result['error_description'] ?? ''));
    }
}
```

Коды ошибок каждого метода перечислены в разделе «Возможные коды ошибок» на странице метода.

## Boolean-параметры

Boolean-параметры принимают `true` / `false`. Если ваш клиент не поддерживает отправку JSON boolean, можно передать строки `"Y"` / `"N"` — API принимает оба варианта.

## Формат dialogId {#dialog-id}

Параметр `dialogId` — универсальный идентификатор диалога. Он используется в методах работы с чатами, сообщениями и файлами.

#|
|| **Тип чата** | **Формат** | **Пример** | **Описание** ||
|| Личный (P2P) | `"{userId}"` | `"5"` | Строка с ID пользователя. Диалог с ботом создается автоматически ||
|| Групповой | `"chat{chatId}"` | `"chat142"` | Строка с префиксом `chat` и ID чата ||
|#

В личных чатах `dialogId` всегда содержит ID **собеседника**. Если пользователь 1 пишет боту 5 — бот в событии получит `dialogId = "1"`, а пользователь — `dialogId = "5"`. Используйте `dialogId` из события для ответа — он уже указывает на нужный диалог.

`dialogId` используется в методах работы с чатами, сообщениями и файлами `Chat.Message.send`, `Chat.get`, `File.upload` и т.д. Другие методы используют собственные идентификаторы: `botId` (Bot.update, Event.get), `commandId` (Command.update), `fileId` (File.download). Методы `im.v2.Event.*` не используют `dialogId`.

## Режимы доставки событий {#event-modes}

При регистрации бота выбирается `eventMode`.

#|
|| **Режим** | **Описание** | **Когда использовать** ||
|| `fetch` | Бот самостоятельно получает события через [imbot.v2.Event.get](./imbot.v2/events/event-get.md) | Для AI-агентов, серверных ботов и интеграций без постоянного HTTP-сервера ||
|| `webhook` | Битрикс24 отправляет события на URL бота через HTTP POST | Для ботов с выделенным HTTP-сервером ||
|#

### Polling-цикл (fetch-режим) {#polling}

Типичный цикл опроса событий для бота с `eventMode: "fetch"`:

```php
$offset = 0;        // первый вызов без offset — получить все накопившиеся события
$pollInterval = 10; // интервал в секундах при отсутствии новых событий

while (true) {
    $result = CRest::call('imbot.v2.Event.get', [
        'botId'    => $botId,
        'botToken' => $botToken,
        'offset'   => $offset,
        'limit'    => 100,
    ]);

    if (!empty($result['error'])) {
        // exponential backoff при ошибках и HTTP 429
        error_log('Event.get error: ' . $result['error']);
        sleep(min($pollInterval * 2, 60));
        continue;
    }

    foreach ($result['result']['events'] ?? [] as $event) {
        processEvent($event['type'], $event['data']);
    }

    // Подтверждаем обработанные события — следующий вызов вернет только новые
    if (!empty($result['result']['nextOffset'])) {
        $offset = $result['result']['nextOffset'];
    }

    // Если есть еще события — опрашиваем сразу, иначе ждем
    sleep(!empty($result['result']['hasMore']) ? 2 : $pollInterval);
}
```

Рекомендуемый интервал: **5–30 секунд** при отсутствии новых событий. Если `hasMore = true` — следующий запрос с минимальной паузой в 2 секунды.

### Webhook-обработчик (webhook-режим) {#webhook}

Пример обработчика для приема событий при `eventMode: "webhook"`. URL обработчика передается в параметре `fields.webhookUrl` при регистрации бота.

```php
// webhook_handler.php
$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['event'])) {
    http_response_code(400);
    exit;
}

$eventType = $data['event'];
$eventData = $data['data'] ?? [];

// В webhook-режиме все скалярные значения приходят строками — приводите типы явно
switch ($eventType) {
    case 'ONIMBOTV2MESSAGEADD':
        $botId    = (int)($eventData['bot']['id'] ?? 0);
        $text     = $eventData['message']['text'] ?? '';
        $dialogId = $eventData['chat']['dialogId'] ?? '';
        CRest::call('imbot.v2.Chat.Message.send', [
            'botId'    => $botId,
            'dialogId' => $dialogId,
            'fields'   => ['message' => 'Получил: ' . $text],
        ]);
        break;

    case 'ONIMBOTV2COMMANDADD':
        $botId     = (int)($eventData['bot']['id'] ?? 0);
        $commandId = (int)($eventData['command']['id'] ?? 0);
        $messageId = (int)($eventData['message']['id'] ?? 0);
        CRest::call('imbot.v2.Command.answer', [
            'botId'     => $botId,
            'commandId' => $commandId,
            'messageId' => $messageId,
            'dialogId'  => $eventData['chat']['dialogId'] ?? '',
            'fields'    => ['message' => 'Команда выполнена'],
        ]);
        break;

    case 'ONIMBOTV2JOINCHAT':
        // Бота добавили в чат — отправьте приветствие
        break;

    case 'ONIMBOTV2DELETE':
        // Бота удалили — очистите ресурсы
        break;
}

http_response_code(200);
echo json_encode(['status' => 'ok']);
```

Платформа ожидает HTTP 200 от обработчика. При сбое доставки повторные попытки не гарантируются — для надежности используйте fetch-режим.

## Дополнительные возможности сообщений

При отправке сообщений через [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md) доступны:

- [Форматирование текста (BB-коды)](./imbot.v2/messages/message-formatting.md) — жирный, курсив, ссылки, цитаты, код и другие BB-коды
- [Вложения (Attach)](./imbot.v2/messages/attachments/index.md) — структурированные блоки: изображения, таблицы, сетки и другие элементы
- [Клавиатуры (Keyboard)](./imbot.v2/messages/message-keyboards.md) — интерактивные кнопки под сообщением

## Лимиты {#limits}

Общие лимиты REST API Битрикс24 распространяются и на методы бот-платформы. Подробнее: [Лимиты REST API](../../../limits.md).

#|
|| **Ограничение** | **Значение** ||
|| Rate limit | 2 запроса в секунду на приложение ||
|| При превышении rate limit | HTTP 429 — используйте экспоненциальный backoff ||
|| Количество ботов на приложение | 100 ||
|| Размер файла `File.upload` | 100 МБ ||
|| Длина сообщения | 20 000 символов ||
|| Событий за запрос `Event.get` | 1–1000 (по умолчанию 100) ||
|#

## Ревизии API и совместимость

Битрикс24 облако и коробочные версии могут иметь разные ревизии API. Чтобы узнать, какая ревизия установлена на конкретном портале, используйте [imbot.v2.Revision.get](./imbot.v2/revision-get.md).

Изменения в API, которые влияют на совместимость интеграций, собраны на странице [Изменения API](./breaking-changes.md).

## Обзор методов {#all-methods}

### Чат-боты `imbot.v2`

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота

**Боты**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md) | Регистрирует нового бота ||
|| [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md) | Обновляет свойства бота ||
|| [imbot.v2.Bot.get](./imbot.v2/bots/bot-get.md) | Возвращает информацию о боте ||
|| [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md) | Возвращает список ботов приложения ||
|| [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md) | Удаляет бота ||
|#

**Чаты**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.add](./imbot.v2/chats/chat-add.md) | Создает групповой чат ||
|| [imbot.v2.Chat.get](./imbot.v2/chats/chat-get.md) | Возвращает информацию о чате ||
|| [imbot.v2.Chat.update](./imbot.v2/chats/chat-update.md) | Обновляет свойства чата ||
|| [imbot.v2.Chat.User.add](./imbot.v2/chats/chat-user-add.md) | Добавляет участников в чат ||
|| [imbot.v2.Chat.User.delete](./imbot.v2/chats/chat-user-delete.md) | Удаляет участника из чата ||
|| [imbot.v2.Chat.User.list](./imbot.v2/chats/chat-user-list.md) | Возвращает список участников чата ||
|| [imbot.v2.Chat.leave](./imbot.v2/chats/chat-leave.md) | Выходит из чата ||
|| [imbot.v2.Chat.Manager.add](./imbot.v2/chats/chat-manager-add.md) | Добавляет менеджеров чата ||
|| [imbot.v2.Chat.Manager.delete](./imbot.v2/chats/chat-manager-delete.md) | Удаляет менеджеров чата ||
|| [imbot.v2.Chat.setOwner](./imbot.v2/chats/chat-set-owner.md) | Назначает нового владельца чата ||
|#

**Сообщения**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md) | Отправляет сообщение в чат ||
|| [imbot.v2.Chat.Message.update](./imbot.v2/messages/chat-message-update.md) | Обновляет сообщение бота ||
|| [imbot.v2.Chat.Message.delete](./imbot.v2/messages/chat-message-delete.md) | Удаляет сообщение ||
|| [imbot.v2.Chat.Message.read](./imbot.v2/messages/chat-message-read.md) | Отмечает сообщения как прочитанные ||
|| [imbot.v2.Chat.Message.get](./imbot.v2/messages/chat-message-get.md) | Возвращает сообщение по ID. Только для `supervisor` и `personal` ||
|| [imbot.v2.Chat.Message.getContext](./imbot.v2/messages/chat-message-get-context.md) | Возвращает окно сообщений вокруг указанного. Только для `supervisor` и `personal` ||
|| [imbot.v2.Chat.Message.Reaction.add](./imbot.v2/messages/chat-message-reaction-add.md) | Добавляет реакцию на сообщение ||
|| [imbot.v2.Chat.Message.Reaction.delete](./imbot.v2/messages/chat-message-reaction-delete.md) | Удаляет реакцию с сообщения ||
|#

**Команды**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Command.register](./imbot.v2/commands/command-register.md) | Регистрирует слэш-команду ||
|| [imbot.v2.Command.update](./imbot.v2/commands/command-update.md) | Обновляет команду ||
|| [imbot.v2.Command.list](./imbot.v2/commands/command-list.md) | Возвращает список команд бота ||
|| [imbot.v2.Command.unregister](./imbot.v2/commands/command-unregister.md) | Удаляет команду ||
|| [imbot.v2.Command.answer](./imbot.v2/commands/command-answer.md) | Отвечает на вызов команды ||
|#

**Интерфейс**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.InputAction.notify](./imbot.v2/ui/chat-input-action-notify.md) | Показывает индикатор действия бота ||
|| [imbot.v2.Chat.TextField.enabled](./imbot.v2/ui/chat-text-field-enabled.md) | Включает или отключает поле ввода текста ||
|#

**События**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Event.get](./imbot.v2/events/event-get.md) | Возвращает события бота в режиме polling ||
|#

Отдельный справочник форматов событий: [imbot.v2/events/events.md](./imbot.v2/events/events.md).

**Файлы**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.File.upload](./imbot.v2/files/file-upload.md) | Загружает файл в чат ||
|| [imbot.v2.File.download](./imbot.v2/files/file-download.md) | Возвращает ссылку для скачивания файла ||
|#

**Ревизии API**

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Revision.get](./imbot.v2/revision-get.md) | Возвращает номера ревизий API и клиентских протоколов ||
|#

### Работа с чатом  `im.v2`

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь или приложение с доступом к мессенджеру

**События**

#|
|| **Метод** | **Описание** ||
|| [im.v2.Event.subscribe](./im.v2/events/event-subscribe.md) | Подписывает на запись событий ||
|| [im.v2.Event.unsubscribe](./im.v2/events/event-unsubscribe.md) | Отписывает от записи событий ||
|| [im.v2.Event.get](./im.v2/events/event-get.md) | Возвращает события в режиме polling ||
|#

**Файлы**

#|
|| **Метод** | **Описание** ||
|| [im.v2.File.upload](./im.v2/files/file-upload.md) | Загружает файл в чат ||
|| [im.v2.File.download](./im.v2/files/file-download.md) | Возвращает ссылку для скачивания файла ||
|#

## Продолжите изучение

- [{#T}](./quick-start.md)
- [{#T}](./entities.md)
- [{#T}](./migration.md)
- [{#T}](./imbot.v2/events/events.md)
- [{#T}](./im.v2/index.md)



