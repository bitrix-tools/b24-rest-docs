# Добавить значения списочных свойств catalog.productPropertyEnum.add

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

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```http
catalog.productPropertyEnum.add(fields)
```

Метод добавляет значение списочных свойств.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-enum-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.productPropertyEnum.add',
    		{
    			fields: {
    				propertyId: 128,
    				value: "Средний",
    				def: "Y",
    				sort: 123,
    				xmlId: "M"
    			}
    		}
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
                'catalog.productPropertyEnum.add',
                [
                    'fields' => [
                        'propertyId' => 128,
                        'value'      => "Средний",
                        'def'        => "Y",
                        'sort'       => 123,
                        'xmlId'      => "M",
                    ],
                ]
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
        echo 'Error adding product property enum: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productPropertyEnum.add',
        {
            fields: {
                propertyId: 128,
                value: "Средний",
                def: "Y",
                sort: 123,
                xmlId: "M"
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

{% include [Сноска о примерах](../../../_includes/examples.md) %}