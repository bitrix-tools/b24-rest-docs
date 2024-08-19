# Получение информации по конкретному изображению в товаре или торговом предложении

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки и успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "catalog.productImage.get" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
catalog.productImage.get(productId, id)
```

Метод для получения информации по конкретному изображению в товаре или торговом предложении.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **productId^*^** 
[`string`](../../data-types.md)| Идентификатор товара или торгового предложения. ||
|| **id^*^** 
[`integer`](../../data-types.md)| Идентификатор изображения. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
BX24.callMethod(
    'catalog.productImage.get',
    {
        productId: 1,
        id: 1
    },
    function(result) {
        if(result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
    }
);
```
{% include [Сноска о примерах](../../../_includes/examples.md) %}