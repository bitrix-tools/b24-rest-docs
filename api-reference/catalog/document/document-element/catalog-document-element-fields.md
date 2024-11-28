# Получить список полей товаров документа складского учета catalog.document.element.fields

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

{% note info "Внимание!" %}

Метод устарел с версии **22.400.0**. Рекомендуется использовать метод [catalog.document.element.getFields](./catalog-document-element-get-fields.md).

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```http
catalog.document.element.fields()
```

Метод возвращает список полей товаров документа складского учёта

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- js
  
    ```js
    BX24.callMethod(
        'catalog.document.element.fields',
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- php
  
    ```php
    $result = CRest::call(
        'catalog.document.element.fields'
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```
{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор. | ||
|| **docId^*^** 
[`integer`](../../../data-types.md) | Идентификатор документа. |  ||
|| **storeFrom** 
[`integer`](../../../data-types.md) | Склад-отправитель. | ||
|| **storeTo^*^** 
[`integer`](../../../data-types.md) | Склад-получатель. | ||
|| **elementId^*^** 
[`integer`](../../../data-types.md) | Идентификатор товара [catalog.product.list](../../../catalog/product/catalog-product-list.md). | ||
|| **amount^*^** 
[`double`](../../../data-types.md) | Количество. |  ||
|| **purchasingPrice^*^** 
[`double`](../../../data-types.md) | Закупочная цена. | ||
|#
