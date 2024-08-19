# Получить поля раздела товаров

> Название метода: **crm.productsection.fields**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.productsection.fields` возвращает описание [полей раздела](./crm-product-section-add.md) товара.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.productsection.fields
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/crm.productsection.fields
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.productsection.fields",
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.productsection.fields',
        []
    );

    if (isset($result['error'])) {
        echo "Error: " . $result['error_description'] . "\n";
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

## Поля

#|
|| **Название**
`тип`  | **Описание** | **Примечание** ||
|| **CATALOG_ID** 
[`integer`](../../data-types.md) | Идентификатор каталога | Неизменяемое ||
|| **ID** 
[`integer`](../../data-types.md) | Идентификатор раздела | Только для чтения ||
|| **NAME** 
[`string`](../../data-types.md) | Название раздела | Обязательное ||
|| **SECTION_ID** 
[`integer`](../../data-types.md) | Идентификатор привязанного раздела | ||
|| **XML_ID** 
[`string`](../../data-types.md) | Символьный код | ||
|#