# Получение списка сделок

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

{% note info "crm.deal.list" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.deal.list` Возвращает список сделок по фильтру. Является реализацией списочного метода для сделок.

При выборке используйте маски:
- "*" - для выборки всех полей (без пользовательских и множественных)
- "UF_*"- для выборки всех пользовательских полей (без множественных)

Cм. описание [списочных методов](../../how-to-call-rest-api/list-methods-pecularities.md).

## Примеры

Пример выводит данные в консоль. Если нужно вывести данные по другому, то реализуйте свою обработку данных возвращенных вызовами **result.data()** и **result.error()**.

```js
BX24.callMethod(
    "crm.deal.list",
    {
        order: { "STAGE_ID": "ASC" },
        filter: { ">PROBABILITY": 50 },
        select: [ "ID", "TITLE", "STAGE_ID", "PROBABILITY", "OPPORTUNITY", "CURRENCY_ID" ]
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

Поиск по нескольким стадиям сразу:

```js
filter: {"=STAGE_ID": ["C5:NEW", "C5:3", "C5:PREPARATION", "C5:PREPAYMENT_INVOICE", "C5:2", "C5:4"] }
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}


{% note tip "Связанные методы и темы" %}

[{#T}](./recurring-deals/crm-deal-recurring-list.md)

{% endnote %}