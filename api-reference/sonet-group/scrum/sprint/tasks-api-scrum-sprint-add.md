# Добавление спринта в Скрам

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

{% note info "tasks.api.scrum.sprint.add" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.sprint.add` добавляет спринт в Скрам.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **fields**
[`unknown`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.sprint.getFields](./tasks-api-scrum-sprint-get-fields.md).
Поле `groupId` обязательное. 
Доступные значения для полей дат `dateStart` и `dateEnd`: ('ISO 8601', timestamp). 
Доступные значения для поля `status`: ('active', 'planned', 'completed'). ||
|#

## Пример

```js
const groupId = 1;
const name = 'Sprint 1';
const createdBy = 1;
const sort = 1;
const status = 'planned';
const dateStart = '2021-11-22T00:00:00+02:00';
const dateEnd = '2021-11-29T00:00:00+02:00';
BX24.callMethod(
    'tasks.api.scrum.sprint.add',
    {
         fields:{
            name: name,
            groupId: groupId,
            createdBy: createdBy,
            sort: sort,
            status: status,
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