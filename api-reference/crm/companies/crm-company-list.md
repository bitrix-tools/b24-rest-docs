# Получение списка компаний по фильтру

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.company.list" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.company.list` возвращает список компаний по фильтру. Является реализацией списочного метода для компаний.

При выборке используйте маски:
- "*" - для выборки всех полей (без пользовательских и множественных)
- "UF_*" - для выборки всех пользовательских полей (без множественных)

Маски для выборки множественных полей нет. Для выборки множественных полей укажите нужные в списке выбора ("PHONE", "EMAIL" и так далее).

## Параметры

См. описание [списочных методов](../../how-to-call-rest-api/list-methods-pecularities.md).

## Примеры

**Поиск компаний по сфере деятельности и типу**

```js
BX24.callMethod(
    "crm.company.list",
    {
        order: { "DATE_CREATE": "ASC" },
        filter: { "INDUSTRY": "MANUFACTURING", "COMPANY_TYPE": "CUSTOMER" },
        select: [ "ID", "TITLE", "CURRENCY_ID", "REVENUE" ]
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

**Поиск компании по телефону**

```js
BX24.callMethod(
    "crm.company.list",
    {
        filter: { "PHONE": "555888" },
        select: [ "ID", "TITLE" ]
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