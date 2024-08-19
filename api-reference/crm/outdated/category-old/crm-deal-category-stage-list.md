# Получить список стадий сделок для направления

> Название метода: **crm.dealcategory.stage.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать методы воронок [`crm.category.*`](../../universal/category/index.md)

{% endnote %}

Метод возвращает список стадий сделок для направления по идентификатору. Равносилен вызову метода [`crm.status.list`](../../status/crm-status-list.md) с параметром `ENTITY_ID`, равным результату вызова [`crm.dealcategory.status`](crm-deal-category-status.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md)| Идентификатор направления. Если указать `id = 0` или ничего [не указывать](*кавычки), то вернёт статусы «дефолтного» направления. Если указать `id > 0` [несуществующего направления](*id), ничего не возвращает ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.dealcategory.stage.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.dealcategory.stage.list
    ```

- JS

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.dealcategory.stage.list",
        { id: id },
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

    $id = 1; // Replace 1 with the actual ID

    $result = CRest::call(
        'crm.dealcategory.stage.list',
        [
            'id' => $id
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}


[*кавычки]: Пустые кавычки или совсем не передавать параметр

[*id]: Например, указываем id = 10, но направления с id=10 нет в системе