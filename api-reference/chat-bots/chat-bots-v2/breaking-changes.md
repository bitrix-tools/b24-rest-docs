# Изменения API imbot.v2

На странице собраны изменения в API `imbot.v2`, которые могут повлиять на совместимость интеграций.

Если формат вызова или ответа метода меняется, предыдущий вариант продолжает поддерживаться **6 месяцев** с момента публикации изменения. После этого поддержка старого формата может быть прекращена.

Рекомендуем отслеживать такие изменения и обновлять интеграции заранее.

## imbot.v2.Event.get: пагинация через nextOffset (#BOT-BC-0326-1) {#event-get-next-offset}

> Дата публикации: 25.03.2026  
> Поддержка старого формата: до 25.09.2026

В методе [imbot.v2.Event.get](./imbot.v2/events/event-get.md) изменен формат пагинации.

**Раньше**

Ответ содержал поле `lastEventId`. Для получения следующей порции событий клиент должен был самостоятельно вычислять значение `offset` как `lastEventId + 1`.

**Теперь**

Ответ содержит поле `nextOffset`. Для получения следующей порции событий передавайте это значение в параметре `offset`.

```json
{
  "result": {
    "events": [...],
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

Если `hasMore: false`, новых событий нет, но значение `nextOffset` все равно нужно сохранить для следующего цикла polling.

## imbot.v2.Command.register: параметры перенесены в fields (#BOT-BC-0326-2) {#command-register-fields}

> Дата публикации: 30.03.2026  
> Поддержка старого формата: до 30.09.2026

В методе [imbot.v2.Command.register](./imbot.v2/commands/command-register.md) изменен формат передачи параметров команды.

**Раньше**

Параметры команды передавались на верхнем уровне запроса.

```json
{
  "botId": 456,
  "botToken": "...",
  "command": "help",
  "title": {"en": "Help"},
  "hidden": false
}
```

**Теперь**

Параметры команды передаются в объекте `fields`, как и в других методах API `imbot.v2`.

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

Старый плоский формат поддерживается до **30.09.2026**. Если в запросе передан объект `fields`, используется новый формат. Если `fields` не передан, используется старый формат.

## REST-ревизия 33 {#rest-revision-33}

> Дата публикации: 02.04.2026

### imbot.v2.Chat.Message.send: нормализация boolean-полей (#BOT-BC-0426-1) {#chat-message-send-boolean-normalization}

**Раньше**

При передаче `fields.system`, `fields.urlPreview`, `fields.skipConnector`, `fields.silentConnector` как JSON boolean (`true` / `false`) значения не конвертировались в `Y` / `N` и могли игнорироваться.

**Теперь**

Все четыре boolean-поля корректно нормализуются. Допустимы значения `true` / `false`, `"Y"` / `"N"`.

**Затронутый метод:** [imbot.v2.Chat.Message.send](./imbot.v2/messages/chat-message-send.md)

### imbot.v2.Revision.get: новый метод (#BOT-BC-0426-2) {#revision-get-new-method}

Добавлен метод [imbot.v2.Revision.get](./imbot.v2/revision-get.md) для получения номеров ревизий API. Позволяет определить совместимость Битрикс24 с конкретными методами и полями. Не требует `botId` и `botToken`.

## Продолжите изучение

- [Миграция с imbot на imbot.v2](./migration.md)
- [Обзор методов](./index.md)



