# Удалить свойство товаров crm.product.property.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.property.delete` продолжает работать, но у него есть более актуальный аналог [catalog.productProperty.delete](../../../catalog/product-property/catalog-product-property-delete.md).

{% endnote %}

Метод `crm.product.property.delete` удаляет свойство товаров.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор товара ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_property_id"}' \ # Replace 'your_property_id' with the actual property ID
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.property.delete
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_property_id","auth":"**put_access_token_here**"}' \ # Replace 'your_property_id' with the actual property ID
    https://**put_your_bitrix24_address**/rest/crm.product.property.delete
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.product.property.delete",
    		{
    			id: id
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
                'crm.product.property.delete',
                [
                    'id' => $id,
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
        echo 'Error deleting product property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.product.property.delete",
        {
            id: id
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

- PHP CRest

    ```php
    require_once('crest.php');

    $id = 'your_property_id'; // Replace 'your_property_id' with the actual property ID

    $result = CRest::call(
        'crm.product.property.delete',
        [
            'id' => $id
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}