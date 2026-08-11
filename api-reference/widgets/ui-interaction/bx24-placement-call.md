# Вызвать зарегистрированную команду интерфейса BX24.placement.call

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `BX24.placement.call` вызывает команду интерфейса, зарегистрированную текущей точкой встраивания.

```js
BX24.placement.call(command, parameters[, callback]);
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **command***
[`string`](../../data-types.md) | Имя вызываемой команды ||
|| **parameters**
[`any`](../../data-types.md) | Передаваемые параметры. Тип значения зависит от команды: объект, строка, число, массив или `null`. Команды без параметров принимают пустой объект `{}` ||
|| **callback**
[`callable`](../../data-types.md) | Функция обратного вызова. В нее приходит результат команды ||
|#

Например, команда `setValue` точки встраивания `USERFIELD_TYPE` принимает новое значение поля вторым аргументом:

```js
BX24.placement.call('setValue', value, () => {});
```

## Какие команды доступны

Набор команд задает точка встраивания, в которой открыт виджет. Общего списка на все точки нет: сверяйте его методом [BX24.placement.getInterface](bx24-placement-get-interface.md).

В библиотеке b24jssdk второй аргумент необязателен: для команд без параметров его опускают.

#|
|| **Точка встраивания** | **Команды** ||
|| [`CALL_CARD`](./call-card/index.md) | `getStatus`, `disableAutoClose`, `enableAutoClose` ||
|| [`PAGE_BACKGROUND_WORKER`](./page-background-worker/index.md) | `CallCardSetMute`, `CallCardSetHold`, `CallCardSetUiState`, `CallCardGetListUiStates`, `CallCardSetCardTitle`, `CallCardSetStatusText`, `CallCardStartTimer`, `CallCardStopTimer`, `CallCardClose` ||
|| [`CALENDAR_GRIDVIEW`](../../calendar/calendar-grid-view.md) | `getEvents`, `viewEvent`, `addEvent`, `editEvent`, `deleteEvent` ||
|| [`CRM_*_DETAIL_TAB`, `CRM_*_DETAIL_ACTIVITY`, `CRM_*_LIST_MENU`](./index.md#crm-card) | `reloadData` — обновляет карточку или список элементов CRM ||
|| [Дело в таймлайне CRM](../crm/detail-activity-area.md) | `setLayout`, `setLayoutItemState`, `setPrimaryButtonState`, `setSecondaryButtonState`, `bindLayoutEventCallback`, `bindValueChangeCallback`, `lock`, `unlock`, `finish` — отрисовка штатного интерфейса дела ||
|| [Поиск клиента и автозаполнение реквизитов](../crm/detail-search.md) | `crmShowFoundEntities`, `crmShowCreatedEntity` — передают найденные варианты и созданный объект CRM ||
|| [`USERFIELD_TYPE`](../user-field/index.md) | `setValue`, `getValue`. Пример вызова — в туториале [{#T}](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md) ||
|| [Блок на сайте](../../landing/embedding/block.md) | `refreshBlock` — перерисовывает блок после правок приложения ||
|| [Настройки robot-приложения](../../../tutorials/bizproc/setting-robot.md) | `setPropertyValue` — записывает значения свойств в форму робота ||
|#

Кроме команд точки встраивания, виджету доступны общие методы — например [BX24.resizeWindow](../../../sdk/bx24-js-sdk/additional-functions/bx24-resize-window.md). В списке [BX24.placement.getInterface](bx24-placement-get-interface.md) они не возвращаются.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

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

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    const result = await $b24.placement.call('getStatus')

    console.log(result)
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.call('getStatus')

        console.log(result)
      })
    </script>
    ```

{% endlist %}

## Результат

Состав результата задает сама команда — он описан на ее странице. Команды, которые ничего не возвращают, передают в функцию обратного вызова пустой массив, команды чтения — объект или массив с данными.

Ошибку команда возвращает туда же, отдельного канала ошибок у js-интерфейса нет. Например, команды карточки звонка при отсутствии карточки передают массив с объектом:

```json
[
    {
        "result": "error",
        "errorCode": "Call card is undefined"
    }
]
```

## Ошибки

Незнакомую команду точка встраивания игнорирует молча: функция обратного вызова не вызывается, ошибка не приходит. Так же ведет себя вызов из точки, где команды нет.

Проверьте два условия:

- виджет открыт в той точке встраивания, где команда зарегистрирована. Текущую точку показывает [BX24.placement.info](bx24-placement-info.md)
- имя команды передано без опечаток и с учетом регистра. Список доступных команд возвращает [BX24.placement.getInterface](bx24-placement-get-interface.md)

## Продолжите изучение

- [{#T}](bx24-placement-info.md)
- [{#T}](bx24-placement-get-interface.md)
- [{#T}](bx24-placement-bind-event.md)
- [{#T}](index.md)
