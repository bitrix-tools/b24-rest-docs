# Добавить комментарий в результат tasks.task.result.addFromComment

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметра
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

Метод `tasks.task.result.addFromComment` создаёт результат задачи из комментария.

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **commentId**
[`int`](../../data-types.md) | Идентификатор комментария. ||
|#

## Пример

```js
BX.ajax.runAction("tasks.task.result.addFromComment", {
    data: {
        commentId: 100500
    }
}).then(function (response) { console.log(response);});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}