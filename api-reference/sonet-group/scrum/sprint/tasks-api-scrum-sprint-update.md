# Изменение спринта

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

{% note info "tasks.api.scrum.sprint.update" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.sprint.update` изменяет спринт.

Все поля спринта доступны для обновления. Необновляемые поля можно не передавать.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **fields**
[`unknown`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.sprint.getFields](./tasks-api-scrum-sprint-get-fields.md).
Доступные значения для полей дат `dateStart` и `dateEnd`: ('ISO 8601', timestamp). 
Доступные значения для поля `status`: ('active', 'planned', 'completed'). ||
|#

## Пример

```js
const sprintId = 2;
const groupId = 1;
const name = 'Sprint 2';
const dateStart = '2021-11-22T00:00:00+02:00';
const dateEnd = '2021-11-29T00:00:00+02:00';
BX24.callMethod(
    'tasks.api.scrum.sprint.update',
    {
        id: sprintId,
        fields:{
            name: name,
            groupId: groupId,
            dateStart: dateStart,
            dateEnd: dateEnd,
        }
    },
    function(res)
    {
        console.log(res);
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}