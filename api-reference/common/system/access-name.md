# Получить названия прав доступа access.name

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `access.name` получает названия прав доступа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACCESS***
[`array`](../../data-types.md) | Список идентификаторов прав, названия для которых нужно получить ||
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/access.name
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
    https://**put_your_bitrix24_address**/rest/access.name
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'access.name',
    		{
    			'ACCESS': ['G2', 'AU']
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch(error)
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
                'access.name',
                [
                    'ACCESS' => ['G2', 'AU']
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
        echo 'Error calling access.name: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "access.name",
        {
            "ACCESS": ["G2", "AU"]
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
        'access.name',
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
    "result": {
        "G2": {
            "provider": "",
            "name": "Все посетители",
            "provider_id": "other"
        },
        "AU": {
            "provider": "",
            "name": "Все авторизованные пользователи",
            "provider_id": "other"
        }
    },
    "time": {
        "start": 1722002504.2838,
        "finish": 1722002504.32483,
        "duration": 0.0410301685333252,
        "processing": 0.00145506858825684,
        "date_start": "2024-07-26T14:01:44+00:00",
        "date_finish": "2024-07-26T14:01:44+00:00",
        "operating": 0
    }
}

```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объекты с описанием прав ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./method-get.md)
- [{#T}](./scope.md)
- [{#T}](./app-info.md)
- [{#T}](./feature-get.md)
- [{#T}](./server-time.md)
- [{#T}](./methods.md)