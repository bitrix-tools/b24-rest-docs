# Получить размеры фрейма BX24.getScrollSize

Метод `BX24.getScrollSize` возвращает размеры содержимого текущего фрейма в виде объекта с полями `scrollWidth` и `scrollHeight`.

```js
Object BX24.getScrollSize()
```

## Параметры

Без параметров.

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const size = BX24.getScrollSize();
    console.log(size.scrollWidth, size.scrollHeight);
});
```

## Обработка ответа

Метод синхронно возвращает объект с размерами содержимого.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../api-reference/data-types.md) | Объект с размерами содержимого фрейма [(подробное описание)](#result) ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **scrollWidth**
[`integer`](../../../api-reference/data-types.md) | Ширина содержимого фрейма в пикселях ||
|| **scrollHeight**
[`integer`](../../../api-reference/data-types.md) | Высота содержимого фрейма в пикселях ||
|#

## Продолжите изучение

- [{#T}](./bx24-resize-window.md)
- [{#T}](./bx24-fit-window.md)
