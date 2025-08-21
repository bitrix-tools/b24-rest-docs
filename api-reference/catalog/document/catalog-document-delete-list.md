# Выполнить групповое удаление документов складского учета catalog.document.deleteList

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```http
catalog.document.deleteList(documentIds)
```

Метод для группового удаления документов складского учёта.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **documentIds** 
[`array`](../../data-types.md)| Массив идентификаторов документов, которые требуется удалить. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.document.deleteList',
    		{
    			"documentIds": [
    				"110",
    				"112"
    			]
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
                'catalog.document.deleteList',
                [
                    'documentIds' => [
                        '110',
                        '112'
                    ]
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
        echo 'Error deleting document list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.deleteList',
        {
            "documentIds": [
                "110",
                "112"
            ]
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
