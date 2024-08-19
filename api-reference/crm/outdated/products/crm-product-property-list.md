# Получить список свойств товаров

> Название метода: **crm.product.property.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список свойств товаров.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order** |  Сортировка ||
|| **filter** | Поля фильтра ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"PROPERTY_TYPE":"S","USER_TYPE":"HTML"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.property.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"PROPERTY_TYPE":"S","USER_TYPE":"HTML"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.property.list
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.product.property.list", {
            order: {"SORT": "ASC"},
            filter: {
                "PROPERTY_TYPE": "S",
                "USER_TYPE": "HTML"
            }
        },
        function (result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.dir(result.data());
                if (result.more())
                    result.next();
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.product.property.list',
        [
            'order' => ['SORT' => 'ASC'],
            'filter' => [
                'PROPERTY_TYPE' => 'S',
                'USER_TYPE' => 'HTML'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}