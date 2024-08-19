# Удаление комментария из результата

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

{% note info "tasks.task.result.deleteFromComment" %}

**Scope**: [`task`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.task.result.deleteFromComment` удаляет результат задачи по комментарию, из которого он был создан.

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **commentId**
[`int`](../../data-types.md) | Идентификатор комментария. ||
|#

## Пример

```js
BX.ajax.runAction("tasks.task.result.deleteFromComment", {
    data: {
        commentId: 100500
    }
}).then(function (response) { console.log(response);});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}