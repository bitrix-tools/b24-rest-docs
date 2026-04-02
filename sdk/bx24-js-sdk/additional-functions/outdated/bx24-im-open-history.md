# Открыть окно истории BX24.im.openHistory

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [Messenger.openChat](../messenger-open-chat.md).

{% endnote %}

Метод `BX24.im.openHistory` отправляет команду на открытие окна истории диалога.

```js
void BX24.im.openHistory(String dialogId)
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dialogId***
`string` | Идентификатор диалога. Поддерживаются форматы: `userId` или `chatXXX` для чата, `imol|XXXX` для открытой линии ||
|#

## Пример кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

```js
BX24.init(function () {
    BX24.im.openHistory('chat123');
});
```

## Обработка ответа

Метод не возвращает данные (`void`).

## Продолжите изучение

- [{#T}](./bx24-im-open-messenger.md)
- [{#T}](./bx24-im-call-to.md)
