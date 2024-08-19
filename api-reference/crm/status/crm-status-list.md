# Возвращение списка элементов справочника по фильтру

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.status.list" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
crm.status.list()
```

Метод возвращает список элементов справочника по фильтру. Является реализацией списочного метода для элементов справочников. Обратите внимание, что в данной реализации параметры "select" и "navigation" не поддерживаются.

## Параметры

Cмотри описание [списочных методов](../../../api-reference/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры

```javascript
BX24.callMethod(
    "crm.status.list",
    {
        order: { "SORT": "ASC" },
        filter: { "ENTITY_ID": "STATUS" }
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