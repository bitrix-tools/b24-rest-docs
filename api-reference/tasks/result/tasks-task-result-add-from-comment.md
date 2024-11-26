# Добавить комментарий в результат tasks.task.result.addFromComment

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметра
- не хватает примеров (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.result.addFromComment` создаёт результат задачи из комментария.

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **commentId**
[`int`](../../data-types.md) | Идентификатор комментария. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'tasks.task.result.addFromComment',
        {
            "commentId" : 2549
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}