# Получить список свойств товаров или торговых предложений catalog.productProperty.list

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
catalog.productProperty.list(select, filter, order, start)
```

Метод получает список свойств товаров или торговых предложений.
Если операция успешна, возвращается список свойств товаров или торговых предложений в теле ответа.


## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-get-fields.md).||
|| **filter** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-get-fields.md). ||
|| **order**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-get-fields.md). ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.productProperty.list',
        {
            select: ['id'],
            filter: {
                iblockId: 16
            },
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
            result.next();
        }
    );
    ```

{% endlist %}

Пример HTTPS запроса

```
https://ваш_портал/rest/catalog.productProperty.list?auth=_ключ_авторизации_&start=50
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}
