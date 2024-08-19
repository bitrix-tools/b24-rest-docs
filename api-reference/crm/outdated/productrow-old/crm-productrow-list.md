# Получить список свойств заказа

> Название метода: **crm.productrow.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`crm.item.productrow.list`](../../universal/product-rows/crm-item-productrow-list.md)

{% endnote %}

Метод возвращает список товарных позиций по фильтру. Является реализацией списочного метода для товарных позиций. Владелец товарных позиций определяется обязательными полями `OWNER_TYPE` и `OWNER_ID`, где `OWNER_TYPE` - односимвольный код типа ("D" - сделка, "L" - лид), `OWNER_ID` - идентификатор. 

## Параметры метода

Cм. описание [списочных методов](../../../how-to-call-rest-api/list-methods-pecularities.md)

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"OWNER_TYPE":"D","OWNER_ID":"1"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.productrow.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"OWNER_TYPE":"D","OWNER_ID":"1"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.productrow.list
    ```

- JS

    ```js
    var ownerType = prompt("Введите тип владельца (D, L)");
    var ownerId = prompt("Введите ID владельца");
    BX24.callMethod(
        "crm.productrow.list",
        {
            filter:
            {
                "OWNER_TYPE": ownerType,
                "OWNER_ID": ownerId
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

    $ownerType = 'D'; // Replace 'D' with the desired owner type
    $ownerId = 1; // Replace 1 with the actual owner ID

    $result = CRest::call(
        'crm.productrow.list',
        [
            'filter' =>
            [
                'OWNER_TYPE' => $ownerType,
                'OWNER_ID' => $ownerId
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}