# Получить список файлов и папок, находящихся в папке disk.folder.getchildren

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

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.folder.getchildren` возвращает список файлов и папок, которые находятся непосредственно в папке.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор папки. ||
|| **filter**
[`unknown`](../../data-types.md) |  Необязательный параметр. Поддерживает фильтрацию по полям, которые указаны в [disk.folder.getfields](./disk-folder-get-fields.md) как `USE_IN_FILTER: true`. ||
|| **START** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../how-to-call-rest-api/list-methods-pecularities.md) ||
|#

{% note info %}

Cм. также описание [списочных методов](../../how-to-call-rest-api/list-methods-pecularities.md).

{% endnote %}

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "disk.folder.getchildren",
        {
            id: 8,
            filter: {
                CREATED_BY: 1
            }
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

В ответе массив объектов, структура которых аналогична [disk.folder.get](./disk-folder-get.md), [disk.file.get](../file/disk-file-get.md).

```json
"result": [
{
    "ID": "13",
    "NAME": "near",
    "CODE": null,
    "STORAGE_ID": "4",
    "TYPE": "folder",
    "PARENT_ID": "8",
    "DELETED_TYPE": "0",
    "CREATE_TIME": "2015-04-24T12:39:35+03:00",
    "UPDATE_TIME": "2015-04-24T12:39:35+03:00",
    "DELETE_TIME": null,
    "CREATED_BY": "1",
    "UPDATED_BY": "1",
    "DELETED_BY": "0",
    "DETAIL_URL": "https://test.bitrix24.ru/workgroups/group/3/disk/path/near/"
},
{
    "ID": "10",
    "NAME": "2511.jpg",
    "CODE": null,
    "STORAGE_ID": "4",
    "TYPE": "file",
    "PARENT_ID": "8",
    "DELETED_TYPE": "0",
    "CREATE_TIME": "2015-04-24T10:41:51+03:00",
    "UPDATE_TIME": "2015-04-24T15:52:43+03:00",
    "DELETE_TIME": null,
    "CREATED_BY": "1",
    "UPDATED_BY": "1",
    "DELETED_BY": "0",
    "DOWNLOAD_URL": "https://test.bitrix24.ru/disk/downloadFile/10/?&ncc=1&filename=2511.jpg&auth=******",
    "DETAIL_URL": "https://test.bitrix24.ru/workgroups/group/3/disk/file/2511.jpg"
},
{
    "ID": "11",
    "NAME": "549x700.png",
    "CODE": null,
    "STORAGE_ID": "4",
    "TYPE": "file",
    "PARENT_ID": "8",
    "DELETED_TYPE": "0",
    "CREATE_TIME": "2015-04-24T10:58:49+03:00",
    "UPDATE_TIME": "2015-04-24T12:01:32+03:00",
    "DELETE_TIME": null,
    "CREATED_BY": "1",
    "UPDATED_BY": "1",
    "DELETED_BY": "0",
    "DOWNLOAD_URL": "https://test.bitrix24.ru/disk/downloadFile/11/?&ncc=1&filename=549x700.png&auth=******",
    "DETAIL_URL": "https://test.bitrix24.ru/workgroups/group/3/disk/file/549x700.png"
}]
```