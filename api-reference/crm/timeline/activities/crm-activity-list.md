# Получение списка дел

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

{% note info "crm.activity.list" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.activity.list` возвращает список активностей по фильтру. (Для получения COMMUNICATIONS его надо явно указать в select.) Является реализацией списочного метода для активностей.

## Параметры

Cм. описание [списочных методов](../../../how-to-call-rest-api/list-methods-pecularities.md).

## Примеры

{% list tabs %}

- cURL

    Как отфильтровать только универсальные дела.

    ```http
    /crm.activity.list.json?filter[PROVIDER_ID]=CRM_TODO
    ```

- JS

    В примере мы получаем список дел контакта с `ID` = 102.

    ```js
    BX24.callMethod(
        "crm.activity.list",
        {
            order: { "ID": "DESC" },
            filter:
            {
                "OWNER_TYPE_ID": 3,
                "OWNER_ID": 102
            },
            select: [ "*", "COMMUNICATIONS" ]
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

- PHP

    // пример для php

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}