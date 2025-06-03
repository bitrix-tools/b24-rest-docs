# Получить поля дополнительных настроек свойств пользовательского типа crm.product.property.settings.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.property.settings.fields` продолжает работать, но у него есть более актуальный аналог [catalog.productPropertyFeature.*](../../../catalog/product-property-feature/index.md).

{% endnote %}

Метод `crm.product.property.settings.fields` возвращает описание полей дополнительных настроек свойства товаров пользовательского типа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyType** |  Тип свойства ||
|| **userType** | Пользовательский тип свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"propertyType":"S","userType":"HTML"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.property.settings.fields
   ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"propertyType":"S","userType":"HTML","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.property.settings.fields
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.product.property.settings.fields",
        {propertyType: "S", userType: "HTML"},
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
        'crm.product.property.settings.fields',
        [
            'propertyType' => 'S',
            'userType' => 'HTML'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}