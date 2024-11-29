# Получить параметры элемента или список элементов lists.element.get

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

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `lists.element.get` возвращает список элементов или элемент. В случае успеха возвращает данные по элементу(там), иначе пустой массив.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**
[`unknown`](../../data-types.md) | `id` типа инфоблока (обязательно):
- **lists** - тип инфоблока списка
- **bitrix_processes** - тип инфоблока процессов
- **lists_socnet** - тип инфоблока списков групп ||
|| **SOCNET_GROUP_ID**
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы); ||
|| **IBLOCK_CODE/IBLOCK_ID**
[`unknown`](../../data-types.md) | код или `id` инфоблока (обязательно) ||
|| **ELEMENT_CODE/ELEMENT_ID**
[`unknown`](../../data-types.md) | код или `id` элемента (Если не указан, вернет список всех элементов списка) ||
|| **ELEMENT_ORDER**
[`unknown`](../../data-types.md) | Сортировка. Массив полей элементов информационного блока. Направление сортировки: **asc** (по возрастания) или **desc** (по убыванию)

{% include [Сноска о параметрах](../../../_includes/required.md) %}

Пример:
```js
'ELEMENT_ORDER': { "ID": "DESC" }
```

Не поддерживается сортировка всех множественных свойств, а так же свойств:

S:Money, PREVIEW_TEXT, DETAIL_TEXT, S:ECrm, S:map_yandex, PREVIEW_PICTURE, DETAIL_PICTURE, S:DiskFile, IBLOCK_SECTION_ID, BIZPROC, COMMENTS. ||

|| **FILTER** | Фильтрация элементов. Объект с списком полей и значений.
Для фильтрации доступны почти все поля из фильтра CIBlockElement::GetList. Например для фильтрации по полю число, нужно указать знак равно:
```js
'FILTER': {
    '=ID': [120,121],
}
```
Так же есть возможность использовать полнотекстовый поиск. Для этого Нужно использовать поле SEARCHABLE_CONTENT с префиксом "*"; ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists_socnet',
        'IBLOCK_CODE': 'rest_1',
        'ELEMENT_CODE': 'element_1'
    };
    BX24.callMethod(
        'lists.element.get',
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

{% endlist %}

{% list tabs %}

- JS

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists',
        'IBLOCK_ID': '41',
        'FILTER': {
            '>=DATE_CREATE': '27.03.2018 00:00:00',
            '<=DATE_CREATE': '27.03.2018 23:59:59',
        }
    };
    BX24.callMethod(
        'lists.element.get',
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}