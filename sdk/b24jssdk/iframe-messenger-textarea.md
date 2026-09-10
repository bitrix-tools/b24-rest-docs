# Взаимодействие встройки с полем ввода мессенджера

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Встройка приложения в мессенджере работает с полем ввода активного чата через два метода. Приложение вызывает их из своего фрейма, а поле ввода меняет сам Битрикс24. Доступ к интерфейсу мессенджера приложению не нужен.

#|
|| **Метод** | **Что делает** ||
|| [im:getImTextareaContent](#get-im-textarea-content) | Возвращает текст, который пользователь набрал в поле ввода ||
|| [im:setImTextareaContent](#set-im-textarea-content) | Вставляет в поле ввода текст приложения ||
|#

Отправить сообщение методы не могут: текст остается в поле ввода, пока пользователь не нажмет «Отправить». Собственный scope методам не нужен — они не обращаются к REST API.

Методы вызывают через пространство имен `$b24.parent.message` библиотеки [B24JsSDK](./index.md). Оно доступно с версии 1.1.0, примеры на этой странице даны для второй мажорной версии.

## Условия работы методов {#usage-conditions}

- приложение открыто внутри фрейма Битрикс24. Битрикс24 принимает сообщения только с адреса зарегистрированного приложения, остальные игнорирует
- SDK инициализирован через [initializeB24Frame()](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/frame-initialize-b24-frame/)
- встройка открыта в мессенджере, и в нем открыт чат. Подходят точки встраивания [IM_TEXTAREA](../../api-reference/widgets/im/textarea.md), [IM_SIDEBAR](../../api-reference/widgets/im/sidebar.md) и [IM_CONTEXT_MENU](../../api-reference/widgets/im/context-menu.md). Чтобы зарегистрировать любую из них методом [placement.bind](../../api-reference/widgets/placement-bind.md), приложению нужны scope `placement` и `im`
- пользователь работает в веб-версии Битрикс24. В мобильном приложении обработчика этих методов нет — встройка [IMMOBILE_CONTEXT_MENU](../../api-reference/widgets/mobile-app.md) ответа не получит

Из [IM_NAVIGATION](../../api-reference/widgets/im/navigation.md) текущий чат не определяется, но обработчик на месте и отвечает. Ошибки не будет: `im:getImTextareaContent` вернет пустую строку, а `im:setImTextareaContent` ответит `success: true`, хотя текст в поле ввода не появится.

Если встройка открыта там, где мессенджер не загружен, обработчика нет вовсе: ответ не придет, и вызов завершится по таймауту `isSafely`.

## Формат вызова

```js
$b24.parent.message.send(method, params)
```

Первым параметром идет имя метода, вторым — объект с его параметрами. Состав объекта разобран в разделах методов ниже.

Вызов возвращает промис. Битрикс24 отвечает объектом, и промис завершается этим объектом — и при успехе, и при ошибке обработчика. Исключением ошибка обработчика не приходит, а тип результата SDK не описывает, поэтому исход определяйте по набору полей в ответе.

Битрикс24 принимает сообщение, только когда имя метода известно, а `requestId` — непустая строка. Иначе сообщение отбрасывается молча: ответа не будет, а промис без `isSafely` останется незавершенным. Поэтому вызывайте методы с `isSafely: true`.

`isSafely` и `safelyTime` обрабатывает сам SDK: в Битрикс24 они не уходят и на работу метода не влияют — ими задается только поведение промиса, когда ответа нет.

Параллельные вызовы разбирать вручную не нужно: SDK помечает каждое сообщение своим служебным ключом и возвращает ответ в тот промис, который его ждет. Битрикс24 возвращает `requestId` без изменений — он нужен вам, чтобы узнать свой запрос в логах.

Из [BX24.js](../bx24-js-sdk/index.md) эти методы не вызвать. Функция `BX24.placement.call()` отправляет сообщение без поля `requestId`, а такое сообщение Битрикс24 отбрасывает — работать с полем ввода мессенджера можно только через B24JsSDK.

## Метод im:getImTextareaContent {#get-im-textarea-content}

Метод `im:getImTextareaContent` возвращает текущий текст из поля ввода активного чата.

### Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **requestId***
[`string`](../../api-reference/data-types.md) | Идентификатор запроса, непустая строка: при пустом значении Битрикс24 отбрасывает сообщение и ответа не присылает. В ответе значение возвращается без изменений. Создайте его через [B24Js.Text.getUuidRfc4122()](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/tools-text#identifiers) ||
|| **isSafely**
[`boolean`](../../api-reference/data-types.md) | Ограничивает ожидание ответа таймаутом. Если `true`, промис завершится, даже когда Битрикс24 не ответил. Значение по умолчанию — `false` ||
|| **safelyTime**
[`integer`](../../api-reference/data-types.md) | Сколько ждать ответ в миллисекундах. Работает только вместе с `isSafely: true`. Значение по умолчанию — `900` ||
|#

### Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Прочитать черновик пользователя и вывести его в консоль:

{% list tabs %}

- JS (TS)

    ```ts
    // Модуль ESM: await на верхнем уровне работает в сборщике или при type="module"
    import { initializeB24Frame, Text } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const responseGet = await $b24.parent.message.send(
        'im:getImTextareaContent',
        {
            requestId: Text.getUuidRfc4122(),
            isSafely: true,
            safelyTime: 1500
        }
    )

    if (typeof responseGet.text === 'string') {
        console.log(responseGet.text)
    }
    ```

- JS (UMD)

    ```js
    // UMD-сборка подключена тегом script, все доступно через переменную B24Js
    const $b24 = await B24Js.initializeB24Frame()

    const responseGet = await $b24.parent.message.send(
        'im:getImTextareaContent',
        {
            requestId: B24Js.Text.getUuidRfc4122(),
            isSafely: true,
            safelyTime: 1500
        }
    )

    if (typeof responseGet.text === 'string') {
        console.log(responseGet.text)
    }
    ```

{% endlist %}

### Обработка ответа

```json
{
    "requestId": "019323ac-8ace-725b-a3dc-6a7c333da066",
    "text": "Добрый день! Уточните, пожалуйста, номер заказа"
}
```

Ответы, в которых поля `text` нет, разобраны в разделе [Обработка ошибок](#errors).

#### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **requestId**
[`string`](../../api-reference/data-types.md) | Идентификатор запроса, переданный в вызове ||
|| **text**
[`string`](../../api-reference/data-types.md) | Текст из поля ввода активного чата, как его набрал пользователь. Пустая строка приходит, когда поле пустое или текущий чат не определен ||
|#

## Метод im:setImTextareaContent {#set-im-textarea-content}

Метод `im:setImTextareaContent` вставляет текст в поле ввода активного чата.

### Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **requestId***
[`string`](../../api-reference/data-types.md) | Идентификатор запроса, непустая строка: при пустом значении Битрикс24 отбрасывает сообщение и ответа не присылает. В ответе значение возвращается без изменений. Создайте его через [B24Js.Text.getUuidRfc4122()](https://bitrix-tools.github.io/b24jssdk/docs/working-with-the-rest-api/tools-text#identifiers) ||
|| **text**
[`string`](../../api-reference/data-types.md) | Текст для вставки в поле ввода. Метод записывает значение целиком и длину не ограничивает, но сообщение длиннее 20 000 символов Битрикс24 обрежет при отправке. Значение по умолчанию — пустая строка: пустой `text` вместе с `replace: true` очищает поле ввода ||
|| **withNewLine**
[`boolean`](../../api-reference/data-types.md) | Если `true`, текст дописывается в конец набранного с новой строки, независимо от позиции курсора. Значение по умолчанию — `false`: текст встает в позицию курсора и отделяется от соседнего текста пробелами, а выделенный фрагмент заменяется. В пустом поле ввода параметр ни на что не влияет ||
|| **replace**
[`boolean`](../../api-reference/data-types.md) | Если `true`, поле ввода очищается и в нем остается только переданный текст — значение `withNewLine` в этом случае роли не играет. Если `false`, набранный пользователем текст сохраняется, а новый добавляется к нему по правилу из `withNewLine`. Значение по умолчанию — `false` ||
|| **isSafely**
[`boolean`](../../api-reference/data-types.md) | Ограничивает ожидание ответа таймаутом. Если `true`, промис завершится, даже когда Битрикс24 не ответил. Значение по умолчанию — `false` ||
|| **safelyTime**
[`integer`](../../api-reference/data-types.md) | Сколько ждать ответ в миллисекундах. Работает только вместе с `isSafely: true`. Значение по умолчанию — `900` ||
|#

### Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Дописать текст в конец черновика с новой строки, не стирая набранное пользователем:

{% list tabs %}

- JS (TS)

    ```ts
    // Модуль ESM: await на верхнем уровне работает в сборщике или при type="module"
    import { initializeB24Frame, Text } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const responseSet = await $b24.parent.message.send(
        'im:setImTextareaContent',
        {
            requestId: Text.getUuidRfc4122(),
            text: 'Заказ №1024 отправлен, трек-номер придет в течение дня',
            withNewLine: true,
            replace: false,
            isSafely: true,
            safelyTime: 1500
        }
    )

    if (responseSet.success !== true) {
        console.log('Текст вставить не удалось', responseSet)
    }
    ```

- JS (UMD)

    ```js
    // UMD-сборка подключена тегом script, все доступно через переменную B24Js
    const $b24 = await B24Js.initializeB24Frame()

    const responseSet = await $b24.parent.message.send(
        'im:setImTextareaContent',
        {
            requestId: B24Js.Text.getUuidRfc4122(),
            text: 'Заказ №1024 отправлен, трек-номер придет в течение дня',
            withNewLine: true,
            replace: false,
            isSafely: true,
            safelyTime: 1500
        }
    )

    if (responseSet.success !== true) {
        console.log('Текст вставить не удалось', responseSet)
    }
    ```

{% endlist %}

### Обработка ответа

```json
{
    "requestId": "019323ac-8ace-725b-a3dc-6a7c333da066",
    "success": true
}
```

Ответы, в которых поля `success` нет, разобраны в разделе [Обработка ошибок](#errors).

#### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **requestId**
[`string`](../../api-reference/data-types.md) | Идентификатор запроса, переданный в вызове ||
|| **success**
[`boolean`](../../api-reference/data-types.md) | Всегда `true`. Поле подтверждает, что Битрикс24 принял вызов, а не что текст оказался в поле ввода: если текущий чат не определен, ответ все равно будет `true`. Проверить результат можно вызовом [im:getImTextareaContent](#get-im-textarea-content) ||
|#

## Оба метода в одном сценарии

Приложение забирает набранный текст, обрабатывает его на своей стороне и возвращает результат в поле ввода. Пример переписывает черновик пользователя в верхнем регистре.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS (TS)

    ```ts
    import { initializeB24Frame, Text } from '@bitrix24/b24jssdk'

    async function rewriteDraft(): Promise<void> {
        const $b24 = await initializeB24Frame()

        const responseGet = await $b24.parent.message.send(
            'im:getImTextareaContent',
            {
                requestId: Text.getUuidRfc4122(),
                isSafely: true,
                safelyTime: 1500
            }
        )

        // Ошибка и таймаут приходят без поля text
        if (typeof responseGet.text !== 'string') {
            console.log('Текст получить не удалось', responseGet)
            return
        }

        // Пустая строка означает, что поле пустое или чат не определен
        if (responseGet.text.length === 0) {
            return
        }

        const responseSet = await $b24.parent.message.send(
            'im:setImTextareaContent',
            {
                text: responseGet.text.toUpperCase(),
                requestId: Text.getUuidRfc4122(),
                replace: true,
                isSafely: true,
                safelyTime: 1500
            }
        )

        if (responseSet.success !== true) {
            console.log('Текст вставить не удалось', responseSet)
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        rewriteDraft().catch((error) => console.log('Не удалось запустить встройку', error))
    })
    ```

- JS (UMD)

    ```js
    // UMD-сборка подключена тегом script, все доступно через переменную B24Js
    async function rewriteDraft() {
        const $b24 = await B24Js.initializeB24Frame()

        const responseGet = await $b24.parent.message.send(
            'im:getImTextareaContent',
            {
                requestId: B24Js.Text.getUuidRfc4122(),
                isSafely: true,
                safelyTime: 1500
            }
        )

        // Ошибка и таймаут приходят без поля text
        if (typeof responseGet.text !== 'string') {
            console.log('Текст получить не удалось', responseGet)
            return
        }

        // Пустая строка означает, что поле пустое или чат не определен
        if (responseGet.text.length === 0) {
            return
        }

        const responseSet = await $b24.parent.message.send(
            'im:setImTextareaContent',
            {
                text: responseGet.text.toUpperCase(),
                requestId: B24Js.Text.getUuidRfc4122(),
                replace: true,
                isSafely: true,
                safelyTime: 1500
            }
        )

        if (responseSet.success !== true) {
            console.log('Текст вставить не удалось', responseSet)
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        rewriteDraft().catch((error) => console.log('Не удалось запустить встройку', error))
    })
    ```

{% endlist %}

## Обработка ошибок {#errors}

Кодов ошибок методы не возвращают. Исход вызова определяют по набору полей в ответе.

#|
|| **Исход** | **Как отличить** ||
|| Успешный ответ | Есть поле `text` у [im:getImTextareaContent](#get-im-textarea-content) или `success` у [im:setImTextareaContent](#set-im-textarea-content) ||
|| Ошибка обработчика | Есть поле `message` ||
|| Ответа не было | Есть поле `isSafely` ||
|| Ответа не будет вовсе | Промис не завершается: вызов сделан без `isSafely`, а сообщение Битрикс24 отбросил ||
|| Фрейм уничтожен | Промис отклоняется ошибкой `SdkError` с кодом `JSSDK_FRAME_DISPOSED` ||
|#

Сбой инициализации в этот перечень не входит: вне фрейма Битрикс24 промис `initializeB24Frame()` отклоняется ошибкой `SdkError` с кодом `JSSDK_CLIENT_SIDE_WARNING` еще до вызова методов. Как это обработать, описано на странице [Установка и использование B24JsSDK](./index.md).

### Ошибка обработчика

Битрикс24 принял вызов, но обработчик завершился исключением. Его текст приходит в поле `message`. Штатного сценария, который к этому приводит, нет: неопределенный чат к ошибке не ведет, такой случай разобран в разделе [Условия работы методов](#usage-conditions).

```json
{
    "requestId": "019323ac-8ace-725b-a3dc-6a7c333da066",
    "message": "Cannot read properties of undefined"
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **requestId**
[`string`](../../api-reference/data-types.md) | Идентификатор запроса, переданный в вызове ||
|| **message**
[`string`](../../api-reference/data-types.md) | Текст ошибки JavaScript. Значение приходит от браузера, поэтому формулировка может меняться — не используйте текст ошибки как условие в коде ||
|#

### Ответа не было

Битрикс24 не ответил за `safelyTime`. Так бывает, если сообщение отбросили из-за пустого `requestId` или встройка открыта там, где мессенджер не загружен. Поля `requestId` в таком объекте нет: его формирует не Битрикс24, а сам SDK по своему таймеру.

```json
{
    "isSafely": true
}
```

### Фрейм уничтожен

Единственный случай, когда вызов приходит исключением: приложение уничтожило фрейм методом `destroy()`, не дождавшись ответа. SDK отклоняет все незавершенные вызовы ошибкой `SdkError` с кодом `JSSDK_FRAME_DISPOSED`. С этим сталкиваются встройки на Vue, React и Nuxt, если компонент размонтируется во время запроса — оборачивайте вызов в `try/catch` или вешайте `catch()` на промис.

## Пример реализации

Скачайте [пример встройки](https://helpdesk.bitrix24.ru/examples/iframe_content.zip) — он показывает оба метода в работе.

### Как устроен пример

1. SDK подключается в браузере через UMD-скрипт `@bitrix24/b24jssdk`.
2. При загрузке страницы вызывается `B24Js.initializeB24Frame()`.
3. Кнопка Get text отправляет `im:getImTextareaContent` и показывает поле `text` из ответа.
4. Кнопка Set text отправляет `im:setImTextareaContent` и вставляет текст в поле ввода чата.
5. Флаги `withNewLine` и `replace` берутся из чекбоксов в форме.
6. Результаты запросов выводятся в блок `#log` и в `console`.

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../../api-reference/widgets/im/index.md)
- [{#T}](../../api-reference/widgets/im/textarea.md)
- [{#T}](../../api-reference/widgets/im/sidebar.md)
- [{#T}](../../api-reference/widgets/im/context-menu.md)
- [{#T}](../../api-reference/widgets/placement-bind.md)
- [{#T}](../../api-reference/widgets/ui-interaction/index.md)
