# Описание полей файла

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "disk.file.getfields" %}

**Scope**: [`disk`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `disk.file.getfields` возвращает описание полей файла.

- `TYPE` — тип поля;
- `USE_IN_FILTER` — возможность использовать поле при фильтрации выборки;
- `USE_IN_SHOW` — доступно ли это поле при получении ответа.

## Параметры

Без параметров

## Пример

```js
BX24.callMethod(
    "disk.file.getfields",
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
{% include [Сноска о примерах](../../../_includes/examples.md) %}