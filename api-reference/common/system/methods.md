# Получить список доступных методов methods

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `methods` получает список доступных методов.

{% note warning "Развитие метода остановлено" %}

Метод `methods` продолжает работать, но ему недоступна информация по части методов.
У метода есть более актуальный аналог [method.get](./method-get.md). 

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **full**
[`boolean`](../../data-types.md) | Если параметр принимает значение `true`, то метод вернет список всех методов ||
|| **scope**
[`string`](../../data-types.md) | Показ методов, входящих в указанное разрешение. Если задан параметр без значения (`methods?scope=&auth=xxxxx`), то будут выведены все общие методы. ||
|#

> Если метод вызван без параметров, то он вернет список всех методов, доступных текущему приложению.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "scope": "user"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/methods
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "scope": "user",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/methods
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"methods",
    		{
    			"scope": "user"
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
                'methods',
                [
                    'scope' => 'user',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
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
        "methods",
        {
            "scope": "user"
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
        'methods',
        [
            'scope' => 'user'
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
    "result": [
        "user.fields",
        "user.current",
        "user.get",
        "user.search",
        "user.add",
        "user.update",
        "user.online",
        "user.counters",
        "user.history.list",
        "user.history.fields.list"
    ],
    "time": {
        "start": 1721986432.32646,
        "finish": 1721986432.3598,
        "duration": 0.0333478450775147,
        "processing": 0.000032901763916015,
        "date_start": "2024-07-26T09:33:52+00:00",
        "date_finish": "2024-07-26T09:33:52+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив со списком разрешений ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./method-get.md)
- [{#T}](./scope.md)
- [{#T}](./app-info.md)
- [{#T}](./access-name.md)
- [{#T}](./feature-get.md)
- [{#T}](./server-time.md)