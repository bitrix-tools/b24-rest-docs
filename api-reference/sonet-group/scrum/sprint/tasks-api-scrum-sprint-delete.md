# Удаление спринта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note info "tasks.api.scrum.sprint.delete" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.sprint.delete` удаляет спринт.

При удалении спринта с задачами задачи будут перемещены в бэклог.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`unknown`](../../../data-types.md) | Идентификатор спринта. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

```js
const sprintId = 1;
BX24.callMethod(
    'tasks.api.scrum.sprint.delete',
    {
        id: sprintId
    },
    function(res)
    {
        console.log(res);
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}