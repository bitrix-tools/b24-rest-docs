# Получить список полей товаров документа складского учета catalog.document.element.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```js
catalog.document.element.getFields()
```

Метод возвращает список полей товаров документа складского учёта.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.document.element.getFields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.element.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting document fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.element.getFields',
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

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **amount** 
[`double`](../../../data-types.md) | Количество. | ||
|| **docId** 
[`integer`](../../../data-types.md) | Идентификатор документа. | Неизменяемое поле. ||
|| **elementId** 
[`integer`](../../../data-types.md) | Идентификатор товара [catalog.product.list](../../../catalog/product/catalog-product-list.md). | Неизменяемое поле. ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор товара документа. | Только для чтения. ||
|| **purchasingPrice** 
[`double`](../../../data-types.md) | Закупочная цена. | ||
|| **storeFrom** 
[`integer`](../../../data-types.md) | Склад-отправитель. | ||
|| **storeTo** 
[`integer`](../../../data-types.md) | Склад-получатель. | ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}
