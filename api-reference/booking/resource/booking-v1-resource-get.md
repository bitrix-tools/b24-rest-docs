# Получить ресурс booking.v1.resource.get

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.get` возвращает информацию о ресурсе по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор ресурса. 
Можно получить в методах [booking.v1.resource.add](./booking-v1-resource-add.md) и [booking.v1.resource.list](./booking-v1-resource-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.resource.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'booking.v1.resource.get',
    		{
    			id: 15
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
                'booking.v1.resource.get',
                [
                    'id' => 15,
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
        echo 'Error getting resource: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.get",
        {
            id: 15
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
        'booking.v1.resource.get',
        [
            'id' => 15
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
        "resource": {
            "confirmationCounterDelay": 10800,
            "confirmationNotificationDelay": 86400,
            "confirmationNotificationRepetitions": null,
            "confirmationNotificationRepetitionsInterval": 10800,
            "delayedCounterDelay": 300,
            "delayedNotificationDelay": 300,
            "description": null,
            "id": 15,
            "infoNotificationDelay": null,
            "isConfirmationNotificationOn": "Y",
            "isDelayedNotificationOn": "N",
            "isFeedbackNotificationOn": "N",
            "isInfoNotificationOn": "Y",
            "isMain": "Y",
            "isReminderNotificationOn": "Y",
            "name": "Название",
            "reminderNotificationDelay": -1,
            "templateTypeConfirmation": "animate",
            "templateTypeDelayed": "animate",
            "templateTypeFeedback": "animate",
            "templateTypeInfo": "inanimate",
            "templateTypeReminder": "base",
            "typeId": 1
        }
    },
    "time": {
        "start": 1746539524.292041,
        "finish": 1746539524.356627,
        "duration": 0.06458592414855957,
        "processing": 0.018703937530517578,
        "date_start": "2025-05-06T16:52:04+03:00",
        "date_finish": "2025-05-06T16:52:04+03:00",
        "operating_reset_at": 1746540124,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) |  Корневой элемент ответа. Содержит информацию о полях ресурса. Структура описана [ниже](#resource) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Ресурс {#resource}

#|
|| **confirmationCounterDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, после которого загорается счетчик не подтвержденной записи ||
|| **confirmationDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, когда клиенту приходит первое сообщение для подтверждения записи ||
|| **confirmationRepetitions**
[`integer`](../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, не учитывая первого ||
|| **confirmationRepetitionsInterval**
[`integer`](../../data-types.md) | Интервал между сообщениями о подтверждении записи, в секундах ||
|| **delayedCounterDelay**
[`integer`](../../data-types.md) | Время в секундах, через сколько включить счетчик в календаре ||
|| **delayedDelay**
[`integer`](../../data-types.md) | Время в секундах, через сколько отправить клиенту сообщение об опоздании ||
|| **description**
[`string`](../../data-types.md) | Описание ресурса ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор ресурса ||
|| **infoDelay**
[`integer`](../../data-types.md) | Задержка в секундах, после которой клиенту приходит сообщение о записи ||
|| **isConfirmationNotificationOn**
[`string`](../../data-types.md) | Автоматическое подтверждение записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isDelayedNotificationOn**
[`string`](../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isFeedbackNotificationOn**
[`string`](../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isInfoNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isMain**
[`string`](../../data-types.md) | Как показывать ресурс. Возможные значения:
- `Y` — в колонках расписания
- `N` — при пересечении ресурсов ||
|| **isReminderNotificationOn**
[`string`](../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **name**
[`string`](../../data-types.md) | Название ресурса ||
|| **reminderDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, за которое клиенту приходит напоминание о записи.
Значение `-1` — утром в день записи ||
|| **templateTypeConfirmation**
[`string`](../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeDelayed**
[`string`](../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeFeedback**
[`string`](../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeInfo**
[`string`](../../data-types.md) | Тип шаблона сообщения о записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeReminder**
[`string`](../../data-types.md) | Тип шаблона сообщения для напоминания. Возможные значения: `base` ||
|| **typeId**
[`integer`](../../data-types.md) | Идентификатор типа ресурса.

Получить информацию о типе можно с помощью метода [booking.v1.resourceType.get](./resource-type/booking-v1-resourcetype-get.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1021,
    "error_description": "Resource not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1009` | `Resource not found` | Ресурс с таким `id` не найден ||
|| `100` | `Could not find value for parameter {id}` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./resource-type/index.md)
- [{#T}](./booking-v1-resource-add.md)
- [{#T}](./booking-v1-resource-update.md)
- [{#T}](./booking-v1-resource-delete.md)
- [{#T}](./booking-v1-resource-list.md)