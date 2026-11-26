# Закрыть карточку звонка со стороны приложения CallCardClose

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может выполнять команду: сотрудник, которому Битрикс24 показал карточку, если у него есть доступ к приложению

Команда `CallCardClose` закрывает карточку звонка. Обычно ее вызывают, когда разговор закончился в WebRTC-клиенте приложения и карточку в Битрикс24 нужно убрать.

Команда управляет только карточкой внешнего звонка — ее показывает метод [telephony.externalCall.register](../../../telephony/telephony-external-call-register.md). Для звонков самого Битрикс24 команда в браузере вернет ошибку `Call card is undefined`. Вызывайте команду после события [BackgroundCallCard::initialized](./events/initialized.md): до него и после закрытия карточки придет та же ошибка.

{% note info "" %}

Команда работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это команда js-интерфейса, а не метод REST: вызвать ее запросом к `/rest/` нельзя.

{% endnote %}

## Как вызвать команду

Команду вызывают из виджета методом [BX24.placement.call](../bx24-placement-call.md). Третий аргумент — функция обратного вызова, в нее приходит результат команды.

```js
BX24.placement.call('CallCardClose', {}, function (result) {
    console.log(result);
});
```

## Параметры команды

Команда не принимает параметров. В BX24.js вторым аргументом передайте пустой объект `{}`, в B24JsSDK второй аргумент можно не указывать.

{% note warning %}

После вызова `CallCardClose` карточкой больше управлять нельзя: кроме [CallCardGetListUiStates](./call-card-get-list-ui-states.md), команды вернут ошибку `Call card is undefined`.

Закрытие карточки не завершает звонок. Чтобы завершить его в Битрикс24, вызовите метод [telephony.externalCall.finish](../../../telephony/telephony-external-call-finish.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Примеры показывают сам вызов команды. В приложении его обычно помещают в обработчик события [BackgroundCallCard::initialized](./events/initialized.md).

{% endnote %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.call('CallCardClose', {}, function (result) {
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

    await $b24.placement.call('CallCardClose')
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.call('CallCardClose')

        console.log(result)
      })
    </script>
    ```

{% endlist %}

## Результат команды

```json
[]
```

### Возвращаемые данные

Пустой массив при успешном вызове. В браузере карточка закрывается сразу. Событие [BackgroundCallCard::closeButtonClick](./events/close-button-click.md) приходит, только когда оператор сам нажимает «Закрыть». После команды оно не придет.

## Ошибки

Ошибка команды приходит в ту же функцию обратного вызова: вместо обычного результата в нее передается массив с объектом, у которого `result` равен `error`.

```json
[
    {
        "result": "error",
        "errorCode": "Call card is undefined"
    }
]
```

### Значения errorCode

#|
|| **Код** | **Описание** | **Значение** ||
|| `Call card is undefined` | Карточка звонка недоступна | Карточки внешнего звонка нет. Команда вызвана:

- до события `BackgroundCallCard::initialized`
- после закрытия карточки
- во время звонка, который зарегистрирован не методом [telephony.externalCall.register](../../../telephony/telephony-external-call-register.md), например звонка самого Битрикс24 ||
|#

Если команда вызвана в другой точке встраивания, функция обратного вызова не будет вызвана вовсе: неизвестную команду интерфейс точки встраивания игнорирует. Проверить, что команда `CallCardClose` доступна, можно методом [BX24.placement.getInterface](../bx24-placement-get-interface.md).

## Продолжите изучение

- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-hold.md)
- [{#T}](./call-card-set-ui-state.md)
- [{#T}](./call-card-get-list-ui-states.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./events/index.md)
- [{#T}](./index.md)
