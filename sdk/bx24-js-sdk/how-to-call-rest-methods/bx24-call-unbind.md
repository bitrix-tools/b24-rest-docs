# Вызвать интерфейс удаления зарегистрированного обработчика события BX24.callUnbind

```js
BX24.callUnbind(
    String event,
    String handler[
        Integer auth_type[
            Function callback
        ]
    ]
);
```

Интерфейс для метода [event.unbind](../../../api-reference/events/event-unbind.md), удаляющего зарегистрированный обработчик [события](../../../api-reference/common/events/index.md).

{% note info %}

Работает только при авторизации под пользователем с правами администрирования портала.

{% endnote %}

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event**
[`string`](../../../api-reference/data-types.md) | Имя события ||
|| **handler**
[`string`](../../../api-reference/data-types.md) | Ссылка на обработчик события||
|| **auth_type**
[`integer`](../../../api-reference/data-types.md) | Идентификатор пользователя, под которым авторизуется обработчик события. 

{% note info %}

Если требуется удалить обработчики события, установленные с пустым *auth_type* (с авторизацией от имени пользователя, вызвавшего событие), но оставить остальные обработчики, указывайте *auth_type=0* или пустое значение параметра. Если требуется удалить обработчики события для всех пользователей, указывайте значение *null*.

{% endnote %}

 ||
|| **callback**
[`function`](../../../api-reference/data-types.md) | Функция-обработчик результата вызова метода ||
|#

## Пример

```js
BX24.callUnbind('OnAppUninstall', 'http://www.my-domain.ru/handler/');
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-call-bind.md)
- [{#T}](./bx24-call-method.md)
- [{#T}](./bx24-call-batch.md)