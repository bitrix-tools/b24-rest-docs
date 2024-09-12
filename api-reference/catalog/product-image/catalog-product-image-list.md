# Получить список картинок конкретного товара catalog.productImage.list

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
catalog.productImage.list(productId, select, start)
```

Метод получает список изображений по конкретному товару или торговому предложению.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **productId^*^** 
[`string`](../../data-types.md)| Идентификатор товара или торгового предложения.||
|| **select** 
[`object`](../../data-types.md)| Список [`полей`](catalog-product-image-get-fields.md) для показа в ответе. ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

Для JS

```javascript
BX24.callMethod(
    'catalog.productImage.list',
    {
        productId: 1
    },
    function(result) {
        if(result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
        result.next();
    }
);
```

Пример HTTPS запроса

```
https://ваш_портал/rest/catalog.productImage.list?auth=_ключ_авторизации_&start=50
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}
