# Взаимодействие встройки с полем ввода мессенджера

Для работы с текстом в поле ввода чата используйте методы `$b24.parent.message.send`.
Это удобно, когда нужно:

- получить текущий текст из чата
- подставить подготовленный текст в поле ввода
- сделать это безопасно, без прямой работы с интерфейсом мессенджера

## Формат вызова

```js
$b24.parent.message.send(method, params)
```

## Что нужно перед вызовами

1. Приложение должно быть запущено внутри фрейма Битрикс24.
2. SDK должен быть инициализирован через [initializeB24Frame()](https://bitrix-tools.github.io/b24jssdk/reference/frame-initialize-b24-frame.html).

Пример:

```js
const $b24 = await B24Js.initializeB24Frame()
```


## Метод im:getImTextareaContent

Метод `im:getImTextareaContent` возвращает текущий текст из поля ввода активного чата.

### Параметры

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **requestId***  
`string` | Уникальный ID запроса. Создайте через [B24Js.Text.getUuidRfc4122()](https://bitrix-tools.github.io/b24jssdk/reference/tools-text.html#getuuidrfc4122) ||
|| **isSafely**  
`boolean` | Если `true`, применяется таймаут ожидания ответа. Используйте вместе с `safelyTime`. 
Если `false`, таймаут по этому параметру не применяется ||
|| **safelyTime**  
`integer` | Сколько ждать ответ в миллисекундах ||
|#

### Пример

```js
const responseGet = await $b24.parent.message.send(
    'im:getImTextareaContent',
    {
        requestId: B24Js.Text.getUuidRfc4122(),
        isSafely: true,
        safelyTime: 1500
    }
)
```

В `responseGet` придет текст из поля ввода.
Если возникает ошибка, в ответе приходит объект с полями:

- `message` — текст ошибки (системное сообщение JavaScript)
- `requestId` — тот же `requestId`, который был передан в запросе

Возможные причины ошибки:

- не удалось определить текущий диалог
- текстовое поле недоступно

## Метод im:setImTextareaContent

Метод `im:setImTextareaContent` вставляет текст в поле ввода активного чата.

### Параметры

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **text***  
`string` | Текст для вставки в поле ввода ||
|| **requestId***  
`string` | Уникальный ID запроса. Создайте через [`B24Js.Text.getUuidRfc4122()`](https://bitrix-tools.github.io/b24jssdk/reference/tools-text.html#getuuidrfc4122) ||
|| **withNewLine**  
`boolean` | Если `true`, текст добавится с новой строки ||
|| **replace**  
`boolean` | Если `true`, текущее содержимое поля будет полностью заменено ||
|| **isSafely**  
`boolean` | Если `true`, применяется таймаут ожидания ответа. Используйте вместе с `safelyTime`. 
Если `false`, таймаут по этому параметру не применяется ||
|| **safelyTime**  
`integer` | Сколько ждать ответ в миллисекундах ||
|#

### Пример

```js
const responseSet = await $b24.parent.message.send(
    'im:setImTextareaContent',
    {
        text: 'Hello from iframe!',
        requestId: B24Js.Text.getUuidRfc4122(),
        withNewLine: false,
        replace: true,
        isSafely: true,
        safelyTime: 1500
    }
)
```

В `responseSet` придет результат вставки.
Если возникает ошибка, в ответе приходит объект с полями:

- `message` — текст ошибки (системное сообщение JavaScript)
- `requestId` — тот же `requestId`, который был передан в запросе

Возможные причины ошибки:

- не удалось определить текущий диалог
- текстовое поле недоступно

## Пример реализации

Пример встройки, демонстрирующей оба метода — [скачать](https://helpdesk.bitrix24.ru/examples/iframe_content.zip).

### Как устроен пример

1. SDK подключается в браузере через UMD-скрипт `@bitrix24/b24jssdk`.
2. При загрузке страницы вызывается `B24Js.initializeB24Frame()`.
3. Кнопка **Get text** отправляет `im:getImTextareaContent` и получает текущий текст поля ввода.
4. Кнопка **Set text** отправляет `im:setImTextareaContent` и вставляет текст в чат.
5. Флаги `withNewLine` и `replace` берутся из чекбоксов в форме.
6. Результаты запросов выводятся в блок `#log` и в `console`.
