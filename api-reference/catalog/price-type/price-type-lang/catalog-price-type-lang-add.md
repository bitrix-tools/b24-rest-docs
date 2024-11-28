# Добавить перевод названия типа цен catalog.priceTypeLang.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```http
catalog.priceTypeLang.add(fields)
```

Метод добавляет перевод названия типа цен.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-price-type-lang-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.priceTypeLang.add',
        {
            fields: {
                catalogGroupId: 14,
                lang: "ru",
                name: "Оптовая цена"
            }
        },
        function(result) {
            if (result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}


{% include [Сноска о примерах](../../../../_includes/examples.md) %}