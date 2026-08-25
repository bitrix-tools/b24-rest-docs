# Получить список доступных состояний интерфейса карточки звонка CallCardGetListUiStates

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — регистрация звонка, поднимающего карточку
>
> Кто может выполнять команду: любой пользователь

Команда `CallCardGetListUiStates` возвращает список доступных состояний интерфейса карточки звонка.

{% note info "" %}

Команда работает в контексте приложения, открытого в точке встраивания `PAGE_BACKGROUND_WORKER`. Это команда js-интерфейса, а не метод REST: вызвать ее запросом к `/rest/` нельзя.

{% endnote %}

## Как вызвать команду

Команду вызывают из виджета методом [BX24.placement.call](../bx24-placement-call.md). Третий аргумент — функция обратного вызова, в нее приходит результат команды.

```js
BX24.placement.call('CallCardGetListUiStates', {}, function (result) {
    console.log(result);
});
```

## Параметры команды

Команда не принимает параметров. Вторым аргументом передайте пустой объект `{}`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Рекомендуется вызывать команду после события [BackgroundCallCard::initialized](./events/initialized.md)

{% endnote %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.call('CallCardGetListUiStates', {}, function (result) {
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

    const uiStates = await $b24.placement.call('CallCardGetListUiStates') as string[]

    console.log(uiStates)
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.call('CallCardGetListUiStates')

        console.log(result)
      })
    </script>
    ```

{% endlist %}

## Результат команды

```json
[
    "incoming",
    "transferIncoming",
    "outgoing",
    "connectingIncoming",
    "connectingOutgoing",
    "connected",
    "transferring",
    "transferFailed",
    "transferConnected",
    "error",
    "moneyError",
    "redial"
]
```

### Возвращаемые данные

Корневой элемент ответа — массив строк с доступными состояниями интерфейса карточки.

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

## Ошибки

Собственных кодов ошибок у команды `CallCardGetListUiStates` нет: она либо выполняется, либо не вызывается вовсе.

- Если виджет открыт не в точке встраивания `PAGE_BACKGROUND_WORKER`, интерфейс точки встраивания игнорирует незнакомую команду и функция обратного вызова не срабатывает
- Имя команды сверяйте с учетом регистра: список команд, доступных в текущей точке встраивания, возвращает [BX24.placement.getInterface](../bx24-placement-get-interface.md)

## Продолжите изучение

- [{#T}](./call-card-set-ui-state.md)
- [{#T}](./call-card-set-mute.md)
- [{#T}](./call-card-set-hold.md)
- [{#T}](./call-card-set-card-title.md)
- [{#T}](./call-card-set-status-text.md)
- [{#T}](./call-card-close.md)
- [{#T}](./events/index.md)
- [{#T}](./index.md)
