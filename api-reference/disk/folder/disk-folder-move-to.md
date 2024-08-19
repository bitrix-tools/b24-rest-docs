# Перемещение папки в заданную папку

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "disk.folder.moveto" %}

**Scope**: [`disk`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `disk.folder.moveto` копирует папку в указанную папку.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор папки. ||
|| **targetFolderId**
[`unknown`](../../data-types.md) | Идентификатор целевой папки. ||
|#

## Пример

```js
BX24.callMethod(
    "disk.folder.moveto",
    {
        id: 8,
        targetFolderId: 22081990
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

В ответе та же структура, как и в [disk.folder.get](./disk-folder-get.md).