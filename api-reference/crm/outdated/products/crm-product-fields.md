# Получить поля товара crm.product.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.fields` продолжает работать, но у него есть более актуальные аналоги [catalog.product.*](../../../catalog/product/index.md).

{% endnote %}

Метод `crm.product.fields` возвращает описание полей товара.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.fields
   ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.product.fields",
    		{}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
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
        $fieldsResult = $serviceBuilder->getCRMScope()->product()->fields();
        $fieldsDescription = $fieldsResult->getFieldsDescription();
        foreach ($fieldsDescription as $field) {
            if (isset($field['DATE_CREATE'])) {
                $field['DATE_CREATE'] = (new DateTime($field['DATE_CREATE']))->format(DateTime::ATOM);
            }
            
            if (isset($field['TIMESTAMP_X'])) {
                $field['TIMESTAMP_X'] = (new DateTime($field['TIMESTAMP_X']))->format(DateTime::ATOM);
            }
            
            print($field['ID'] . ': ' . $field['NAME'] . PHP_EOL);
        }
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.product.fields",
        {},
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

    $result = CRest::call(
        'crm.product.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Возвращаемые данные

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Активен  ||
|| **CATALOG_ID**
[`integer`](../../../data-types.md) | Идентификатор каталога  ||
|| **CREATED_BY**
[`integer`](../../../data-types.md) | Кем создан товар  ||
|| **CURRENCY_ID**
[`string`](../../../data-types.md) | Идентификатор валюты  ||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания товара  ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание  ||
|| **DESCRIPTION_TYPE**
[`string`](../../../data-types.md) | Тип описания  ||
|| **DETAIL_PICTURE**
[`product_file`](../../../data-types.md) | Детальная картинка, поле доступно в старой карточке товара  ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор товара  ||
|| **MEASURE**
[`integer`](../../../data-types.md) | Единица измерения  ||
|| **MODIFIED_BY**
[`integer`](../../../data-types.md) | Кем изменён товар  ||
|| **NAME***
[`string`](../../../data-types.md) | Название  ||
|| **PREVIEW_PICTURE**
[`product_file`](../../../data-types.md) | Картинка для анонса, поле доступно в старой карточке товара  ||
|| **PRICE**
[`double`](../../../data-types.md) | Цена  ||
|| **SECTION_ID**
[`integer`](../../../data-types.md) | Идентификатор раздела  ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка  ||
|| **TIMESTAMP_X**
[`datetime`](../../../data-types.md) | Дата изменения товара  ||
|| **VAT_ID**
[`integer`](../../../data-types.md) | Идентификатор ставки НДС  ||
|| **VAT_INCLUDED**
[`char`](../../../data-types.md) | НДС включён в цену  ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код  ||
|#