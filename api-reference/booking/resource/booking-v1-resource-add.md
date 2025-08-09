# Добавить новый ресурс booking.v1.resource.add

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.add` добавляет новый ресурс.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий значения полей для создания ресурса [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название ресурса ||
|| **description**
[`string`](../../data-types.md) | Описание ресурса.

По умолчанию пустая строка ||
|| **typeId***
[`integer`](../../data-types.md) | Идентификатор типа ресурса.

Список доступных типов можно узнать с помощью метода [booking.v1.resourceType.list](./resource-type/booking-v1-resourcetype-list.md) ||
|| **isMain**
[`string`](../../data-types.md) | Как показывать ресурс. Возможные значения:
- `Y` — в колонках расписания
- `N` — при пересечении ресурсов

По умолчанию `Y` ||
|| **isInfoNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту о записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeInfo**
[`string`](../../data-types.md) | Тип шаблона сообщения о записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isConfirmationNotificationOn**
[`string`](../../data-types.md) | Автоматическое подтверждение записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeConfirmation**
[`string`](../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isReminderNotificationOn**
[`string`](../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeReminder**
[`string`](../../data-types.md) | Тип шаблона сообщения для напоминания. Возможные значения: `base` ||
|| **isFeedbackNotificationOn**
[`string`](../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeFeedback**
[`string`](../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isDelayedNotificationOn**
[`string`](../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y`||
|| **templateTypeDelayed**
[`string`](../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **infoDelay**
[`integer`](../../data-types.md) | Задержка, после которой клиенту приходит сообщение о записи. Указывается в секундах.

По умолчанию 300 ||
|| **reminderDelay**
[`integer`](../../data-types.md) | Время до записи, за которое клиенту приходит напоминание о записи. Указывается в секундах.

По умолчанию -1, утром в день записи ||
|| **delayedDelay**
[`integer`](../../data-types.md) | Время, через сколько отправить клиенту сообщение об опоздании. Указывается в секундах.

По умолчанию 300 ||
|| **delayedCounterDelay**
[`integer`](../../data-types.md) | Время, через сколько включить счетчик в календаре. Указывается в секундах.

По умолчанию 7200 ||
|| **confirmationDelay**
[`integer`](../../data-types.md) | Время до записи, когда клиенту приходит первое сообщение для подтверждения записи. Указывается в секундах.

По умолчанию 86400 ||
|| **confirmationRepetitions**
[`integer`](../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, не учитывая первого.

По умолчанию 0 ||
|| **confirmationRepetitionsInterval**
[`integer`](../../data-types.md) | Интервал между сообщениями о подтверждении записи. Указывается в секундах.

По умолчанию 0 ||
|| **confirmationCounterDelay**
[`integer`](../../data-types.md) | Время до записи, после которого загорается счетчик не подтвержденной записи. Указывается в секундах.

По умолчанию 7200 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Название","description":"Описание","typeId":1,"isMain":"N","isInfoNotificationOn":"Y","templateTypeInfo":"inanimate","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"N","templateTypeReminder":"base","isFeedbackNotificationOn":"Y","templateTypeFeedback":"inanimate","isDelayedNotificationOn":"Y","templateTypeDelayed":"inanimate","infoDelay":60,"reminderDelay":-1,"delayedDelay":300,"delayedCounterDelay":7200,"confirmationDelay":86400,"confirmationRepetitions":1,"confirmationRepetitionsInterval":3600,"confirmationCounterDelay":7200}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.resource.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Название","description":"Описание","typeId":1,"isMain":"N","isInfoNotificationOn":"Y","templateTypeInfo":"inanimate","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"N","templateTypeReminder":"base","isFeedbackNotificationOn":"Y","templateTypeFeedback":"inanimate","isDelayedNotificationOn":"Y","templateTypeDelayed":"inanimate","infoDelay":60,"reminderDelay":-1,"delayedDelay":300,"delayedCounterDelay":7200,"confirmationDelay":86400,"confirmationRepetitions":1,"confirmationRepetitionsInterval":3600,"confirmationCounterDelay":7200},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'booking.v1.resource.add',
    		{
    			fields: {
    				name: 'Название',
    				description: 'Описание',
    				typeId: 1,
    				isMain: 'N',
    				isInfoNotificationOn: 'Y',
    				templateTypeInfo: 'inanimate',
    				isConfirmationNotificationOn: 'Y',
    				templateTypeConfirmation: 'animate',
    				isReminderNotificationOn: 'N',
    				templateTypeReminder: 'base',
    				isFeedbackNotificationOn: 'Y',
    				templateTypeFeedback: 'inanimate',
    				isDelayedNotificationOn: 'Y',
    				templateTypeDelayed: 'inanimate',
    				infoDelay: 60,
    				reminderDelay: -1,
    				delayedDelay: 300,
    				delayedCounterDelay: 7200,
    				confirmationDelay: 86400,
    				confirmationRepetitions: 1,
    				confirmationRepetitionsInterval: 3600,
    				confirmationCounterDelay: 7200
    			}
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
                'booking.v1.resource.add',
                [
                    'fields' => [
                        'name' => 'Название',
                        'description' => 'Описание',
                        'typeId' => 1,
                        'isMain' => 'N',
                        'isInfoNotificationOn' => 'Y',
                        'templateTypeInfo' => 'inanimate',
                        'isConfirmationNotificationOn' => 'Y',
                        'templateTypeConfirmation' => 'animate',
                        'isReminderNotificationOn' => 'N',
                        'templateTypeReminder' => 'base',
                        'isFeedbackNotificationOn' => 'Y',
                        'templateTypeFeedback' => 'inanimate',
                        'isDelayedNotificationOn' => 'Y',
                        'templateTypeDelayed' => 'inanimate',
                        'infoDelay' => 60,
                        'reminderDelay' => -1,
                        'delayedDelay' => 300,
                        'delayedCounterDelay' => 7200,
                        'confirmationDelay' => 86400,
                        'confirmationRepetitions' => 1,
                        'confirmationRepetitionsInterval' => 3600,
                        'confirmationCounterDelay' => 7200,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding resource: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.add",
        {
            fields: {
                name: "Название",
                description: "Описание",
                typeId: 1,
                isMain: "N",
                isInfoNotificationOn: "Y",
                templateTypeInfo: "inanimate",
                isConfirmationNotificationOn: "Y",
                templateTypeConfirmation: "animate",
                isReminderNotificationOn: "N",
                templateTypeReminder: "base",
                isFeedbackNotificationOn: "Y",
                templateTypeFeedback: "inanimate",
                isDelayedNotificationOn: "Y",
                templateTypeDelayed: "inanimate",
                infoDelay: 60,
                reminderDelay: -1,
                delayedDelay: 300,
                delayedCounterDelay: 7200,
                confirmationDelay: 86400,
                confirmationRepetitions: 1,
                confirmationRepetitionsInterval: 3600,
                confirmationCounterDelay: 7200
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
        'booking.v1.resource.add',
        [
            'fields' => [
                'name' => 'Название',
                'description' => 'Описание',
                'typeId' => 1,
                'isMain' => 'N',
                'isInfoNotificationOn' => 'Y',
                'templateTypeInfo' => 'inanimate',
                'isConfirmationNotificationOn' => 'Y',
                'templateTypeConfirmation' => 'animate',
                'isReminderNotificationOn' => 'N',
                'templateTypeReminder' => 'base',
                'isFeedbackNotificationOn' => 'Y',
                'templateTypeFeedback' => 'inanimate',
                'isDelayedNotificationOn' => 'Y',
                'templateTypeDelayed' => 'inanimate',
                'infoDelay' => 60,
                'reminderDelay' => -1,
                'delayedDelay' => 300,
                'delayedCounterDelay' => 7200,
                'confirmationDelay' => 86400,
                'confirmationRepetitions' => 1,
                'confirmationRepetitionsInterval' => 3600,
                'confirmationCounterDelay' => 7200
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
        "id": 1823
    },
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
[`object`](../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданного ресурса ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1013,
    "error_description": "Resource type with id 17 does not exist"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Required fields: name` | Не передан обязательный параметр внутри `fields` ||
|| `100` | `Could not find value for parameter {fields}` | Не передан обязательный параметр `fields` ||
|| `1006` | `ResourceType not found` | Не указан `typeId` ||
|| `1013` | `Resource type with id does not exist` | Указан несуществующий `typeId` ||
|| `422` | `Invalid value of the field` | Неверное значение поля ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./resource-type/index.md)
- [{#T}](./booking-v1-resource-get.md)
- [{#T}](./booking-v1-resource-update.md)
- [{#T}](./booking-v1-resource-delete.md)
- [{#T}](./booking-v1-resource-list.md)