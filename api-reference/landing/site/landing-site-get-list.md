# Получить список сайтов landing.site.getList

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

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.site.getList` получает список сайтов.

{% note warning %}

Обратите внимание, помеченные как удаленные страницы не фигурируют в выборках. Чтобы получить их явно, необходимо при фильтрации указать ключ `DELETED` со значением Y или N.

{% endnote %}

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **params**
[`unknown`](../../data-types.md) | Опциональный массив, с опциональными ключами: **select**, **filter**, **order**, **group**, которые содержат значения таблицы [основных полей](./base-fields.md) сущности. | ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.site.getList',
    {
        params: {
            select: [
                'ID', 'TITLE', 'DOMAIN.DOMAIN'
            ],
            filter: {
                TITLE: '%услуги%'
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