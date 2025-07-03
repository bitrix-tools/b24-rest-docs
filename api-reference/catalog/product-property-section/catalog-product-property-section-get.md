# Получить значения секционных настроек свойств catalog.productPropertySection.get

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

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```http
catalog.productPropertySection.get(propertyId)
```

Метод для доступа к значению секционных настроек свойства товаров или вариаций.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **propertyId** 
[`integer`](../../data-types.md)| Идентификатор свойства товаров или вариаций. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

```js
BX24.callMethod(
    'catalog.productPropertySection.get',
    {
        propertyId: 128
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}