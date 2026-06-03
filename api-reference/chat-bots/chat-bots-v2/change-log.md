# Журнал изменений API imbot.v2

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

История изменений API `imbot.v2`: новые возможности, исправления и изменения с потерей обратной совместимости. Записи расположены от новых к старым.

## Префиксы записей

- **BOT-NEW**: новая функциональность
- **BOT-FIX**: исправление бага или некорректного поведения
- **BOT-BC**: изменение с потерей обратной совместимости. Старый формат поддерживается **6 месяцев** с момента публикации изменения, затем может быть прекращен без уведомления

Формат кода: `BOT-{TYPE}-{MMDD}-{N}`, где `MMDD` это дата публикации, а `N` это сквозной номер в рамках даты.

## REST-ревизия 36 {#rest-revision-36}

> Дата публикации: 06.05.2026

### BOT-BC-0506-1: Bot.register, предстоящий лимит длины botToken {#bot-bc-0506-1}

> Применение лимита: с 06.08.2026 (через три месяца)

**Сейчас (временно)**

[imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md) принимает `botToken` любой длины — для совместимости с интеграциями, ранее зарегистрировавшими ботов с длинными токенами, например 64-символьные SHA-256-hex.

**С 06.08.2026**

[imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md) начнет отклонять `botToken` длиннее **40 символов** ошибкой `BOT_TOKEN_INVALID_LENGTH`. Тот же лимит уже действует для ротации токена через [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md) (`fields.botToken`) — см. [#BOT-NEW-0501-2](#bot-new-0501-2).

**Что делать интеграторам**

Если у вас есть боты, зарегистрированные с `botToken` длиннее 40 символов, в течение трех месяцев замените токен на токен не длиннее 40 символов через `Bot.update {fields: {botToken: '...'}}`. Авторизация запроса остается старым (длинным) токеном, новый передается в `fields`. После 06.08.2026 повторная регистрация бота с длинным токеном, например при потере состояния и `register-on-startup`, будет отклоняться. Уже зарегистрированные боты при этом продолжат работать без изменений.

**Затронутый метод:** [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md)

## REST-ревизия 35 {#rest-revision-35}

> Дата публикации: 01.05.2026

### BOT-FIX-0501-1: Bot.update / Bot.unregister, автоочистка подписок на события ONIMBOTV2* {#bot-fix-0501-1}

**Было**

При смене `webhookUrl` через [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md), переключении `eventMode` с `webhook` на `fetch` или удалении бота через [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md) старые подписки на события `ONIMBOTV2*` оставались в реестре и продолжали посылать события на ранее настроенный URL. После нескольких смен URL события приходили на все прежние адреса одновременно. Удаленные webhook-боты также продолжали получать события до ручной очистки через `event.unbind`.

**Стало**

[imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md) и [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md) автоматически приводят подписки бота к актуальному состоянию:

- при смене `webhookUrl` — старые подписки удаляются, новые создаются
- при переходе `eventMode: webhook → fetch` — все подписки бота удаляются
- при `Bot.unregister` — все подписки бота удаляются для любого режима

Очистка выполняется по `APPLICATION_TOKEN` бота. Для OAuth-приложений с несколькими ботами очистка пропускается, если у бота есть активные соседи по тому же `APPLICATION_TOKEN`.

**Влияние на интеграторов**

Если в коде есть обходное решение с ручным `event.unbind` после `Bot.update {eventMode: 'fetch'}` или `Bot.unregister` — его можно удалить: после исправления оно ничего не делает.

**Затронутые методы:** [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md), [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md)

### BOT-NEW-0501-2: Bot.update, ротация botToken {#bot-new-0501-2}

В [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md) добавлена возможность смены `botToken` через `fields.botToken`. Авторизация запроса выполняется старым токеном, новый передается в `fields`.

После успешной ротации все подписки `ONIMBOTV2*` пере-биндятся под новый `APPLICATION_TOKEN` (если бот в режиме `webhook`), старый токен сразу теряет доступ. Все выполняется в одной транзакции.

При коллизии токенов возвращается код `BOT_TOKEN_ROTATION_FAILED`. **Длина `botToken` — не более 40 символов.**

**Затронутый метод:** [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md)

### BOT-FIX-0501-3: Удаление поля bot.appId из ответов методов и событий {#bot-fix-0501-3}

**Было**

Поле `bot.appId` присутствовало в ответах методов и в данных событий `ONIMBOTV2*`.

**Стало**

Поле `bot.appId` удалено из ответов всех методов и из всех событий `ONIMBOTV2*`.

**Влияние на интеграторов**

Если ваш код читал `result.bot.appId` или `data.bot.appId` — поле теперь отсутствует. Для проверки принадлежности бота используйте `result.bot.code` или сам факт успешного ответа метода (он доступен только владельцу).

**Затронутые методы и события:** [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md), [imbot.v2.Bot.get](./imbot.v2/bots/bot-get.md), [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md), [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md), все события `ONIMBOTV2*`

## REST-ревизия 34 {#rest-revision-34}

> Дата публикации: 08.04.2026

### BOT-NEW-0408-1: Документация, общие коды ошибок BotController

Во все методы `imbot.v2` добавлено описание базовых кодов ошибок, которые могут возникнуть на уровне `BotController`:

- `BOT_TOKEN_NOT_SPECIFIED`: не передан `botToken` при webhook-авторизации
- `BOT_ID_REQUIRED`: не передан `botId`
- `BOT_NOT_FOUND`: бот не найден
- `BOT_OWNERSHIP_ERROR`: бот не принадлежит приложению

### BOT-NEW-0408-2: Документация, дополнительные материалы

В [Быстрый старт](./quick-start.md) добавлены ссылки на документацию по расширенным возможностям сообщений: форматирование текста, вложения `Attach`, клавиатуры `Keyboard`.

### BOT-FIX-0408-3: Command.list, исправлено отображение локализаций

**Было**

[imbot.v2.Command.list](./imbot.v2/commands/command-list.md) возвращал пустые `title` и `params` для команд, зарегистрированных через REST, включая [imbot.v2.Command.register](./imbot.v2/commands/command-register.md) и [imbot.v2.Command.update](./imbot.v2/commands/command-update.md). Локализации сохранялись в базу корректно, но не считывались из-за ошибки в маппинге идентификаторов.

**Стало**

`title` и `params` корректно возвращаются на языке интерфейса с возвратом к языку по умолчанию.

**Затронутый метод:** [imbot.v2.Command.list](./imbot.v2/commands/command-list.md)

### BOT-FIX-0408-4: Bot.register / Bot.update, нормализация backgroundId

**Было**

`backgroundId` не проходил валидацию через enum допустимых значений. Невалидные значения, например опечатки в регистре или несуществующие ID, сохранялись в базу как есть.

**Стало**

`backgroundId` нормализуется через `Background::normalizeBackgroundId()`. Невалидные значения приводятся к `null`. Допустимые значения: `azure`, `mint`, `steel`, `slate`, `teal`, `cornflower`, `sky`, `peach`, `frost`.

**Затронутые методы:** [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md), [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md)

### BOT-FIX-0408-5: Chat.TextField.enabled, поддержка P2P-чатов

**Было**

[imbot.v2.Chat.TextField.enabled](./imbot.v2/ui/chat-text-field-enabled.md) возвращал `ACCESS_DENIED` в приватных P2P-чатах с ботом, хотя это основной сценарий использования метода.

**Стало**

Метод проверяет членство бота в чате вместо разрешения на редактирование. Работает в любых чатах, где бот является участником.

**Затронутый метод:** [imbot.v2.Chat.TextField.enabled](./imbot.v2/ui/chat-text-field-enabled.md)

### BOT-FIX-0408-6: Код ошибки BOT_TOKEN_NOT_SPECIFIED

**Было**

При вызове методов через webhook без `botToken` возвращалась ошибка `CLIENT_ID_NOT_SPECIFIED`.

**Стало**

Возвращается `BOT_TOKEN_NOT_SPECIFIED`, что соответствует реальной причине ошибки.

**Затронутые методы:** [imbot.v2.Bot.register](./imbot.v2/bots/bot-register.md), [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md), [imbot.v2.Bot.get](./imbot.v2/bots/bot-get.md), [imbot.v2.Bot.update](./imbot.v2/bots/bot-update.md), [imbot.v2.Bot.unregister](./imbot.v2/bots/bot-unregister.md)

## REST-ревизия 33 {#rest-revision-33}

> Дата публикации: 02.04.2026

### BOT-NEW-0402-1: Новый метод Revision.get {#revision-get-new-method}

Добавлен метод [imbot.v2.Revision.get](./imbot.v2/revision-get.md) для получения номеров ревизий API. Он позволяет определить совместимость Битрикс24 с конкретными методами и полями и не требует `botId` и `botToken`.

### BOT-FIX-0402-2: Chat.Message.send, нормализация boolean-полей

**Было**

При передаче `fields.system`, `fields.urlPreview`, `fields.skipConnector`, `fields.silentConnector` как JSON boolean, то есть `true` или `false`, значения не конвертировались в `Y` или `N` и могли игнорироваться.

**Стало**

Все четыре boolean-поля корректно нормализуются. Допустимы значения `true`, `false`, `"Y"`, `"N"`.

**Затронутый метод:** [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md)

---

## BOT-BC-0330-1: Command.register, параметры перенесены в fields {#command-register-fields}

> Дата публикации: 30.03.2026 | Поддержка старого формата до: 30.09.2026

**Было (legacy)**

Параметры передавались на верхнем уровне запроса:

```json
{
  "botId": 456,
  "botToken": "...",
  "command": "help",
  "title": {"en": "Help"},
  "hidden": false
}
```

**Стало**

Параметры команды группируются в объекте `fields`, как и в других методах `imbot.v2`.

```json
{
  "botId": 456,
  "botToken": "...",
  "fields": {
    "command": "help",
    "title": {"en": "Help"},
    "hidden": false
  }
}
```

**Совместимость**

Если передан `fields`, используется новый формат. Если `fields` отсутствует, используется legacy-формат. Старый плоский формат поддерживается до 30.09.2026.

**Затронутый метод:** [imbot.v2.Command.register](./imbot.v2/commands/command-register.md)

---

## BOT-BC-0325-1: Event.get, пагинация через nextOffset {#event-get-next-offset}

> Дата публикации: 25.03.2026 | Поддержка старого формата до: 25.09.2026

**Было**

Ответ содержал поле `lastEventId`, и клиент должен был самостоятельно вычислять следующий `offset` как `lastEventId + 1`.

**Стало**

Ответ содержит поле `nextOffset`. Для получения следующей порции передайте это значение в параметре `offset`.

```json
{
  "result": {
    "events": [],
    "nextOffset": 1002,
    "hasMore": false
  }
}
```

Следующий запрос:

```json
{
  "botId": 456,
  "botToken": "...",
  "offset": 1002
}
```

Если `hasMore: false`, новых событий нет, но `nextOffset` все равно нужно сохранить для следующего цикла polling.

**Затронутый метод:** [imbot.v2.Event.get](./imbot.v2/events/event-get.md)

---

## Смотри также

- [Быстрый старт](./quick-start.md): начало работы с бот-платформой
- [Миграция с imbot на imbot.v2](./migration.md): переход с legacy API
