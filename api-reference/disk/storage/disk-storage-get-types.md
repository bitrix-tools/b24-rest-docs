# Получить типы хранилищ disk.storage.gettypes

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

Метод `disk.storage.gettypes` возвращает список типов хранилищ.

## Параметры

Без параметров.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "disk.storage.gettypes",
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

> 200 OK

```json
"result": [
    "user", //хранилище пользователей
    "common", //хранилище общих документов
    "group" //хранилище социальных групп
]
```