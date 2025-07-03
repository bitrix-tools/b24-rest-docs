# Установить общую карточку для всех пользователей crm.company.details.configuration.forceCommonScopeForAll

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

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.company.details.configuration.forceCommonScopeForAll` позволяет принудительно установить общую карточку компаний для всех пользователей.

Без параметров

## Примеры

{% list tabs %}

- JS
  
    ```js
    //---
    //Установить общую карточку компаний для всех пользователей.
    BX24.callMethod(
        "crm.company.details.configuration.forceCommonScopeForAll",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    //---
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}