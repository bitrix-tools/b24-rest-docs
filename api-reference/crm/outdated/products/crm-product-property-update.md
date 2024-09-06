# Изменить свойство товаров crm.product.property.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет существующее свойство товаров.

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

- PHP

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