# Создать бронирование из листа ожидания booking.v1.booking.createfromwaitlist

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.booking.createfromwaitlist` создает бронирование на основе записи из листа ожидания.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **waitListId***
[`integer`](../../data-types.md) | Идентификатор записи в лист ожидания. 
Можно получить методами [booking.v1.waitlist.add](../waitlist/booking-v1-waitlist-add.md) и [booking.v1.waitlist.list](../waitlist/booking-v1-waitlist-list.md) ||
|| **fields**
[`object`](../../data-types.md) | Объект, содержащий значения полей для создания бронирования [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceIds***
[`array`](../../data-types.md#array) | Массив идентификаторов ресурсов для брони. 
ID ресурсов можно получить методом [booking.v1.resource.list](../resource/booking-v1-resource-list.md) ||
|| **name**
[`string`](../../data-types.md) | Название бронирования. 
Значение по умолчанию — пустая строка ||
|| **description**
[`string`](../../data-types.md) | Описание бронирования. 
Значение по умолчанию — пустая строка ||
|| **datePeriod***
[`object`](../../data-types.md#object) | Объект, содержащий время брони [(подробное описание)](#datePeriod) ||
|#

### Параметр datePeriod {#datePeriod}

#|
|| **Название**
`тип` | **Описание** ||
|| **from***
[`object`](../../data-types.md#object) | Время начала брони в формате `{"timestamp": "1723446900", "timezone": "Europe/Moscow"}`||
|| **to***
[`object`](../../data-types.md#object) | Время окончания брони в формате `{"timestamp": "1723447800", "timezone": "Europe/Moscow"}` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":10,"fields":{"resourceIds":[1,2,3],"datePeriod":{"from":{"timestamp":1723446900,"timezone":"Europe/Moscow"},"to":{"timestamp":1723447800,"timezone":"Europe/Moscow"}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.booking.createfromwaitlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":10,"fields":{"resourceIds":[1,2,3],"datePeriod":{"from":{"timestamp":1723446900,"timezone":"Europe/Moscow"},"to":{"timestamp":1723447800,"timezone":"Europe/Moscow"}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.booking.createfromwaitlist
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"booking.v1.booking.createfromwaitlist",
    		{
    			waitListId: 10,
    			fields: {
    				resourceIds: [1, 2, 3],
    				datePeriod: {
    					from: {
    						timestamp: 1723446900,
    						timezone: "Europe/Moscow"
    					},
    					to: {
    						timestamp: 1723447800,
    						timezone: "Europe/Moscow"
    					}
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'booking.v1.booking.createfromwaitlist',
                [
                    'waitListId' => 10,
                    'fields'     => [
                        'resourceIds' => [1, 2, 3],
                        'datePeriod'  => [
                            'from' => [
                                'timestamp' => 1723446900,
                                'timezone'  => 'Europe/Moscow',
                            ],
                            'to'   => [
                                'timestamp' => 1723447800,
                                'timezone'  => 'Europe/Moscow',
                            ],
                        ],
                    ],
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
        echo 'Error creating booking from waitlist: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.booking.createfromwaitlist",
        {
            waitListId: 10,
            fields: {
                resourceIds: [1, 2, 3],
                datePeriod: {
                    from: {
                        timestamp: 1723446900,
                        timezone: "Europe/Moscow"
                    },
                    to: {
                        timestamp: 1723447800,
                        timezone: "Europe/Moscow"
                    }
                }
            }
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.booking.createfromwaitlist',
        [
            'waitListId' => 10,
            'fields' => [
                'resourceIds' => [1, 2, 3],
                'datePeriod' => [
                    'from' => [
                        'timestamp' => 1723446900,
                        'timezone' => 'Europe/Moscow'
                    ],
                    'to' => [
                        'timestamp' => 1723447800,
                        'timezone' => 'Europe/Moscow'
                    ]
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
    "result": 582,
    "time": {
     "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Корневой элемент ответа, содержит идентификатор добавленного бронирования ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 422,
    "error_description": "Invalid date period"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1038` | `wait list item not found` | Не найден список ожидания с указанными `id`, ресурсы недоступны для этого временного промежутка, пустой массив ресурсов или таких ресурсов не существует ||
|| `0` | `Required fields:` | Не передан обязательный параметр внутри `fields` ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|| `422` | `Invalid date period` | Некорректный период времени ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-booking-list.md)
- [{#T}](./booking-v1-booking-update.md)
- [{#T}](./booking-v1-booking-add.md)
- [{#T}](./booking-v1-booking-delete.md)
- [{#T}](./booking-v1-booking-get.md)