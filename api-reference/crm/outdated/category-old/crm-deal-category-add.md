# Создать новое направление сделок

> Название метода: **crm.dealcategory.add**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`crm.category.add`](../../universal/category/crm-category-add.md)

{% endnote %}

Метод создаёт новое направление сделок.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для создания направления сделок.

Чтобы узнать требуемый формат полей, выполните метод [`crm.dealcategory.fields`](./crm-deal-category-fields.md) и посмотрите формат пришедших значений этих полей
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"NAME":"Новое направление","SORT":"20"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.dealcategory.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"NAME":"Новое направление","SORT":"20"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.dealcategory.add
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.dealcategory.add",
        {
            fields:
            {
                "NAME": "Новое направление",
                "SORT": "20"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создано направление с ID " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.dealcategory.add',
        [
            'fields' =>
            [
                'NAME' => 'Новое направление',
                'SORT' => '20'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}