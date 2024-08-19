# Получение товаров сделки

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.deal.productrows.get" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.deal.productrows.get` возвращает товарные позиции сделки.

Возвращаемые товарные позиции могут быть следующих типов (поле **TYPE**):

- `1` – простой товар;
- `4` – торговое предложение/вариация.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор сделки. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.deal.productrows.get",
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