# Установить функцию в качестве обработчика события BX24.bind

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Метод `BX24.bind` устанавливает функцию `func` в качестве обработчика события `eventName` для элемента страницы `element`.

```js
void BX24.bind(DOMNode element, String eventName, Function func)
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **element***
`DOMNode` | HTML-элемент страницы (DOM-элемент), для которого нужно установить обработчик ||
|| **eventName***
`string` | Название события. Для `mousewheel` дополнительно подключается `DOMMouseScroll`. Для `transitionend` дополнительно подключаются `webkitTransitionEnd`, `msTransitionEnd`, `oTransitionEnd` ||
|| **func***
`function` | Функция-обработчик события ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const button = document.getElementById('run-action');

    BX24.bind(button, 'click', function () {
        console.log('Кнопка нажата');
    });
});
```

## Обработка ответа

Метод не возвращает данные (`void`).

## Продолжите изучение

- [{#T}](./bx24-unbind.md)
- [{#T}](./bx24-ready.md)
