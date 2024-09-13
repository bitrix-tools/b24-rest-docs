# Выполнить групповое удаление документов складского учета catalog.document.deleteList

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```http
catalog.document.deleteList(documentIds)
```

Метод для группового удаления документов складского учёта.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **documentIds** 
[`array`](../../data-types.md)| Массив идентификаторов документов, которые требуется удалить. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```js
BX24.callMethod(
    'catalog.document.deleteList',
    {
        "documentIds": [
            "110",
            "112"
        ]
    },
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
