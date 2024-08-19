# Получение информации о прикрепленном файле

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет описания параметров
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "disk.attachedObject.get" %}

**Scope**: [`disk`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `disk.attachedObject.get` возвращает информацию о прикрепленном файле через пользовательское свойство по идентификатору привязки. 

## Пример

```js
BX24.callMethod(
    "disk.attachedObject.get",
    {
        id: 318
    },
    function (result)
    {
        if (result.error())
         console.error(result.error());
        else
         console.dir(result.data());
    }
);
```
{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
result: {
    ID: "318",
    OBJECT_ID: "13215", //идентификатор файла из Диска
    MODULE_ID: "blog", //модуль, который владеет пользовательским свойством
    ENTITY_TYPE: "blog_comment", //тип сущности
    ENTITY_ID: "157", //идентификатор сущности, к которой идет прикрепление
    CREATE_TIME: "2018-10-31T10:57:35+02:00", //время создания
    CREATED_BY: "1", //идентификатор пользователя, который создал привязку
    DOWNLOAD_URL: "https://test.bitrix24.ru/bitrix/tools/disk/uf.php?attachedId=318&auth%5Baplogin%5D=1&auth%5Bap%5D=******&action=download&ncc=1",
    NAME: "Test.docx", //имя файла
    SIZE: "3867" //размер файла в байтах
}
```