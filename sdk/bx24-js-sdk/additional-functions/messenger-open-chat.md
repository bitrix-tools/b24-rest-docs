# Открыть чат Messenger.openChat

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Метод `Messenger.openChat` открывает чат в интерфейсе Мессенджера Битрикс24. Метод рекомендуется использовать вместо `BX24.im.openMessenger` и `BX24.im.openHistory`.

```js
Promise Messenger.openChat([String dialogId[, Integer messageId]])
```

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **dialogId**
`string` | Идентификатор диалога или чата. Если параметр не передан, открывается список чатов ||
|| **messageId**
`integer` | Идентификатор сообщения для открытия чата с фокусом на конкретное сообщение ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX.Messenger.Public.openChat('chat123');
```

```js
BX.Messenger.Public.openChat('chat123', 12345);
```

## Обработка ответа

Метод возвращает `Promise`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`Promise` | Promise выполнения операции открытия чата ||
|#

## Продолжите изучение

- [{#T}](./outdated/bx24-im-open-messenger.md)
- [{#T}](./outdated/bx24-im-open-history.md)
