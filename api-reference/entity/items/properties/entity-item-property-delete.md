# Удалить дополнительное свойство элементов хранилища entity.item.property.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод  удаляет дополнительные свойства элементов хранилища. Пользователь должен обладать правами на управление (**Х**) хранилищем.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../../data-types.md) | Обязательный. Строковый идентификатор хранилища. ||
|| **PROPERTY^*^**
[`string`](../../../data-types.md) | Обязательный. Строковый идентификатор свойства. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

Вызов

```js
BX24.callMethod(
    'entity.item.property.delete',
    {
        ENTITY: 'menu_new',
        PROPERTY: 'new_prop'
    }
);
```

Запрос

```http
https://my.bitrix24.ru/rest/entity.item.property.delete.json?ENTITY=menu_new&PROPERTY=new_prop&auth=d92dd12b9b9b904254776104eed2bb76
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":true}
```