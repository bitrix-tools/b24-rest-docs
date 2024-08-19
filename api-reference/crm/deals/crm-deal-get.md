#  Получение сделки по Id

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

{% note info "crm.deal.get" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.deal.get` возвращает сделку по идентификатору.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор сделки. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.deal.get",
    { id: id },
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


{% note tip "Связанные методы и темы" %}

[{#T}](./recurring-deals/crm-deal-recurring-get.md)

{% endnote %}