# Установить обработчик события интерфейса BX24.placement.bindEvent

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `BX24.placement.bindEvent` устанавливает обработчик события интерфейса. Событие должно быть зарегистрировано текущей точкой встраивания, иначе подписка не сработает.

```js
BX24.placement.bindEvent(event, callback);
```

Это события интерфейса, а не [события REST](../../events/index.md): обработчик выполняется в браузере, в коде виджета, и его не регистрируют методом `event.bind`.

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Имя события, на которое подписывается обработчик ||
|| **callback***
[`callable`](../../data-types.md) | Функция обратного вызова.

Обработчик `callback` может получать или не получать данные в зависимости от события, на которое он подписывается ||
|#

Подписываться нужно на каждое событие отдельно: подписки сразу на все события нет.

## Какие события доступны

Набор событий задает точка встраивания, в которой открыт виджет.

#|
|| **Точка встраивания** | **События** ||
|| [`CALL_CARD`](./call-card/index.md) | `CallCard::EntityChanged`, `CallCard::BeforeClose`, `CallCard::CallStateChanged` ||
|| [`PAGE_BACKGROUND_WORKER`](./page-background-worker/events/index.md) | 17 событий `BackgroundCallCard::*` — от `initialized` до нажатий кнопок оператора ||
|| [`CALENDAR_GRIDVIEW`](../../calendar/calendar-grid-view.md) | `Calendar.customView:refreshEntries`, `Calendar.customView:decreaseViewRangeDate`, `Calendar.customView:increaseViewRangeDate`, `Calendar.customView:adjustToDate` ||
|| [Поиск клиента и автозаполнение реквизитов](../crm/detail-search.md) | `onCrmEntityIsNeedToCreate` — пользователь выбрал вариант, предложенный приложением ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.bindEvent('BackgroundCallCard::initialized', function (eventData) {
                console.log(eventData);
            });

            BX24.placement.bindEvent('CallCard::CallStateChanged', function (callState) {
                console.log(callState);
            });
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    await $b24.placement.bindEvent('CallCard::CallStateChanged', (callState: string) => {
      console.log(callState)
    })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        await $b24.placement.bindEvent('CallCard::CallStateChanged', (callState) => {
          console.log(callState)
        })
      })
    </script>
    ```

{% endlist %}

## Результат

Метод ничего не возвращает. Данные приходят в `callback` при каждом наступлении события — состав аргументов описан на странице конкретного события. Вернуть значение обратно в Битрикс24 из обработчика нельзя: события односторонние, реакция приложения — это отдельный вызов команды или метода REST.

## Ошибки

Подписку на незарегистрированное событие Битрикс24 игнорирует молча, ошибка не приходит.

Проверьте два условия:

- виджет открыт в той точке встраивания, где событие зарегистрировано. Текущую точку показывает [BX24.placement.info](bx24-placement-info.md)
- имя события передано без опечаток и с учетом регистра. Список доступных событий возвращает [BX24.placement.getInterface](bx24-placement-get-interface.md)

## Продолжите изучение

- [{#T}](bx24-placement-info.md)
- [{#T}](bx24-placement-get-interface.md)
- [{#T}](bx24-placement-call.md)
- [{#T}](index.md)
