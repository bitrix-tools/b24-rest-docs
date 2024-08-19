# Получить список товаров по фильтру

> Название метода: **crm.product.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список товаров по фильтру.

## Параметры метода

См. описание [списочных методов](../../../common/index.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"NAME":"ASC"},"filter":{"CATALOG_ID":"your_catalog_id"},"select":["ID","NAME","CURRENCY_ID","PRICE"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"NAME":"ASC"},"filter":{"CATALOG_ID":"your_catalog_id"},"select":["ID","NAME","CURRENCY_ID","PRICE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.list
    ```

- JS

    ```js
    var catalogId = prompt("Введите ID каталога");
    BX24.callMethod(
        "crm.product.list",
        {
            order: { "NAME": "ASC" },
            filter: { "CATALOG_ID": catalogId },
            select: [ "ID", "NAME", "CURRENCY_ID", "PRICE" ]
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

    Чтобы получить свойства товара, нужно в `select` указать `PROPERTY_*`.

    ```js
    $arFields['select'] = array('*', 'PROPERTY_*');
    ```

- PHP

    ```php
    require_once('crest.php');

    $catalogId = 'your_catalog_id'; // Replace 'your_catalog_id' with the actual catalog ID

    $result = CRest::call(
        'crm.product.list',
        [
            'order' => ['NAME' => 'ASC'],
            'filter' => ['CATALOG_ID' => $catalogId],
            'select' => ['ID', 'NAME', 'CURRENCY_ID', 'PRICE']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}