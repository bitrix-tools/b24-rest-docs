# Проверка разрешения действия

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не хватает примеров (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "task.checklistitem.isactionallowed" %}

**Scope**: [`task`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `task.checklistitem.isactionallowed` проверяет, разрешено ли действие.

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **TASKID^*^**
[`unknown`](../../data-types.md) | Идентификатор задачи. ||
|| **ITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор элемента чек-листа. ||
|| **ACTIONID^*^**
[`unknown`](../../data-types.md) | Идентификатор проверяемого действия:
- **1** - ACTION_TIME_ADD;
- **2** - ACTION_MODIFY;
- **3** - ACTION_REMOVE;
- **4** - ACTION_TOGGLE. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```js
// Для элемента с ID=21 проверяем, разрешено ли действие его изменения
BX24.callMethod(
    'task.checklistitem.isactionallowed',
    [13, 21, 2],
    function(result){
        console.info(result.data());
        console.log(result);
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}