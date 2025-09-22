# Показать диалог множественного выбора пользователей BX24.selectUsers

```js
BX24.selectUsers(callback: callable): void;
```

Метод `BX24.selectUser` показывает стандартный диалог множественного выбора пользователей. Выводит только сотрудников компании.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **callback***
[`callable`](../../../api-reference/data-types.md) | Функция обратного вызова.

Обработчик `callback` получит массив объектов вида `{id: integer, name: string}`, где: 
- `id` — идентификатор пользователя
- `name` — отформатированное имя пользователя ||
|#

## Пример кода

```js

BX24.selectUsers(
    function(params)
    {
        for (var i in params)
        {
            let param = params[i];
            BX('student' + i).value = param.name;
            BX('student_external_id'  + i).value = param.id;
        }
    }
)
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-select-user.md)
- [{#T}](./bx24-select-access.md)
- [{#T}](./bx24-select-crm.md)