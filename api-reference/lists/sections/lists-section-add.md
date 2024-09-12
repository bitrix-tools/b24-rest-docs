# Создание раздела универсального списка

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

{% note info "lists.section.add" %}

**Scope**: [`lists`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `lists.section.add` создаёт раздел списка. В случае успешного создания раздела ответ `true`, иначе *Exception*.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**^*^
[`unknown`](../../data-types.md) | Идентификатор типа инфоблока (обязательный). Возможные значения: 
- lists - тип инфоблока списка 
- bitrix_processes - тип инфоблока процессов 
- lists_socnet - тип инфоблока списков групп | ||
|| **IBLOCK_CODE/IBLOCK_ID**^*^
[`unknown`](../../data-types.md) | Код или идентификатор инфоблока (обязательный). | ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | id группы (обязательно, если список создается для группы); | ||
|| **IBLOCK_SECTION_ID**
[`unknown`](../../data-types.md) | Идентификатор раздела родителя, если не задан то раздел будет корневой | ||
|| **FIELDS**
[`unknown`](../../data-types.md) | Массив полей и значений. Обязательные поля: NAME. | ||
|| **SECTION_CODE**^*^
[`unknown`](../../data-types.md) | Символьный код раздела (обязательный). | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```js
/* lists.section.add */
var params = {
    'IBLOCK_TYPE_ID': 'lists',
    'IBLOCK_CODE': 'rest_1',
    'SECTION_CODE': 'Section_code_1'
    'FIELDS': {
        'NAME': 'Section_1',
    }
};
BX24.callMethod(
    'lists.section.add',
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