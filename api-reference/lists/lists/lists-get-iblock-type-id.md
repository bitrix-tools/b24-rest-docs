# Получить идентификатор типа инфоблока lists.get.iblock.type.id

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `lists.get.iblock.type.id` возвращает `id` типа инфоблока. В случае успеха будет возвращена строка с `id` типа инфоблока, иначе `null`.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **IBLOCK_CODE/IBLOCK_ID**
[`unknown`](../../data-types.md) | код или `id` инфоблока | ||
|#

## Пример:

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'lists.get.iblock.type.id',
    		{
    			'IBLOCK_ID': '41'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'IBLOCK_ID' => '41'
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'lists.get.iblock.type.id',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling lists.get.iblock.type.id: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        'IBLOCK_ID': '41'
    };
    BX24.callMethod(
        'lists.get.iblock.type.id',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}



{% include [Сноска о примерах](../../../_includes/examples.md) %}