# Установить обработчик события интерфейса BX24.placement.bindEvent

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)

Метод `BX24.placement.bindEvent` устанавливает обработчик события интерфейса. Событие  должно быть зарегистрировано на вызывающей стороне, иначе ничего не произойдет.

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Имя события, на которое подписывается обработчик ||
|| **callback***
[`callable`](../../data-types.md) | Функция обратного вызова.

Обработчик `callback` может получать или не получать данные в зависимости от события, на которое он подписывается. ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.ready(function () {
    BX24.init(function () {
        BX24.placement.bindEvent('BackgroundCallCard::initialized', event => {
            // some code
        });

        BX24.placement.bindEvent('CallCard::CallStateChanged', (callState) => {
            console.log(callState);
        });
    });
});
```

## Продолжите изучение 

- [{#T}](bx24-placement-info.md)
- [{#T}](bx24-placement-get-interface.md)
- [{#T}](bx24-placement-call.md)
