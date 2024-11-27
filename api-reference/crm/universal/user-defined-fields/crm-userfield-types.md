# Получить список типов пользовательских полей crm.userfield.types

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны параметры и их типы
- отсутствует ответ в случае ошибки и успеха

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.userfield.types` возвращает описание полей для пользовательских полей.

Список типов пользовательских полей. Содержит описания типов:

- string
- integer
- double
- boolean
- datetime
- enumeration
- iblock_section
- iblock_element
- employee
- crm_status
- crm
- address
- money
- url

Также будут возвращены [типы](../user-defined-field-types/index.md) пользовательских полей, зарегистрированные текущим приложением.

## Пример

{% list tabs %}

- JS
  
    ```js
    BX24.callMethod(
        "crm.userfield.types",
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
        'crm.userfield.types',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- CURL (oauth)

    ```
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/crm.userfield.types?auth=**put_access_token_here**

    ```

- CURL (webhook)

    ```
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.userfield.types
    ```

- PHP (B24PhpSdk)

    ```php
    try {
        $userfieldService = $serviceBuilder->getCRMScope()->userfield();
        $userfieldTypesResult = $userfieldService->types();

        foreach ($userfieldTypesResult->getTypes() as $item) {
            print("ID: " . $item->ID . "\n");
            print("Title: " . $item->title . "\n");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . "\n");
    }
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}