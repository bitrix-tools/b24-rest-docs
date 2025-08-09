# Определить набор прав пользователя user.access

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.access` определяет, обладает ли текущий пользователь хотя бы одним из заданного параметром `ACCESS` набора прав.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACCESS***
[`array`](../../data-types.md) | Идентификатор или список идентификаторов прав, доступ к которым нужно проверить ||
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
        "ACCESS": ["G2", "AU"]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.access
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ACCESS": ["G2", "AU"],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.access
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'user.access',
    		{
    			"'ACCESS": ["G2", "AU"]
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
        $response = $b24Service
            ->core
            ->call(
                'user.access',
                [
                    "'ACCESS" => ["G2", "AU"]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling user.access: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.access",
        {
            "'ACCESS": ["G2", "AU"]
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
        'user.access',
        [
            'ACCESS' => ['G2','AU']
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
    "result": true,
    "time": {
        "start": 1722001311.94644,
        "finish": 1722001311.98622,
        "duration": 0.0397801399230957,
        "processing": 0.000041961669921875,
        "date_start": "2024-07-26T13:41:51+00:00",
        "date_finish": "2024-07-26T13:41:51+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращается `true`, если текущий пользователь обладает хотя бы одним из перечисленных в параметре `ACCESS` прав, `false` — в противном случае ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./user-admin.md)
- [{#T}](./profile.md)