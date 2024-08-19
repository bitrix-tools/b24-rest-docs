# Получение полей спринта по его идентификатору

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note info "tasks.api.scrum.sprint.get" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.sprint.get` возвращает значения полей спринта по его идентификатору.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **sprintId**
[`unknown`](../../../data-types.md) | Идентификатор спринта. ||
|#

## Пример

```js
const sprintId = 2;
BX24.callMethod(
    'tasks.api.scrum.sprint.get',
    {
        id: sprintId,
    },
    function(res)
    {
        console.log(res);
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}