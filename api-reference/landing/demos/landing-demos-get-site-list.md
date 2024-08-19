# Получение списка шаблонов для создания сайтов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "landing.demos.getSiteList" %}

**Scope**: [`landing`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.demos.getSiteList` получает список доступных шаблонов для создания сайтов. Как партнёрских, так и системных.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **type**
[`unknown`](../../data-types.md) | Тип шаблона (page: обычные сайты, store: магазины). ||
|#

## Примеры

```js
BX24.callMethod(
    '',
    {
        type: 'page'
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```
{% include [Сноска о примерах](../../../_includes/examples.md) %}