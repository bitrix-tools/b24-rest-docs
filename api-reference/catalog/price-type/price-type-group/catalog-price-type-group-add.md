# Добавить привязку типа цен к группе покупателей catalog.priceTypeGroup.add

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
catalog.priceTypeGroup.add(fields)
```

Метод добавляет привязку типа цен к группе покупателей.
.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](./catalog-price-type-group-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.priceTypeGroup.add',
        {
            fields: {
                catalogGroupId: 14,
                groupId: 16,
                access: "Y"
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