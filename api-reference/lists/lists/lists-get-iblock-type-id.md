# Получение идентификатора типа инфоблока

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "lists.get.iblock.type.id" %}

**Scope**: [`lists`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `lists.get.iblock.type.id` возвращает `id` типа инфоблока. В случае успеха будет возвращена строка с `id` типа инфоблока, иначе `null`.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **IBLOCK_CODE/IBLOCK_ID**
[`unknown`](../../data-types.md) | код или `id` инфоблока | ||
|#

## Пример:

```javascript
var params = {
    'IBLOCK_ID': '41'
};
BX24.callMethod(
    'lists.get.iblock.type.id',
    params,
    function(result)
    {
        if(result.error())
            alert("Error: " + result.error());
        else
            console.log(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}