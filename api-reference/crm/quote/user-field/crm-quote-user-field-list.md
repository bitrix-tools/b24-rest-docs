# Получить список пользовательских полей предложений по фильтру crm.quote.userfield.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно описать параметры здесь
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.quote.userfield.list` возвращает список пользовательских полей предложений по фильтру.

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **order**
[`unknown`](../../../data-types.md) | Поля сортировки. ||
|| **filter**
[`unknown`](../../../data-types.md) | Поля фильтра. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.quote.userfield.list",
        {
            order: { "SORT": "ASC" },
            filter: { "MANDATORY": "N" }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}