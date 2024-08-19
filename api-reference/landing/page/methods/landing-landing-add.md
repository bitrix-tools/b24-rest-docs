# Добавление страницы

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

{% note info "landing.landing.add" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.landing.add` добавляет страницу. Возвращает `LID` созданной страницы или ошибку.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`unknown`](../../../data-types.md) | [Поля сущности](../index.md) ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.landing.add',
    {
        fields: {
            TITLE: 'My first page!',
            CODE: 'firstpage',
            SITE_ID: 292,
            ADDITIONAL_FIELDS: {
                THEME_CODE: 'wedding'
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note warning %}

При создании страницы передается код темы страницы (`THEME_CODE: 'wedding'`). Это необходимо, чтобы страница была в соответствующей [цветовой схеме](../color-themes.md). Если этого не сделать, страница будет в теме по-умолчанию.

{% endnote %}