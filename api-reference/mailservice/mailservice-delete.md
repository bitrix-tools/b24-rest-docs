# Удаление почтового сервиса

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует описание типов параметров
- нет примеров ответов

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "mailservice.delete" %}

**Scope**: [`mailservice`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `mailservice.delete` удаляет почтовый сервис.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** | **С версии** ||
|| **ID**
[`unknown`](../data-types.md) | Идентификатор почтового сервиса | ||
|#

## Пример

```js
BX24.callMethod(
    "mailservice.delete",
    {
        'ID': 8
    },
    function(result)
    {
        if(result.error())
        {
            console.error(result.error());
        }
        else
        {
            console.info(result.data());
        }
    }
);
```
{% include [Сноска о примерах](../../_includes/examples.md) %}