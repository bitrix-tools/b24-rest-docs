# Получить список шаблонов для создания страниц landing.demos.getPageList

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют параметры или поля
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.demos.getPageList` получает список доступных шаблонов для создания страниц. Как партнёрских, так и системных.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **type**
[`unknown`](../../data-types.md) | Тип шаблона (page: обычные сайты, store: магазины). ||
|#

## Пример

```js
BX24.callMethod(
    'landing.demos.getPageList',
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