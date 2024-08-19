# Создание элемента универсального списка

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

{% note info "lists.element.add" %}

**Scope**: [`lists`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `lists.element.add` создаёт элемент списка. В случае успешного создания элемента ответ `true`, иначе *Exception*.

Чтобы загрузить файлы в поле типа Файл (Диск) необходимо:

1. использовать rest api модуля disk: disk.folder.uploadfile и disk.storage.uploadfile. В ответе при загрузке этих файлов, вы будете получать `"FILE_ID": 290`.
2. Получить список `ID` загруженных файлов.
3. Затем с помощью rest api модуля lists добавлять файлы в нужное поле:

```js
var params = {
    'IBLOCK_TYPE_ID': 'lists',
    'IBLOCK_ID': '41',
    'ELEMENT_CODE': 'element1',
    'FIELDS': {
        'NAME': 'Test element 1',
        'PROPERTY_121': { 'n0':["n1582"]}
    }
};
BX24.callMethod(
    'lists.element.add',
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
|| **ELEMENT_CODE**^*^
[`unknown`](../../data-types.md) | код элемента инфоблока (обязательно) ||
|| **LIST_ELEMENT_URL**
[`unknown`](../../data-types.md) | шаблон адреса к элементам списка ||
|| **FIELDS**
[`unknown`](../../data-types.md) | массив полей и значений ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы); ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```js
var params = {
    'IBLOCK_TYPE_ID': 'lists_socnet',
    'IBLOCK_CODE': 'rest_1',
    'ELEMENT_CODE': 'element_1',
    'LIST_ELEMENT_URL': '#list_id#/element/#section_id#/#element_id#/',
    'FIELDS': {
        'NAME': 'Test element',
        'PROPERTY_62': 'Text string',
        'PROPERTY_63': {
            '0': '7',
            '1': '9',
            '2': '10'
        }
    }
};
BX24.callMethod(
    'lists.element.add',
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

Пример добавления файла:

```js
var params = {
    'IBLOCK_TYPE_ID': 'lists',
    'IBLOCK_ID': '41',
    'ELEMENT_CODE': 'element1',
    'FIELDS': {
        'NAME': 'Test element 1',
        'PROPERTY_122': document.getElementById('fileInputId') // PROPERTY_122 - Пользовательское свойство типа "Файл"
    }
};
BX24.callMethod(
    'lists.element.add',
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