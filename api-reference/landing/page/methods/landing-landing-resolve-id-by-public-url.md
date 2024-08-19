# Получение идентификатора страницы по URL

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

{% note info "landing.landing.resolveIdByPublicUrl" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.landing.resolveIdByPublicUrl` возвращает идентификатор страницы по переданному относительному URL страницы.

## Параметры

#|
|| **Параметр** | **Описание** | **Версия** ||
|| **landingUrl**
[`unknown`](../../../data-types.md) | Относительный URL страницы. ||
|| **siteId**
[`unknown`](../../../data-types.md) | Идентификатор сайта. ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.landing.resolveIdByPublicUrl',
    {
        landingUrl: '/folder/sub/folder/page/',
        siteId: 1817
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}