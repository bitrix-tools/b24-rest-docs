# Удалить пользовательское поле user.userfield.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют параметры или поля
- не указана обязательность параметров
- отсутствуют примеры на др.языках
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
 
{% endnote %}

{% endif %}

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет пользовательское поле.

{% list tabs %}

- PHP

    ```php
    CRest::call(
        'user.userfield.delete',
        [
            'id' => 42,
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
