# Получить свойство товаров по идентификатору crm.product.property.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.property.get` продолжает работать, но у него есть более актуальный аналог [catalog.productProperty.get](../../../catalog/product-property/catalog-product-property-get.md).

{% endnote %}

Метод `crm.product.property.get` возвращает свойство товаров по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор свойства товара ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_product_id"}' \ # Replace 'your_product_id' with the actual product ID
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_property_id"}' \ # Replace 'your_property_id' with the actual property ID
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.property.get
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.product.property.get",
    		{
    			id: id
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    $id = $_POST['id'];
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.product.property.get',
                [
                    'id' => $id,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling crm.product.property.get: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.product.property.get",
        {
            id: id
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = 'your_property_id'; // Replace 'your_property_id' with the actual property ID

    $result = CRest::call(
        'crm.product.property.get',
        [
            'id' => $id
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}