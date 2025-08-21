# Получить информацию о доступности функционала на портале feature.get

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `feature.get` возвращает информацию о доступности функционала на конкретном портале.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../data-types.md) | Доступные ключи:
- `rest_offline_extended` — доступность офлайн-событий
- `rest_auth_connector` — доступность ключа `auth_connector` в событиях ||
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
        "CODE": "rest_offline_extended"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/feature.get
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "CODE": "rest_offline_extended",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/feature.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"feature.get",
    		{
    			"CODE": "rest_offline_extended"
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
                'feature.get',
                [
                    'CODE' => 'rest_offline_extended'
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
        echo 'Error getting feature: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "feature.get",
        {
            "CODE": "rest_offline_extended"
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
        'feature.get',
        [
            'CODE' => 'rest_offline_extended'
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
        "value": "Y"
    },
    "time": {
        "start": 1722434594.84942,
        "finish": 1722434594.90542,
        "duration": 0.0560011863708496,
        "processing": 0.000065088272094726,
        "date_start": "2024-07-31T14:03:14+00:00",
        "date_finish": "2024-07-31T14:03:14+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект содержит информацию о доступности метода:
- `value` — (Y/N) наличие функционала на портале
- `lang_selfhosted` — *lang* заменяется на en, ru, ua, kz и так далее (используется для коробочной версии *Битрикс24*) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"CODE_EMPTY",
    "error_description":"CODE can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %} 

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `CODE_EMPTY` | CODE can't be empty | Не передан параметр CODE ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./method-get.md)
- [{#T}](./scope.md)
- [{#T}](./app-info.md)
- [{#T}](./access-name.md)
- [{#T}](./server-time.md)
- [{#T}](./methods.md)