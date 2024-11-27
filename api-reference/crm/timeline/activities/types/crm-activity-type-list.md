# Получить список пользовательских типов дел crm.activity.type.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.type.list` получает список подтипов дел.

## Параметры

Без параметров

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'crm.activity.type.list',
        {
        },
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}