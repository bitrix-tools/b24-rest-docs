# Получить информацию о контексте вызова BX24.placement.info

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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