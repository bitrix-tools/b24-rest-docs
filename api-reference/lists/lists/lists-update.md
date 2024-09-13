# Обновить текущий универсальный список lists.update

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

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `lists.update` обновляет существующий список. В случае успешного обновления списка ответ `true`, иначе *Exception*.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**^*^
[`unknown`](../../data-types.md) | `id` типа инфоблока (обязательное):
- **lists** - тип инфоблока списка
- **bitrix_processes** - тип инфоблока процессов
- **lists_socnet** - тип инфоблока списков групп ||
|| **IBLOCK_CODE/IBLOCK_ID**^*^
[`unknown`](../../data-types.md) | код или `id` инфоблока (обязательное); ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы); ||
|| **FIELDS**
[`unknown`](../../data-types.md) | поля инфоблока:
- **NAME**^*^ - название инфоблока (обязательно);
- **DESCRIPTION** - описание;
- **SORT** - сортировка;
- **PICTURE** - изображение;
- **BIZPROC** - включение поддержки бизнес-процессов. ||
|| **MESSAGES**
[`unknown`](../../data-types.md) | подписи к элементам и разделам списка; ||
|| **RIGHTS**
[`unknown`](../../data-types.md) | управление правами доступа. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```javascript
var params = {
    'IBLOCK_TYPE_ID': 'lists_socnet',
    'IBLOCK_CODE': 'rest_1',
    'FIELDS': {
        'NAME': 'List 1 (Update)',
        'DESCRIPTION': 'Test list (Update)',
        'SORT': '20',
        'PICTURE': document.getElementById('iblock-image-update')
    },
    'RIGHTS': {
        'G1': 'X'
    }
};
BX24.callMethod(
    'lists.update',
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