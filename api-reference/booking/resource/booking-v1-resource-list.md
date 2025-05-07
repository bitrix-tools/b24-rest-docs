# Получить список ресурсов booking.v1.resource.list

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.list` возвращает список ресурсов по фильтру. Является реализацией списочного метода для ресурсов.

## Параметры метода

#|
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации списка ресурсов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#filter) ресурса для фильтра
- `value_N` — значение поля ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки списка ресурсов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#order) ресурса для сортировки
- `value_N` — направление сортировки

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
  
Значение по умолчанию — `{ID: 'ASC'}` ||
|#

### Параметры filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **searchQuery**
[`string`](../../data-types.md) | Поисковой запрос. Ищет по подстроке в названии ресурса ||
|| **isMain**
[`string`](../../data-types.md) | Фильтр по настройке показа ресурса. Возможные значения:
- `Y` — в колонках расписания
- `N` — при пересечении ресурсов ||
|| **typeId**
[`integer`](../../data-types.md) | Идентификатор типа ресурса.

Список доступных типов можно узнать с помощью метода [booking.v1.resourceType.list](./resource-type/booking-v1-resourcetype-list.md) ||
|| **name**
[`string`](../../data-types.md) | Название ресурса ||
|| **description**
[`string`](../../data-types.md) | Описание ресурса ||
|#

Используйте или `searchQuery` для поиска по подстроке или `name` для поиска по полному совпадению. 

### Параметры order {#order}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Сортировка по идентификатору ||
|| **name**
[`string`](../../data-types.md) | Сортировка по названию ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "booking.v1.resource.list",
        {
            filter: {
                "searchQuery": "авто",
                "isMain": "Y",
                "typeId": 1
            },
            order: {
                id: "ASC",
                name: "DESC"
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

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"searchQuery":"авто","isMain":"Y","typeId":1},"order":{"id":"ASC","name":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.resource.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"searchQuery":"авто","isMain":"Y","typeId":1},"order":{"id":"ASC","name":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.list
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.resource.list',
        [
            'filter' => [
                'searchQuery' => 'авто',
                'isMain' => 'Y',
                'typeId' => 1
            ],
            'order' => [
                'id' => 'ASC',
                'name' => 'DESC'
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
        "resource": [
            {
                "confirmationCounterDelay": 10800,
                "confirmationNotificationDelay": 86400,
                "confirmationNotificationRepetitions": null,
                "confirmationNotificationRepetitionsInterval": 10800,
                "delayedCounterDelay": 300,
                "delayedNotificationDelay": 300,
                "description": null,
                "id": 5,
                "infoNotificationDelay": null,
                "isConfirmationNotificationOn": "Y",
                "isDelayedNotificationOn": "Y",
                "isFeedbackNotificationOn": "N",
                "isInfoNotificationOn": "Y",
                "isMain": "Y",
                "isReminderNotificationOn": "Y",
                "name": "Легковой автомобиль 1",
                "reminderNotificationDelay": -1,
                "templateTypeConfirmation": "inanimate",
                "templateTypeDelayed": "inanimate",
                "templateTypeFeedback": "inanimate",
                "templateTypeInfo": "inanimate",
                "templateTypeReminder": "base",
                "typeId": 1
            },
            {
                "confirmationCounterDelay": 10800,
                "confirmationNotificationDelay": 86400,
                "confirmationNotificationRepetitions": null,
                "confirmationNotificationRepetitionsInterval": 10800,
                "delayedCounterDelay": 300,
                "delayedNotificationDelay": 300,
                "description": null,
                "id": 7,
                "infoNotificationDelay": null,
                "isConfirmationNotificationOn": "Y",
                "isDelayedNotificationOn": "Y",
                "isFeedbackNotificationOn": "N",
                "isInfoNotificationOn": "Y",
                "isMain": "Y",
                "isReminderNotificationOn": "Y",
                "name": "Легковой автомобиль 2",
                "reminderNotificationDelay": -1,
                "templateTypeConfirmation": "inanimate",
                "templateTypeDelayed": "inanimate",
                "templateTypeFeedback": "inanimate",
                "templateTypeInfo": "inanimate",
                "templateTypeReminder": "base",
                "typeId": 1
            }
        ]
    },
    "time": {
        "start": 1746540454.261779,
        "finish": 1746540454.303483,
        "duration": 0.04170393943786621,
        "processing": 0.009412050247192383,
        "date_start": "2025-05-06T17:07:34+03:00",
        "date_finish": "2025-05-06T17:07:34+03:00",
        "operating_reset_at": 1746541054,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. 

Cодержит массив объектов с информацией о ресурсах. Структура описана [ниже](#resource) ||
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
    "error": "",
    "error_description": "Invalid value {ASC} to match with parameter {order}. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | `Invalid value to match with parameter {order}. Should be value of type array` | В параметр `order` передан не объект ||
|| `100` | `Invalid value to match with parameter {filter}. Should be value of type array` | В параметр `filter` передан не объект ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./resource-type/index.md)
- [{#T}](./booking-v1-resource-add.md)
- [{#T}](./booking-v1-resource-update.md)
- [{#T}](./booking-v1-resource-delete.md)