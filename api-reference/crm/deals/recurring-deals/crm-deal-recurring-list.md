# Получение списка настроек шаблонов регулярных сделок

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

{% note info "crm.deal.recurring.list" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.deal.recurring.list` возвращает список настроек шаблонов регулярных сделок по фильтру.

При выборке используйте маску "*" для выборки всех полей (без пользовательских и множественных).

См. описание [списочных методов](../../../how-to-call-rest-api/list-methods-pecularities.md).

## Пример

```js
BX24.callMethod(
    "crm.deal.recurring.list",
    {
        order: { "DEAL_ID": "ASC" },
        filter: { ">COUNTER_REPEAT": 5 },
        select: [ "ID", "DEAL_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "CATEGORY_ID", "IS_LIMIT" ]
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}