# Получение параметров хранилища или списка всех хранилищ

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "entity.get" %}

**Scope**: [`entity`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `entity.get` получает параметры хранилища или список всех хранилищ приложения.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**
[`string`](../../data-types.md) | Строковой идентификатор требуемого хранилища. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
BX24.callMethod('entity.get');
```

Запрос
```http
https://my.bitrix24.ru/rest/entity.get.json?auth=59efe32d01c0e9dc5732e8dfa68a4baa
```

Пример корректного получения списка всех доступных хранилищ:

```javascript
BX24.callMethod(
    "entity.get",
    {},
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
        {
            console.info("Список созданных хранилищ:", result.data());
        }
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":
    [
        {
            "ENTITY":"dish",
            "NAME":"Dishes"
        },
        {
            "ENTITY":"menu",
            "NAME":"Menu"
        }
    ]
}
```

