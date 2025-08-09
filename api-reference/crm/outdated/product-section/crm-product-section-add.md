# Добавить новый раздел товаров crm.productsection.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.productsection.add` создаёт новый раздел товаров.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`array`](../../data-types.md) | Набор полей — массив вида `array("поле"=>"значение"[, ...])`, содержащий значения полей раздела товаров. 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.productsection.fields](./crm-product-section-fields.md) и посмотрите формат пришедших значений этих полей. 

{% endnote %}
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    catalogId=$(prompt "Введите ID каталога")
    sectionId=$(prompt "Введите ID родительской секции (если в корне, то 0)")
    sectionName=$(prompt "Введите название секции")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "CATALOG_ID": '"$catalogId"',
            "NAME": "'"$sectionName"'",
            "SECTION_ID": '"$sectionId"'
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.productsection.add
    ```

- cURL (OAuth)

    ```curl
    catalogId=$(prompt "Введите ID каталога")
    sectionId=$(prompt "Введите ID родительской секции (если в корне, то 0)")
    sectionName=$(prompt "Введите название секции")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "CATALOG_ID": '"$catalogId"',
            "NAME": "'"$sectionName"'",
            "SECTION_ID": '"$sectionId"'
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/crm.productsection.add
    ```

- JS


    ```js
    try
    {
    	const catalogId = prompt("Введите ID каталога");
    	const sectionId = prompt("Введите ID родительской секции (если в корне, то 0))");
    	const sectionName = prompt("Введите название секции");
    
    	const response = await $b24.callMethod(
    		"crm.productsection.add",
    		{
    			fields:
    			{
    				CATALOG_ID: catalogId,
    				NAME: sectionName,
    				SECTION_ID: sectionId
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.info("Создан новый раздел с ID " + result);
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $catalogId = readline("Введите ID каталога");
        $sectionId = readline("Введите ID родительской секции (если в корне, то 0)");
        $sectionName = readline("Введите название секции");
    
        $response = $b24Service
            ->core
            ->call(
                "crm.productsection.add",
                [
                    'fields' => [
                        'CATALOG_ID' => $catalogId,
                        'NAME' => $sectionName,
                        'SECTION_ID' => $sectionId
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo "Создан новый раздел с ID " . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating product section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var catalogId = prompt("Введите ID каталога");
    var sectionId = prompt("Введите ID родительской секции (если в корне, то 0))");
    var sectionName = prompt("Введите название секции");
    BX24.callMethod(
        "crm.productsection.add",
        {
            fields:
            {
                CATALOG_ID: catalogId,
                NAME: sectionName,
                SECTION_ID: sectionId
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан новый раздел с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $catalogId = readline("Введите ID каталога: ");
    $sectionId = readline("Введите ID родительской секции (если в корне, то 0): ");
    $sectionName = readline("Введите название секции: ");

    $result = CRest::call(
        'crm.productsection.add',
        [
            'fields' => [
                'CATALOG_ID' => $catalogId,
                'NAME' => $sectionName,
                'SECTION_ID' => $sectionId
            ]
        ]
    );

    if (isset($result['error'])) {
        echo "Error: " . $result['error_description'] . "\n";
    } else {
        echo "Создан новый раздел с ID " . $result['result'] . "\n";
    }
    ```

{% endlist %}