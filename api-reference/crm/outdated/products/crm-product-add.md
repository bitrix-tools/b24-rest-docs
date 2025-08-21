# Добавить товар crm.product.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.add` продолжает работать, но у него есть более актуальные аналоги [catalog.product.*](../../../catalog/product/index.md).

{% endnote %}

Метод `crm.product.add` создает новый товар. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для создания товара.

Чтобы узнать требуемый формат полей, выполните метод [crm.product.fields](./crm-product-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

{% note info %}

С версии **CRM 21.700.0** включена поддержка автогенерации символьного кода товара.

Если сгенерированный символьный код более 100 символов, то он автоматически обрезается до 100 знаков. Это требуется учитывать при создании запросов, передавая уникальное значение в начале/середине названия товара для избежания совпадения символьных кодов.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"NAME":"Стул пластиковый","CURRENCY_ID":"RUB","PRICE":4900,"SORT":500}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"NAME":"Стул пластиковый","CURRENCY_ID":"RUB","PRICE":4900,"SORT":500},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.product.add',
    		{
    			fields:
    			{
    				"NAME": "Стул пластиковый",
    				"CURRENCY_ID": "RUB",
    				"PRICE": 4900,
    				"SORT": 500
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info('Создан новый товар с ID ' + result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php        
    try {
        $fields = [
            'NAME' => 'Sample Product',
            'PRICE' => '100.00',
            'CURRENCY_ID' => 'USD',
            'ACTIVE' => 'Y',
            'DATE_CREATE' => (new DateTime())->format(DateTime::ATOM),
            'TIMESTAMP_X' => (new DateTime())->format(DateTime::ATOM),
            'CREATED_BY' => 1,
            'MODIFIED_BY' => 1,
            'CATALOG_ID' => 1,
            'DESCRIPTION' => 'This is a sample product.',
            'VAT_ID' => 1,
            'VAT_INCLUDED' => 'Y',
            'MEASURE' => 1,
            'SECTION_ID' => 1,
            'SORT' => 100,
            'XML_ID' => 'sample_product_001',
        ];
        $result = $serviceBuilder->getCRMScope()->product()->add($fields);
        print($result->getId());
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.product.add",
        {
            fields:
            {
                "NAME": "Стул пластиковый",
                "CURRENCY_ID": "RUB",
                "PRICE": 4900,
                "SORT": 500
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан новый товар с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.product.add',
        [
            'fields' => [
                'NAME' => 'Стул пластиковый',
                'CURRENCY_ID' => 'RUB',
                'PRICE' => 4900,
                'SORT' => 500
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}