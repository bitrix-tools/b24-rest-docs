# Добавить новый тип ресурса booking.v1.resourceType.add

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resourceType.add` добавляет новый тип ресурса.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект, содержащий значения полей для создания типа ресурса [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Название типа ресурса ||
|| **code***
[`string`](../../../data-types.md) | Уникальный код типа ресурса ||
|| **isInfoNotificationOn**
[`string`](../../../data-types.md) | Сообщение клиенту о записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeInfo**
[`string`](../../../data-types.md) | Тип шаблона сообщения о записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isConfirmationNotificationOn**
[`string`](../../../data-types.md) | Автоматическое подтверждение записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeConfirmation**
[`string`](../../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isReminderNotificationOn**
[`string`](../../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeReminder**
[`string`](../../../data-types.md) | Тип шаблона сообщения для напоминания. Возможные значения: `base` ||
|| **isFeedbackNotificationOn**
[`string`](../../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeFeedback**
[`string`](../../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isDelayedNotificationOn**
[`string`](../../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y`||
|| **templateTypeDelayed**
[`string`](../../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **infoDelay**
[`integer`](../../../data-types.md) | Задержка, после которой клиенту приходит сообщение о записи. Указывается в секундах.

По умолчанию 300 ||
|| **reminderDelay**
[`integer`](../../../data-types.md) | Время до записи, за которое клиенту приходит напоминание о записи. Указывается в секундах.

По умолчанию -1, утром в день записи ||
|| **delayedDelay**
[`integer`](../../../data-types.md) | Время, через сколько отправить клиенту сообщение об опоздании. Указывается в секундах.

По умолчанию 300 ||
|| **delayedCounterDelay**
[`integer`](../../../data-types.md) | Время, через сколько включить счетчик в календаре. Указывается в секундах.

По умолчанию 7200 ||
|| **confirmationDelay**
[`integer`](../../../data-types.md) | Время до записи, когда клиенту приходит первое сообщение для подтверждения записи. Указывается в секундах.

По умолчанию 86400 ||
|| **confirmationRepetitions**
[`integer`](../../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, не учитывая первого.

По умолчанию 0 ||
|| **confirmationRepetitionsInterval**
[`integer`](../../../data-types.md) | Интервал между сообщениями о подтверждении записи. Указывается в секундах.

По умолчанию 0 ||
|| **confirmationCounterDelay**
[`integer`](../../../data-types.md) | Время до записи, после которого загорается счетчик не подтвержденной записи. Указывается в секундах.

По умолчанию 7200 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Название","code":"code","isInfoNotificationOn":"Y","templateTypeInfo":"inanimate","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"N","templateTypeReminder":"base","isFeedbackNotificationOn":"Y","templateTypeFeedback":"inanimate","isDelayedNotificationOn":"Y","templateTypeDelayed":"inanimate","infoDelay":300,"reminderDelay":-1,"delayedDelay":300,"delayedCounterDelay":7200,"confirmationDelay":86400,"confirmationRepetitions":0,"confirmationRepetitionsInterval":0,"confirmationCounterDelay":7200}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.resourceType.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Название","code":"code","isInfoNotificationOn":"Y","templateTypeInfo":"inanimate","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"N","templateTypeReminder":"base","isFeedbackNotificationOn":"Y","templateTypeFeedback":"inanimate","isDelayedNotificationOn":"Y","templateTypeDelayed":"inanimate","infoDelay":300,"reminderDelay":-1,"delayedDelay":300,"delayedCounterDelay":7200,"confirmationDelay":86400,"confirmationRepetitions":0,"confirmationRepetitionsInterval":0,"confirmationCounterDelay":7200},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resourceType.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"booking.v1.resourceType.add",
    		{
    			fields: {
    				name: "Название",
    				code: "code",
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
    				infoDelay: 300,
    				reminderDelay: -1,
    				delayedDelay: 300,
    				delayedCounterDelay: 7200,
    				confirmationDelay: 86400,
    				confirmationRepetitions: 0,
    				confirmationRepetitionsInterval: 0,
    				confirmationCounterDelay: 7200
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'booking.v1.resourceType.add',
                [
                    'fields' => [
                        'name'                          => 'Название',
                        'code'                          => 'code',
                        'isInfoNotificationOn'          => 'Y',
                        'templateTypeInfo'              => 'inanimate',
                        'isConfirmationNotificationOn'  => 'Y',
                        'templateTypeConfirmation'      => 'animate',
                        'isReminderNotificationOn'      => 'N',
                        'templateTypeReminder'          => 'base',
                        'isFeedbackNotificationOn'      => 'Y',
                        'templateTypeFeedback'          => 'inanimate',
                        'isDelayedNotificationOn'       => 'Y',
                        'templateTypeDelayed'           => 'inanimate',
                        'infoDelay'                     => 300,
                        'reminderDelay'                 => -1,
                        'delayedDelay'                  => 300,
                        'delayedCounterDelay'           => 7200,
                        'confirmationDelay'             => 86400,
                        'confirmationRepetitions'       => 0,
                        'confirmationRepetitionsInterval' => 0,
                        'confirmationCounterDelay'      => 7200,
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
        echo 'Error adding resource type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resourceType.add",
        {
            fields: {
                name: "Название",
                code: "code",
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
                infoDelay: 300,
                reminderDelay: -1,
                delayedDelay: 300,
                delayedCounterDelay: 7200,
                confirmationDelay: 86400,
                confirmationRepetitions: 0,
                confirmationRepetitionsInterval: 0,
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
        'booking.v1.resourceType.add',
        [
            'fields' => [
                'name' => 'Название',
                'code' => 'code',
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
                'infoDelay' => 300,
                'reminderDelay' => -1,
                'delayedDelay' => 300,
                'delayedCounterDelay' => 7200,
                'confirmationDelay' => 86400,
                'confirmationRepetitions' => 0,
                'confirmationRepetitionsInterval' => 0,
                'confirmationCounterDelay' => 7200,
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
        "id": 17
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
[`object`](../../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданного типа ресурса ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Required fields: code"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Required fields: code` | Не передан обязательный параметр внутри `fields` ||
|| `100` | `Could not find value for parameter ` | Не передан обязательный параметр ||
|| `422` | `Invalid value of the field` | Неверное значение поля ||
|| `1010` | `Resource type with code already exists'` | Тип ресурса с таким `code` уже существует ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](./booking-v1-resourcetype-get.md)
- [{#T}](./booking-v1-resourcetype-update.md)
- [{#T}](./booking-v1-resourcetype-delete.md)
- [{#T}](./booking-v1-resourcetype-list.md)