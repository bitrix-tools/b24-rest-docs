# Возвращение полей правила округления цен

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

{% note info "catalog.roundingRule.getFields" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
catalog.roundingRule.getFields()
```

Метод возвращает поля правила округления цен.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.roundingRule.getFields',
    {},
    function(result) {
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
[`integer`](../../data-types.md) | Тип цены. | ||
|| **createdBy** 
[`integer`](../../data-types.md) | Кем создано. | Только для чтения. ||
|| **dateCreate** 
[`datetime`](../../data-types.md) | Дата создания. | Только для чтения. ||
|| **dateModify** 
[`datetime`](../../data-types.md) | Дата изменения. | Только для чтения. ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор правила округления цен. | Только для чтения. ||
|| **modifiedBy** 
[`integer`](../../data-types.md) | Кем изменено. | Только для чтения. ||
|| **price^*^** 
[`double`](../../data-types.md) | Минимальная цена. | ||
|| **roundPrecision^*^** 
[`double`](../../data-types.md) | Точность округления. | ||
|| **roundType^*^** 
[`integer`](../../data-types.md) | Тип округления. |  ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
