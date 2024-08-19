# Получение данных о полях списка 

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

{% note info "lists.field.get" %}

**Scope**: [`lists`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `lists.field.get` позволяет получить данные о поле или полях списка. В случае успеха будет возвращен список полей с данными, иначе пустой массив.

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
|| **FIELD_ID**
[`unknown`](../../data-types.md) | `ID` поля (Если поле свойство инфоблока, то формат: "PROPERTY_propertyId". Если не указан, в ответе будут данные по всем полям указанного списка) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```javascript
var params = {
    'IBLOCK_TYPE_ID': 'lists_socnet',
    'IBLOCK_CODE': 'rest_1'
};
BX24.callMethod(
    'lists.field.get',
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