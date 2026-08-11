# При нажатии на кнопку «ответить» BackgroundCallCard::answerButtonClick

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может подписаться: любой пользователь

Событие `BackgroundCallCard::answerButtonClick` возникает при принятии входящего звонка.

{% note info "" %}

Событие работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это событие js-интерфейса, а не событие REST: подписаться на него запросом к `/rest/` нельзя.

{% endnote %}

## Что получает обработчик

В обработчик события данные не передаются.

## Параметры подписки

Обработчик регистрируют из виджета методом [BX24.placement.bindEvent](../../bx24-placement-bind-event.md).

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../../data-types.md) | Имя события интерфейса.

Для данного события — `BackgroundCallCard::answerButtonClick` ||
|| **callback***
[`callable`](../../../../data-types.md) | Функция, которую Битрикс24 вызывает при наступлении события. Аргументы в обработчик не передаются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.bindEvent('BackgroundCallCard::answerButtonClick', function () {
                // код обработчика
            });
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    await $b24.placement.bindEvent('BackgroundCallCard::answerButtonClick', () => {
      // код обработчика
    })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        await $b24.placement.bindEvent('BackgroundCallCard::answerButtonClick', () => {
          // код обработчика
        })
      })
    </script>
    ```

{% endlist %}

## Ошибки

Проверьте условия.

- Виджет открыт в точке встраивания `PAGE_BACKGROUND_WORKER`. В других точках встраивания события `BackgroundCallCard::*` не зарегистрированы, и подписка молча не сработает
- Имя события передано без опечаток и с учетом регистра. Список событий, доступных в текущей точке встраивания, возвращает [BX24.placement.getInterface](../../bx24-placement-get-interface.md)
- Звонок поднят приложением методом [telephony.externalCall.register](../../../../telephony/telephony-external-call-register.md). Для звонков самого Битрикс24 события `BackgroundCallCard::*` не эмитятся вовсе

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../card.md)
- [{#T}](../index.md)
