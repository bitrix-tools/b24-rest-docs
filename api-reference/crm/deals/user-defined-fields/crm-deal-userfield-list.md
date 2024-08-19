# Получение списка пользовательских полей сделок

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.deal.userfield.list" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.deal.userfield.list` возвращает список пользовательских полей сделок по фильтру.

#|
|| **Параметр** | **Описание** ||
|| **order** | Поля сортировки. ||
|| **filter** | Поля фильтра. ||
|#

## Пример

```js
BX24.callMethod(
    "crm.deal.userfield.list",
    {
        order: { "SORT": "ASC" },
        filter: { "MANDATORY": "N" }
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

Как получить список полей с названиями:

```js
crm.deal.userfield.list
{
    order: { "SORT": "ASC" },
    filter: { LANG: 'ru' }
}
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}