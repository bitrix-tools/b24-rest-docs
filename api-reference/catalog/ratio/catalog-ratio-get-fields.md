# Получить поля коэффициента единицы измерения catalog.ratio.getFields

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
catalog.ratio.getFields()
```

Метод возвращает поля коэффициента единицы измерения.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.ratio.getFields',
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
|| **id** 
[`integer`](../../data-types.md) | Идентификатор единицы измерения. | Только для чтения. ||
|| **isDefault** 
[`char`](../../data-types.md) | Единица измерения по умолчанию. |  ||
|| **productId^*^** 
[`integer`](../../data-types.md) | Идентификатор товара. | ||
|| **ratio^*^** 
[`double`](../../data-types.md) | Коэффициент единицы измерения. | ||
|#
{% include [Сноска о параметрах](../../../_includes/required.md) %}
