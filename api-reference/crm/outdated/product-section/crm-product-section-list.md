# Получить список разделов crm.productsection.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.productsection.list` возвращает список разделов товаров по фильтру. Является реализацией списочного метода для разделов товаров. Ожидается, что в фильтре будет определён параметр `CATALOG_ID`. В противном случае разделы будут выбираться из каталога по умолчанию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив содержит список полей, которые необходимо выбрать ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных элементов ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных элементов  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    catalogId=$(prompt "Введите ID каталога")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "order": { "NAME": "ASC" },
        "filter": { "CATALOG_ID": '"$catalogId"' },
        "select": [ "ID", "NAME" ]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.productsection.list
    ```

- cURL (OAuth)

    ```curl
    catalogId=$(prompt "Введите ID каталога")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "order": { "NAME": "ASC" },
        "filter": { "CATALOG_ID": '"$catalogId"' },
        "select": [ "ID", "NAME" ],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/crm.productsection.list
    ```

- JS

    ```js
    var catalogId = prompt("Введите ID каталога");
    BX24.callMethod(
        "crm.productsection.list",
        {
            order: { "NAME": "ASC" },
            filter: { "CATALOG_ID": catalogId },
            select: [ "ID", "NAME" ]
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

    $catalogId = readline("Введите ID каталога: ");

    $result = CRest::call(
        'crm.productsection.list',
        [
            'order' => [ 'NAME' => 'ASC' ],
            'filter' => [ 'CATALOG_ID' => $catalogId ],
            'sel ect' => [ 'ID', 'NAME' ]
        ]
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