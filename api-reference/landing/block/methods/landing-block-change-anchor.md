# Изменение символьного кода якоря

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

{% note info "landing.block.changeAnchor" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.block.changeAnchor` изменяет символьный код якоря. Штатно якорь выглядит следующим образом: `#block12345`, где 12345 – идентификатор блока.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы. | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока. | ||
|| **data**
[`unknown`](../../../data-types.md) | Символьный код якоря. | ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.block.changeAnchor',
    {
        lid: 3496,
        block: 29356,
        data: 'about'
    },
    function (result)
    {
        if (result.error())
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