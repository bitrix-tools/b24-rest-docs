# Установить слоты для ресурса booking.v1.resource.slots.set

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.slots.set` позволяет установить временные слоты для указанного ресурса.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceId***
[`integer`](../../../data-types.md) | Идентификатор ресурса. 
Можно получить методами [booking.v1.resource.add](../booking-v1-resource-add.md) и [booking.v1.resource.list](../booking-v1-resource-list.md) ||
|| **slots***
[`array`](../../../data-types.md) | Массив объектов, содержащий значения полей для установки временных слотов [(подробное описание)](#slots) ||
|#

### Параметр slots {#slots}

#|
|| **Название**
`тип` | **Описание** ||
|| **from***
[`integer`](../../../data-types.md) | Время, с которого доступна бронь слотов в течение дня. Значение в диапазоне от 0 до 1440. Например `540` — время для брони доступно с 9:00 ||
|| **to***
[`integer`](../../../data-types.md) | Время окончания слота в минутах. Значение в диапазоне от 0 до 1440, больше или равно значению `from`. Например `1080` — время для брони доступно до 18:00 ||
|| **timezone***
[`string`](../../../data-types.md) | Часовой пояс, относительно которого настроено время слота ||
|| **weekDays***
[`array`](../../../data-types.md) | Массив доступных дней недели для слота. Возможные значения: 
- `"Mon"` — понедельник
- `"Tue"` — вторник
- `"Wed"` — среда
- `"Thu"` — четверг
- `"Fri"` — пятница
- `"Sat"` — суббота
- `"Sun"` — воскресенье ||
|| **slotSize***
[`integer`](../../../data-types.md) | Длительность слота в минутах ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример настройки временных слотов для ресурса:
- доступность с понедельника по пятницу с 9:00 до 18:00 по часовому поясу GMT+2
- длительность слота 30 минут

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":10,"slots":[{"from":540,"to":1080,"timezone":"Europe/Kaliningrad","weekDays":["Mon","Tue","Wed","Thu","Fri"],"slotSize":30}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.slots.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":10,"slots":[{"from":540,"to":1080,"timezone":"Europe/Kaliningrad","weekDays":["Mon","Tue","Wed","Thu","Fri"],"slotSize":30}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.resource.slots.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'booking.v1.resource.slots.set',
    		{
    			resourceId: 10,
    			slots: [
    				{
    					from: 540,
    					to: 1080,
    					timezone: 'Europe/Kaliningrad',
    					weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    					slotSize: 30
    				}
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'booking.v1.resource.slots.set',
                [
                    'resourceId' => 10,
                    'slots'      => [
                        [
                            'from'     => 540,
                            'to'       => 1080,
                            'timezone' => 'Europe/Kaliningrad',
                            'weekDays' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                            'slotSize' => 30
                        ]
                    ]
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
        echo 'Error setting resource slots: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.slots.set",
        {
            resourceId: 10,
            slots: [
                {
                    from: 540,
                    to: 1080,
                    timezone: "Europe/Kaliningrad",
                    weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                    slotSize: 30
                }
            ]
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
        'booking.v1.resource.slots.set',
        [
            'resourceId' => 10,
            'slots' => [
                [
                    'from' => 540,
                    'to' => 1080,
                    'timezone' => 'Europe/Kaliningrad',
                    'weekDays' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    'slotSize' => 30
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
    "result": true,
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
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха  ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1009,
    "error_description": "Resource not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1009` | `Resource not found` | Ресурс с указанным `id` не найден ||
|| `0` | `Required fields:` | Не передан обязательный параметр внутри `slots` ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-resource-slots-unset.md)
- [{#T}](./booking-v1-resource-slots-list.md)