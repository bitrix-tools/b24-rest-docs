# Завершение активного спринта выбранного Скрама

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

{% note info "tasks.api.scrum.sprint.complete" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.sprint.complete` завершает активный спринт выбранного Скрама.

При завершении спринта незавершенные задачи переносятся в бэклог.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`unknown`](../../../data-types.md) | Идентификатор Скрама. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

```js
const groupId = 1;
BX24.callMethod(
    'tasks.api.scrum.sprint.complete',
    {
        id: groupId
    },
    function(res)
    {
        console.log(res);
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}