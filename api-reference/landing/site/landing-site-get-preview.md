# Получение URL превью сайта

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

{% note info "landing.site.getPreview" %}

**Scope**: [`landing`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.site.getPreview` возвращает URL изображения-превью сайта (превью индексной страницы). Сайт должен быть доступен на чтение.

## Параметры

#|
|| **Параметр** | **Описание** | **Версия** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор сайта. | ||
|#

## Пример

```js
BX24.callMethod(
    'landing.landing.getPreview',
    {
        id: 1817
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

{% include [Сноска о примерах](../../../_includes/examples.md) %}