# После создания карточки звонка BackgroundCallCard::initialized

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может подписаться: любой пользователь

Событие `BackgroundCallCard::initialized` возникает после создания карточки звонка и передачи стартовых данных.

После этого события приложение может управлять карточкой командами, например переключить ее состояние командой [CallCardSetUiState](../call-card-set-ui-state.md). Если карточка загружает данные CRM, раньше `initialized` приходит событие [BackgroundCallCard::entityChanged](./entity-changed.md) с клиентом CRM. Поля `PHONE_NUMBER`, `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID` из `entityChanged` приходят и в `initialized`.

{% note info "" %}

Событие работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это событие js-интерфейса, а не событие REST: подписаться на него запросом к `/rest/` нельзя.

{% endnote %}

## Что получает обработчик

Данные передаются в функцию обратного вызова метода `BX24.placement.bindEvent` {.b24-info}

```js
callback({
    "CALL_ID": "externalCall.a33fa16db5c695dbda7d8dadb66696a2.1795102259",
    "PHONE_NUMBER": "+79001234567",
    "LINE_NUMBER": "sip-line-1",
    "LINE_NAME": "Линия поддержки",
    "CRM_ENTITY_TYPE": "CONTACT",
    "CRM_ENTITY_ID": 123,
    "CRM_BINDINGS": [{"ENTITY_TYPE": "DEAL", "ENTITY_ID": 789}],
    "CALL_DIRECTION": "outgoing",
    "CALL_STATE": "idle",
    "CALL_LIST_MODE": false
});
```

## Параметры обработчика события

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **CALL_ID**
[`string`](../../../../data-types.md) | Идентификатор звонка ||
|| **PHONE_NUMBER**
[`string`](../../../../data-types.md) | Номер клиента.

Ключ не приходит вовсе, если номер не определен ||
|| **LINE_NUMBER**
[`string`](../../../../data-types.md) | Номер линии.

Пустая строка, если номер линии не передан при регистрации звонка ||
|| **LINE_NAME**
[`string`](../../../../data-types.md) | Название телефонной линии компании.

Если у линии нет названия, приходит ее номер. Если номер линии не передан при регистрации звонка, приходит пустая строка ||
|| **CRM_ENTITY_TYPE**
[`string`](../../../../data-types.md) | Тип текущего объекта CRM: `LEAD`, `CONTACT`, `COMPANY` или `DEAL`.

Пустая строка, если звонок не привязан к CRM ||
|| **CRM_ENTITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор объекта CRM, к которому привязан звонок.

`0`, если звонок не привязан к CRM ||
|| **CRM_ACTIVITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор дела CRM, созданного для звонка.

В этом событии ключ не приходит: события `BackgroundCallCard::*` приходят только из карточки внешнего звонка ||
|| **CRM_BINDINGS**
[`object[]`](../../../../data-types.md) | Привязки звонка к объектам CRM [(подробное описание)](#crm_bindings).

Пустой массив, если звонок не привязан к CRM ||
|| **CALL_DIRECTION**
[`string`](../../../../data-types.md) | Направление звонка.

Возможные значения:

- `incoming` — входящий звонок
- `outgoing` — исходящий звонок
- `callback` — обратный звонок ||
|| **CALL_STATE**
[`string`](../../../../data-types.md) | Состояние звонка.

Возможные значения:

- `idle` — соединение отсутствует
- `connecting` — выполняется установка соединения
- `connected` — соединение установлено

В этом событии всегда `idle`: состояние интерфейса карточки задает приложение командой [CallCardSetUiState](../call-card-set-ui-state.md) ||
|| **CALL_LIST_MODE**
[`boolean`](../../../../data-types.md) | Признак режима обзвона.

В этом событии всегда `false`. Карточка обзвона — не внешняя: события `BackgroundCallCard::*` из нее не приходят ||
|#

### Параметр CRM_BINDINGS {#crm_bindings}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../../../../data-types.md) | Тип объекта CRM ||
|| **ENTITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор объекта CRM ||
|#

## Параметры подписки

Обработчик регистрируют из виджета методом [BX24.placement.bindEvent](../../bx24-placement-bind-event.md).

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../../data-types.md) | Имя события интерфейса.

Для данного события — `BackgroundCallCard::initialized` ||
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
            BX24.placement.bindEvent('BackgroundCallCard::initialized', function (eventData) {
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

    type CallCardData = {
      CALL_ID: string
      PHONE_NUMBER?: string
      LINE_NUMBER: string
      LINE_NAME: string
      CRM_ENTITY_TYPE: string
      CRM_ENTITY_ID: number
      CRM_BINDINGS: Array<{ ENTITY_TYPE: string; ENTITY_ID: number }>
      CALL_DIRECTION: string
      CALL_STATE: string
      CALL_LIST_MODE: boolean
    }

    await $b24.placement.bindEvent('BackgroundCallCard::initialized', (eventData: CallCardData) => {
      console.log(eventData.CALL_ID)
    })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        await $b24.placement.bindEvent('BackgroundCallCard::initialized', (eventData) => {
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

- [{#T}](../../bx24-placement-bind-event.md)
- [{#T}](./entity-changed.md)
- [{#T}](../call-card-set-ui-state.md)
- [{#T}](./index.md)
- [{#T}](../card.md)
- [{#T}](../index.md)
