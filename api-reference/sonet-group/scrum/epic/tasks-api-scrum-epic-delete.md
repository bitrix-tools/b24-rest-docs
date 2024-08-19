# Удаление эпика

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

{% note info "tasks.api.scrum.epic.delete" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.epic.delete` удаляет эпик.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`unknown`](../../../data-types.md) | Идентификатор эпика. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

```js
const epicId = 1;
BX24.callMethod(
    'tasks.api.scrum.epic.delete',
    {
        id: epicId
    },
    function(res)
    {
        console.log(res);
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}