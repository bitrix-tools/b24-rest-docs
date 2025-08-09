# Получить поля остатков по складам catalog.storeproduct.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- не указана обязательность возвращаемых полей
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.storeproduct.getFields()
```

Метод возвращает поля остатков по складам.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.storeproduct.getFields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.storeproduct.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting store product fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.storeproduct.getFields',
        {},
        function(result) {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **amount** 
[`double`](../../data-types.md) | Количество | Только для чтения. ||
|| **id** 
[`integer`](../../data-types.md) | Первичный ключ записи | Только для чтения. ||
|| **productId** 
[`integer`](../../data-types.md) | Идентификатор товара или вариации | Только для чтения. ||
|| **quantityReserved** 
[`double`](../../data-types.md) | Зарезервированное количество | Только для чтения. ||
|| **storeId** 
[`integer`](../../data-types.md) | Идентификатор склада | Только для чтения. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
