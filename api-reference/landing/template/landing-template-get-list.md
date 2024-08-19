# Получение списка шаблонов

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

{% note info "landing.template.getlist" %}

**Scope**: [`landing`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.template.getlist` получает список шаблонов.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **params**
[`unknown`](../../data-types.md) | Опциональный массив, с опциональными ключами: **select**, **filter**, **order**, **group**, которые содержат значения таблицы [основных полей](./fields.md) сущности. | ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.template.getlist',
    {
        params: {
            select: [
                'ID', 'TITLE'
            ],
            filter: {
                '>ID': 0
            },
            order: {
                ID: 'DESC'
            }
        }
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