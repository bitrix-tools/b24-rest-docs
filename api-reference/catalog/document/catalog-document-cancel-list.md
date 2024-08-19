# Групповая отмена проведения документов складского учёта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "catalog.document.cancelList" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
catalog.document.cancelList(documentIds)
```

Метод для групповой отмены проведения документов складского учёта.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **documentIds**
[`array`](../../data-types.md)| Массив идентификаторов документов, проведение которых требуется отменить. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```js
BX24.callMethod(
    'catalog.document.cancelList',
    {
        "documentIds": [
            "114",
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