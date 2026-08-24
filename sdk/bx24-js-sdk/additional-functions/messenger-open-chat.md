# Открыть чат Messenger.openChat

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

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

Объект `Messenger` доступен после загрузки расширения `im.public.iframe`:

```js
BX.Runtime.loadExtension('im.public.iframe').then(function (exports) {
    exports.Messenger.openChat('chat123');
});
```

Чтобы открыть чат на конкретном сообщении, передайте второй параметр:

```js
BX.Runtime.loadExtension('im.public.iframe').then(function (exports) {
    exports.Messenger.openChat('chat123', 12345);
});
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

- [{#T}](./messenger-start-video-call.md)
- [{#T}](./messenger-start-phone-call.md)
- [{#T}](./bx24-open-path.md)
