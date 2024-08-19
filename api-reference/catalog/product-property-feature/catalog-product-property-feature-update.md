# Обновление значений параметров свойств товаров или торговых предложений

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

{% note info "catalog.productPropertyFeature.update" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.productPropertyFeature.update(id, fields)
```

Метод для обновления значений параметров свойств товаров или торговых предложений.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор свойства товаров или торговых предложенийн. ||
|| **fields** 
[`object`](../../data-types.md)|  Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-feature-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
BX24.callMethod(
    'catalog.productPropertyFeature.update',
    {
        id: 144,
        fields: {
            propertyId: 128,
            featureId: "IN_BASKET",
            moduleId: "catalog",
            isEnabled: "Y"
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
