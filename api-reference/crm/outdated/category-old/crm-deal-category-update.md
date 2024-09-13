# Обновить направление сделок crm.dealcategory.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`crm.category.update`](../../universal/category/crm-category-update.md)

{% endnote %}

Метод обновляет существующее направление.

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md)| Идентификатор направления ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для обновления направления сделок.

Чтобы узнать требуемый формат полей, выполните метод [`crm.dealcategory.fields`](./crm-deal-category-fields.md) и посмотрите формат пришедших значений этих полей (кроме полей помеченных атрибутами **isReadOnly** и **isImmutable**) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1","fields":{"SORT":"100"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.dealcategory.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1","fields":{"SORT":"100"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.dealcategory.update
    ```

- JS

    ```js
    var id = prompt("Введите ID");
    var sort = prompt("Введите сортировку");
    sort = parseInt(sort);
    if(isNaN(sort) || sort < 0)
    {
        sort = 0;
    }

    BX24.callMethod(
        "crm.dealcategory.update",
        {
            id: id,
            fields: { "SORT": sort }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $id = 1; // Replace 1 with the actual ID
    $sort = 100; // Replace 100 with the actual sort value

    $result = CRest::call(
        'crm.dealcategory.update',
        [
            'id' => $id,
            'fields' => ['SORT' => $sort]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}