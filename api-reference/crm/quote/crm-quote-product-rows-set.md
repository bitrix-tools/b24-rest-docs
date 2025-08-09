# Создать/изменить товарные позиции предложения crm.quote.productrows.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.quote.productrows.set` устанавливает (создаёт или обновляет) товарные позиции предложения.

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор предложения. ||
|| **rows**
[`unknown`](../../data-types.md) | Товарные позиции - массив вида `array(array("поле"=>"значение"[, ...])[, ...])`, где "поле" может принимать значения из возвращаемых методом [crm.productrow.fields](../../crm/outdated/productrow-old/crm-productrow-fields.md). Товарные позиции предложения, существующие до момента вызова метода, будут заменены новыми. После сохранения будет произведён пересчёт суммы предложения. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.quote.productrows.set",
    		{
    			id: id,
    			rows:
    			[
    				{ "PRODUCT_ID": 1, "PRICE": 100.00, "QUANTITY": 2 },
    				{ "PRODUCT_ID": 2, "PRICE": 200.00, "QUANTITY": 1 }
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    $id = readline("Введите ID");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.productrows.set',
                [
                    'id'   => $id,
                    'rows' => [
                        ['PRODUCT_ID' => 1, 'PRICE' => 100.00, 'QUANTITY' => 2],
                        ['PRODUCT_ID' => 2, 'PRICE' => 200.00, 'QUANTITY' => 1],
                    ],
                ]
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
        echo 'Error setting quote product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.quote.productrows.set",
        {
            id: id,
            rows:
            [
                { "PRODUCT_ID": 1, "PRICE": 100.00, "QUANTITY": 2 },
                { "PRODUCT_ID": 2, "PRICE": 200.00, "QUANTITY": 1 }
            ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}