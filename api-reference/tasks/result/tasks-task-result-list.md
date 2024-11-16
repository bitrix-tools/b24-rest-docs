# Получить список результатов задачи tasks.task.result.list

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- не хватает примеров (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.result.list` позволяет просмотреть список результатов к задаче.

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **taskId**
[`int`](../../data-types.md) | Идентификатор задачи. ||
|#

## Пример

```js
BX24.callMethod(
    'tasks.task.result.list',
    {
        "taskId" : 7811
    },
    function(result) {
        if (result.error()) {
            console.error(result.error());
        } else {
            console.info(result.data());
        }
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}