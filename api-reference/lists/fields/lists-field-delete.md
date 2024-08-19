# Удаление поля из списка списка 

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "lists.field.delete" %}

**Scope**: [`lists`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `lists.field.delete` позволяет удалить поле из списка. В случае успешного удаления поля возвращается ответ `true`, в противном случае будет сгенерировано исключение *Exception*.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**^*^
[`unknown`](../../data-types.md) | `id` типа инфоблока (обязательно):
- **lists** - тип инфоблока списка
- **bitrix_processes** - тип инфоблока процессов
- **lists_socnet** - тип инфоблока списков групп ||
|| **IBLOCK_CODE/IBLOCK_ID**^*^
[`unknown`](../../data-types.md) | код или `id` инфоблока (обязательно) ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы) ||
|| **FIELD_ID**^*^
[`unknown`](../../data-types.md) | `ID` поля (обязательно. Если поле является свойством инфоблока, то формат: "PROPERTY_propertyId") ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```javascript
var params = {
    'IBLOCK_TYPE_ID': 'lists_socnet',
    'IBLOCK_CODE': 'rest_1',
    'FIELD_ID': 'PROPERTY_61'
};
BX24.callMethod(
    'lists.field.delete',
    params,
    function(result)
    {
        if(result.error())
            alert("Error: " + result.error());
        else
            alert("Success: " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}