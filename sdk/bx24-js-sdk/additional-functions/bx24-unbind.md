# Отключить функцию в качестве обработчика события BX24.unbind

Метод `BX24.unbind` удаляет функцию `func` из обработчиков события `eventName` для элемента страницы `element`.

```js
void BX24.unbind(DOMNode element, String eventName, Function func)
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **element***
`DOMNode` | HTML-элемент страницы (DOM-элемент), для которого нужно удалить обработчик ||
|| **eventName***
`string` | Название события. Для `mousewheel` дополнительно удаляется обработчик `DOMMouseScroll` ||
|| **func***
`function` | Функция-обработчик, которую нужно удалить ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const button = document.getElementById('run-action');

    function onClick() {
        console.log('Кнопка нажата');
    }

    BX24.bind(button, 'click', onClick);
    BX24.unbind(button, 'click', onClick);
});
```

## Обработка ответа

Метод не возвращает данные (`void`).

## Продолжите изучение

- [{#T}](./bx24-bind.md)
- [{#T}](./bx24-ready.md)
