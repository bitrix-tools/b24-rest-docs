# Получить контекст выполнения виджета BX24.placement.info

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `BX24.placement.info` получает контекст вызова обработчика: код точки встраивания, в которой открыт виджет, и параметры, переданные вместе с ней.

```js
BX24.placement.info();
```

## Параметры

Метод не принимает параметров и возвращает результат сразу, без функции обратного вызова.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            const placementInfo = BX24.placement.info();

            console.info(placementInfo.placement, placementInfo.options);
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // те же данные доступны свойствами менеджера точки встраивания
    console.info($b24.placement.placement, $b24.placement.options)
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        console.info($b24.placement.placement, $b24.placement.options)
      })
    </script>
    ```

{% endlist %}

## Результат

```json
{"placement":"CRM_LEAD_LIST_MENU","options":{"ID":"1348"}}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **placement**
[`string`](../../data-types.md) | Код точки встраивания, в которой открыт виджет. Для виджета, открытого основной ссылкой приложения, — `DEFAULT` ||
|| **options**
[`object`](../../data-types.md) | Параметры точки встраивания. Состав ключей зависит от точки: например, идентификатор элемента CRM или идентификатор диалога. Ключи каждой точки описаны на ее странице в [каталоге точек встраивания](../placements.md) ||
|#

## Ошибки

Метод ошибок не возвращает. Если в `placement` пришло значение `DEFAULT`, а ожидалась точка встраивания, значит виджет открыт основной ссылкой приложения, а не из зарегистрированной точки.

## Продолжите изучение

- [{#T}](bx24-placement-get-interface.md)
- [{#T}](bx24-placement-call.md)
- [{#T}](bx24-placement-bind-event.md)
- [{#T}](../placements.md)
- [{#T}](index.md)
