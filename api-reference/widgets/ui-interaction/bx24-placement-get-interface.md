# Получить информацию о js-интерфейсе текущей точки встраивания BX24.placement.getInterface

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `BX24.placement.getInterface` получает информацию о js-интерфейсе текущей точки встраивания: список доступных команд и событий.

```js
BX24.placement.getInterface(callback);
```

Набор команд и событий у каждой точки встраивания свой. Проверяйте его этим методом перед вызовом [BX24.placement.call](bx24-placement-call.md) и перед подпиской через [BX24.placement.bindEvent](bx24-placement-bind-event.md).

Незнакомую команду и подписку на незарегистрированное событие Битрикс24 игнорирует молча, без ошибки.

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **callback***
[`callable`](../../data-types.md) | Функция обратного вызова. В нее приходит объект с полями `command` и `event` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.getInterface(function (result) {
                console.info(result.command, result.event);
            });
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PlacementInterface = {
      command: string[]
      event: string[]
    }

    const result = await $b24.placement.getInterface() as PlacementInterface

    console.info(result.command, result.event)
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.getInterface()

        console.info(result.command, result.event)
      })
    </script>
    ```

{% endlist %}

## Результат

Пример для виджета, открытого в точке встраивания `CALL_CARD`.

```json
{
    "command": ["getStatus", "disableAutoClose", "enableAutoClose"],
    "event": ["CallCard::EntityChanged", "CallCard::BeforeClose", "CallCard::CallStateChanged"]
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **command**
[`string[]`](../../data-types.md) | Имена команд, зарегистрированных текущей точкой встраивания.

Общие методы виджета — например [resizeWindow](../../../sdk/bx24-js-sdk/additional-functions/bx24-resize-window.md) — в этот список не попадают, хотя вызывать их можно ||
|| **event**
[`string[]`](../../data-types.md) | Имена событий, на которые можно подписаться в текущей точке встраивания. Если у точки своих событий нет, массив пустой ||
|#

## Ошибки

Метод ошибок не возвращает. Пустые массивы `command` и `event` означают, что у текущей точки встраивания собственных команд и событий нет — например, виджет открыт основной ссылкой приложения.

## Продолжите изучение

- [{#T}](bx24-placement-info.md)
- [{#T}](bx24-placement-call.md)
- [{#T}](bx24-placement-bind-event.md)
- [{#T}](index.md)
