# Получить описание хранилища по его идентификатору disk.storage.get

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

Метод `disk.storage.get` возвращает хранилище по идентификатору.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор хранилища. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "disk.storage.get",
        {id: 2},
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

```json
"result": {
    "ID": "2", //идентификатор
    "NAME": "Маркетинг и реклама", //название
    "CODE": null, //символьный код
    "MODULE_ID": "disk",
    "ENTITY_TYPE": "group", //тип сущности (см. disk.storage.gettypes)
    "ENTITY_ID": "1", //идентификатор сущности
    "ROOT_OBJECT_ID": "2" //идентификатор корневой папки
}
```