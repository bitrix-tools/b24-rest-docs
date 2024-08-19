# Обновление элемента списка

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
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

{% note info "lists.element.update" %}

**Scope**: [`lists`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}


Метод `lists.element.update` обновляет элемент списка. В случае успешного обновления элемента ответ `true`, иначе *Exception*.

{% note warning %}

Все поля элемента и их значения должны передаваться в запросе.

{% endnote %}


Чтобы загрузить файлы в поле типа Файл (Диск) необходимо:

1. использовать rest api модуля disk: disk.folder.uploadfile и disk.storage.uploadfile. В ответе при загрузке этих файлов, вы будете получать `"ID": 290`.
2. Получить список `ID` загруженных файлов.
3. Затем с помощью rest api модуля lists добавлять файлы в нужное поле. В случае если у поля уже есть прикрепленные файлы вам нужно получить предыдущие значения из [lists.element.get](./lists-element-get.md) и передать их вместе с новыми:

```js
var params = {
    'IBLOCK_TYPE_ID': 'lists',
    'IBLOCK_ID': '41',
    'ELEMENT_CODE': 'element1',
    'FIELDS': {
        'NAME': 'Test element 1',
        'PROPERTY_121': {'4754': ['50', 'n1582']} // либо без id 'PROPERTY_121': {'n0': ['50', 'n1582']}
    }
};
BX24.callMethod(
    'lists.element.update',
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
Значения в поле Файл (Диск) без префикса `"n"` это уже прикрепленные файлы (attachedId), а с префиксом это ваши новые файлы, уже загруженные предварительно в диск.

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
|| **ELEMENT_CODE/ELEMENT_ID**^*^
[`unknown`](../../data-types.md) | код или `id` элемента (обязательно) ||
|| **FIELDS**
[`unknown`](../../data-types.md) | массив полей и значений ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы); ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```javascript
var params = {
    'IBLOCK_TYPE_ID': 'lists_socnet',
    'IBLOCK_CODE': 'rest_1',
    'ELEMENT_CODE': 'element_1',
    'FIELDS': {
        'NAME': 'Test element (Update)',
        'PROPERTY_62': {
        '599': 'Text string (Update)'
        },
        'PROPERTY_63': {
        '600': '73',
        '601': '97',
        '602': '17'
        }
    }
};
BX24.callMethod(
    'lists.element.update',
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