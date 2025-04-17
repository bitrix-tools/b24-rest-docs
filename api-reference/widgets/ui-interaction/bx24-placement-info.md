# Получить информацию о контексте вызова BX24.placement.info

> Scope: [`placement`](../../scopes/permissions.md)

Метод `BX24.placement.info` получает информацию о контексте вызова обработчика встравания.

Без параметров.

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.ready(function () {
    BX24.init(function () {
        var placementInfo = BX24.placement.info();
        console.info("placement = " + placementInfo["placement"]
    + ", options = " + placementInfo["options"]);
    });
});
```

## Результат

```json
{"placement":"CRM_LEAD_LIST_MENU","options":{"ID":"1348"}}
```

## Продолжите изучение 

- [{#T}](bx24-placement-get-interface.md)
- [{#T}](bx24-placement-call.md)
- [{#T}](bx24-placement-bind-event.md)