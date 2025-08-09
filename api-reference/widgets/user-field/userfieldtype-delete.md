# Удалить зарегистрированный тип пользовательских полей userfieldtype.delete

> Scope: [`в зависимости от места встройки`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `userfieldtype.delete` удаляет зарегистрированный приложением тип пользовательских полей. Возвращает _true_ или ошибку с описанием причины.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** | **Ограничения** ||
|| **USER_TYPE_ID***
[`string`](../../data-types.md) | Строковый код типа | 
- a-z0-9
- должен быть уникальным ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "USER_TYPE_ID": "test"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/userfieldtype.delete
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "USER_TYPE_ID": "test",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/userfieldtype.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'userfieldtype.delete',
    		{
    			USER_TYPE_ID: 'test'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP

    ```php        
    try {
        $userTypeId = 'example_user_type_id'; // Replace with the actual user type ID
        $result = $serviceBuilder
            ->getPlacementScope()
            ->userFieldType()
            ->delete($userTypeId);
        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print("Error occurred while deleting user field type.");
        }
    } catch (\Throwable $e) {
        print("Exception: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldtype.delete', 
        {
            USER_TYPE_ID: 'test'
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldtype.delete',
        [
            'USER_TYPE_ID' => 'test'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":true,
    "time":{
        "start":1724421710.397825,
        "finish":1724421711.040353,
        "duration":0.6425280570983887,
        "processing":5.888938903808594e-5,
        "date_start":"2024-08-23T16:01:50+02:00",
        "date_finish":"2024-08-23T16:01:51+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления типа пользовательских полей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_NOT_FOUND",
    "error_description":"User Field Type not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %} 

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ERROR_ARGUMENT` | Argument 'USER_TYPE_ID' is null or empty | Не задан `USER_TYPE_ID` ||
|| `ERROR_NOT_FOUND` | User Field Type not found | Не найдено пользовательское поле с указанным `USER_TYPE_ID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldtype-add.md)
- [{#T}](./userfieldtype-update.md)
- [{#T}](./userfieldtype-list.md)