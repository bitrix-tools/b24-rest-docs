# Получить поля перевода названия типа цен catalog.priceTypeLang.getFields

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

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.priceTypeLang.getFields()
```

Метод возвращает поля перевода названия типа цен.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.priceTypeLang.getFields',
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
{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **catalogGroupId^*^** 
[`integer`](../../data-types.md) | ID типа цен |  ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор перевода называния типа цен | Неизменяемое ||
|| **lang^*^**
[`string`](../../data-types.md) | Язык перевода |  ||
|| **name^*^**
[`string`](../../data-types.md) | Называние типа цен |  ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}