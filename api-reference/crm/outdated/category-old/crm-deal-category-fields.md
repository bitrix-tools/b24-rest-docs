# Получить описания полей направления сделок crm.dealcategory.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`crm.category.fields`](../../universal/category/crm-category-fields.md)

{% endnote %}

Метод возвращает описание полей направления сделок.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.dealcategory.fields
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.dealcategory.fields
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.dealcategory.fields",
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
        'crm.dealcategory.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Возвращаемые данные

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CREATED_DATE** 
[`datetime`](../../../data-types.md) | Дата создания  ||
|| **ID** 
[`integer`](../../../data-types.md)| Идентификатор направления сделки ||
|| **IS_LOCKED**
[`char`](../../../data-types.md) | Заблокировано  ||
|| **NAME***
[`string`](../../../data-types.md)| Название направления  ||
|| **SORT** 
[`integer`](../../../data-types.md) | Сортировка   ||
|#
