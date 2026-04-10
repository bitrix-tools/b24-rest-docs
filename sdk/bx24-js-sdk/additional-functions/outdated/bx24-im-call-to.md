# Позвонить по внутренней связи BX24.im.callTo

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [Messenger.startVideoCall](../messenger-start-video-call.md).

{% endnote %}

Метод `BX24.im.callTo` отправляет команду на звонок пользователю Битрикс24 по внутренней связи.

```js
void BX24.im.callTo(Integer userId[, Boolean video])
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId***
`integer` | Идентификатор пользователя Битрикс24, которому выполняется звонок ||
|| **video**
`boolean` | Тип звонка: `true` - видеозвонок, `false` - аудиозвонок ||
|#

## Пример кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

```js
BX24.init(function () {
    BX24.im.callTo(1, true);
});
```

## Обработка ответа

Метод не возвращает данные (`void`).

## Продолжите изучение

- [{#T}](./bx24-im-phone-to.md)
- [{#T}](./bx24-im-open-messenger.md)
