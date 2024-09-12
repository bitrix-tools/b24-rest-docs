# Получить поля цены catalog.price.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.price.getFields()
```

Метод возвращает поля цены товара.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.price.getFields',
    {},
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

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **catalogGroupId^*^** 
[`integer`](../../data-types.md) | Тип цены | Неизменяемое ||
|| **currency^*^** 
[`string`](../../data-types.md) | Валюта |  ||
|| **extraId**
[`integer`](../../data-types.md) | Идентификатор наценки | ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор цены | Только для чтения. ||
|| **price^*^**
[`double`](../../data-types.md) | Цена |  ||
|| **priceScale** 
[`double`](../../data-types.md) | Базовая цена |  ||
|| **productId^*^**
[`integer`](../../data-types.md) | Идентификатор товара | Неизменяемое ||
|| **quantityFrom** 
[`integer`](../../data-types.md) | Количество от | ||
|| **quantityTo** 
[`integer`](../../data-types.md) | Количество до | ||
|| **timestampX** 
[`datetime`](../../data-types.md) | Дата изменения | Только для чтения. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}