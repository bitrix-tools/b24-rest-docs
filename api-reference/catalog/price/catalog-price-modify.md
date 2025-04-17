# Изменить элементы коллекции цен товара catalog.price.modify

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки 
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
catalog.price.modify(fields)
```

Метод для изменения элементов коллекции цен товара.

{% note info "" %}

**Внимение!** Все сущности, которые не переданы или у которых не указаны ID, будут удалены.

{% endnote %}

Если операция успешна, возвращается [ресурс цены](resource.md) в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields.product.id** 
[`string`](../../data-types.md) | Номер цены. ||
|| **fields.product.prices[]** 
[`list`](../../data-types.md) | Поля, соответствующие доступному списку полей [fields](catalog-price-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.price.modify',
        {
            fields: {
                product: {
                    id: 8,
                    prices: [
                        {
                            catalogGroupId: 1,
                            currency: 'RUB',
                            price: 2001,
                            quantityFrom: 1,
                            quantityTo: 2
                        },
                        {
                            catalogGroupId: 1,
                            currency: 'RUB',
                            price: 2001,                
                            quantityFrom: 3,
                            quantityTo: 4
                        },
                        {
                            catalogGroupId: 1,
                            currency: 'RUB',
                            price: 2001,                
                            quantityFrom: 5,
                            id: 122
                        },
                    ]
                },
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
