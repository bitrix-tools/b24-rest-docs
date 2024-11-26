# Обновить пользовательское поле user.userfield.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- возможно, нужны параметры или поля и их типы
- не указана обязательность параметров
- отсутствуют примеры на др.языках
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
 
{% endnote %}

{% endif %}

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет пользовательское поле.

{% note info "" %}

**Внимание!** Поля MULTIPLE не редактируемые.

{% endnote %}

## Пример

{% list tabs %}

- PHP

    ```php
    CRest::call(
        'user.userfield.update',
        [
            'id' => 42,
            'fields' => [
                'LIST_FILTER_LABEL' => 'Title',
                'LIST_COLUMN_LABEL' => 'List Title',
            ],
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
