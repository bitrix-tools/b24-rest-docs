# Обновление значений списочных свойств

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки 
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "catalog.productPropertyEnum.update" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.productPropertyEnum.update(id, fields)
```

Метод для обновления значений списочных свойств.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор свойства товаров или торговых предложенийн. ||
|| **fields** 
[`object`](../../data-types.md)|  Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-enum-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
BX24.callMethod(
    'catalog.productPropertyEnum.update',
    {
        id: 122,
        fields: {
            propertyId: 128,
            value: "Средний",
            def: "Y",
            sort: 1234,
            xmlId: "M"
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
