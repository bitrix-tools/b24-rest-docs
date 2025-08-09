# Изменить настройки типа пользовательских полей userfieldtype.update

> Scope: [`в зависимости от места встройки`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `userfieldtype.update` изменяет настройки зарегистрированного приложением типа пользовательских полей. Возвращает _true_ или ошибку с описанием причины.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** | **Ограничения** ||
|| **USER_TYPE_ID***
[`string`](../../data-types.md) | Строковый код типа | 
- a-z0-9
- должен быть уникальным ||
|| **HANDLER***
[`URL`](../../data-types.md) | Адрес обработчика пользовательского типа | 
- в том же домене, что и основной адрес приложения
- уникальным ||
|| **TITLE***
[`string`](../../data-types.md) | Текстовое название типа. Будет выводиться в административном интерфейсе настройки пользовательских полей | ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Текстовое описание типа. Будет выводиться в административном интерфейсе настройки пользовательских полей | ||
|| **OPTIONS**
[`array`](../../data-types.md) | Дополнительные настройки. На данный момент доступен один ключ: `height` — указывает высоту пользовательского поля в пикселях. Применится любое положительное значение.
По умолчанию — `0`. Если указано `0`, то будет использована высота стандартная для отображения данной встройки | ||
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
        "USER_TYPE_ID": "test_type",
        "HANDLER": "https://www.myapplication.com/handler/",
        "TITLE": "Updated test type",
        "DESCRIPTION": "Test userfield type for documentation with updated description",
        "OPTIONS": {
            "height": 60
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/userfieldtype.update
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "USER_TYPE_ID": "test_type",
        "HANDLER": "https://www.myapplication.com/handler/",
        "TITLE": "Updated test type",
        "DESCRIPTION": "Test userfield type for documentation with updated description",
        "OPTIONS": {
            "height": 60
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/userfieldtype.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'userfieldtype.update',
    		{
    			USER_TYPE_ID: 'test_type',
    			HANDLER: 'https://www.myapplication.com/handler/',
    			TITLE: 'Updated test type',
    			DESCRIPTION: 'Test userfield type for documentation with updated description',
    			OPTIONS: {
    				height: 60,
    			},
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
        $result = $serviceBuilder->getPlacementScope()
            ->userFieldType()
            ->update(
                'custom_user_type',  // userTypeId
                'https://example.com/handler',  // handlerUrl
                'Custom User Type',  // title
                'Description of custom user type'  // description
            );
        if ($result->isSuccess()) {
            print("Update successful.");
        } else {
            print("Update failed.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldtype.update',
        {
            USER_TYPE_ID: 'test_type',
            HANDLER: 'https://www.myapplication.com/handler/',
            TITLE: 'Updated test type',
            DESCRIPTION: 'Test userfield type for documentation with updated description',
            OPTIONS: {
                height: 60,
            },
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
        'userfieldtype.update',
        [
            'USER_TYPE_ID' => 'test_type',
            'HANDLER' => 'https://www.myapplication.com/handler/',
            'TITLE' => 'Upd ated test type',
            'DESCRIPTION' => 'Test userfield type for documentation with updated description',
            'OPTIONS' => [
                'height' => 60
            ]
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
[`boolean`](../../data-types.md) | Результат изменения типа пользовательских полей ||
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
|| `ERROR_CORE` | Unable to set placement handler: Handler already binded | `HANDLER` уже занят другим типом пользовательских полей этого приложения или `USER_TYPE_ID` уже используется другим приложением ||
|| `ERROR_ARGUMENT` | Argument 'USER_TYPE_ID' is null or empty | Не задан `USER_TYPE_ID` ||
|| `ERROR_NOT_FOUND` | User Field Type not found | Не найдено пользовательское поле с указанным `USER_TYPE_ID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldtype-add.md)
- [{#T}](./userfieldtype-list.md)
- [{#T}](./userfieldtype-delete.md)