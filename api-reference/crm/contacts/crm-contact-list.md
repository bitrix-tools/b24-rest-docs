# Получение списка контактов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.contact.list" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.list` возвращает список контактов по фильтру. Является реализацией списочного метода для контактов.

При выборке используйте маски:
- "*" - для выборки всех полей (без пользовательских и множественных)
- "UF_*"- для выборки всех пользовательских полей (без множественных)

Маски для выборки множественных полей нет. Для выборки множественных полей укажите нужные в списке выбора ("PHONE", "EMAIL" и так далее).

Для получения списка компаний, привязанных к контакту используйте метод [crm.contact.company.items.get](./company/crm-contact-company-items-get.md).

{% note warning %}

Поля: телефон, почта, сайт, мессенджеры – множественные. По ним фильтры работают только на точное совпадение.

{% endnote %}

Cм. описание [списочных методов](../../how-to-call-rest-api/list-methods-pecularities.md).

## Пример

```js
BX24.callMethod(
    "crm.contact.list",
    {
        order: { "DATE_CREATE": "ASC" },
        filter: { "TYPE_ID": "CLIENT" },
        select: [ "ID", "NAME", "LAST_NAME", "TYPE_ID", "SOURCE_ID" ]
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
//Поиск контакта по телефону
BX24.callMethod(
    "crm.contact.list",
    {
        filter: { "PHONE": "555888" },
        select: [ "ID", "NAME", "LAST_NAME" ]
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

{% include [Сноска о примерах](../../../_includes/examples.md) %}