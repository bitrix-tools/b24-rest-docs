# Вызвать зарегистрированную команду интерфейса BX24.placement.call

> Scope: [`placement`](../../scopes/permissions.md)

Метод `BX24.placement.call` вызывает зарегистрированную команду интерфейса.

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **command***
[`string`](../../data-types.md) | Вызываемая команда ||
|| **parameters**
[`object`](../../data-types.md) | Передаваемые параметры ||
|| **callback***
[`callable`](../../data-types.md) | Функция обратного вызова ||
|#


## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.ready(function () {
    BX24.init(function () {
        BX24.placement.call('getStatus', {}, function (result) {
            console.log(result);
        });

        BX24.placement.call('CallCardSetCardTitle', {title: 'hello world!'}, function (result) {
            console.log(result);
        });
    });
});
```

## Продолжите изучение 

- [{#T}](bx24-placement-info.md)
- [{#T}](bx24-placement-get-interface.md)
- [{#T}](bx24-placement-bind-event.md)