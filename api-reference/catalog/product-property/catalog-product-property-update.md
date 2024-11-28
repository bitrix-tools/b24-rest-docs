# Изменить свойство товаров или торговых предложений catalog.productProperty.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки 
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
catalog.productProperty.update(id, fields)
```

Метод для обновления полей свойства товаров или торговых предложений.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор свойства товаров или торговых предложенийн. ||
|| **fields** 
[`object`](../../data-types.md)|  Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.productProperty.update',
        {
            id: 128,
            fields: {
                isRequired: "Y",
                iblockId: 16,
                name: "Размер",
                propertyType: "L"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
