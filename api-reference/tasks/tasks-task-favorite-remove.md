# Удалить задачу из Избранного tasks.task.favorite.remove

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.favorite.remove` удаляет задачу из Избранного.

В случае успешного выполнения возвращает параметр `true` (иначе `false`).


#|
|| **Параметр** / **Тип** | **Описание** ||
|| **taskId**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('tasks.task.favorite.remove', {taskId: 119}, (res)=>{console.log(res.answer.result);});
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
    "result": true,
    "time": {
        "start": 1552382402.930095,
        "finish": 1552382403.055257,
        "duration": 0.12516212463378906,
        "processing": 0.09590816497802734,
        "date_start": "2019-03-12T11:20:02+02:00",
        "date_finish": "2019-03-12T11:20:03+02:00"
    }
}
```