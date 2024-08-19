# Получение списка почтовых сервисов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет примеров ответов

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "mailservice.list" %}

**Scope**: [`mailservice`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `mailservice.list` возвращает список всех почтовых сервисов.

## Параметры

Без параметров.

## Пример

```js
BX24.callMethod(
    "mailservice.list",
    {
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