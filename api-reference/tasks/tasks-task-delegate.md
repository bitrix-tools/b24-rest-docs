# Делегировать задачу tasks.task.delegate

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.delegate` для делегирования задачи

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **taskId**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|| **userId**
[`unknown`](../data-types.md) | Идентификатор пользователя, на которого необходимо делегировать задачу. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'tasks.task.delegate',
        {taskId:1, userId: 2},
        function(res){console.log(res.answer.result);}
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}