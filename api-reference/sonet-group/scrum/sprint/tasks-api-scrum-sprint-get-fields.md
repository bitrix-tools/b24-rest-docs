# Список доступных полей спринта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note info "tasks.api.scrum.sprint.getFields" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.sprint.getFields` возвращает доступные поля спринта.

## Параметры

Без параметров.

## Пример

```js
BX24.callMethod(
    'tasks.api.scrum.sprint.getFields',
    {},
    function(res)
    {
        console.log(res);
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}