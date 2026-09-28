# При выборе оператора для перевода звонка BackgroundCallCard::transferButtonClick

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может подписаться: любой пользователь

Событие `BackgroundCallCard::transferButtonClick` возникает, когда оператор нажимает кнопку перевода в карточке звонка и выбирает сотрудника, на которого переводит звонок.

Кнопка перевода есть только в состоянии `connected`, которое приложение включает командой [CallCardSetUiState](../call-card-set-ui-state.md). В режиме обзвона и в карточке звонка, который сам пришел переводом, кнопки нет.

Это первый шаг сценария перевода. Битрикс24 звонок приложения сам не переводит. Приложение получает адресата, соединяет его и переключает карточку в состояние `transferring` той же командой — в нем оператор видит кнопки «Перенаправить» и «Вернуться к звонку». Нажатия этих кнопок приходят событиями [completeTransferButtonClick](./complete-transfer-button-click.md) и [cancelTransferButtonClick](./cancel-transfer-button-click.md).

{% note info "" %}

Событие работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это событие js-интерфейса, а не событие REST: подписаться на него запросом к `/rest/` нельзя.

{% endnote %}

## Что получает обработчик

Данные передаются в функцию обратного вызова метода `BX24.placement.bindEvent` {.b24-info}

```js
callback({
    "phoneNumber": "+79001234567",
    "target": 12
});
```

## Параметры обработчика события

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **phoneNumber**
[`string`](../../../../data-types.md) | Номер телефона собеседника ||
|| **target**
[`integer`](../../../../data-types.md) или [`string`](../../../../data-types.md) | Куда переводится звонок.

Значение зависит от пункта, который выбрал оператор:

- идентификатор сотрудника числом, например `12`, — если в профиле сотрудника нет телефонов и меню выбора не показывается
- идентификатор сотрудника строкой, например `"12"`, — если оператор выбрал в меню пункт «Внутренний звонок»
- номер телефона строкой, например `"+79007654321"`, — мобильный, личный или рабочий из профиля сотрудника, если оператор выбрал его в меню

Тип перевода — на сотрудника или на телефон — в обработчик не передается. Приложение определяет его по значению: идентификатор сотрудника совпадает с `ID` из [user.get](../../../../user/user-get.md), номер телефона — с полями `PERSONAL_MOBILE`, `PERSONAL_PHONE` или `WORK_PHONE` сотрудника.

Если оператор выбрал подразделение, а не сотрудника, событие не возникает ||
|#

## Параметры подписки

Обработчик регистрируют из виджета методом [BX24.placement.bindEvent](../../bx24-placement-bind-event.md).

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../../data-types.md) | Имя события интерфейса.

Для данного события — `BackgroundCallCard::transferButtonClick` ||
|| **callback***
[`callable`](../../../../data-types.md) | Функция, которую Битрикс24 вызывает при наступлении события. Аргументы обработчика описаны выше ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.bindEvent('BackgroundCallCard::transferButtonClick', function (eventData) {
                console.log(eventData);
            });
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    await $b24.placement.bindEvent('BackgroundCallCard::transferButtonClick', (eventData: { phoneNumber: string; target: number | string }) => {
      console.log(eventData.target)
    })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        await $b24.placement.bindEvent('BackgroundCallCard::transferButtonClick', (eventData) => {
          console.log(eventData)
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
- [{#T}](../../bx24-placement-bind-event.md)
- [{#T}](../card.md)
- [{#T}](../index.md)
- [{#T}](./complete-transfer-button-click.md)
- [{#T}](./cancel-transfer-button-click.md)
- [{#T}](../call-card-set-ui-state.md)
