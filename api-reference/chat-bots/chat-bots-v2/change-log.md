# Журнал изменений API imbot.v2

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

История изменений API `imbot.v2`: новые возможности, исправления и изменения с потерей обратной совместимости. Записи расположены от новых к старым.

## Префиксы записей

- **BOT-NEW**: новая функциональность
- **BOT-FIX**: исправление бага или некорректного поведения
- **BOT-BC**: изменение с потерей обратной совместимости. Старый формат поддерживается **6 месяцев** с момента публикации изменения, затем может быть прекращен без уведомления

Формат кода: `BOT-{TYPE}-{MMDD}-{N}`, где `MMDD` это дата публикации, а `N` это сквозной номер в рамках даты.

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

`title` и `params` корректно возвращаются на языке текущего портала с fallback на язык по умолчанию.

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
