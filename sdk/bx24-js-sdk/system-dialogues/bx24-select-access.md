# Показать диалог выбора прав доступа BX24.selectAccess

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

```js
BX24.selectAccess(value: array, callback: callable): void;
BX24.selectAccess(callback: callable): void;
```

Функция `BX24.selectAccess` показывает стандартный диалог выбора прав доступа. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **value**
[`array`](../../../api-reference/data-types.md) | «Заблокированные» права доступа, которые не нужно выбирать (нестартовое значение) ||
|| **callback***
[`callable`](../../../api-reference/data-types.md) | Функция обратного вызова.

Обработчик `callback` получит массив объектов вида `{id: string, name: string}`, где: 
- `id` — идентификатор прав доступа. Примеры идентификаторов:
    - **U1** — пользователь с идентификатором 1
    - **SG4** — группа соцсети с идентификатором 4
    - **AU** — все авторизованные пользователи
- `name` — название права доступа ||
|#

## Пример кода

```js
BX24.selectAccess(
    function(params)
    {
        for (var i in params)
        {
            let param = params[i];
            BX('name' + i).value = param.name;
            BX('id'  + i).value = param.id;
        }
    }
)
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-select-user.md)
- [{#T}](./bx24-select-users.md)
- [{#T}](./bx24-select-crm.md)
- [Права доступа](http://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=43&LESSON_ID=2819)