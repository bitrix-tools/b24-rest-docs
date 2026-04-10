# Получить прокси-функцию BX24.proxy

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Метод `BX24.proxy` создает прокси-функцию для вызова `func` в контексте `thisObject`. Метод аналогичен `BX.proxy`. При повторном вызове с теми же `func` и `thisObject` возвращается та же прокси-функция.

```js
Function BX24.proxy(Function func, Object thisObject)
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **func***
`function` | Исходная функция, для которой создается прокси ||
|| **thisObject***
`object` | Объект, который будет использоваться как `this` при вызове `func` ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const context = {
        value: 10,
        print: function (step) {
            console.log(this.value + step);
        }
    };

    const proxy = BX24.proxy(context.print, context);
    proxy(5); // 15
});
```

## Обработка ответа

Метод синхронно возвращает результат типа `function`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`function` | Прокси-функция для вызова `func` в контексте `thisObject` ||
|#

## Продолжите изучение

- [{#T}](./bx24-proxy-context.md)
- [{#T}](./bx24-bind.md)
