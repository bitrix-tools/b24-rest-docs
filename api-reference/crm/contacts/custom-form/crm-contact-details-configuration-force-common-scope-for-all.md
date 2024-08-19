# Указание общей карточки для всех пользователей

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

{% note info "crm.contact.details.configuration.forceCommonScopeForAll" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.details.configuration.forceCommonScopeForAll` позволяет принудительно установить общую карточку контактов для всех пользователей.

Без параметров.

## Примеры

```js
//---
//Установить общую карточку контактов для всех пользователей.
BX24.callMethod(
    "crm.contact.details.configuration.forceCommonScopeForAll",
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}