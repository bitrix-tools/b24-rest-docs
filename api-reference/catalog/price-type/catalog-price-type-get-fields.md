# Возвращение полей типа цены

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

{% note info "catalog.priceType.getFields" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
catalog.priceType.getFields()
```

Метод возвращает поля типа цены.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.priceType.getFields',
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
|| **base** 
[`string`](../../data-types.md) | Является ли тип цены базовым. Можно выставить значение `Y` какому-либо типу цены, и этот тип станет базовым. | ||
|| **createdBy** 
[`integer`](../../data-types.md) | Кем создан. | Только для чтения. ||
|| **dateCreate** 
[`datetime`](../../data-types.md) | Дата создания. | Только для чтения. ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор. | Только для чтения. ||
|| **modifiedBy** 
[`integer`](../../data-types.md) | Кем изменен. | Только для чтения. ||
|| **name^*^** 
[`string`](../../data-types.md) | Код типа цены. | ||
|| **sort** 
[`integer`](../../data-types.md) | Сортировка. | ||
|| **timestampX** 
[`datetime`](../../data-types.md) | Дата изменения. | Только для чтения. ||
|| **xmlId** 
[`string`](../../data-types.md) | Внешний код. | ||
|#
{% include [Сноска о параметрах](../../../_includes/required.md) %}