# Получить элемент справочника по его символьному идентификатору crm.status.entity.items

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

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
crm.status.entity.items()
```

Метод возвращает элементы справочника по его символьному идентификатору, упорядоченные по полю "SORT". Метод аналогичен [crm.status.list](crm-status-list.md), за исключением того, что в последнем можно определить правила сортировки.

#|
|| **Параметр** | **Описание** ||
|| **entityId^*^** | Символьный идентификатор справочника (может быть получен вызовом метода [crm.status.entity.types](crm-status-entity-types.md)). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
var id = prompt('Введите ID');
BX24.callMethod(
    "crm.status.entity.items",
    {
        entityId: id
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}