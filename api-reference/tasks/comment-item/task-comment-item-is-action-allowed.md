# Проверить доступные действия над задачей task.commentitem.isactionallowed

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.commentitem.isactionallowed` проверяет, разрешено ли действие.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **TASKID^*^**
[`unknown`](../../data-types.md) | Идентификатор задачи. ||
|| **ITEMID^*^**
[`unknown`](../../data-types.md) | Идентификатор комментария. ||
|| **ACTIONID^*^**
[`unknown`](../../data-types.md) | Идентификатор проверяемого действия:
- `1` — ACTION_COMMENT_ADD; 
- `2` — ACTION_COMMENT_MODIFY; 
- `3` — ACTION_COMMENT_REMOVE. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% note info %}

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

{% endnote %}

## Пример

```js
BX24.callMethod(
    'task.commentitem.isactionallowed',
    [13, 1205, 3],
    function(result){
        console.info(result.data());
        console.log(result);
    }
);
```
{% include [Сноска о примерах](../../../_includes/examples.md) %}