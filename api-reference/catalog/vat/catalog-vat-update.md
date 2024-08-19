# Обновление ставки НДС

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки 
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "catalog.vat.update" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.vat.update(id, fields)
```

Метод для обновления ставки НДС.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор ставки НДС. ||
|| **fields** 
[`object`](../../data-types.md)|  Поля, соответствующие доступному списку полей [fields](catalog-vat-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```js
BX24.callMethod(
    'catalog.vat.update',
    {
        id: 9,
        fields: {
            name: "Налог 15%",
            rate: 15,
            sort: 20,
            active: "Y"
        }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}
