# Возвращение полей свойств товаров или торговых предложений

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

{% note info "catalog.productProperty.getFields" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
catalog.productProperty.getFields()
```

Метод возвращает поля свойств товаров или торговых предложений.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.productProperty.getFields',
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
|| **Поле ** | **Описание** | **Примечание** ||
|| **active** 
[`char`](../../data-types.md) | Активно ли свойство. | ||
|| **code** 
[`string`](../../data-types.md) | Символьный код. | ||
|| **rowCount, colCount**
[`integer`](../../data-types.md) | Размер поля для ввода значения (Строк х Столбцов). | ||
|| **defaultValue** 
[`text`](../../data-types.md) | Значение по умолчанию. | ||
|| **filtrable** 
[`char`](../../data-types.md) | Выводить ли на странице списка элементов поле для фильтрации по этому свойству. | ||
|| **hint** 
[`string`](../../data-types.md) | Подсказка. | ||
|| **iblockId^*^** 
[`integer`](../../data-types.md) | Идентификатор инфоблока. | ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор свойства. | Только для чтения. ||
|| **isRequired** 
[`char`](../../data-types.md) | Является ли обязательным. | ||
|| **linkIblockId** 
[`integer`](../../data-types.md) | Идентификатор инфоблока, с элементами которого связано значение. На сегодняшний день поле не используется (данное поле предназначено для типов, которые пока в REST не поддерживаются). | ||
|| **listType**
[`char`](../../data-types.md) | Внешний вид. | Только для поля типа "Список". ||
|| **multiple** 
[`char`](../../data-types.md) | Является ли свойство множественным. | ||
|| **multipleCnt** 
[`integer`](../../data-types.md) | Количество полей для ввода новых множественных значений. | ||
|| **name^*^** 
[`string`](../../data-types.md) | Название. | ||
|| **propertyType^*^** 
[`string`](../../data-types.md) | Тип свойства. |  ||
|| **searchable** 
[`char`](../../data-types.md) | Участвуют ли значения свойства в поиске. | ||
|| **sort** 
[`integer`](../../data-types.md) | Порядок сортировки. | ||
|| **timestampX** 
[`datetime`](../../data-types.md) | Дата последнего изменения параметров. | Только для чтения. ||
|| **userType** 
[`string`](../../data-types.md) | Пользовательский тип свойства. | ||
|| **withDescription** 
[`char`](../../data-types.md) | Выводить ли поле для описания значения. | ||
|| **xmlId** 
[`string`](../../data-types.md) | Внешний идентификатор. | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}