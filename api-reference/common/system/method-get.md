# Получить список доступных методов method.get

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `method.get` возвращает два параметра `isExisting` и `isAvailable`, которые  определяют существование метода на портале и его доступность для вызова.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название метода для проверки в нижнем регистре, например `user.get` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "name": "user.get"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/method.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "name": "user.get",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/method.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"method.get",
    		{
    			"name": "user.get"
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
                'method.get',
                [
                    'name' => 'user.get',
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
        echo 'Error calling method: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "method.get",
        {
            "name": "user.get"
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
        'method.get',
        [
            'name' => 'user.get'
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
    "result": {
        "isExisting": true,
        "isAvailable": true
    },
    "time": {
        "start": 1721983189.4629,
        "finish": 1721983189.50346,
        "duration": 0.0405528545379639,
        "processing": 0.000152111053466796,
        "date_start": "2024-07-26T08:39:49+00:00",
        "date_finish": "2024-07-26T08:39:49+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Возвращаются два параметра:

- `isExisting => true/false` — определяет существует ли метод именно на этом портале
- `isAvailable => true/false` — определяет доступность метода для вызова с текущими доступами ([scope](./scope.md)) приложения ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}


## Продолжите изучение

- [{#T}](./scope.md)
- [{#T}](./app-info.md)
- [{#T}](./access-name.md)
- [{#T}](./feature-get.md)
- [{#T}](./server-time.md)
- [{#T}](./methods.md)