# Получить список задач из плана на день task.planner.getlist

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- параметров у метода нет?
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

Метод `task.planner.getlist` возвращает массив, содержащий идентификаторы задач в [плане на день](https://helpdesk.bitrix24.ru/open/17856080/).

{% note info %}

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

{% endnote %}

## Пример

```js
BX24.callMethod(
    'task.planner.getlist',
    [],
    function(result)
    {
        console.info(result.data());
        console.log(result);
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}