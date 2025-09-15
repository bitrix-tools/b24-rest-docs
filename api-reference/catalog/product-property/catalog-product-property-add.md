# Добавить свойство товаров или вариаций catalog.productProperty.add

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
catalog.productProperty.add(fields)
```

Метод добавляет свойство товаров или вариаций.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-product-property-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.productProperty.add',
    		{
    			fields: {
    				name: "Размер",
    				active: "Y",
    				code: "SIZE1",
    				iblockId: 16,
    				propertyType: "L",
    				isRequired: "N",
    				listType: "L",
    				filtrable: "Y",
    				multiple: "N"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error().ex);
    	else
    		console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productProperty.add',
                [
                    'fields' => [
                        'name'          => "Размер",
                        'active'        => "Y",
                        'code'          => "SIZE1",
                        'iblockId'      => 16,
                        'propertyType'  => "L",
                        'isRequired'    => "N",
                        'listType'      => "L",
                        'filtrable'     => "Y",
                        'multiple'      => "N",
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
        echo 'Error adding product property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productProperty.add',
        {
            fields: {
                name: "Размер",
                active: "Y",
                code: "SIZE1",
                iblockId: 16,
                propertyType: "L",
                isRequired: "N",
                listType: "L",
                filtrable: "Y",
                multiple: "N"
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