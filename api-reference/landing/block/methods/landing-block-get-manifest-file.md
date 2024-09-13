# Получить манифест блока из репозитория landing.block.getmanifestfile

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

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.block.getmanifestfile` получает манифест блока из репозитория. Вернет манифест блока или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **code**
[`unknown`](../../../data-types.md) | код блока | ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.block.getmanifestfile',
    {
        code: '01.big_with_text'
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

