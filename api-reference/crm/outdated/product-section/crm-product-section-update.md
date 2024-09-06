# Изменить раздел товаров crm.productsection.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.productsection.update` обновляет существующий раздел товаров.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор раздела товаров ||
|| **fields**
[`array`](../../data-types.md) | [Набор полей](./crm-product-section-add.md) — массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.productsection.fields](./crm-product-section-fields.md). 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.productsection.fields](./crm-product-section-fields.md) и посмотрите формат пришедших значений этих полей. 

{% endnote %}
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    id=$(prompt "Введите ID")
    sectionName=$(prompt "Введите название секции")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": '"$id"',
        "fields": {
            "NAME": "'"$sectionName"'"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.productsection.update
    ```

- cURL (OAuth)

    ```curl
    id=$(prompt "Введите ID")
    sectionName=$(prompt "Введите название секции")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": '"$id"',
        "fields": {
            "NAME": "'"$sectionName"'"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/crm.productsection.update
    ```

- JS

    ```js
    var id = prompt("Введите ID");
    var sectionName = prompt("Введите название секции");
    BX24.callMethod(
        "crm.productsection.update",
        {
            id: id,
            fields:
            {
                "NAME": sectionName
            }
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

    $id = readline("Введите ID: ");
    $sectionName = readline("Введите название секции: ");

    $result = CRest::call(
        'crm.productsection.update',
        [
            'id' => $id,
            'fields' => [
                'NAME' => $sectionName
            ]
        ]
    );

    if (isset($result['error'])) {
        echo "Error: " . $result['error_description'] . "\n";
    } else {
        echo "Updated section with ID " . $id . "\n";
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}