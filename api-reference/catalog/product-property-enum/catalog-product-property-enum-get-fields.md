# Получить поля значений списочных свойств catalog.productPropertyEnum.getFields

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

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.productPropertyEnum.getFields()
```

Метод возвращает поля значений списочных свойств.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.productPropertyEnum.getFields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error().ex);
    	}
    	else
    	{
    		console.log(result);
    	}
    }
    catch(error)
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
                'catalog.productPropertyEnum.getFields',
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
        echo 'Error getting product property enum fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productPropertyEnum.getFields',
        {},
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

## Возвращаемые поля

#|
|| **Поле** 
[`Тип`](../../data-types.md) | **Описание** | **Примечание** ||
|| **def** 
[`char`](../../data-types.md) | Является ли значением по умолчанию. | ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор значения. | Только для чтения. ||
|| **propertyId^*^** 
[`integer`](../../data-types.md) | Идентификатор свойства. |  ||
|| **sort** 
[`integer`](../../data-types.md) | Сортировка. | ||
|| **value^*^** 
[`string`](../../data-types.md) | Значение. |  ||
|| **xmlId^*^** 
[`string`](../../data-types.md) | Внешний идентификатор. | ||
|#
{% include [Сноска о параметрах](../../../_includes/required.md) %}