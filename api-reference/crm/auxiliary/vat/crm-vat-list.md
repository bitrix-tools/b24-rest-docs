# Получить список ставок НДС по фильтру crm.vat.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки и успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Возвращает список ставок НДС по фильтру. Является реализацией списочного метода для ставок НДС.

Cмотри описание [списочных методов](../../../../api-reference/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры

```javascript
BX24.callMethod(
    "crm.vat.list",
    {
        "order": { "ID": "ASC" },
        "filter": { "ACTIVE": "Y" },
        "select": [ "ID", "NAME", "RATE" ]
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
