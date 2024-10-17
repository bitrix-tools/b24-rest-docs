# Удалить привязку типа цен к группе покупателей catalog.priceTypeGroup.delete

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

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```http
catalog.priceTypeGroup.delete(id)
```

Метод удаляет цену товара из коллекции цен товаров.
Если операция успешна, возвращается `true` в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id** 
[`integer`](../../data-types.md)| Идентификатор привязки типа цен к группе покупателей. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

```javascript
BX24.callMethod(
    'catalog.priceTypeGroup.delete',
    {
        id: 84
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
```
{% include [Сноска о примерах](../../../../_includes/examples.md) %}
