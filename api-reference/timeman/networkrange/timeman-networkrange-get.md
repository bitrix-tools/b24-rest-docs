# Получить диапазон сетевых адресов timeman.networkrange.get

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.networkrange.get` получает диапазоны сетевых адресов офисной сети.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.networkrange.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.networkrange.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.networkrange.get',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.networkrange.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error()->ex;
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting network range: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.networkrange.get',
        {},
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'timeman.networkrange.get',
        []
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
        {
            "ip_range": "10.0.0.0-10.255.255.255",
            "name": "10.x.x.x"
        },
        {
            "ip_range": "172.16.0.0-172.31.255.255",
            "name": "172.x.x.x"
        },
        {
            "ip_range": "192.168.0.0-192.168.255.255",
            "name": "192.168.x.x"
        }
    ],
    "time": {
        "start": 1742999109.792954,
        "finish": 1742999109.827862,
        "duration": 0.034908056259155273,
        "processing": 0.0008471012115478516,
        "date_start": "2025-03-26T17:25:09+03:00",
        "date_finish": "2025-03-26T17:25:09+03:00",
        "operating_reset_at": 1742999709,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Корневой элемент ответа.

Содержит список объектов. Каждый объект содержит описание [диапазона сетевых адресов](#ip_range) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект диапазона {#ip_range}

#|
|| **Название**
`тип` | **Описание** ||
|| **ip_range**
 [`string`](../../data-types.md) | Диапазон сетевых адресов ||
|| **name**
 [`string`](../../data-types.md) | Название диапазона ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to use this method"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_ERROR` | You don't have access to use this method | Метод доступен только администратору ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-networkrange-set.md)
- [{#T}](./timeman-networkrange-check.md)