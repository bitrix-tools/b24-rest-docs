# Установить диапазон сетевых адресов timeman.networkrange.set

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.networkrange.set` устанавливает диапазоны сетевых адресов для офисной сети.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **RANGES***
[`string`](../../data-types.md) | Диапазоны сетевых адресов в виде списка объектов. Каждый объект содержит описание [диапазона сетевых адресов](#ip_range).

```php
ranges: [
    {
        "ip_range": "10.0.0.0-10.255.255.255",
        "name": "Офисная сеть 10.x.x.x"
    },
    {
        "ip_range": "10.10.0.1",
        "name": "Адрес 10.10.0.1"
    },
    ...
]
```

Диапазон может содержать:
- блок адресов, например, `10.0.0.0-10.255.255.255`
- один адрес, например, `10.10.0.1` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ranges":[{"ip_range":"10.0.0.0-10.255.255.255","name":"Офисная сеть 10.x.x.x"},{"ip_range":"172.16.0.0-172.31.255.255","name":"Офисная сеть 172.x.x.x"},{"ip_range":"192.168.0.0-192.168.255.255","name":"Офисная сеть 192.168.x.x"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/timeman.networkrange.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ranges":[{"ip_range":"10.0.0.0-10.255.255.255","name":"Офисная сеть 10.x.x.x"},{"ip_range":"172.16.0.0-172.31.255.255","name":"Офисная сеть 172.x.x.x"},{"ip_range":"192.168.0.0-192.168.255.255","name":"Офисная сеть 192.168.x.x"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.networkrange.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.networkrange.set',
    		{
    			ranges: [
    				{
    					"ip_range": "10.0.0.0-10.255.255.255",
    					"name": "Офисная сеть 10.x.x.x"
    				},
    				{
    					"ip_range": "172.16.0.0-172.31.255.255",
    					"name": "Офисная сеть 172.x.x.x"
    				},
    				{
    					"ip_range": "192.168.0.0-192.168.255.255",
    					"name": "Офисная сеть 192.168.x.x"
    				}
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.networkrange.set',
                [
                    'ranges' => [
                        [
                            "ip_range" => "10.0.0.0-10.255.255.255",
                            "name"     => "Офисная сеть 10.x.x.x"
                        ],
                        [
                            "ip_range" => "172.16.0.0-172.31.255.255",
                            "name"     => "Офисная сеть 172.x.x.x"
                        ],
                        [
                            "ip_range" => "192.168.0.0-192.168.255.255",
                            "name"     => "Офисная сеть 192.168.x.x"
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting network ranges: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.networkrange.set',
        {
            ranges: [
                {
                    "ip_range": "10.0.0.0-10.255.255.255",
                    "name": "Офисная сеть 10.x.x.x"
                },
                {
                    "ip_range": "172.16.0.0-172.31.255.255",
                    "name": "Офисная сеть 172.x.x.x"
                },
                {
                    "ip_range": "192.168.0.0-192.168.255.255",
                    "name": "Офисная сеть 192.168.x.x"
                }
            ]
        },
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
        'timeman.networkrange.set',
        [
            'ranges' => [
                [
                    'ip_range' => '10.0.0.0-10.255.255.255',
                    'name' => 'Офисная сеть 10.x.x.x'
                ],
                [
                    'ip_range' => '172.16.0.0-172.31.255.255',
                    'name' => 'Офисная сеть 172.x.x.x'
                ],
                [
                    'ip_range' => '192.168.0.0-192.168.255.255',
                    'name' => 'Офисная сеть 192.168.x.x'
                ]
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
    "result": {
        "result": true
    },
    "time": {
        "start": 1742999863.0244141,
        "finish": 1742999863.057137,
        "duration": 0.03272294998168945,
        "processing": 0.0023658275604248047,
        "date_start": "2025-03-26T17:37:43+03:00",
        "date_finish": "2025-03-26T17:37:43+03:00",
        "operating_reset_at": 1743000463,
        "operating": 0
    }
}
```

### При возникновении ошибки разбора диапазонов

HTTP-статус: **200**

```json
{
    "result": {
        "result": false,
        "error_ranges": [
            {
                "ip_range": "a172.16.0.0-172.31.255.255",
                "name": "Офисная сеть 172.x.x.x"
            }
        ]
    },
    "time": {
        "start": 1743058773.526674,
        "finish": 1743058773.5625639,
        "duration": 0.035889863967895508,
        "processing": 0.0005609989166259766,
        "date_start": "2025-03-27T09:59:33+03:00",
        "date_finish": "2025-03-27T09:59:33+03:00",
        "operating_reset_at": 1743059373,
        "operating": 0
    }
}
```


### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа. Может иметь значения:
- `true` — все диапазоны успешно установлены
- `false` — есть диапазоны с ошибками ||
|| **error_range**
 [`array`](../../data-types.md) | Массив [диапазонов](#ip_range), в которых были найдены ошибки ||
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
    "error": "INVALID_FORMAT",
    "error_description": "A wrong format for the RANGES field is passed"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_ERROR` | You don't have access to use this method | Метод доступен только администратору ||
|| `INVALID_FORMAT` | A wrong format for the RANGES field is passed | Передан некорректный формат в параметре `RANGES` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-networkrange-get.md)
- [{#T}](./timeman-networkrange-check.md)
