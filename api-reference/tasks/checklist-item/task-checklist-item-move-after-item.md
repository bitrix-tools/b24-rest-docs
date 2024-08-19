# Перенос пункта чек-листа

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

{% note info "task.checklistitem.moveafteritem" %}

**Scope**: [`task`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `task.checklistitem.moveafteritem` помещает элемент чек-листа в списке после указанного.

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **TASKID^*^**
[`unknown`](../../data-types.md) | Идентификатор задачи. ||
|| **ITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор элемента чек-листа. ||
|| **AFTERITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор элемента чек-листа, после которого будет помещен заданный элемент. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% note info %}

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

{% endnote %}

## Пример

```js
BX24.callMethod(
    'task.checklistitem.moveafteritem',
    [13, 21, 9],
    function(result){
        console.info(result.data());
        console.log(result);
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}