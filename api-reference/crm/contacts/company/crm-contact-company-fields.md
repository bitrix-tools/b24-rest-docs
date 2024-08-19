# Поля для связи контакт-компания

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (на других языках)
- отсутствуют возвращаемые данные
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.contact.company.fields" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.company.fields` возвращает для связи контакт-компания описание полей, используемых методами семейства `crm.contact.company.*`, то есть [crm.contact.company.items.get](./crm-contact-company-items-get.md), [crm.contact.company.items.set](./crm-contact-company-items-set.md), [crm.contact.company.add](./crm-contact-company-add.md) и т.д.

Без параметров.

## Пример

```js
BX24.callMethod(
    "crm.contact.company.fields",
    {},
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}