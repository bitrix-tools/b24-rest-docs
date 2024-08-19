# Загрузка новой версии файла

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- в таблице с описанием параметров сделать ссылку на словосочетании "Обработка файлов"на страницу https://dev.1c-bitrix.ru/rest_help/js_library/rest/files.php

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "disk.file.uploadversion" %}

**Scope**: [`disk`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `disk.file.uploadversion` загружает новую версию файла.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор файла. ||
|| **fileContent**
[`unknown`](../../data-types.md) | Аналогично `DETAIL_PICTURE` в примере [Обработка файлов](.). ||
|#

## Пример

```js
BX24.callMethod(
    "disk.file.uploadversion",
    {
        id: 4,
        fileContent: document.getElementById('test_file_input')
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

В ответе та же структура, как и в [disk.file.get](./disk-file-get.md).