# Установить связи для бронирования booking.v1.booking.externalData.set

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.booking.externalData.set` устанавливает связи для указанного бронирования.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **bookingId***
[`integer`](../../../data-types.md) | Идентификатор бронирования.
Можно получить методами [booking.v1.booking.add](../booking-v1-booking-add.md) и [booking.v1.booking.list](../booking-v1-booking-list.md) ||
|| **externalData***
[`array`](../../../data-types.md) | Массив объектов, содержащий объекты для привязки [(подробное описание)](#externalData) ||
|#

### Параметр externalData {#externalData}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, например `crm` ||
|| **entityTypeId***
[`string`](../../../data-types.md) | ID типа объекта, например `DEAL` ||
|| **value***
[`string`](../../../data-types.md) | ID элемента, например `1` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"bookingId":14,"externalData":[{"moduleId":"crm","entityTypeId":"DEAL","value":"1"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.booking.externalData.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"bookingId":14,"externalData":[{"moduleId":"crm","entityTypeId":"DEAL","value":"1"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.booking.externalData.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"booking.v1.booking.externalData.set",
    		{
    			bookingId: 14,
    			externalData: [
    				{
    					moduleId: "crm",
    					entityTypeId: "DEAL",
    					value: "1"
    				}
    			]
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
                'booking.v1.booking.externalData.set',
                [
                    'bookingId'    => 14,
                    'externalData' => [
                        [
                            'moduleId'     => 'crm',
                            'entityTypeId' => 'DEAL',
                            'value'        => '1',
                        ],
                    ],
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
        echo 'Error setting external data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.booking.externalData.set",
        {
            bookingId: 14,
            externalData: [
                {
                    moduleId: "crm",
                    entityTypeId: "DEAL",
                    value: "1"
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
        'booking.v1.booking.externalData.set',
        [
            'bookingId' => 14,
            'externalData' => [
                [
                    'moduleId' => 'crm',
                    'entityTypeId' => 'DEAL',
                    'value' => '1'
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
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1021,
    "error_description": "Booking not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Required fields:` | Не передан обязательный параметр внутри `externalData` ||
|| `1021` | `Booking not found` | Бронирование с указанным `id` не найдено ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-booking-externaldata-unset.md)
- [{#T}](./booking-v1-booking-externaldata-list.md)