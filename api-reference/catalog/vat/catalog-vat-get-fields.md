# Возвращение полей ставки НДС

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

{% note info "catalog.vat.getFields" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
catalog.vat.getFields()
```

Метод возвращает поля ставки НДС.

## Параметры

Без параметров.

## Примеры

```js
BX24.callMethod(
    'catalog.vat.getFields',
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
|| **active** 
[`char`](../../data-types.md) | Активность. | ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор ставки НДС. | Только для чтения. ||
|| **name^*^** 
[`string`](../../data-types.md) | Название. |  ||
|| **rate^*^** 
[`double`](../../data-types.md) | Размер ставки НДС. |  ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка.  | ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата изменения.  | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
