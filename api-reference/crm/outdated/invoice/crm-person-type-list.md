# Получить список типов плательщиков

> Название метода: **crm.persontype.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод возвращает список типов плательщиков.

{% note info %}

Для платёжных систем, которые используются в CRM (для счетов, сделок), типы плательщиков нужно получать через метод `crm.persontype.list`. Если создаётся платёжная система для заказов, то нужно использовать метод [`sale.persontype.list`](../../../sale/person-type/sale-person-type-list.md).

{% endnote %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order** | Поля сортировки ||
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
    -d '{"order":{"ID":"ASC"},"filter":{"NAME":"CRM_COMPANY"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.persontype.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"ASC"},"filter":{"NAME":"CRM_COMPANY"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.persontype.list
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.persontype.list", {
            order: {"ID": "ASC"},
            filter: {
                "NAME": "CRM_COMPANY",
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
        'crm.persontype.list',
        [
            'order' => ['ID' => 'ASC'],
            'filter' => ['NAME' => 'CRM_COMPANY']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}