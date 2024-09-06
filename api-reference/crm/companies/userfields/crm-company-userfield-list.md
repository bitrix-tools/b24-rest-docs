# Получить список пользовательских полей компаний по фильтру crm.company.userfield.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.company.userfield.list` возвращает список пользовательских полей компаний по фильтру.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **order**
[`array`](../../../data-types.md) | Поля сортировки. ||
|| **filter**
[`array`](../../../data-types.md) | Поля фильтра. ||
|| **START** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../../how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Пример

```js
BX24.callMethod(
    "crm.company.userfield.list",
    {
        order: { "SORT": "ASC" },
        filter: { "MANDATORY": "N" }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
        {
            console.dir(result.data());             
            if(result.more())
                result.next();                        
        }
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}