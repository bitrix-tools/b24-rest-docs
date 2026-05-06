# Вызвать интерфейс регистрации нового обработчика события callBind

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

```js
BX24.callBind(
    String event,
    String handler[
        Integer auth_type[
            Function callback
        ]
    ]
);
```

Интерфейс для метода [event.bind](../../../api-reference/events/event-bind.md), регистрирующего новый обработчик [события](../../../api-reference/common/events/index.md).

{% note info %}

Работает только при авторизации под пользователем с правами **администрирования портала**.

{% endnote %}

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../api-reference/data-types.md) | Имя события ||
|| **handler***
[`string`](../../../api-reference/data-types.md) | Ссылка на обработчик события ||
|| **auth_type**
[`integer`](../../../api-reference/data-types.md) | Идентификатор пользователя, под которым авторизуется обработчик события. По умолчанию будет использоваться авторизация пользователя, действия которого привели к срабатыванию события ||
|| **callback**
[`function`](../../../api-reference/data-types.md) | Функция-обработчик результата вызова метода ||
|#

## Пример

```http
BX24.callBind('OnAppUninstall', 'http://www.my-domain.ru/handler/');
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-call-unbind.md)
- [{#T}](./bx24-call-method.md)
- [{#T}](./bx24-call-batch.md)