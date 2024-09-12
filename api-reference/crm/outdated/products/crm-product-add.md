# Добавить товар crm.product.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новый товар.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для создания товара.

Чтобы узнать требуемый формат полей, выполните метод [crm.product.fields](./crm-product-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

{% note info %}

С версии **CRM 21.700.0** включена поддержка автогенерации символьного кода товара, при условии, что в настройках инфоблока для символьного кода включена генерация и не используется внешний сервис. Задействован метод [generateMnemonicCode](https://dev.1c-bitrix.ru/api_help/iblock/classes/ciblockelement/generatemnemoniccode.php).

Если сгенерированный символьный код более 100 символов, то он автоматически обрезается до 100 знаков. Это требуется учитывать при создании запросов, передавая уникальное значение в начале/середине названия товара для избежания совпадения символьных кодов.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"NAME":"1С-Битрикс: Управление сайтом - Старт","CURRENCY_ID":"RUB","PRICE":4900,"SORT":500}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"NAME":"1С-Битрикс: Управление сайтом - Старт","CURRENCY_ID":"RUB","PRICE":4900,"SORT":500},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.add
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.product.add",
        {
            fields:
            {
                "NAME": "1С-Битрикс: Управление сайтом - Старт",
                "CURRENCY_ID": "RUB",
                "PRICE": 4900,
                "SORT": 500
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан новый товар с ID " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.product.add',
        [
            'fields' => [
                'NAME' => '1С-Битрикс: Управление сайтом - Старт',
                'CURRENCY_ID' => 'RUB',
                'PRICE' => 4900,
                'SORT' => 500
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}