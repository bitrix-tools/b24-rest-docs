# Получить описание хранилища для приложения disk.storage.getforapp

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

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

Метод `disk.storage.getforapp` возвращает описание хранилища, с которым может работать приложение для хранения своих данных (файлов и папок).

## Параметры

Без параметров.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "disk.storage.getforapp",
        {},
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

Возвращаемая структура аналогична приведенной в [disk.storage.get](./disk-storage-get.md).

> 200 OK

```json
"result": {
    "ID": "221990",
    "NAME": "bitrix.restapi",
    "CODE": null,
    "MODULE_ID": "disk",
    "ENTITY_TYPE": "restapp",
    "ENTITY_ID": "1",
    "ROOT_OBJECT_ID": "2"
}
```