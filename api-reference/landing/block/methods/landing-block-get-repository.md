# Получение списка блоков из репозитория

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "landing.block.getrepository" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.block.getrepository` возвращает список блоков из репозитория или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **section**
[`unknown`](../../../data-types.md) | [Код секции](#block) репозитория (список дан выше) | ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.block.getrepository',
    {
        section: 'about'
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
