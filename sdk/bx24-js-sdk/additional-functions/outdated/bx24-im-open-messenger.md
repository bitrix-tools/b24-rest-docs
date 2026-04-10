# Открыть окно мессенджера BX24.im.openMessenger

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [Messenger.openChat](../messenger-open-chat.md).

{% endnote %}

Метод `BX24.im.openMessenger` отправляет команду на открытие окна мессенджера.

```js
void BX24.im.openMessenger([String dialogId])
```

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **dialogId**
`string` | Идентификатор диалога. Поддерживаются форматы: `userId` или `chatXXX` для чата, `sgXXX` для чата группы, `imol|XXXX` для открытой линии. Если параметр не передан, открывается интерфейс списка чатов ||
|#

## Пример кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

```js
BX24.init(function () {
    BX24.im.openMessenger('chat123');
});
```

## Обработка ответа

Метод не возвращает данные (`void`).

## Продолжите изучение

- [{#T}](./bx24-im-open-history.md)
- [{#T}](./bx24-im-call-to.md)
