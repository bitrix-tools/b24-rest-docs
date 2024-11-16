# Получить список зарегистрированных типов пользовательских полей userfieldtype.list

> Scope: [`в зависимости от места встройки`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список зарегистрированных приложением типов пользовательских полей. На выход отдает список типов полей с постраничной навигацией.

Без параметров. 

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/userfieldtype.list
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/userfieldtype.list
    ```

- JS

    ```js
    BX24.callMethod(
        'userfieldtype.list',
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```


- B24-PHP-SDK

    ```php
        
    try {
        $userFieldTypesResult = $serviceBuilder->getPlacementScope()->userFieldType()->list();
        $userFieldTypes = $userFieldTypesResult->getUserFieldTypes();
    
        foreach ($userFieldTypes as $userFieldType) {
            print("Description: " . $userFieldType->DESCRIPTION . "\n");
            print("Handler: " . $userFieldType->HANDLER . "\n");
            print("Title: " . $userFieldType->TITLE . "\n");
            print("User Type ID: " . $userFieldType->USER_TYPE_ID . "\n");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldtype.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- B24-PHP-SDK

    ```php
    
try {
    $userFieldTypesResult = $serviceBuilder->getPlacementScope()->userFieldType()->list();
    $userFieldTypes = $userFieldTypesResult->getUserFieldTypes();

    foreach ($userFieldTypes as $userFieldType) {
        print("Description: " . $userFieldType->DESCRIPTION . "\n");
        print("Handler: " . $userFieldType->HANDLER . "\n");
        print("Title: " . $userFieldType->TITLE . "\n");
        print("User Type ID: " . $userFieldType->USER_TYPE_ID . "\n");
    }
} catch (Throwable $e) {
    print("Error: " . $e->getMessage());
}

    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "USER_TYPE_ID": "my_custom_type_2",
            "HANDLER": "http:\/\/test.com\/test2.php",
            "TITLE": "test title 2",
            "DESCRIPTION":"test desc 2"
        },
        {
            "USER_TYPE_ID": "my_custom_type_1",
            "HANDLER": "http:\/\/test.com\/test1.php",
            "TITLE": "test title 1",
            "DESCRIPTION": "test desc 1"
        },
        {
            "USER_TYPE_ID": "test_user_type",
            "HANDLER": "http:\/\/test.com\/test.php",
            "TITLE": "test title",
            "DESCRIPTION": "test desc"
        }
    ],
    "total": 3,
    "time":{
        "start":1724423274.842117,
        "finish":1724423275.558021,
        "duration":0.7159039974212646,
        "processing":0.0018908977508544922,
        "date_start":"2024-08-23T16:27:54+02:00",
        "date_finish":"2024-08-23T16:27:55+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **total**
[`integer`](../../data-types.md) | Число обработанных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Продолжите изучение

- [{#T}](./userfieldtype-add.md)
- [{#T}](./userfieldtype-update.md)
- [{#T}](./userfieldtype-delete.md)