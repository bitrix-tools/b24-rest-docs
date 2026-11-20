# Изменить состояние интерфейса карточки звонка со стороны приложения CallCardSetUiState

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может выполнять команду: сотрудник, которому Битрикс24 показал карточку, если у него есть доступ к приложению

Команда `CallCardSetUiState` изменяет состояние интерфейса карточки звонка.

Команда управляет только карточкой внешнего звонка — ее показывает метод [telephony.externalCall.register](../../../telephony/telephony-external-call-register.md). Для звонков самого Битрикс24 команда в браузере вернет ошибку `Call card is undefined`. Вызывайте команду после события [BackgroundCallCard::initialized](./events/initialized.md): до него и после закрытия карточки придет та же ошибка.

{% note info "" %}

Команда работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это команда js-интерфейса, а не метод REST: вызвать ее запросом к `/rest/` нельзя.

{% endnote %}

## Как вызвать команду

Команду вызывают из виджета методом [BX24.placement.call](../bx24-placement-call.md). Третий аргумент — функция обратного вызова, в нее приходит результат команды.

```js
BX24.placement.call('CallCardSetUiState', {uiState: 'connected'}, function (result) {
    console.log(result);
});
```

## Параметры команды

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **uiState***
[`string`](../../../data-types.md) | Состояние интерфейса карточки.

Возможные значения:

- `incoming` — входящий звонок
- `transferIncoming` — входящий перевод звонка
- `outgoing` — исходящий звонок
- `connectingIncoming` — выполняется соединение входящего звонка
- `connectingOutgoing` — выполняется соединение исходящего звонка
- `connected` — соединение установлено
- `transferring` — выполняется перевод звонка
- `transferFailed` — ошибка перевода звонка
- `transferConnected` — перевод звонка успешно соединен
- `error` — ошибка звонка
- `moneyError` — ошибка из-за недостатка средств
- `redial` — повторный набор

Тот же список можно получить программно командой [CallCardGetListUiStates](./call-card-get-list-ui-states.md). Как выглядит карточка в каждом состоянии и какие кнопки в нем доступны, показано на странице [{#T}](./card.md).

Команда принимает без ошибки и служебные значения `idle`, `externalCard` и `sipPhoneError`, которых нет в списке. Ошибку `Invalid ui state` вернет только значение, которого нет ни в списке, ни среди служебных. В `externalCard` и в `idle` входящего звонка внизу карточки остается только кнопка «Закрыть» ||
|| **disableAutoStartTimer**
[`boolean`](../../../data-types.md) | Дополнительный параметр для `uiState = connected`.

Возможные значения:

- `true` — не запускать таймер автоматически
- `false` или отсутствие параметра — запускать таймер автоматически ||
|#

Битрикс24 показывает карточку внешнего звонка в служебном состоянии `externalCard`: внизу у нее только кнопка «Закрыть». Дальше состояния переключает только приложение: кнопки карточки отправляют ему события, но состояние не меняют. Исключение — кнопка «Закрыть»: ее Битрикс24 обрабатывает сам и закрывает карточку.

Так проходит типовой входящий звонок:

1. `incoming` — приложение показывает оператору звонок с кнопками «Ответить» и «Пропустить»
2. Оператор нажимает «Ответить», приложение получает событие [BackgroundCallCard::answerButtonClick](./events/answer-button-click.md) и соединяет звонок в своем WebRTC-клиенте. На время соединения можно включить `connectingIncoming` — в нем есть кнопка «Завершить»
3. `connected` — разговор идет, таймер запускается автоматически
4. Разговор закончен — приложение фиксирует звонок методом [telephony.externalCall.finish](../../../telephony/telephony-external-call-finish.md) и закрывает карточку командой [CallCardClose](./call-card-close.md)

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
            BX24.placement.call('CallCardSetUiState', {uiState: 'connected'}, function (result) {
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

    await $b24.placement.call('CallCardSetUiState', { uiState: 'connected' })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.call('CallCardSetUiState', {uiState: 'connected'})

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

Пустой массив при успешном вызове.

## Ошибки

Ошибка команды приходит в ту же функцию обратного вызова: вместо обычного результата в нее передается массив с объектом, у которого `result` равен `error`.

```json
[
    {
        "result": "error",
        "errorCode": "Invalid ui state"
    }
]
```

### Значения errorCode

#|
|| **Код** | **Описание** | **Значение** ||
|| `Call card is undefined` | Карточка звонка недоступна | Карточки внешнего звонка нет. Команда вызвана:

- до события `BackgroundCallCard::initialized`
- после закрытия карточки
- во время звонка, который зарегистрирован не методом `telephony.externalCall.register`, например звонка самого Битрикс24 ||
|| `Invalid ui state` | Некорректное значение `uiState` | Переданного значения нет ни в списке поддерживаемых состояний, ни среди служебных `idle`, `externalCard` и `sipPhoneError` ||
|#

Если команда вызвана в другой точке встраивания, функция обратного вызова не будет вызвана вовсе: неизвестную команду интерфейс точки встраивания игнорирует. Проверить, что команда `CallCardSetUiState` доступна, можно методом [BX24.placement.getInterface](../bx24-placement-get-interface.md).

## Продолжите изучение

- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-hold.md)
- [{#T}](./call-card-get-list-ui-states.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./call-card-close.md)
- [{#T}](./events/index.md)
- [{#T}](./index.md)
