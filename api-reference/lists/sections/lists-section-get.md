# Получение списка разделов универсального списка

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

{% note info "lists.section.get" %}

**Scope**: [`lists`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `lists.section.get` возвращает список разделов или раздел. В случае успеха возвращает данные по разделу(лам), иначе пустой массив.

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**^*^
[`unknown`](../../data-types.md) | Идентификатор типа инфоблока (обязательный). Возможные значения: 
- lists - тип инфоблока списка 
- bitrix_processes - тип инфоблока процессов 
- lists_socnet - тип инфоблока списков групп | ||
|| **IBLOCK_CODE/IBLOCK_ID**^*^
[`unknown`](../../data-types.md) | Код или идентификатор инфоблока (обязательный). | ||
|| **FILTER**
[`unknown`](../../data-types.md) | Массив полей и значений для фильтрации. Для фильтрации доступны поля из фильтра [CIBlockSection::GetList](https://dev.1c-bitrix.ru/api_help/iblock/classes/ciblocksection/getlist.php)^**^ | ||
|| **SELECT**
[`unknown`](../../data-types.md) | Массив с полями для выборки. Доступные поля описаны в документации [CIBlockSection::GetList](https://dev.1c-bitrix.ru/api_help/iblock/classes/ciblocksection/getlist.php)^**^ | ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | Идентификатор группы (обязательно, если список создается для группы); | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

(**) - кроме пользовательских (UF_) полей.

## Пример

```js
/* lists.section.get */
var params = {
    'IBLOCK_TYPE_ID': 'lists',
    'IBLOCK_CODE': 'rest_1',
    'FILTER': {
        'NAME': 'section_%'
    },
    'SELECT': ['ID', 'NAME']
};
BX24.callMethod(
    'lists.section.get',
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