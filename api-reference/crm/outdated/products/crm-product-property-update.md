# Изменить свойство товаров crm.product.property.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.property.update` продолжает работать, но у него есть более актуальный аналог [catalog.productProperty.update](../../../catalog/product-property/catalog-product-property-update.md).

{% endnote %}

Метод `crm.product.property.update` обновляет существующее свойство товаров.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор свойства товаров ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для обновления свойства товаров.

Чтобы узнать требуемый формат полей, выполните метод [crm.product.property.fields](./crm-product-property-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_property_id","fields":{"NAME":"New Property Name"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.property.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_property_id","fields":{"NAME":"New Property Name"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.property.update
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const propertyName = prompt("Введите новое название");
    
    	const response = await $b24.callMethod(
    		"crm.product.property.update",
    		{
    			id: id,
    			fields:
    			{
    				"NAME": propertyName
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.dir(result);
    	if(response.more())
    		response.next();
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    $id = readline("Введите ID");
    $propertyName = readline("Введите новое название");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.product.property.update',
                [
                    'id' => $id,
                    'fields' => [
                        'NAME' => $propertyName
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
            if ($result->more()) {
                $result->next();
            }
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating product property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    var propertyName = prompt("Введите новое название");
    BX24.callMethod(
        "crm.product.property.update",
        {
            id: id,
            fields:
            {
                "NAME": propertyName
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = 'your_property_id'; // Replace 'your_property_id' with the actual property ID
    $propertyName = 'New Property Name'; // Replace 'New Property Name' with the new name

    $result = CRest::call(
        'crm.product.property.update',
        [
            'id' => $id,
            'fields' => [
                'NAME' => $propertyName
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}