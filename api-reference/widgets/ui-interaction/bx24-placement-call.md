# Вызвать зарегистрированную команду интерфейса BX24.placement.call

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)

Метод `BX24.placement.call` вызывает зарегистрированную команду интерфейса.

```js
BX24.placement.call(command, parameters[, callback]);
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **command***
[`string`](../../data-types.md) | Вызываемая команда ||
|| **parameters**
[`any`](../../data-types.md) | Передаваемые параметры. Тип значения зависит от команды: объект, строка, число, массив или `null` ||
|| **callback**
[`callable`](../../data-types.md) | Необязательная функция обратного вызова ||
|#

Например, команда `setValue` точки встраивания `USERFIELD_TYPE` принимает новым значением поля второй параметр:

```js
BX24.placement.call('setValue', value, () => {});
```

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
