# Удалить почтовый сервис mailservice.delete

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует описание типов параметров
- нет примеров ответов

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `mailservice.delete` удаляет почтовый сервис.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** | **С версии** ||
|| **ID**
[`unknown`](../data-types.md) | Идентификатор почтового сервиса | ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "mailservice.delete",
        {
            'ID': 8
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}