# Получить иформацию о js-интерфейсе текущего места встраивания BX24.placement.getInterface

> Scope: [`placement`](../../scopes/permissions.md)

Метод `BX24.placement.getInterface` позволяет получить информацию о js-интерфейсе текущего места встраивания: список возможных команд и событий.

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **callback***
[`callable`](../../data-types.md) | Функция обратного вызова. 

Обработчик `callback` получит объект вида `{command: array, event: array}`, где: 
- `command` — список доступных команд
- `event` — список доступных событий

Пример: плейсмент `CALL_CARD` предназначен для работы с карточкой звонка в CRM
 ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.ready(function () {
    BX24.init(function () {
        BX24.placement.getInterface((result) => {
            console.info(result);
        });
    });
});
```

## Результат

```json
{"command":["getStatus", "disableAutoClose", "enableAutoClose" …],"event":[{"CallCard::EntityChanged", "CallCard::CallStateChanged", "CallCard::BeforeClose" …}]}
```

## Продолжите изучение 

- [{#T}](bx24-placement-info.md)
- [{#T}](bx24-placement-call.md)
- [{#T}](bx24-placement-bind-event.md)