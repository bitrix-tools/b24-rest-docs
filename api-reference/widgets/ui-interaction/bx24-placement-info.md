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

Код выполняется во фрейме виджета после инициализации библиотеки: в [BX24.js](../../../sdk/bx24-js-sdk/index.md) — внутри [BX24.init](../../../sdk/bx24-js-sdk/system-functions/bx24-init.md), в [b24jssdk](../../../sdk/b24jssdk/index.md) — после `initializeB24Frame`.

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
[`string`](../../data-types.md) | Код точки встраивания, в которой открыт виджет. `DEFAULT` — если приложение открыто без точки встраивания, например основной ссылкой ||
|| **options**
[`object`](../../data-types.md) | Данные, которые Битрикс24 передает виджету при открытии: например, идентификатор элемента CRM или данные звонка. Состав ключей зависит от точки встраивания и описан на ее странице в [каталоге точек встраивания](../placements.md).

Числа и логические значения могут прийти строками: например, в карточке звонка `"CRM_ENTITY_ID": "0"` и `"CALL_LIST_MODE": "false"`. Приводите их к нужному типу сами.

Параметры `OPTIONS`, которые приложение передало в [placement.bind](../placement-bind.md) при регистрации, в `options` не попадают ||
|#

## Ошибки

Метод ошибок не возвращает. Если в `placement` пришло значение `DEFAULT`, а ожидалась точка встраивания, значит приложение открыто без точки встраивания: основной ссылкой или методом [BX24.openApplication](../../../sdk/bx24-js-sdk/additional-functions/bx24-open-application.md). Проверьте, как открывается виджет.

## Продолжите изучение

- [{#T}](bx24-placement-get-interface.md)
- [{#T}](bx24-placement-call.md)
- [{#T}](bx24-placement-bind-event.md)
- [{#T}](../placements.md)
- [{#T}](index.md)
