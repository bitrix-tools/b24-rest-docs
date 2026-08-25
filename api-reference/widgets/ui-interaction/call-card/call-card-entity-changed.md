# Событие смены клиента CallCard::EntityChanged

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — доступ к точке встраивания карточки звонка
>
> Кто может подписаться: любой пользователь

Событие `CallCard::EntityChanged` возникает, когда меняется клиент, привязанный к звонку.

Событие приходит в четырех случаях:

- карточка звонка открылась и подтянула данные CRM
- карточка обновила данные клиента
- из карточки создали или привязали элемент CRM — лид, контакт или компанию
- в режиме обзвона оператор перешел к следующему клиенту

{% note info "" %}

Событие работает в контексте приложения, открытого в точке встраивания `CALL_CARD`. Это событие js-интерфейса, а не событие REST: подписаться на него запросом к `/rest/` нельзя.

{% endnote %}

## Что получает обработчик

Данные передаются в функцию обратного вызова метода `BX24.placement.bindEvent` {.b24-info}

```js
callback({
    "PHONE_NUMBER": "+79001234567",
    "CRM_ENTITY_TYPE": "CONTACT",
    "CRM_ENTITY_ID": 123
});
```

## Параметры обработчика события

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **PHONE_NUMBER***
[`string`](../../../data-types.md) | Номер телефона клиента.

Если у клиента нет ни одного телефона, приходит строка `unknown` ||
|| **CRM_ENTITY_TYPE***
[`string`](../../../data-types.md) | Тип связанного со звонком объекта CRM ||
|| **CRM_ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор связанного со звонком объекта CRM ||
|#

## Параметры подписки

Обработчик регистрируют из виджета методом [BX24.placement.bindEvent](../bx24-placement-bind-event.md).

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Имя события интерфейса.

Для данного события — `CallCard::EntityChanged` ||
|| **callback***
[`callable`](../../../data-types.md) | Функция, которую Битрикс24 вызывает при наступлении события. Аргументы обработчика описаны выше ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.bindEvent('CallCard::EntityChanged', function (eventData) {
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

    await $b24.placement.bindEvent('CallCard::EntityChanged', (eventData: { PHONE_NUMBER: string; CRM_ENTITY_TYPE: string; CRM_ENTITY_ID: number }) => {
      console.log(eventData.CRM_ENTITY_ID)
    })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        await $b24.placement.bindEvent('CallCard::EntityChanged', (eventData) => {
          console.log(eventData)
        })
      })
    </script>
    ```

{% endlist %}

## Ошибки

Проверьте условия.

- Виджет открыт в точке встраивания `CALL_CARD`. В других точках встраивания события `CallCard::*` не зарегистрированы, и подписка молча не сработает
- Имя события передано без опечаток и с учетом регистра. Список событий, доступных в текущей точке встраивания, возвращает [BX24.placement.getInterface](../bx24-placement-get-interface.md)

## Продолжите изучение

- [{#T}](./get-status.md)
- [{#T}](./disable-auto-close.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-before-close.md)
- [{#T}](./call-card-call-state-changed.md)
- [{#T}](./index.md)
- [{#T}](../../telephony/call-card.md)
