# Получить поля привязки типов цен к группам покупателей catalog.priceTypeGroup.getFields

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
catalog.priceTypeGroup.getFields()
```

Метод возвращает поля привязки типов цен к группам покупателей.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.priceTypeGroup.getFields',
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
|| **access^*^** 
[`char`](../../data-types.md) | Тип добавляемой привязки:
- `N` – право на просмотр этого типа цен;
- `Y` – право на покупку по этому типу цен.
Чтобы добавить оба права, необходимо вызвать метод дважды, поочерёдно указав оба типа привязки (`N` и `Y`). |  ||
|| **catalogGroupId^*^** 
[`integer`](../../data-types.md) | ID типа цены. |  ||
|| **groupId^*^** 
[`integer`](../../data-types.md) | ID группы, к которой привязывается цена. |  ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор привязки. | Неизменяемое поле. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}