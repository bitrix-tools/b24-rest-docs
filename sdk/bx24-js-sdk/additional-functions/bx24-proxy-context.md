# Получить контекст выполнения прокси-функции BX24.proxyContext

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Метод `BX24.proxyContext` возвращает исходный контекст вызова внутри прокси-функции, созданной через [BX24.proxy](./bx24-proxy.md). Вне такого вызова метод возвращает `null`.

```js
Object BX24.proxyContext()
```

## Параметры

Без параметров.

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const context = {
        onClick: function () {
            console.log(BX24.proxyContext());
        }
    };

    const button = document.getElementById('run-action');
    BX24.bind(button, 'click', BX24.proxy(context.onClick, context));
});
```

## Обработка ответа

Метод синхронно возвращает результат типа `object`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../api-reference/data-types.md) | Исходный контекст вызова прокси-функции. Если метод вызван вне прокси-функции, возвращается `null` ||
|#

## Продолжите изучение

- [{#T}](./bx24-proxy.md)
- [{#T}](./bx24-bind.md)
