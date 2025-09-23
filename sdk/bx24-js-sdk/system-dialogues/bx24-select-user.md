# Показать диалог одиночного выбора пользователя BX24.selectUser

```js
BX24.selectUser(callback: callable): void;
```

Метод `BX24.selectUser` показывает стандартный диалог одиночного выбора пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **callback***
[`callable`](../../../api-reference/data-types.md) | Функция обратного вызова.

Обработчик `callback` получит объект вида `{id: integer, name: string}`, где: 
- `id` — идентификатор пользователя
- `name` — отформатированное имя пользователя ||
|#

## Пример кода

```js
BX24.selectUser(
    function(params)
    {
        BX('student').value = params.name;
        BX('student_external_id').value = params.id;
    }
)
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-select-users.md)
- [{#T}](./bx24-select-access.md)
- [{#T}](./bx24-select-crm.md)